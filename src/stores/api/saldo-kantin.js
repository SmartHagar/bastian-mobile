/** @format */

import create from "zustand";
import { devtools } from "zustand/middleware";
import useUrl from "../../services/base_url";

const { api } = useUrl();

const useSaldoKantin = create(
  devtools((set, get) => ({
    responses: {},
    dtSaldoKantin: [],
    transaksiKantin: [],
    pemasukanTerakhirKantin: [],
    pengeluaranTerakhirKantin: [],
    setSaldoKantin: async (kantin = "kantin") => {
      //   const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const res = await api({
          method: "get",
          url: `/buku-kas/saldo`,
          params: {
            kantin,
          },
          //   headers: { Authorization: `Bearer ${getToken}` },
        });
        const { data } = res;
        let filter_pemasukan_terakhir = "";
        let filter_pengeluaran_terakhir = "";
        if (kantin) {
          // filter pemasukan dengan kantin
          const { pemasukan_terakhir } = data;
          const filterPemasukan = pemasukan_terakhir.filter(function (row) {
            return row.item.nama.toLowerCase().includes("kantin");
          });
          filter_pemasukan_terakhir = filterPemasukan[0];
          // filter pengeluaran dengan kantin
          const { pengeluaran_terakhir } = data;
          const filterPengeluaran = pengeluaran_terakhir.filter(function (row) {
            return row.item.nama.toLowerCase().includes("kantin");
          });
          filter_pengeluaran_terakhir = filterPengeluaran[0];
        }

        set((state) => ({ ...state, responses: res }));
        set((state) => ({ ...state, dtSaldoKantin: res.data }));
        set((state) => ({
          ...state,
          pemasukanTerakhirKantin: filter_pemasukan_terakhir,
        }));
        set((state) => ({
          ...state,
          pengeluaranTerakhirKantin: filter_pengeluaran_terakhir,
        }));
        return {
          status: "berhasil",
          data: res.data,
        };
      } catch (error) {
        return {
          status: "error",
          error: error.response.data,
        };
      }
    },
  }))
);

export default useSaldoKantin;
