import {
  Animated, Dimensions, Text, Modal, View, TouchableOpacity,
} from 'react-native';
import React, { useState, useCallback, useMemo } from 'react';
import { pokeballImages } from '../../../assets';
import PokeballCatch from '../PokeballCatch';
import styles from '../../../utils/styles';
import getColorByPokemonType from '../../../utils/getColorByPokemonType';

const { height, width } = Dimensions.get('window');

function CatchAnimation({ translateY, item }) {
  const [getPokemon, setGetPokemon] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [prize, setPrize] = useState(false);
  const translateYDarker = useMemo(() => new Animated.Value(0), []);
  const translateYPokeball = useMemo(() => new Animated.Value(0), []);
  const rotatePokeball = useMemo(() => new Animated.Value(0), []);
  const scalePokeball = useMemo(() => new Animated.Value(0), []);

  const onDarker = useCallback(() => {
    Animated.timing(translateYDarker, {
      toValue: height,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(scalePokeball, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateYPokeball, {
      toValue: height,
      duration: 500,
      useNativeDriver: true,
    }).start(onRotatePokeball);
  }, []);

  const onRotatePokeball = useCallback(() => {
    Animated.sequence([
      Animated.delay(150),
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotatePokeball, { toValue: 10, duration: 100, useNativeDriver: true }),
          Animated.timing(rotatePokeball, { toValue: -10, duration: 100, useNativeDriver: true }),
          Animated.timing(rotatePokeball, { toValue: 10, duration: 100, useNativeDriver: true }),
          Animated.timing(rotatePokeball, { toValue: 0, duration: 100, useNativeDriver: true }),
        ]),
        { iterations: 1 },
      ),
    ]).start(gacha);
  }, []);

  const onLighter = useCallback(() => {
    Animated.timing(scalePokeball, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateYPokeball, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateYDarker, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(setGetPokemon(true));
  }, []);

  const darkerStyle = {
    translateY: translateYDarker.interpolate({
      inputRange: [0, height],
      outputRange: [-height, 0],
      extrapolate: 'clamp',
    }),
  };

  const pokeballAnimationStyle = {
    transform: [
      {
        translateY: translateYPokeball.interpolate({
          inputRange: [0, height],
          outputRange: [height, 0],
          extrapolate: 'clamp',
        }),
      }, {
        scale: scalePokeball.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [2, 1.5, 1],
          extrapolate: 'clamp',
        }),
      }, {
        rotate: rotatePokeball.interpolate({
          inputRange: [0, 360],
          outputRange: ['0deg', '360deg'],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const gacha = () => {
    const get = (Math.floor(Math.random() * 100));
    if (get >= 50) {
      setModalVisible(true);
      setPrize(true);
    } else {
      setModalVisible(true);
      setPrize(false);
    }
  };

  const modalColor = useMemo(
    () => getColorByPokemonType(item.types[0].name),
    [item.types],
  );

  return (
    <>
      <PokeballCatch
        translateY={translateY}
        onPress={onDarker}
        getPokemon={getPokemon}
        setGetPokemon={setGetPokemon}
      />

      <Animated.View style={{
        backgroundColor: 'rgba(0,0,0,0.6)',
        width,
        height,
        position: 'absolute',
        ...darkerStyle,
      }}
      />

      <Animated.Image
        source={pokeballImages}
        style={{
          position: 'absolute',
          alignSelf: 'center',
          width: 275,
          height: 275,
          top: 205,
          ...pokeballAnimationStyle,
        }}
      />
      <Modal
        visible={modalVisible}
        transparent
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 55,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={{
            width: 300,
            height: 275,
            backgroundColor: 'white',
            borderRadius: 30,
            alignItems: 'center',
            paddingVertical: 18,
            paddingHorizontal: 24,
            justifyContent: 'space-around',
          }}
          >
            <Text style={{ ...styles.applicationTitle }}>
              {prize ? 'Congratulations' : 'Sorry'}
              !
            </Text>
            <Text style={{ ...styles.pokemonName, textAlign: 'center' }}>
              {prize ? 'You got' : 'You lose'}
              {' '}
              {item.name}
              {' '}
              pokemon
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
                setTimeout(() => {
                  onLighter();
                }, 50);
              }}
            >
              <View
                style={{
                  backgroundColor: modalColor,
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingVertical: 4,
                  width: 100,
                  borderRadius: 15,
                }}
              >
                <Text style={{ ...styles.pokemonName, color: 'white' }}>OK</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </>
  );
}

export default CatchAnimation;
