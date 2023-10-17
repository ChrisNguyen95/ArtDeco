import React from 'react';

const Preload = () => {
  return (
    <div className="preload-container">
        <div className="loader">
        <div className="bubble">
        <div className="bubble__shine bubble__shine--lg"></div>
        <div className="bubble__shine bubble__shine--sm"></div>
        </div>
        <p className="text"> Lo<span className="text__highlight">a</span>din<span className="text__highlight">g</span></p>
        </div>
    </div>
  );
};

export default Preload;
