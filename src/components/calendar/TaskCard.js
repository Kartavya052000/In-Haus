import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Typography from '../typography/Typography'; // Importing Typography component for text styling

// TaskCard component: Displays a card with task information
const TaskCard = ({
  taskName = 'Task Assigned', // Default task name if none is provided
  timeRange = '7:00 - 9:00', // Default time range if none is provided
  cardColor = '#f2f2f2', // Background color of the card, passed as a prop
  textColor = '#333', // Text color for the task name and time range, passed as a prop
  onPress, // Optional callback function when the card is pressed
}) => {
  const [isSelected, setIsSelected] = useState(false); // State to track if the card is selected

  // Function to handle card press
  const handlePress = () => {
    setIsSelected(!isSelected); // Toggle the selected state
    if (onPress) {
      onPress(); // Call the onPress callback if provided
    }
  };

  return (
    <TouchableOpacity
      // Apply styles to the card, changing the background color if selected
      style={[styles.card, { backgroundColor: isSelected ? '#e0e0e0' : cardColor }]}
      onPress={handlePress} // Handle press events
    >
      <View style={styles.headerContainer}>
        {/* Placeholder icon at the top left of the card */}
        {/* <Image source={require('../../assets/icon-placeholder.png')} style={styles.icon} /> */}
        {/* Task name text styled using Typography component */}
        <Typography variant="SH4" color={textColor}>
          {taskName}
        </Typography>
      </View>
      {/* Time range text styled using Typography component */}
      <Typography variant="Caption" color={textColor}>
        {timeRange}
      </Typography>
      {/* Placeholder icon at the bottom of the card */}
      {/* <Image source={require('../../assets/icon-placeholder.png')} style={styles.smallIcon} /> */}
    </TouchableOpacity>
  );
};

// Styles for the TaskCard component
const styles = StyleSheet.create({
  card: {
    padding: 10, // Padding inside the card
    borderRadius: 10, // Rounded corners for the card
    marginVertical: 10, // Vertical margin between cards
    width: 150, // Fixed width of the card
  },
  headerContainer: {
    flexDirection: 'row', // Arrange elements in a row
    alignItems: 'center', // Align items vertically centered
    marginBottom: 5, // Space below the header
  },
  icon: {
    width: 20, // Width of the icon
    height: 20, // Height of the icon
    marginRight: 10, // Space between the icon and the task name
  },
  smallIcon: {
    width: 16, // Width of the smaller icon
    height: 16, // Height of the smaller icon
    marginTop: 10, // Space above the smaller icon
  },
});

export default TaskCard; // Export the TaskCard component