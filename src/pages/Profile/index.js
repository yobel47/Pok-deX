import {
  View, Text, StatusBar, Image, Dimensions, TouchableOpacity, FlatList, Alert, Animated,
} from 'react-native';
import React, {
  useCallback, useState, useEffect, useMemo,
} from 'react';
import {
  useNavigation, useRoute,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { SharedElement } from 'react-navigation-shared-element';
import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
import { pokeballHeader } from '../../assets';
import styles from '../../utils/styles';
import { getPokebagId } from '../../api/services/firebase';
import { Loading, PokemonCard } from '../../components';
import PokebagController from '../../api/controllers/PokebagController';
import { removeData } from '../../utils/localStorage';
import { onLogScreenView } from '../../utils/onLogScreenView';

const { height, width } = Dimensions.get('screen');

function Profile() {
  const navigation = useNavigation();
  const route = useRoute();
  const { data } = route.params;

  const opacity = useMemo(() => new Animated.Value(0), []);

  const [, setPokebagId] = useState([]);
  const [pokebagData, setPokebagData] = useState([]);
  const [loadingInitalData, setLoadingInitialData] = useState(true);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const getId = () => {
    try {
      getPokebagId(data.uid).then((value) => {
        const sortedValue = value.sort((a, b) => a - b);
        setPokebagId(sortedValue);
        getPokebagData(sortedValue);
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
    }
  };

  const getPokebagData = (value) => {
    PokebagController(value).then((item) => {
      setPokebagData(item);
      if (loadingInitalData) {
        setLoadingInitialData(false);
      }
    });
  };

  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        removeData('user').then(() => navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        }));
        analytics().logEvent('Logout');
      })
      .catch((err) => {
        Alert.alert(err.message);
      });
  };

  useEffect(() => navigation.addListener('focus', () => {
    getId();
    onLogScreenView('Profile');
  }), [navigation]);

  const renderItem = useCallback(({ item }) => (
    <PokemonCard item={item} opacity={opacity} profile={data} />
  ), []);

  const emptyComponent = useCallback(() => (
    <View style={{ height: '100%' }}>
      <Text style={{
        ...styles.applicationTitle,
        width: 200,
        fontSize: 20,
        marginTop: 58,
        textAlign: 'center',
        marginHorizontal: 40,
        alignSelf: 'center',
      }}
      >
        There is no pokemon in your bag.
      </Text>
    </View>

  ), []);

  const header = (
    <>
      <Image
        resizeMode="contain"
        style={{ width, height: height / 4, marginTop: 0 }}
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
            source={data.photo}
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
          {data.fullname}
        </Text>
        <View style={{ height: 1, backgroundColor: 'lightgrey' }} />
        <Text style={{
          ...styles.applicationTitle, fontSize: 32, marginTop: 32, marginHorizontal: 40,
        }}
        >
          Pokébag
        </Text>
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
        onPress={() => signOut()}
      >
        <Icon name="log-out" color="black" size={30} />
      </TouchableOpacity>
    </>
  );

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {loadingInitalData ? (
        <>
          {header}
          <View style={{ marginTop: 20 }}>
            <Loading size="large" color="grey" style={{ marginTop: 40 }} />
          </View>
        </>
      ) : (
        <FlatList
          data={pokebagData}
          renderItem={renderItem}
          ListHeaderComponent={header}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
          ListEmptyComponent={emptyComponent}
        />
      )}
    </View>
  );
}

export default Profile;
