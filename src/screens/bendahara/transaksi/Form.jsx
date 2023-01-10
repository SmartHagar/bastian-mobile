/** @format */

import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Overlay} from '@rneui/themed';
import colors from '../../../styles/colors';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

// dimensions
const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;

// select
import KeyboardAvoidingComp from '../../../components/KeyboardAvoidingComp';
import ItemsSelect from '../../../components/select/ItemsSelect';
import {useForm} from 'react-hook-form';
import InputComp from '../../../components/form/InputComp';
import InputRupiah from '../../../components/form/InputRupiah';
import TextComp from '../../../components/form/TextComp';
import kodefikasi from '../../../services/kodefikasi';
import useTransaksiAPI from '../../../stores/api/transaksi';
import LoadingComp from '../../../components/LoadingComp';

const Form = ({
  open,
  setOpen,
  nameForm,
  dataEdit,
  dtSimpan,
  cekEdit,
  resetForm,
  loading,
  setLoading,
}) => {
  // store
  const {setTransaksi, dtTransaksi} = useTransaksiAPI();
  //  state
  const [visible, setVisible] = useState(open);
  // date
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [pilihItem, setPilihItem] = useState('');
  const [kode, setKode] = useState('');
  const [noUrut, setNoUrut] = useState('');
  // hidden form
  const toggleOverlay = () => {
    setVisible(false);
    setOpen(false);
  };
  // change date picker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowPicker(false);
    setDate(currentDate);
  };

  const cekKode = async () => {
    // kode baru
    let kode = '';
    if (pilihItem) {
      const res = await setTransaksi();
      kode = `${moment(date).format('DD/MM/YYYY')}-${pilihItem.data}`;
      const no_urut = kodefikasi({old_prefix: res.data, new_prefix: kode});
      setKode(kode);
      setNoUrut(no_urut);
      setValue('kode', `${kode}-${no_urut}`);
    }
  };

  // hook-form
  const {control, handleSubmit, reset, setValue} = useForm({});
  // memanggil kodefikasi
  useEffect(() => {
    if (!cekEdit) {
      cekKode();
    }
    return () => {};
  }, [pilihItem, date]);

  // ketika tombol edit ditekan
  useEffect(() => {
    cekEdit &&
      reset(
        {
          jumlah: `Rp. ${dataEdit.jumlah}`,
          ket: dataEdit.ket,
          kode: `${dataEdit.kode}-${dataEdit.no_urut}`,
        },
        setDate(new Date(dataEdit.tgl_transaksi)),
        setPilihItem({value: dataEdit.item_id}),
        setKode(dataEdit.kode),
        setNoUrut(dataEdit.no_urut),
        {
          keepErrors: true,
          keepDirty: true,
        },
      );
    !cekEdit && resetInput();
  }, [dataEdit]);

  // mereset form
  useEffect(() => {
    if (resetForm && !cekEdit) {
      resetInput();
      console.log('reset input');
    }
    return () => {};
  }, [dtSimpan, dataEdit]);

  const resetInput = () => {
    reset(
      {
        jumlah: '',
        ket: '',
        kode: '',
      },
      setDate(new Date()),
      {
        keepErrors: true,
        keepDirty: true,
      },
    );
    cekKode();
  };
  // jika tombol simpan ditekan
  const handelSimpan = data => {
    setLoading(false);
    data.item_id = pilihItem.value;
    data.jenis = nameForm;
    data.tgl_transaksi = moment(date).format('YYYY-MM-DD');
    data.kode = kode;
    data.no_urut = noUrut;
    // strip non numeric
    const intJmlh = data.jumlah.replace(/\D/g, '');
    data.jumlah = intJmlh;
    console.log(data);
    dtSimpan(data);
  };
  return (
    <View>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{borderRadius: 10}}>
        {/* form */}
        <KeyboardAvoidingComp>
          <View style={{width: winWidth - 100}}>
            {/* judul */}
            <View style={{height: 40}}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    height: 1,
                    flex: 1,
                    backgroundColor: colors.yellow,
                    marginTop: 13,
                  }}></View>
                <Text style={styles.textPrimary}>Form {nameForm}</Text>
                <View
                  style={{
                    height: 1,
                    flex: 1,
                    backgroundColor: colors.yellow,
                    marginTop: 13,
                  }}></View>
              </View>
            </View>

            <View style={styles.containerInput}>
              <Text style={styles.inputLabel}>Tanggal {nameForm}</Text>
              <View>
                <Text
                  onPress={() => setShowPicker(true)}
                  style={styles.inputText}>
                  {moment(date).format('DD MMMM YYYY')}
                </Text>
                {showPicker && (
                  <RNDateTimePicker
                    value={new Date(date)}
                    onChange={onChange}
                    locale="id-ID"
                  />
                )}
              </View>
            </View>
            {/* Pilih Item */}
            <View>
              <ItemsSelect
                setPilihItem={setPilihItem}
                defaultButtonText={cekEdit ? dataEdit.item.nama : 'Daftar Item'}
              />
            </View>
            {/* Kode */}
            <View style={styles.containerInput}>
              <InputComp
                name="kode"
                label="Kode"
                control={control}
                editable={false}
                rules={{
                  required: 'Kode tidak boleh kosong',
                }}
              />
            </View>

            {/* keterangan */}
            <View style={styles.containerInput}>
              <InputComp
                name="ket"
                label="Keterangan"
                placeholder="Masukan keterangan"
                control={control}
                rules={{
                  required: 'Keterangn boleh kosong',
                }}
              />
            </View>
            {/* Jumlah */}
            <View>
              <InputRupiah
                name="jumlah"
                label="Jumlah"
                control={control}
                rules={{
                  required: 'Keterangn boleh kosong',
                }}
              />
            </View>
            {/* tombol simpan */}
            <View style={{marginTop: 10}}>
              {!loading && <LoadingComp />}
              <Button
                color={colors.primary}
                buttonStyle={{
                  borderRadius: 20,
                }}
                title="Simpan"
                titleStyle={{
                  fontFamily: 'Poppins_Regular',
                }}
                onPress={handleSubmit(handelSimpan)}
              />
            </View>
          </View>
        </KeyboardAvoidingComp>
      </Overlay>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  textPrimary: {
    fontFamily: 'Poppins_200ExtraLight',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 14,
    fontWeight: '700',
    marginHorizontal: 6,
    color: colors.blue,
  },
  containerInput: {
    marginBottom: 10,
  },
  inputLabel: {
    fontFamily: 'Poppins_200ExtraLight',
    color: colors.dark,
  },
  inputText: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: colors.dark,
  },
});
