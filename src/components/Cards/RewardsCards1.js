import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RewardsIcon } from '../icons/icons';
import Colors from '../Colors/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const RewardsCards1 = () => {
  const currentPoints = 3000; // Valor actual simulado
  const totalPoints = 5000;
  const progress = (currentPoints / totalPoints) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <RewardsIcon color={Colors.Secondary.Pink[100]} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Reward Points</Text>
        <Text style={styles.points}>
          {currentPoints}/{totalPoints}
        </Text>
        <View style={styles.progressBarContainer}>
          <LinearGradient
            colors={['#FFC1E3', '#AD1457']}
            start={[0, 0]}
            end={[1, 0]}
            style={[styles.progressBar, { width: `${progress}%` }]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    width: "100%",
    height: 'auto',
    margin: 16,
    padding: 16,
  },
  iconContainer: {
    width: 20,  
    height: 40,
    Color: Colors.Primary.Brand[300],
    borderRadius: 8,
    alignItems: 'Left',
  },
  content: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  points: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#FFF3FC',
    borderRadius: 11,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 11,
  },
});

export default RewardsCards1;
