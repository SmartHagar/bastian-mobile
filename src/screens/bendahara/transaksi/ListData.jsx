/** @format */

import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/themed';
import {formatDate} from '../../../services/date';
import showRupiah from '../../../services/rupiah';
import {Image} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import colors from '../../../styles/colors';

// dimensions
const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;

const ListData = ({
  arrData,
  handleHapus,
  handleEdit,
  onRefresh,
  refreshing,
}) => {
  // navigation
  const navigation = useNavigation();

  // setting image kwitansi
  const imgKwitansi = kwitansi => {
    //  last data
    if (kwitansi.length > 0) {
      return kwitansi[kwitansi.length - 1].gambar;
    } else {
      // No-Image.svg
      return 'https://img.icons8.com/color/48/000000/no-image.png';
    }
  };

  return (
    <FlatList
      keyExtractor={item => item.id}
      data={arrData}
      contentContainerStyle={{padding: 10, paddingBottom: 200}}
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListFooterComponent={() => <Text></Text>}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => {
        return (
          <View
            style={{
              flexDirection: 'row',
              padding: 8,
              marginBottom: 8,
              backgroundColor: 'rgba(255,255,255,0.8)',
              borderRadius: 16,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('KwitanisBend', {
                  transaksi_id: item.id,
                })
              }>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    width: winWidth - 140,
                    color: colors.dark,
                  }}>
                  {item.item.nama}
                </Text>
                {console.log(item)}
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    width: winWidth - 140,
                    color: colors.dark,
                  }}>
                  {item.ket}
                </Text>
                <Text style={{fontSize: 14, opacity: 0.6, color: colors.dark}}>
                  {formatDate(item.tgl_transaksi)}
                </Text>
                <Text style={{fontSize: 14, opacity: 0.8, color: colors.dark}}>
                  {showRupiah(item.jumlah)}
                </Text>
              </View>
            </TouchableOpacity>
            {/* Gambar Kwitansi */}
            <TouchableOpacity>
              <View>
                <Image
                  source={{uri: imgKwitansi(item.kwitansi)}}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 10,
                  }}
                />
              </View>
            </TouchableOpacity>
            {/* Button action */}
            <View
              style={{marginLeft: 5, flex: 1, justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Icon
                  name="pencil"
                  type="evilicon"
                  size={30}
                  color={colors.yellow}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleHapus(item.id)}>
                <Icon
                  name="trash"
                  type="evilicon"
                  size={30}
                  color={colors.pink}
                />
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    />
  );
};

export default ListData;

const styles = StyleSheet.create({});
