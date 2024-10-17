import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import Typography from '../../components/typography/Typography'; // Import Typography
import { AddIcon } from '../../components/icons/icons'; // Import AddIcon
import OptionTabs from '../../components/TabsNavigators/OptionTabs/OptionTabs'; // Import OptionTabs
import TaskCard from '../../components/calendar/TaskCard'; // Import TaskCard
import CalendarComponent from '../../components/calendar/CalendarComponent'; // Import CalendarComponent

const optionsFromDatabase = [
    { name: 'My Plan' },
    { name: 'Shopping List' },
  ];

const MealPlannerDashboard = () => {
  const handleTabChange = (optionName) => {
    Alert.alert(`Option changed to: ${optionName}`);
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Typography variant="H4" style={[styles.headerTitle]}>MealAI</Typography>
        <TouchableOpacity style={styles.addMealButton}>
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
          <TaskCard
            cardColor="#f9f9f9"
            textColor="#333"
            style={styles.mealCard}
          >
            <View style={styles.addMealContentCenter}>
              <Typography variant="SH4" style={styles.noMealText}>Add +</Typography>
            </View>
          </TaskCard>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#fff',
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
    backgroundColor: '#f9f9f9', // Set default background color for TaskCard
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
});

export default MealPlannerDashboard;
