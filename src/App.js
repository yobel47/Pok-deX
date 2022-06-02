import React from 'react';
import {
  View, StatusBar,
} from 'react-native';
import { Home } from './pages';

function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Home />
      </View>
    </>
  );
}

export default App;
