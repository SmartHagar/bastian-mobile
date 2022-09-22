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
import {Image} from 'react-native';

import colors from '../../../styles/colors';
import {Icon} from '@rneui/themed';
// dimensions
const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;
const ListData = ({arrData, handleHapus, handleEdit}) => {
  // setting image kwitansi
  if (arrData.length === 0) {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Poppins_400Regular',
              fontSize: 20,
              color: colors.pink,
            }}>
            Tidak ada gambar
          </Text>
        </View>
      </View>
    );
  }
  // menampilkan dialog delet

  return (
    <FlatList
      keyExtractor={item => item.id}
      data={arrData}
      contentContainerStyle={{padding: 10, paddingBottom: 50}}
      renderItem={({item}) => {
        return (
          <View style={{marginBottom: 15}}>
            <View>
              <Image
                source={{uri: item.gambar}}
                style={{
                  width: '100%',
                  height: 200,
                  borderRadius: 10,
                  marginVertical: 5,
                }}
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity onPress={() => handleHapus(item.id)}>
                <View
                  style={{
                    flexDirection: 'row',
                    borderWidth: 1,
                    borderRadius: 8,
                    // borderColor: colors.yellow,
                    padding: 6,
                  }}>
                  <Icon
                    name="trash"
                    type="evilicon"
                    size={20}
                    color={colors.pink}
                  />
                  <Text style={{color: colors.pink}}>Hapus</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    />
  );
};

export default ListData;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: winHeight,
    width: winWidth,
  },
});
