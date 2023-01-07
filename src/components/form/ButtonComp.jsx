import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors from '../../styles/colors';

const ButtonComp = ({label = '', radius = 10, ...props}) => {
  return (
    <TouchableOpacity
      {...props}
      style={{backgroundColor: colors.primary, borderRadius: radius}}
      className="font-[Poppins-Regular]">
      <Text className="text-white text-center p-2">{label}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComp;

const styles = StyleSheet.create({});
