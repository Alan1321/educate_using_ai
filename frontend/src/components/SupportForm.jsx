import React, { useState } from 'react';
import { TextField, Checkbox, FormControlLabel, FormGroup, MenuItem, Select, InputLabel, FormControl, Button, Box, Typography } from '@mui/material';
import './SupportForm.css';

const SupportForm = () => {
  const [selectedSupportTypes, setSelectedSupportTypes] = useState({
    fundraising: false,
    tutoring: false,
    ostProgramming: false,
    otherCheckbox: false,
    otherText: ''
  });

  const [city, setCity] = useState('');

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedSupportTypes((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleOtherTextChange = (event) => {
    setSelectedSupportTypes((prev) => ({
      ...prev,
      otherText: event.target.value,
    }));
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Selected Support Types:', selectedSupportTypes);
    console.log('Selected City:', city);
  };

  return (
    <Box className="form-container" component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>Support Type</Typography>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={selectedSupportTypes.fundraising} onChange={handleCheckboxChange} name="fundraising" />}
          label="Fundraising"
        />
        <FormControlLabel
          control={<Checkbox checked={selectedSupportTypes.tutoring} onChange={handleCheckboxChange} name="tutoring" />}
          label="Tutoring"
        />
        <FormControlLabel
          control={<Checkbox checked={selectedSupportTypes.ostProgramming} onChange={handleCheckboxChange} name="ostProgramming" />}
          label="Ost Programming"
        />
        <Box className="other-option">
          <FormControlLabel
            control={<Checkbox checked={selectedSupportTypes.otherCheckbox} onChange={handleCheckboxChange} name="otherCheckbox" />}
            label="Other"
          />
          {selectedSupportTypes.otherCheckbox && (
            <TextField
              variant="outlined"
              size="small"
              placeholder="Specify Other"
              value={selectedSupportTypes.otherText}
              onChange={handleOtherTextChange}
            />
          )}
        </Box>
      </FormGroup>

      <Typography variant="h4" gutterBottom>Area</Typography>
      <FormControl fullWidth>
        <InputLabel id="area-label">Select City</InputLabel>
        <Select
          labelId="area-label"
          value={city}
          onChange={handleCityChange}
          label="Select City"
        >
          <MenuItem value="Chicago">Chicago</MenuItem>
          <MenuItem value="Niles">Niles</MenuItem>
          <MenuItem value="Nashville">Nashville</MenuItem>
          <MenuItem value="Huntsville">Huntsville</MenuItem>
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" color="primary" className="submit-btn">
        Submit
      </Button>
    </Box>
  );
};

export default SupportForm;
