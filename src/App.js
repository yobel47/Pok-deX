import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import {
  View, StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';

function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Routes />
        </View>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

export default App;
