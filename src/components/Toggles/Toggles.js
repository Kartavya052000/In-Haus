import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import Typography from '../typography/Typography'; // Importa el componente Typography

const CustomToggle = ({ label, initialValue, onToggle }) => {
  const [isEnabled, setIsEnabled] = useState(initialValue);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    onToggle(!isEnabled); // Llama a la función de callback al cambiar el estado
  };

  return (
    <View style={styles.toggleContainer}>
      <Typography variant="BodyS" color={isEnabled ? '#FFF' : '#999'}>
        {label}
      </Typography>
      <Switch
        trackColor={{ false: '#E0E0E0', true: '#333' }} // Color de la pista
        thumbColor={isEnabled ? '#FFF' : '#FFF'} // Color del botón del toggle
        ios_backgroundColor="#E0E0E0"
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={styles.switch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 30,
    marginVertical: 10,
    width: 150, // Ajusta el ancho según el diseño
  },
  label: {
    fontSize: 16,
  },
  labelActive: {
    color: '#FFF', // Color cuando el toggle está activado
  },
  labelInactive: {
    color: '#999', // Color cuando el toggle está desactivado
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }], // Ajustar el tamaño del toggle
  },
});

export default CustomToggle;
