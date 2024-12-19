import React from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import Row from '@/components/layout/Row';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import SettingsIcon from '@/assets/icons/settings.svg';
import CoinIcon from '@/assets/icons/coin.svg';
import LinearGradient from 'react-native-linear-gradient';
import Item from './Item';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import {SLOTS_DATA} from '@/constants/common';
import {useUserStore} from '@/stores/userStore';
import {SlotIds} from '@/types/common';

export default function Main() {
  const nav = useNavigation<UseNavigationProp>();
  const balance = useUserStore(state => state.balance);
  const progress = useUserStore(state => state.progress);

  const doneGames = Object.values(progress).map(
    (arr: number[], arrIndex: number) =>
      arr.every((value: number, index: number) => {
        console.log('value', value);
        if (typeof value !== 'number') return true;

        return index === 1
          ? value >= 1
          : value >= SLOTS_DATA[arrIndex].tasks[index].totalValue;
      }),
  );

  return (
    <BackgroundWrapper>
      <Container>
        <Row style={{width: '100%', justifyContent: 'space-between'}}>
          <CustomText fw="bold" fs={44}>
            Elements
          </CustomText>

          <TouchableOpacity onPress={() => nav.navigate(Screens.SETTINGS)}>
            <View
              style={{
                padding: 10,
                borderRadius: 12,
                backgroundColor: '#1D1C30',
              }}>
              <SettingsIcon />
            </View>
          </TouchableOpacity>
        </Row>

        <ScrollView
          style={{width: '100%'}}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: '#132B78',
              borderRadius: 24,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 20,
              width: '100%',
              paddingVertical: 16,
              marginTop: 36,
            }}>
            <CustomText fs={24}>Balance</CustomText>
            <Row gap={8}>
              <CustomText fs={24} fw="bold">
                {balance}
              </CustomText>
              <CoinIcon />
            </Row>
          </View>

          <TouchableOpacity
            onPress={() =>
              nav.navigate(Screens.SLOTS, {gameId: SlotIds.NINE_ELEMENTS})
            }>
            <LinearGradient
              colors={['#FFBE0D', '#FF1E00']}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              style={{width: '100%', borderRadius: 24, marginTop: 32}}>
              <View
                style={{
                  backgroundColor: '#1D1C30',
                  borderRadius: 24,
                  alignItems: 'center',
                  gap: 20,
                  paddingVertical: 16,
                  margin: 2,
                  height: 113,
                  overflow: 'hidden',
                }}>
                <CustomText
                  fs={24}
                  fw="bold"
                  style={{zIndex: 20, marginTop: 0}}>
                  All elements
                </CustomText>
                <Row
                  gap={10}
                  style={{
                    marginHorizontal: 'auto',
                    height: 113 / 2,
                    marginTop: 10,
                  }}>
                  <Image
                    source={require('@/assets/images/book.png')}
                    style={styles.innerImage}
                  />
                  <Image
                    source={require('@/assets/images/lighting.png')}
                    style={styles.innerImage}
                  />
                  <Image
                    source={require('@/assets/images/fish.png')}
                    style={styles.innerImage}
                  />
                </Row>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <View style={{marginTop: 32, gap: 20}}>
            {SLOTS_DATA.map((game, index) => {
              const isCurrentGame = index
                ? doneGames[index - 1]
                : !doneGames[index];

              return (
                <Item
                  isCurrentGame={isCurrentGame}
                  isAlreadyDone={doneGames[index]}
                  game={game}
                  key={game.gameId}
                  onPress={() =>
                    nav.navigate(Screens.SLOTS, {gameId: game.gameId})
                  }
                />
              );
            })}
          </View>
        </ScrollView>
      </Container>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  innerImage: {
    width: 100,
    // height: 90,
    objectFit: 'contain',
  },
});
