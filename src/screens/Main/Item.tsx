import {View, Image, TouchableOpacity} from 'react-native';
import React, {useMemo, useState} from 'react';
import {Game} from '@/types/common';
import Row from '@/components/layout/Row';
import CustomText from '@/components/ui/Text';
import Collapsible from 'react-native-collapsible';
import ArrowIcon from '@/assets/icons/arrow.svg';
import CheckBoxIcon from '@/assets/icons/checkbox.svg';
import {SLOTS_DATA_IMAGES} from '@/constants/common';
import {useUserStore} from '@/stores/userStore';
import LockIcon from '@/assets/icons/lock.svg';

interface Props {
  game: Game;
  isCurrentGame: boolean;
  isAlreadyDone: boolean;
  onPress: () => void;
}

export default function Item({
  game,
  isCurrentGame,
  onPress,
  isAlreadyDone,
}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const progress = useUserStore(
    state => state.progress[game.gameId],
  ) as number[];

  const progressBoolean = useMemo(() => {
    if (isAlreadyDone) return [true, true, true];
    if (!game.tasks.length) return [false, false, false];

    return progress.reduce(
      (acc, value, index) => {
        if (typeof value !== 'number') return acc;
        console.log('index', index);

        if (index === 1) {
          acc[index] = value >= 1;
          return acc;
        }
        acc[index] = value >= game.tasks[index].totalValue;

        return acc;
      },
      [false, false, false],
    );
  }, [progress, game, isAlreadyDone]);

  const tasksCompleatCount = progressBoolean.filter(item => !item).length;
  const isPressDisabled = !isCurrentGame && !isAlreadyDone;

  return (
    <TouchableOpacity disabled={isPressDisabled} onPress={onPress}>
      <Row
        style={{
          width: '100%',
          justifyContent: 'space-between',
          backgroundColor: '#1D1C30',
          borderRadius: 24,
          height: 113,
          position: 'relative',
          overflow: 'hidden',
          opacity: isPressDisabled ? 0.5 : 1,
        }}>
        {isPressDisabled && (
          <View
            style={{
              position: 'absolute',
              backgroundColor: '#132B78',
              top: 0,
              left: 0,
              borderBottomRightRadius: 20,
              width: 34,
              height: 34,
              zIndex: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LockIcon style={{marginRight: 2, marginBottom: 2}} />
          </View>
        )}
        <Image
          source={SLOTS_DATA_IMAGES[game.gameId]}
          style={{width: 116, height: 113}}
        />
        <View style={{marginRight: 20}}>
          <CustomText fw="bold" fs={24}>
            {game.title}
          </CustomText>
        </View>
      </Row>

      <Row
        gap={8}
        style={{
          marginHorizontal: 'auto',
          marginTop: 20,
          display: isCurrentGame || isAlreadyDone ? 'flex' : 'none',
        }}>
        <TouchableOpacity onPress={() => setIsCollapsed(prev => !prev)}>
          <Row gap={8}>
            <CustomText fs={14}>
              {isAlreadyDone
                ? 'Completed tasks'
                : `Complete ${tasksCompleatCount} task${
                    tasksCompleatCount > 1 ? 's' : ''
                  }`}
            </CustomText>
            <ArrowIcon
              style={{transform: [{rotate: isCollapsed ? '0deg' : '180deg'}]}}
            />
          </Row>
        </TouchableOpacity>
      </Row>

      <Collapsible collapsed={isCollapsed}>
        <View
          style={{
            backgroundColor: '#1D1C30',
            borderRadius: 24,
            padding: 16,
            gap: 20,
            marginTop: 12,
          }}>
          {game.tasks.map((task, index) => (
            <Row
              style={{width: '100%', justifyContent: 'space-between'}}
              key={task.title}>
              <Row gap={8}>
                {progressBoolean[index] ? (
                  <CheckBoxIcon />
                ) : (
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 4,
                      borderWidth: 1,
                      borderColor: '#fff',
                    }}
                  />
                )}
                <CustomText fs={12}>{task.title}</CustomText>
              </Row>

              {index !== 1 && (
                <View>
                  <CustomText fs={12}>
                    {progress[index]}/{task.totalValue}
                  </CustomText>
                </View>
              )}
            </Row>
          ))}
        </View>
      </Collapsible>
    </TouchableOpacity>
  );
}
