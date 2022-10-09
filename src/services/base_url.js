/** @format */

import axios from 'axios';

const BASE_URL = 'http://192.168.90.199:8000';
// const BASE_URL = 'http://192.168.21.9:8000';
// const BASE_URL = 'https://bastian.tafstuogp.my.id';
const url_auth = `${BASE_URL}/auth`;
const url_api = `${BASE_URL}/api`;
const url_crud = `${BASE_URL}/crud`;

export default function useUrl() {
  const auth = axios.create({
    baseURL: url_auth,
  });
  const crud = axios.create({
    baseURL: url_crud,
  });
  const api = axios.create({
    baseURL: url_api,
  });
  return {auth, crud, api, BASE_URL};
}
