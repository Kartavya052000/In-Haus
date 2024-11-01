import React, { createContext, useState } from 'react';

// Create a context
export const ShoppingListContext = createContext();

// Create a provider component
export const ShoppingListProvider = ({ children }) => {
  const [shoppingListItems, setShoppingListItems] = useState([]);
  const [mealPlanItems, setMealPlanItems] = useState([]);

  return (
    <ShoppingListContext.Provider value={{ shoppingListItems, setShoppingListItems, mealPlanItems, setMealPlanItems }}>
      {children}
    </ShoppingListContext.Provider>
  );
};