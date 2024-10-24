import React, { createContext, useState } from 'react';

// Create a context
export const ShoppingListContext = createContext();

// Create a provider component
export const ShoppingListProvider = ({ children }) => {
  const [shoppingListItems, setShoppingListItems] = useState([]);

  return (
    <ShoppingListContext.Provider value={{ shoppingListItems, setShoppingListItems }}>
      {children}
    </ShoppingListContext.Provider>
  );
};
