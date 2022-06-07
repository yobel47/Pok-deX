import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import {
  Home, Pokemon, Login, Register, Splash,
} from '../pages';

const Stack = createSharedElementStackNavigator();

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
      <Stack.Screen
        name="Splash"
        component={Splash}
      />
      <Stack.Screen
        name="Login"
        component={Login}
      />
      <Stack.Screen
        name="Register"
        component={Register}
      />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Pokemon"
        component={Pokemon}
        options={{
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              opacity: current.progress,
            },
          }),
        }}
        sharedElements={(route) => {
          const { item, from } = route.params;

          if (from === 'card') {
            const sharedArray = [
              {
                id: `item.${item.id}.image`,
              },
              {
                id: `item.${item.id}.name`,
              },
            ];

            return sharedArray;
          }

          return undefined;
        }}
      />
    </Stack.Navigator>
  );
}

export default Routes;
