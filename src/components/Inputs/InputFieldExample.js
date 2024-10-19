import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import InputField from './InputField'; // Importa el componente InputField

const NewInputForm = () => {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');

  return (
    <View style={styles.container}>
      <InputField
        label="First Name"
        placeholder="Enter your first name"
        value={text1}
        onChangeText={setText1}
        inputHeight={44}
        inputWidth={208}
        paddingInside={12}
      />
      <InputField
        label="Last Name"
        placeholder="Enter your last name"
        value={text2}
        onChangeText={setText2}
        inputHeight={44}
        inputWidth={208}
        paddingInside={12}
      />
      <InputField
        label="Email Address"
        placeholder="Enter your email"
        value={text3}
        onChangeText={setText3}
        disabled={true}
        inputHeight={44}
        inputWidth={208}
        paddingInside={12}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default NewInputForm;