import React, { useState, useEffect, useContext  } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, StatusBar, Platform, Dimensions, ActivityIndicator } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import CalendarComponent from '../../components/calendar/CalendarComponent'; // Import CalendarComponent
import Dropdown from '../../components/Dropdown/Dropdown'; // Import Dropdown
import { useMutation } from '@apollo/client';
import { CREATE_MEAL } from '../../graphql/mutations/mealMutations/mealMutations'
import { ShoppingListContext  } from '../../components/contexts/ShoppingListContext';

const { height } = Dimensions.get('window');

const MealDetails = ({ route, navigation }) => {
  const { id, image, title } = route.params;

  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentServings, setCurrentServings] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date
  const [mealType, setMealType] = useState('Lunch'); // Default to Lunch
  const [createMeal] = useMutation(CREATE_MEAL); // Mutation to create meal in the database
  const { shoppingListItems, setShoppingListItems } = useContext(ShoppingListContext);


  const addToShoppingList = () => {
    const newMeal = {
      mealId: recipeDetails.id,
      mealTitle: recipeDetails.title,
      ingredients: recipeDetails.extendedIngredients.map(ingredient => ({
        name: ingredient.name,
        amount: parseFloat((ingredient.amount * (currentServings / recipeDetails.servings)).toFixed(2)),
        unit: ingredient.unit || '',
        checked: false, // Initially unchecked
      }))
    };

   
  
    setShoppingListItems([...shoppingListItems, newMeal]);
  
    // Navigate to MealPlanner with the Shopping List tab active
    navigation.navigate('MealPlanner', {
      selectedTab: 'Shopping List', // This ensures the shopping list tab will be active
    });
  };
  
  

  // Fetch recipe details from Spoonacular API
  const fetchRecipeDetails = async () => {
    try {
      const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=bead92b5abb949b7b5a0c0a4d585a623`);
      const data = await response.json();
      setRecipeDetails(data);
      setCurrentServings(data.servings);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipeDetails();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const adjustServings = (type) => {
    if (type === 'increment') {
      setCurrentServings(currentServings + 1);
    } else if (type === 'decrement' && currentServings > 1) {
      setCurrentServings(currentServings - 1);
    }
  };

  const addToPlan = async () => {

    const newMealPlan = {
      mealId: recipeDetails.id,
      mealTitle: recipeDetails.title,
      servings: currentServings,
      selectedDate: selectedDate,
      mealType: mealType,
      
    };

   
  
    setShoppingListItems([...shoppingListItems, newMeal]);
  
    // Navigate to MealPlanner with the Shopping List tab active
    navigation.navigate('MealPlanner', {
      selectedTab: 'Shopping List', // This ensures the shopping list tab will be active
    });


   


    // const ingredients = recipeDetails.extendedIngredients.map(ingredient => ({
    //   name: ingredient.name,
    //   amount: parseFloat((ingredient.amount * (currentServings / recipeDetails.servings)).toFixed(2)),
    //   unit: ingredient.unit
    // }));

    // try {
    //   // Store meal in the database
    //   await createMeal({
    //     variables: {
    //       userId: 1, // Assuming the user ID is 1, replace this with actual user data
    //       mealName: title,
    //       mealType: mealType,
    //       date: selectedDate,
    //       portions: currentServings,
    //       ingredients: ingredients,
    //       mealImage: image,
    //     },
    //  });

      // Navigate back to MealPlanner or show a success message
    //   navigation.navigate('MealPlanner', {
    //     meal: {
    //       mealName: title,
    //       portions: currentServings,
    //       ingredients: ingredients,
    //       date: selectedDate,
    //       mealType: mealType,
    //     },
    //   });
    // } catch (error) {
    //   console.error('Error adding meal to plan:', error);
    // }
  };

  if (loading) {  
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Image as Background */}
      <ImageBackground source={{ uri: image }} style={styles.mealImage} resizeMode="cover">
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <FontAwesome6 name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addToPlanButton} onPress={addToPlan}>
            <Text style={styles.addToPlanText}>Add to Plan</Text>
            <FontAwesome6 name="plus" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* Meal Information */}
      <View style={styles.mealInfoContainer}>
        <Text style={styles.mealTitle}>{title}</Text>
        <View style={styles.mealDetails}>
          <Text style={styles.mealDetailText}>Time: {recipeDetails.readyInMinutes} min</Text>
          <Text style={styles.mealDetailText}>Health Score: {recipeDetails.healthScore}</Text>
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

        {/* Servings */}
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

        {/* Ingredients */}
        <Text style={styles.ingredientsTitle}>Ingredients</Text>
        {recipeDetails.extendedIngredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientItem}>
            <Text style={styles.ingredientAmount}>
              {parseFloat((ingredient.amount * (currentServings / recipeDetails.servings)).toFixed(2))} {ingredient.unit}
            </Text>  
            <Text style={styles.ingredientName}>{ingredient.name}</Text>
          </View>
        ))}

<TouchableOpacity style={styles.addButton} onPress={addToShoppingList}  activeOpacity={0.7} >
  <Text style={styles.addButtonText}>Add Ingredients to Shopping List</Text>
</TouchableOpacity>

        {/* Instructions */}
        <Text style={styles.ingredientsTitle}>Instructions</Text>
        {recipeDetails.analyzedInstructions.length > 0
          ? recipeDetails.analyzedInstructions[0].steps.map((step, index) => (
              <Text key={index} style={styles.instructionText}>
                {index + 1}. {step.step}
              </Text>
            ))
          : <Text style={styles.noInstructionsText}>No instructions available.</Text>
        }
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

export default MealDetails;
