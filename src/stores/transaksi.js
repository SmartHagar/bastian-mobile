/** @format */

import create from 'zustand';
import {devtools} from 'zustand/middleware';
import useUrl from '../services/base_url';

const {crud} = useUrl();

const useTransaksi = create(
  devtools((set, get) => ({
    responses: {},
    dtTransaksi: [],
    setTransaksi: async (
      cari = {search: '', bulan: '', tahun: '', kantin: false},
      jenis = '',
    ) => {
      try {
        const response = await crud({
          method: 'get',
          url: `/transaksi`,
          // headers: { Authorization: `Bearer ${getToken}` },
          params: {
            jenis,
            search: cari.search,
            bulan: cari.bulan,
            tahun: cari.tahun,
          },
        });
        const {data} = response;
        let filterKantin;
        // filter data tanpa kantin
        if (!cari.kantin) {
          filterKantin = data.filter(function (row) {
            return !row.item.nama.toLowerCase().includes('kantin');
          });
        }
        if (cari.kantin) {
          filterKantin = data.filter(function (row) {
            return row.item.nama.toLowerCase().includes('kantin');
          });
        }
        set(state => ({...state, responses: filterKantin}));
        set(state => ({...state, dtTransaksi: filterKantin}));
        return {
          status: 'berhasil',
          data: filterKantin,
        };
      } catch (error) {
        return {
          status: 'error',
          error: error.response.data,
        };
      }
    },
    addData: async items => {
      try {
        const res = await crud({
          method: 'post',
          url: `/transaksi`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: items,
        });
        set(state => ({
          dtTransaksi: [res.data.data, ...state.dtTransaksi],
        }));
        return {
          status: 'berhasil',
          data: res.data,
        };
      } catch (error) {
        return {
          status: 'error',
          data: error.response.data,
        };
      }
    },
    removeData: async id => {
      try {
        const res = await crud({
          method: 'delete',
          url: `/transaksi/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
        });
        set(state => ({
          dtTransaksi: state.dtTransaksi.filter(item => item.id !== id),
        }));
        return {
          status: 'berhasil',
          data: res.data,
        };
      } catch (error) {
        return {
          status: 'error',
          data: error.response.data,
        };
      }
    },
    updateData: async (id, row) => {
      try {
        const response = await crud({
          method: 'put',
          url: `/transaksi/${id}`,
          // headers: { Authorization: `Bearer ${getToken}` },
          data: row,
        });
        set(state => ({
          dtTransaksi: state.dtTransaksi.map(item => {
            if (item.id === id) {
              return {
                ...item,
                ...response.data.data,
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
          data: error.response.data,
        };
      }
    },
  })),
);

export default useTransaksi;
