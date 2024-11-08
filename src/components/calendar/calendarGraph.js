import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { smileIcon, mehIcon, frownIcon } from '../icons/icons';
import Typography from '../typography/Typography';

// Component for individual day
const DayColumn = ({ day, tasksAssigned, tasksCompleted, iconColor }) => {
  const completionRatio = tasksAssigned > 0 ? tasksCompleted / tasksAssigned : 0;
  let IconComponent;
  let barColors;


  if (completionRatio <= 0.10) {
    IconComponent = frownIcon;
    barColors = ['#EAA4A6', '#F3C8CA'];
    iconColor = '#FF5252';
} else if (completionRatio > 0.10 && completionRatio < 0.50) {
    IconComponent = mehIcon;
    barColors = ['#C7D2FF', '#F3F5FF'];
    iconColor = '#3F51B5';
} else { // This covers completionRatio >= 0.50
    IconComponent = smileIcon;
    barColors = ['#9ED69A', '#CFEACC'];
    iconColor = '#4CAF50';
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
      <Typography variant="Caption" style={styles.dayText}>
        {day}
      </Typography>
    </View>
  );
};

// Main component for the graph
const CalendarGraph = ({ data, textColor, iconColor }) => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    setCurrentDate(`Today is ${today.toLocaleDateString('en-US', options)}`);
  }, []);

  return (
    <View style={styles.graphContainer}>
      <Typography
        variant="SH4"
        color="#333232" // Primary/Navy color as per your specification
        align="center"
        style={styles.dateText}
      >
        {currentDate}
      </Typography>

      <View style={styles.container}>
        {data.map((dayData) => (
          <DayColumn
            key={dayData.day}
            day={dayData.day}
            tasksAssigned={dayData.tasksAssigned}
            tasksCompleted={dayData.tasksCompleted}
            iconColor={iconColor}
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
    height: 200,
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
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 30,
  },
});

export default CalendarGraph;
