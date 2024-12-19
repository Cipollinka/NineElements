import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export enum Screens {
  MAIN = 'main',
  SLOTS = 'slots',
  SETTINGS = 'settings',
}

export type RootStackParamList = {
  [Screens.MAIN]: undefined;
  [Screens.SLOTS]: {gameId: string};
  [Screens.SETTINGS]: undefined;
};

export type ScreenNavigationProp<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
};

export type UseNavigationProp = NativeStackNavigationProp<RootStackParamList>;
