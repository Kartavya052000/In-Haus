import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Typography from '../../typography/Typography'; // Importar Typography para estilos de texto

const OptionTabs = ({ options, activeColor, inactiveColor, textColor, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(options[0].name);

  const handlePress = (optionName) => {
    setActiveTab(optionName);
    onTabChange(optionName);
  };

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.name}
          style={[
            styles.tab,
            activeTab === option.name
              ? { backgroundColor: activeColor }
              : inactiveColor ? { backgroundColor: inactiveColor } : {},
          ]}
          onPress={() => handlePress(option.name)}
        >
          <Typography variant="Body" color={textColor} style={styles.text}>
            {option.name}
          </Typography>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderRadius: 16,
    marginHorizontal: 4,
  },
  text: {
    fontWeight: '600',
  },
});

export default OptionTabs;
