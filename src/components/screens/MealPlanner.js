import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Dimensions, Platform, StatusBar, ScrollView } from 'react-native';
import Typography from '../../components/typography/Typography'; // Import Typography
import { AddIcon, OpenIcon, CloseIcon } from '../../components/icons/icons'; // Import AddIcon and dropdown icons
import OptionTabs from '../../components/TabsNavigators/OptionTabs/OptionTabs'; // Import OptionTabs
import MealCard from '../Cards/MealCards'; // Import MealCard
import CalendarComponent from '../../components/calendar/CalendarComponent'; // Import CalendarComponent
import Checkbox from '../../components/Selectors/Checkbox/Checkbox'; // Import Checkbox

const optionsFromDatabase = [
    { name: 'My Plan' },
    { name: 'Shopping List' },
  ];

const MealPlanner = () => {
  const [selectedTab, setSelectedTab] = React.useState('My Plan');
  
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [meals, setMeals] = React.useState({
    Breakfast: null,
    Lunch: { mealName: 'Chicken Pesto', portions: 3 },
    Dinner: null,
    Snacks: null,
  });

  const handleTabChange = (optionName) => {
    setSelectedTab(optionName);
  };

  const handleAddMeal = (mealType) => {
    Alert.alert(`Add meal button pressed for ${mealType}`);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      {/* Header Section */}
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

      {/* Option Tabs Section */}
      <OptionTabs
        options={optionsFromDatabase}
        activeColor="#ccc" // Color para la opción seleccionada
        inactiveColor="#f9f9f9" // Color para las opciones inactivas
        textColor="#333" // Color del texto
        onTabChange={handleTabChange} // Maneja el cambio de pestaña
      />

      {selectedTab === 'My Plan' && (
        <>
          {/* Calendar Section */}
          <View style={styles.calendarSection}>
            <CalendarComponent
              markedDates={{}} // Placeholder for marked dates
              activities={[]} // Placeholder for activities
              themeColors={{ primary: '#000', arrowColor: '#000', monthTextColor: '#000' }} // Example theme colors
            />
          </View>

          {/* Meal Cards Section */}
          {['Breakfast', 'Lunch', 'Dinner', 'Snacks'].map((meal, index) => (
            <View key={index} style={styles.mealSection}>
              <Typography variant="SH4" style={styles.mealTitle}>{meal}</Typography>
              {meals[meal] ? (
                <MealCard
                  mealName={meals[meal].mealName}
                  portions={meals[meal].portions}
                  onAddPress={() => handleAddMeal(meal)}
                  style={styles.mealCard}
                />
              ) : (
                <MealCard
                  mealName={null}
                  portions={null}
                  onAddPress={() => handleAddMeal(meal)}
                  style={styles.mealCard}
                />
              )}
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
          {[
            // Placeholder for items coming from API, replace with actual API data
            // const apiData = responseFromAPI;
            // apiData.map(item => (
            //   { name: item.name, quantity: item.quantity }
            // ))
            { name: 'Chicken breasts', quantity: '500g' }
          ].map((item, index) => (
            <View key={index} style={styles.shoppingListItem}>
              <View>
                <Typography variant="SH4" style={styles.itemName}>{item.name}</Typography>
                <Typography variant="Body" style={styles.itemQuantity}>{item.quantity}</Typography>
              </View>
              <Checkbox />
            </View>
          ))}
        </View>
      )}
    </ScrollView>
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
    marginBottom: 16,
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
});

export default MealPlanner;
