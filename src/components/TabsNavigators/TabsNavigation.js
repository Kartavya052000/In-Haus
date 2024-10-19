import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Typography from '../typography/Typography'; // Importamos el componente tipográfico

const { width } = Dimensions.get('window'); // Obtenemos el ancho de la pantalla

const TabsNavigation = ({ users = [], activeColor = '#000', inactiveColor = '#888', onTabChange }) => {
  // "All" y "Me" son fijos, añadimos el resto de los usuarios dinámicamente
  // const initialTabs = [{ name: 'All' }, { name: 'Me' }, ...users];
  const initialTabs = [{ name: 'All' }, ...users];

  
  // Estado para la pestaña seleccionada
  const [activeTab, setActiveTab] = useState('All');

  // Función para cambiar la pestaña activa
  const handleTabPress = (tab) => {
    setActiveTab(tab.name);
    if (onTabChange) {
      onTabChange(tab); // Se ejecuta si hay un evento asociado al cambio de pestaña

    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ width: width }} // Asegura que las pestañas ocupen el ancho de la pantalla
      >
        {initialTabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tab}
            onPress={() => handleTabPress(tab)}
          >
            <Typography
              variant="BodyS"
              color={activeTab === tab.name ? activeColor : inactiveColor}
              style={styles.text}
            >
              {tab.name.charAt(0).toUpperCase() + tab.name.slice(1)}
            </Typography>
            {/* Línea resaltada debajo de la pestaña activa */}
            {activeTab === tab.name && <View style={[styles.underline, { backgroundColor: activeColor }]} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 10,
    // paddingHorizontal: 15,
  },
  tab: {
    // marginRight: 20,
    alignItems: 'center',
    flex: 1, // Hace que cada pestaña ocupe proporcionalmente el espacio disponible
  },
  text: {
    fontSize: 16, // Se puede ajustar si es necesario
  },
  underline: {
    height: 2,
    marginTop: 4,
    width: '100%',
    backgroundColor: '#000',
  },
});

export default TabsNavigation;
