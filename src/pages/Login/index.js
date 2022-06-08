import {
  View, Text, ImageBackground, Dimensions, StatusBar, ScrollView, Alert, Keyboard,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import {
  HelperText,
  Button,
} from 'react-native-paper';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import analytics from '@react-native-firebase/analytics';
import { loginSchema } from '../../utils/validationSchema';
import styles from '../../utils/styles';
import { pokedex } from '../../assets';
import { Input, Loading } from '../../components';
import { capitalizeFirstLetter } from '../../api/utils';
import { databaseRef, login } from '../../api/services/firebase';
import { storeData } from '../../utils/localStorage';
import { onLogScreenView } from '../../utils/onLogScreenView';

const { height, width } = Dimensions.get('screen');

function Login() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const onRegister = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  const onSubmit = (value) => {
    login(value.email, value.password)
      .then((res) => {
        databaseRef()
          .ref(`users/${res.user.uid}/`)
          .once('value')
          .then((resDB) => {
            analytics().logEvent('Login');
            onLogScreenView('Login');
            analytics().setUserId(resDB.val().uid);
            if (resDB.val()) {
              storeData('user', resDB.val());
              navigation.replace('Home');
              Alert.alert('Login Success');
            }
          });
      })
      .catch((err) => {
        if (err.code === 'auth/invalid-email') {
          Alert.alert('Failed', 'That email address is invalid!');
        }
        Alert.alert(err.message);
        setLoading(false);
      });
  };

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{ height }}
        showsVerticalScrollIndicator={false}
      >
        <SharedElement id="item.register">
          <View style={{ backgroundColor: '#3267a6' }}>
            <StatusBar barStyle="light-content" backgroundColor="#3267a6" />

            <View style={{ backgroundColor: '#3267a6', width, height }}>
              <ImageBackground
                source={pokedex}
                resizeMode="cover"
                style={{
                  width,
                  height,
                  marginTop: -height / 8,
                  justifyContent: 'center',
                  position: 'absolute',
                }}
              />
              <View style={{
                justifyContent: 'center',
                padding: 24,
                margin: 24,
                borderRadius: 20,
                marginTop: height / 3.5,
                backgroundColor: 'white',
              }}
              >
                <Text style={{
                  ...styles.applicationTitle,
                  alignSelf: 'center',
                  color: '#3267a6',
                }}
                >
                  Login
                </Text>

                <Formik
                  initialValues={{ email: '', password: '' }}
                  onSubmit={(value) => { Keyboard.dismiss(); setLoading(true); onSubmit(value); }}
                  validationSchema={loginSchema}
                >
                  {({
                    handleChange, handleBlur, handleSubmit, values, errors,
                  }) => (
                    <View>
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
                  Doesn&apos;t have an account?
                </Text>

                <Button
                  theme={{
                    roundness: 150,
                  }}
                  onPress={onRegister}
                  mode="text"
                  style={{
                    alignSelf: 'center',
                  }}
                >
                  <Text style={{ fontSize: 18, textTransform: 'lowercase' }}>Register</Text>
                </Button>
              </View>
            </View>
          </View>
        </SharedElement>
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
          width,
          height,
        }}
        color="white"
      />
      )}
    </>
  );
}

export default Login;
