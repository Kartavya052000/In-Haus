import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import OptionTabs from './OptionTabs'; // Importamos el componente

const optionsFromDatabase = [
  { name: 'Option 1' },
  { name: 'Option 2' },
  { name: 'Option 3' },
];

const App = () => {
  const handleTabChange = (optionName) => {
    Alert.alert(`Option changed to: ${optionName}`);
  };

  return (
    <View style={styles.container}>
      <OptionTabs
        options={optionsFromDatabase}
        activeColor="#ccc" // Color para la opción seleccionada
        inactiveColor="#f9f9f9" // Color para las opciones inactivas
        textColor="#333" // Color del texto
        onTabChange={handleTabChange} // Maneja el cambio de pestaña
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    
  },
});

export default App;
