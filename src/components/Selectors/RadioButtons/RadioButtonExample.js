import React from 'react';
import { View, StyleSheet } from 'react-native';
import RadioButton from './RadioButton';

const App = () => {
  return (
    <View style={styles.container}>
      <RadioButton options={['Label 1', 'Label 2']} />
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
