import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, StatusBar, Platform, Dimensions, ActivityIndicator } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import CalendarComponent from '../../components/calendar/CalendarComponent'; // Import CalendarComponent
import Dropdown from '../../components/Dropdown/Dropdown'; // Import Dropdown
import { Picker } from '@react-native-picker/picker';
import Typography from '../../components/typography/Typography';
import { useLazyQuery, gql, useMutation } from '@apollo/client';
import { ShoppingListContext } from '../../components/contexts/ShoppingListContext';
import { generateRandom } from 'expo-auth-session/build/PKCE';
import { GoBackIcon, SaveIcon, PlusIcon, MinusIcon } from "../../components/icons/icons";
import * as SecureStore from 'expo-secure-store';
const { height } = Dimensions.get('window');

const MealDetailsAI = ({ route, navigation }) => {

  // const { isRecognized, isMeal, mealId, image, title, fullDescription, recipe, servings, ingredients, readyInMinutes, healthScore } = route.params;
  const {
    response
  } = route.params || {};

  const fullDescription = response.fullDescription;
  const title = response.title;
  const recipe = response.recipe;
  const servings = response.servings;
  const ingredients = response.ingredients;
  const readyInMinutes = response.readyInMinutes;
  const healthScore = response.healthScore;

  const mealId = response.mealId;

  const image = route.params.image;
  console.log("fullDescription:", fullDescription);
  console.log("Image URI:", image);

  const [currentServings, setCurrentServings] = useState(servings || 1);
  const {
    shoppingListItems, setShoppingListItems, mealPlanItems, setMealPlanItems, selectedDate, setSelectedDate, selectedMealType, setSelectedMealType
  } = useContext(ShoppingListContext);

  const [mealType, setMealType] = useState(selectedMealType);

  const adjustServings = (type) => {
    if (type === 'increment') setCurrentServings(currentServings + 1);
    else if (type === 'decrement' && currentServings > 1) setCurrentServings(currentServings - 1);
  };
  const handleBack = () => {
    navigation.goBack();
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


  console.log("Received data in MealDetailsAI:", route.params.response);


  return (

    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <View style={styles.backButtonContainer}>
            <GoBackIcon size={24} color="#FF5A5F" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={addToPlan}>
          <View style={styles.filterButtonContainer}>
            <SaveIcon size={24} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView >
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <ImageBackground source={{ uri: image }} style={styles.mealImage} resizeMode="cover">

        </ImageBackground>
        <View style={styles.mealInfoContainer}>
          <Typography variant="H4" style={styles.mealTitle}>{title}</Typography>
          <View style={styles.mealDetails}>
            <Typography variant='BodyS' style={styles.mealDetailText}> <Text style={styles.mealTitleText}>Time:</Text>  {readyInMinutes ? `${readyInMinutes} min` : 'N/A'}
            </Typography>
            <Typography variant='BodyS' style={styles.mealDetailText}><Text style={styles.mealTitleText}>Health Score:</Text>  {healthScore ? healthScore + ' / 100' : 'N/A'}
            </Typography>
          </View>
          {/* Dropdown for Date Selection */}

          <View style={styles.mealDateContainer}>
            <CalendarComponent
              markedDates={{}}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              onDateChange={(date) => setSelectedDate(date)}
              displayMode="date"
            />
          </View>
          {/* Dropdown for Meal Type */}
          <View style={styles.mealTypeContainer}>
            <Picker
              selectedValue={mealType}
              onValueChange={(itemValue) => setMealType(itemValue)}
            >
              <Picker.Item label="Breakfast" value="Breakfast" />
              <Picker.Item label="Lunch" value="Lunch" />
              <Picker.Item label="Dinner" value="Dinner" />
              <Picker.Item label="Snacks" value="Snacks" />
            </Picker>
          </View>

          {/* Servings */}
          <View style={styles.servingsContainer}>
            <Typography variant='SH4' style={styles.fontBold}>{currentServings} Servings</Typography>
            <View style={styles.servingsAdjustContainer}>
              <TouchableOpacity onPress={() => adjustServings('decrement')} style={styles.servingsButton}>
                <MinusIcon size={24} color="#000" />
              </TouchableOpacity>
              <Typography style={styles.servingsNumber}>{currentServings}</Typography>
              <TouchableOpacity onPress={() => adjustServings('increment')} style={styles.servingsButton}>
                <PlusIcon size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

          {/* ingredients*/}


          <Typography variant='SH4' style={styles.ingredientsTitle}>Ingredients:</Typography>
          <View style={styles.ingredientList}>
            {ingredients && ingredients.length > 0 ? (
              ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <Typography variant='BodyS' >
                    {(ingredient.amount * currentServings / servings).toFixed(2)} {ingredient.unit}
                  </Typography>
                  <Typography variant='BodyS' >{ingredient.name}</Typography>
                </View>
              ))
            ) : (
              <Typography variant='BodyS' style={styles.noInstructionsText}>No ingredients available.</Typography>
            )}
          </View>

          <TouchableOpacity style={styles.addButton} onPress={addToShoppingList} activeOpacity={0.7}>
            <Typography variant='BodyS' style={styles.addButtonText}>Add Ingredients to Shopping List</Typography>
          </TouchableOpacity>

          {/* Instructions */}

          <View style={styles.instructionsContainer}>
            <Typography variant='SH4' style={styles.instructionsTitle}>Cooking Instructions</Typography>
            <View style={styles.instructionsDetails}>
              {recipe ? (
                <Text style={styles.instructionText}>{recipe}</Text>
              ) : (
                <Text style={styles.noInstructionsText}>No instructions available.</Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
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
    height: height * 0.5,
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 40,
    paddingBottom: 10,
    position: 'absolute', // Make it stick to the top
    top: 0,              // Ensure it aligns with the top of the screen
    left: 0,
    right: 0,

    zIndex: 10,

  },
  backButton: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  saveButton: {
    padding: 12,
    backgroundColor: '#FF5A5F',
    borderRadius: 16,
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
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  mealDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  mealDetailText: {

  },
  mealTitleText: {
    fontWeight: 'bold',
  },
  mealDateContainer: {

    padding: 5,
    paddingTop: 15,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 24,
  },
  mealTypeContainer: {
    padding: 0,
    marginTop: 10,
    marginBottom: 10,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 24,
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  servingsContainer: {
    paddingTop: 20,
    borderTopColor: '#D9D9D9',
    borderTopWidth: 1,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  fontBold: {
    fontWeight: 'bold',
  },
  servingsAdjustContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  servingsButton: {
    padding: 8,
    marginHorizontal: 4,

  },

  servingsNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ingredientsTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  instructionsTitle: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  ingredientList: {
    flexDirection: 'column',
    gap: 10,
    marginBottom: 16,
    marginTop: 16,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,

  },
  instructionsContainer: {
    paddingTop: 30,
    borderTopColor: '#D9D9D9',
    borderTopWidth: 1,
    marginTop: 20,
    marginBotton: 20,
  },
  instructionsDetails: {
    flexDirection: 'column',
    gap: 20,
    marginBottom: 4,
    lineHeight: 20,
  },
  instructionText: {
    lineHeight: 20,
  },
  noInstructionsText: {

    color: '#999',
  },
  addButton: {
    backgroundColor: '#2e86de',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});


export default MealDetailsAI;
