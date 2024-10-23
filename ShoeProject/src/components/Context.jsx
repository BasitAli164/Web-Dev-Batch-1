import { createContext, useContext, useState } from 'react';
import { dummyProducts } from '../../public/Data';

// CartContext
const CartContext = createContext();

// CartProvider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Initialize cart as empty
  const [item, setItem] = useState(dummyProducts || []);

  // Add item to the cart
  const addItem = (product, quantity) => {
    // Check if the item is already in the cart
    const existingItem = cart.find(item => item.id === product.id);
  
    if (existingItem) {
      // If it exists, update the quantity
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      ));
    } else {
      // If it doesn't exist, add the new item with the quantity
      setCart([...cart, { ...product, quantity }]);
    }
  };
  // Edit an item in the cart by ID
  const editItem = (updatedItem) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  // Delete an item from the cart by ID
  const deleteItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, item, addItem, editItem, deleteItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext
export const useCart = () => useContext(CartContext);
