import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Dropdown from "../Dropdown/Dropdown";
import { OpenIcon, CloseIcon } from "../icons/icons"; 
import Typography from '../typography/Typography'; 

const DateTimeComponent = ({ onDateTimeChange, repeat2,startDateTime,endDateTime }) => {
  const [startDate, setStartDate] = useState(startDateTime);
  const [startTime, setStartTime] = useState(startDateTime);
  const [endDate, setEndDate] = useState(endDateTime);
  const [endTime, setEndTime] = useState(endDateTime);
  const [isAllDay, setIsAllDay] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [repeat, setRepeat] = useState("Never");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (repeat2) {
      setRepeat(repeat2);
    }
  }, [repeat2]);
useEffect(() => {
console.log(startDateTime,"=====---",endDateTime);

},[startDateTime,endDateTime])
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
    onDateTimeChange(startDateTime, endDateTime, repeat);
  }, [repeat]);

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
      setEndDate(selectedDate);
    }
  };

  const handleStartTimeChange = (event, selectedTime) => {
    setShowStartTimePicker(false);
    if (selectedTime) {
      setStartTime(selectedTime);
    }
  };

  const handleEndTimeChange = (event, selectedTime) => {
    setShowEndTimePicker(false);
    if (selectedTime) {
      setEndTime(selectedTime);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Summary */}
      <TouchableOpacity onPress={toggleExpanded} style={styles.headerContainer}>
        <View style={styles.summaryTextContainer}>
          <Typography variant="SH4" style={styles.label}>
            Date & Time
          </Typography>
          <Typography variant="BodyS" style={styles.summaryText}>
            {`Starts on ${startDate.toDateString()} at ${startTime.toLocaleTimeString()} until ${endTime.toLocaleTimeString()}`}
          </Typography>
        </View>
        <View style={styles.icon}>
          {isExpanded ? <CloseIcon /> : <OpenIcon />}
        </View>
      </TouchableOpacity>

      {/* Collapsible Content */}
      {isExpanded && (
        <View>
          {/* All Day Switch */}
          <View style={styles.allDayContainer}>
            <Typography variant="SH4" style={styles.label}>
              All Day
            </Typography>
            <Switch
              value={isAllDay}
              onValueChange={(value) => {
                setIsAllDay(value);
              }}
            />
          </View>

          {/* Start Date & Time */}
          <Typography variant="SH4" style={styles.label}>
            Starts
          </Typography>
          <TouchableOpacity
            onPress={() => setShowStartDatePicker(true)}
            style={styles.dropdownContainer}
          >
            <Typography variant="BodyS" style={styles.dropdownText}>
              {startDate.toDateString()}
            </Typography>
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
              <Typography variant="BodyS" style={styles.dropdownText}>
                {startTime.toLocaleTimeString()}
              </Typography>
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
          <Typography variant="SH4" style={styles.label}>
            Ends
          </Typography>
          <View style={styles.dropdownContainer}>
            {/* Display endDate as non-editable */}
            <Typography variant="BodyS" style={styles.dropdownText}>
              {endDate.toDateString()}
            </Typography>
          </View>

          {/* End Time */}
          {!isAllDay && (
            <TouchableOpacity
              onPress={() => setShowEndTimePicker(true)}
              style={styles.dropdownContainer}
            >
              <Typography variant="BodyS" style={styles.dropdownText}>
                {endTime.toLocaleTimeString()}
              </Typography>
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
          <Typography variant="SH4" style={styles.label}>
            Repeat
          </Typography>
          <Dropdown
            options={[
              "Never",
              "Everyday",
              "Every Week",
              "Every 2 Weeks",
              "Every Month",
              "Every Year",
            ]}
            selectedValue={repeat} 
            onValueChange={(value) => {
              setRepeat(value);
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
    fontSize: 15,
    color: "#666",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  dropdownContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#000", 
    borderRadius: 24, 
    marginBottom: 15,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 14,
    color: "#504F4F",
  },
  allDayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  icon: {
    marginLeft: 10,
  },
});

export default DateTimeComponent;
