import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, StatusBar, Platform, Dimensions, ActivityIndicator } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const { height } = Dimensions.get('window');

const MealDetails = ({ route, navigation }) => {
  const { id, image, title } = route.params;

  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentServings, setCurrentServings] = useState(1);
  const [shoppingList, setShoppingList] = useState([]);
  const [mealPlan, setMealPlan] = useState([]);

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

  const addToShoppingList = () => {
    const list = recipeDetails.extendedIngredients.map(ingredient => ({
      name: ingredient.name,
      amount: parseFloat((ingredient.amount * (currentServings / recipeDetails.servings)).toFixed(2)),
      unit: ingredient.unit
    }));
    setShoppingList(list);
    console.log("Shopping List:", list);
  };

  const addToPlan = () => {
    const ingredients = recipeDetails.extendedIngredients.map(ingredient => ({
      name: ingredient.name,
      amount: parseFloat((ingredient.amount * (currentServings / recipeDetails.servings)).toFixed(2)),
      unit: ingredient.unit
    }));

    const planItem = {
      id,
      image,
      title,
      time: recipeDetails.readyInMinutes,
      healthScore: recipeDetails.healthScore,
      servings: currentServings,
      ingredients,
      instructions: recipeDetails.analyzedInstructions.length > 0
        ? recipeDetails.analyzedInstructions[0].steps.map(step => step.step)
        : []
    };
    setMealPlan([...mealPlan, planItem]);
    console.log("Meal Plan:", [...mealPlan, planItem]);
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

        {/* Add to Shopping List Button */}
        <TouchableOpacity style={styles.addToShoppingListButton} onPress={addToShoppingList}>
          <Text style={styles.addToShoppingListText}>Add to Shopping List</Text>
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
  addToShoppingListButton: {
    marginVertical: 16,
    padding: 12,
    backgroundColor: '#4caf50',
    borderRadius: 8,
    alignItems: 'center',
  },
  addToShoppingListText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  instructionText: {
    fontSize: 16,
    marginBottom: 4,
  },
  noInstructionsText: {
    fontSize: 16,
    color: '#999',
  },
});

export default MealDetails;
