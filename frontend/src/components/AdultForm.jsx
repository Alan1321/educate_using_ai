import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Grid, Card, CardContent, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import studentRecords from '../data/studentRecords.json';
import './AdultForm.css';
import axios from 'axios';

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
  const [selectedStudent, setSelectedStudent] = useState('');

  useEffect(() => {
    // Extract names from student records for the dropdown
    const namesList = studentRecords.map(record => record.name);
    setNames(namesList);
  }, []);

  const handleStudentChange = (e) => {
    const studentName = e.target.value;
    setSelectedStudent(studentName);
    const selectedStudentRecord = studentRecords.find(record => record.name === studentName);
    if (selectedStudentRecord) {
      setFormData({
        ...formData,
        school: selectedStudentRecord.school,
        studentName: selectedStudentRecord.name,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const params = {
        timestamp: new Date().toISOString(),
        ...formData,
      };

      const response = await axios.get('http://localhost:3000/api/v1/saveAdultData', { params });

      console.log('API Response:', response.data);

      setFormData({
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
    } catch (error) {
      console.error('API Error:', error);
    }
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
            {/* Name Input */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
                size="medium"
              />
            </Grid>

            {/* Email Field */}
            <Grid item xs={12} md={6}>
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

            {/* Student's Name Dropdown */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Student's Name</InputLabel>
                <Select
                  label="Student's Name"
                  value={selectedStudent}
                  onChange={handleStudentChange}
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
                label="How do you perceive the student's engagement and performance in academic and extracurricular activities?"
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
                label="Have there been any effective strategies or interventions in the past that seemed to help improve the student's behavior or academic performance?"
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
                label="In what ways do you feel the school could better support the student's social-emotional development?"
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
                label="Are there existing programs or resources at the school that the student has benefited from or could potentially benefit from?"
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
                label="How would you describe the communication between the school and home regarding the student's progress and challenges?"
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
                label="Are there ways you'd like to be more involved or informed about the student's education and support plan?"
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
                label="Have you noticed any patterns or triggers related to the student's conflicts or challenging behaviors?"
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
                label="Are there particular times of day, week, or situations when the student seems more distressed or prone to conflicts?"
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
                label="Can you describe the support systems and dynamics within the home environment that might impact the student's behavior and emotional well-being?"
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
                label="Are there external stressors affecting the family that might also be influencing the student?"
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
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                fullWidth
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
