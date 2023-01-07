/** @format */

import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import HeaderComp from '../../../components/bendahara/HeaderComp';
import Form from './Form';

import DeleteDia from '../../../components/dialog/DeleteDia';

import Toast from 'react-native-toast-message';
import ListData from './ListData';
import useTransaksi from '../../../stores/transaksi';
import LoadingComp from '../../../components/LoadingComp';
import colors from '../../../styles/colors';
import MonthSelect from '../../../components/select/MonthSelect';
import useItem from '../../../stores/Items';
import YearSelect from '../../../components/select/YearSelect';

// dimensions
const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;

const Transaksi = ({route}) => {
  const {nama} = route.params;
  // ambil data items
  const {getItems, dtItem} = useItem();
  const [open, setOpen] = useState(false);
  // state filter data
  const [bulan, setBulan] = useState('');
  const [tahun, setTahun] = useState('');

  const [dataEdit, setDataEdit] = useState(false);
  // show dialog
  const [showDia, setShowDia] = useState(false);
  const [id, setId] = useState(false);
  const [cekEdit, setCekEdit] = useState(false);
  // set & get data item
  const {
    arrData,
    setTransaksi,
    removeTransaksi,
    addTransaksi,
    updateTransaksi,
  } = useTransaksi();

  // loading
  const [loading, setLoading] = useState(false);

  // load data item
  useEffect(() => {
    const fetchData = async () => {
      await setTransaksi(nama);
      setLoading(true);
      setBulan('');
      setTahun('');
    };
    fetchData();
    getItems();
  }, []);

  // filter data by bulan
  const pilihBulan = async psBulan => {
    setBulan(psBulan);
    // console.log(psBulan, tahun);
    setLoading(false);
    await setTransaksi(nama, psBulan, tahun);
    setLoading(true);
  };
  // filter data by tahun
  const pilihTahun = async psTahun => {
    setTahun(psTahun);
    // console.log(bulan, psTahun);
    setLoading(false);
    await setTransaksi(nama, bulan, psTahun);
    setLoading(true);
  };
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
    const cek = await removeTransaksi(id);
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
    if (cekEdit) {
      const cek = await updateTransaksi(dataEdit.id, data);
      if (cek.status === 'berhasil') {
        setOpen(false);
        setTransaksi(nama);
        setPesanSuccess('Data Berhasil Diubah');
      }
      return 0;
    }
    const cek = await addTransaksi(data);
    if (cek.status === 'berhasil') {
      setPesanSuccess('Data Berhasil Ditambahkan');
    }
  };

  // refresh data
  const [refreshing, setRefreshing] = useState(false);
  let isReset = true;

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await setTransaksi(nama, '', '');
    setBulan('');
    setTahun('');
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView>
      <HeaderComp nama={nama} setOpen={setOpen} setCekEdit={setCekEdit} />
      <View>
        {/* Date Picker */}
        <View
          style={{
            flexDirection: 'row',
            elevation: 3,
          }}>
          <MonthSelect pilihBulan={pilihBulan} isReset={refreshing} />
          <YearSelect pilihTahun={pilihTahun} isReset={refreshing} />
        </View>
        {/* Opan form */}
        {open && (
          <Form
            open={open}
            setOpen={setOpen}
            nameForm={nama}
            setPesanSuccess={setPesanSuccess}
            dtItem={dtItem}
            dtSimpan={saveData}
            cekEdit={cekEdit}
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
        {!loading ? (
          <View style={styles.loadingComp}>
            <LoadingComp />
          </View>
        ) : (
          <ListData
            arrData={arrData}
            handleHapus={handleHapus}
            handleEdit={handleEdit}
            onRefresh={onRefresh}
            refreshing={refreshing}
          />
        )}
      </View>
      {arrData.length === 0 && (
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
    marginTop: '50%',
    fontFamily: 'Poppins_500Medium',
    color: colors.pink,
  },
  loadingComp: {
    height: winHeight,
    width: winWidth,
    justifyContent: 'center',
  },
});
