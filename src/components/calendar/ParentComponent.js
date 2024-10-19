//ParentComponent.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CalendarComponent from './CalendarComponent'; // Importa el componente hijo

const ParentComponent = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [activities, setActivities] = useState([]);

  return (
    <View style={styles.container}>
      {/* Componente hijo CalendarComponent */}
      <CalendarComponent
        markedDates={markedDates}
        activities={activities}
        themeColors={{
          primary: '#ff6347', // Color del rango de fechas
          arrowColor: '#ff6347', // Color de las flechas
          monthTextColor: '#ff6347' // Color del texto del mes
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default ParentComponent;
