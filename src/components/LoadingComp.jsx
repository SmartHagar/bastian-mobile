/** @format */

import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import colors from "../styles/colors";

const winWidth = Dimensions.get("screen").width;
const winHeight = Dimensions.get("screen").height;

const LoadingComp = () => {
  return <ActivityIndicator size="large" color={colors.primary} />;
};

export default LoadingComp;

const styles = StyleSheet.create({});
