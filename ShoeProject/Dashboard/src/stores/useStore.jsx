import create from 'zustand';
import axios from 'axios';

// Zustand store for managing products globally
const useStore = create((set) => ({
  products: [],
  currentProduct: null,
  isAddDialogOpen: false,
  isUpdateDialogOpen: false,

  // Actions
  setProducts: (products) => set({ products }),
  setCurrentProduct: (product) => set({ currentProduct: product }),
  toggleAddDialog: () => set((state) => ({ isAddDialogOpen: !state.isAddDialogOpen })),
  toggleUpdateDialog: () => set((state) => ({ isUpdateDialogOpen: !state.isUpdateDialogOpen })),

  // CRUD Operations
  fetchProducts: async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/product/get');
      set({
        products: response.data.result.map((product) => ({
          ...product,
          brand: product.Subcategory?.brand,
          color: product.Subcategory?.color,
          size: product.Subcategory?.size,
          sku: product.Subcategory?.sku,
          stock: product.Subcategory?.stock,
          price: product.Subcategory?.price,
        })),
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },

  addProduct: async (productData) => {
    try {
      const response = await axios.post('http://localhost:8000/api/product/add', productData);
      set((state) => ({
        products: [...state.products, response.data],
      }));
    } catch (error) {
      console.error('Error adding product:', error);
    }
  },

  updateProduct: async (productData, currentProduct) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/product/update/${currentProduct.id}`,
        productData
      );
      set((state) => ({
        products: state.products.map((prod) => (prod.id === currentProduct.id ? response.data : prod)),
      }));
    } catch (error) {
      console.error('Error updating product:', error);
    }
  },

  deleteProduct: async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/product/del/${productId}`);
      set((state) => ({
        products: state.products.filter((prod) => prod.id !== productId),
      }));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  },

  getProductDetails: async (productId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/product/get/${productId}`);
      set({ currentProduct: response.data });
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  },
}));

export default useStore;
