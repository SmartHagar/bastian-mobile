import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import colors from '../../styles/colors';
import {Controller} from 'react-hook-form';

const InputComp = ({label = false, control, name, rules = {}, ...props}) => {
  return (
    <>
      <Text className="text-black font-[Poppins-Regular]">{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
          <>
            <View
              style={[
                styles.container,
                {borderColor: error ? 'red' : '#e8e8e8'},
              ]}>
              <TextInput
                value={value}
                onChangeText={onChange}
                style={{borderColor: colors.dark}}
                className="border py-0 px-2 rounded-md font-[Poppins-Regular] text-sm"
                onBlur={onBlur}
                {...props}
              />
            </View>
            {error && (
              <Text
                style={{color: 'red', alignSelf: 'stretch'}}
                className="font-[Poppins-Regular]">
                {error.message || 'Error'}
              </Text>
            )}
          </>
        )}
      />
    </>
  );
};

export default InputComp;

const styles = StyleSheet.create({});
