import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Typography from '../typography/Typography';

const InputField = ({ label, placeholder, value, onChangeText, disabled = false, inputHeight = 44, inputWidth = '100%', secureTextEntry, children }) => {
  return (
    <View style={styles.container}>
      <Typography variant="SH4" style={styles.label}>
        {label}
      </Typography>
      <View style={{ height: 4 }} />
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            { height: inputHeight, width: inputWidth },
            disabled ? styles.disabledInput : {}
          ]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#A0A0A0"
          editable={!disabled}
          secureTextEntry={secureTextEntry}
        />
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  label: {},
  inputContainer: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
  },
  input: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 12,
    fontSize: 16,
    fontFamily: 'BostonRegular',
    width: '100%',
    paddingRight: 40, // espacio para el ícono
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    borderColor: '#d3d3d3',
  },
});

export default InputField;
