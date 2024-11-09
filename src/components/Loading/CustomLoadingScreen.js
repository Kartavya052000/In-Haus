import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

export default function CustomLoadingScreen() {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentEmoji, setCurrentEmoji] = useState('😆');

  // Set of fun emojis
  const emojis = ['😆', '😂', '🤣', '😜', '😛', '🤪', '🙃', '😹', '🥳'];

  // Function to fetch a joke from the API
  const fetchJoke = async () => {
    try {
      setLoading(true); // Set loading state to true before fetching
      const response = await axios.get('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' },
      });
      setJoke(response.data.joke); // Save the joke to state
    } catch (error) {
      setJoke('Failed to load a joke. Please try again.'); // If API fails
    } finally {
      setLoading(false); // Set loading state to false once fetching is complete
    }
  };

  useEffect(() => {
    // Fetch the joke initially
    fetchJoke();

    // Set an interval to update the joke every 15 seconds
    const jokeIntervalId = setInterval(() => {
      fetchJoke();
    }, 15000);

    // Set an interval to rotate emojis every 2 seconds
    const emojiIntervalId = setInterval(() => {
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      setCurrentEmoji(randomEmoji);
    }, 2000);

    // Clean up intervals when the component unmounts
    return () => {
      clearInterval(jokeIntervalId);
      clearInterval(emojiIntervalId);
    };
  }, []);

  // Render the loading screen with a joke and an activity indicator
  return (
    <LinearGradient
      colors={['#E27F82', '#F3C8CA']}
      style={styles.container}
      start={[0, 0]}
      end={[0, 1]}
    >
      <Text style={styles.emoji}>{currentEmoji}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        joke && (
          <Text style={styles.joke}>
            {joke}
          </Text>
        )
      )}
    </LinearGradient>
  );
}

// Styles for the loading screen and joke text
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  joke: {
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 30,
    textAlign: 'center',
    color: '#333',
    marginTop: 20,
  },
  emoji: {
    fontSize: 40,
    textAlign: 'center',
  },
});
