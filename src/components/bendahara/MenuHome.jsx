/** @format */

import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ItemSeparator from './ItemSeparator';

const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;
// Menu
const menuCard = [
  {
    name: 'Pemasukan',
    img: require('../../assets/retangle/yellow.png'),
    nav: 'TransaksiBend',
  },
  {
    name: 'Pengeluaran',
    img: require('../../assets/retangle/blue.png'),
    nav: 'TransaksiBend',
  },
  {
    name: 'Buku Kas',
    img: require('../../assets/retangle/pink.png'),
    nav: 'BukuKasBend',
  },
];

import {useNavigation} from '@react-navigation/native';

const MenuHome = () => {
  const navigation = useNavigation();

  return (
    <FlatList
      horizontal
      data={menuCard}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <ItemSeparator width={15} />}
      ListHeaderComponent={() => <ItemSeparator width={15} />}
      ListFooterComponent={() => <ItemSeparator width={15} />}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(item.nav, {
              nama: item.name,
            })
          }>
          <ImageBackground source={item.img} resizeMode="stretch">
            <View style={{...styles.container}}>
              <Text style={styles.text}>{item.name}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      )}
    />
  );
};

export default MenuHome;

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: winHeight / 4,
    borderRadius: 6,
    marginVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontFamily: 'Antic-Regular',
  },
});
