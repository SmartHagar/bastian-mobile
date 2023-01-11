/** @format */

import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {formatDate} from '../../../../services/date';
import showRupiah from '../../../../services/rupiah';

import colors from '../../../../styles/colors';

// dimensions
const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;

const ListData = ({arrData}) => {
  console.log(arrData);
  return (
    <FlatList
      keyExtractor={item => item.id}
      data={arrData}
      contentContainerStyle={{padding: 10, paddingBottom: 200}}
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
          </View>
        );
      }}
    />
  );
};

export default ListData;

const styles = StyleSheet.create({});
