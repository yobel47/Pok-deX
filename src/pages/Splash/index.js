import {
  View, StatusBar, ImageBackground,
} from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { pokedex } from '../../assets';
import { Pokeball } from '../../components';

function Splash() {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 1500);
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#3267a6" />

      <View style={{
        backgroundColor: '#3267a6', height: '100%', flex: 1, justifyContent: 'center',
      }}
      >
        <ImageBackground
          source={pokedex}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            position: 'absolute',
          }}
        />
        <Pokeball
          width={120}
          height={120}
          withRotate
          style={{
            // position: 'absolute',
            top: 0,
            bottom: 0,
            alignSelf: 'center',
          }}
          ballStyle={{ opacity: 1 }}
        />
      </View>
    </>
  );
}

export default Splash;
