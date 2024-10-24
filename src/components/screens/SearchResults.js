import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList,Platform, StatusBar } from 'react-native';
import Typography from '../../components/typography/Typography';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRoute } from '@react-navigation/native';
import mealsData from '../../graphql/data/meals.json';  // Import meals.json

const SearchResults = ({ navigation }) => {
  const route = useRoute();
  const { selectedMealStyles = [], selectedCuisines = [], searchInput = "" } = route.params || {};

  // Define the default meal styles and cuisines at the top level
  const defaultMealStyles = ['main course', 'dessert', 'breakfast', 'side dish', 'salad', 'soup'];
  const defaultCuisines = ['chinese', 'indian', 'japanese', 'latin america', 'italian', 'vietnamese'];

  const getMealsByCriteria = (mealStyle, cuisine, searchInput = "") => {
    let allMeals = [];
    const searchQuery = searchInput.toLowerCase();
  
    // Define the default meal styles and cuisines
    const defaultMealStyles = ['main course', 'dessert', 'breakfast', 'side dish', 'salad', 'soup'];
    const defaultCuisines = ['chinese', 'indian', 'japanese', 'latin america', 'italian', 'vietnamese', 'general'];
  
    // Helper function to collect meals from a specific cuisine within a meal type
    const collectMealsFromCuisine = (mealData, mealType, cuisine) => {
      mealData[mealType].forEach(cuisineObj => {
        if (cuisineObj[cuisine]) {
          allMeals.push(...cuisineObj[cuisine]);  // Collect meals from the specified cuisine
        }
      });
    };
  
    // Case 1: No mealStyle and no cuisine - search globally across all meal types and cuisines
    if (!mealStyle && !cuisine) {
      console.log("Global search: No mealStyle or cuisine selected. Searching across all meal types and cuisines.");
      defaultMealStyles.forEach(type => {
        const mealData = mealsData.meals.find(meal => meal[type]);
        if (mealData) {
          defaultCuisines.forEach(cuisineKey => {
            collectMealsFromCuisine(mealData, type, cuisineKey);
          });
          if (mealData[type].general) {
            allMeals.push(...mealData[type].general);  // Collect from the general dataset
          }
        }
      });
    }
  
    // Case 2: mealStyle is selected but no cuisine - search within that mealStyle across all cuisines including general
    else if (mealStyle && !cuisine) {
      console.log(`Searching within mealStyle: ${mealStyle} across all cuisines including general.`);
      const mealData = mealsData.meals.find(meal => meal[mealStyle]);
      if (mealData) {
        // Collect from all available cuisines within the mealStyle
        defaultCuisines.forEach(cuisineKey => {
          if (mealData[mealStyle].some(cuisineObj => cuisineObj[cuisineKey])) {
            collectMealsFromCuisine(mealData, mealStyle, cuisineKey);
          }
        });
        // Collect from the general dataset within the mealStyle
        // if (mealData[mealStyle].general) {
        //   allMeals.push(...mealData[mealStyle].general);
        // }
      }
    }
  
    // Case 3: Cuisine is selected but no mealStyle - search across all meal types within the selected cuisine
    else if (!mealStyle && cuisine) {
      console.log(`Searching within cuisine: ${cuisine} across all meal types.`);
      // Iterate over all meal types to find meals for the selected cuisine
      defaultMealStyles.forEach(type => {
        const mealData = mealsData.meals.find(meal => meal[type]);
        if (mealData) {
          collectMealsFromCuisine(mealData, type, cuisine);  // Collect meals from the selected cuisine across all meal types
        }
      });
    }
  
    // Case 4: Both mealStyle and cuisine are selected
    else if (mealStyle && cuisine) {
      console.log(`Searching within mealStyle: ${mealStyle} and cuisine: ${cuisine}.`);
      const mealData = mealsData.meals.find(meal => meal[mealStyle]);
      if (mealData) {
        mealData[mealStyle].forEach(cuisineObj => {
          if (cuisineObj[cuisine]) {
            allMeals.push(...cuisineObj[cuisine]);  // Collect meals from the specified meal type and cuisine
          }
        });
      }
    }
  
    console.log("Total meals collected before filtering by search input:", allMeals.length);
  
    // Apply the search input filter, if provided
    if (searchQuery) {
      allMeals = allMeals.filter(meal => {
        return meal.title.toLowerCase().includes(searchQuery);  // Filter meals by title match (partial, case-insensitive)
      });
      console.log("Filtered meals after applying search input:", allMeals.length);
    }
  
    // Return the first 10 matching meals
    return allMeals.slice(0, 10);
  };
  

  const renderFlatListForMeals = (mealStyle, cuisine) => {
    const meals = getMealsByCriteria(mealStyle, cuisine, searchInput);
    const maxChars = 20; 
    return meals.length > 0 ? (
      <FlatList
        data={meals}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.mealCard}
            onPress={() =>
              navigation.navigate('MealDetails', {
                id: item.id,
                image: item.image,
                title: item.title,
                time: item.readyInMinutes,
                healthScore: item.healthScore,
                servings: item.servings,
                ingredients: item.missedIngredients, // assuming ingredients come under 'missedIngredients'

              })
            }
          >
            <Image source={{ uri: item.image }} style={styles.mealImage} />
            <Text style={styles.mealTitle}>
            {item.title.length > maxChars ? `${item.title.substring(0, maxChars)}...` : item.title}
                </Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.mealItemsContainer}
      />
    ) : (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No meals found matching your search.</Text>
      </View>
    );
  };
  

  const handleBack = () => {
    navigation.goBack();
  };
//maximun characters to show in the meal title

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <FontAwesome6 name="arrow-left" size={24} />
        </TouchableOpacity>
        <Typography variant="H4" style={styles.headerTitle}>MealAI</Typography>
        <TouchableOpacity style={styles.filterButton}>
          <FontAwesome6 name="sliders" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 24 }}>
        {selectedCuisines.length === 0 && selectedMealStyles.length === 0 ? (
          <>
            <Typography variant="H4" style={styles.cuisineTitle}>All</Typography>
            {defaultMealStyles.map((mealStyle, index) => {
              const meals = getMealsByCriteria(mealStyle, null, searchInput);
              if (meals.length > 0) {
                return (
                  <View key={index} style={styles.mealStyleSection}>
                    <Typography variant="SH4" style={styles.mealStyleTitle}>{mealStyle}</Typography>
                    {renderFlatListForMeals(mealStyle)}
                  </View>
                );
              }else{
                return (
                    <View style={styles.noDataContainer}>
                            <Text style={styles.noDataText}>No meals found matching your search.</Text>
                          </View>
                )
                              }
            })}
          </>
        ) : selectedMealStyles.length > 0 && selectedCuisines.length === 0 ? (
          <>
            <Typography variant="H4" style={styles.cuisineTitle}>All</Typography>
            {selectedMealStyles.map((mealStyle, mealStyleIndex) => {
              const meals = getMealsByCriteria(mealStyle, null, searchInput);
              if (meals.length > 0) {
                return (
                  <View key={mealStyleIndex} style={styles.mealStyleSection}>
                    <Typography variant="SH4" style={styles.mealStyleTitle}>{mealStyle}</Typography>
                    {renderFlatListForMeals(mealStyle)}
                  </View>
                );
              }else{
return (
    <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No meals found matching your search.</Text>
          </View>
)
              }
             
            })}
          </>
        ) : selectedCuisines.length > 0 && selectedMealStyles.length === 0 ? (
          selectedCuisines.map((cuisine, cuisineIndex) => (
            <View key={cuisineIndex} style={styles.cuisineSection}>
              <Typography variant="H4" style={styles.cuisineTitle}>{cuisine}</Typography>
              {defaultMealStyles.map((mealStyle, mealStyleIndex) => {
                const meals = getMealsByCriteria(mealStyle, cuisine, searchInput);
                if (meals.length > 0) {
                  return (
                    <View key={mealStyleIndex} style={styles.mealStyleSection}>
                      <Typography variant="SH4" style={styles.mealStyleTitle}>{mealStyle}</Typography>
                      {renderFlatListForMeals(mealStyle, cuisine)}
                    </View>
                  );
                }
                return null;
              })}
            </View>
          ))
        ) : selectedCuisines.length > 0 && selectedMealStyles.length > 0 ? (
          selectedCuisines.map((cuisine, cuisineIndex) => (
            <View key={cuisineIndex} style={styles.cuisineSection}>
              <Typography variant="H4" style={styles.cuisineTitle}>{cuisine}</Typography>
              {selectedMealStyles.map((mealStyle, mealStyleIndex) => {
                const meals = getMealsByCriteria(mealStyle, cuisine, searchInput);
                if (meals.length > 0) {
                  return (
                    <View key={mealStyleIndex} style={styles.mealStyleSection}>
                      <Typography variant="SH4" style={styles.mealStyleTitle}>{mealStyle}</Typography>
                      {renderFlatListForMeals(mealStyle, cuisine)}
                    </View>
                  );
                }
                return null;
              })}
            </View>
          ))
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No meals found matching your search.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 0,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 60,
      },
      headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 8,
      },
      headerTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
      },
  backButton: {
    position: 'absolute',
    padding: 8,
    left: 0,
  },
  filterButton: {
    position: 'absolute',
    padding: 8,
    right: 0,
  },
  scrollContainer: {
    flex: 1,
  },
  cuisineSection: {
    marginBottom: 24,
  },
  cuisineTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'capitalize',
    marginBottom:8,
  },
  mealStyleSection: {
    marginBottom: 16,
  },
  mealStyleTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  mealItemsContainer: {
    paddingBottom: 8,
  },
  mealCard: {
    width: 95,
    marginRight: 8,
    paddingTop: 0,
    paddingBottom: 8,
  },
  mealImage: {
    width: 95,
    height: 95,
    marginBottom: 8,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },
  mealTitle: {
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  noDataText: {
    fontSize: 16,
    color: '#999',
  },
});

export default SearchResults;
