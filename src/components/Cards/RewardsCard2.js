import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Typography from '../typography/Typography';

const RewardsCard2 = ({ imageSource, cardColor = '#f2f2f2', textColor = '#000', rewardName, isRecipe = false, size = 'sizeSmall' }) => {
  const cardStyles = isRecipe ? (size === 'sizeLarge' ? styles.largeCardContainer : styles.smallCardContainer) : styles.cardContainer;

  return (
    <View style={[cardStyles, { backgroundColor: cardColor }]}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={isRecipe ? styles.recipeImage : styles.image} />
      </View>
      {rewardName && (
        <Typography variant="SH4" color={textColor}>
          <Text style={styles.rewardText}>{rewardName}</Text>
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 112,
    height: 112,
    borderRadius: 32,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  smallCardContainer: {
    width: 112,
    height: 112,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  largeCardContainer: {
    width: 172,
    height: 172,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  imageContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  recipeImage: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
    resizeMode: 'cover',
  },
  rewardText: {
    marginTop: 10,
    textAlign: 'center',
  },
});

export default RewardsCard2;