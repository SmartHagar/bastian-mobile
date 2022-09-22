/** @format */

import {StyleSheet, Text, View} from 'react-native';
import {useEffect, useRef} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {Icon} from '@rneui/themed';

const dtMonth = [
  {
    value: '1',
    label: 'Januari',
  },
  {
    value: '2',
    label: 'Februari',
  },
  {
    value: '3',
    label: 'Maret',
  },
  {
    value: '4',
    label: 'April',
  },
  {
    value: '5',
    label: 'Mei',
  },
  {
    value: '6',
    label: 'Juni',
  },
  {
    value: '7',
    label: 'Juli',
  },
  {
    value: '8',
    label: 'Agustus',
  },
  {
    value: '9',
    label: 'September',
  },
  {
    value: '10',
    label: 'Oktober',
  },
  {
    value: '11',
    label: 'November',
  },
  {
    value: '12',
    label: 'Desember',
  },
];

const MonthSelect = ({pilihBulan, isReset}) => {
  const dropdownRef = useRef({});

  useEffect(() => {
    dropdownRef.current.reset();
    console.log('reset');
  }, [isReset]);

  return (
    <SelectDropdown
      search={true}
      data={dtMonth}
      ref={dropdownRef}
      onSelect={selectedItem => {
        pilihBulan(selectedItem.value);
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem.label;
      }}
      rowTextForSelection={(item, index) => {
        return item.label;
      }}
      defaultButtonText="Pilih Bulan"
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

export default MonthSelect;

const styles = StyleSheet.create({});
