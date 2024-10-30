import create from 'zustand';
import { dummyProducts } from '../../public/Data';

// Define the Zustand store
const useCartStore = create((set) => ({
    cart: [], // Initialize cart as empty
    item: dummyProducts || [], // Initialize with dummy products or empty

    // Add item to the cart
    addItem: (product, quantity) => 
        set((state) => {
            const existingItem = state.cart.find(item => item.id === product.id);
            if (existingItem) {
                // If it exists, update the quantity
                return {
                    cart: state.cart.map(item => 
                        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                    ),
                };
            } else {
                // If it doesn't exist, add the new item with the quantity
                return {
                    cart: [...state.cart, { ...product, quantity }],
                };
            }
        }),

    // Edit an item in the cart by ID
    editItem: (updatedItem) => 
        set((state) => ({
            cart: state.cart.map(item => item.id === updatedItem.id ? updatedItem : item),
        })),

    // Delete an item from the cart by ID
    deleteItem: (id) => 
        set((state) => ({
            cart: state.cart.filter(item => item.id !== id),
        })),

    // Clear the cart
    clearCart: () => 
        set({ cart: [] }),
}));

export default useCartStore;
