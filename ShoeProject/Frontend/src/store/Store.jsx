import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set, get) => ({
    user: null,
    token: localStorage.getItem('authToken'),
    userId: null,
    productDetails: [],

    // Fetch user data
    fetchUserData: async () => {
        const { userId, token, logout } = get();
        try {
            const response = await axios.get(`http://localhost:8000/api/user/get/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            set({ user: response.data.userDetail });
        } catch (error) {
            console.error('Failed to load user data:', error);
            logout();
        }
    },

    // Login function
    login: (data) => {
        try {
            const { token, userData } = data;
            set({
                token,
                userId: userData._id,
            });
            localStorage.setItem('authToken', token);
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    },

    // Logout function
    logout: () => {
        set({ user: null, token: null, userId: null });
        localStorage.removeItem('authToken');
    },

    // Check if the user is authenticated
    checkAuthentication: (navigate) => {
        const { user } = get();
        if (!user) {
            navigate('/signup');
            return false;
        }
        return true;
    },

    // Add item to wishlist
    addToWishlist: async (productId, navigate) => {
        const { userId, token, checkAuthentication, fetchUserData, productDetails } = get();
        console.log("productDetails are:", productDetails);
        if (!checkAuthentication(navigate)) return;

        try {
            const productResponse = await axios.get(`http://localhost:8000/api/product/get/${productId}`);
            const productData = productResponse.data;

            await axios.post(
                `http://localhost:8000/api/wish/addWish/${userId}/${productId}`,
                { productId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            set({ productDetails: [...productDetails, productData] });
            fetchUserData();
        } catch (error) {
            console.error('Failed to add to wishlist:', error);
        }
    },

    // Remove item from wishlist
    removeFromWishlist: async (productId, navigate) => {
        const { userId, token, checkAuthentication, fetchUserData, productDetails } = get();
        if (!checkAuthentication(navigate)) return;

        try {
            await axios.delete(`http://localhost:8000/api/wish/delWish/${userId}/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            set({ productDetails: productDetails.filter(product => product._id !== productId) });
            fetchUserData();
        } catch (error) {
            console.error('Failed to remove from wishlist:', error);
        }
    },

    // Purchase product
    purchaseProduct: async (productId, shippingDetails, paymentDetails, navigate) => {
        const { token, checkAuthentication, fetchUserData } = get();
        if (!checkAuthentication(navigate)) return;

        try {
            await axios.post(
                '/api/user/purchase',
                { productId, shippingDetails, paymentDetails },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchUserData();
        } catch (error) {
            console.error('Failed to purchase product:', error);
        }
    },

    // Update product details
    updateProductDetails: async (productId, updatedDetails, navigate) => {
        const { token, checkAuthentication, fetchUserData } = get();
        if (!checkAuthentication(navigate)) return;

        try {
            await axios.put(
                `/api/products/${productId}`,
                updatedDetails,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchUserData();
        } catch (error) {
            console.error('Failed to update product details:', error);
        }
    },
}));

export default useAuthStore;
