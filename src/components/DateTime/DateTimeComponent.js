import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Dropdown from '../Dropdown/Dropdown'; 
import { AntDesign } from '@expo/vector-icons'; 

const DateTimeComponent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isAllDay, setIsAllDay] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [repeat, setRepeat] = useState('Never'); 
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) setStartDate(selectedDate);
  };

  const handleStartTimeChange = (event, selectedTime) => {
    setShowStartTimePicker(false);
    if (selectedTime) setStartTime(selectedTime);
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) setEndDate(selectedDate);
  };

  const handleEndTimeChange = (event, selectedTime) => {
    setShowEndTimePicker(false);
    if (selectedTime) setEndTime(selectedTime);
  };

  return (
    <View style={styles.container}>
      {/* Header Summary */}
      <TouchableOpacity onPress={toggleExpanded} style={styles.headerContainer}>
        <View style={styles.summaryTextContainer}>
          <Text style={styles.label}>Date & Time</Text>
          <Text style={styles.summaryText}>
            {`Starts on ${startDate.toDateString()} at ${startTime.toLocaleTimeString()} until ${endTime.toLocaleTimeString()}`}
          </Text>
        </View>
        <AntDesign name={isExpanded ? 'up' : 'down'} size={24} color="black" />
      </TouchableOpacity>

      {/* Collapsible Content */}
      {isExpanded && (
        <View>
          {/* All Day Switch */}
          <View style={styles.allDayContainer}>
            <Text style={styles.label}>All Day</Text>
            <Switch value={isAllDay} onValueChange={setIsAllDay} />
          </View>

          {/* Start Date & Time */}
          <Text style={styles.label}>Starts</Text>
          <TouchableOpacity
            onPress={() => setShowStartDatePicker(true)}
            style={styles.dropdownContainer}
          >
            <Text style={styles.dropdownText}>{startDate.toDateString()}</Text>
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={handleStartDateChange}
            />
          )}

          {!isAllDay && (
            <TouchableOpacity
              onPress={() => setShowStartTimePicker(true)}
              style={styles.dropdownContainer}
            >
              <Text style={styles.dropdownText}>{startTime.toLocaleTimeString()}</Text>
            </TouchableOpacity>
          )}
          {showStartTimePicker && (
            <DateTimePicker
              value={startTime}
              mode="time"
              display="default"
              onChange={handleStartTimeChange}
            />
          )}

          {/* End Date & Time */}
          <Text style={styles.label}>Ends</Text>
          <TouchableOpacity
            onPress={() => setShowEndDatePicker(true)}
            style={styles.dropdownContainer}
          >
            <Text style={styles.dropdownText}>{endDate.toDateString()}</Text>
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={handleEndDateChange}
            />
          )}

          {!isAllDay && (
            <TouchableOpacity
              onPress={() => setShowEndTimePicker(true)}
              style={styles.dropdownContainer}
            >
              <Text style={styles.dropdownText}>{endTime.toLocaleTimeString()}</Text>
            </TouchableOpacity>
          )}
          {showEndTimePicker && (
            <DateTimePicker
              value={endTime}
              mode="time"
              display="default"
              onChange={handleEndTimeChange}
            />
          )}

          {/* Repeat Dropdown */}
          <Text style={styles.label}>Repeat</Text>
          <Dropdown
            options={[
              'Never',
              'Everyday',
              'Every Week',
              'Every 2 Weeks',
              'Every Month',
              'Every Year',
            ]}
            selectedValue={repeat}
            onValueChange={setRepeat}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  summaryTextContainer: {
    flex: 1,
  },
  summaryText: {
    fontSize: 14,
    color: '#666',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  dropdownContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  dropdownText: {
    color: '#333',
  },
  allDayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
});

export default DateTimeComponent;
