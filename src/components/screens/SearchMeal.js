import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Platform, StatusBar } from 'react-native';
import Typography from '../../components/typography/Typography';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import CustomLoadingScreen from '../../components/Loading/CustomLoadingScreen';
import { useRoute } from '@react-navigation/native';
import Slider from '@react-native-community/slider'; // Use the new Slider component
import { useFocusEffect } from '@react-navigation/native';

const SearchMeal = ({ navigation }) => {
  const route = useRoute();

  // Log params for debugging
  useEffect(() => {
  //  console.log("Route Params:", route.params);
  }, [route.params]);

  // Initialize cuisines and mealStyles from route params or use default values
  const mealStyles = route.params?.initialMealStyles ?? ['main course', 'dessert', 'breakfast', 'side dish', 'salad', 'soup'];
  const cuisines = route.params?.initialCuisines ?? ['chinese', 'indian', 'japanese', 'latin america', 'italian', 'vietnamese'];

  const [loading, setLoading] = useState(false);
  const [servings, setServings] = useState(1);
  const [mealStyleExpanded, setMealStyleExpanded] = useState(true);
  const [cuisinesExpanded, setCuisinesExpanded] = useState(true);
  const [selectedMealStyles, setSelectedMealStyles] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [searchInputText, setSearchInputText] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      // Hide bottom tab bar when this screen is focused
      navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });

      return () => {
        // Restore bottom tab bar when leaving this screen
        navigation.getParent()?.setOptions({ tabBarStyle: { display: 'flex' } });
      };
    }, [navigation])
  );

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCameraPress = () => {
    navigation.navigate('SearchCameraScreen');
  };

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('SearchResults', {
        selectedMealStyles: selectedMealStyles,   // Selected meal styles array
        selectedCuisines: selectedCuisines,       // Selected cuisines array
        searchInput: searchInputText,             // Pass the search input text

      });
    }, 1000); // Simulate loading time
  };

  const toggleSelection = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  return (
    <View style={styles.container}>
      {loading && <CustomLoadingScreen />}

      {/* Header Section */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <FontAwesome6 name="arrow-left" size={24} />
        </TouchableOpacity>
        <Typography variant="H4" style={styles.headerTitle}>MealAI</Typography>
      </View>

      {/* Search Input with Camera Icon */}
      <View style={styles.searchInputCameraContainer}>
        <View style={styles.searchInputContainer}>
          <FontAwesome6 name="binoculars" size={16} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search specific meal"
            value={searchInputText}
        onChangeText={setSearchInputText}
          />
        </View>
        <TouchableOpacity onPress={handleCameraPress} style={styles.cameraButton}>
          <FontAwesome6 name="camera" size={24} style={styles.cameraIcon} />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingTop:16, paddingBottom: 0 }}>
        {/* Meal Style Section */}
        <View style={styles.accordionSection}>
          <TouchableOpacity style={styles.accordionHeader} onPress={() => setMealStyleExpanded(!mealStyleExpanded)}>
            <Typography variant="SH4" style={styles.accordionTitle}>Meal Style</Typography>
            <FontAwesome6 name={mealStyleExpanded ? "chevron-up" : "chevron-down"} size={20} />
          </TouchableOpacity>
          {mealStyleExpanded && (
            <View style={styles.checkboxGroup}>
              {mealStyles.map((mealType, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.checkboxButton,
                    selectedMealStyles.includes(mealType) && styles.checkboxButtonSelected,
                  ]}
                  onPress={() => toggleSelection(mealType, selectedMealStyles, setSelectedMealStyles)}
                >
                  <FontAwesome6 name="utensils" size={16} style={styles.checkboxIcon} />
                  <Text style={styles.checkboxLabel}>{mealType}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Select Cuisines Section */}
        <View style={styles.accordionSection}>
          <TouchableOpacity style={styles.accordionHeader} onPress={() => setCuisinesExpanded(!cuisinesExpanded)}>
            <Typography variant="SH4" style={styles.accordionTitle}>Select Cuisines (Max 5 cuisines)</Typography>
            <FontAwesome6 name={cuisinesExpanded ? "chevron-up" : "chevron-down"} size={20} />
          </TouchableOpacity>
          {cuisinesExpanded && (
            <View style={styles.checkboxGroup}>
              {cuisines.map((cuisine, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.checkboxButton,
                    selectedCuisines.includes(cuisine) && styles.checkboxButtonSelected,
                  ]}
                  onPress={() => toggleSelection(cuisine, selectedCuisines, setSelectedCuisines)}
                >
                  <FontAwesome6 name="globe" size={16} style={styles.checkboxIcon} />
                  <Text style={styles.checkboxLabel}>{cuisine}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Amount of Servings Section */}
        <View style={styles.servingsSection}>
          <Typography variant="SH4" style={styles.servingsTitle}>Amount of Servings</Typography>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={servings}
            onValueChange={value => setServings(value)}
          />
          <Text style={styles.servingsValue}>{`Selected Servings: ${servings}`}</Text>
        </View>

        {/* Search Button */}
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 0,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 60,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  headerTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  backButton: {
    position: 'absolute',
    padding: 8,
    left: 0,
  },
  searchInputCameraContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  cameraButton: {
    marginLeft: 8,
  },
  cameraIcon: {
    marginLeft: 8,
  },
  scrollContainer: {
    flex: 1,
  },
  accordionSection: {
    marginBottom: 0,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  accordionTitle: {
    fontWeight: 'bold',
  },
  checkboxGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 16,
    textTransform: 'capitalize',
  },
  checkboxButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
    margin: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  checkboxButtonSelected: {
    backgroundColor: '#cce7ff',
    borderColor: '#2e66e6',
  },
  checkboxIcon: {
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
  servingsSection: {
    marginVertical: 0,
  },
  servingsTitle: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  servingsValue: {
    marginTop: 8,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#2e66e6',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SearchMeal;
