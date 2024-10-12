import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import RewardTable from './RewardTable';

const RewardList = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Recompensa 1 */}
      <RewardTable
        rewardName="Reward Name 1"
        redeemedDate="12/12/2024"
        points="-500"
        remainingPoints="1200"
        month="December 2024"
        // iconSource={require('./path-to-icons/reward-icon.png')} // Ajusta la ruta del ícono
      />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default RewardList;
