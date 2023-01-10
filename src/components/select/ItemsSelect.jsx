import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import useItem from '../../stores/Items';
import colors from '../../styles/colors';
import Icon from 'react-native-vector-icons/EvilIcons';

const ItemsSelect = ({
  disable = false,
  kantin = false,
  pilihItem,
  setPilihItem,
  ...props
}) => {
  // ambil data items
  const {getItems, dtItem} = useItem();
  // reset select
  const dropdownRef = useRef({});
  useEffect(() => {
    dropdownRef.current.reset();
    getItems();
  }, []);

  let data = dtItem;
  if (!kantin) {
    // data = data.filter((row) => row.nama.toLowerCase() !== "kantin");
    data = data.filter(function (row) {
      return !row.nama.toLowerCase().includes('kantin');
    });
  }

  // pilihan Item
  const optionsItem = data.map(function (Item) {
    return {
      value: Item.id,
      label: `${Item.nama}`,
      data: `${Item.kode}`,
    };
  });

  return (
    <SelectDropdown
      search={true}
      data={optionsItem}
      ref={dropdownRef}
      onSelect={selectedItem => {
        setPilihItem(selectedItem);
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem.label;
      }}
      rowTextForSelection={(item, index) => {
        return item.label;
      }}
      buttonStyle={styles.dropdown4BtnStyle}
      buttonTextStyle={styles.dropdown4BtnTxtStyle}
      renderDropdownIcon={isOpened => {
        return (
          <Icon
            name={isOpened ? 'chevron-up' : 'chevron-down'}
            type="evilicon"
            size={18}
          />
        );
      }}
      dropdownIconPosition={'right'}
      dropdownStyle={styles.dropdown4DropdownStyle}
      rowStyle={styles.dropdown4RowStyle}
      rowTextStyle={styles.dropdown4RowTxtStyle}
      {...props}
    />
  );
};

export default ItemsSelect;

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
