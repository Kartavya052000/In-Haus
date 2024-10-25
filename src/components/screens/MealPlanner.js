import React,  { useContext }  from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Dimensions, Platform, StatusBar, ScrollView, Text } from 'react-native';
import Typography from '../../components/typography/Typography'; // Import Typography
import { AddIcon, OpenIcon, CloseIcon, DeleteIcon } from '../../components/icons/icons'; // Import AddIcon and dropdown icons
import OptionTabs from '../../components/TabsNavigators/OptionTabs/OptionTabs'; // Import OptionTabs
import MealCard from '../Cards/MealCards'; // Import MealCard
import CalendarComponent from '../../components/calendar/CalendarComponent'; // Import CalendarComponent
import Checkbox from '../../components/Selectors/Checkbox/Checkbox'; // Import Checkbox
import { useNavigation } from '@react-navigation/native';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_MEALS_BY_DATE, GET_USER_MEAL_DATES } from '../../graphql/mutations/mealMutations/mealQueries';
import { DELETE_MEAL } from '../../graphql/mutations/mealMutations/mealMutations';
import { ShoppingListContext  } from '../../components/contexts/ShoppingListContext';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const optionsFromDatabase = [
  { name: 'My Plan' },
  { name: 'Shopping List' },
];

const MealPlanner = ({ route,  userId }) => { // Accept userId as a prop
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = React.useState(route?.params?.selectedTab || 'Shopping List');
  const [selectedDate, setSelectedDate] = React.useState(new Date().toISOString().split('T')[0]);

  const [selectedFilter, setSelectedFilter] = React.useState('All'); // Initial filter is "All"
  const [isFilterOpen, setIsFilterOpen] = React.useState(false); // For opening/closing the filter dropdown
  
  
  const [meals, setMeals] = React.useState({
    Breakfast: null,
    Lunch: null,
    Dinner: null,
    Snacks: null,
  });

  const { shoppingListItems, setShoppingListItems } = useContext(ShoppingListContext);
  const [mealDates, setMealDates] = React.useState({});


  // GraphQL queries and mutations
  const { data: mealsData, refetch: refetchMeals } = useQuery(GET_USER_MEALS_BY_DATE, {
    variables: { userId, date: selectedDate },
  });
  const { data: mealDatesData } = useQuery(GET_USER_MEAL_DATES, { variables: { userId } });
  const [deleteMeal] = useMutation(DELETE_MEAL);

  React.useEffect(() => {
    if (mealsData) {
      const fetchedMeals = mealsData.getUserMealsByDate.reduce((acc, meal) => {
        acc[meal.mealType] = meal;
        return acc;
      }, { Breakfast: null, Lunch: null, Dinner: null, Snacks: null });
      setMeals(fetchedMeals);
    }
  }, [mealsData]);

  React.useEffect(() => {
    if (mealDatesData) {
      const datesWithMeals = mealDatesData.getUserMealDates.dates.reduce((acc, date) => {
        acc[date] = { marked: true, dotColor: 'blue' }; // Mark dates with meals
        return acc;
      }, {});
      setMealDates(datesWithMeals);
    }
  }, [mealDatesData]);

  React.useEffect(() => {
    console.log("Current selected date:", selectedDate); // Verifica la fecha seleccionada
    console.log("Current shopping list items:", shoppingListItems); // Verifica el estado de shoppingListItems

    const mealsForDate = shoppingListItems.filter(meal => meal.date === selectedDate);
    console.log("Meals for selected date:", mealsForDate); // Verifica que las comidas para la fecha seleccionada se están filtrando correctamente

    const mealsByType = mealsForDate.reduce((acc, meal) => {
        acc[meal.mealType] = meal; // Asegúrate de que meal.mealType esté asignando correctamente la comida al tipo
        return acc;
    }, { Breakfast: null, Lunch: null, Dinner: null, Snacks: null });

    console.log("Meals organized by type:", mealsByType); // Verifica que las comidas se están organizando por tipo
    setMeals(mealsByType);
}, [shoppingListItems, selectedDate]);


  

  const handleTabChange = (optionName) => {
    setSelectedTab(optionName);
  };

  const confirmAction = (action, message) => {
    Alert.alert('Confirm Action', message, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Yes', onPress: action, style: 'destructive' }
    ]);
  };

  const handleRemoveSelectedIngredients = () => {
    const updatedMeals = shoppingListItems.map(meal => ({
      ...meal,
      ingredients: meal.ingredients.filter(ingredient => !ingredient.checked),
    })).filter(meal => meal.ingredients.length > 0);
  
    setShoppingListItems(updatedMeals);
  };

  const handleClearList = () => {
    setShoppingListItems([]);
  };

  const handleAddMeal = (mealType) => {
    navigation.navigate('SearchMeal', {
      selectedMealType: mealType,
    selectedDate: selectedDate,
    });
    };

  const handleMealClick = (mealType) => {
    if (meals[mealType]) {
      navigation.navigate('MealAIResult', { meal: meals[mealType], selectedDate });
    } else {
      handleAddMeal(mealType);
    }
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };
  const filteredItems = selectedFilter === 'All'
  ? shoppingListItems.flatMap(meal => meal.ingredients) // Flatten all ingredients across meals
  : shoppingListItems; // Show by meal when filtered by "Recipe"

  const handleDeleteMeal = (mealId, mealType) => {
    Alert.alert('Delete Meal', 'Are you sure you want to delete this meal?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteMeal({ variables: { mealId } })
            .then(() => {
              setMeals((prevMeals) => ({
                ...prevMeals,
                [mealType]: null,
              }));
              refetchMeals(); // Refresh after deletion
            })
            .catch(error => console.error('Error deleting meal', error));
        },
      },
    ]);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen); // Toggle the dropdown visibility
  };

  const selectFilter = (filter) => {
    setSelectedFilter(filter); // Update the selected filter ("All" or "Recipe")
    setIsFilterOpen(false); // Close the dropdown after selection
  };

  const handleCheckboxToggle = (ingredientIndex, mealIndex = null) => {
    // For 'All' filter, toggle the flattened list
    if (selectedFilter === 'All') {
      const updatedIngredients = [...filteredItems]; // Get the flattened list
      updatedIngredients[ingredientIndex].checked = !updatedIngredients[ingredientIndex].checked; // Toggle the checked state
      
      // Update the original shoppingListItems state based on these changes
      const updatedShoppingList = shoppingListItems.map(meal => ({
        ...meal,
        ingredients: meal.ingredients.map(ingredient => 
          updatedIngredients.find(updatedIngredient => updatedIngredient.name === ingredient.name && updatedIngredient.checked === ingredient.checked) || ingredient
        ),
      }));
    
      setShoppingListItems(updatedShoppingList);
  
    } else {
      // For 'Recipe' filter, toggle the ingredients within each meal
      const updatedMeals = [...shoppingListItems]; // Copy shopping list
      updatedMeals[mealIndex].ingredients[ingredientIndex].checked = !updatedMeals[mealIndex].ingredients[ingredientIndex].checked; // Toggle checkbox
      setShoppingListItems(updatedMeals); // Update state
    }
  };
  
  
  

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Typography variant="H4" style={[styles.headerTitle]}>MealAI</Typography>
        <TouchableOpacity style={styles.addMealButton} onPress={() => handleAddMeal('General')}>
          <View style={styles.addMealContent}>
            <Typography variant="Body" style={[styles.headerTitle, styles.addMealText]}>Add Meal</Typography>
            <View style={{ width: 4 }} />
            <AddIcon style={styles.addIcon} />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Option Tabs Section */}
        <OptionTabs
          options={optionsFromDatabase}
          activeColor="#ccc" // Color for the selected option
          inactiveColor="#f9f9f9" // Color for inactive options
          textColor="#333" // Text color
          onTabChange={handleTabChange} // Handle tab change
        />

        {selectedTab === 'My Plan' && (
          <>
            {/* Calendar Section */}
            <View style={styles.calendarSection}>
            <CalendarComponent
                markedDates={mealDates}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            />

              
            </View>

            {/* Meal Cards Section */}
            {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map((mealType, index) => (
                <View key={index} style={styles.mealSection}>
                  <Typography variant="SH4" style={styles.mealTitle}>{mealType}</Typography>
                  <MealCard
                    mealName={meals[mealType]?.mealTitle || null}
                    portions={meals[mealType]?.servings || null}
                    onAddPress={() => handleMealClick(mealType)}
                    style={styles.mealCard}
                    onSwipeRight={() => meals[mealType] && handleDeleteMeal(meals[mealType].id, mealType)}
                    rightSwipeActions={() => (
                      <View style={styles.deleteAction}>
                        <DeleteIcon style={styles.deleteIcon} />
                      </View>
                    )}
                  />
                </View>
              ))}

          </>
        )}

        {selectedTab === 'Shopping List' && (
          <View style={styles.shoppingListSection}>
{/* Filter Section */}
<View style={styles.filterSection}>
  <Typography variant="SH3" style={styles.filterTitle}>Filter by</Typography>
  <TouchableOpacity onPress={toggleFilter} style={styles.filterButton}>
    <Typography variant="Body" style={styles.filterText}>{selectedFilter}</Typography>
    {isFilterOpen ? <CloseIcon /> : <OpenIcon />}
  </TouchableOpacity>

  {isFilterOpen && (
    <View style={styles.filterDropdown}>
      {/* "All" filter option */}
      <TouchableOpacity onPress={() => selectFilter('All')} style={styles.filterOption}>
        <Typography variant="Body" style={styles.filterText}>All</Typography>
      </TouchableOpacity>
      
      {/* "Recipe" filter option */}
      <TouchableOpacity onPress={() => selectFilter('Recipe')} style={styles.filterOption}>
        <Typography variant="Body" style={styles.filterText}>Recipe</Typography>
      </TouchableOpacity>
    </View>
  )}
</View>

            {/* Shopping List Items */}
            {selectedFilter === 'All' && filteredItems.map((ingredient, ingredientIndex) => (
  <TouchableOpacity
    key={ingredientIndex}
    style={styles.shoppingListItem}
    onPress={() => handleCheckboxToggle(ingredientIndex)} // No need for mealIndex here since it's a flat list
  >
    <Typography style={[styles.itemName, ingredient.checked && styles.checkedText]}>
      {ingredient.name}
    </Typography>
    <Typography style={[styles.itemQuantity, ingredient.checked && styles.checkedText]}>
      {ingredient.amount} {ingredient.unit}
    </Typography>
    <View style={styles.checkboxContainer}>
      <FontAwesome6
        name={ingredient.checked ? 'check-square' : 'square'}
        size={24}
        color={ingredient.checked ? '#2e86de' : '#ccc'}
      />
    </View>
  </TouchableOpacity>
))}


{selectedFilter === 'Recipe' && shoppingListItems.map((meal, mealIndex) => (
  <View key={meal.mealId} style={styles.mealSection}>
    <TouchableOpacity>
      <Typography variant="SH3" style={styles.mealTitle}>{meal.mealTitle}</Typography>
    </TouchableOpacity>
    
    {meal.ingredients.map((ingredient, ingredientIndex) => (
              <TouchableOpacity
                key={ingredientIndex}
                style={styles.shoppingListItem}
                onPress={() => handleCheckboxToggle(ingredientIndex, mealIndex)} // Toggle on press
              >
                <Typography style={[styles.itemName, ingredient.checked && styles.checkedText]}>
                  {ingredient.name}
                </Typography>
                <Typography style={[styles.itemQuantity, ingredient.checked && styles.checkedText]}>
                  {ingredient.amount} {ingredient.unit}
                </Typography>
                <View style={styles.checkboxContainer}>
                  <FontAwesome6
                    name={ingredient.checked ? 'check-square' : 'square'}
                    size={24}
                    color={ingredient.checked ? '#2e86de' : '#ccc'}
                  />
                </View>
              </TouchableOpacity>
            ))}
  </View>
))}

{/* Button to Clear the Shopping List */}
{shoppingListItems.length > 0 && (
          <View style={styles.buttonRow}>
            {/* Clear List Button */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => confirmAction(handleClearList, 'Are you sure you want to clear the entire list?')}
            >
              <FontAwesome6 name="trash" size={16} color="#fff" />
              <Text style={styles.buttonText}>Clear All</Text>
            </TouchableOpacity>

            {/* Remove Selected Ingredients Button */}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => confirmAction(handleRemoveSelectedIngredients, 'Are you sure you want to remove selected ingredients?')}
            >
              <FontAwesome6 name="circle-minus" size={16} color="#fff" />
              <Text style={styles.buttonText}>Delete Checked</Text>
            </TouchableOpacity>
          </View>
        )}

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
    paddingVertical: 24,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 60, // Add padding to avoid the notch or island
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 16,
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  addMealButton: {
    position: 'absolute',
    right: 0,
    padding: 8,
  },
  addMealContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -2, // Adjust alignment to match the text and icon height
  },
  addMealText: {
    lineHeight: 17, // Align the text vertically with the icon
  },
  addIcon: {
    marginBottom: -2, // Adjust icon alignment to match the text height
  },
  calendarSection: {
    marginBottom: 24,
    paddingHorizontal: 0,
  },
  mealSection: {
    marginBottom: 16,
  },
  mealTitle: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  mealCardsContainer: {
    flex: 1,
  },
  mealCard: {
    marginBottom: 16, // Space between cards
    backgroundColor: '#f9f9f9', // Set default background color for MealCard
    borderRadius: 12, // Add rounded corners
    padding: 0, // Add padding inside the card
  },
  deleteAction: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 12,
    width: 75,
    height: '100%',
  },
  deleteIcon: {
    color: '#fff',
  },
  addMealContentCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMealText: {
    textAlign: 'center',
    color: '#999',
  },
  shoppingListSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  filterSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  filterText: {
    fontSize: 16,
    color: '#333',
  },
  filterDropdown: {
    position: 'absolute',
    top: 40, // Adjust based on your layout
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1, // Ensures it appears above other elements
  },
  filterOption: {
    padding: 12,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  shoppingListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemName: {
    fontWeight: 'bold',
  },
  itemQuantity: {
    color: '#999',
  },
  checkedText: {
    textDecorationLine: 'line-through',
  },
  clearButton: {
    backgroundColor: '#e74c3c', // Red color
    paddingVertical: 12,        // Vertical padding
    paddingHorizontal: 24,      // Horizontal padding
    borderRadius: 10,           // Rounded corners
    alignItems: 'center',       // Center text
    marginVertical: 10,         // Space between buttons
  },
  
  clearButtonText: {
    color: '#fff',              // White text color
    fontWeight: 'bold',         // Bold text
    fontSize: 16,               // Text size
  },
  mealSection: {
    marginBottom: 16,
  },
  mealTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  shoppingListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemName: {
    fontSize: 16,
    flex: 1,
  },
  itemQuantity: {
    fontSize: 16,
    flex: 1,
    color: '#999',
  },
  checkedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  checkboxContainer: {
    marginLeft: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});

export default MealPlanner;
