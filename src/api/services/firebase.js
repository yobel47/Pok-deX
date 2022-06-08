import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

export const login = (email, pass) => auth().signInWithEmailAndPassword(email, pass);

export const register = (email, pass) => auth().createUserWithEmailAndPassword(email, pass);

export const userLoggedIn = (user) => auth().onAuthStateChanged(user);

export const getPokebagId = () => {
  const pokemonn = [];
  const pokemonData = databaseRef()
    .ref('/pokebag/1n24gsvFlJdredijJ1bk4AwiL772/')
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

  return pokemonData;
};

export const databaseRef = () => firebase
  .app()
  .database('https://pokedex-f7e95-default-rtdb.asia-southeast1.firebasedatabase.app/');
