    import React from 'react';
    import { MaterialReactTable } from 'material-react-table';
    import { Box, IconButton, useTheme } from '@mui/material';
    import { Edit, Delete, Visibility } from '@mui/icons-material';

    const ProductList = ({ products, onEdit, onDelete, onViewDetails }) => {
    const theme = useTheme();  // To access theme breakpoints
    const columns = [
        {
        header: 'Actions',
        size: 100,
        Cell: ({ row }) => (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Visibility color="info" onClick={() => onViewDetails(row.original)} sx={{ cursor: 'pointer', marginRight: 1 }} />
            <Edit color="primary" onClick={() => onEdit(row.original)} sx={{ cursor: 'pointer', marginRight: 1 }} />
            <Delete color="error" onClick={() => onDelete(row.original._id)} sx={{ cursor: 'pointer' }} />
            </Box>
        ),
        },
        { accessorKey: 'productName', header: 'Product Name', size: 140 },
        { accessorKey: 'productDescription', header: 'Description', size: 180 },
        { accessorKey: 'category', header: 'Category', size: 100 },
        { accessorKey: 'brand', header: 'Brand', size: 100 },
        { accessorKey: 'color', header: 'Color', size: 80 },
        
        // More columns if needed
    ];

    return (
        <Box sx={{ overflow: 'hidden', width: '100%' }}>
        <MaterialReactTable
            columns={columns}
            data={products}
            enableSorting
            enablePagination
            muiTablePaperProps={{
            sx: {
                overflowX: 'auto',
                maxWidth: '100%',
                maxHeight: 'calc(100vh - 160px)',
                '@media (max-width: 768px)': {
                maxHeight: 'calc(100vh - 200px)', // Adjust for mobile view
                },
            },
            }}
            muiTableContainerProps={{
            sx: {
                maxHeight: 'calc(100vh - 160px)',
                overflowX: 'auto',
                overflowY: 'auto',
                position: 'relative',
                '&::-webkit-scrollbar': {
                width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                background: theme.palette.grey[200],
                },
                '&::-webkit-scrollbar-thumb': {
                background: theme.palette.primary.main,
                borderRadius: '8px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                background: theme.palette.primary.dark,
                },
                '@media (max-width: 768px)': {
                maxHeight: 'calc(100vh - 250px)', // Adjust for smaller devices
                },
            },
            }}
            muiTableHeadProps={{
            sx: {
                position: 'sticky',
                top: 0,
                backgroundColor: 'white',
                zIndex: 1,
            },
            }}
        />
        </Box>
    );
    };

    export default ProductList;
