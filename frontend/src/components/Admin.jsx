import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import studentRecords from '../data/studentRecords.json';
import adultRecords from '../data/adultRecords.json';
import "./Admin.css"

const Admin = () => {
  // Map studentRecords to have a studentName property
  const mappedStudentRecords = studentRecords.map(record => ({
    ...record,
    studentName: record.name
  }));

  const renderAdultSurveyIcon = (studentName) => {
    // Check if the student is in adultRecords
    const adultRecord = adultRecords.find(record => record.studentName === studentName);

    // If found, return green check, otherwise red cross
    return adultRecord ? (
      <CheckCircleIcon style={{ color: 'green' }} />
    ) : (
      <CancelIcon style={{ color: 'red' }} />
    );
  };

  const renderActionButton = (studentName) => {
    // Check if the student is in adultRecords
    const adultRecord = adultRecords.find(record => record.studentName === studentName);

    // Static button logic with same size
    return adultRecord ? (
      <Button
        variant="contained"
        color="secondary"
        style={{ minWidth: '110px' }} // Set minimum width for both buttons
      >
        View
      </Button>
    ) : (
      <Button
        variant="contained"
        color="primary"
        style={{ minWidth: '100px' }} // Set minimum width for both buttons
      >
        Generate
      </Button>
    );
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
              <TableCell>{renderActionButton(student.studentName)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Admin;
