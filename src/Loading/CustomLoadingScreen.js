import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios'; // Para hacer la solicitud a la API

// Pantalla de carga personalizada
const CustomLoadingScreen = () => {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(true);

  // Función para obtener un chiste de la API
  const fetchJoke = async () => {
    try {
      const response = await axios.get('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' },
      });
      setJoke(response.data.joke); // Guardar el chiste en el estado
    } catch (error) {
      setJoke('Failed to load a joke. Please try again.'); // Si falla la API
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke(); // Obtener el chiste al montar el componente
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        {/* Aquí puedes dejar un espacio para tu animación futura */}
        {/* <YourAnimationComponent /> */}

        {/* Indicador de carga */}
        <ActivityIndicator size="large" color="#0000ff" />

        {/* Mostrar el chiste una vez que se haya cargado */}
        {joke && <Text style={styles.joke}>{joke}</Text>}
      </View>
    );
  }

  return null; // Retorna null porque la pantalla de carga debe desaparecer una vez que cargue todo
};

// Estilos para la pantalla de carga
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  joke: {
    marginTop: 20,
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#333',
  },
});

export default CustomLoadingScreen;
