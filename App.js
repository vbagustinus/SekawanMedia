import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return <GestureHandlerRootView><AppNavigator /></GestureHandlerRootView>;
};

export default App;
