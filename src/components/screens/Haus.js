  // Haus.js
  import React, { useState } from 'react';
  import { View, StyleSheet, Dimensions } from 'react-native';
  import { LinearGradient } from 'expo-linear-gradient';
  import OptionTabs from '../../components/TabsNavigators/OptionTabs/OptionTabs';
  import CalendarGraph from '../calendar/calendarGraph';
  import Colors from '../Colors/Colors';
  import Typography from '../typography/Typography';
  import RewardsCards1 from '../Cards/RewardsCards1';
  const { height } = Dimensions.get('window');

  // Example data for each tab
  const taskDataDashboard = [
    { day: 'Sun', tasksAssigned: 10, tasksCompleted: 7 },
    { day: 'Mon', tasksAssigned: 5, tasksCompleted: 2 },
    { day: 'Tue', tasksAssigned: 8, tasksCompleted: 8 },
    { day: 'Wed', tasksAssigned: 6, tasksCompleted: 4 },
    { day: 'Thu', tasksAssigned: 9, tasksCompleted: 9 },
    { day: 'Fri', tasksAssigned: 7, tasksCompleted: 7 },
    { day: 'Sat', tasksAssigned: 4, tasksCompleted: 3 },
  ];

  const taskDataFamily = [
    { day: 'Sun', tasksAssigned: 6, tasksCompleted: 3 },
    { day: 'Mon', tasksAssigned: 4, tasksCompleted: 1 },
    { day: 'Tue', tasksAssigned: 7, tasksCompleted: 5 },
    { day: 'Wed', tasksAssigned: 6, tasksCompleted: 3 },
    { day: 'Thu', tasksAssigned: 8, tasksCompleted: 6 },
    { day: 'Fri', tasksAssigned: 5, tasksCompleted: 4 },
    { day: 'Sat', tasksAssigned: 3, tasksCompleted: 2 },
  ];

  // Placeholder options until the database is connected
  const optionsFromDatabase = [
    { name: 'My dashboard' },
    { name: 'Family' }
  ];

  export default function Haus() {
    const [selectedTab, setSelectedTab] = useState(optionsFromDatabase[0].name);

    const handleTabChange = (optionName) => {
      setSelectedTab(optionName);
    };

    // Determine the data to display based on the selected tab
    const taskData = selectedTab === 'My dashboard' ? taskDataDashboard : taskDataFamily;

    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['rgba(135, 99, 233, 0.0)', 'rgba(154, 133, 233, 0.8)']}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.headerBackground}
        />
        <View style={styles.contentContainer}>
          <Typography 
            variant="H5" 
            color={Colors.Secondary.Purple[500]}
            align="center"
            style={styles.headerText}
          >
            Dashboard
          </Typography>
          
          <OptionTabs
            options={optionsFromDatabase}
            containerColor={Colors.Secondary.Purple[100]}
            activeColor={'#F4EFFA'}
            textColor={Colors.Primary.Purple}
            onTabChange={handleTabChange}
          />
        {/* Pass taskData to CalendarGraph */}
        <View style={styles.graphContainer}>
          <CalendarGraph data={taskData} iconColor={Colors.Primary.Success[300]} />
          <RewardsCards1 />
        </View>
        </View>

      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F2F2F2',
    },
    headerBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: height * 0.19,
    },
    contentContainer: {
      marginTop: height * 0.12,
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    headerText: {
      marginBottom: 20,
      fontWeight: '700',
      fontSize: 24,
      lineHeight: 28,
    },
    graphContainer: {
      paddingTop: 20,
    },
  });
