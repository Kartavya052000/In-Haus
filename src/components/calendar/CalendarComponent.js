import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Button, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { OpenIcon, CloseIcon } from '../icons/icons';

const CalendarComponent = ({
  markedDates = {},
  activities = [],
  themeColors = {},
  selectedDate,
  setSelectedDate,
  selectedDayColor = '#00adf5', // Color del día seleccionado
  eventDotColor = '#00adf5', // Color del punto para eventos
  iconColor = '#000', // Color de los iconos
}) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const today = moment().format('YYYY-MM-DD');
  if (selectedDate === '') {
    setSelectedDate(today);
  }

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    const selectedActivity = activities.find(activity => activity.date === day.dateString);
    if (selectedActivity) {
      setSelectedTask(selectedActivity);
      setModalVisible(true);
    }
  };

  const generateMarkedDates = () => {
    const marked = { ...markedDates };
    activities.forEach(activity => {
      if (activity && activity.date) {
        marked[activity.date] = {
          marked: true,
          dotColor: eventDotColor, // Usa el color del punto para eventos
        };
      }
    });

    marked[selectedDate] = {
      selected: true,
      selectedColor: selectedDayColor, // Color del día seleccionado
      dotColor: marked[selectedDate]?.marked ? eventDotColor : undefined, // Muestra el punto solo si hay un evento
      marked: !!marked[selectedDate]?.marked, // Marca el día si tiene un evento
    };

    if (!marked[today]) {
      marked[today] = { selected: true, selectedColor: '#D3D3D3' };
    }

    return marked;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.title}>
            {selectedDate === today ? 'Today' : 'Day'}
          </Text>
          <Text style={styles.subtitle}>{moment(selectedDate).format('dddd, DD MMM')}</Text>
        </View>
        <TouchableOpacity onPress={() => setIsCalendarOpen(!isCalendarOpen)} style={styles.filterButton}>
          <Text style={styles.filterText}>Calendar</Text>
          {isCalendarOpen ? <CloseIcon color={iconColor} /> : <OpenIcon color={iconColor} />}
        </TouchableOpacity>
      </View>

      {isCalendarOpen && (
        <Calendar
          onDayPress={handleDayPress}
          markedDates={generateMarkedDates()}
          style={styles.calendar}
          theme={{
            backgroundColor: themeColors.backgroundColor || '#ffffff',
            calendarBackground: themeColors.calendarBackground || '#ffffff',
            selectedDayBackgroundColor: selectedDayColor,
            selectedDayTextColor: '#ffffff',
            todayTextColor: themeColors.todayTextColor || '#333',
            dayTextColor: themeColors.dayTextColor || '#2d4150',
            arrowColor: themeColors.arrowColor || 'black',
            monthTextColor: themeColors.monthTextColor || 'black',
            textMonthFontWeight: 'bold',
            textDayFontWeight: '300',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 14,
          }}
          markingType={'dot'}
          firstDay={1}
        />
      )}

      {selectedTask && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>{selectedTask.title}</Text>
              <Text style={styles.modalDescription}>{selectedTask.description}</Text>
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: 'BostonRegular',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 24,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 16,
    color: '#6f6f6f',
    fontFamily: 'BostonRegular',
    lineHeight: 20,
    textAlign: 'left',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    fontSize: 16,
    fontFamily: 'BostonRegular',
    color: '#333',
    marginRight: 4,
  },
  calendar: {
    width: Dimensions.get('window').width - 40,
    alignSelf: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 15,
  },
});

export default CalendarComponent;
