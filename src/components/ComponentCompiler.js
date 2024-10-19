
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import ParentComponent from './calendar/ParentComponent';
import PrimaryButton from './buttons/PrimaryButton'; // Import the PrimaryButton component
import RewardList from './Tables/RewardList';
import ToggleExample from './TabsNavigators/Toggles/TogglesExample'; // Import the CustomToggle component
import TabsNavigationTest from './TabsNavigators/TabsNavigationTest';
import OptionTabs from './TabsNavigators/OptionTabs/OptionTabsTest';
import InputForm from './Inputs/InputFieldExample';
import DropdownExample from './Dropdown/DropdownExample';
import RadioButtonExample from './Selectors/RadioButtons/RadioButtonExample';
import Checkbox from './Selectors/Checkbox/Checkbox';
import SliderExample from './sliders/SliderExample';
import CreateTask from './TaskComponent/CreateTask';
import EditTask from './TaskComponent/EditTask';
import CreateEvent from './EventComponent/CreateEvent';
import EditEvent from './EventComponent/EditEvent';
// import CalendarPage from './pages/CalenderPage';
import CalendarGraph from './calendar/calendarGraph';

const taskData = [
  { day: 'Sun', tasksAssigned: 10, tasksCompleted: 7 },
  { day: 'Mon', tasksAssigned: 5, tasksCompleted: 2 },
  { day: 'Tue', tasksAssigned: 8, tasksCompleted: 8 },
  { day: 'Wed', tasksAssigned: 6, tasksCompleted: 4 },
  { day: 'Thu', tasksAssigned: 9, tasksCompleted: 9 },
  { day: 'Fri', tasksAssigned: 7, tasksCompleted: 7 },
  { day: 'Sat', tasksAssigned: 4, tasksCompleted: 3 },
];

const ComponentCompiler = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Adding the ParentComponent for visualization */}
        <ParentComponent />
        {/* Adding the CalendarGraph component for visualization */}
        <CalendarGraph data={taskData} />
        
        {/* Adding the PrimaryButton component with various configurations */}
        
        {/* Button with an icon and text aligned center */}
        <PrimaryButton
          hasIcon={true}
          iconColor="white"
          color="white"
          backgroundColor="black"
          size="large"
          buttonText="Submit"
          textAlignment="center"
        />

        {/* Button without an icon, only text, and medium size */}
        <PrimaryButton
          hasIcon={false}
          color="black"
          backgroundColor="#4F4F4F"
          size="medium"
          buttonText="Confirm"
          textAlignment="center"
        />

        {/* Small button with icon and no text */}
        <PrimaryButton
          hasIcon={true}
          iconColor="gray"
          backgroundColor="#EDEDED"
          size="small"
          hasText={false} // No text
          disabled={true}
        />

        {/* Adding the Rewards component for visualization */}
        <RewardList />

        {/* Adding the TabsNavigation component for visualization */}
        <TabsNavigationTest />

        {/* Adding the CustomToggle component for visualization */}
        <ToggleExample />

        {/* Adding the OptionTabs component for visualization */}
        <OptionTabs />

        {/* Adding the InputForm component for visualization */}
        <InputForm />

        {/* Adding the DropdownExample component for visualization */}
        <DropdownExample />

        {/* Adding the RadioButtonExample component for visualization */}
        <RadioButtonExample />

        {/* Adding the Checkbox component for visualization */}
        <Checkbox label="Label 1" />

        {/* Adding the SliderExample component for visualization */}
        <SliderExample />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
});


export default ComponentCompiler;
