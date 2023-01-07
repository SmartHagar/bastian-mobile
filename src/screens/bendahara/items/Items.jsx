/** @format */

import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Form from './Form';
import ListData from './ListData';

import NotificationContext from '../../../tools/NotificationContext';
import useItem from '../../../stores/Items';
import DeleteDia from '../../../components/dialog/DeleteDia';

import Toast from 'react-native-toast-message';
import showToast from '../../../services/show-toast';

const Items = () => {
  const nama = 'Items';
  const tapOpen = useContext(NotificationContext);

  const [dataEdit, setDataEdit] = useState(false);
  // show dialog
  const [showDia, setShowDia] = useState(false);
  const [id, setId] = useState(false);
  // set & get data item
  const {arrData, setItem, removeItems} = useItem();

  const [open, setOpen] = useState(false);
  const [pesanToast, setPesanToast] = useState(false);

  // load open form
  useEffect(() => {
    if (tapOpen > 0) {
      setOpen(true);
      setDataEdit(false);
    }
  }, [tapOpen]);

  // load data item
  useEffect(() => {
    setItem();
  }, []);

  const handleEdit = item => {
    setOpen(true);
    setDataEdit(item);
  };

  // ketika tombol ditekan
  const handleHapus = id => {
    setShowDia(true);
    setId(id);
  };

  // menghapus data
  const deleteData = async () => {
    const res = await removeItems(id);
    setPesanToast(res);
  };

  // show toast
  pesanToast && showToast(pesanToast), console.log(pesanToast);

  return (
    <SafeAreaView>
      <View>
        {open && (
          <Form
            open={open}
            setOpen={setOpen}
            nameForm={nama}
            setPesanToast={setPesanToast}
            dataEdit={dataEdit}
          />
        )}
        {/* dialog delete */}
        {showDia && (
          <DeleteDia
            visible={showDia}
            setVisible={setShowDia}
            deleteData={deleteData}>
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
