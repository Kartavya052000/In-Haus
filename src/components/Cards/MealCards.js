import React from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Typography from '../../components/typography/Typography';
import Colors from '../../components/Colors/Colors';
import { FontAwesome } from '@expo/vector-icons';

const MealCard = ({ 
  mealName, 
  portions, 
  onAddPress, 
  onDelete, 
  onPress, // Nueva prop para manejar el clic en estado lleno
  mealNameColor, 
  portionsColor, 
  backgroundColor, 
  borderColor, 
}) => {

  const renderLeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <View style={[styles.deleteButtonContainer, { height: styles.filledCard.height }]}>
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Animated.View style={{ transform: [{ scale }] }}>
            <FontAwesome name="trash" size={24} color="#FFF" />
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  };

  return mealName ? (
    <Swipeable renderLeftActions={renderLeftActions} containerStyle={{ height: styles.filledCard.height }}>
      <TouchableOpacity
        style={[
          styles.card, 
          styles.filledCard, 
          { backgroundColor: Colors.Secondary.Orange[100] } // Set to Secondary/Orange/400 when filled
        ]}
        onPress={onPress} // Ejecuta la acción solo en el estado lleno
      >
        <View style={[styles.filledContent, { borderTopColor: borderColor }]}>
          <View style={styles.icon} />
          <View>
            <Typography variant="SH3" color={mealNameColor} style={styles.mealName}>{mealName}</Typography>
            <Typography variant="Caption" color={portionsColor} style={styles.portions}>For {portions}</Typography>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  ) : (
    <TouchableOpacity
      style={[
        styles.card, 
        styles.emptyCard, 
        { backgroundColor } // Retain background color prop for the empty state
      ]}
      // onPress={onAddPress}
    >
      <Typography variant="SH4" color={mealNameColor} style={styles.addText}>No Meal</Typography>
    </TouchableOpacity>
  );
};

// Styles for the MealCard component
const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  emptyCard: {
    height: 96,
  },
  filledCard: {
    height: 72,
  },
  filledContent: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    borderTopWidth: 2,
    width: '95%',
    padding: 12,
  },
  deleteButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    backgroundColor: '#ff0000',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  mealName: {
    fontFamily: 'BostonRegular',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'left',
  },
  portions: {
    fontFamily: 'BostonRegular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    textAlign: 'left',
  },
  addText: {
    fontFamily: 'BostonRegular',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default MealCard;
