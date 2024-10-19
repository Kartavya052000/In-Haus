import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios'; // Para hacer la solicitud a la API

// Importar el componente Typography para usar los estilos
import Typography from '../typography/Typography';

export default function Profile() {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(true);
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
      if (loading) setLoading(false); // Solo cambiar el estado de carga al inicio
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
      <Text style={styles.profileText}>Profile</Text>
      {joke && (
        <Typography style={styles.joke}>
          {joke}
        </Typography>
      )}
      {/* Mostrar un emoji chistoso que se rota aleatoriamente */}
      <Text style={styles.emoji}>{currentEmoji}</Text>
    </View>
  );
}

// Estilos para la pantalla de perfil y el texto del chiste
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  joke: {
    fontFamily: 'Boston',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 20,
    textAlign: 'center',
    color: '#333',
    marginTop: 20,
  },
  emoji: {
    marginTop: 20,
    fontSize: 40,
    textAlign: 'center',
  },
});
