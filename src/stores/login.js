/** @format */

import create from 'zustand';
import {devtools} from 'zustand/middleware';
import useUrl from '../services/base_url';

import AsyncStorage from '@react-native-async-storage/async-storage';

const {auth} = useUrl();

const useLogin = create(
  devtools((set, get) => ({
    responses: {},
    arrData: [],
    setLogin: async row => {
      //   const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const res = await auth({
          method: 'post',
          url: `/login`,
          //   headers: { Authorization: `Bearer ${getToken}` },
          data: row,
        });
        // set((state) => ({ ...state, responses: res.data }));
        const dtAuth = {
          access_token: res.data.access_token,
          name: res.data.user.name,
          email: res.data.user.email,
          role: res.data.user.role,
        };
        // console.log(auth);
        const jsonAuth = JSON.stringify(dtAuth);
        await AsyncStorage.setItem('dtAuth', jsonAuth);
        return {
          status: 'berhasil',
          data: res.data,
        };
      } catch (error) {
        return {
          status: 'error',
          error: error.response.data,
        };
      }
    },
    getLogin: async () => {
      //   const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const auth = await AsyncStorage.getItem('dtAuth');
        return auth != null ? JSON.parse(auth) : null;
      } catch (e) {
        // error reading value
      }
    },
    setLogout: async () => {
      const getAuth = await AsyncStorage.getItem('dtAuth');
      // remove from asyncStorage
      // get Token from me url
      // logout url
      const data = JSON.parse(getAuth);
      const getToken = data.access_token;
      try {
        await AsyncStorage.removeItem('dtAuth');
      } catch (error) {
        return console.log(error);
      }
      try {
        const res = await auth({
          method: 'get',
          url: `/logout`,
          headers: {Authorization: `Bearer ${getToken}`},
        });
        return {
          status: 'berhasil',
          data: res.data,
        };
      } catch (error) {
        return {
          status: 'error',
          error: error.response.data,
        };
      }
    },
  })),
);

export default useLogin;
