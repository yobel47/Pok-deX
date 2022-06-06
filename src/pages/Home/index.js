import {
  View, FlatList, Animated, Alert, StatusBar,
} from 'react-native';
import React, {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import PokemonController from '../../api/controllers/Pokemon';
import {
  PokemonCard, Loading, Header,
} from '../../components';
import { API_OFFSET } from '../../constant';

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [counter, setCounter] = useState(1);
  const [loadingInitalData, setLoadingInitialData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const opacity = useMemo(() => new Animated.Value(0), []);

  const loadPokemons = useCallback(
    async (refresh) => {
      try {
        setLoading(true);

        const response = await PokemonController({ offset: refresh ? 0 : offset, limit: 5 });
        if (loadingInitalData) {
          setLoadingInitialData(false);
        }

        setPokemons(refresh ? response : [...pokemons, ...response]);
        setOffset(refresh ? -API_OFFSET : API_OFFSET * counter);
        setCounter(refresh ? 1 : counter + 1);
        setLoading(false);

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
    },
    [pokemons, loadingInitalData, offset, counter, opacity],
  );

  useEffect(() => {
    loadPokemons();
  }, []);

  const footer = useMemo(
    () => (loading
      && (<Loading size="large" color="grey" style={{ marginTop: 20, marginBottom: 30 }} />)
    ),
    [loading],
  );

  const refreshList = useCallback(async () => {
    setRefreshing(true);

    await loadPokemons(true);

    setRefreshing(false);
  }, [loadPokemons]);

  // const memoizedValue = useMemo(() => renderItem, [pokemons]);
  const keyExt = useCallback((item) => item.id);
  const renderItem = useCallback(({ item }) => (
    <PokemonCard item={item} opacity={opacity} />
  ));

  return (
    <View>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={{ marginTop: 25 }} />
      {loadingInitalData ? (
        <>
          <Header />
          <Loading size="large" color="grey" style={{ marginTop: 40 }} />
        </>
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          onRefresh={refreshList}
          refreshing={refreshing}
          data={pokemons}
          onEndReached={() => loadPokemons()}
          onEndReachedThreshold={0.9}
          keyExtractor={keyExt}
          renderItem={renderItem}
          ListHeaderComponent={Header}
          ListFooterComponent={footer}
        />
      )}

    </View>
  );
}

export default React.memo(Home);
