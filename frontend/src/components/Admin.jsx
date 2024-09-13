import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import studentRecords from '../data/studentRecords.json';
import adultRecords from '../data/adultRecords.json';
import pdfRecords from '../data/pdfRecords.json'; // Import pdfRecords.json
import "./Admin.css";

const Admin = () => {
  // State to manage loading state for each student
  const [loading, setLoading] = useState({});
  const [mappedStudentRecords, setMappedStudentRecords] = useState([]);

  useEffect(() => {
    // Map studentRecords to have a studentName property
    const mappedRecords = studentRecords.map(record => ({
      ...record,
      studentName: record.name
    }));
    setMappedStudentRecords(mappedRecords);
  }, []);

  const renderAdultSurveyIcon = (studentName) => {
    const adultRecord = adultRecords.find(record => record.studentName === studentName);
    return adultRecord ? (
      <CheckCircleIcon style={{ color: 'green' }} />
    ) : (
      <CancelIcon style={{ color: 'red' }} />
    );
  };

  const isPdfRecord = (student) => {
    return pdfRecords.some(record =>
      record.firstName === student.studentName.split(' ')[0] &&
      record.lastName === (student.studentName.split(' ')[1] || '')
    );
  };

  const renderActionButton = (student) => {
    const isLoading = loading[student.studentName] || false;

    return isPdfRecord(student) ? (
      <Button
        variant="contained"
        color="secondary"
        style={{ minWidth: '110px' }}
        disabled={isLoading} // Disable button if loading
      >
        View
      </Button>
    ) : (
      <Button
        variant="contained"
        color="primary"
        style={{ minWidth: '100px' }}
        onClick={() => handleGenerateClick(student)} // Pass the student object
        disabled={isLoading} // Disable button if loading
      >
        {isLoading ? 'Generating...' : 'Generate'}
      </Button>
    );
  };

  const handleGenerateClick = async (student) => {
    setLoading(prev => ({ ...prev, [student.studentName]: true }));
    console.log("Printing student records:", student);

    try {
      const timestamp = new Date().toISOString();
      const queryString = new URLSearchParams({
        timestamp,
        name: student.studentName,
        school: student.school,
        email: student.email,
        hobbies: student.hobbies || '',
        favorite_subjects: student.favorite_subjects || '',
        goals: student.goals || '',
        school_impact: student.school_impact || '',
        school_experience: student.school_experience || '',
        desired_changes: student.desired_changes || '',
        conflict_triggers: student.conflict_triggers || '',
        feelings_about_conflicts: student.feelings_about_conflicts || '',
        grade_level: student.grade_level || '',
      }).toString();

      const response = await fetch(`http://localhost:3000/api/v1/gpt-response/iselp?${queryString}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();

      if (result.message === 'PDF generated and saved successfully!') {
        // Make another API call to update pdfRecords.json
        await fetch('http://localhost:3000/api/files/pdfRecords.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: student.studentName.split(' ')[0],
            lastName: student.studentName.split(' ')[1] || '',
            email: student.email,
            school: student.school,
          }),
        });

        setSnackMessage('PDF generated successfully!');
        setSnackSeverity('success');
      } else {
        setSnackMessage('Failed to generate PDF.');
        setSnackSeverity('error');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setSnackMessage('Error generating PDF.');
      setSnackSeverity('error');
    } finally {
      setLoading(prev => ({ ...prev, [student.studentName]: false }));
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>School</TableCell>
            <TableCell>Student Name</TableCell>
            <TableCell>Student Survey</TableCell>
            <TableCell>Adult Survey</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mappedStudentRecords.map((student, index) => (
            <TableRow key={index}>
              <TableCell>{student.school}</TableCell>
              <TableCell>{student.studentName}</TableCell>
              <TableCell>
                <CheckCircleIcon style={{ color: 'green' }} /> {/* Always green check for student survey */}
              </TableCell>
              <TableCell>{renderAdultSurveyIcon(student.studentName)}</TableCell>
              <TableCell>{renderActionButton(student)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Admin;
