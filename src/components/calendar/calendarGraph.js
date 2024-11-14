import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { smileIcon, mehIcon, frownIcon } from '../icons/icons';
import Typography from '../typography/Typography';
const { height } = Dimensions.get('window');
// Component for individual day
const DayColumn = ({ day, tasksAssigned, tasksCompleted, iconColor, isToday, isEmptyState }) => {
  let IconComponent;
  let barColors;
  let completionRatio;

  if (isEmptyState || tasksAssigned === 0) {
    // Empty state case
    IconComponent = mehIcon;
    barColors = ['#F8BBD0', '#FCE4EC']; // primary/pink gradient colors for empty state
    completionRatio = 0.13; // Full bar for neutral icon
    iconColor = '#AD1457'; // primary/pink color for icon
  } else if (tasksAssigned === undefined || tasksCompleted === undefined) {
    // No data case
    IconComponent = mehIcon;
    barColors = ['#D1C4E9', '#EDE7F6'];
    completionRatio = 1; // Full bar for neutral icon
    iconColor = '#6A1B9A';
  } else {
    // Calculate the completion ratio
    completionRatio = tasksAssigned > 0 ? tasksCompleted / tasksAssigned : 0;

    // Adjusted logic for icon and color selection
    if (completionRatio <= 0.25) {
      IconComponent = frownIcon;
      barColors = ['#EAA4A6', '#F3C8CA'];
      iconColor = '#FF5252';
    } else if (completionRatio > 0.25 && completionRatio < 0.70) {
      IconComponent = mehIcon;
      barColors = ['#C7D2FF', '#F3F5FF'];
      iconColor = '#3F51B5';
    } else {
      IconComponent = smileIcon;
      barColors = ['#9ED69A', '#CFEACC'];
      iconColor = '#4CAF50';
    }
  }

  return (
    <View style={styles.column}>
      <LinearGradient
        colors={barColors}
        style={[styles.bar, { height: `${completionRatio * 100}%` }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <IconComponent width={20} height={20} color={iconColor} />
      </LinearGradient>
      <Typography
        variant="Caption"
        style={[styles.dayText, isToday && styles.todayText]}
      >
        {day}
      </Typography>
    </View>
  );
};

// Main component for the graph
const CalendarGraph = ({ data = [], textColor, iconColor }) => {
  const [currentDate, setCurrentDate] = useState('');
  const [todayShort, setTodayShort] = useState('');

  useEffect(() => {
    const today = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    setCurrentDate(`Today is ${today.toLocaleDateString('en-US', options)}`);
    setTodayShort(today.toLocaleDateString('en-US', { weekday: 'short' }));
  }, []);

  // If no data is provided or all tasksAssigned are zero, create a default week with empty state
  const isEmptyState = data.length === 0 || data.every(dayData => dayData.tasksAssigned === 0);
  const displayData = isEmptyState ? [
    { day: 'Sun' },
    { day: 'Mon' },
    { day: 'Tue' },
    { day: 'Wed' },
    { day: 'Thu' },
    { day: 'Fri' },
    { day: 'Sat' },
  ] : data;

  return (
    <View style={styles.graphContainer}>
      <Typography
        variant="SH4"
        color="#333232"
        align="center"
        style={styles.dateText}
      >
        {currentDate}
      </Typography>

      <View style={styles.container}>
        {displayData.map((dayData) => (
          <DayColumn
            key={dayData.day}
            day={dayData.day}
            tasksAssigned={dayData.tasksAssigned}
            tasksCompleted={dayData.tasksCompleted}
            iconColor={iconColor}
            isToday={dayData.day === todayShort} // Highlight if today
            isEmptyState={isEmptyState}
          />
        ))}
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  graphContainer: {
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: height * 0.23,
  },
  column: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 5,
  },
  bar: {
    width: 24,
    borderRadius: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
    padding: 2,
  },
  dayText: {
    marginTop: 10,
    fontSize: 12,
    color: '#777',
  },
  todayText: {
    color: '#476BFB', // Blue color to highlight today's day
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 30,
  },
});

export default CalendarGraph;
