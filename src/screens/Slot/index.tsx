import React, {useEffect, useMemo, useRef, useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import ArrowIcon from '@/assets/icons/arrow.svg';
import InfoIcon from '@/assets/icons/info.svg';
import CoinIcon from '@/assets/icons/coin.svg';
import Row from '@/components/layout/Row';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Button from '@/components/ui/Button';
import LinearGradient from 'react-native-linear-gradient';
import InfoModal from './InfoModal';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {getSlotImages, REWARDS, SLOTS_DATA_BG_IMAGES} from '@/constants/common';
import {SLOTS_DATA} from '@/constants/common';
import {SlotIds} from '@/types/common';
import {useUserStore} from '@/stores/userStore';

const SLOT_IMAGE_SIZE = 76;
const NUM_ROWS = 3;

const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function Slot({route}: any) {
  const gameId = route?.params?.gameId || SlotIds.ZEUS_JOY;

  const nav = useNavigation<UseNavigationProp>();

  const images = useMemo(() => getSlotImages(gameId), [gameId]);
  const game = useMemo(
    () => SLOTS_DATA.find(g => g.gameId === gameId),
    [gameId],
  );

  const balance = useUserStore(state => state.balance);
  const addBalance = useUserStore(state => state.addBalance);
  const subtractBalance = useUserStore(state => state.subtractBalance);
  const updateProgress = useUserStore(state => state.updateProgress);

  const NUM_IMAGES = images.length;
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [columns, setColumns] = useState<any[][]>([]);
  const [isVictory, setIsVictory] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(0);

  const gameData = useMemo(
    () => SLOTS_DATA.find(g => g.gameId === gameId),
    [gameId],
  );

  const resultsRef = useRef([0, 0, 0]);

  const isSpinDisabled = balance < 10 || isVictory;

  useEffect(() => {
    console.log('images', images);

    const shuffledColumns = [
      shuffleArray(images),
      shuffleArray(images),
      shuffleArray(images),
    ];
    setColumns(shuffledColumns);
  }, []);

  const offsets = [useSharedValue(0), useSharedValue(0), useSharedValue(0)];

  const animatedStyles = offsets.map(offset =>
    useAnimatedStyle(() => ({
      transform: [{translateY: -offset.value % (NUM_IMAGES * SLOT_IMAGE_SIZE)}],
    })),
  );

  const addReward = (imageId: number) => {
    setIsVictory(true);
    const rewardAmount = REWARDS?.[imageId] || 100;
    setRewardAmount(rewardAmount);
  };

  const handleClaimReward = () => {
    addBalance(rewardAmount);

    setIsVictory(false);
    if (gameId !== SlotIds.NINE_ELEMENTS) {
      const taskMaxWin = gameData?.tasks[1].totalValue;
      console.log('taskMaxWin', taskMaxWin);
      console.log('rewardAmount', rewardAmount);

      if (taskMaxWin && rewardAmount >= taskMaxWin) {
        console.log('here');

        updateProgress(gameId, 1, 1);
      }
      updateProgress(gameId, 2, rewardAmount);
    }
    setRewardAmount(0);
  };

  const spinColumn = (columnIndex: number) => {
    const randomStopIndex = Math.floor(Math.random() * NUM_IMAGES);
    console.log('randomStopIndex', randomStopIndex);

    const totalDistance = randomStopIndex * SLOT_IMAGE_SIZE;

    offsets[columnIndex].value = withTiming(
      totalDistance,
      {duration: 1500},
      () => {
        runOnJS(updateResult)(columnIndex, randomStopIndex);
      },
    );
  };

  const updateResult = (columnIndex: number, stopIndex: number) => {
    console.log('stopIndex % NUM_IMAGES', stopIndex % NUM_IMAGES);

    resultsRef.current[columnIndex] = (stopIndex + 1) % NUM_IMAGES;

    if (columnIndex === 2) {
      runOnJS(checkCombinations)(resultsRef.current);
    }
  };

  const checkCombinations = (results: number[]) => {
    console.log('columns', columns);

    const allSame =
      columns[0][results[0]] === columns[1][results[1]] &&
      columns[1][results[1]] === columns[2][results[2]];
    console.log(
      '[0][0]:',
      columns[0][results[0]],
      '[1][1]:',
      columns[1][results[1]],
      '[2][2]:',
      columns[2][results[2]],
    );

    if (allSame) {
      addReward(columns[0][results[0]]);
    }
  };

  const handleGoBack = () => {
    nav.replace(Screens.MAIN);
  };

  const handlePress = () => {
    console.log('press');
    subtractBalance(10);
    spinColumn(0);
    spinColumn(1);
    spinColumn(2);

    if (gameId !== SlotIds.NINE_ELEMENTS) {
      updateProgress(gameId, 0, 1);
    }
  };

  const handleFreeMode = () => {
    console.log('free mode');
    spinColumn(0);
    spinColumn(1);
    spinColumn(2);
  };

  return (
    <BackgroundWrapper>
      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        gameId={gameId}
      />
      <Image
        style={{
          width: '100%',
          height: '100%',
          bottom: -10,
          position: 'absolute',
          objectFit: 'fill',
        }}
        source={SLOTS_DATA_BG_IMAGES[gameId]}
      />

      <Container>
        <Row
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}>
          <Row gap={10}>
            <TouchableOpacity onPress={handleGoBack}>
              <View style={styles.actionBtn}>
                <ArrowIcon
                  width={36}
                  height={20}
                  style={{transform: [{rotate: '90deg'}]}}
                />
              </View>
            </TouchableOpacity>
            <CustomText fw="bold" fs={28}>
              {game?.title}
            </CustomText>
          </Row>

          <TouchableOpacity onPress={() => setIsInfoModalOpen(true)}>
            <View style={styles.actionBtn}>
              <InfoIcon />
            </View>
          </TouchableOpacity>
        </Row>

        <View style={styles.coinsContainer}>
          <Row gap={8}>
            <CustomText fw="bold" fs={24}>
              {balance}
            </CustomText>
            <CoinIcon />
          </Row>
        </View>

        <LinearGradient
          colors={['#FFBE0D', '#FF1E00']}
          style={{
            marginHorizontal: 'auto',
            marginTop: 12,
            borderRadius: 28,
          }}>
          <Row
            style={{
              backgroundColor: '#1D1C30',
              borderRadius: 24,
              padding: 8,
              margin: 4,
              marginTop: 4,
              gap: 8,
            }}>
            {columns.map((columnImages, columnIndex) => (
              <View key={columnIndex} style={styles.columnContainer}>
                <Animated.View
                  style={[styles.column, animatedStyles[columnIndex]]}>
                  {Array.from({length: NUM_IMAGES * 2}).map((_, i) => (
                    <Image
                      key={i}
                      source={columnImages[i % NUM_IMAGES]}
                      style={styles.image}
                    />
                  ))}
                </Animated.View>
              </View>
            ))}
          </Row>
        </LinearGradient>

        <View style={{marginHorizontal: 'auto', gap: 12, marginTop: 32}}>
          <TouchableOpacity disabled={isSpinDisabled} onPress={handlePress}>
            <LinearGradient
              colors={['#FFBE0D', '#FF1E00']}
              style={{
                borderRadius: 24,
                width: 236,
                height: 48,
                opacity: isSpinDisabled ? 0.9 : 1,
              }}>
              <Row
                style={{
                  width: '100%',
                  justifyContent: 'space-between',
                  marginRight: 20,
                  paddingHorizontal: 16,
                  paddingVertical: 9,
                }}>
                <CustomText fw="bold" fs={18}>
                  SPIN
                </CustomText>
                <Row gap={5}>
                  <CustomText fw="bold" fs={18}>
                    10
                  </CustomText>
                  <CoinIcon />
                </Row>
              </Row>
            </LinearGradient>
          </TouchableOpacity>

          {gameId === SlotIds.NINE_ELEMENTS && (
            <Button
              disabled={!isSpinDisabled}
              title="FREE MODE"
              onPress={handleFreeMode}
            />
          )}
        </View>

        {isVictory && (
          <View style={{marginHorizontal: 'auto', marginTop: 30}}>
            <TouchableOpacity onPress={handleClaimReward}>
              <LinearGradient
                colors={['#FFBE0D', '#FF1E00']}
                style={{
                  borderRadius: 24,
                  width: 286,
                  height: 48,
                }}>
                <Row
                  style={{
                    width: '100%',
                    justifyContent: 'space-between',
                    marginRight: 20,
                    paddingHorizontal: 16,
                    paddingVertical: 9,
                  }}>
                  <CustomText fw="bold" fs={18}>
                    Victory
                  </CustomText>
                  <Row gap={5}>
                    <CustomText fw="bold" fs={18}>
                      + {rewardAmount}
                    </CustomText>
                    <CoinIcon />
                  </Row>
                </Row>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </Container>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  actionBtn: {
    backgroundColor: '#1D1C30',
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinsContainer: {
    marginHorizontal: 'auto',
    backgroundColor: '#1D1C30',
    borderRadius: 100,
    marginTop: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  slot: {
    margin: 10,
    width: 100,
    height: 100,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'tomato',
  },
  slotMachineContainer: {
    flexDirection: 'row',
    height: SLOT_IMAGE_SIZE * NUM_ROWS,
    borderColor: '#fff',
    borderWidth: 4,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  columnContainer: {
    width: SLOT_IMAGE_SIZE + 6 * 2,
    height: SLOT_IMAGE_SIZE * NUM_ROWS + 6 * 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#050322',
    borderRadius: 12,
    padding: 6,
  },
  column: {
    flexDirection: 'column',
  },
  image: {
    width: SLOT_IMAGE_SIZE,
    height: SLOT_IMAGE_SIZE,
    resizeMode: 'cover',
  },
});
