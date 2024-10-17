import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Typography from '../../components/typography/Typography'; // Import Typography component for text styling
// import { MealIcon } from '../icons/icons'; // Import MealIcon for representing meal items

const MealCard = ({ mealName, portions, onAddPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, mealName ? styles.filledCard : styles.emptyCard]}
      onPress={mealName ? undefined : onAddPress}
    >
      {mealName ? (
        <View style={styles.filledContent}>
          <MealIcon style={styles.icon} />
          <View>
            <Typography variant="SH4" color="#333" style={styles.mealName}>{mealName}</Typography>
            <Typography variant="Caption" color="#999" style={styles.portions}>For {portions}</Typography>
          </View>
        </View>
      ) : (
        <Typography variant="SH4" color="#333" style={styles.addText}>add+</Typography>
      )}
    </TouchableOpacity>
  );
};

// Styles for the MealCard component
const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCard: {
    backgroundColor: '#fafafa',
    width: '100%',
    height: 96,
  },
  filledCard: {
    backgroundColor: '#f2f2f2',
    width: '100%',
    height: 72,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filledContent: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: '#999',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  mealName: {
    fontFamily: 'Boston',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'left',
  },
  portions: {
    fontFamily: 'Boston',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    textAlign: 'left',
  },
  addText: {
    fontFamily: 'Boston',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default MealCard;