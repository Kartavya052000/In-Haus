import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, StatusBar, Platform, Dimensions, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import CalendarComponent from '../../components/calendar/CalendarComponent';
import { useLazyQuery, gql, useMutation  } from '@apollo/client';
import { ShoppingListContext } from '../../components/contexts/ShoppingListContext';
import { generateRandom } from 'expo-auth-session/build/PKCE';
import * as SecureStore from 'expo-secure-store';


const { height } = Dimensions.get('window');

const GET_RECIPE = gql`
  query getRecipeById($id: Int!) {
    getRecipeById(id: $id) {
      id
      title
      image
      summary
      readyInMinutes
      healthScore
      cuisines
      servings
      instructions
      ingredients {
        name
        amount
        unit
      }
      steps {
        step
      }
    }
  }
`;

// GraphQL mutation to save a recipe to the database
const SAVE_RECIPE = gql`
  mutation addRecipe($recipe: RecipeInput!) {
    addRecipe(recipe: $recipe) {
      id
      title
    }
  }
`;


const MealDetails = ({ route, navigation }) => {
  const { id, image, title, selectedServings} = route.params;
  const [recipeDetails, setRecipeDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentServings, setCurrentServings] = useState(1);
  const [token, setToken] = useState(null);

  // console.log("id - params:", id);
  // console.log("image - params:", image);
  // console.log("title - params:", title);
  // console.log("selectedServings - params:", selectedServings);
  


  const {
    shoppingListItems, setShoppingListItems, mealPlanItems, setMealPlanItems, selectedDate,  setSelectedDate, selectedMealType, setSelectedMealType 
  } = useContext(ShoppingListContext);

  const [mealType, setMealType] = useState(selectedMealType);

 

  //console.log("selectedMealType - mealDetails:", selectedMealType);
  //console.log("selectedDate  - mealDetails:", selectedDate);

  // Retrieve recipe from database
  const [fetchRecipe, { data: recipeData, loading: recipeLoading }] = useLazyQuery(GET_RECIPE, {
    context: {
      headers: {
        Authorization: `${token}`,
      },
    },
    fetchPolicy: 'network-only', // Make sure to fetch the latest from server
  });

  // Mutation to save recipe
  const [saveRecipe] = useMutation(SAVE_RECIPE, {
    context: {
      headers: {
        Authorization: `${token}`,
      },
    },
  });

  useEffect(() => {
    const getToken = async () => {
      try {
        const authToken = await SecureStore.getItemAsync('authToken');
        if (authToken) {
          setToken(authToken);
        } else {
          console.log('No token found');
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };
    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      fetchRecipeFromDatabase();
    }
  }, [token]);

  const fetchRecipeFromDatabase = () => {
    fetchRecipe({ variables: { id } });
  };

// Check the response from the database query
useEffect(() => {
  if (recipeData && recipeData.getRecipeById) {
    console.log("Data retrieved from database:", recipeData.getRecipeById);
    setRecipeDetails(recipeData.getRecipeById);
    setCurrentServings(+selectedServings);
    setLoading(false);
  } else if (recipeData && !recipeData.getRecipeById) {
    console.log("Recipe not found in database. Fetching from Spoonacular...");
    fetchRecipeDetailsFromSpoonacular();
  }
}, [recipeData]);

// Fetch recipe details from Spoonacular if not found in the database
const fetchRecipeDetailsFromSpoonacular = async () => {
  try {
    const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=bead92b5abb949b7b5a0c0a4d585a623`);
    const data = await response.json();

    if (response.ok && data && !data.status) {
      console.log("Data retrieved from Spoonacular API:", data);

      // Save the fetched recipe to the database
      await saveRecipe({
        variables: {
          recipe: {
            id: data.id,
            title: data.title,
            image: data.image,
            summary: data.summary,
            readyInMinutes: data.readyInMinutes.toString(),
            healthScore: data.healthScore.toString(),
            cuisines: data.cuisines,
            servings: data.servings.toString(),
            instructions: data.analyzedInstructions[0]?.steps.map((step) => step.step).join('\n'), // Save steps as a single string
            ingredients: data.extendedIngredients.map((ing) => ({
              name: ing.name,
              amount: ing.amount,
              unit: ing.unit,
            })),
            steps: data.analyzedInstructions[0]?.steps.map((step) => ({
              step: step.step,
            })),
          },
        },
      });

      console.log("Data saved to database");

      // Fetch the saved data from the database for consistency
      fetchRecipeFromDatabase();
    } else {
      console.log('Failed to fetch recipe from Spoonacular');
    }

    setLoading(false);
  } catch (error) {
    console.error('Error fetching recipe details from Spoonacular:', error);
    setLoading(false);
  }
};

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
    const timestamp = Date.now(); // Generate a unique timestamp for each addition
    const newMeal = {
      mealId: recipeDetails.id, // Original recipe ID for API calls
      uniqueKey: `${recipeDetails.id}-${timestamp}-${generateRandom(5)}`, // Unique key for rendering
      mealTitle: recipeDetails.title,
      mealImage: recipeDetails.image,
      ingredients: recipeDetails.ingredients.map(ingredient => ({
        id: `${ingredient.id}`, // Unique ID for each ingredient
        uniqueKey: `${ingredient.id}-${timestamp}-${generateRandom(5)}`, // Unique key for rendering
        name: ingredient.name,
        amount: parseFloat((ingredient.amount * (currentServings / recipeDetails.servings)).toFixed(2)),
        unit: ingredient.unit || '',
        checked: false,
      }))
    };

    setShoppingListItems([...shoppingListItems, newMeal]);

   
    
    navigation.navigate('MealPlanner', { selectedTab: 'Shopping List', notification: 'Ingredients added to the shopping list!' });
  };

  const addToPlan = async () => {
    const newMeal = {
      mealId: recipeDetails.id,
      mealTitle: title,
      servings: currentServings,
      date: selectedDate,
      mealType: mealType,
      image: image,
    };

    setMealPlanItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(item => item.date === selectedDate && item.mealType === mealType);
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = newMeal;
        return updatedItems;
      } else {
        return [...prevItems, newMeal];
      }
    });

    addToShoppingList();
    navigation.navigate('MealPlanner', { selectedTab: 'My Plan', notification: 'The recipe is now in your plan and shopping list' });
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
      <ImageBackground source={{ uri: image }} style={styles.mealImage} resizeMode="cover">
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

      <View style={styles.mealInfoContainer}>
        <Text style={styles.mealTitle}>{title}</Text>
        <View style={styles.mealDetails}>
          <Text style={styles.mealDetailText}>Time: {recipeDetails.readyInMinutes} min</Text>
          <Text style={styles.mealDetailText}>Health Score: {recipeDetails.healthScore}</Text>
        </View>

        <Text style={styles.dropdownLabel}>Select Date</Text>
        <CalendarComponent
          markedDates={{}}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onDateChange={(date) => setSelectedDate(date)}
        />

        <Text style={styles.dropdownLabel}>Select Meal Type</Text>
        <Picker
          selectedValue={mealType}
          onValueChange={(itemValue) => setMealType(itemValue)}
        >
          <Picker.Item label="Breakfast" value="Breakfast" />
          <Picker.Item label="Lunch" value="Lunch" />
          <Picker.Item label="Dinner" value="Dinner" />
          <Picker.Item label="Snacks" value="Snacks" />
        </Picker>

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

{/* Render details such as ingredients, instructions, etc. */}
<Text style={styles.ingredientsTitle}>Ingredients</Text>
      {recipeDetails.ingredients && recipeDetails.ingredients.length > 0 ? (
        recipeDetails.ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientItem}>
            <Text style={styles.ingredientAmount}>
              {parseFloat((ingredient.amount * (currentServings / recipeDetails.servings)).toFixed(2))} {ingredient.unit}
            </Text>
            <Text style={styles.ingredientName}>{ingredient.name}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noInstructionsText}>No ingredients available.</Text>
      )}


        <TouchableOpacity style={styles.addButton} onPress={addToShoppingList} activeOpacity={0.7}>
          <Text style={styles.addButtonText}>Add Ingredients to Shopping List</Text>
        </TouchableOpacity>

        <Text style={styles.ingredientsTitle}>Instructions</Text>
      {recipeDetails.steps && recipeDetails.steps.length > 0 ? (
        recipeDetails.steps.map((step, index) => (
          <Text key={index} style={styles.instructionText}>
            {index + 1}. {step.step}
          </Text>
        ))
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
    height: height * 0.4,
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 40,
    paddingBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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

export default MealDetails;
