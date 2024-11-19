import React, { useEffect, useState } from 'react';
import { Button, IconButton } from '@mui/material';
import { MaterialReactTable } from 'material-react-table'; // Import MRT
import AddProductComponent from '../components/newProductpageComp/AddProductComponent';
import ViewProductById from '../components/newProductpageComp/ViewProductById';
import UpdateProductById from '../components/newProductpageComp/UpdateProductById';
import DeleteProductById from '../components/newProductpageComp/DeleteProductById';
import useProductStore from '../stores/useProductStore';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'; // Import axios

const ProductPage = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { products = [], setProducts } = useProductStore();  // Get products and setProducts from store

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products using axios
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8000/api/product/get');
      console.log("Fetched Data:", res.data);
      if (res.data && res.data.result) {
        setProducts(res.data.result); // Set products from the API response
      } else {
        console.error("Unexpected response structure:", res.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (productId) => {
    setSelectedProduct(products.find((p) => p._id === productId));  // Changed to _id
    setOpenViewDialog(true);
  };

  const handleEdit = (productId) => {
    setSelectedProduct(products.find((p) => p._id === productId));  // Changed to _id
    setOpenUpdateDialog(true);
  };

  const handleDelete = (productId) => {
    setSelectedProduct(products.find((p) => p._id === productId));  // Changed to _id
    setOpenDeleteDialog(true);
  };

  const columns = [
    {
      header: 'Action',
      // Remove accessorKey, render custom buttons directly in the Cell function
      Cell: ({ row }) => (
        <>
          <IconButton onClick={() => handleView(row.original._id)} title="View Product">
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => handleEdit(row.original._id)} title="Edit Product">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(row.original._id)} title="Delete Product">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
    {
      header: 'Product Image',
      accessorFn: (row) => {
        console.log("row:", row);
        const images = row?.images ?? [];  // Fallback to an empty array if images is null/undefined
        return images.length > 0 ? images[0] : null;
      },
      Cell: ({ cell }) => {
        const imageUrl = cell.getValue();
        console.log("imageUrl:", imageUrl);
    
        // Ensure the image URL uses forward slashes for paths
        const formattedImageUrl = imageUrl?.replace(/\\/g, '/');
        console.log("Formatted Image URL:", formattedImageUrl);
    
        // Check if the image URL is valid
        if (!formattedImageUrl) {
          return (
            <img 
              src="https://via.placeholder.com/50" 
              alt="No image available" 
              width={50} 
              height={50} 
            />
          );
        }
    
        // If the formatted URL starts with 'media/', prepend the base URL
        const fullImageUrl = formattedImageUrl.startsWith('media/')
          ? `http://localhost:8000/${formattedImageUrl}`
          : formattedImageUrl;
    
        // Check the full URL for debugging
        console.log("Full Image URL:", fullImageUrl);
    
        // Attempt to display the image
        return (
          <img
            src={fullImageUrl}
            alt="Product Image"
            width={50}
            height={50}
            onError={(e) => {
              // Fallback to a placeholder if the image doesn't load
              e.target.src = "https://via.placeholder.com/50";
            }}
          />
        );
      },
    }
    ,
    
    
    
    
    
    {
      header: 'Product Name',
      accessorKey: 'productName',  // Ensure that 'productName' exists on each row
    },
    {
      header: 'Stock',
      accessorKey: 'subcategory',
      Cell: ({ row }) => {
        const subcategory = row.original.productSubcategory; // Access subcategory from the product
        return subcategory ? subcategory.stock : 'N/A';  // Handle cases where stock is not available
      },
    },
    {
      header: 'Category',
      accessorKey: 'category',  // Assuming 'category' exists on each product
      Cell: ({ cell }) => cell.getValue() || 'N/A',  // Provide fallback for undefined values
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '150px', 
        marginTop: '100px', 
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Button
        onClick={() => setOpenAddDialog(true)}
        variant="contained"
        style={{
          marginBottom: '16px',
          alignSelf: 'flex-start',
        }}
      >
        Add New Product
      </Button>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ flex: 1, overflow: 'auto', marginTop: '16px' }}>
          {products.length > 0 ? (
            <MaterialReactTable
              columns={columns}
              data={products}
              enableColumnOrdering
              enableSorting
              enablePagination
              enableColumnFilters
              enableGlobalFilter
              positionGlobalFilter="top"
              style={{
                width: '100%',
                overflow: 'auto',
              }}
            />
          ) : (
            <p>No products available</p>
          )}
        </div>
      )}

      {/* Dialogs for add, view, update, delete */}
      <AddProductComponent open={openAddDialog} onClose={() => setOpenAddDialog(false)} />
      <ViewProductById open={openViewDialog} onClose={() => setOpenViewDialog(false)} product={selectedProduct} />
      <UpdateProductById open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)} product={selectedProduct} />
      <DeleteProductById
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        product={selectedProduct}
        setProducts={setProducts} 
      />
    </div>
  );
};

export default ProductPage;
