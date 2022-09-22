import {
  PermissionsAndroid,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import colors from '../../../styles/colors';
import MonthSelect from '../../../components/select/MonthSelect';
import YearSelect from '../../../components/select/YearSelect';
import RNFetchBlob from 'rn-fetch-blob';
import useUrl from '../../../services/base_url';

const {BASE_URL} = useUrl();

const BukuKas = () => {
  // state filter data
  const [bulan, setBulan] = useState('');
  const [tahun, setTahun] = useState('');
  const [reset, setReset] = useState(false);

  const pilihBulan = bulan => {
    setBulan(bulan);
  };
  const pilihTahun = tahun => {
    setTahun(tahun);
  };

  const REMOTE_IMAGE_PATH = `${BASE_URL}/excel/transaksi?tahun=${tahun}&bulan=${bulan}`;
  const checkPermission = async () => {
    setReset(true);
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === 'ios') {
      downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Photos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadFile();
        } else {
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };

  const downloadFile = () => {
    // Image URL which we want to download
    let excel_URL = REMOTE_IMAGE_PATH;
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const {config} = RNFetchBlob;
    let dirs = RNFetchBlob.fs.dirs;

    let PictureDir = dirs.DownloadDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path: PictureDir + `/bas-aplikasi/buku kas ${bulan} ${tahun}.xlsx`,
        description: 'Excel',
      },
    };
    config(options)
      .fetch('GET', excel_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        ToastAndroid.show('Download Berhasil!', ToastAndroid.SHORT);
        setReset(false);
      });
  };

  return (
    <SafeAreaView style={{marginHorizontal: 5, marginVertical: '5%'}}>
      <View>
        <Text
          style={{
            color: colors.dark,
            textAlign: 'center',
            fontFamily: 'Poppins-Regular',
          }}>
          Silahkan memilih Bulan dan Tahun untuk melihat buku kas dalam format
          excel
        </Text>
      </View>
      <View
        style={{
          borderBottomColor: '#ffff',
          borderBottomWidth: 1,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,

          elevation: 24,
          marginTop: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <MonthSelect pilihBulan={pilihBulan} isReset={reset} />
          <YearSelect pilihTahun={pilihTahun} isReset={reset} />
        </View>
      </View>
      <TouchableOpacity onPress={checkPermission}>
        <View
          style={{
            marginTop: 20,
            alignItems: 'center',
            borderWidth: 1,
            paddingVertical: 10,
            borderRadius: 10,
            borderColor: colors.primary,
          }}>
          <Text style={{color: colors.dark, fontFamily: 'Poppins-Medium'}}>
            Downlod Buku Kas
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BukuKas;

const styles = StyleSheet.create({});
