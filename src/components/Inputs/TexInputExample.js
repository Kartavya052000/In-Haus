import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import TextInputBox from './TextInputBox'; // Importar el componente TextInputBox

const TextInputBoxExample = () => {
  const [text, setText] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Ejemplo de componente activo */}
      <TextInputBox placeholder="Description" disabled={false} />

      {/* Ejemplo de componente deshabilitado */}
      <TextInputBox placeholder="Description" disabled={true} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TextInputBoxExample;