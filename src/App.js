import {View, Text, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import StackNav from './nav/StackNav';
import colors from './styles/colors';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.blue} />
      <StackNav />
    </>
  );
};

export default App;
