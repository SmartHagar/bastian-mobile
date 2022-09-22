/** @format */

import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import useKwitansi from "../../../stores/kwitansi";
import HeaderComp from "../../../components/bendahara/HeaderComp";
import DeleteDia from "../../../components/dialog/DeleteDia";
import ListData from "./ListData";
import Toast from "react-native-toast-message";
import Form from "./Form";

const Kwitansi = ({ route }) => {
  const { transaksi_id } = route.params;
  const [open, setOpen] = useState(false);

  const [dataEdit, setDataEdit] = useState(false);
  // show dialog
  const [showDia, setShowDia] = useState(false);
  const [id, setId] = useState(false);
  const [cekEdit, setCekEdit] = useState(false);
  // set & get data item
  const { arrData, setKwitansi, removeKwitansi } = useKwitansi();

  // load data item
  useEffect(() => {
    setKwitansi(transaksi_id);
  }, []);

  const handleEdit = (item) => {
    setOpen(true);
    setDataEdit(item);
  };

  // ketika tombol ditekan
  const handleHapus = (id) => {
    setShowDia(true);
    setId(id);
  };

  // menghapus data
  const deleteData = () => {
    removeKwitansi(id);
    setPesanSuccess("Data Berhasil Dihapus");
  };

  // show toast
  const setPesanSuccess = (pesan) => {
    console.log("test");
    Toast.show({
      type: "success",
      text1: `${pesan} 👋`,
    });
  };

  return (
    <SafeAreaView>
      <HeaderComp nama="Kwitansi" setOpen={setOpen} setCekEdit={setCekEdit} />
      <View>
        {open && (
          <Form
            open={open}
            setOpen={setOpen}
            nameForm="Kwitansi"
            setPesanSuccess={setPesanSuccess}
          />
        )}
        {/* dialog delete */}
        {showDia && (
          <DeleteDia
            visible={showDia}
            setVisible={setShowDia}
            deleteData={deleteData}
          >
            Data yang dihapus tidak bisa dikembalikan
          </DeleteDia>
        )}
        <ListData arrData={arrData} handleHapus={handleHapus} />
      </View>
      <Toast topOffset={0} />
    </SafeAreaView>
  );
};

export default Kwitansi;

const styles = StyleSheet.create({});
