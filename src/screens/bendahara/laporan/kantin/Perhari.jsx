import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import useUrl from '../../../../services/base_url';
import useBukuKas from '../../../../stores/api/buku-kas';
import ListData from '../../../pimpinan/laporan/kantin/ListData';
import ButtonComp from '../../../../components/form/ButtonComp';
import TextComp from '../../../../components/form/TextComp';
import RNFetchBlob from 'rn-fetch-blob';
import LoadingComp from '../../../../components/LoadingComp';
import moment from 'moment';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const Perhari = () => {
  const {BASE_URL} = useUrl();
  // store
  const {setBukuKasPerhari, dtBukuKas} = useBukuKas();
  // state
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [bulan, setBulan] = useState(null);
  const [tahun, setTahun] = useState(null);
  const [perhari, setPerhari] = useState(null);

  // change date picker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;

    setShowPicker(false);
    setDate(currentDate);

    setPerhari(moment(currentDate).format('DD'));
    setBulan(moment(currentDate).format('MM'));
    setTahun(moment(currentDate).format('YYYY'));
  };

  // effect
  useEffect(() => {
    if (perhari && bulan && tahun) {
      setBukuKasPerhari({bulan, tahun, perhari, kantin: true});
    }

    return () => {};
  }, [perhari, bulan, tahun]);

  //   download file
  const REMOTE_IMAGE_PATH = `${BASE_URL}/export/pdf/bulan?tanggal=${perhari}&bulan=${bulan}&tahun=${tahun}`;
  const checkPermission = async () => {
    setIsLoading(true);
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
    let pdf_url = REMOTE_IMAGE_PATH;
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const {config} = RNFetchBlob;
    let dirs = RNFetchBlob.fs.dirs;

    let FileDir = dirs.DownloadDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          FileDir +
          `/bas-aplikasi/Buku Kas Kantin ${perhari}-${bulan}-${tahun}.pdf`,
        description: 'PDF',
      },
    };
    config(options)
      .fetch('GET', pdf_url)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        ToastAndroid.show('Download Berhasil!', ToastAndroid.SHORT);
        setIsLoading(false);
      })
      .catch(function (error) {
        // handle error
        ToastAndroid.show(`Error ${error}`, ToastAndroid.SHORT);
        setIsLoading(false);
      });
  };
  return (
    <View className="h-full">
      {/* Pilih Tahun */}
      <View className="flex-row w-full justify-center space-x-2 mt-2 mx-2 items-center">
        <View className="border border-blue-300 p-2 rounded-lg">
          <Text onPress={() => setShowPicker(true)} style={styles.inputText}>
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
        {isLoading && <LoadingComp />}
        {/* tombol download */}
        {dtBukuKas?.data?.length > 0 && !isLoading && (
          <View>
            <ButtonComp label="Download" onPress={checkPermission} />
          </View>
        )}
      </View>
      {perhari && dtBukuKas?.data?.length > 0 ? (
        <View>
          <ListData arrData={dtBukuKas?.data} />
        </View>
      ) : (
        <View className="justify-center items-center h-full">
          <TextComp className="text-red-600">Data yang dipilih kosong</TextComp>
        </View>
      )}
    </View>
  );
};

export default Perhari;

const styles = StyleSheet.create({});
