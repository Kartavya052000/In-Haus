import React, { createContext, useState } from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_MEAL_PLAN_BY_GROUP = gql`
  query GetMealPlanByGroup($groupId: ID!) {
    getMealPlanByGroup(groupId: $groupId) {
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
  const [selectedDate, setSelectedDate] = React.useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedMealType, setSelectedMealType] = useState([]);

  
console.log('mealPlanItems:', mealPlanItems)
  return (
    <ShoppingListContext.Provider value={{ shoppingListItems, setShoppingListItems, mealPlanItems, setMealPlanItems, selectedDate,  setSelectedDate, selectedMealType, setSelectedMealType }}>
      {children}
    </ShoppingListContext.Provider>
  );
};