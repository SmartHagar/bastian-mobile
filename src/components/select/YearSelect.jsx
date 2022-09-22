/** @format */

import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';

import SelectDropdown from 'react-native-select-dropdown';
import {Icon} from '@rneui/themed';

const dtYear = [];

// year now
const yearNow = new Date().getFullYear();
for (let i = yearNow; i >= yearNow - 10; i--) {
  dtYear.push(i);
}

const YearSelect = ({pilihTahun, isReset}) => {
  const dropdownRef = useRef({});

  useEffect(() => {
    dropdownRef.current.reset();
    console.log('reset');
  }, [isReset]);

  return (
    <SelectDropdown
      search={true}
      data={dtYear}
      ref={dropdownRef}
      onSelect={(selectedItem, index) => {
        pilihTahun(selectedItem);
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        return item;
      }}
      defaultButtonText="Pilih Tahun"
      buttonStyle={styles.dropdown4BtnStyle}
      buttonTextStyle={styles.dropdown4BtnTxtStyle}
      renderDropdownIcon={isOpened => {
        return (
          <Icon
            name={isOpened ? 'chevron-up' : 'chevron-down'}
            type="evilicon"
            size={18}
            color={'#444'}
          />
        );
      }}
      dropdownIconPosition={'right'}
      dropdownStyle={styles.dropdown4DropdownStyle}
      rowStyle={styles.dropdown4RowStyle}
      rowTextStyle={styles.dropdown4RowTxtStyle}
    />
  );
};

export default YearSelect;

const styles = StyleSheet.create({});
