/** @format */

import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Icon, Overlay} from '@rneui/themed';
import colors from '../../../styles/colors';
import KeyboardAvoidingComp from '../../../components/KeyboardAvoidingComp';

import useItem from '../../../stores/Items';

const Form = ({open, setOpen, nameForm, setPesanSuccess, dataEdit}) => {
  const winWidth = Dimensions.get('window').width;
  const winHeight = Dimensions.get('window').height;

  // input
  const [nama, setNama] = useState('');
  const {addItems, updateItems} = useItem();
  // pesan
  const [pesanError, setPesanError] = useState('');

  // event tampil
  const [visible, setVisible] = useState(open);
  const toggleOverlay = () => {
    setVisible(false);
    setOpen(false);
  };

  useEffect(() => {
    if (dataEdit.nama) {
      setNama(dataEdit.nama);
    }
  }, [dataEdit]);

  const validation = () => {
    if (nama.length === 0) {
      setPesanError('Nama tidak boleh kosong');
      return false;
    }
    // jika berhasil
    return true;
  };
  const handelSimpan = () => {
    if (!validation()) {
      return 0;
    }
    if (dataEdit.nama) {
      updateItems(dataEdit.id, {nama});
      return setPesanSuccess('Data berhasil diubah');
    }
    addItems(nama);
    setNama('');
    setPesanError('');
    setPesanSuccess('Data berhasil ditambahkan');
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
          {/* Pesan jika error */}
          {pesanError && (
            <Text
              style={{
                textAlign: 'center',
                color: colors.pink,
                marginBottom: 10,
              }}>
              {pesanError}
            </Text>
          )}
          <View>
            <Text style={styles.inputLabel}>Nama Item</Text>
            <TextInput
              style={styles.inputText}
              value={nama}
              onChangeText={setNama}
              placeholder="Masukan nama item"
            />
          </View>
          {/* tombol simpan */}
          <View style={{marginTop: 20}}>
            <Button
              color={colors.primary}
              buttonStyle={{
                borderRadius: 20,
              }}
              title="Simpan"
              titleStyle={{
                fontFamily: 'Poppins_400Regular',
              }}
              onPress={handelSimpan}
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
  },
});
