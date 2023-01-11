/** @format */

import {StyleSheet, Text, View} from 'react-native';
import {useEffect, useRef} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {Icon} from '@rneui/themed';
import colors from '../../styles/colors';

const dtSemester = ['Genap', 'Ganjil'];

const SemesterSelect = ({pilihSemester, isReset}) => {
  const dropdownRef = useRef({});

  useEffect(() => {
    dropdownRef.current.reset();
    console.log('reset');
  }, [isReset]);

  return (
    <SelectDropdown
      data={dtSemester}
      ref={dropdownRef}
      onSelect={selectedItem => {
        pilihSemester(selectedItem);
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        return item;
      }}
      defaultButtonText="Pilih Semester"
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

export default SemesterSelect;

const styles = StyleSheet.create({
  // dropdown
  dropdown4BtnStyle: {
    width: '100%',
    height: 35,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.dark,
  },
  dropdown4BtnTxtStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    textAlign: 'left',
  },
  dropdown4DropdownStyle: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
  },
  dropdown4RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
    height: 45,
  },
  dropdown4RowTxtStyle: {
    color: colors.dark,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    textAlign: 'left',
  },
});
