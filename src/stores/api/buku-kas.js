/** @format */

import create from "zustand";
import { devtools } from "zustand/middleware";
import useUrl from "../../services/base_url";

const { api } = useUrl();

const useBukuKas = create(
  devtools((set, get) => ({
    responses: {},
    dtBukuKas: [],
    filterKantin: ({ data, kantin }) => {
      let filterKantin;
      // jika data kantin tidak masuk
      if (!kantin) {
        const filter = data.data.filter(function (row) {
          return !row.item.nama.toLowerCase().includes("kantin");
        });
        filterKantin = { ...data, data: filter };
      }
      // jika hanya data kantin
      if (kantin) {
        const filter = data.data.filter(function (row) {
          return row.item.nama.toLowerCase().includes("kantin");
        });
        filterKantin = { ...data, data: filter };
      }
      return filterKantin;
    },
    setBukuKas: async ({ bulan, tahun, kantin = false }) => {
      //   const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const res = await api({
          method: "get",
          url: `/buku-kas/laporan`,
          params: {
            bulan,
            tahun,
          },
          //   headers: { Authorization: `Bearer ${getToken}` },
        });
        const { data } = res;
        // filter data kantin
        const dataFilter = get().filterKantin({ data, kantin });
        set((state) => ({ ...state, responses: res }));
        set((state) => ({ ...state, dtBukuKas: dataFilter }));
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
    setBukuKasSemester: async ({ tahun, semester, kantin = false }) => {
      //   const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const res = await api({
          method: "get",
          url: `/buku-kas/laporan/semester`,
          params: {
            tahun,
            semester,
          },
          //   headers: { Authorization: `Bearer ${getToken}` },
        });
        const { data } = res;
        // filter data kantin
        const dataFilter = get().filterKantin({ data, kantin });
        set((state) => ({ ...state, responses: res }));
        set((state) => ({ ...state, dtBukuKas: dataFilter }));
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
    setBukuKasTahun: async ({ tahun, kantin = false }) => {
      //   const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const res = await api({
          method: "get",
          url: `/buku-kas/laporan/tahun`,
          params: {
            tahun,
          },
          //   headers: { Authorization: `Bearer ${getToken}` },
        });
        const { data } = res;
        // filter data kantin
        const dataFilter = get().filterKantin({ data, kantin });
        set((state) => ({ ...state, responses: res }));
        set((state) => ({ ...state, dtBukuKas: dataFilter }));
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
    setApiBukuKas: async ({ bulan, tahun }) => {
      //   const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const res = await api({
          method: "get",
          url: `/buku-kas`,
          params: {
            bulan,
            tahun,
          },
          //   headers: { Authorization: `Bearer ${getToken}` },
        });
        set((state) => ({ ...state, responses: res }));
        set((state) => ({ ...state, dtBukuKas: res.data }));
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

export default useBukuKas;
