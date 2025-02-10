import React from 'react';
import './Spinner.css';

const Spinner: React.FC = () => (
  <div className="spinner-container" data-testid="loading-spinner">
    <div className="spinner"></div>
  </div>
);

export default Spinner;
