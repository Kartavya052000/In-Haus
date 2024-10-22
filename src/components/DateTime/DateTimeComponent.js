import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Dropdown from "../Dropdown/Dropdown";
import { AntDesign } from "@expo/vector-icons";

const DateTimeComponent = ({ onDateTimeChange,repeat2}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isAllDay, setIsAllDay] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [repeat, setRepeat] = useState("Never");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    console.log(repeat2,"repeat2")
    if (repeat2) {
        setRepeat(repeat2);
    }
}, [repeat2])
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Function to combine date and time
  const combineDateAndTime = (date, time) => {
    const combined = new Date(date);
    combined.setHours(time.getHours());
    combined.setMinutes(time.getMinutes());
    combined.setSeconds(0);
    return combined;
  };

  // useEffect for date and time changes
  useEffect(() => {
    const startDateTime = combineDateAndTime(startDate, startTime);
    const endDateTime = combineDateAndTime(endDate, endTime);
    onDateTimeChange(startDateTime, endDateTime, repeat);
  }, [startDate, startTime, endDate, endTime]);

  // useEffect for repeat changes
  useEffect(() => {
    const startDateTime = combineDateAndTime(startDate, startTime);
    const endDateTime = combineDateAndTime(endDate, endTime);
    onDateTimeChange(startDateTime, endDateTime, repeat);;
  }, [repeat]);

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
      setEndDate(selectedDate); 
      console.log("Start Date selected:", selectedDate);
    }
  };

  const handleStartTimeChange = (event, selectedTime) => {
    setShowStartTimePicker(false);
    if (selectedTime) {
      setStartTime(selectedTime);
      console.log("Start Time selected:", selectedTime);
    }
  };

  const handleEndTimeChange = (event, selectedTime) => {
    setShowEndTimePicker(false);
    if (selectedTime) {
      setEndTime(selectedTime);
      console.log("End Time selected:", selectedTime);
    }
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
        <AntDesign name={isExpanded ? "up" : "down"} size={24} color="black" />
      </TouchableOpacity>

      {/* Collapsible Content */}
      {isExpanded && (
        <View>
          {/* All Day Switch */}
          <View style={styles.allDayContainer}>
            <Text style={styles.label}>All Day</Text>
            <Switch
              value={isAllDay}
              onValueChange={(value) => {
                setIsAllDay(value);
                console.log("All Day switch toggled:", value);
              }}
            />
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
              <Text style={styles.dropdownText}>
                {startTime.toLocaleTimeString()}
              </Text>
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

          {/* End Date */}
          <Text style={styles.label}>Ends</Text>
          <View style={styles.dropdownContainer}>
            {/* Display endDate as non-editable */}
            <Text style={styles.dropdownText}>{endDate.toDateString()}</Text>
          </View>

          {/* End Time */}
          {!isAllDay && (
            <TouchableOpacity
              onPress={() => setShowEndTimePicker(true)}
              style={styles.dropdownContainer}
            >
              <Text style={styles.dropdownText}>
                {endTime.toLocaleTimeString()}
              </Text>
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
              "Never",
              "Everyday",
              "Every Week",
              "Every 2 Weeks",
              "Every Month",
              "Every Year",
            ]}
            value={repeat} 
            onValueChange={(value) => {
              setRepeat(value);
              console.log("Repeat option selected:", value);
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  summaryTextContainer: {
    flex: 1,
  },
  summaryText: {
    fontSize: 14,
    color: "#666",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  dropdownContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  dropdownText: {
    color: "#333",
  },
  allDayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
});

export default DateTimeComponent;
