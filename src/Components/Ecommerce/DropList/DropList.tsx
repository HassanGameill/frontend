import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const DropList = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel sx={{ color: "white" }} id="demo-simple-select-label">Selected</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
          sx={{ color: "white" }}
        >
          <MenuItem value={10}>Profile</MenuItem>
          <MenuItem value={20}>Orders</MenuItem>
          <MenuItem value={30}>Cart</MenuItem>
          <MenuItem value={40}>Logout</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}


export default DropList;