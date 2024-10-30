import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [userId, setUserId] = useState(null);
    const [productDetails, setProductDetails] = useState([]); // Store product details for wishlist

    const navigate = useNavigate(); // Initialize navigate

    // Function to fetch user data
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/user/get/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // console.log("response", response.data)
            setUser(response.data.userDetail);
        } catch (error) {
            console.error('Failed to load user data:', error);
            logout();
        }
    };

    useEffect(() => {
        if (token && userId) {
            fetchUserData();
        }
    }, [token, userId]);

    // Login function
    const login = (data) => {
        // console.log(data)
        try {

            const { token, userData } = data;
            //   console.log('data',token, userData);

            setToken(token);
            setUserId(userData._id); // Assume userData contains the user's ID
            //   setUser(userData);
            localStorage.setItem('authToken', token);

            return true;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    // Logout function
    const logout = () => {
        setUser(null);
        setToken(null);
        setUserId(null);
        localStorage.removeItem('authToken');
    };

    // Check if the user is authenticated
    const checkAuthentication = () => {
        if (!user) {
            navigate('/signup'); // Redirect to SignUp page if not authenticated
            return false; // Indicate user is not authenticated
        }
        return true; // User is authenticated
    };

    // Add item to wishlist
    const addToWishlist = async (productId) => {
        // console.log("productId", productId)
        // console.log("userId from auth", userId)
        if (!checkAuthentication()) return ; // Check authentication before proceeding

        try {
            const productResponse = await axios.get(`http://localhost:8000/api/product/get/${productId}`); // Fetch product details
            const productData = productResponse.data; // Assume the product details are here

            await axios.post(
                `http://localhost:8000/api/wish/addWish/${userId}/${productId}`,
                { productId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setProductDetails((prevDetails) => [...prevDetails, productData]); // Update state with new product details
            fetchUserData(); // Update user data after modification
        } catch (error) {
            console.error('Failed to add to wishlist:', error);
        }
    };

    // Remove item from wishlist
    const removeFromWishlist = async (productId) => {
        if (!checkAuthentication()) return; // Check authentication before proceeding

        try {
            await axios.delete(`http://localhost:8000/api/wish/delWish/${userId}/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProductDetails((prevDetails) => prevDetails.filter(product => product._id !== productId)); // Remove product details

            fetchUserData(); // Update user data after modification
        } catch (error) {
            console.error('Failed to remove from wishlist:', error);
        }
    };

    // Purchase product
    const purchaseProduct = async (productId, shippingDetails, paymentDetails) => {
        if (!checkAuthentication()) return; // Check authentication before proceeding

        try {
            await axios.post(
                '/api/user/purchase',
                { productId, shippingDetails, paymentDetails },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchUserData(); // Update user data after modification
        } catch (error) {
            console.error('Failed to purchase product:', error);
        }
    };

    // Update product details
    const updateProductDetails = async (productId, updatedDetails) => {
        if (!checkAuthentication()) return; // Check authentication before proceeding

        try {
            await axios.put(
                `/api/products/${productId}`,
                updatedDetails,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchUserData(); // Update user data after modification
        } catch (error) {
            console.error('Failed to update product details:', error);
        }
    };

    const value = {
        user,
        token,
        userId,
        login,
        logout,
        productDetails,
        isAuthenticated: !!user,
        addToWishlist,
        removeFromWishlist,
        purchaseProduct,
        updateProductDetails,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
