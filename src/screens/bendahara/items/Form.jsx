/** @format */

import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Overlay} from '@rneui/themed';
import colors from '../../../styles/colors';
import KeyboardAvoidingComp from '../../../components/KeyboardAvoidingComp';

import useItem from '../../../stores/Items';
import InputComp from '../../../components/form/InputComp';
import ButtonComp from '../../../components/form/ButtonComp';
import {useForm} from 'react-hook-form';

const Form = ({open, setOpen, nameForm, setPesanToast, dataEdit = false}) => {
  const winWidth = Dimensions.get('window').width;
  const winHeight = Dimensions.get('window').height;

  // input
  const {addItems, updateItems} = useItem();

  // event tampil
  const [visible, setVisible] = useState(open);
  const toggleOverlay = () => {
    setVisible(false);
    setOpen(false);
    setPesanToast(false);
  };

  // hook-form
  const {control, handleSubmit, watch, reset} = useForm({
    defaultValues: '',
  });
  // mereset form
  const resetInput = () => {
    reset(
      {
        nama: '',
        kode: '',
      },
      {
        keepErrors: true,
        keepDirty: true,
      },
    );
  };

  // ketika tombol edit ditekan
  useEffect(() => {
    dataEdit &&
      reset(
        {
          nama: dataEdit.nama,
          kode: dataEdit.kode,
        },
        {
          keepErrors: true,
          keepDirty: true,
        },
      );

    !dataEdit && resetInput();
    setPesanToast(false);
  }, [dataEdit]);
  // ketika tombol simpan ditekan
  const handelSimpan = async data => {
    console.log(data);
    let res;
    if (dataEdit) {
      res = await updateItems(dataEdit.id, data);
    } else {
      res = await addItems(data);
    }
    setPesanToast(res.data);
    resetInput();
  };
  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={toggleOverlay}
      overlayStyle={{borderRadius: 10}}>
      <KeyboardAvoidingComp>
        <View style={{width: winWidth / 1.5}}>
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
          <View>
            <InputComp
              name="nama"
              label="Nama Item"
              placeholder="Masukan nama item"
              control={control}
              rules={{
                required: 'Nama tidak boleh kosong',
              }}
            />
          </View>
          <View>
            <InputComp
              name="kode"
              label="Kode"
              placeholder="Masukan kode"
              control={control}
              rules={{
                required: 'Kode tidak boleh kosong',
              }}
            />
          </View>
          {/* tombol simpan */}
          <View className="mt-5">
            <ButtonComp
              label="Simpan"
              radius={20}
              onPress={handleSubmit(handelSimpan)}
            />
          </View>
        </View>
      </KeyboardAvoidingComp>
    </Overlay>
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
