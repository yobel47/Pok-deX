import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import {
  View, StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import codePush from 'react-native-code-push';
import Routes from './routes';

const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_START };

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3267a6',
    accent: '#f4c41e',
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'SF-Pro-Display-Regular',
    },
  },
};

function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Routes />
          </View>
        </GestureHandlerRootView>
      </NavigationContainer>
    </PaperProvider>

  );
}

export default codePush(codePushOptions)(App);
