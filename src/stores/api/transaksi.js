/** @format */

import create from "zustand";
import { devtools } from "zustand/middleware";
import useUrl from "../../services/base_url";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { api } = useUrl();

// const getToken = JSON.parse(localStorage.getItem("token"));

const useTransaksiAPI = create(
  devtools((set, get) => ({
    dtTransaksi: [],
    setTransaksi: async () => {
      try {
        const res = await api({
          method: "get",
          url: `/transaksi`,
        });
        set((state) => ({ ...state, dtTransaksi: res.data }));
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

export default useTransaksiAPI;
