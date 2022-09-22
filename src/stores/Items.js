/** @format */

import create from 'zustand';
import {devtools} from 'zustand/middleware';
import useUrl from '../services/base_url';

const {crud} = useUrl();

const useItem = create(
  devtools((set, get) => ({
    responses: {},
    arrData: [],
    dtItem: [],
    setItem: async () => {
      //   const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await crud({
          method: 'get',
          url: `/item`,
          //   headers: { Authorization: `Bearer ${getToken}` },
        });
        set(state => ({...state, responses: response}));
        set(state => ({...state, arrData: response.data}));
        return {
          status: 'berhasil',
          data: response.data,
        };
      } catch (error) {
        return {
          status: 'error',
          error: error.response.data,
        };
      }
    },
    addItems: async nama => {
      // const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const res = await crud({
          method: 'post',
          url: `/item`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: {
            nama,
          },
        });
        set(state => ({
          arrData: [res.data.data, ...state.arrData],
        }));
        return {
          status: 'berhasil',
          data: res.data,
        };
      } catch (error) {
        console.log(error);
        return {
          status: 'error',
        };
      }
    },
    removeItems: async id => {
      //   const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const res = await crud({
          method: 'delete',
          url: `/item/${id}`,
          //   headers: { Authorization: `Bearer ${getToken}` },
        });
        set(state => ({
          arrData: state.arrData.filter(item => item.id !== id),
        }));
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
    updateItems: async (id, row) => {
      // const getToken = JSON.parse(localStorage.getItem("token"));
      console.log(row);
      try {
        const response = await crud({
          method: 'put',
          url: `/item/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: row,
        });
        set(state => ({
          arrData: state.arrData.map(item => {
            if (item.id === id) {
              return {
                ...item,
                ...row,
              };
            } else {
              return item;
            }
          }),
        }));
        return {
          status: 'berhasil',
          data: response.data,
        };
      } catch (error) {
        return {
          status: 'error',
          error: error.response.data,
        };
      }
    },
    getItems: async () => {
      //   const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await crud({
          method: 'get',
          url: `/item`,
          //   headers: { Authorization: `Bearer ${getToken}` },
        });
        set(state => ({...state, dtItem: response.data}));
        return {
          status: 'berhasil',
          data: response.data,
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

export default useItem;
