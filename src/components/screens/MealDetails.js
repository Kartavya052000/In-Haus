import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView, TouchableOpacity, StatusBar, Platform, Dimensions, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Typography from '../../components/typography/Typography';
import CalendarComponent from '../../components/calendar/CalendarComponent';
import { useLazyQuery, gql, useMutation } from '@apollo/client';
import { ShoppingListContext } from '../../components/contexts/ShoppingListContext';
import { generateRandom } from 'expo-auth-session/build/PKCE';
import * as SecureStore from 'expo-secure-store';
import { SPOONACULAR_API_KEY } from '@env';
import { GoBackIcon, SaveIcon, PlusIcon, MinusIcon } from "../../components/icons/icons";

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
  const { id, image, title, selectedServings } = route.params;
//  console.log('Parameters received:', route.params);
  const [recipeDetails, setRecipeDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentServings, setCurrentServings] = useState(1);
  const [token, setToken] = useState(null);

  console.log("id - params:", id);
  console.log("image - params:", (image? "ok":"No image"));
  console.log("title - params:", title); 
  console.log("selectedServings - params:", selectedServings);



  const {
    shoppingListItems, setShoppingListItems, mealPlanItems, setMealPlanItems, selectedDate, setSelectedDate, selectedMealType, setSelectedMealType
  } = useContext(ShoppingListContext);

  const [mealType, setMealType] = useState(selectedMealType);



  //console.log("selectedMealType - mealDetails:", selectedMealType);
  //console.log("selectedDate  - mealDetails:", selectedDate);

  // Retrieve recipe from database
  const [fetchRecipe, { data: recipeData, loading: queryLoading, error }] = useLazyQuery(GET_RECIPE, {
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
          console.log('Token found:', authToken);
          setToken(authToken);
        
        } else {
          console.error('No token found');
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };
    getToken();
  }, []);
  

  useEffect(() => {
    if (token && id) {
      console.log('Both token and ID are available. Fetching recipe...');
      fetchRecipe({
        variables: { id: parseInt(id, 10) }, // Ensure the ID is an integer
      });
    }
  }, [token, id]);
  

  const fetchRecipeFromDatabase = () => {
    fetchRecipe({
      variables: { id: parseInt(id, 10) }, // Ensure the ID is an integer
    });
    
  };

  // Check the response from the database query

  useEffect(() => {
    if (recipeData) {
   //   console.log('Query Response:', recipeData);
    }
    if (error) {
      console.error('GraphQL Error:', error);
    }
  }, [recipeData, error]);
  useEffect(() => {
    if (recipeData && recipeData.getRecipeById) {
      console.log("Data retrieved from database.");
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
      const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${SPOONACULAR_API_KEY}`);
      const data = await response.json();

      if (response.ok && data && !data.status) {
        console.log("Data retrieved from Spoonacular API");

        // Save the fetched recipe to the database
        console.log("Saving recipe to database... - ID:"+ data.id);
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
      mealImage: '',
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
      <View style={styles.loadingContainer}><Text>Loading...</Text>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

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
            <Typography variant='BodyS' style={styles.mealDetailText}> <Text style={styles.mealTitleText}>Time:</Text> {recipeDetails.readyInMinutes} min</Typography>
            <Typography variant='BodyS' style={styles.mealDetailText}><Text style={styles.mealTitleText}>Health Score:</Text> {recipeDetails.healthScore} / 100</Typography>
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
            {recipeDetails.ingredients && recipeDetails.ingredients.length > 0 ? (
              recipeDetails.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <Typography variant='BodyS' >
                    {parseFloat((ingredient.amount * (currentServings / recipeDetails.servings)).toFixed(2))} {ingredient.unit}
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
              {recipeDetails.steps && recipeDetails.steps.length > 0 ? (
                recipeDetails.steps.map((step, index) => (
                  <Typography variant='BodyS' style={styles.instructionText} key={index} >
                    <Text style={styles.fontBold} >Step {index + 1}: </Text> {step.step}
                  </Typography>
                ))
              ) : (
                <Typography variant='BodyS' style={styles.noInstructionsText}>No instructions available.</Typography>
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

export default MealDetails;
