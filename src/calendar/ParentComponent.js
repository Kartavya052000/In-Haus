//ParentComponent.js
import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import CalendarComponent from './CalendarComponent'; // Importa el componente hijo

const ParentComponent = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({ date: '', title: '', description: '' });

  // Función para agregar una nueva actividad
  const addNewActivity = () => {
    const updatedActivities = [...activities, newActivity];

    // Actualizar actividades
    setActivities(updatedActivities);

    // Resaltar la fecha de la nueva actividad
    const updatedMarkedDates = {
      ...markedDates,
      [newActivity.date]: { selected: true, marked: true, selectedColor: '#333' }
    };
    setMarkedDates(updatedMarkedDates);

    // Limpiar el formulario
    setNewActivity({ date: '', title: '', description: '' });
  };

  return (
    <View style={styles.container}>
      {/* Inputs para agregar la nueva actividad */}
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={newActivity.date}
        onChangeText={(text) => setNewActivity({ ...newActivity, date: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={newActivity.title}
        onChangeText={(text) => setNewActivity({ ...newActivity, title: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={newActivity.description}
        onChangeText={(text) => setNewActivity({ ...newActivity, description: text })}
      />

      {/* Botón para agregar la nueva tarea */}
      <Button title="Add Activity" onPress={addNewActivity} />

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
  input: {
    borderColor: '#333',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});

export default ParentComponent;
