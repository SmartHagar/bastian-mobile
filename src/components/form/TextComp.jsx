import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../styles/colors';

const TextComp = ({children, ...props}) => {
  return (
    <View>
      <Text className={`font-[Poppins-Regular] text-black`} {...props}>
        {children}
      </Text>
    </View>
  );
};

export default TextComp;

const styles = StyleSheet.create({});
