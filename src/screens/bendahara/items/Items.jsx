/** @format */

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Form from "./Form";
import ListData from "./ListData";

import NotificationContext from "../../../tools/NotificationContext";
import useItem from "../../../stores/Items";
import DeleteDia from "../../../components/dialog/DeleteDia";

import Toast from "react-native-toast-message";

const Items = () => {
  const nama = "Items";
  const tapOpen = useContext(NotificationContext);

  const [dataEdit, setDataEdit] = useState(false);
  // show dialog
  const [showDia, setShowDia] = useState(false);
  const [id, setId] = useState(false);
  // set & get data item
  const { arrData, setItem, removeItems } = useItem();

  const [open, setOpen] = useState(false);

  // load open form
  useEffect(() => {
    if (tapOpen > 0) {
      setOpen(true);
      setDataEdit({});
    }
  }, [tapOpen]);

  // load data item
  useEffect(() => {
    setItem();
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
    removeItems(id);
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
      <View>
        {open && (
          <Form
            open={open}
            setOpen={setOpen}
            nameForm={nama}
            setPesanSuccess={setPesanSuccess}
            dataEdit={dataEdit}
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
        <ListData
          arrData={arrData}
          handleHapus={handleHapus}
          handleEdit={handleEdit}
        />
      </View>
      <Toast topOffset={0} />
    </SafeAreaView>
  );
};

export default Items;

const styles = StyleSheet.create({});
