// src/components/Sidebar.js
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
  Popover,
  Button,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  Settings as SettingsIcon,
  ShoppingCart as ShoppingCartIcon,
  ExpandLess,
  ExpandMore,
  MoreVert,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [openOrders, setOpenOrders] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleOrders = () => setOpenOrders(prev => !prev);
  const toggleProducts = () => setOpenProducts(prev => !prev);
  const handleSearchChange = event => setSearchQuery(event.target.value);
  const handleUserMenuClick = event => setAnchorEl(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorEl(null);

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Users', icon: <PeopleIcon />, path: '/users' },
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

  const filteredMenuItems = menuItems.filter(item =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="persistent"
        anchor="left"
        open={true} // Sidebar is permanently open
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
            backgroundColor: '#3f51b5',
            color: '#fff',
            border: 'none',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <Box sx={{ padding: 2, height: '100vh' }}>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar src="path_to_your_image.jpg" sx={{ marginRight: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Username</Typography>
            <IconButton onClick={handleUserMenuClick} sx={{ marginLeft: 'auto' }}>
              <MoreVert />
            </IconButton>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleCloseUserMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'darkblue' }}>
                <Button sx={{color:"white",margin:1,backgroundColor:"gray"}} variant='outlined'  > Profile</Button><br />
                <Button sx={{color:"white",margin:1,backgroundColor:"gray"}} variant='outlined'> Logout</Button>
              </Box>
            </Popover>
          </Box>
          <Divider sx={{ marginBottom: 1, backgroundColor: '#fff' }} />
          <TextField
            variant="outlined"
            placeholder="Search..."
            fullWidth
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ mb: 2, '& .MuiOutlinedInput-root': { backgroundColor: '#fff' } }}
          />
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
                  <ListItemText primary={item.text} />
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
