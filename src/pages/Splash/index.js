import {
  View, StatusBar, ImageBackground,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { pokedex } from '../../assets';
import { Pokeball } from '../../components';

function Splash() {
  const navigation = useNavigation();
  const [initializing, setInitializing] = useState(true);
  const [, setUserLogin] = useState();

  function onAuthStateChanged(user) {
    setUserLogin(user);
    if (initializing) {
      setInitializing(false);
      if (user) {
        setTimeout(() => {
          navigation.replace('Home');
        }, 1500);
      } else {
        setTimeout(() => {
          navigation.replace('Login');
        }, 1500);
      }
    }
  }

  useEffect(
    () => auth().onAuthStateChanged(onAuthStateChanged), // unsubscribe on unmount
    [initializing],
  );

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
