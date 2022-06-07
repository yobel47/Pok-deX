import {
  View, Text, StatusBar, Image, Dimensions, TouchableOpacity, FlatList, Alert, Animated,
} from 'react-native';
import React, {
  useCallback, useState, useEffect, useMemo,
} from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { SharedElement } from 'react-navigation-shared-element';
import { pokeballHeader, pokeball } from '../../assets';
import styles from '../../utils/styles';
import { databaseRef } from '../../api/services/firebase';
import { Loading, PokemonCard } from '../../components';
import PokebagController from '../../api/controllers/Pokebag';

const { height, width } = Dimensions.get('screen');

function Profile() {
  const navigation = useNavigation();

  const opacity = useMemo(() => new Animated.Value(0), []);

  const [pokebagId] = useState([]);
  const [pokebagData, setPokebagData] = useState([]);
  const [loadingInitalData, setLoadingInitialData] = useState(true);

  const handleGoBack = useCallback(() => navigation.goBack(), [navigation]);

  const getPokebagId = useCallback(async () => {
    try {
      await databaseRef()
        .ref('/pokebag/1n24gsvFlJdredijJ1bk4AwiL772/')
        .once('value')
        .then((snapshot) => {
          snapshot.forEach((childSnapshot) => {
            childSnapshot.forEach((grandchildSnapshot) => {
              const item = grandchildSnapshot.val();
              item.key = grandchildSnapshot.key;

              pokebagId.push(item);
            });
          });
          return pokebagId;
        });

      getPokebagData().then(() => {
        if (loadingInitalData) {
          setLoadingInitialData(false);
        }
      });
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    } catch (err) {
      Alert.alert(
        'Fail to get Pokémons',
        'An error has ocurred when try to load the Pokémons, please try again.',
      );
      console.log(err);
    }
  }, [pokebagId, opacity]);

  const getPokebagData = useCallback(async () => {
    await PokebagController(pokebagId).then((item) => setPokebagData(item));
  }, [pokebagData]);

  useEffect(() => {
    getPokebagId();
  }, []);

  const renderItem = useCallback(({ item }) => (
    <PokemonCard item={item} opacity={opacity} />
    // <Text>{item.name}</Text>
  ));

  return (
    <View>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={{ marginTop: 25 }}>
        <Image
          resizeMode="contain"
          style={{ width, height: height / 4, marginTop: -20 }}
          source={pokeballHeader}
        />
        <SharedElement
          id="item.profile"
        >
          <View style={{
            width: 150,
            height: 150,
            borderRadius: 100,
            backgroundColor: '#f4c41e',
            justifyContent: 'center',
            overflow: 'hidden',
            alignSelf: 'center',
            marginTop: -90,
          }}
          >
            <Image
              source={pokeball}
              style={{
                width: 140, height: 140, alignSelf: 'center',
              }}
            />
          </View>
        </SharedElement>

        <View>
          <Text style={{
            color: 'black', ...styles.applicationTitle, fontSize: 32, alignSelf: 'center', marginVertical: 12,
          }}
          >
            Pokédex
          </Text>
          <View style={{ height: 1, backgroundColor: 'lightgrey' }} />
          <Text style={{
            ...styles.applicationTitle, fontSize: 32, marginTop: 32, marginHorizontal: 40,
          }}
          >
            Pokébag
          </Text>
          {loadingInitalData ? (
            <View style={{ marginTop: 20 }}>
              <Loading size="large" color="grey" style={{ marginTop: 40 }} />
            </View>
          ) : (
            <FlatList
              data={pokebagData}
              renderItem={renderItem}
            />
          )}
        </View>
      </View>
      <TouchableOpacity
        style={{
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 46,
          left: 24,
        }}
        onPress={handleGoBack}
      >
        <Icon name="arrow-left" color="black" size={30} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 46,
          right: 24,
        }}
        onPress={() => getPokebagData()}
      >
        <Icon name="log-out" color="black" size={30} />
      </TouchableOpacity>
    </View>
  );
}

export default Profile;
