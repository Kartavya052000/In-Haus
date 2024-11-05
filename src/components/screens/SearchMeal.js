import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Platform, StatusBar, Dimensions,} from "react-native";
import Typography from "../../components/typography/Typography";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import CustomLoadingScreen from "../../components/Loading/CustomLoadingScreen";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Slider from "@react-native-community/slider";
import { MealIcon,DessertIcon ,BreakfastIcon ,SnacksIcon ,SaladIcon ,SoupIcon, BackIcon  } from "../../components/icons/icons";
import Colors from "../../components/Colors/Colors";

const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");
const SearchMeal = ({ navigation }) => {
  const route = useRoute();

  // Initialize state variables
  const [loading, setLoading] = useState(false);
  const [servings, setServings] = useState(1);
  const [mealStyleExpanded, setMealStyleExpanded] = useState(true);
  const [cuisinesExpanded, setCuisinesExpanded] = useState(true);
  const [selectedMealStyles, setSelectedMealStyles] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [searchInputText, setSearchInputText] = useState("");

  // Initialize cuisines and mealStyles from route params or use default values
  const mealStyles = route.params?.initialMealStyles ?? [
    "main course",
    "dessert",
    "breakfast",
    "side dish",
    "salad",
    "soup",
  ];
  const cuisines = route.params?.initialCuisines ?? [
    "chinese",
    "indian",
    "japanese",
    "latin america",
    "italian",
    "vietnamese",
  ];
  const selectedMealType = route.params?.selectedMealType ?? null;
  const selectedDate = route.params?.selectedDate ?? new Date();
  const setSelectedDate = route.params?.setSelectedDate ?? (() => {});

  useEffect(() => {
    // Log params for debugging
    console.log("selectedMealType", selectedMealType);
    console.log("selectedDate", selectedDate);
  }, [route.params]);

  useFocusEffect(
    React.useCallback(() => {
      // Hide bottom tab bar when this screen is focused
      navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });

      return () => {
        // Restore bottom tab bar when leaving this screen
        navigation
          .getParent()
          ?.setOptions({ tabBarStyle: { display: "flex" } });
      };
    }, [navigation])
  );

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCameraPress = () => {
    navigation.navigate("SearchCameraScreen");
  };

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("SearchResults", {
        selectedMealStyles,
        selectedCuisines,
        searchInput: searchInputText,
        selectedDate,
        setSelectedDate,
        selectedMealType,
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
      <LinearGradient
        colors={["#F3C8CA", "#E27F82"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.headerBackground}
      >
        <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <View style={styles.viewBackButton}>
            <BackIcon color={Colors?.Primary?.Brand?.[100]} />
          </View>
        </TouchableOpacity>
          <Typography
            variant="H4"
            style={[
              styles.headerTitle,
              { color: "#B4525E" }, // Color de texto ajustado
            ]}
          >
            MealAI
          </Typography>
        </View>
      </LinearGradient>
  
      {/* Contenedor principal para personalizar el contenido */}
      <View style={styles.mainContentContainer}>
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
          <TouchableOpacity
            onPress={handleCameraPress}
            style={styles.cameraButton}
          >
            <FontAwesome6 name="camera" size={24} style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>
  
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 0 }}
        >
          {/* Meal Style Section */}
          <View style={styles.accordionSection}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => setMealStyleExpanded(!mealStyleExpanded)}
            >
              <Typography variant="SH3" style={styles.accordionTitle}>
                Meal Style
              </Typography>
              <FontAwesome6
                name={mealStyleExpanded ? "chevron-up" : "chevron-down"}
                size={20}
              />
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
                    onPress={() =>
                      toggleSelection(
                        mealType,
                        selectedMealStyles,
                        setSelectedMealStyles
                      )
                    }
                  >
                    {/* Selección de ícono basado en el tipo de comida */}
                    {mealType === "main course" && <MealIcon size={16} style={styles.checkboxIcon} />}
                    {mealType === "dessert" && <DessertIcon size={16} style={styles.checkboxIcon} />}
                    {mealType === "breakfast" && <BreakfastIcon size={16} style={styles.checkboxIcon} />}
                    {mealType === "side dish" && <SnacksIcon size={16} style={styles.checkboxIcon} />}
                    {mealType === "salad" && <SaladIcon size={16} style={styles.checkboxIcon} />}
                    {mealType === "soup" && <SoupIcon size={16} style={styles.checkboxIcon} />}

                    {/* Mostrar el nombre correcto para "side dish" */}
                    <Text style={styles.checkboxLabel}>
                      {mealType === "side dish" ? "Snacks" : mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
  
          {/* Select Cuisines Section */}
          <View style={styles.accordionSection}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => setCuisinesExpanded(!cuisinesExpanded)}
            >
              <Typography variant="SH4" style={styles.accordionTitle}>
                Select Cuisines (Max 5 cuisines)
              </Typography>
              <FontAwesome6
                name={cuisinesExpanded ? "chevron-up" : "chevron-down"}
                size={20}
              />
            </TouchableOpacity>
            {cuisinesExpanded && (
              <View style={styles.checkboxGroup}>
                {cuisines.map((cuisine, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.checkboxButton,
                      selectedCuisines.includes(cuisine) &&
                        styles.checkboxButtonSelected,
                    ]}
                    onPress={() =>
                      toggleSelection(
                        cuisine,
                        selectedCuisines,
                        setSelectedCuisines
                      )
                    }
                  >
                    <FontAwesome6
                      name="globe"
                      size={16}
                      style={styles.checkboxIcon}
                    />
                    <Text style={styles.checkboxLabel}>{cuisine}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
  
          {/* Amount of Servings Section */}
          <View style={styles.servingsSection}>
            <Typography variant="SH4" style={styles.servingsTitle}>
              Amount of Servings
            </Typography>
            <Slider
              style={{ width: "100%", height: 40 }}
              minimumValue={1}
              maximumValue={10}
              step={1}
              value={servings}
              onValueChange={(value) => setServings(value)}
            />
            <Text
              style={styles.servingsValue}
            >{`Selected Servings: ${servings}`}</Text>
          </View>
  
          {/* Search Button */}
        </ScrollView>
      </View>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "26%",
  },
  headerBackground: {
    paddingBottom: 16,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  headerTitle: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  backButton: {
    position: "absolute",
    left: 16,
    bottom: 16,
  },
  searchInputCameraContainer: {
    flexDirection: "row",
    alignItems: "center",
    
  },
  searchInputContainer: {
    backgroundColor:'#F2F2F2',
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 24,
    padding: 8,
    flex: 1,
    height: height * 0.045,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    // width: '100%',
  },
  searchIcon: {
    marginRight: 8,
  },
  cameraButton: {
    borderColor: '#FF5A5F',
    marginLeft: 12,
    borderWidth: 2,
    borderRadius: 13,
  },
  cameraIcon: {
    margin: 4,
    color: '#FF5A5F',
    borderBlockColor: '#FF5A5F',
  },
  scrollContainer: {
    flex: 1,
  },
  accordionSection: {
    marginBottom: 0,
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  accordionTitle: {
    fontWeight: 600,
    fontFamily: 'Boston',
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'left',
  },
  checkboxGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    // marginVertical: 16,
  },
  checkboxButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 8,
    minWidth: width * 0.25, // 25% del ancho de la pantalla
    flex: 1, // Ancho completo (fill) si es posible
    margin: 4,
    borderWidth: 2,
    borderColor: "transparent",
    minHeight: height * 0.08,
  },
  checkboxButtonSelected: {
    backgroundColor: "#FBEDEE",
    borderColor: "#FF5A5F",
  },
  checkboxIcon: {
    // marginRight: 8,
    marginBottom:5,
  },
  checkboxLabel: {
    fontSize: 16,
    textTransform: "capitalize",
    textAlign: "center",
  },
  servingsSection: {
    marginVertical: 0,
  },
  servingsTitle: {
    marginBottom: 8,
    fontWeight: "bold",
  },
  servingsValue: {
    marginTop: 8,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "#2e66e6",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginVertical: "16%",
    // paddingBottom: 16,
    marginHorizontal: 16,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  mainContentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    // borderTopRightRadius: 20,
    marginTop: -20, // Para superponer ligeramente el fondo
    // paddingBottom: 16,
    marginHorizontal: 16,
  },
  viewBackButton: {
    width: 40,
    height: 40,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});

export default SearchMeal;
