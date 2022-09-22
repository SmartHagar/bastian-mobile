/** @format */

import { View, Text } from "react-native";
import React from "react";

export default function ItemSeparator({ height, width }) {
  return <View style={{ width, height }} />;
}

ItemSeparator.defaultProps = {
  height: 0,
  width: 0,
};
