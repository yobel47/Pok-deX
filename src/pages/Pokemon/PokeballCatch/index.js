import {
  Animated, Easing, TouchableWithoutFeedback,
} from 'react-native';
import React, { useMemo, useCallback, useEffect } from 'react';

import { pokeballImages } from '../../../assets';

function PokeballCatch({
  translateY, onPress, getPokemon, setGetPokemon,
}) {
  const rotate = useMemo(() => new Animated.Value(0), []);
  const translateYPokeball = useMemo(() => new Animated.Value(0), []);

  const rotatePokeball = useCallback(() => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 360,
        duration: 2900,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [rotate]);

  useEffect(() => {
    rotatePokeball();
  }, []);

  useEffect(() => {
    movePokeballBack();
  }, [getPokemon]);

  const movePokeball = useCallback(() => {
    Animated.timing(translateYPokeball, {
      toValue: 150,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [translateYPokeball]);

  const movePokeballBack = useCallback(() => {
    Animated.timing(translateYPokeball, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(setGetPokemon(false));
  }, [translateYPokeball]);

  const pokemonCatchStyle = {
    opacity: translateY.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    transform: [
      {
        translateY: translateY.interpolate({
          inputRange: [-100, 0, 200],
          outputRange: [-20, 0, 25],
          extrapolate: 'clamp',
        }),
      },
      {
        scale: translateY.interpolate({
          inputRange: [-100, 0, 200],
          outputRange: [0.9, 1, 1.1],
          extrapolate: 'clamp',
        }),
      },
      {
        rotate: rotate.interpolate({
          inputRange: [0, 360],
          outputRange: ['0deg', '360deg'],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const pokemonCatchTranslateStyle = {
    translateY: translateYPokeball.interpolate({
      inputRange: [0, 150],
      outputRange: [0, 150],
      extrapolate: 'clamp',
    }),
  };

  return (
    <Animated.View style={pokemonCatchTranslateStyle}>
      <TouchableWithoutFeedback
        style={{
          position: 'absolute', alignSelf: 'center', bottom: 20,
        }}
        onPress={() => {
          if (!getPokemon) {
            movePokeball();
          }
          onPress();
        }}
      >
        <Animated.Image
          source={pokeballImages}
          style={{
            alignSelf: 'center',
            width: 100,
            height: 100,
            ...pokemonCatchStyle,
            bottom: 20,
          }}
        />
      </TouchableWithoutFeedback>
    </Animated.View>

  );
}

export default React.memo(PokeballCatch);
