import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Typography from '../typography/Typography';

const BottomSwipeableDrawer = ({ isVisible, setIsVisible, rewardDetails }) => {
  const toggleDrawer = () => {
    setIsVisible(false);
  };

  const onGestureEvent = (event) => {
    // Close the drawer if swiped down
    if (event.nativeEvent.translationY > 50) {
      setIsVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        animationType="slide"
        visible={isVisible}
        onRequestClose={toggleDrawer}
      >
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <View style={styles.drawer}>
            <View style={styles.closeLine} />
            {/* Image and Text */}
            <Image
              // source={{ uri: rewardDetails.imageUrl }} // Use the image URL from rewardDetails
              source={{ uri: 'https://download.logo.wine/logo/PlayStation/PlayStation-Logo.wine.png' }}
             
              style={styles.rewardImage}
            />
            <Typography variant="H5" style={styles.titleText}>Congratulations!</Typography>
            <Typography variant="H5" style={styles.titleText}>
              You just redeemed {rewardDetails.amount} {rewardDetails.rewardType}
            </Typography>
            <Typography variant="BodyS" style={styles.paraText}>Your new points balance after spending</Typography>
            <Typography variant="BodyS" style={styles.paraText2}>
              {rewardDetails.pointsSpent} points is
            </Typography>

            <View style={styles.rewardsContainer}>
              <Typography variant="SH4">Rewards Points</Typography>
              <Typography variant="SH4">{rewardDetails.pointsBalance} pts</Typography>
            </View>

            {/* Add flex-grow to push the button to the bottom */}
            <View style={{ flexGrow: 1 }} />

            {/* Button at the bottom */}
            <TouchableOpacity style={styles.button} onPress={toggleDrawer}>
              <Typography variant="BodyS" style={styles.buttonText}>Ok</Typography>
            </TouchableOpacity>
          </View>
        </PanGestureHandler>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#476BFB',
    borderRadius: 10,
    padding: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20, // Add margin to ensure it's not touching the screen's bottom
  },
  buttonText: {
    color: '#fff',
  },
  rewardImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  rewardsContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  drawer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 750,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    justifyContent: 'flex-end', // Ensures items are positioned at the bottom
  },
  titleText: {
    alignSelf: 'center',
    marginBottom: 5,
  },
  paraText: {
    marginTop: 10,
    alignSelf: 'center',
  },
  paraText2: {
    marginTop: 5,
    alignSelf: 'center',
  },
  closeLine: {
    width: 100,
    height: 5,
    backgroundColor: '#333232',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 5,
  },
});

export default BottomSwipeableDrawer;
