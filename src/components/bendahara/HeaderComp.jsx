/** @format */

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors from '../../styles/colors';
import {useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';

const HeaderComp = ({nama, setOpen, setCekEdit}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" type="evilicon" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.text}>{nama}</Text>
        <View
          style={{flexDirection: 'row', justifyContent: 'flex-end', flex: 1}}>
          <TouchableOpacity
            onPress={() => {
              setOpen(true), setCekEdit(false);
            }}>
            <Icon name="plus" type="evilicon" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HeaderComp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: 50,
    paddingHorizontal: 10,
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
    marginTop: 5,
  },
});
