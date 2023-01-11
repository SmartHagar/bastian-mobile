import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors from '../../../styles/colors';
import {useNavigation} from '@react-navigation/native';

const BukuKas = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 items-center justify-center space-y-2">
      <TouchableOpacity
        className="w-full"
        onPress={() => navigation.navigate('lap-buku-kas-perbulan')}>
        <View className="border" style={{borderColor: colors.pink}}>
          <Text
            className="text-[16px] font-[Poppins-BoldItalic] py-2 text-center"
            style={{color: colors.dark}}>
            Bulanan
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        className="w-full"
        onPress={() => navigation.navigate('lap-buku-kas-persemester')}>
        <View className="border" style={{borderColor: colors.pink}}>
          <Text
            className="text-[16px] font-[Poppins-BoldItalic] py-2 text-center"
            style={{color: colors.dark}}>
            Semester
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        className="w-full"
        onPress={() => navigation.navigate('lap-buku-kas-pertahun')}>
        <View className="border" style={{borderColor: colors.pink}}>
          <Text
            className="text-[16px] font-[Poppins-BoldItalic] py-2 text-center"
            style={{color: colors.dark}}>
            Tahunan
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BukuKas;

const styles = StyleSheet.create({});
