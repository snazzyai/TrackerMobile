import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const BoxView = ({
  number1,
  number2,
  unit1,
  unit2,
  name1,
  name2,
  imgUrl1,
  imgUrl2,
}) => {
  return (
    <View style={styles.boxView}>
      <View style={styles.box}>
        <Image style={styles.tinyLogo} source={imgUrl1} />
        <Text style={styles.number}>{number1}</Text>
        <Text style={styles.unit}>{unit1}</Text>
        <Text style={styles.name}>{name1}</Text>
      </View>
      <View style={styles.box}>
        <Image style={styles.tinyLogo} source={imgUrl2} />

        <Text style={styles.number}>{number2}</Text>
        <Text style={styles.unit}>{unit2}</Text>
        <Text style={styles.name}>{name2}</Text>
      </View>
    </View>
  );
};

//steps, heartrate, totdistance, totaltime, cadence, pace
const styles = StyleSheet.create({
  boxView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tinyLogo: {
    width: 43,
    height: 43,
  },
  number: {
    fontSize: 35,
    color: '#FF6AB2',
  },
  unit: {
    fontSize: 15,
    color: '#8DAB8C',
  },
  name: {
    fontSize: 18,
    paddingTop: 12,
    color: '#3CB7FC',
  },
  box: {
    alignItems: 'center',
    width: 165,
    height: 165,
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
    paddingTop: 15,
  },
});

export default BoxView;
