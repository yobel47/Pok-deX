import {
  Text, View, StatusBar, Dimensions,
} from 'react-native';
import React, { useMemo } from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import getColorByPokemonType from '../../utils/getColorByPokemonType';
import { BiggerDots } from '../../assets';
import Header from './Header';
import Summary from './Summary';

const { height } = Dimensions.get('window');

function Pokemon() {
  const route = useRoute();
  const { item } = route.params;

  const backgroundColor = useMemo(
    () => getColorByPokemonType(item.types[0].name),
    [item.types],
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <View style={{ flex: 1, backgroundColor }}>
        <View style={{
          width: 212,
          height: 212,
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderRadius: 24,
          position: 'absolute',
          top: -100,
          left: -120,
          transform: [{ rotate: '-12deg' }],
        }}
        />
        <BiggerDots
          width={200}
          height={100}
          style={{
            color: 'rgba(255,255,255,0.2)',
            transform: [{ rotate: '90deg' }],
            right: 80,
            top: -90,
            position: 'absolute',
          }}
        />

        <View style={{ flex: 1 }}>
          {/* Header */}
          <Header item={item} />

          {/* Summary */}
          <Summary item={item} />

          <PanGestureHandler>
            <View style={{
              flex: 1,
              position: 'relative',
            }}
            >
              <View style={{
                height: height - (25 + 64),
                backgroundColor: 'white',
                borderTopLeftRadius: 32,
                borderTopRightRadius: 32,
                paddingVertical: 16,
              }}
              >
                <View style={{
                  paddingTop: 16,
                  paddingBottom: 24,
                  marginHorizontal: 24,
                  borderBottomWidth: 1,
                  borderStyle: 'solid',
                  borderColor: 'lightgrey',
                  position: 'relative',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}
                >
                  <Text>asd</Text>

                </View>

              </View>
            </View>
          </PanGestureHandler>
        </View>
      </View>
    </>
  );
}

export default Pokemon;
