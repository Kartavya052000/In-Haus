import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import Typography from '../typography/Typography'; // Usamos el componente de tipografía

const InputField = ({ label, placeholder, value, onChangeText, disabled = false }) => {
  return (
    <View style={styles.container}>
      {/* Etiqueta del campo (Label) */}
      <Typography variant="H5" style={styles.label}>
        {label}
      </Typography>

      {/* Campo de entrada (Input) */}
      <Typography variant="BodyS" color="#000">
      </Typography>  
      <TextInput
        style={[styles.input, disabled ? styles.disabledInput:{}]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#A0A0A0" // Color del placeholder
        editable={!disabled} // Campo editable o no editable
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20, // Espaciado entre campos
  },
  input: {
    height: 50,
    borderColor: '#000', // Color del borde
    borderWidth: 1,
    borderRadius: 25, // Bordes redondeados
    paddingHorizontal: 15, // Espaciado interno horizontal
    fontSize: 16, // Tamaño del texto del campo de entrada
  },
  disabledInput: {
    backgroundColor: '#f0f0f0', // Color de fondo más claro para indicar que está deshabilitado
    borderColor: '#d3d3d3', // Color de borde más claro
  },
});

export default InputField;
