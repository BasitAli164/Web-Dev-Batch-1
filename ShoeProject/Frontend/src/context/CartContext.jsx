// import { createContext, useContext, useState } from 'react';
// import { dummyProducts } from '../../public/Data';

// // CartContext
// const CartContext = createContext();

// // CartProvider component
// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]); // Initialize cart as empty
//   const [item, setItem] = useState(dummyProducts || []);

//   // Add item to the cart
//   const addItem = (product, quantity) => {
//     console.log("product and Quantity:",product,quantity)
//     // Check if the item is already in the cart
//     const existingItem = cart.find(item => item.id === product.id);
  
//     if (existingItem) {
//       // If it exists, update the quantity
//       setCart(cart.map(item => 
//         item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
//       ));
//     } else {
//       // If it doesn't exist, add the new item with the quantity
//       setCart([...cart, { ...product, quantity }]);
//     }
//   };
//   // Edit an item in the cart by ID
//   const editItem = (updatedItem) => {
//     setCart((prevCart) =>
//       prevCart.map((item) => (item.id === updatedItem.id ? updatedItem : item))
//     );
//   };

//   // Delete an item from the cart by ID
//   const deleteItem = (id) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== id)||[]);
//   };

//   // Clear the cart
//   const clearCart = () => {
//     setCart([]);
//   };

//   return (
//     <CartContext.Provider value={{ cart, item, addItem, editItem, deleteItem, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Custom hook to use CartContext
// export const  useCart = () => useContext(CartContext);

import {create} from 'zustand';

export const useCartStore = create((set) => ({
  cart: [], // Initialize cart as empty

  // Add item to the cart
  addItem: (product, quantity) => set((state) => {
    const existingItem = state.cart.find((item) => item._id === product._id); // Change 'id' to the correct property
  
    if (existingItem) {
      // If item exists, update the quantity
      return {
        cart: state.cart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
        ),
      };
    } else {
      // If it doesn't exist, add the new item with the quantity
      return {
        cart: [...state.cart, { ...product, quantity }], // Ensure that 'product' contains all necessary fields
      };
    }
  }),
  

  // Edit an item in the cart by ID
  editItem: (updatedItem) => set((state) => ({
    cart: state.cart.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    ),
  })),

  // Delete an item from the cart by ID
  deleteItem: (id) => set((state) => ({
    cart: state.cart.filter((item) => item._id !== id),
  })),

  // Clear the cart
  clearCart: () => set({ cart: [] }),
}));

// Usage in components:
// import { useCartStore } from './path-to-store';
// const { cart, addItem, editItem, deleteItem, clearCart } = useCartStore();
