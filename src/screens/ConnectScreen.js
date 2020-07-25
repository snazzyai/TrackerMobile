import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial-next';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

const ConnectScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [list, setList] = useState(null);
  const [deviceId, setDeviceId] = useState(null);

  const onPressDeviceName = (id) => {
    setDeviceId(id);
    console.warn(id);
    console.warn(typeof id);
    BluetoothSerial.connect(id)
      .then((res) => console.warn('connected to device', res))
      .catch((err) => console.warn('error connecting'));
  };

  const enable = async () => {
    setIsEnabled(true);
    await BluetoothSerial.enable();
    const devices = await BluetoothSerial.list();
    // const devices = await BluetoothSerial.discoverUnpairedDevices();
    setList(devices);
  };

  const disable = () => {
    setIsEnabled(false);
    setList(null);
  };

  const toggleBluetooth = (value) => {
    if (value === true) {
      enable();
    } else {
      disable();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.switch}>
        <Text>Switch Bluetooth</Text>
        <Switch
          value={isEnabled}
          onValueChange={(val) => toggleBluetooth(val)}
        />
        <FlatList
          data={list ? list : null}
          renderItem={({ item }) => {
            return (
              <View style={styles.listView}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => onPressDeviceName(item.id)}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  listView: {
    padding: 20,
    backgroundColor: '#ddd',
    marginTop: 10,
    marginBottom: 10,
  },
});
export default ConnectScreen;
