/** @format */

import create from 'zustand';
import {devtools} from 'zustand/middleware';
import useUrl from '../services/base_url';

const {api} = useUrl();

const useSaldo = create(
  devtools((set, get) => ({
    responses: {},
    arrData: [],
    transaksi: [],
    pemasukanTerakhir: [],
    pengeluaranTerakhir: [],
    setSaldo: async (kantin = false) => {
      //   const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const res = await api({
          method: 'get',
          url: `/buku-kas/saldo`,
          //   headers: { Authorization: `Bearer ${getToken}` },
        });
        const {data} = res;
        let filter_pemasukan_terakhir = '';
        let filter_pengeluaran_terakhir = '';
        if (kantin) {
          // filter pemasukan dengan kantin
          const {pemasukan_terakhir} = data;
          const filterPemasukan = pemasukan_terakhir.filter(function (row) {
            return row.item.nama.toLowerCase().includes('kantin');
          });
          filter_pemasukan_terakhir = filterPemasukan[0];
          // filter pengeluaran dengan kantin
          const {pengeluaran_terakhir} = data;
          const filterPengeluaran = pengeluaran_terakhir.filter(function (row) {
            return row.item.nama.toLowerCase().includes('kantin');
          });
          filter_pengeluaran_terakhir = filterPengeluaran[0];
        }
        if (!kantin) {
          // filter pemasukan tanpa kantin
          const {pemasukan_terakhir} = data;
          const filterPemasukan = pemasukan_terakhir.filter(function (row) {
            return !row.item.nama.toLowerCase().includes('kantin');
          });
          filter_pemasukan_terakhir = filterPemasukan[0];
          // filter pengeluaran tanpa kantin
          const {pengeluaran_terakhir} = data;
          const filterPengeluaran = pengeluaran_terakhir.filter(function (row) {
            return !row.item.nama.toLowerCase().includes('kantin');
          });
          filter_pengeluaran_terakhir = filterPengeluaran[0];
        }
        set(state => ({...state, responses: res}));
        set(state => ({...state, arrData: res.data}));
        set(state => ({
          ...state,
          pemasukanTerakhir: filter_pemasukan_terakhir,
        }));
        set(state => ({
          ...state,
          pengeluaranTerakhir: filter_pengeluaran_terakhir,
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
    setTransaksi: async (jenis = '', bulan = '', tahun = '') => {
      //   const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const res = await api({
          method: 'get',
          url: `/buku-kas`,
          //   headers: { Authorization: `Bearer ${getToken}` },
          params: {
            jenis,
            bulan,
            tahun,
          },
        });
        // grouping
        const groups = res.data.reduce((groups, item) => {
          const bulan = item.tgl_transaksi.split('-')[1];
          if (!groups[bulan]) {
            groups[bulan] = [];
          }
          groups[bulan].push(item);
          return groups;
        }, {});
        const arrSaldo = Object.keys(groups).map(bulan => {
          return {
            bulan,
            total: groups[bulan].reduce((accumulator, object) => {
              return accumulator + object.jumlah;
            }, 0),
            transaksi: groups[bulan].length,
          };
        });
        const sortSaldoByBulan = arrSaldo.sort((a, b) => a.bulan - b.bulan);
        set(state => ({...state, transaksi: sortSaldoByBulan}));
        return {
          status: 'berhasil',
          data: sortSaldoByBulan,
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

export default useSaldo;
