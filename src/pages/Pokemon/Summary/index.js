import { Text, View } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { Pokeball, Tag } from '../../../components';
import styles from '../../../utils/styles';

function Summary({ item }) {
  return (
    <>
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
      <View style={{ height: 64 }}>
        <View style={{ flex: 1, paddingHorizontal: 24 }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'space-between',
          }}
          >
            <Text style={{ ...styles.applicationTitle, color: 'white' }}>{item.name}</Text>
            <Text style={{ ...styles.pokemonNumber, color: 'white', fontSize: 20 }}>
              #
              {item.pokedex_number}
            </Text>
          </View>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 16,
          }}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
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
            </View>
            <Text style={{ ...styles.description, color: 'white', fontSize: 18 }}>{item.genera}</Text>
          </View>
          <View style={{ marginTop: 24, alignItems: 'center' }}>
            <FastImage
              style={{
                width: 256,
                height: 256,
              }}
              source={{ uri: item.image }}
            />
          </View>
        </View>
      </View>
    </>
  );
}

export default Summary;
