import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Typography from '../../components/typography/Typography'; // Import Typography component for text styling

const MealCard = ({ mealName, portions, onAddPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, mealName ? styles.filledCard : styles.emptyCard]}
      onPress={mealName ? undefined : onAddPress} // Keep onAddPress when no meal is present
    >
      {mealName ? (
        <View style={styles.filledContent}>
          <View>
            <Typography variant="SH4" color="#333" style={styles.mealName}>{mealName}</Typography>
            <Typography variant="Caption" color="#999" style={styles.portions}>
              {`For ${portions} portion${portions > 1 ? 's' : ''}`} {/* Ensure pluralization */}
            </Typography>
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
    marginBottom: 0,
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
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  filledContent: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    borderTopWidth: 2,
    borderTopColor: '#999',
    width: '95%',
    padding: 12,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 16,
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
