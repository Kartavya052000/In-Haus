import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

const RedeemDrawer = ({ isVisible, onClose, rewardName, amount, pointsSpent, pointsLeft }) => {
  
  const renderContent = () => (
    <View style={styles.modalView}>
      {/* PlayStation logo */}
      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/PlayStation_logo_and_wordmark.svg' }}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Dynamic Text Content */}
      <Text style={styles.title}>Congratulations!</Text>
      <Text style={styles.subTitle}>You just redeemed {amount} {rewardName}</Text>
      <Text style={styles.description}>
        Your new points balance after spending {pointsSpent} points is
      </Text>

      {/* Rewards Row */}
      <View style={styles.rewardsRow}>
        <View style={styles.rewardsLabel}>
          <Text style={styles.rewardsText}>⭐ Rewards Points</Text>
        </View>
        <Text style={styles.rewardsValue}>{pointsLeft}pts</Text>
      </View>

      {/* Ok Button */}
      <TouchableOpacity style={styles.button} onPress={onClose}>
        <Text style={styles.buttonText}>Ok</Text>
      </TouchableOpacity>
    </View>
  );

  const renderLeftActions = () => (
    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
      <Text style={styles.closeButtonText}>Close</Text>
    </TouchableOpacity>
  );

  return (
    <Swipeable
      overshootLeft={false}
      renderLeftActions={renderLeftActions}
      onSwipeableLeftOpen={onClose}
    >
      {isVisible && (
        <View style={styles.centeredView}>
          {renderContent()}
        </View>
      )}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  rewardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },
  rewardsText: {
    fontSize: 16,
    color: '#888',
  },
  rewardsValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#FF4C4C',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RedeemDrawer;
