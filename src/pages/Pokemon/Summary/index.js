import {
  Text, View, Animated, Easing,
} from 'react-native';
import React, { useMemo, useEffect } from 'react';
import FastImage from 'react-native-fast-image';
import { Pokeball, Tag } from '../../../components';
import styles from '../../../utils/styles';

function Summary({ item, translateY }) {
  const translateXNumber = useMemo(() => new Animated.Value(100), []);
  const translateXGenera = useMemo(() => new Animated.Value(200), []);
  const translateXName = useMemo(() => new Animated.Value(100), []);
  const translateXTags = useMemo(() => new Animated.Value(200), []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateXNumber, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.quad),
      }),
      Animated.timing(translateXGenera, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.quad),
      }),
      Animated.timing(translateXName, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.quad),
      }),
      Animated.timing(translateXTags, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.quad),
      }),
    ]).start();
  }, [translateXNumber, translateXGenera, translateXName, translateXTags]);

  const pokedexNumberStyle = {
    transform: [
      {
        translateX: translateXNumber.interpolate({
          inputRange: [0, 100],
          outputRange: [0, 100],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const generaStyle = {
    transform: [
      {
        translateX: translateXGenera.interpolate({
          inputRange: [0, 200],
          outputRange: [0, 200],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const pokedexNameStyle = {
    transform: [
      {
        translateX: translateXName.interpolate({
          inputRange: [0, 100],
          outputRange: [0, -200],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const tagsStyle = {
    transform: [
      {
        translateX: translateXTags.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -250],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const summaryStyle = {
    zIndex: translateY.interpolate({
      inputRange: [-360, 0],
      outputRange: [-1, 2],
      extrapolate: 'clamp',
    }),
    opacity: translateY.interpolate({
      inputRange: [-200, 0],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  };

  const pokemonImageContainerStyle = {
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
    ],
  };

  return (
    <Animated.View style={{ height: 360, ...summaryStyle }}>
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
        >
          <Animated.View style={pokedexNameStyle}>
            <Text style={{ ...styles.applicationTitle, color: 'white' }}>{item.name}</Text>

          </Animated.View>
          <Animated.View style={pokedexNumberStyle}>
            <Text style={{ ...styles.pokemonNumber, color: 'white', fontSize: 20 }}>
              #
              {item.pokedex_number}
            </Text>
          </Animated.View>
        </View>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 16,
        }}
        >
          <Animated.View style={{
            flexDirection: 'row',
            alignItems: 'center',
            ...tagsStyle,
          }}
          >
            {item.types.map((type) => (
              <Tag
                key={type.url}
                type={type.name}
                tagStyle={{
                  paddingHorizontal: 10,
                  marginRight: 10,
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  borderRadius: 16,
                }}
                fontStyle={{ fontSize: 18 }}
                height={15}
                width={15}
              />
            ))}
          </Animated.View>
          <Animated.View style={generaStyle}>
            <Text style={{ ...styles.description, color: 'white', fontSize: 18 }}>{item.genera}</Text>
          </Animated.View>
        </View>
        <Animated.View style={{ marginTop: 24, alignItems: 'center', ...pokemonImageContainerStyle }}>
          <Pokeball
            width={250}
            height={250}
            withRotate
            style={{
              position: 'absolute',
              bottom: 0,
              alignSelf: 'center',
            }}
          />
          <FastImage
            style={{
              width: 256,
              height: 256,
            }}
            source={{ uri: item.image }}
          />
        </Animated.View>
      </View>
    </Animated.View>
  );
}

export default Summary;
