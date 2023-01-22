import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors from '../../styles/colors';

const ButtonComp = ({
  label = '',
  radius = 10,
  bgColor = colors.primary,
  color = 'white',
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      style={{backgroundColor: bgColor, borderRadius: radius}}
      className="font-[Poppins-Regular]">
      <Text className="text-center p-2" style={{color}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonComp;

const styles = StyleSheet.create({});
