import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Pokemon } from '../pages';

const Stack = createStackNavigator();

function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Pokemon"
        component={Pokemon}
      />
    </Stack.Navigator>
  );
}

export default Routes;
