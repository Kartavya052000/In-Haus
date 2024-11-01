import React, { useState, useEffect, useContext  } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform,
  StatusBar,
  ScrollView,
  Text,
} from "react-native";
import Typography from "../../components/typography/Typography";
import {
  AddIcon,
  OpenIcon,
  CloseIcon,
  DeleteIcon,
} from "../../components/icons/icons";
import OptionTabs from "../../components/TabsNavigators/OptionTabs/OptionTabs";
import MealCard from "../Cards/MealCards";
import CalendarComponent from "../../components/calendar/CalendarComponent";
import Checkbox from "../../components/Selectors/Checkbox/Checkbox";
import { useNavigation } from "@react-navigation/native";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_USER_MEALS_BY_DATE,
  GET_USER_MEAL_DATES,
} from "../../graphql/mutations/mealMutations/mealQueries";
import { DELETE_MEAL } from "../../graphql/mutations/mealMutations/mealMutations";
import { ShoppingListContext } from "../../components/contexts/ShoppingListContext";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../components/Colors/Colors";

import * as SecureStore from 'expo-secure-store';  



const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");

const optionsFromDatabase = [{ name: "My Plan" }, { name: "Shopping List" }];

const handleMealCardPress = (meal) => {
  if (meal) {
    navigation.navigate("MealDetails", {
      mealId: meal.mealId,
      selectedDate: selectedDate,
      selectedMealType: meal.mealType,
    });
  }
};

const MealPlanner = ({ route, userId }) => {
  // Accept userId as a prop
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = React.useState(
    route?.params?.selectedTab || "My Plan"
  );
  const [selectedDate, setSelectedDate] = React.useState(
    new Date().toISOString().split("T")[0]
  );
  const [token, setToken] = useState(null);



  const getToken = async () => {
    try {
      const token = await SecureStore.getItemAsync('authToken');
      if (token) {
        setToken(token);
     //   fetchGroupData(token);
      } else {
        console.log('No token found');
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
      Alert.alert('Retrieval Error', 'Failed to retrieve authentication token.');
    }
  };


  useEffect(() => {
    getToken(); 
  }, []);
  const [selectedFilter, setSelectedFilter] = React.useState("All"); // Initial filter is "All"
  const [isFilterOpen, setIsFilterOpen] = React.useState(false); // For opening/closing the filter dropdown
  const [meals, setMeals] = React.useState({
    Breakfast: null,
    Lunch: null,
    Dinner: null,
    Snacks: null,
  });

  const {
    shoppingListItems,
    setShoppingListItems,
    mealPlanItems,
    setMealPlanItems,
  } = useContext(ShoppingListContext);
  const [mealDates, setMealDates] = React.useState({});

  console.log("Meal plan items:", mealPlanItems); // Verifica el estado de mealPlanItems
  // GraphQL queries and mutations
  const { data: mealsData, refetch: refetchMeals } = useQuery(
    GET_USER_MEALS_BY_DATE,
    {
      variables: { userId, date: selectedDate },
    }
  );
  const { data: mealDatesData } = useQuery(GET_USER_MEAL_DATES, {
    variables: { userId },
  });
  const [deleteMeal] = useMutation(DELETE_MEAL);

  React.useEffect(() => {
    if (mealsData) {
      const fetchedMeals = mealsData.getUserMealsByDate.reduce(
        (acc, meal) => {
          acc[meal.mealType] = meal;
          return acc;
        },
        { Breakfast: null, Lunch: null, Dinner: null, Snacks: null }
      );
      setMeals(fetchedMeals);
    }
  }, [mealsData]);

  React.useEffect(() => {
    if (mealDatesData) {
      const datesWithMeals = mealDatesData.getUserMealDates.dates.reduce(
        (acc, date) => {
          acc[date] = { marked: true, dotColor: "blue" }; // Mark dates with meals
          return acc;
        },
        {}
      );
      setMealDates(datesWithMeals);
    }
  }, [mealDatesData]);

  React.useEffect(() => {
    console.log("Current selected date:", selectedDate); // Verifica la fecha seleccionada
    console.log("Current shopping list items:", shoppingListItems); // Verifica el estado de shoppingListItems

    const mealsForDate = shoppingListItems.filter(
      (meal) => meal.date === selectedDate
    );
    console.log("Meals for selected date:", mealsForDate); // Verifica que las comidas para la fecha seleccionada se están filtrando correctamente

    const mealsByType = mealsForDate.reduce(
      (acc, meal) => {
        acc[meal.mealType] = meal; // Asegúrate de que meal.mealType esté asignando correctamente la comida al tipo
        return acc;
      },
      { Breakfast: null, Lunch: null, Dinner: null, Snacks: null }
    );

    console.log("Meals organized by type:", mealsByType); // Verifica que las comidas se están organizando por tipo
    setMeals(mealsByType);
  }, [shoppingListItems, selectedDate]);

  const handleTabChange = (optionName) => {
    setSelectedTab(optionName);
  };

  const confirmAction = (action, message) => {
    Alert.alert("Confirm Action", message, [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: action, style: "destructive" },
    ]);
  };

  const handleRemoveSelectedIngredients = () => {
    const updatedMeals = shoppingListItems
      .map((meal) => ({
        ...meal,
        ingredients: meal.ingredients.filter(
          (ingredient) => !ingredient.checked
        ),
      }))
      .filter((meal) => meal.ingredients.length > 0);

    setShoppingListItems(updatedMeals);
  };

  const handleClearList = () => {
    setShoppingListItems([]);
  };

  const handleAddMeal = (mealType) => {
    navigation.navigate("SearchMeal", {
      selectedMealType: mealType,
      selectedDate: selectedDate,
      setSelectedDate: setSelectedDate,
    });
  };

  const handleMealClick = (mealType) => {
    if (meals[mealType]) {
      navigation.navigate("MealAIResult", {
        meal: meals[mealType],
        selectedDate,
      });
    } else {
      handleAddMeal(mealType);
    }
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };
  const filteredItems =
    selectedFilter === "All"
      ? shoppingListItems.flatMap((meal) => meal.ingredients) // Flatten all ingredients across meals
      : shoppingListItems; // Show by meal when filtered by "Recipe"

  const handleDeleteMeal = (mealId, mealType) => {
    Alert.alert("Delete Meal", "Are you sure you want to delete this meal?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteMeal({ variables: { mealId } })
            .then(() => {
              setMeals((prevMeals) => ({
                ...prevMeals,
                [mealType]: null,
              }));
              refetchMeals(); // Refresh after deletion
            })
            .catch((error) => console.error("Error deleting meal", error));
        },
      },
    ]);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen); // Toggle the dropdown visibility
  };

  const selectFilter = (filter) => {
    setSelectedFilter(filter); // Update the selected filter ("All" or "Recipe")
    setIsFilterOpen(false); // Close the dropdown after selection
  };

  const handleCheckboxToggle = (ingredientIndex, mealIndex = null) => {
    // For 'All' filter, toggle the flattened list
    if (selectedFilter === "All") {
      const updatedIngredients = [...filteredItems]; // Get the flattened list
      updatedIngredients[ingredientIndex].checked =
        !updatedIngredients[ingredientIndex].checked; // Toggle the checked state

      // Update the original shoppingListItems state based on these changes
      const updatedShoppingList = shoppingListItems.map((meal) => ({
        ...meal,
        ingredients: meal.ingredients.map(
          (ingredient) =>
            updatedIngredients.find(
              (updatedIngredient) =>
                updatedIngredient.name === ingredient.name &&
                updatedIngredient.checked === ingredient.checked
            ) || ingredient
        ),
      }));

      setShoppingListItems(updatedShoppingList);
    } else {
      // For 'Recipe' filter, toggle the ingredients within each meal
      const updatedMeals = [...shoppingListItems]; // Copy shopping list
      updatedMeals[mealIndex].ingredients[ingredientIndex].checked =
        !updatedMeals[mealIndex].ingredients[ingredientIndex].checked; // Toggle checkbox
      setShoppingListItems(updatedMeals); // Update state
    }
  };
  console.log("token MealAI:", token);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(243, 200, 202, 1)", "rgba(226, 127, 130, 1)"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.headerBackground}
      />
      <View style={styles.contentContainer}>
        <Typography
          variant="H4"
          style={[
            styles.headerTitle,
            { textAlign: "center", color: "#B4525E" },
          ]} // Ajusta el color para igualar el diseño
        >
          MealAI
        </Typography>
        <TouchableOpacity
          style={styles.addMealButton}
          onPress={() => handleAddMeal("General")}
        >
          <View style={styles.addMealContainer}>
            <AddIcon color="#FFFFFF" style={styles.addIcon} />
          </View>
        </TouchableOpacity>
      </View>
        {/* Option Tabs Section */}
        <View style={styles.optionTabsContainer}>
          <OptionTabs
            options={optionsFromDatabase}
            containerColor={Colors.Secondary.Gray[100]} // Cambia el color del contenedor
            activeColor={"#F3C8CA"} // Color activo igual que en `Haus`
            inactiveColor={"#FFF"} // Color inactivo si es necesario (opcional)
            textColor={Colors.Primary.Purple} // Color de texto igual que en `Haus`
            onTabChange={handleTabChange} // Manejador de cambio de pestaña
          />
        </View>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        >

        {selectedTab === "My Plan" && (
          <>
            {/* Calendar Section */}
            <View style={styles.calendarSection}>
            <CalendarComponent
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedDayColor="#ff0000" // Ejemplo de color del día seleccionado
              eventDotColor="#00adf5" // Ejemplo de color para el punto de eventos
              iconColor="#B74044" // Ejemplo de color de los iconos
              themeColors={{
                backgroundColor: '#F2F2F2',
                calendarBackground: '#F2F2F2',
                todayTextColor: '#333',
                arrowColor: '#333',
                monthTextColor: '#000',
              }}
            />
            </View>

            {/* Meal Cards Section */}
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={styles.mealCardsContainer}
              showsVerticalScrollIndicator={false}
            >
              {["Breakfast", "Lunch", "Dinner", "Snacks"].map(
                (mealType, index) => {
                  const mealData = mealPlanItems.find(
                    (item) =>
                      item.date === selectedDate && item.mealType === mealType
                  );
                  return (
                    <View key={index} style={styles.mealSection}>
                      <Typography variant="SH4" style={styles.mealTitle}>
                        {mealType}
                      </Typography>
                      <MealCard
                          mealName={mealData?.mealTitle || null}
                          portions={mealData?.servings || null}
                          onAddPress={() => handleMealClick(mealType)}
                          onPress={() => handleMealCardPress(mealData)} // Pasa solo el mealId y otros datos necesarios
                          mealNameColor={Colors.Primary.Purple} 
                          portionsColor={Colors.Secondary.Orange[400]} 
                          backgroundColor={Colors.Secondary.Gray[110]} 
                          borderColor={Colors.Secondary.Orange[400]} 
                        />
                    </View>
                  );
                }
              )}
            </ScrollView>
          </>
        )}

{selectedTab === "Shopping List" && (
  <View style={styles.shoppingListSection}>
    {/* Contenedor para el encabezado de filtro (Filter by, All y el icono) */}
    <View style={styles.filterHeader}>
      <Typography variant="SH3" style={styles.filterTitle}>
        Filter by
      </Typography>
      <TouchableOpacity
        onPress={toggleFilter}
        style={styles.filterButton}
      >
        <Typography variant="Body" style={styles.filterText}>
          {selectedFilter}
        </Typography>
        {isFilterOpen ? (
          <CloseIcon color="#B74044" /> // Color del icono siempre #B74044
        ) : (
          <OpenIcon color="#B74044" />
        )}
      </TouchableOpacity>
    </View>

    {/* Menú desplegable de opciones, que aparece debajo del encabezado de filtro */}
    {isFilterOpen && (
      <View style={styles.filterDropdown}>
        {/* "All" filter option */}
        <TouchableOpacity
          onPress={() => selectFilter("All")}
          style={[
            styles.filterOption,
            selectedFilter === "All" && styles.selectedOption,
          ]}
        >
          <Typography
            variant="Body"
            style={[
              styles.filterText,
              selectedFilter === "All" && styles.selectedText,
            ]}
          >
            All
          </Typography>
        </TouchableOpacity>

        {/* "Recipe" filter option */}
        <TouchableOpacity
          onPress={() => selectFilter("Recipe")}
          style={[
            styles.filterOption,
            selectedFilter === "Recipe" && styles.selectedOption,
          ]}
        >
          <Typography
            variant="Body"
            style={[
              styles.filterText,
              selectedFilter === "Recipe" && styles.selectedText,
              selectedFilter !== "Recipe" && styles.disabledText,
            ]}
          >
            Recipe
          </Typography>
        </TouchableOpacity>
      </View>
    )}

    {/* Shopping List Items */}
    {selectedFilter === "All" && (
  filteredItems.length === 0 ? (
    <View style={styles.emptyShoppingListContainer}>
      <Typography variant="Body" style={styles.emptyShoppingListText}>
        No Shopping list yet
      </Typography>
    </View>
  ) : (
    <View style={styles.shoppingListCard}>
      {filteredItems.map((ingredient, ingredientIndex) => (
        <View key={ingredientIndex} style={styles.shoppingListItem}>
          <View style={styles.ingredientInfo}>
            <Typography
              style={[
                styles.itemName,
                ingredient.checked && styles.checkedText,
              ]}
            >
              {ingredient.name}
            </Typography>
            <Typography
              style={[
                styles.itemQuantity,
                ingredient.checked && styles.checkedText,
              ]}
            >
              {ingredient.amount} {ingredient.unit}
            </Typography>
          </View>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => handleCheckboxToggle(ingredientIndex)} // Asegúrate de que esto llame a la función correctamente
          >
            <FontAwesome6
              name={ingredient.checked ? "check-square" : "square"}
              size={24}
              color={ingredient.checked ? "#2e86de" : "#ccc"}
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  )
)}
    
    {selectedFilter === "Recipe" &&
  shoppingListItems.map((meal, mealIndex) => (
    <View key={meal.mealId} style={styles.mealSection}>
      <TouchableOpacity>
        <Typography variant="SH3" style={styles.mealTitle}>
          {meal.mealTitle}
        </Typography>
      </TouchableOpacity>

      {meal.ingredients.map((ingredient, ingredientIndex) => (
        <View key={ingredientIndex} style={styles.shoppingListItem}>
          <View style={styles.ingredientInfo}>
            <Typography
              style={[
                styles.itemName,
                ingredient.checked && styles.checkedText,
              ]}
            >
              {ingredient.name}
            </Typography>
            <Typography
              style={[
                styles.itemQuantity,
                ingredient.checked && styles.checkedText,
              ]}
            >
              {ingredient.amount} {ingredient.unit}
            </Typography>
          </View>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => handleCheckboxToggle(ingredientIndex, mealIndex)}
          >
            <FontAwesome6
              name={ingredient.checked ? "check-square" : "square"}
              size={24}
              color={ingredient.checked ? "#2e86de" : "#ccc"}
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  ))}


    {/* Button to Clear the Shopping List */}
    {shoppingListItems.length > 0 && (
      <View style={styles.buttonRow}>
        {/* Clear List Button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            confirmAction(
              handleClearList,
              "Are you sure you want to clear the entire list?"
            )
          }
        >
          <FontAwesome6 name="trash" size={16} color="#fff" />
          <Text style={styles.buttonText}>Clear All</Text>
        </TouchableOpacity>

        {/* Remove Selected Ingredients Button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            confirmAction(
              handleRemoveSelectedIngredients,
              "Are you sure you want to remove selected ingredients?"
            )
          }
        >
          <FontAwesome6 name="circle-minus" size={16} color="#fff" />
          <Text style={styles.buttonText}>Delete Checked</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF5A5F",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  addIcon: {
    marginBottom: -2,
  },
  addMealButton: {
    position: "absolute",
    right: 0,
    top: -10,
  },
  addMealContainer: {
    width: 40,
    height: 40,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.Primary.Brand[100],
  },
  addMealContent: {
    alignItems: "center",
    flexDirection: "row",
  },
  addMealContentCenter: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  addMealText: {
    lineHeight: 17,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    paddingLeft: 10,
  },
  clearButton: {
    alignItems: "center",
    backgroundColor: "#e74c3c",
    borderRadius: 10,
    marginVertical: 10,
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "#F2F2F2",
    flex: 1,
    paddingHorizontal: 16,
  },
  contentContainer: {
    alignItems: "center",
    marginTop: height * 0.12,
  },
  deleteAction: {
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 12,
    height: "100%",
    justifyContent: "center",
    width: 75,
  },
  deleteIcon: {
    color: "#fff",
  },
  filterButton: {
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  filterDropdown: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    width: "100%",
    paddingVertical: 8,
    marginTop: 8,
  },
  filterOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    borderRadius: 20,
    width: "100%",
  },
  selectedOption: {
    backgroundColor: "#FF5A5F",
  },
  filterText: {
    color: "#000",
    fontSize: 16,
    marginRight: 8,
  },
  selectedText: {
    color: "#FFF",
  },
  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerBackground: {
    height: height * 0.19,
    left: 0,
    position: "absolute",
    top: 0,
    width: "120%",
  },
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 28,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  itemQuantity: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  mealSection: {
    padding: 16,
    borderRadius: 12,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  noMealText: {
    color: "#999",
    textAlign: "center",
  },
  shoppingListItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  shoppingListSection: {},
  checkedText: {
    textDecorationLine: "line-through",
    color: "#A0A0A0",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  optionTabsContainer: {
    alignItems: "center",
    width: "100%",
    marginVertical: 16,
  },
  mealCardsContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
  },
  calendarSection: {
    marginBottom: 10,
  },
  mealCard: {
    mealNameColor: Colors.Primary.Purple,
    portionsColor: Colors.Secondary.Orange[400],
    backgroundColor: Colors.Secondary.Orange[100],
    borderColor: Colors.Secondary.Orange[400],
  },
  emptyShoppingListContainer: {
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginTop: 20,
    height: '100%',
  },
  emptyShoppingListText: {
    color: "#A0A0A0",
    fontSize: 16,
  },
  shoppingListCard: {
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    padding: 16,
  },
  ingredientInfo: {
    flex: 1,
    paddingRight: 10,
  },
});

export default MealPlanner;
