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
import TextComp from '../../../components/form/TextComp';

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
            <View className="flex-1 flex-row justify-between">
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TextComp>{item.nama}</TextComp>
                <TextComp className="ml-2">({item.kode})</TextComp>
              </View>
              <View className="flex-row">
                <View>
                  <TouchableOpacity onPress={() => handleEdit(item)}>
                    <Icon
                      name="pencil"
                      type="evilicon"
                      size={24}
                      color={colors.yellow}
                    />
                  </TouchableOpacity>
                </View>
                <View>
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
            </View>
          </View>
        );
      }}
    />
  );
};

export default ListData;

const styles = StyleSheet.create({});
