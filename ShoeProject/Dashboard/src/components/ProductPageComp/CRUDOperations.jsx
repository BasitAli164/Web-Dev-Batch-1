import axios from 'axios';

const CRUDOperations = {
  addProduct: (productData, setProducts) => {
    axios.post('http://localhost:8000/api/product/add', productData)
      .then(response => setProducts(prev => [...prev, response.data]))
      .catch(error => console.error('Error adding product:', error));
  },

  updateProduct: (productData, setProducts, currentProduct) => {
    axios.put(`http://localhost:8000/api/product/update/${currentProduct._id}`, productData)
      .then(response => setProducts(prev => prev.map(prod => prod._id === currentProduct._id ? response.data : prod)))
      .catch(error => console.error('Error updating product:', error));
  },

  deleteProduct: (productId, setProducts) => {
    axios.delete(`http://localhost:8000/api/product/del/${productId}`)
      .then(() => setProducts(prev => prev.filter(prod => prod._id !== productId)))
      .catch(error => console.error('Error deleting product:', error));
  },

  getProductDetails: (productId, setCurrentProduct, setIsDetailDialogOpen) => {
    axios.get(`http://localhost:8000/api/product/get/${productId}`)
      .then(response => {
        setCurrentProduct(response.data);
        setIsDetailDialogOpen(true);
      })
      .catch(error => console.error('Error fetching product details:', error));
  }
};

export default CRUDOperations;
