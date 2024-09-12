import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, Card, CardContent, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import jsPDF from 'jspdf';
import './Iselp.css';
import schoolsData from "../data/schoolsData.json";

const Iselp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    school: '',
    email: '',
    hobbies: '',
    favoriteSubjects: '',
    goals: '',
    schoolImpact: '',
    schoolExperience: '',
    desiredChanges: '',
    conflictTriggers: '',
    feelingsAboutConflicts: '',
    gradeLevel: '',
  });
  const [loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const timestamp = new Date().toISOString();
      const response = await axios.get('http://localhost:3000/api/v1/gpt-response/iselp', {
        params: {
          timestamp,
          name: `${formData.firstName} ${formData.lastName}`,
          school: formData.school,
          email: formData.email,
          hobbies: formData.hobbies,
          favorite_subjects: formData.favoriteSubjects,
          goals: formData.goals,
          school_impact: formData.schoolImpact,
          school_experience: formData.schoolExperience,
          desired_changes: formData.desiredChanges,
          conflict_triggers: formData.conflictTriggers,
          feelings_about_conflicts: formData.feelingsAboutConflicts,
          grade_level: formData.gradeLevel,
        },
      });

      setResponseText(response.data);
      generatePDF(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = (responseText) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 15;
    
    // Title
    doc.setFontSize(16);
    doc.text('Individualized Social Emotional Learning Plan (ISELP)', margin, margin + 10);

    // Content
    doc.setFontSize(12);
    const text = responseText.gpt_response;
    const lines = doc.splitTextToSize(text, pageWidth - 2 * margin);
    doc.text(lines, margin, margin + 30);

    doc.save('ISELP.pdf');
  };

  return (
    <Container maxWidth="lg" className="iselp-container">
      <Box my={4}>
        <Typography variant="h3" align="center" gutterBottom>
          Individualized Social Emotional Learning Plan (ISELP)
        </Typography>
      </Box>
      <Card className="iselp-card">
        <CardContent>
          <Grid container spacing={3} component="form" noValidate autoComplete="off">
            {/* First Name and Last Name */}
            <Grid item xs={12} md={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                margin="normal"
                size="medium"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                margin="normal"
                size="medium"
              />
            </Grid>

            {/* School Dropdown */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>School</InputLabel>
                <Select
                  label="School"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  required
                >
                  {schoolsData.map((school) => (
                    <MenuItem key={school.name} value={school.name}>
                      {school.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Email Address */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                margin="normal"
                size="medium"
              />
            </Grid>

            {/* Grade Level */}
            <Grid item xs={12}>
              <TextField
                label="Grade Level"
                name="gradeLevel"
                value={formData.gradeLevel}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                margin="normal"
                size="medium"
              />
            </Grid>

            {/* Hobbies */}
            <Grid item xs={12}>
              <TextField
                label="Favorite Activities or Hobbies"
                name="hobbies"
                value={formData.hobbies}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                size="medium"
              />
            </Grid>

            {/* Favorite Subjects */}
            <Grid item xs={12}>
              <TextField
                label="Favorite Subjects or Projects"
                name="favoriteSubjects"
                value={formData.favoriteSubjects}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                size="medium"
              />
            </Grid>

            {/* Goals */}
            <Grid item xs={12}>
              <TextField
                label="Goals or Dreams"
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                size="medium"
              />
            </Grid>

            {/* School's Impact */}
            <Grid item xs={12}>
              <TextField
                label="School's Impact on Goals"
                name="schoolImpact"
                value={formData.schoolImpact}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                size="medium"
              />
            </Grid>

            {/* School Experience */}
            <Grid item xs={12}>
              <TextField
                label="School Experience"
                name="schoolExperience"
                value={formData.schoolExperience}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                size="medium"
              />
            </Grid>

            {/* Desired Changes */}
            <Grid item xs={12}>
              <TextField
                label="Desired Changes at School"
                name="desiredChanges"
                value={formData.desiredChanges}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                size="medium"
              />
            </Grid>

            {/* Conflict Triggers */}
            <Grid item xs={12}>
              <TextField
                label="Conflict Triggers"
                name="conflictTriggers"
                value={formData.conflictTriggers}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                size="medium"
              />
            </Grid>

            {/* Feelings About Conflicts */}
            <Grid item xs={12}>
              <TextField
                label="Feelings About Conflicts"
                name="feelingsAboutConflicts"
                value={formData.feelingsAboutConflicts}
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
                disabled={loading}
                size="large"
                sx={{ mt: 2 }}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Iselp;
