import React from 'react';
import { View, StyleSheet } from 'react-native';
import Dropdown from './Dropdown';

const App = () => {
  return (
    <View style={styles.container}>
      <Dropdown
        label="Label"
        options={['Option 1', 'Option 2', 'Option 3']}
        disabled={false} // Con opción seleccionada
      />

      <Dropdown
        label="Label"
        options={['Option 1', 'Option 2', 'Option 3']}
        disabled={true} // Deshabilitado
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});

export default App;
