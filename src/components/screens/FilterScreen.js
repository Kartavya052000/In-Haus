import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Platform, StatusBar, Dimensions, } from "react-native";
import Typography from "../../components/typography/Typography";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import CustomLoadingScreen from "../../components/Loading/CustomLoadingScreen";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Slider from "@react-native-community/slider";
import { MealIcon, DessertIcon, BreakfastIcon, SnacksIcon, SaladIcon, SoupIcon, GoBackIcon, SearchIcon, OpenIcon, CloseIcon, ChineseIcon, IndianIcon, JapaneseIcon, LatamIcon, ItalianIcon, VietnameseIcon } from "../../components/icons/icons";
const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");
import { ShoppingListContext } from '../../components/contexts/ShoppingListContext';


const FilterScreen = ({ navigation, route }) => {
    
  // Initialize state variables
  const {
    selectedMealStyles: initialMealStyle,
    selectedCuisines: initialCuisine,
  } = route.params || {};

  const [mealStyleExpanded, setMealStyleExpanded] = useState(true);
  const [cuisinesExpanded, setCuisinesExpanded] = useState(true);
  const [selectedMealStyles, setSelectedMealStyles] = useState(
    route.params?.selectedMealStyles ? route.params.selectedMealStyles.flat() : []
  );
  const [selectedCuisines, setSelectedCuisines] = useState(
    route.params?.selectedCuisines ? route.params.selectedCuisines.flat() : []
  );
  console.log("selectedMealStyles", selectedMealStyles);
    console.log("selectedCuisines", selectedCuisines);

  const [ingredientsExpanded, setIngredientsExpanded] = useState(true);

  const {
    shoppingListItems, setShoppingListItems, mealPlanItems, setMealPlanItems, selectedDate,  setSelectedDate, selectedMealType, setSelectedMealType 
  } = useContext(ShoppingListContext);
 
const mealStyles = [
    "main course",
    "dessert",
    "breakfast",
    "side dish",
    "salad",
    "soup",
  ];

  const cuisines =  [
    "chinese",
    "indian",
    "japanese",
    "latin america",
    "italian",
    "vietnamese",
  ];
 const listIngredients = ["Vegetables", "Chicken", "Pasta", "Beef", "Seafood", "Pork", "Fish"]


  //const selectedMealType = route.params?.selectedMealType ?? null;
 // const selectedDate = route.params?.selectedDate ?? new Date();
  //const setSelectedDate = route.params?.setSelectedDate ?? (() => { });
  const searchInput = route.params?.searchInput ?? "";
  const servings = route.params?.servings ?? 4;

  const toggleIngredientSelection = (ingredient) => {
    setIngredients((prevIngredients) =>
      prevIngredients.includes(ingredient)
        ? prevIngredients.filter((item) => item !== ingredient)
        : [...prevIngredients, ingredient]
    );
  };



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

   // New function for selecting one meal style
   const toggleMealStyleSelection = (item) => {
   // setSelectedMealStyles([mealType]);
    if (selectedMealStyles.includes(item)) {
      setSelectedMealStyles([]); // Deselect if already selected
    } else {
      setSelectedMealStyles([item]); // Select only one
    }
  };

  // New function for selecting one cuisine
  const toggleCuisineSelection = (item) => {
 //   setSelectedCuisines([cuisine]);
    if (selectedCuisines.includes(item)) {
      setSelectedCuisines([]); // Deselect if already selected
    } else {
      setSelectedCuisines([item]); // Select only one
    }
  };
  const [ingredients, setIngredients] = useState([]);
  const handleCheckboxToggle = (ingredient) => {
    const updatedIngredients = ingredients.map((item) => {
      if (item.name === ingredient) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setIngredients(updatedIngredients);
  }; 

  console.log("selected ingredients:", ingredients);

  const onApply = () => {
    navigation.navigate("SearchResults", {
      selectedMealStyles,
      selectedCuisines,
      searchInput,
      servings,
    //  selectedDate,
  //    setSelectedDate,
  //    selectedMealType, // If only one meal type is selected
      selectedIngredients: ingredients, // Make sure this matches the ingredients' state
    });
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
          <TouchableOpacity onPress={handleBack} style={styles.cancel}>
          <Typography
            variant="SH3"
            style={
              { color: "#ffffff" } // Color de texto ajustado
            }
          >
            Cancel
          </Typography>
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
          <TouchableOpacity onPress={onApply} style={styles.apply}>
          <Typography
            variant="SH3"
            style={
              { color: "#ffffff" } // Color de texto ajustado
            }
          >
            Apply
          </Typography>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Contenedor principal para personalizar el contenido */}
      <View style={styles.mainContentContainer}>


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
              {mealStyleExpanded ? <CloseIcon color={"#b74044"} /> : <OpenIcon color={"#b74044"} />}

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
                    onPress={() => toggleMealStyleSelection(mealType)}
                  >
                    {mealType === "main course" && <MealIcon size={16} style={styles.checkboxIcon} />}
                    {mealType === "dessert" && <DessertIcon size={16} style={styles.checkboxIcon} />}
                    {mealType === "breakfast" && <BreakfastIcon size={16} style={styles.checkboxIcon} />}
                    {mealType === "side dish" && <SnacksIcon size={16} style={styles.checkboxIcon} />}
                    {mealType === "salad" && <SaladIcon size={16} style={styles.checkboxIcon} />}
                    {mealType === "soup" && <SoupIcon size={16} style={styles.checkboxIcon} />}

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
              <Typography variant="SH3" style={styles.accordionTitle}>
                Select Cuisines
              </Typography>
              {cuisinesExpanded ? <CloseIcon color={"#b74044"} /> : <OpenIcon color={"#b74044"} />}

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
                    onPress={() => toggleCuisineSelection(cuisine)}
                  >
                    {cuisine === "chinese" && <ChineseIcon size={16} style={styles.checkboxIcon} />}
                    {cuisine === "indian" && <IndianIcon size={16} style={styles.checkboxIcon} />}
                    {cuisine === "japanese" && <JapaneseIcon size={16} style={styles.checkboxIcon} />}
                    {cuisine === "latin america" && <LatamIcon size={16} style={styles.checkboxIcon} />}
                    {cuisine === "italian" && <ItalianIcon size={16} style={styles.checkboxIcon} />}
                    {cuisine === "vietnamese" && <VietnameseIcon size={16} style={styles.checkboxIcon} />}
                    <Text style={styles.checkboxLabel}>{cuisine}</Text>
                  </TouchableOpacity>
                ))}

              </View>
            )}
          </View>

             {/* Ingredients Accordion */}
        <View style={styles.accordionSection}>
          <TouchableOpacity onPress={() => setIngredientsExpanded(!ingredientsExpanded)} style={styles.accordionHeader}>
            <Typography variant="SH3" style={styles.accordionTitle}>Main Ingredient</Typography>
            {ingredientsExpanded ? <CloseIcon color="#b74044" /> : <OpenIcon color="#b74044" />}
          </TouchableOpacity>
          {ingredientsExpanded && (
            <View style={styles.optionGroup}>
              {listIngredients.map((ingredient) => (
                <TouchableOpacity
                  key={ingredient}
                  style={styles.checkboxContainer}
                  onPress={() => toggleIngredientSelection(ingredient)}
                >
                  <FontAwesome6
                    name={ingredients.includes(ingredient) ? "check-square" : "square"}
                    size={24}
                    color={ingredients.includes(ingredient) ? "#0d9802" : "#ccc"}
                  />
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

       
        </ScrollView>
      </View>
 
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8F8F8',
  
    },
    clearButton:{
  paddingRight:5,
    },
    headerContainer: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      width: width,
      marginTop: 54,
    },
    headerBackground: {
      height: 140,
      left: 0,
      position: "absolute",
      top: 0,
      width: width,
    },
    headerTitle: {
      position: 'absolute',
      fontSize: 24,
      lineHeight: 28,
      textAlign: "center",
      color: "#B4525E",
      marginBottom: 10,
  
      left: 16 + 40,
      paddingRight: 40,
      width: width - (32 + 40),
  
  
    },

    ingredientLabel: {
    marginLeft: 16,
    },
    backButtonContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      borderRadius: 16,
      backgroundColor: "#fff",
  
    },
    cancel: {
  
      left: 0,
  
      top: 0,
      marginLeft: 16,
    },
    apply: {
  
      right: 0,
  
      top: 0,
      marginRight: 16,
    },
    accordionContainer: {
        marginVertical: 8,
      },
      checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
 
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#d9d9d9",
      },
      ingredientText: {
        marginLeft: 8,
        fontSize: 16,
      },
    searchInputCameraContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingRight: 8,
      paddingLeft: 16,
      marginBottom: 8,
    },
    searchInputContainer: {
      backgroundColor: '#F2F2F2',
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
      marginLeft: 8,
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
      backgroundColor: '#fff',
      marginTop: 0,
      paddingLeft: 16,
      paddingRight: 8,
      marginBottom: 8,
    },
    accordionSection: {
      marginBottom: 0,
    },
    accordionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
  
    },
    accordionTitle: {
      fontSize: 20,
      lineHeight: 24,
      textAlign: 'left',
    },
    checkboxGroup: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderBottomColor: "#f2f2f2",
      marginBottom: 8,
      // marginVertical: 16,
    },
    checkboxButton: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fcfafa",
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 8,
      minWidth: (width - (16 * 2)) * 0.25, // 25% del ancho de la pantalla
      flex: 1, // Ancho completo (fill) si es posible
      margin: 4,
      borderWidth: 2,
      borderColor: "transparent",
      aspectRatio: 1,
    },
    checkboxButtonSelected: {
      backgroundColor: "#FBEDEE",
      borderColor: "#FF5A5F",
    },
    checkboxIcon: {
      // marginRight: 8,
      marginBottom: 5,
    },
    checkboxLabel: {
      fontSize: 16,
      textTransform: "capitalize",
      textAlign: "center",
    },
    ingredientsSection: {
      marginVertical: 0,
    },
    ingredientsTitle: {
      marginTop: 16,
  
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
      //marginVertical: 32,
      marginBottom: 32,
      marginTop: 20,
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
      paddingRight: 8,
      paddingTop: 16,
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      // borderTopRightRadius: 20,
      marginTop: 120, // Para superponer ligeramente el fondo
      // paddingBottom: 16,
      marginHorizontal: 16,
    },
    sliderContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
  
      flex: 1,
      justifyContent: 'space-between',
    }
  });

export default FilterScreen;
