import {
  Animated, Easing,
} from 'react-native';
import React, { useMemo, useCallback, useEffect } from 'react';
import { pokeball } from '../../assets';

function Pokeball({
  withRotate, width, height, style, ballStyle,
}) {
  const pokeballOpacity = useMemo(() => new Animated.Value(0), []);
  const rotate = useMemo(() => new Animated.Value(0), []);

  const rotatePokeball = useCallback(() => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 360,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
    // Animated.loop(
    //   Animated.sequence([
    //     Animated.timing(rotate, { toValue: 10, duration: 50, useNativeDriver: true }),
    //     Animated.timing(rotate, { toValue: 0, duration: 50, useNativeDriver: true }),
    //     Animated.timing(rotate, { toValue: -10, duration: 50, useNativeDriver: true }),

    //   ]),
    // ).start();
  }, [rotate]);

  useEffect(() => {
    if (withRotate) {
      Animated.timing(pokeballOpacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
        delay: 200,
        easing: Easing.inOut(Easing.quad),
      }).start();

      rotatePokeball();
    }
  }, [pokeballOpacity, withRotate]);

  const pokeballStyle = {
    opacity: pokeballOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        rotate: rotate.interpolate({
          inputRange: [0, 360],
          outputRange: ['0deg', '360deg'],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  return (
    <Animated.View style={[withRotate && pokeballStyle, style]}>
      <Animated.Image
        source={pokeball}
        style={{
          width, height, tintColor: 'white', opacity: 0.2, ...ballStyle,
        }}
      />
    </Animated.View>
  );
}

export default Pokeball;
