import {StyleSheet, View} from 'react-native';
import React from 'react';
import TextComp from '../form/TextComp';
import ButtonComp from '../form/ButtonComp';
import Permissions from 'react-native-permissions';

const Peringatan = ({setShowPeringatan}) => {
  return (
    <View className="h-screen w-full absolute bg-white/50 z-50">
      <View className="justify-center items-center h-full">
        <View className="bg-white">
          <TextComp className="text-center">
            Izin untuk mengakses kamera diperlukan untuk mengambil foto
          </TextComp>
          <TextComp className="text-center">
            Untuk memberikan izin akses kamera, buka pengaturan perizinan
            aplikasi dan aktifkan izin kamera.
          </TextComp>
          <View className="space-y-1 justify-center items-center">
            <View className="flex-row">
              <ButtonComp
                label="Buka Pengaturan"
                onPress={() => Permissions.openSettings()}
              />
            </View>
            <View className="flex-row">
              <ButtonComp
                bgColor="pink"
                color="black"
                label="Tutup"
                onPress={() => setShowPeringatan(false)}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Peringatan;

const styles = StyleSheet.create({});
