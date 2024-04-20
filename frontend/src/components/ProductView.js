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
            <h6 className="card-text">Description: </h6><p>{props.description}</p>
            <h6 className="card-text">Category: </h6><p>{props.category}</p>
            <h6 className="card-text">Price: </h6><p>{props.price}</p>
            <h6 className="card-text">Qty: </h6><p>{props.qty}</p>
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