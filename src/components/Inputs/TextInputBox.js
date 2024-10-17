import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Typography from '../typography/Typography'; // Importar Typography del path correcto
import { DescriptionIcon } from '../icons/icons'; // Importar el icono de descripcion desde icons.js
import { TextIcon } from '../icons/icons';
const TextInputBox = ({ placeholder, value, onChangeText, disabled = false }) => {
  return (
    <View style={[styles.container, disabled && styles.disabledContainer]}>
      <View style={styles.iconAndLabelContainer}>
        <TextIcon />
        <TextInput
          style={[styles.input, disabled && styles.disabledInput]}
          value={value}
          onChangeText={onChangeText}
          editable={!disabled}
          placeholder={placeholder}
          placeholderTextColor="#ccc"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 8,
    marginBottom: 20,
    width: 320, // Tamaño del contenedor
    height: 163,
  },
  iconAndLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8, // Ajuste para dar espacio adecuado entre el icono y el campo de texto
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    borderWidth: 0, // Eliminar el borde duplicado
    paddingHorizontal: 8,
  },
  disabledContainer: {
    opacity: 0.5,
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
  },
});

export default TextInputBox;
