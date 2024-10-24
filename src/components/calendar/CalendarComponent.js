// CalendarComponent.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Button, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment'; 
import { OpenIcon, CloseIcon } from '../icons/icons'; 

const CalendarComponent = ({ markedDates = {}, activities = [], themeColors = {} }) => {  // Valores predeterminados
  const [selectedTask, setSelectedTask] = useState(null); 
  const [modalVisible, setModalVisible] = useState(false); 
  const [selectedRange, setSelectedRange] = useState({}); 
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); 
 
  // Obtener el día actual
  const today = moment().format('YYYY-MM-DD');

  // Función para manejar la selección de una fecha o un rango
  const handleDayPress = (day) => {
    const selectedActivity = activities.find(activity => activity.date === day.dateString);
    
    // Si la fecha seleccionada tiene una actividad, abrimos el modal
    if (selectedActivity) {
      setSelectedTask(selectedActivity);
      setModalVisible(true);
    }
  };

  // Función para manejar la selección de un rango de fechas
  const handleDayRangeSelect = (day) => {
    if (Object.keys(selectedRange).length === 0) {
      setSelectedRange({
        [day.dateString]: { startingDay: true, color: themeColors.primary || '#000', textColor: '#fff' }
      });
    } else {
      const newRange = {};
      const start = Object.keys(selectedRange)[0];
      let currentDate = new Date(start);
      let endDate = new Date(day.dateString);

      if (currentDate > endDate) {
        [currentDate, endDate] = [endDate, currentDate];
      }

      while (currentDate <= endDate) {
        const dateString = currentDate.toISOString().split('T')[0];
        newRange[dateString] = { color: themeColors.primary || '#000', textColor: '#fff' };
        currentDate.setDate(currentDate.getDate() + 1);
      }

      newRange[start] = { startingDay: true, color: themeColors.primary || '#000', textColor: '#fff' };
      newRange[day.dateString] = { endingDay: true, color: themeColors.primary || '#000', textColor: '#fff' };

      setSelectedRange(newRange);
    }
  };

  // Función para marcar los días con actividades y personalizar el día actual
  const generateMarkedDates = () => {
    const marked = { ...markedDates }; // Use default markedDates or an empty object

    activities.forEach(activity => {
      if (activity && activity.date) {
        marked[activity.date] = {
          marked: true,
          dotColor: activity.date === today ? '#ffffff' : '#333', 
        };
      }
    });

    if (!marked[today]) {
      marked[today] = { selected: true, selectedColor: '#D3D3D3' };
    } else {
      marked[today] = {
        ...marked[today],
        selected: true,
        selectedColor: '#D3D3D3',
        dotColor: '#ffffff', 
      };
    }

    return marked;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.title}>Today</Text>
          <Text style={styles.subtitle}>{moment().format('dddd, DD MMM')}</Text>
        </View>
        <TouchableOpacity onPress={() => setIsCalendarOpen(!isCalendarOpen)} style={styles.filterButton}>
          <Text style={styles.filterText}>Calendar</Text>
          {isCalendarOpen ? <CloseIcon /> : <OpenIcon />}
        </TouchableOpacity>
      </View>

      {isCalendarOpen && (
        <Calendar
          style={styles.calendar}
          theme={{
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#D3D3D3',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#333',
            dayTextColor: '#2d4150',
            arrowColor: themeColors.arrowColor || 'black', // Set default arrowColor
            monthTextColor: themeColors.monthTextColor || 'black', // Set default monthTextColor
            textMonthFontWeight: 'bold',
            textDayFontWeight: '300',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 14,
          }}
          markedDates={generateMarkedDates()} 
          markingType={'period'} 
          firstDay={1} 
          onDayPress={handleDayPress} 
          onDayLongPress={handleDayRangeSelect} 
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
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
