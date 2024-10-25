import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, StatusBar, Dimensions, Platform } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import CalendarComponent from '../../components/calendar/CalendarComponent'; // Import CalendarComponent
import Dropdown from '../../components/Dropdown/Dropdown'; // Import Dropdown
import { ShoppingListContext } from '../contexts/ShoppingListContext';

const { height } = Dimensions.get('window');

const MealDetailsAI = ({ route, navigation }) => {
 
  const { isRecognized, isMeal, mealId, image, title, fullDescription, recipe, servings, ingredients, readyInMinutes, healthScore } = route.params;
  const [currentServings, setCurrentServings] = useState(servings || 1);
  const { shoppingListItems, setShoppingListItems } = useContext(ShoppingListContext);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
const [mealType, setMealType] = useState('Lunch');

  const adjustServings = (type) => {
    if (type === 'increment') setCurrentServings(currentServings + 1);
    else if (type === 'decrement' && currentServings > 1) setCurrentServings(currentServings - 1);
  };

  const addToPlan = () => {
    // Add your functionality here. For example:
    console.log('Meal added to plan');
    // You can also implement navigation, state updates, or other actions as needed.
  };
  
  const addToShoppingList = () => {
    const newMeal = {
      mealId: mealId || `IA-${Math.floor(1000 + Math.random() * 9000)}`, // Generates IA-XXXX where XXXX is a random 4-digit number
      mealTitle: title, // Ensure that the title is correctly set as mealTitle
      ingredients: ingredients.map(ingredient => ({
        name: ingredient.name,
        amount: parseFloat((ingredient.amount * currentServings / servings).toFixed(2)),
        unit: ingredient.unit || '',
        checked: false, // Initially unchecked
      })),
    };
  
    // Add the new meal to the shopping list and navigate
    setShoppingListItems([...shoppingListItems, newMeal]);
    navigation.navigate('MealPlanner', { selectedTab: 'Shopping List' });
  };
  

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ImageBackground source={{ uri: image }} style={styles.mealImage} resizeMode="cover">
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <FontAwesome6 name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addToPlanButton} onPress={addToPlan}>
  <Text style={styles.addToPlanText}>Add to Plan</Text>
  <FontAwesome6 name="plus" size={16} color="#fff" />
</TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={styles.mealInfoContainer}>
        <Text style={styles.mealTitle}>{title}</Text>
        {/* <Text style={styles.mealDescription}>{fullDescription}</Text> */}
        <View style={styles.mealDetails}>
  <Text style={styles.mealDetailText}>
    Time: {readyInMinutes ? `${readyInMinutes} min` : 'N/A'}
  </Text>
  <Text style={styles.mealDetailText}>
    Health Score: {healthScore ? healthScore : 'N/A'}
  </Text>
</View>

        {/* Dropdown for Date Selection */}
        <Text style={styles.dropdownLabel}>Select Date</Text>
        <CalendarComponent
          markedDates={{}} // Placeholder for marked dates
          selectedDate={selectedDate}
          onDateChange={(date) => setSelectedDate(date)}
        />

        {/* Dropdown for Meal Type */}
        <Text style={styles.dropdownLabel}>Select Meal Type</Text>
        <Dropdown
          label="Meal Type"
          options={['Breakfast', 'Lunch', 'Dinner', 'Snacks']}
          selectedOption={mealType} // Show the selected meal type
          onOptionSelect={setMealType} // Set the selected meal type
          disabled={false}
        />

        <View style={styles.servingsContainer}>
          <Text style={styles.servingsText}>{currentServings} Servings</Text>
          
          <View style={styles.servingsAdjustContainer}>
            <TouchableOpacity onPress={() => adjustServings('decrement')} style={styles.servingsButton}>
              <Text style={styles.servingsButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.servingsNumber}>{currentServings}</Text>
            <TouchableOpacity onPress={() => adjustServings('increment')} style={styles.servingsButton}>
              <Text style={styles.servingsButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.ingredientsTitle}>Ingredients</Text>
        {ingredients && ingredients.length > 0 ? (
  ingredients.map((ingredient, index) => (
    <View key={index} style={styles.ingredientItem}>
      <Text style={styles.ingredientAmount}>
        {(ingredient.amount * currentServings / servings).toFixed(2)} {ingredient.unit}
      </Text>
      <Text style={styles.ingredientName}>{ingredient.name}</Text>
    </View>
  ))
) : (
  <Text>No ingredients available.</Text>
)}



        <TouchableOpacity style={styles.addButton} onPress={addToShoppingList} activeOpacity={0.7}>
          <Text style={styles.addButtonText}>Add Ingredients to Shopping List</Text>
        </TouchableOpacity>

        <Text style={styles.ingredientsTitle}>Instructions</Text>
{recipe ? (
  <Text style={styles.instructionText}>{recipe}</Text>
) : (
  <Text style={styles.noInstructionsText}>No instructions available.</Text>
)}

        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealImage: {
    width: '100%',
    height: height * 0.4,  // Occupy the top 40% of the screen height
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 40,
    paddingBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent background
  },
  backButton: {
    padding: 8,
  },
  addToPlanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  addToPlanText: {
    marginRight: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  mealInfoContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  mealTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mealDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  mealDetailText: {
    fontSize: 16,
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  servingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  servingsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  servingsAdjustContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  servingsButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  servingsButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  servingsNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ingredientsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  ingredientAmount: {
    fontSize: 16,
  },
  ingredientName: {
    fontSize: 16,
  },
  instructionText: {
    fontSize: 16,
    marginBottom: 4,
  },
  noInstructionsText: {
    fontSize: 16,
    color: '#999',
  },
  addButton: {
    backgroundColor: '#2e86de', // Blue background color
    paddingVertical: 16,        // Vertical padding for a larger button
    paddingHorizontal: 24,      // Horizontal padding
    borderRadius: 10,           // Rounded corners
    alignItems: 'center',       // Center the text
    marginVertical: 16,         // Margin between button and other elements
    shadowColor: '#000',        // Button shadow
    shadowOffset: { width: 0, height: 4 }, // Shadow direction
    shadowOpacity: 0.3,         // Shadow opacity
    shadowRadius: 5,            // Shadow blur radius
    elevation: 5,               // Elevation for Android shadow
  },

  addButtonText: {
    color: '#fff',              // White text
    fontWeight: 'bold',         // Bold text
    fontSize: 16,               // Larger text size
  }
});

export default MealDetailsAI;
