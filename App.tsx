import React from 'react';
import AppNavigator from './src/components/AppNavigator';
import {AppRegistry, Text} from 'react-native';
import {name as appName} from './app.json';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
  // @ts-ignore
  Text.defaultProps = Text.defaultProps || {};
  // @ts-ignore
  Text.defaultProps.style = {fontFamily: 'LexendDeca-Regular'};

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
AppRegistry.registerComponent(appName, () => App);

export default App;
