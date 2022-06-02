/* eslint-disable no-console */
import {
  View, Text, TouchableOpacity,
} from 'react-native';
import React from 'react';
import PokemonController from './api/controllers/Pokemon';
import Header from './components/Header';

function App() {
  const tesi = () => {
    const query = { offset: 0, limit: 20 };
    PokemonController(query)
      .then(
        (result) => console.log(result),
      )
      .catch((error) => console.log(error));
  };

  return (
    <View>
      <Text>App</Text>
      <Header>
        <Text>ahooo</Text>
      </Header>
      <TouchableOpacity onPress={() => tesi()}>
        <Text>Test</Text>
      </TouchableOpacity>
    </View>
  );
}

export default App;
