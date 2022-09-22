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
import colors from '../../../styles/colors';
import {Icon} from '@rneui/themed';

const ListData = ({arrData, handleHapus, handleEdit}) => {
  // dimensions
  const winWidth = Dimensions.get('window').width;
  const winHeight = Dimensions.get('window').height;
  // menampilkan dialog delet

  return (
    <FlatList
      keyExtractor={item => item.id}
      data={arrData}
      contentContainerStyle={{padding: 10}}
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  width: winWidth - 115,
                  color: colors.dark,
                }}>
                {item.nama}
              </Text>
            </View>
            <View
              style={{
                flex: 2,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 13,
              }}>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Icon
                  name="pencil"
                  type="evilicon"
                  size={24}
                  color={colors.yellow}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleHapus(item.id)}>
                <Icon
                  name="trash"
                  type="evilicon"
                  size={24}
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
