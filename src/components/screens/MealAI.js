import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function MealAI({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
      

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CameraScreen')}>
          <FontAwesome6 name="camera" size={48} color="black" />
          <Text style={styles.label}>What is this?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FixMealCameraScreen')}>
                    <FontAwesome6 name="utensils" size={48} color="black" />
                    <Text style={styles.label}>Fix me a meal</Text>
                </TouchableOpacity>
      </View> 

      <View style={styles.row}>
        <TouchableOpacity style={styles.button}>
          <FontAwesome6 name="calendar-plus" size={48} color="black" />
          <Text style={styles.label}>Meal Planner</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <FontAwesome6 name="file-lines" size={48} color="black" />
          <Text style={styles.label}>My recipes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    width: 150,
    height: 150,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
  },
});
