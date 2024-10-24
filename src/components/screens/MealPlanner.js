import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Dimensions, Platform, StatusBar, ScrollView } from 'react-native';
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


const optionsFromDatabase = [
  { name: 'My Plan' },
  { name: 'Shopping List' },
];

const MealPlanner = ({ selectedDate, userId }) => { // Accept userId as a prop
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = React.useState('My Plan');
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [meals, setMeals] = React.useState({
    Breakfast: null,
    Lunch: null,
    Dinner: null,
    Snacks: null,
  });
  const [shoppingListItems, setShoppingListItems] = React.useState([]);
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

  const handleTabChange = (optionName) => {
    setSelectedTab(optionName);
  };

  const handleAddMeal = (mealType) => {
    navigation.navigate('SearchMeal', {
      selectedMealType: mealType,
      selectedDate,
    });
    };

  const handleMealClick = (mealType) => {
    if (meals[mealType]) {
      navigation.navigate('MealAIResult', { meal: meals[mealType], selectedDate });
    } else {
      handleAddMeal(mealType);
    }
  };

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
    setIsFilterOpen(!isFilterOpen);
  };

  const handleCheckboxToggle = (index) => {
    const updatedItems = [...shoppingListItems];
    updatedItems[index].checked = !updatedItems[index].checked;
    setShoppingListItems(updatedItems);

    // Placeholder for API call
    const updatedItem = updatedItems[index];
    fetch('https://api.example.com/update-shopping-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: updatedItem.name,
        quantity: updatedItem.quantity,
        checked: updatedItem.checked,
      }),
    })
      .then(response => response.json())
      .then(data => console.log('Shopping list updated', data))
      .catch(error => console.error('Error updating shopping list', error));
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
                markedDates={mealDates} // Show dates with meals
                activities={[]} // Placeholder for activities
                themeColors={{ primary: '#000', arrowColor: '#000', monthTextColor: '#000' }} // Example theme colors
                selectedDate={selectedDate} // Pass selectedDate to CalendarComponent
              />
            </View>

            {/* Meal Cards Section */}
            {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map((meal, index) => (
              <View key={index} style={styles.mealSection}>
                <Typography variant="SH4" style={styles.mealTitle}>{meal}</Typography>
                <MealCard
                  mealName={meals[meal]?.mealName || null}
                  portions={meals[meal]?.portions || null}
                  onAddPress={() => handleMealClick(meal)}
                  style={styles.mealCard}
                  onSwipeRight={() => meals[meal] && handleDeleteMeal(meals[meal].id, meal)}
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
                <Typography variant="Body" style={styles.filterText}>All</Typography>
                {isFilterOpen ? <CloseIcon /> : <OpenIcon />}
              </TouchableOpacity>
            </View>
            {/* Shopping List Items */}
            {shoppingListItems.map((item, index) => (
              <View key={index} style={styles.shoppingListItem}>
                <View>
                  <Typography variant="SH4" style={[styles.itemName, item.checked && styles.checkedText]}>{item.name}</Typography>
                  <Typography variant="Body" style={[styles.itemQuantity, item.checked && styles.checkedText]}>{item.quantity}</Typography>
                </View>
                <Checkbox checked={item.checked} onPress={() => handleCheckboxToggle(index)} />
              </View>
            ))}
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
    marginBottom: 16,
  },
  filterTitle: {
    fontWeight: 'bold',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    marginRight: 4,
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

});

export default MealPlanner;
