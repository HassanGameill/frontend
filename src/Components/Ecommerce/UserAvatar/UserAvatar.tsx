import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';

const UserAvatar = () => {
  return (
    <Stack direction="row" spacing={2}>
    
     <Avatar sx={{ bgcolor: deepPurple[500] }}>H</Avatar>
      {/*
        <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
      */}
      
      
      
      <i className="ri-arrow-left-s-line"></i>
      <i className="ri-arrow-right-s-line"></i>
      <i className="ri-user-line"></i>
      <i className="ri-user-3-fill"></i>
      <i className="ri-search-line"></i>
      <i className="ri-shopping-cart-line"></i>
      <i className="ri-discount-percent-line"></i>
      <i className="ri-map-pin-line"></i>
      <i className="ri-map-pin-2-fill"></i>
      <i className="ri-notification-fill"></i>
     <i className="ri-settings-4-line"></i>
      <i className="ri-settings-4-fill"></i>
      <i className="ri-lock-password-line"></i>
      <i className="ri-lock-password-fill"></i>
      
      <i className="ri-cash-line"></i>
      <i className="ri-bank-card-fill"></i>
      <i className="ri-wallet-2-fill"></i>
      
      <i className="ri-bank-card-2-fill"></i>
      <i className="ri-refund-fill"></i>
      <i className="ri-folder-6-fill"></i>
      
      <i className="ri-wallet-line"></i>
      
      
      <i className="ri-arrow-right-circle-fill"></i>
      <i className="ri-arrow-right-circle-line"></i>
      <i className="ri-arrow-left-circle-line"></i>
      <i className="ri-arrow-left-circle-fill"></i>
      <i className="ri-skip-right-fill"></i>
      <i className="ri-skip-left-line"></i>
      
      <i className="ri-login-box-line"></i>
    </Stack>
  );
}


export default UserAvatar;