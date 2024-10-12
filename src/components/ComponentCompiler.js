//ComponentCompiler.js

import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import ParentComponent from './calendar/ParentComponent';
import PrimaryButton from './buttons/PrimaryButton'; // Import the PrimaryButton component
import RewardList from './Tables/RewardList';
import ToggleExample from './Toggles/TogglesExample'; // Import the CustomToggle component
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

const ComponentCompiler = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Adding the ParentComponent for visualization */}
        <ParentComponent />
        {/* Adding the PrimaryButton component for visualization */}
        <PrimaryButton color="white" backgroundColor="black" size="large" />
        <PrimaryButton color="black" backgroundColor="#4F4F4F" size="medium" />
        <PrimaryButton color="#A9A9A9" backgroundColor="#EDEDED" size="small" disabled />
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

        <CreateTask />

        <EditTask />

        <CreateEvent />

        <EditEvent />

       
        {/* <CalendarPage /> */}

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