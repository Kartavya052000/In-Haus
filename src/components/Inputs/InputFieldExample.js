import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import InputField from './InputField'; // Importa el componente InputField

const InputForm = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');

  return (
    <View style={styles.container}>
      <InputField
        label="Label"
        placeholder="Text"
        value={text1}
        onChangeText={setText1}
      />
      <InputField
        label="Label"
        placeholder="Text"
        value={text2}
        onChangeText={setText2}
      />
      <InputField
        label="Label"
        placeholder="Text"
        value={text3}
        onChangeText={setText3}
        disabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default InputForm;
