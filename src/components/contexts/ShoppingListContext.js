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

const GET_SHOPPING_LIST_BY_GROUP = gql`
  query GetShoppingLists {
    getShoppingLists {
      groupId
      shoppingListItems {
        mealId
        uniqueKey
        mealTitle
        mealImage
        ingredients {
          id
          uniqueKey
          name
          amount
          unit
          checked
        }
      }
    }
  }
`;

const SAVE_SHOPPING_LIST = gql`
  mutation SaveShoppingList($shoppingListItems: [ShoppingListInput]!) {
    saveShoppingList(shoppingListItems: $shoppingListItems) {
      groupId
      shoppingListItems {
        mealId
        uniqueKey
        mealTitle
        mealImage
        ingredients {
          id
          uniqueKey
          name
          amount
          unit
          checked
        }
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

  useEffect(() => {
    const getToken = async () => {
      try {
        const authToken = await SecureStore.getItemAsync('authToken');
        if (authToken) {
          console.log('Token context:', authToken);
          setToken(authToken);

        } else {
          console.log('No token found');
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };
    getToken();
  }, []);

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

    // Fetch the user's shopping list items on initial load
    const [fetchShoppingList, { data, loading, error }] = useLazyQuery(GET_SHOPPING_LIST_BY_GROUP, {
      fetchPolicy: 'network-only',
      context: {
        headers: {
          Authorization: token ? `${token}` : '',
        }
      },
    });
  


  useEffect(() => {
    if (token) {
      console.log('Fetching meal plan... with token:', token);
      console.log('Fetching shopping list... with token:', token);
      fetchMealPlan();
      fetchShoppingList();
    }
  }, [token, fetchMealPlan, fetchShoppingList]);


  // Define the mutation for saving the meal plan
  const [saveMealPlan] = useMutation(SAVE_MEAL_PLAN, {
    context: {
      headers: {
        Authorization: token ? `${token}` : "",
      },
    },
  });

   // Define the mutation for saving the shopping list
   const [saveShoppingList] = useMutation(SAVE_SHOPPING_LIST, {
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

  // Function to save shopping list items to the backend
  const saveShoppingListItems = async () => {
    try {
      const cleanedShoppingListItems = shoppingListItems.map(({ __typename, ...item }) => ({
        ...item,
        ingredients: item.ingredients.map(({ __typename, ...ingredient }) => ingredient),
      }));

      await saveShoppingList({
        variables: {
          shoppingListItems: cleanedShoppingListItems,
        },
      });
      console.log("Shopping list saved successfully!");
    } catch (error) {
      console.error("Error saving shopping list:", error.message);
    }
  };

  // Save mealPlanItems whenever it changes
  useEffect(() => {
    if (mealPlanItems.length > 0) {
      saveMealPlanItems();
    }
  }, [mealPlanItems]);


   // Save shoppingListItems whenever it changes
   useEffect(() => {
    if (shoppingListItems.length > 0) {
      saveShoppingListItems();
    }
  }, [shoppingListItems]);

    // Handle shopping list data when fetched
    useEffect(() => {
      if (data) {
        console.log('Fetched data:', data);
        const fetchedItems = data.getShoppingLists?.[0]?.shoppingListItems || [];
        console.log('Shopping list items to set:', fetchedItems);
        setShoppingListItems(fetchedItems);
      }
      if (error) {
        console.error('Error fetching shopping list:', error.message);
      }
    }, [data, error]);
  
  console.log('shoppingListItems:', shoppingListItems);
  //console.log('mealPlanItems:', mealPlanItems);

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
