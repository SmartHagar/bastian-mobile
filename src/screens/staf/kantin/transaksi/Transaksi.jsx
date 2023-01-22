/** @format */

import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import HeaderComp from '../../../../components/bendahara/HeaderComp';
import Form from './Form';

import DeleteDia from '../../../../components/dialog/DeleteDia';

import Toast from 'react-native-toast-message';
import ListData from './ListData';
import useTransaksi from '../../../../stores/transaksi';
import LoadingComp from '../../../../components/LoadingComp';
import colors from '../../../../styles/colors';
import MonthSelect from '../../../../components/select/MonthSelect';
import YearSelect from '../../../../components/select/YearSelect';
import showToast from '../../../../services/show-toast';

// dimensions
const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;

const Transaksi = ({route}) => {
  const {nama} = route.params;
  //  open Form
  const [open, setOpen] = useState(false);
  // state filter data
  const [bulan, setBulan] = useState('');
  const [tahun, setTahun] = useState('');
  const [search, setSearch] = useState('');
  // state reset form
  const [resetForm, setResetForm] = useState(false);

  const [dataEdit, setDataEdit] = useState(false);
  // show dialog
  const [showDia, setShowDia] = useState(false);
  const [id, setId] = useState(false);
  const [cekEdit, setCekEdit] = useState(false);
  // set & get data item
  const {dtTransaksi, setTransaksi, removeData, addData, updateData} =
    useTransaksi();

  // loading
  const [loading, setLoading] = useState(false);

  // load data item
  useEffect(() => {
    const fetchData = async () => {
      await setTransaksi({search, kantin: true}, nama);
      setLoading(true);
      setBulan('');
      setTahun('');
    };
    fetchData();
  }, []);

  // filter bulan dan tahun
  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
      await setTransaksi({search, bulan, tahun, kantin: true}, nama);
      setLoading(true);
    };
    fetchData();
    return () => {};
  }, [bulan, tahun]);

  const handleEdit = item => {
    setOpen(true);
    setCekEdit(true);
    setDataEdit(item);
  };

  // ketika tombol ditekan
  const handleHapus = id => {
    setShowDia(true);
    setId(id);
  };

  // menghapus data
  const deleteData = async () => {
    const cek = await removeData(id);
    if (cek.status === 'berhasil') {
      setPesanSuccess('Data Berhasil Dihapus');
    }
  };

  // show toast
  const setPesanSuccess = pesan => {
    Toast.show({
      type: 'success',
      text1: `${pesan} 👋`,
    });
  };
  const saveData = async data => {
    let cek;
    if (cekEdit) {
      cek = await updateData(dataEdit.id, data);
      console.log(cek);
      setOpen(false);
    } else {
      cek = await addData(data);
    }
    if (cek.data.type === 'success') {
      setResetForm(true);
    }
    showToast(cek.data);
    setLoading(true);
  };

  // refresh data dan reset select
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await setTransaksi({search, kantin: true}, nama);
    setBulan('');
    setTahun('');
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView>
      <HeaderComp
        nama={`${nama} Kantin`}
        setOpen={setOpen}
        setCekEdit={setCekEdit}
      />
      <View>
        {/* Date Picker */}
        <View className="flex-row space-x-4 justify-center mt-1">
          <View className="w-[45%]">
            <MonthSelect pilihBulan={setBulan} isReset={refreshing} />
          </View>
          <View className="w-[45%]">
            <YearSelect pilihTahun={setTahun} isReset={refreshing} />
          </View>
        </View>
        {/* Opan form */}
        {open && (
          <Form
            open={open}
            setOpen={setOpen}
            nameForm={nama}
            setPesanSuccess={setPesanSuccess}
            dtSimpan={saveData}
            cekEdit={cekEdit}
            dataEdit={dataEdit}
            resetForm={resetForm}
            setLoading={setLoading}
            loading={loading}
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
        {!loading ? (
          <View style={styles.loadingComp}>
            <LoadingComp />
          </View>
        ) : (
          <ListData
            arrData={dtTransaksi}
            handleHapus={handleHapus}
            handleEdit={handleEdit}
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        )}
      </View>
      {dtTransaksi.length === 0 && (
        <Text style={styles.kosong}>Belum ada data {nama}</Text>
      )}
      <Toast topOffset={0} />
    </SafeAreaView>
  );
};

export default Transaksi;

const styles = StyleSheet.create({
  kosong: {
    textAlign: 'center',
    marginBottom: '50%',
    fontFamily: 'Poppins-Regular',
    color: colors.pink,
  },
  loadingComp: {
    height: winHeight,
    width: winWidth,
    justifyContent: 'center',
  },
});
