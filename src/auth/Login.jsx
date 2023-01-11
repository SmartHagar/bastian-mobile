/** @format */

import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import myColors from '../styles/colors';
import useLogin from '../stores/login';
import LoadingComp from '../components/LoadingComp';

import {useNavigation} from '@react-navigation/native';
import colors from '../styles/colors';

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [pesanError, setPesanError] = useState('');

  const [loading, setLoading] = useState(true);

  const {setLogin, getLogin} = useLogin();

  const fetchData = async () => {
    const cek = await getLogin();
    if (cek && cek.role === 'bendahara') {
      navigation.navigate('DashboardBendahara');
    }
    if (cek && cek.role === 'pimpinan') {
      navigation.navigate('DashboardPimpinan');
    }
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const handleLogin = async () => {
    setLoading(true);
    const row = {
      email,
      password,
    };
    const cek = await setLogin(row);

    // console.log(cek);

    if (cek.error) {
      setPesanError(cek.error.message);
    }

    if (cek.status === 'berhasil') {
      setEmail('');
      setPassword('');
      setPesanError('');
      fetchData();
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <LoadingComp />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <StatusBar backgroundColor={myColors.primary} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={{fontFamily: 'Poppins_100Thin', fontSize: 30}}>
            Selamat Datang
          </Text>
          <Image
            style={styles.image}
            source={require('./../assets/images/logo.png')}
          />

          <StatusBar style="auto" />
          <View style={{marginBottom: 5}}>
            <Text style={{color: colors.pink}}>{pesanError}</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email"
              placeholderTextColor="#003f5c"
              autoCapitalize="none"
              value={email}
              onChangeText={email => setEmail(email)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              value={password}
              onChangeText={password => setPassword(password)}
            />
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  inner: {
    flex: 1,
    alignItems: 'center',
    marginTop: '10%',
  },

  image: {
    width: 150,
    height: 150,
    resizeMode: 'stretch',
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: '#f0f4fc',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 10,
    alignItems: 'flex-start',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 5,
    marginLeft: 20,
    color: colors.dark,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: '70%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: myColors.primary,
  },
  loginText: {
    color: '#fff',
    fontFamily: 'Poppins_600SemiBold',
  },
});
