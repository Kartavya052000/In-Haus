import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Typography from '../../components/typography/Typography'; // Import Typography
import axios from 'axios'; // Para hacer la solicitud a la API

export default function CustomLoadingScreen() {
  const [joke, setJoke] = useState('');
  const [currentEmoji, setCurrentEmoji] = useState('😆');

  // Set de emojis chistosos
  const emojis = ['😆', '😂', '🤣', '😜', '😛', '🤪', '🙃', '😹', '🥳'];

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
    //  if (loading) setLoading(false); // Solo cambiar el estado de carga al inicio
    }
  };

  useEffect(() => {
    // Obtener el chiste inicialmente
    fetchJoke();

    // Crear un intervalo para actualizar el chiste cada 15 segundos
    const jokeIntervalId = setInterval(() => {
      fetchJoke();
    }, 15000);

    // Crear un intervalo para rotar los emojis cada 2 segundos
    const emojiIntervalId = setInterval(() => {
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      setCurrentEmoji(randomEmoji);
    }, 2000);

    // Limpiar los intervalos al desmontar el componente
    return () => {
      clearInterval(jokeIntervalId);
      clearInterval(emojiIntervalId);
    };
  }, []);

  // Mostrar la pantalla de perfil con el chiste y el indicador de carga
  return (
    <View style={styles.container}>
          <Text style={styles.emoji}>{currentEmoji}</Text>
      {joke && (
        <Typography style={styles.joke}>
          {joke}
        </Typography>
      )}
      {/* Mostrar un emoji chistoso que se rota aleatoriamente */}
  
    </View>
  );
}

// Estilos para la pantalla de perfil y el texto del chiste
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  joke: {
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 30,
    textAlign: 'center',
    color: '#fff',
    marginTop: 20,
  },
  emoji: {
    marginTop: 20,
    fontSize: 40,
    textAlign: 'center',
  },
});
