import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ComponentCompiler from './src/components/ComponentCompiler';
import * as Font from 'expo-font';
import CustomLoadingScreen from './src/components/Loading/CustomLoadingScreen'; // Importar la pantalla de carga personalizada

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Función para cargar las fuentes
  const loadFonts = async () => {
    await Font.loadAsync({
      Aleo: require('./assets/Fonts/Aleo-VariableFont_wght.ttf'),
      BostonRegular: require('./assets/Fonts/BostonRegular.otf'),
    });
  };

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  // Si las fuentes no están cargadas, muestra la pantalla de carga personalizada
  if (!fontsLoaded) {
    return <CustomLoadingScreen />;
  }

  // Si las fuentes están cargadas, renderiza la app normalmente
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'Aleo', fontSize: 20, paddingTop:40 }}>Welcome to your app </Text>
      <ComponentCompiler />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
