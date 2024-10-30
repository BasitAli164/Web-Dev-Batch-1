import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [userId, setUserId] = useState(null);

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/api/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
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
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/login', { email, password });
      const { token, userData } = response.data;

      setToken(token);
      setUserId(userData._id); // Assume userData contains the user's ID
      setUser(userData);
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

  // Add item to wishlist
  const addToWishlist = async (productId) => {
    try {
      await axios.post(
        '/api/user/wishlist',
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUserData(); // Update user data after modification
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
    }
  };

  // Remove item from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`/api/user/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUserData(); // Update user data after modification
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  // Purchase product
  const purchaseProduct = async (productId, shippingDetails, paymentDetails) => {
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
    isAuthenticated: !!user,
    addToWishlist,
    removeFromWishlist,
    purchaseProduct,
    updateProductDetails,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
