/** @format */

import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Button, Icon, Overlay} from '@rneui/themed';
import colors from '../../../styles/colors';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

// Masked input
import MaskInput, {createNumberMask} from 'react-native-mask-input';
const rupiahMask = createNumberMask({
  prefix: ['Rp', '.', ' '],
  delimiter: '.',
  separator: ',',
  precision: 0,
});

// dimensions
const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;

// select
import SelectDropdown from 'react-native-select-dropdown';
import KeyboardAvoidingComp from '../../../components/KeyboardAvoidingComp';

const Form = ({
  open,
  setOpen,
  nameForm,
  dtItem,
  dataEdit,
  dtSimpan,
  cekEdit,
}) => {
  const [visible, setVisible] = useState(open);
  // date
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [itemId, setItemId] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [ket, setKet] = useState('');
  // pesan toast
  const [pesanError, setPesanError] = useState('');
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
  // reset select
  const dropdownRef = useRef({});
  useEffect(() => {
    dropdownRef.current.reset();
  }, []);

  // jika tombol edit ditekan
  useEffect(() => {
    setJumlah('');
    if (cekEdit) {
      setJumlah(`${dataEdit.jumlah}`);
      setItemId(dataEdit.item_id);
      setDate(new Date(dataEdit.tgl_transaksi));
      setKet(dataEdit.ket);
    }
  }, [dataEdit]);

  // validasi
  const validation = () => {
    if (itemId.length === 0) {
      setPesanError('Item tidak boleh kosong');
      return false;
    }
    if (jumlah.length === 0) {
      setPesanError('Jumlah tidak boleh kosong');
      return false;
    }
    // jika berhasil
    return true;
  };
  // jika tombol simpan ditekan
  const handelSimpan = () => {
    if (!validation()) {
      return 0;
    }
    const item = {
      item_id: itemId,
      jenis: nameForm,
      tgl_transaksi: moment(date).format('YYYY-MM-DD'),
      jumlah: parseInt(jumlah),
      ket,
    };
    // return console.log("item", item);
    dtSimpan(item);
    setJumlah('');
    setKet('');
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
            <View style={styles.containerInput}>
              <Text style={styles.inputLabel}>Pilh Item</Text>
              <SelectDropdown
                search={true}
                data={dtItem}
                ref={dropdownRef}
                onSelect={selectedItem => {
                  setItemId(selectedItem.id);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.nama;
                }}
                rowTextForSelection={(item, index) => {
                  return item.nama;
                }}
                defaultButtonText={cekEdit ? dataEdit.item.nama : 'Daftar Item'}
                buttonStyle={styles.dropdown4BtnStyle}
                buttonTextStyle={styles.dropdown4BtnTxtStyle}
                renderDropdownIcon={isOpened => {
                  return (
                    <Icon
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      type="evilicon"
                      size={18}
                    />
                  );
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={styles.dropdown4DropdownStyle}
                rowStyle={styles.dropdown4RowStyle}
                rowTextStyle={styles.dropdown4RowTxtStyle}
              />
            </View>
            {/* keterangan */}
            <View style={styles.containerInput}>
              <Text style={styles.inputLabel}>Keterangan</Text>
              <TextInput
                style={styles.inputText}
                value={ket}
                onChangeText={setKet}
                placeholder="Masukan keterangan"
              />
            </View>
            {/* Jumlah */}
            <View style={styles.containerInput}>
              <Text style={styles.inputLabel}>Jumlah</Text>
              <MaskInput
                style={styles.inputText}
                value={jumlah}
                mask={rupiahMask}
                onChangeText={(masked, unmasked) => {
                  setJumlah(unmasked); // you can use the masked value as well
                }}
                keyboardType="numeric"
              />
            </View>
            {/* tombol simpan */}
            <View style={{marginTop: 10}}>
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
  // dropdown
  dropdown4BtnStyle: {
    width: '100%',
    height: 35,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.dark,
  },
  dropdown4BtnTxtStyle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    textAlign: 'left',
  },
  dropdown4DropdownStyle: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
  },
  dropdown4RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
    height: 45,
  },
  dropdown4RowTxtStyle: {
    color: colors.dark,
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    textAlign: 'left',
  },
});
