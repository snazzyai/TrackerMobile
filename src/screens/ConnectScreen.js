import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, ToastAndroid } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import BleManager from 'react-native-ble-manager';
import BluetoothSerial from 'react-native-bluetooth-serial-next';
import { encode as btoa, decode as atob } from 'base-64';

const ConnectScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [list, setList] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [connected, setConnected] = useState(false);

  const toast = (message, length) => {
    ToastAndroid.showWithGravity(
      `${message}`,
      length === 'long' ? ToastAndroid.LONG : ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };
  const onPressDeviceName = (id) => {
    setDeviceId(id);

    //connect to device
    BleManager.connect(id)
      .then(() => {
        setConnected(true);
        toast('Successfully established a connection', 'short');
        //retrieve characteristics for reading
        BleManager.retrieveServices(id)
          .then((peripheralInfo) => {
            // Success code

            let characteristic = 'ABCD';
            let service = 'BCDE';
            toast('Sending data...', 'short');

            BleManager.read(id, service, characteristic)
              .then((arrayBuffer) => {
                // Success code
                let encoded = btoa(
                  String.fromCharCode(...new Uint8Array(arrayBuffer))
                );
                let decoded = atob(encoded);
                let data = JSON.parse(decoded);

                // let data = JSON.parse(decoded);
                if (data) {
                  navigation.navigate('Home', {
                    steps: data.steps,
                    time: data.time,
                    distance: data.distance,
                    AverageHR: Math.ceil(data.AverageHR),
                    Pace: data.Pace,
                    cadence: data.cadence,
                    activityType: data.activity,
                  });
                } else {
                  toast(
                    'Error sending device...Check if device is already paired',
                    'short'
                  );
                  return false;
                }
              })
              .catch((error) => {
                toast('Error retrieving data from bangleJS', 'short');
              });
          })
          .catch((err) =>
            toast('Error retrieving data from bangleJS', 'short')
          );
      })
      .catch((error) => {
        //if id not connectable
        toast(
          'Error connecting to bluetooth device...Check if device is paired',
          short
        );
      });

    setTimeout(
      () => (!connected ? toast('Couldnt connect to device', 'short') : null),
      3000
    );
  };

  const enable = async () => {
    await BluetoothSerial.enable();
    setIsEnabled(true);
    const devices = await BluetoothSerial.list();
    setList(devices);
  };

  const disable = () => {
    setIsEnabled(false);
    setList(null);

    BleManager.disconnect(deviceId)
      .then(() => {
        // Success code

        ToastAndroid.showWithGravity(
          'Successfully disconnected from BangleJS',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      })
      .catch((error) => {
        // Failure code
        console.log(error);
      });
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
      <View style={styles.bluetoothSwitchView}>
        <Text style={styles.switchText}>Toggle Bluetooth</Text>
        <Switch
          style={styles.switchButton}
          value={isEnabled}
          onValueChange={(val) => toggleBluetooth(val)}
        />
      </View>
      <View style={styles.deviceView}>
        <Text
          style={{
            fontSize: 18,
            paddingBottom: 5,
            borderBottomWidth: 1,
            borderBottomColor: 'green',
            margin: 15,
          }}
        >
          Paired Devices
        </Text>
        <FlatList
          data={list ? list : null}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.listView}
                onPress={() => {
                  onPressDeviceName(item.id);
                }}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
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
  switchButton: {
    marginTop: 30,
    marginBottom: 30,
  },
  switchText: {
    fontSize: 20,
  },
  deviceView: {
    padding: 10,
    marginBottom: 20,
  },
  bluetoothSwitchView: {
    alignItems: 'center',
  },
});

export default ConnectScreen;
