/** @format */

import create from "zustand";
import { devtools } from "zustand/middleware";
import useUrl from "../../services/base_url";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { api } = useUrl();

// const getToken = JSON.parse(localStorage.getItem("token"));

const useProdiAPI = create(
  devtools((set, get) => ({
    dtProdi: [],
    setProdi: async () => {
      try {
        const res = await api({
          method: "get",
          url: `/prodi`,
        });
        set((state) => ({ ...state, dtProdi: res.data }));
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

export default useProdiAPI;
