import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

export const login = (email, pass) => auth().signInWithEmailAndPassword(email, pass);

export const register = (email, pass) => auth().createUserWithEmailAndPassword(email, pass);

export const userLoggedIn = (user) => auth().onAuthStateChanged(user);

export const catchPokemon = (uid, pokemonId) => {
  databaseRef()
    .ref(`/pokebag/${uid}`)
    .push()
    .set({
      id: pokemonId,
    });
};

export const releasePokemon = (uid, pokemonId) => {
  databaseRef()
    .ref(`/pokebag/${uid}/`)
    .once('value')
    .then((val) => {
      val.forEach((item) => {
        item.forEach((childItem) => {
          if (childItem.val() === pokemonId) {
            databaseRef()
              .ref(`/pokebag/${uid}/${item.key}`)
              .set(null);
          }
        });
      });
    });
};

export const getPokebagId = (uid) => {
  const pokemonn = [];
  return databaseRef()
    .ref(`/pokebag/${uid}`)
    .once('value')
    .then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        childSnapshot.forEach((grandchildSnapshot) => {
          const item = grandchildSnapshot.val();
          item.key = grandchildSnapshot.key;

          pokemonn.push(item);
        });
      });
      return pokemonn;
    });
};

export const databaseRef = () => firebase
  .app()
  .database('https://pokedex-f7e95-default-rtdb.asia-southeast1.firebasedatabase.app/');
