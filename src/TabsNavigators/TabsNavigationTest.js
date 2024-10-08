import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import TabsNavigation from './TabsNavigation'; // Asegúrate de que el path sea correcto

const usersFromDatabase = [
  { name: 'wife' },
  { name: 'son' },
  { name: 'daughter' }
];

const App = () => {
  const handleTabChange = (tab) => {
    Alert.alert(`Tab changed to: ${tab}`);
  };

  return (
    <View style={styles.container}>
      <TabsNavigation
        users={usersFromDatabase}
        activeColor="#6200EE"  // Color de la pestaña activa
        inactiveColor="#A0A0A0"  // Color de las pestañas inactivas
        onTabChange={handleTabChange}  // Maneja el cambio de pestañas
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default App;
