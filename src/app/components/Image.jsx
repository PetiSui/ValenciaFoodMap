import React from 'react'

const Image = ({ description, imageSourceUrl, children }) => {
    return (
      <div className="image_container">
        <img className="image" src={imageSourceUrl} alt={description} loading='lazy'/>
        {children}
      </div>
    );
  };

export default Image