import React from 'react';
import './Card.css'

const ProductView = (props) => {
  return (
    <div className="view-overlay">
      <div className="view-container">
        <div className="card">
          <div className="card-header">
            <b>View</b>
          </div>
          <div className="card-body">
            <h6 className="card-title">Name: </h6><p>{props.name}</p>
            <h6 className="card-text">Email: </h6><p>{props.email}</p>
            <h6 className="card-text">Phone: </h6><p>{props.phone}</p>
            <h6 className="card-text">Address: </h6><p>{props.address}</p>
            <div className="text-left">
              <button onClick={props.onClose} className="btn btn-primary">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;