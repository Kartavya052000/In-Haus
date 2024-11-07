import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList, Platform, StatusBar, Alert, Dimensions } from 'react-native';
import Typography from '../../components/typography/Typography';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRoute } from '@react-navigation/native';
import { useLazyQuery, gql } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from 'expo-linear-gradient';
import { GoBackIcon, FiltersIcon } from "../../components/icons/icons";
const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");

import Colors from "../../components/Colors/Colors";

// GraphQL query to fetch meals
const GET_MEALS = gql`
  query getMeals($mealStyle: String, $cuisine: String, $title: String, $ingredients: [String]) {
    getMeals(mealStyle: $mealStyle, cuisine: $cuisine, title: $title, ingredients: $ingredients) {
      mealStyle
      cuisine
      meals {
        id
        title
        likes
        image
        missedIngredients {
          id
          name
          amount
          unit
        }
      }
    }
  }
`;

const SearchResults = ({ navigation }) => {
  const route = useRoute();
  const { selectedMealStyles, selectedCuisines, searchInput, servings, selectedIngredients } = route.params;





  const mealStyle = selectedMealStyles.length > 0 ? selectedMealStyles[0] : null;
  const cuisine = selectedCuisines.length > 0 ? selectedCuisines[0] : null;

  const [token, setToken] = useState(null);
  const [fetchMeals, { loading, data, error }] = useLazyQuery(GET_MEALS);

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
        Alert.alert('Retrieval Error', 'Failed to retrieve authentication token.');
      }
    };
    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      fetchMealData(token);
    }
  }, [token, searchInput, cuisine, mealStyle, selectedIngredients]);

  const fetchMealData = (token) => {
    const variables = {
        title: searchInput || null,
        cuisine: cuisine || null,
        mealStyle: mealStyle || null,
        ingredients: selectedIngredients && selectedIngredients.length > 0 ? selectedIngredients : null,
    };

    console.log('Variables sent to query:', variables);

    fetchMeals({
        context: {
            headers: {
                Authorization: `${token}`,
            },
        },
        variables,
    });  
};

// Log the response to see if data is populated
useEffect(() => {
    if (data) {
        console.log('Query response data:', data);
    }
}, [data]);

  const handleFilters = () => {
    navigation.navigate("FilterScreen", {

      selectedMealStyles, 
      selectedCuisines, 
      searchInput, 
      servings, 


      selectedIngredients
   
    })
  };
console.log("selectedIngredients results:", selectedIngredients);
  const handleBack = () => {
    navigation.goBack();
  };

const handleMealDetails = (meal) => {
  console.log('Meal selected:', meal);
  navigation.navigate('MealDetails', {
    id: meal.id,
    image: meal.image,
    title: meal.title,
    selectedServings: servings,
  });
};

  const renderMealCard = ({ item }) => (
    <TouchableOpacity
      style={styles.mealCard}
      onPress={() => handleMealDetails(item)}
    >
      <Image source={{ uri: item.image }} style={styles.mealImage} />
      <Text style={styles.mealTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F3C8CA', '#E27F82']}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.headerBackground}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <View style={styles.backButtonContainer}>
              <GoBackIcon size={24} color="#FF5A5F" />
            </View>
          </TouchableOpacity>
          <Typography variant="H4" style={styles.headerTitle}>MealAI</Typography>
          <TouchableOpacity style={styles.filterButton} onPress={() => handleFilters()}>
            <View style={styles.filterButtonContainer}>
              <FiltersIcon size={24} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.mainContentContainer}>
        {cuisine && (
          <Typography variant="H5" style={styles.cuisineTitle}>
            {cuisine}
          </Typography>
        )}
        {mealStyle && (
          <Typography variant="SH3" style={styles.mealStyleTitle}>
            {mealStyle}
          </Typography>
        )}
        {searchInput && (
          <Typography variant="BodyS" style={styles.resultsForText}>
            Results for: {searchInput}
          </Typography>
        )}
<View style={styles.scrollContainer}>
  {loading ? (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  ) : error ? (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>Error loading meals: {error.message}</Text>
    </View>
  ) : data?.getMeals?.meals.length > 0 ? (
    <FlatList
      data={data.getMeals.meals}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderMealCard}
      columnWrapperStyle={styles.mealItemsContainer}
      contentContainerStyle={{ paddingBottom: 16 }}
    />
  ) : (
    <View style={styles.noDataContainer}>
      <Text style={styles.noDataText}>No meals found for this selection.</Text>
    </View>
  )}
</View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 60,
  },
  headerBackground: {
    height: 140,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: width,
    marginTop: 54,
  },
  headerTitle: {
    position: 'absolute',
    fontSize: 24,
    lineHeight: 28,
    textAlign: "center",
    color: "#B4525E",
    marginBottom: 0,
    width: width,
  },
  backButtonContainer: {

    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 16,
    backgroundColor: "#fff",

  },
  backButton: {
position: "absolute",
    left: 0,

    top: -10,
    marginLeft: 16,
  },
  filterButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 16,
    backgroundColor: "#ff5a5f",
  },
  filterButton: {
    position: "absolute",
    right: 16,
    top: -10,
  },
  mainContentContainer: {
    flex: 1,
    paddingRight: 8,
    paddingTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    // borderTopRightRadius: 20,
    marginTop: 100, // Para superponer ligeramente el fondo
    // paddingBottom: 16,
    paddingHorizontal: 16,
    marginHorizontal: 16,
  },
  scrollContainer: {
    
    paddingTop: 5,
  },
  cuisineTitle: {
    fontSize: 24,
    color: '#000',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  mealStyleTitle: {
    fontSize: 20,
    color: '#000',
    marginBottom: 16,
    textTransform: 'capitalize',
  },
  mealItemsContainer: {
    justifyContent: 'space-between',
  },
  mealCard: {
    flex: 0.5,
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  mealImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  mealTitle: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#999',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#999',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  noDataText: {
    fontSize: 16,
    color: '#999',
  },
});

export default SearchResults;
