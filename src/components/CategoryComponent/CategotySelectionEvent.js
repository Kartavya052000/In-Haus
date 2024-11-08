import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { VacationIcon, DinnerIcon, MovieNightIcon, FootballIcon, GameNightIcon, BuyIcon, CloseIcon, OpenIcon } from '../icons/icons';
import Typography from '../typography/Typography';

const CategoryButton = ({ label, Icon, isSelected, onPress }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, isSelected && styles.selectedButton]} 
      onPress={onPress}
    >
      <Icon color={isSelected ? "#476BFB" : "#333232"} />
      <Typography variant="BodyS" style={[styles.label, isSelected && styles.selectedLabel]}>
        {label}
      </Typography>
    </TouchableOpacity>
  );
};

const CategorySelectionEvent = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = [
    { label: 'Vacation', Icon: VacationIcon },
    { label: 'Dinner', Icon: DinnerIcon },
    { label: 'Movie Night', Icon: MovieNightIcon },
    { label: 'Football', Icon: FootballIcon },
    { label: 'Game Night', Icon: GameNightIcon },
    { label: 'Buy', Icon: BuyIcon },
  ];

  return (
    <View style={styles.container}>
      {/* Header with expand/collapse icon */}
      <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={styles.headerContainer}>
        <Typography variant="SH4" style={styles.headerText}>
          Category
        </Typography>
        <View style={styles.icon}>
          {isExpanded ? <CloseIcon /> : <OpenIcon />}
        </View>
      </TouchableOpacity>

      {/* Display selected category and a divider below when not expanded */}
      {!isExpanded && selectedCategory && (
        <>
          <View style={styles.selectedCategoryContainer}>
            <Typography variant="BodyS" style={styles.selectedCategoryText}>
              {selectedCategory}
            </Typography>
          </View>
          <View style={styles.divider} />
        </>
      )}

      {/* Category buttons only show when expanded */}
      {isExpanded && (
        <View style={styles.categoryContainer}>
          {categories.map((category, index) => (
            <CategoryButton
              key={index}
              label={category.label}
              Icon={category.Icon}
              isSelected={selectedCategory === category.label}
              onPress={() => {
                setSelectedCategory(category.label);
                setIsExpanded(false); 
              }}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingVertical: 10,
    // borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    color: '#333232',
  },
  icon: {
    marginLeft: 10,
  },
  selectedCategoryContainer: {
    paddingVertical: 10,
  },
  selectedCategoryText: {
    color: '#6F6D6D',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 5,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    width: '30%',
    padding: 10,
    backgroundColor: '#FCFAFA',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  selectedButton: {
    borderColor: '#476BFB',
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
  },
  label: {
    marginTop: 8,
    color: '#333232',
    fontSize: 14,
  },
  selectedLabel: {
    color: '#476BFB',
  },
});

export default CategorySelectionEvent;
