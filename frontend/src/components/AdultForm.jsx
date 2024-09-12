import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Grid, Card, CardContent, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import studentRecords from '../data/studentRecords.json';
import './AdultForm.css';

const AdultForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    school: '',
    studentName: '',
    role: '',
    engagementPerformance: '',
    effectiveStrategies: '',
    schoolSupport: '',
    existingPrograms: '',
    communication: '',
    involvement: '',
    conflictPatterns: '',
    timesOfDistress: '',
    homeSupportSystems: '',
    externalStressors: '',
  });

  const [names, setNames] = useState([]);
  const [selectedName, setSelectedName] = useState('');

  useEffect(() => {
    // Extract names from student records for the dropdown
    const namesList = studentRecords.map(record => record.name);
    setNames(namesList);
  }, []);

  const handleNameChange = (e) => {
    const name = e.target.value;
    setSelectedName(name);
    const selectedStudent = studentRecords.find(record => record.name === name);
    if (selectedStudent) {
      setFormData({
        ...formData,
        school: selectedStudent.school,
        studentName: selectedStudent.name
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <Container maxWidth="lg" className="adultform-container">
      <Box my={4}>
        <Typography variant="h3" align="center" gutterBottom>
          Adult Input Form
        </Typography>
      </Box>
      <Card className="adultform-card">
        <CardContent>
          <Grid container spacing={3} component="form" noValidate autoComplete="off">
            {/* Name Dropdown */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Name</InputLabel>
                <Select
                  label="Name"
                  value={selectedName}
                  onChange={handleNameChange}
                  required
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* School Field */}
            <Grid item xs={12} md={6}>
              <TextField
                label="School"
                name="school"
                value={formData.school}
                fullWidth
                variant="outlined"
                margin="normal"
                size="medium"
                disabled
              />
            </Grid>

            {/* Email Field */}
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
                size="medium"
              />
            </Grid>

            {/* Student's Name */}
            <Grid item xs={12}>
              <TextField
                label="Student's Name"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
                size="medium"
                disabled
              />
            </Grid>

            {/* Role in Student's Life */}
            <Grid item xs={12}>
              <TextField
                label="What is your role in the student's life (e.g., parent, teacher, dean)"
                name="role"
                value={formData.role}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                size="medium"
              />
            </Grid>

            {/* Engagement and Performance */}
            <Grid item xs={12}>
              <TextField
                label="How do you perceive student's engagement and performance in academic and extracurricular activities?"
                name="engagementPerformance"
                value={formData.engagementPerformance}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                size="medium"
              />
            </Grid>

            {/* Effective Strategies */}
            <Grid item xs={12}>
              <TextField
                label="Have there been any effective strategies or interventions in the past that seemed to help improve Student's behavior or academic performance?"
                name="effectiveStrategies"
                value={formData.effectiveStrategies}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                size="medium"
              />
            </Grid>

            {/* School Support */}
            <Grid item xs={12}>
              <TextField
                label="In what ways do you feel the school could better support Student's social-emotional development?"
                name="schoolSupport"
                value={formData.schoolSupport}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                size="medium"
              />
            </Grid>

            {/* Existing Programs */}
            <Grid item xs={12}>
              <TextField
                label="Are there existing programs or resources at the school that Student has benefited from or could potentially benefit from?"
                name="existingPrograms"
                value={formData.existingPrograms}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                size="medium"
              />
            </Grid>

            {/* Communication */}
            <Grid item xs={12}>
              <TextField
                label="How would you describe the communication between the school and home regarding Student's progress and challenges?"
                name="communication"
                value={formData.communication}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                size="medium"
              />
            </Grid>

            {/* Involvement */}
            <Grid item xs={12}>
              <TextField
                label="Are there ways you'd like to be more involved or informed about Student's education and support plan?"
                name="involvement"
                value={formData.involvement}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                size="medium"
              />
            </Grid>

            {/* Conflict Patterns */}
            <Grid item xs={12}>
              <TextField
                label="Have you noticed any patterns or triggers related to Student's conflicts or challenging behaviors?"
                name="conflictPatterns"
                value={formData.conflictPatterns}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                size="medium"
              />
            </Grid>

            {/* Times of Distress */}
            <Grid item xs={12}>
              <TextField
                label="Are there particular times of day, week, or situations when Student seems more distressed or prone to conflicts?"
                name="timesOfDistress"
                value={formData.timesOfDistress}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                size="medium"
              />
            </Grid>

            {/* Home Support Systems */}
            <Grid item xs={12}>
              <TextField
                label="Can you describe the support systems and dynamics within the home environment that might impact Student's behavior and emotional well-being?"
                name="homeSupportSystems"
                value={formData.homeSupportSystems}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                size="medium"
              />
            </Grid>

            {/* External Stressors */}
            <Grid item xs={12}>
              <TextField
                label="Are there external stressors affecting the family that might also be influencing Student?"
                name="externalStressors"
                value={formData.externalStressors}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                size="medium"
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                size="large"
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdultForm;
