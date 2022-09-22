/** @format */

import create from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import useUrl from "../services/base_url";
const { crud } = useUrl();

// zustand middleware
const useKwitansi = create(
  devtools((set, get) => ({
    arrData: [],
    responses: {},
    transaksi_id: null,
    setKwitansi: async (id) => {
      const res = await crud({
        method: "get",
        url: `/kwitansi/${id}`,
        //   headers: { Authorization: `Bearer ${getToken}` },
      });

      set((state) => ({ ...state, arrData: res.data }));
      set((state) => ({ ...state, transaksi_id: id }));
    },

    addKwitansi: async (item) => {
      const formData = new FormData();
      formData.append("gambar[]", {
        uri: item.gambar,
        name: "image.png",
        type: "image/png",
      });
      formData.append("transaksi_id", item.transaksi_id);
      // const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const res = await crud({
          method: "post",
          url: `/kwitansi`,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        });

        set((state) => ({
          arrData: [res.data.data, ...state.arrData],
        }));
        return {
          status: "berhasil",
          data: res.data,
        };
      } catch (error) {
        console.log(error);
        return {
          status: "error",
        };
      }
    },
    removeKwitansi: async (id) => {
      //   const getToken = JSON.parse(localStorage.getItem("token"));
      try {
        const res = await crud({
          method: "delete",
          url: `/kwitansi/${id}`,
          //   headers: { Authorization: `Bearer ${getToken}` },
        });
        set((state) => ({
          arrData: state.arrData.filter((item) => item.id !== id),
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

export default useKwitansi;
