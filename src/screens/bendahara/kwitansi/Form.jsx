/** @format */

import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Button, Icon, Overlay} from '@rneui/themed';
import colors from '../../../styles/colors';
import useKwitansi from '../../../stores/kwitansi';
import KeyboardAvoidingComp from '../../../components/KeyboardAvoidingComp';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import LoadingComp from '../../../components/LoadingComp';

// dimensions
const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;

const Form = ({open, setOpen, nameForm}) => {
  // get data kwitansi
  const {transaksi_id, addKwitansi, responses} = useKwitansi();
  // pesan toast
  const [pesanError, setPesanError] = useState('');

  const [visible, setVisible] = useState(open);
  // Image picker
  const [image, setImage] = useState(null);
  // loading
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, [transaksi_id]);

  const toggleOverlay = () => {
    setVisible(false);
    setOpen(false);
  };

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
      maxWidth: 1024,
      maxHeight: 1024,
      quality: 0.9,
    };
    launchImageLibrary(options, setImage);
  }, []);

  const handelSimpan = async () => {
    setLoading(true);
    const item = {
      transaksi_id,
      gambar: image.assets[0].uri,
    };
    const cek = await addKwitansi(item);
    if (cek.status == 'berhasil') {
      setImage(null);
      setLoading(false);
    }
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
            {/* Pilih Gambar */}
            <View>
              {loading ? (
                <LoadingComp />
              ) : (
                <TouchableOpacity onPress={onImageLibraryPress}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 8,
                    }}>
                    <Text style={{color: colors.dark}}>Pilih Gambar</Text>
                    <Icon
                      name="picture"
                      type="antdesign"
                      size={24}
                      color={colors.blue}
                    />
                  </View>
                </TouchableOpacity>
              )}
              {image?.assets && (
                <Image
                  source={{uri: image.assets[0].uri}}
                  style={{
                    width: 200,
                    height: 200,
                    alignSelf: 'center',
                    borderRadius: 8,
                  }}
                />
              )}
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
                  fontFamily: 'Poppins-SemiBold',
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
    fontFamily: 'Poppins-ExtraBold',
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
  },
  inputText: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
