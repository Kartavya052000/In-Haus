import React, { createContext, useState, useEffect } from 'react';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';

const GET_MEAL_PLAN_BY_GROUP = gql`
  query GetMealPlanByGroup {
    getMealPlanByGroup {
      groupId
      mealPlanItems {
        date
        mealId
        mealTitle
        mealType
        image
        servings
      }
    }
  }
`;

const SAVE_MEAL_PLAN = gql`
  mutation SaveMealPlan($mealPlanItems: [MealPlanItemInput]!) {
    saveMealPlan(mealPlanItems: $mealPlanItems) {
      groupId
      mealPlanItems {
        date
        mealId
        mealTitle
        mealType
        image
        servings
      }
    }
  }
`;

// Create a context
export const ShoppingListContext = createContext();

// Create a provider component
export const ShoppingListProvider = ({ children }) => {
  const [shoppingListItems, setShoppingListItems] = useState([]);
  const [mealPlanItems, setMealPlanItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedMealType, setSelectedMealType] = useState([]);
  const [token, setToken] = useState(null);

  
  // Fetch the user's meal plan items on initial load
  const [fetchMealPlan] = useLazyQuery(GET_MEAL_PLAN_BY_GROUP, {
    context: {
      headers: {
        Authorization: token ? `${token}` : "",
      },
    },
    onCompleted: (data) => {
      console.log("Meal plan data fetched:", data.getMealPlanByGroup);
      setMealPlanItems(data.getMealPlanByGroup.mealPlanItems);
    },
    onError: (error) => {
      console.error("Error fetching meal plan:", error.message);
    },
  });

  
  useEffect(() => {
    const getToken = async () => {
      try {
        const authToken = await SecureStore.getItemAsync('authToken');
        if (authToken) {
          setToken(authToken);
        } else {
          console.log('No token found');
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
        Alert.alert('Retrieval Error', 'Failed to retrieve authentication token.');
      }
    };
    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      console.log('Fetching meal plan... with token:', token);
      fetchMealPlan();
    }
  }, [token, fetchMealPlan]);


  // Define the mutation for saving the meal plan
  const [saveMealPlan] = useMutation(SAVE_MEAL_PLAN, {
    context: {
      headers: {
        Authorization: token ? `${token}` : "",
      },
    },
  });

  // Function to save meal plan items to the backend
  const saveMealPlanItems = async () => {
    try {
      const cleanedMealPlanItems = mealPlanItems.map(({ __typename, ...item }) => item);

      await saveMealPlan({
        variables: {
          mealPlanItems: cleanedMealPlanItems,
        },
      });
      console.log("Meal plan saved successfully!");
    } catch (error) {
      console.error("Error saving meal plan:", error.message);
    }
  };

  // Save mealPlanItems whenever it changes
  useEffect(() => {
    if (mealPlanItems.length > 0) {
      saveMealPlanItems();
    }
  }, [mealPlanItems]);

  console.log('mealPlanItems:', mealPlanItems);

  return (
    <ShoppingListContext.Provider
      value={{
        shoppingListItems,
        setShoppingListItems,
        mealPlanItems,
        setMealPlanItems,
        selectedDate,
        setSelectedDate,
        selectedMealType,
        setSelectedMealType,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};
