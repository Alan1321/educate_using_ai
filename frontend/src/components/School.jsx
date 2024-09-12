import React from 'react';
import './Schools.css'; // Updated CSS file for better styling
import schoolsData from '../data/schoolsData.json'
import { useLocation } from 'react-router-dom';

const Schools = () => {

    const location = useLocation();
    const data = location.state;
    console.log(data)
  return (
    <div className="schools-page">
      <h1 className="page-title">Schools</h1>
      <div className="school-cards-container">
        {schoolsData.map((school, index) => (
          <div className="school-card" key={index}>
            <h2 className="school-name">{school.name}</h2>
            <div className="school-info">
              <p><strong>Type:</strong> {school.type}</p>
              <p><strong>Grades:</strong> {school.grades}</p>
              <p><strong>Enrollment:</strong> {school.enrollment}</p>
              <p><strong>Address:</strong> {`${school.address.street}, ${school.address.city}, ${school.address.state} ${school.address.zip}`}</p>
              <p><strong>Phone:</strong> {school.contact.phone}</p>
            </div>
            <a
              href={school.contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="school-website-link"
            >
              Visit Website
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schools;
