import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Typography from '../typography/Typography'; // Usamos el componente de tipografía

const InputField = ({ label, placeholder, value, onChangeText, disabled = false, inputHeight = 44, inputWidth = 208 }) => {
  return (
    <View style={styles.container}>
      {/* Etiqueta del campo (Label) */}
      <Typography variant="SH4" style={styles.label}>
        {label}
      </Typography>

      {/* Espacio entre Label y el Input */}
      <View style={{ height: 4 }} />

      {/* Campo de entrada (Input) */}
      <TextInput
        style={[
          styles.input,
          { height: inputHeight, width: inputWidth },
          disabled ? styles.disabledInput : {}
        ]}
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
  label: {
    // marginBottom: 4, // Espaciado entre label y campo de entrada
  },
  input: {
    borderColor: '#000', // Color del borde
    borderWidth: 1,
    borderRadius: 24, // Bordes redondeados
    paddingHorizontal: 12, // Espaciado interno horizontal
    fontSize: 16, // Tamaño del texto del campo de entrada
    fontFamily: 'BostonRegular',
  },
  disabledInput: {
    backgroundColor: '#f0f0f0', // Color de fondo más claro para indicar que está deshabilitado
    borderColor: '#d3d3d3', // Color de borde más claro
  },
});

export default InputField;