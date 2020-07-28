import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BoxView from '../components/BoxView';

const HomeScreen = ({ route }) => {
  const steps = JSON.stringify(route.params.steps);
  const time = JSON.stringify(route.params.time);
  const distance = JSON.stringify(route.params.distance);
  const AverageHR = JSON.stringify(route.params.AverageHR);
  const Pace = JSON.stringify(route.params.Pace);
  const activity = JSON.stringify(route.params.activityType);
  const cadence = JSON.stringify(route.params.cadence);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.trackerText}>Tracker</Text>
        <Text style={styles.activityText}>Activity Overview</Text>
        <Text style={styles.typeText}>
          Activity Type: {activity.replace(/(^"|"$)/g, '')}
        </Text>
      </View>
      <View style={styles.boxContainer}>
        <BoxView
          imgUrl1={require('../../assets/heart.png')}
          imgUrl2={require('../../assets/steps.png')}
          number1={AverageHR}
          number2={steps}
          name1="Heart Rate"
          name2="Steps"
          unit1="bpm"
          unit2="steps"
        />
        <BoxView
          imgUrl1={require('../../assets/distance.png')}
          imgUrl2={require('../../assets/time.png')}
          number1={distance}
          number2={time.replace(/(^"|"$)/g, '')}
          name1="Distance Covered"
          name2="Time"
          unit1="kms"
          unit2="m:s"
        />
        <BoxView
          imgUrl1={require('../../assets/pace.png')}
          imgUrl2={require('../../assets/calories.png')}
          number1={Pace}
          number2={cadence}
          name1="Pace"
          name2="Cadence"
          unit1="min/km"
          unit2="steps per minute"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  boxContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  textContainer: {
    paddingLeft: 20,
    paddingTop: 10,
  },
  trackerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3CB7FC',
  },
  activityText: {
    fontSize: 25,
    paddingTop: 5,
    paddingBottom: 5,
  },
  typeText: {
    fontSize: 18,
    color: 'grey',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
