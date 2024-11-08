import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CleaningIcon, LaundryIcon, DishesIcon, HomeworkIcon, GroceriesIcon, BuyIcon } from '../icons/icons';

const CategoryButton = ({ label, Icon, isSelected, onPress }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, isSelected && styles.selectedButton]} 
      onPress={onPress}
    >
      <Icon color={isSelected ? "#183AC1" : "#333232"} />
      <Text style={[styles.label, isSelected && styles.selectedLabel]}>{label}</Text>
    </TouchableOpacity>
  );
};

const CategorySelection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = [
    { label: 'Cleaning', Icon: CleaningIcon },
    { label: 'Laundry', Icon: LaundryIcon },
    { label: 'Dishes', Icon: DishesIcon },
    { label: 'Homework', Icon: HomeworkIcon },
    { label: 'Groceries', Icon: GroceriesIcon },
    { label: 'Buy', Icon: BuyIcon },
  ];

  return (
    <View style={styles.container}>
      {categories.map((category, index) => (
        <CategoryButton
          key={index}
          label={category.label}
          Icon={category.Icon}
          isSelected={selectedCategory === category.label}
          onPress={() => setSelectedCategory(category.label)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  button: {
    width: '30%',
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedButton: {
    borderColor: '#183AC1',
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
  },
  label: {
    marginTop: 8,
    color: '#333232',
    fontSize: 14,
  },
  selectedLabel: {
    color: '#183AC1',
  },
});

export default CategorySelection;
