/* eslint-disable camelcase */
import {
  Dimensions, Animated, Text, View,
} from 'react-native';
import React, { useMemo } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Foundation';
import replaceString from '../../utils/replaceString';
import convertValues from '../../utils/convertValues';
import styles from '../../utils/styles';
import getPokemonGenderStats from '../../utils/getPokemonGenderStats';

const { height } = Dimensions.get('window');

function Details({ open, item }) {
  const pokemonFormatted = useMemo(() => ({
    ...item,
    descriptionWithNoBreakLine: replaceString(item.description),
    heightInMeters: convertValues.decimeterToMeter(item.height),
    heightInFeet: convertValues.decimeterToFeet(item.height),
    weightInKilograms: convertValues.hectogramsToKilograms(item.weight),
    weightInPounds: convertValues.hectogramsToPounds(item.weight),
  }), [item]);

  const pokemonGendersRate = getPokemonGenderStats(item.gender_rate);

  return (
    <Animated.View style={{
      height,
      backgroundColor: 'white',
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      paddingVertical: 40,
      overflow: 'hidden',
    }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={open}
        style={{
          flex: 1,
          paddingHorizontal: 24,
          marginBottom: 50,
        }}
      >
        <View style={{ marginBottom: 12 }}>
          <Text style={{ ...styles.pokemonName, fontSize: 24 }}>
            About
          </Text>
        </View>

        <View style={{ marginBottom: 24 }}>
          <Text style={{ ...styles.pokemonType, fontSize: 18 }}>
            {pokemonFormatted.descriptionWithNoBreakLine}
          </Text>
        </View>

        <View style={{ marginBottom: 24 }}>
          <View style={{
            backgroundColor: 'white',
            borderRadius: 16,
            marginHorizontal: 10,
            padding: 24,
            flexDirection: 'row',
            justifyContent: 'space-between',
            elevation: 4,
            shadowColor: 'black',
            shadowOffset: { width: 4, height: 3 },
            shadowOpacity: 0.8,
            shadowRadius: 5,
          }}
          >
            <View>
              <Text style={{ ...styles.pokemonType, fontSize: 18 }}>
                Height
              </Text>

              <Text style={{ ...styles.pokemonName, fontSize: 16 }}>
                {pokemonFormatted.heightInMeters}
                {' '}
                m (
                {pokemonFormatted.heightInFeet}
                ft)
              </Text>
            </View>
            <View>
              <Text style={{ ...styles.pokemonType, fontSize: 18 }}>
                Weight
              </Text>

              <Text style={{ ...styles.pokemonName, fontSize: 16 }}>
                {pokemonFormatted.weightInKilograms}
                {' '}
                kg (
                {pokemonFormatted.weightInPounds}
                {' '}
                lbs)
              </Text>
            </View>

          </View>

        </View>
        <View style={{ marginBottom: 24 }}>
          <Text style={{ ...styles.pokemonName, fontSize: 24 }}>
            Breeding
          </Text>
          <View style={{
            marginTop: 16,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          >
            <Text style={{
              ...styles.pokemonType, fontSize: 18, width: 110,
            }}
            >
              Gender
            </Text>

            {pokemonGendersRate.map((gender) => (
              <Text
                key={gender.gender}
                style={{
                  ...styles.pokemonName,
                  fontSize: 16,
                  marginLeft: 16,
                }}
              >
                {gender.gender === 'genderless' ? (
                  <Text style={{ ...styles.pokemonName, fontSize: 16 }}>Genderless</Text>
                ) : (
                  <>
                    <Icon
                      name={
                      gender.gender === 'male' ? 'male-symbol' : 'female-symbol'
                    }
                      color={gender.gender === 'male' ? '#6890F0' : '#EE99AC'}
                      size={16}
                    />
                    {'  '}
                    {gender.rate}
                    %
                  </>
                )}
              </Text>
            ))}
          </View>
          <View style={{
            marginTop: 12,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          >
            <Text style={{
              ...styles.pokemonType, fontSize: 18, width: 110,
            }}
            >
              Egg Groups
            </Text>
            <View style={{
              marginLeft: 16, width: '100%', flexDirection: 'row',
            }}
            >
              {item.egg_groups.map((egg_group) => (
                <Text
                  key={egg_group.url}
                  style={{ ...styles.pokemonName, fontSize: 16, marginRight: 12 }}
                >
                  {egg_group.name}
                </Text>
              ))}
            </View>

          </View>
        </View>

        <View style={{ marginBottom: 32 }}>
          <Text style={{ ...styles.pokemonName, fontSize: 24 }}>
            Training
          </Text>

          <View style={{
            marginTop: 16,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          >
            <Text style={{
              ...styles.pokemonType, fontSize: 18, width: 110,
            }}
            >
              Base EXP
            </Text>

            <Text style={{ ...styles.pokemonName, fontSize: 16, marginLeft: 16 }}>
              {item.base_experience}
            </Text>
          </View>
        </View>

        <View style={{ marginBottom: 32 }}>
          <Text style={{ ...styles.pokemonName, fontSize: 24, marginBottom: 16 }}>
            Base Stats
          </Text>

          {item.stats.map((stat) => (
            <View
              key={stat.url}
              style={{
                marginBottom: 8,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text style={{
                ...styles.pokemonType, fontSize: 18, width: 110,
              }}
              >
                {stat.name}
              </Text>

              <View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              >
                <Text
                  style={{
                    ...styles.pokemonName,
                    fontSize: 16,
                    marginLeft: 16,
                    width: 30,
                    textAlign: 'right',
                  }}
                >
                  {stat.base_stat}
                </Text>

                <View style={{
                  flex: 1,
                  overflow: 'hidden',
                  height: 4,
                  backgroundColor: 'lightgrey',
                  marginLeft: 16,
                  borderRadius: 150,
                }}
                >
                  <Animated.View
                    style={{
                      height: 4,
                      backgroundColor: stat.base_stat < 50 ? 'red' : 'green',
                      width: `${stat.base_stat}%`,
                      borderRadius: 150,
                    }}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>

    </Animated.View>
  );
}

export default React.memo(Details);
