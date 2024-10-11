import React from 'react';
import { View, StyleSheet } from 'react-native';
import Checkbox from './Checkbox'; // Asegúrate de que el path sea correcto

const App = () => {
  return (
    <View style={styles.container}>
      <Checkbox label="Label 1" />
      <Checkbox label="Label 2" />
      <Checkbox label="Label 3" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default App;
