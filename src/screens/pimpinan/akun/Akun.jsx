/** @format */

import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import useLogin from '../../../stores/login';
import logo from '../../../assets/images/logo.png';

import {useNavigation} from '@react-navigation/native';
import colors from '../../../styles/colors';
import TextComp from '../../../components/form/TextComp';
import KeyboardAvoidingComp from '../../../components/KeyboardAvoidingComp';
import InputComp from '../../../components/form/InputComp';
import {useForm} from 'react-hook-form';
import ButtonComp from '../../../components/form/ButtonComp';
import showToast from '../../../services/show-toast';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const Akun = () => {
  const navigation = useNavigation();
  const {setLogout, getLogin, setGantiPassword} = useLogin();
  const handleLogout = async () => {
    const cek = await setLogout();
    if (cek) {
      navigation.navigate('Login');
    }
  };

  // hook-form
  const {control, handleSubmit, watch, reset} = useForm({
    defaultValues: '',
  });

  const resetForm = () => {
    reset(
      {
        email: '',
        password: '',
        password_baru: '',
      },
      {
        keepErrors: true,
        keepDirty: true,
      },
    );
  };

  // ganti passpowd
  const handleSimpan = async data => {
    const cek = await getLogin();
    data.id = cek.id;

    console.log(data);

    const ganti = await setGantiPassword(data);
    if (ganti.status === 'berhasil') {
      resetForm();
    }
    console.log(ganti);
    showToast(ganti.data);
  };

  return (
    <SafeAreaView className="h-full">
      <View className="z-50">
        <Toast />
      </View>
      <KeyboardAvoidingComp className="flex-1">
        <ScrollView>
          <View>
            <View
              style={{
                marginTop: 4,
              }}>
              <Text
                style={{
                  color: colors.blue,
                  fontFamily: 'Poppins-ExtraBold',
                  fontSize: 20,
                  textAlign: 'center',
                }}>
                Pimpinan
              </Text>
              <Text
                style={{
                  color: colors.blue,
                  fontFamily: 'Poppins-ExtraBold',
                  fontSize: 20,
                  textAlign: 'center',
                }}>
                Fakultas Sains & Teknologi
              </Text>
            </View>
            {/* logo */}
            <Image
              source={logo}
              style={{
                width: 78,
                height: 80,
                resizeMode: 'stretch',
                alignSelf: 'center',
                marginVertical: 20,
              }}
            />
          </View>
          {/* Form */}
          <View className="flex-1">
            <View className="mx-2">
              <View>
                <TextComp className="text-[16px] font-[Poppins-Bold] text-center">
                  Ganti Email dan Password
                </TextComp>
              </View>
              <View>
                <View>
                  <InputComp
                    name="email"
                    label="Email baru"
                    placeholder="Masukan email baru"
                    control={control}
                  />
                </View>
                <View>
                  <InputComp
                    name="password"
                    label="Password lama"
                    placeholder="Password lama"
                    control={control}
                    rules={{
                      required: 'Password boleh kosong',
                    }}
                  />
                </View>
                <View>
                  <InputComp
                    name="password_baru"
                    label="Password baru"
                    placeholder="Masukan password baru"
                    control={control}
                  />
                </View>
                <View className="mx-6 mt-2 mb-10">
                  <ButtonComp
                    label="Simpan"
                    onPress={handleSubmit(handleSimpan)}
                  />
                </View>
              </View>
            </View>
            <View className="w-full">
              <TouchableOpacity onPress={handleLogout}>
                <View
                  className="mx-auto w-full"
                  style={{
                    borderWidth: 1,
                    borderColor: colors.pink,
                    borderRadius: 10,
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                  }}>
                  <Text
                    style={{
                      color: colors.dark,
                      fontFamily: 'Poppins-SemiBold',
                      textAlign: 'center',
                    }}>
                    Logout
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingComp>
    </SafeAreaView>
  );
};

export default Akun;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
