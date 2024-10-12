import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import CustomToggle from './Toggles'; 

const ToggleExample = () => {
  const handleToggleChange = (newState, label) => {
    Alert.alert(`${label} Toggle changed!`, `Nuevo estado: ${newState ? 'Activado' : 'Desactivado'}`);
  };

  return (
    <View style={styles.container}>
      {/* Toggle con texto personalizado */}
      <CustomToggle 
        label="First" 
        initialValue={true} 
        onToggle={(newState) => handleToggleChange(newState, 'First Toggle')} 
      />

      {/* Otro Toggle con texto diferente */}
      <CustomToggle 
        label="Second" 
        initialValue={false} 
        onToggle={(newState) => handleToggleChange(newState, 'Second Toggle')} 
      />

      {/* Un tercer toggle con texto completamente distinto */}
      <CustomToggle 
        label="Another" 
        initialValue={false} 
        onToggle={(newState) => handleToggleChange(newState, 'Another Option')} 
      />
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

export default ToggleExample;
