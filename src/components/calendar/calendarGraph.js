import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { smileIcon, mehIcon, frownIcon } from '../icons/icons'; // Ajusta la ruta de tus íconos

// Componente para el día individual
const DayColumn = ({ day, tasksAssigned, tasksCompleted }) => {
  const completionRatio = tasksCompleted / tasksAssigned;
  let IconComponent;

  // Asigna el componente del ícono correcto basado en la proporción de tareas completadas
  if (completionRatio === 1) {
    IconComponent = smileIcon; // Icono de cara feliz
  } else if (completionRatio >= 0.5) {
    IconComponent = mehIcon; // Icono de cara neutra
  } else {
    IconComponent = frownIcon; // Icono de cara triste
  }

  return (
    <View style={styles.column}>
      {/* Barra con el ícono dentro */}
      <View style={[styles.bar, { height: `${completionRatio * 100}%` }]}>
        <IconComponent width={20} height={20} />
      </View>
      <Text style={styles.dayText}>{day}</Text>
    </View>
  );
};

// Componente principal para el gráfico
const CalendarGraph = ({ data }) => {
  return (
    <View style={styles.container}>
      {data.map((dayData) => (
        <DayColumn
          key={dayData.day}
          day={dayData.day}
          tasksAssigned={dayData.tasksAssigned}
          tasksCompleted={dayData.tasksCompleted}
        />
      ))}
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 200,
  },
  column: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 5,
  },
  bar: {
    width: 24, // Ajustar el ancho de la barra a 24
    backgroundColor: '#e0e0e0',
    borderRadius: 12, // Borde redondeado
    justifyContent: 'flex-start', // Alinea el ícono al principio
    alignItems: 'center',
    overflow: 'hidden',
  },
  dayText: {
    marginTop: 10,
    fontSize: 12,
    color: '#777',
  },
});

export default CalendarGraph;
