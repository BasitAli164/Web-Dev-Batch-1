import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Avatar,
  Typography,
  Tooltip,
  Divider,
  Box,
  IconButton,
  TextField,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  Settings as SettingsIcon,
  ShoppingCart as ShoppingCartIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [openOrders, setOpenOrders] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false); // State to track collapse

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);
  const toggleCollapse = () => setIsCollapsed((prev) => !prev); // Toggle collapse state
  const toggleOrders = () => setOpenOrders((prev) => !prev);
  const toggleProducts = () => setOpenProducts((prev) => !prev);
  const handleSearchChange = (event) => setSearchQuery(event.target.value);

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Customers', icon: <PeopleIcon />, path: '/users' },
    { text: 'Products', icon: <InventoryIcon />, onClick: toggleProducts, isGroup: true },
    { text: 'Orders', icon: <ShoppingCartIcon />, onClick: toggleOrders, isGroup: true },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  const productSubItems = [
    { text: 'View All', path: '/products' },
    { text: 'Add New', path: '/products/add' },
  ];

  const orderSubItems = [
    { text: 'View Orders', path: '/orders' },
    { text: 'Order History', path: '/orders/history' },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
        sx={{
          '& .MuiDrawer-paper': {
            width: isCollapsed ? 95 : 250, // Conditionally change the width
            backgroundColor: '#3f51b5',
            color: '#fff',
            border: 'none',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            height: '100vh',
            transition: 'width 0.3s', // Smooth transition
          },
        }}
      >
        <Box
          sx={{
            padding: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header section with Avatar and Menu Icon */}
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar src="path_to_your_image.jpg" sx={{ marginRight: 1 }} />
            {!isCollapsed && (
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                SalesMen
              </Typography>
            )}
            <IconButton onClick={toggleCollapse} sx={{ marginLeft: 'auto' }}>
              <MenuIcon sx={{ color: '#fff' }} /> {/* Toggle Collapse */}
            </IconButton>
          </Box>
          <Divider sx={{ marginBottom: 1, backgroundColor: '#fff' }} />

          {/* Search bar */}
          {!isCollapsed && (
            <TextField
              variant="outlined"
              placeholder="Search..."
              fullWidth
              size="small"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ mb: 2, '& .MuiOutlinedInput-root': { backgroundColor: '#fff' } }}
            />
          )}

          {/* Menu List */}
          <List>
            {filteredMenuItems.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem
                  button
                  onClick={item.onClick}
                  component={item.path ? Link : 'div'}
                  to={item.path}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#ffffff1f',
                    },
                    backgroundColor: item.isActive ? '#ffffff1f' : 'transparent',
                  }}
                >
                  <ListItemIcon sx={{ color: '#fff' }}>
                    <Tooltip title={item.text} arrow>
                      <Box sx={{ color: '#fff' }}>{item.icon}</Box>
                    </Tooltip>
                  </ListItemIcon>
                  {!isCollapsed && <ListItemText primary={item.text} />} {/* Show text only when expanded */}
                  {item.isGroup && (
                    item === menuItems[2] ? (openProducts ? <ExpandLess /> : <ExpandMore />) :
                    (openOrders ? <ExpandLess /> : <ExpandMore />)
                  )}
                </ListItem>
                {item.isGroup && (
                  <Collapse in={item.text === 'Products' ? openProducts : openOrders} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {(item.text === 'Products' ? productSubItems : orderSubItems).map((subItem, subIndex) => (
                        <ListItem
                          button
                          component={Link}
                          to={subItem.path}
                          key={subIndex}
                          sx={{
                            pl: 4,
                            '&:hover': {
                              backgroundColor: '#ffffff1f',
                            },
                          }}
                        >
                          <ListItemText primary={subItem.text} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
                <Divider sx={{ backgroundColor: '#fff' }} />
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
