/** @format */

import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Dialog from "react-native-dialog";

const DeleteDia = ({ setVisible, visible, children, deleteData }) => {
  const handleCancel = () => {
    setVisible(false);
  };
  const handleDelete = () => {
    setVisible(false);
    // data di hapus
    deleteData();
  };
  //   console.log(props);
  return (
    <View>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Yakin untuk menghapus?</Dialog.Title>
        <Dialog.Description>{children}</Dialog.Description>
        <Dialog.Button label="Batal" onPress={handleCancel} />
        <Dialog.Button label="Yakin" onPress={handleDelete} />
      </Dialog.Container>
    </View>
  );
};

export default DeleteDia;

const styles = StyleSheet.create({});
