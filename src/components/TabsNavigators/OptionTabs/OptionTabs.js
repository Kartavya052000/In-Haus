import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Typography from '../../typography/Typography';
import { Dimensions } from 'react-native';

const OptionTabs = ({ options, containerColor, activeColor, textColor, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(options[0].name);

  const handlePress = (optionName) => {
    setActiveTab(optionName);
    onTabChange(optionName);
  };

  return (
    <View style={[styles.container, { backgroundColor: containerColor }]}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.name}
          style={[
            styles.tab,
            activeTab === option.name
              ? { backgroundColor: activeColor }
              : { backgroundColor: containerColor },
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

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 16,
    width: '100%',
    height: windowWidth * 0.12, // 15% of the width
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 4,
  },
  text: {
    fontWeight: '600',
    marginTop: 2,
  },
});

export default OptionTabs;
