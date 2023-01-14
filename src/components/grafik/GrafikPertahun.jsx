import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLegend,
  VictoryTheme,
} from 'victory-native';
import useBukuKas from '../../stores/api/buku-kas';
import moment from 'moment';
import LoadingComp from '../LoadingComp';
import YearSelect from '../select/YearSelect';
import TextComp from '../form/TextComp';
import colors from '../../styles/colors';

const GrafikPertahun = () => {
  // store
  const {setApiBukuKas} = useBukuKas();
  // state
  const [tahun, setTahun] = useState('');
  const [pemasukan, setPemasukan] = useState([]);
  const [pengeluaran, setPengeluaran] = useState([]);
  const [isDownload, setIsDownload] = useState(true);
  // effect
  useEffect(() => {
    setIsDownload(true);
    const fetch = async () => {
      const {data} = await setApiBukuKas({tahun});
      groupBy(data);
    };
    fetch();
    return () => {};
  }, [tahun]);

  function groupBy(items) {
    const sumByTgl = Object.values(
      items.reduce((obj, item) => {
        const key = item.jenis + item.tgl_transaksi.split('-')[1];
        if (!obj[key]) {
          obj[key] = Object.assign(item);
        } else {
          obj[key].jumlah += item.jumlah;
        }
        return obj;
      }, {}),
    );
    const groups = sumByTgl.reduce((groups, row) => {
      const date = row.tgl_transaksi.split('-')[1];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(row);
      return groups;
    }, {});

    // Edit: to add it in the array format instead
    const groupArrays = Object.keys(groups).map(date => {
      return {
        tgl_transaksi: date,
        data: groups[date],
      };
    });

    function compare(a, b) {
      if (a.tgl_transaksi < b.tgl_transaksi) {
        return -1;
      }
      if (a.tgl_transaksi > b.tgl_transaksi) {
        return 1;
      }
      return 0;
    }

    groupArrays.sort(compare);
    // memasukan data pemasukan dan pengeluaran ke dalam array
    const pemasukan = [];
    const pengeluaran = [];

    groupArrays.forEach(el => {
      const tgl_kosong = el.tgl_transaksi;
      el.data.forEach(row => {
        const {jenis, jumlah, tgl_transaksi} = row;
        // mengambil bulan dari transaksi
        const tgl = moment(tgl_transaksi).format('MM');
        if (jenis === 'Pemasukan') {
          pemasukan.push({x: tgl, y: jumlah});
        }
        if (jenis === 'Pengeluaran') {
          pengeluaran.push({x: tgl, y: jumlah});
        }
      });
      if (pemasukan.length < pengeluaran.length) {
        pemasukan.push({x: tgl_kosong, y: 0});
      }
      if (pengeluaran.length < pemasukan.length) {
        pengeluaran.push({x: tgl_kosong, y: 0});
      }
    });
    setPemasukan(pemasukan);
    setPengeluaran(pengeluaran);
    setIsDownload(false);
  }

  return (
    <View className="flex-1 w-screen">
      <View className="mt-2 mx-4">
        <YearSelect pilihTahun={setTahun} />
      </View>
      {isDownload && <LoadingComp />}
      <View>
        {!isDownload && (
          <>
            {pemasukan.length > 0 ? (
              // jika ada datanya
              <>
                <VictoryChart
                  width={Dimensions.get('screen').width}
                  theme={VictoryTheme.material}>
                  <VictoryLegend
                    x={Dimensions.get('screen').width / 4}
                    y={10}
                    centerTitle
                    orientation="horizontal"
                    gutter={20}
                    style={{title: {fontSize: 14}}}
                    data={[
                      {name: 'Pemasukan', symbol: {fill: colors.blue}},
                      {name: 'Pengeluaran', symbol: {fill: colors.yellow}},
                    ]}
                  />
                  <VictoryGroup
                    offset={
                      pemasukan.length <= 3
                        ? 60
                        : pemasukan.length <= 5
                        ? 40
                        : 10
                    }
                    colorScale={[colors.blue, colors.yellow]}>
                    <VictoryBar data={pemasukan} />
                    <VictoryBar data={pengeluaran} />
                  </VictoryGroup>

                  {/* mengatur sumbu y*/}
                  <VictoryAxis
                    dependentAxis
                    minimum={0}
                    tickFormat={tick => `${tick / 1000000}Jt`}
                    style={{
                      grid: {stroke: 'grey', strokeWidth: 1},
                      ticks: {stroke: 'black', size: 5},
                      tickLabels: {fontSize: 12, padding: 0},
                    }}
                  />
                  <VictoryAxis />
                </VictoryChart>
              </>
            ) : (
              <View className="mt-[100px]">
                <TextComp className="text-center" style={{color: colors.pink}}>
                  Tidak ada data
                </TextComp>
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default GrafikPertahun;
