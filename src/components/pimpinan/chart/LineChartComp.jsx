/** @format */

import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import colors from "../../../styles/colors";
import { DashboarContext } from "../contexts/DashboardContext";
import moment from "moment";

const LineChartComp = ({ chartConfig, transaksi }) => {
  const [dataGrafik, setDataGrafik] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const arrLabel = [];
    const arrTotal = [];
    if (transaksi) {
      transaksi.map(
        (item) => (
          arrLabel.push(moment(item.bulan, "MM").format("MMMM")),
          arrTotal.push(item.total)
        )
      );
    }
    setDataGrafik({
      labels: arrLabel,
      datasets: [
        {
          data: arrTotal,
        },
      ],
    });
    if (arrTotal.length > 0) {
      setIsLoading(false);
    }
  }, [transaksi]);

  return (
    <ScrollView horizontal={true}>
      {!isLoading && (
        <LineChart
          data={dataGrafik}
          width={
            transaksi.length < 5
              ? Dimensions.get("window").width
              : transaksi.length * 100
          } // from react-native
          height={Dimensions.get("window").width / 1.55}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={chartConfig}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 10,
          }}
        />
      )}
    </ScrollView>
  );
};

export default LineChartComp;

const styles = StyleSheet.create({});
