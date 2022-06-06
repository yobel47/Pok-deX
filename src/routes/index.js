import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { Home, Pokemon } from '../pages';

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
          const { item } = route.params;

          const sharedArray = [
            {
              id: `item.${item.id}.image`,
            },
            {
              id: `item.${item.id}.name`,
            },
          ];

          return sharedArray;
        }}
      />
    </Stack.Navigator>
  );
}

export default Routes;
