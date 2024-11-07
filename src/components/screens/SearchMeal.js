import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Platform, StatusBar, Dimensions, } from "react-native";
import Typography from "../../components/typography/Typography";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import CustomLoadingScreen from "../../components/Loading/CustomLoadingScreen";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Slider from "@react-native-community/slider";
import { ShoppingListContext } from "../../components/contexts/ShoppingListContext";
import { MealIcon, DessertIcon, BreakfastIcon, SnacksIcon, SaladIcon, SoupIcon, GoBackIcon, SearchIcon, OpenIcon, CloseIcon, ChineseIcon, IndianIcon, JapaneseIcon, LatamIcon, ItalianIcon, VietnameseIcon } from "../../components/icons/icons";
const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");
const SearchMeal = ({ navigation }) => {
  const route = useRoute();

  const {
    shoppingListItems, setShoppingListItems, mealPlanItems, setMealPlanItems, selectedDate,  setSelectedDate, selectedMealType, setSelectedMealType 
  } = useContext(ShoppingListContext);

  // Initialize state variables
  const [loading, setLoading] = useState(false);
  const [servings, setServings] = useState(4);
  const [mealStyleExpanded, setMealStyleExpanded] = useState(true);
  const [cuisinesExpanded, setCuisinesExpanded] = useState(true);
  const [selectedMealStyles, setSelectedMealStyles] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [searchInputText, setSearchInputText] = useState("");

  const isSearchButtonEnabled = searchInputText || selectedMealStyles.length > 0 || selectedCuisines.length > 0;

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
  // const selectedMealType = route.params?.selectedMealType ?? null;
  // const selectedDate = route.params?.selectedDate ?? new Date();


  // useEffect(() => {
  //   // Log params for debugging
    console.log("selectedMealType - SearchMeal:", selectedMealType);
    console.log("selectedDate - SearchMeal:", selectedDate);
  // }, [route.params]);

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
        selectedMealType,
        servings
      });
    }, 0); // Simulate loading time
  };

  const toggleSelection = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  // New function for selecting one meal style
  const toggleMealStyleSelection = (item) => {
    if (selectedMealStyles.includes(item)) {
      setSelectedMealStyles([]); // Deselect if already selected
    } else {
      setSelectedMealStyles([item]); // Select only one
    }
  };

  // New function for selecting one cuisine
  const toggleCuisineSelection = (item) => {
    if (selectedCuisines.includes(item)) {
      setSelectedCuisines([]); // Deselect if already selected
    } else {
      setSelectedCuisines([item]); // Select only one
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
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <View style={styles.backButtonContainer}>
              <GoBackIcon size={24} color="#FF5A5F" />
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
  <SearchIcon size={24} style={styles.searchIcon} />
  <TextInput
    variant="BodyL"
    style={styles.searchInput}
    placeholder="Search specific meal"
    value={searchInputText}
    onChangeText={setSearchInputText}
  />
  {searchInputText.length > 0 && (
    <TouchableOpacity onPress={() => setSearchInputText('')} style={styles.clearButton}>
      <FontAwesome5 name="times" size={16} color="#999" />
    </TouchableOpacity>
  )}
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

          {/* Amount of Servings Section */}
          <View style={styles.servingsSection}>
            <Typography variant="SH3" style={styles.servingsTitle}>
              Amount of Servings
            </Typography>
            <View style={styles.sliderContainer}>
              <Text
                style={styles.servingsValue}
              >1</Text>
              <Slider
                style={{ width: (width - 100), height: 40, marginTop: 8, }}
                minimumValue={1}
                maximumValue={10}
                step={1}
                value={servings}
                thumbTintColor="#e27f82"              // Thumb color
                minimumTrackTintColor="#b74044"      // Left track color
                maximumTrackTintColor="#f3c8ca"
                onValueChange={(value) => setServings(value)}
              />
              <Text
                style={styles.servingsValue}
              >{`${servings}`}</Text>
            </View>
          </View>

          {/* Search Button */}
        </ScrollView>
      </View>
      <TouchableOpacity
        style={[styles.searchButton, { opacity: isSearchButtonEnabled ? 1 : 0.5 }]}
        onPress={handleSearch}
        disabled={!isSearchButtonEnabled}
      >
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
  backButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 16,
    backgroundColor: "#fff",

  },
  backButton: {

    left: 0,

    top: 0,
    marginLeft: 16,
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
  servingsSection: {
    marginVertical: 0,
  },
  servingsTitle: {
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

export default SearchMeal;
