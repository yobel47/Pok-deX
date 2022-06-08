import {
  View, Text, Dimensions, StatusBar, ImageBackground, TouchableOpacity,
  Image, Alert, Keyboard,
  ScrollView,
} from 'react-native';
import React, {
  useState, useCallback, useEffect,
} from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  HelperText,
  Button,
} from 'react-native-paper';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { registerSchema } from '../../utils/validationSchema';
import styles from '../../utils/styles';
import { pokeball } from '../../assets';
import { Input, Loading } from '../../components';
import { capitalizeFirstLetter } from '../../api/utils';
import { register, databaseRef } from '../../api/services/firebase';
import { onLogScreenView } from '../../utils/onLogScreenView';

const { height, width } = Dimensions.get('screen');
const { wHeight, wWidth } = Dimensions.get('window');

function Register() {
  const navigation = useNavigation();

  const [photo, setPhoto] = useState(pokeball);
  const [photoForDB, setPhotoForDB] = useState(pokeball);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [loading, setLoading] = useState(false);

  const getImage = () => {
    launchImageLibrary(
      {
        quality: 0.9, maxWidth: 250, maxHeight: 250, includeBase64: true,
      },
      (response) => {
        if (response.didCancel || response.error) {
          // eslint-disable-next-line no-console
          console.log('Cancel Image Pick');
        } else {
          const source = response?.assets[0];
          setPhotoForDB(`data:${source.type};base64, ${source.base64}`);
          const Uri = { uri: source.uri };
          setPhoto(Uri);
          setHasPhoto(true);
        }
      },
    );
  };

  const onLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const onSubmit = (value) => {
    register(value.email, value.password)
      .then((res) => {
        const data = {
          fullname: value.fullname,
          email: value.email,
          bio: value.bio,
          uid: res.user.uid,
          photo: photoForDB,
        };

        databaseRef()
          .ref(`users/${res.user.uid}/`)
          .set(data);

        // storeData('user', dataLocal);
        Alert.alert('Register Success');
        navigation.navigate('Login');
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          Alert.alert('Failed', 'That email address is already in use!');
        }
        if (err.code === 'auth/invalid-email') {
          Alert.alert('Failed', 'That email address is invalid!');
        }
        Alert.alert(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    onLogScreenView('Register');
  }, []);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ backgroundColor: '#3267a6' }}>
          <StatusBar barStyle="light-content" backgroundColor="#3267a6" />

          <View style={{ backgroundColor: '#3267a6', width, height }}>

            <ImageBackground
        //   source={pokedex}
              resizeMode="cover"
              style={{
                width,
                height,
                marginTop: -height / 8,
                justifyContent: 'center',
                position: 'absolute',
              }}
            />
            <TouchableOpacity
              style={{
                width: 150,
                height: 150,
                borderRadius: 150 / 2,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                top: 40,
                position: 'absolute',
                backgroundColor: '#f4c41e',
              }}
              onPress={getImage}
            >
              <Image
                source={photo}
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: 120 / 2,
                }}
              />
              <View style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: 'white',
                borderRadius: 150,
                width: 50,
                height: 50,
              }}
              >
                <Icon
                  name={hasPhoto ? 'close-circle' : 'add-circle'}
                  size={50}
                  color={hasPhoto ? '#FA6C6C' : '#48CFB2'}
                  style={{
                    left: 1.5,
                    bottom: 1,
                  }}
                />
              </View>

            </TouchableOpacity>
            <View style={{
              // justifyContent: 'center',
              padding: 24,
              margin: 24,
              borderRadius: 20,
              marginTop: height / 3.5,
              backgroundColor: 'white',
            }}
            >
              <Text style={{ ...styles.applicationTitle, alignSelf: 'center', color: '#3267a6' }}>Register</Text>
              <Formik
                initialValues={{
                  name: '', email: '', password: '', bio: '',
                }}
                onSubmit={(values) => { Keyboard.dismiss(); setLoading(true); onSubmit(values); }}
                validationSchema={registerSchema}
              >
                {({
                  handleChange, handleBlur, handleSubmit, values, errors,
                }) => (
                  <View>
                    <Input
                      placeholder="Name"
                      mode="outlined"
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                      icon="account-circle"
                    />
                    {errors.name && (
                      <HelperText
                        type="error"
                        visible={errors}
                      >
                        {capitalizeFirstLetter(errors.name)}
                      </HelperText>
                    )}
                    <Input
                      placeholder="Email"
                      mode="outlined"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      icon="email"
                    />
                    {errors.email && (
                      <HelperText
                        type="error"
                        visible={errors}
                      >
                        {capitalizeFirstLetter(errors.email)}
                      </HelperText>
                    )}
                    <Input
                      placeholder="Password"
                      mode="outlined"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      icon="key"
                    />
                    {errors.password && (
                      <HelperText
                        type="error"
                        visible={errors}
                      >
                        {capitalizeFirstLetter(errors.password)}
                      </HelperText>
                    )}
                    <Input
                      placeholder="Bio"
                      mode="outlined"
                      onChangeText={handleChange('bio')}
                      onBlur={handleBlur('bio')}
                      value={values.bio}
                      icon="information"
                    />
                    {errors.bio && (
                      <HelperText
                        type="error"
                        visible={errors}
                      >
                        {capitalizeFirstLetter(errors.bio)}
                      </HelperText>
                    )}
                    <Button
                      theme={{ roundness: 150 }}
                      onPress={handleSubmit}
                      mode="contained"
                      style={{ marginTop: 12, paddingVertical: 2, fontSize: 2 }}
                    >
                      <Text style={{ fontSize: 16 }}>Submit</Text>
                    </Button>
                  </View>
                )}
              </Formik>
              <Text style={{
                fontSize: 18,
                alignSelf: 'center',
                color: 'black',
                marginTop: 32,
              }}
              >
                Already have an account?
              </Text>

              <Button
                theme={{
                  roundness: 150,
                }}
                onPress={onLogin}
                mode="text"
                style={{
                  alignSelf: 'center',
                }}
              >
                <Text style={{ fontSize: 18, textTransform: 'lowercase', marginBottom: 20 }}>login</Text>
              </Button>
            </View>

          </View>

        </View>
      </ScrollView>
      {loading && (
        <Loading
          size="large"
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.7)',
            bottom: 0,
            top: 0,
            left: 0,
            right: 0,
            width: wWidth,
            height: wHeight,
          }}
          color="white"
        />
      )}
    </>
  );
}

export default Register;
