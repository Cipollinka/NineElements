import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList, Screens} from '@/types/navigation';

import Main from '@/screens/Main';
import Slot from '@/screens/Slot';
import Settings from '@/screens/Settings';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Screens.MAIN}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={Screens.MAIN} component={Main} />
        <Stack.Screen name={Screens.SLOTS} component={Slot} />
        <Stack.Screen name={Screens.SETTINGS} component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
