import {
  View, FlatList, Animated, Alert,
} from 'react-native';
import React, {
  useEffect, useState, useMemo, useCallback,
} from 'react';
// import PokemonController from '../../api/controllers/Pokemon';
import {
  PokemonCard, Loading, Header,
} from '../../components';
// import { API_OFFSET } from '../../constant';

function Home() {
  // const [pokemons, setPokemons] = useState([]);
  // const [offset, setOffset] = useState(0);
  // const [counter, setCounter] = useState(1);
  const [loadingInitalData, setLoadingInitialData] = useState(true);
  // const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const opacity = useMemo(() => new Animated.Value(0), []);
  // const translateY = useMemo(() => new Animated.Value(50), []);

  const loadPokemons = useCallback(
    // async (refresh) => {
    async () => {
      try {
        // setLoading(true);

        // const response = await PokemonController({ offset, limit: 20 });
        // console.log(response);
        // if (loadingInitalData) {
        setLoadingInitialData(false);
        // }

        // setPokemons(response);
        // // setOffset(refresh ? API_OFFSET : API_OFFSET * counter);
        // // setCounter(refresh ? 1 : counter + 1);
        // setLoading(false);

        // await setOffset(refresh ? API_OFFSET : API_OFFSET * counter);

        // PokemonController({ offset: refresh ? 0 : offset, limit: 20 })
        //   .then(
        //     (result) => {
        //       if (loadingInitalData) {
        //         setLoadingInitialData(false);
        //       }
        //       console.log(`refresh ${refresh}`);
        //       if (refresh) {
        //         setPokemons(result);
        //         setCounter(1);
        //       } else {
        //         setPokemons([...pokemons, ...result]);
        //         setCounter(counter + 1);
        //       }

        //       console.log(`offset ${offset}`);
        //       console.log(`counter ${counter}`);

        //       setLoading(false);
        // Animated.parallel([
        //   Animated.timing(opacity, {
        //     toValue: 1,
        //     duration: 600,
        //     useNativeDriver: true,
        //   }),

        //   // Animated.timing(translateY, {
        //   //   toValue: 0,
        //   //   duration: 700,
        //   //   useNativeDriver: true,
        //   // }),
        // ]).start();
        //     // console.log(result);
        //     },
        //   )
        //   .catch((error) => console.log(error));
      } catch (err) {
        console.log(err);
        Alert.alert(
          'Fail to get Pokémons',
          'An error has ocurred when try to load the Pokémons, please try again.',
        );
      }
    },
    // [pokemons, loadingInitalData, offset, counter, opacity],
    [loadingInitalData, opacity],
  );

  useEffect(() => {
    loadPokemons(false);
  }, []);

  // const footer = useMemo(
  //   () => (loading
  //     && (<Loading size="large" color="grey" style={{ marginTop: 20, marginBottom: 30 }} />)
  //   ),
  //   [loading],
  // );

  const refreshList = useCallback(async () => {
    setRefreshing(true);

    await loadPokemons(true);

    setRefreshing(false);
  }, [loadPokemons]);

  // const memoizedValue = useMemo(() => renderItem, [pokemons]);

  const renderItem = ({ item }) => (
    <PokemonCard item={item} opacity={opacity} />
  );

  return (
    <View>
      {loadingInitalData ? (
        <>
          <Header />
          <Loading size="large" color="grey" style={{ marginTop: 40 }} />
        </>
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator
          onRefresh={refreshList}
          refreshing={refreshing}
          // data={pokemons}
          onEndReached={() => loadPokemons(false)}
          onEndReachedThreshold={0.1}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListHeaderComponent={Header}
          // ListFooterComponent={footer}
        />
      )}

    </View>
  );
}

export default Home;
