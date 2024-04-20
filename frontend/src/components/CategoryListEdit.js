import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryList from './CategoryList';
import Axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

// import Data from './data.json';

export default function CategoryListEdit(props) {
  const [name, setName] = useState(props.name || '');
  const [description, setDescription] = useState(props.description || '');
  const { user } = useAuthContext()

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add the product category to the database
    // ...

    // Redirect to the product category list page
    // window.location.href = "/product-categories";
    //// const newCategory = { name, description };
    ///window.location.href = "/product-categories";
    // Send a POST request to your backend API to create a new product category
    const data = {
      name,
      description,
    };

    Axios.put(`http://localhost:5000/api/update-category/${props.id}`, data, {
      headers: {
        'Authorization': `Bearer ${user.accessToken}`
      }
    })
      .then((response) => {
        if (response.status === 200) {
          setName("");
          setDescription("");
          props.onClose()
        } else {
          alert("Error adding product category");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
        crossOrigin="anonymous"
      ></link>
      <div className="view-overlay">
        <div
          className="w-90 p-3"
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
            width: '700px',
            height: '440px',
            border: '2px solid black',
            borderRadius: '10px',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white',
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="form">
              <div className="w-90 p-3 mb-2 text-dark" style={{ fontSize: '20px' }}>
                <b>Edit Category</b>
              </div>
              <hr className="hr" />
              <div className="w-90 p-3">
                <label htmlFor="categoryname" className="form-label">
                  <b>Category Name</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="categoryname"
                  placeholder="Enter Category Name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              <div className="w-90 p-3">
                <label htmlFor="description" className="form-label">
                  <b>Description</b>
                </label>
                <textarea
                  className="form-control"
                  id="categoryDescription"
                  placeholder="Enter description of category"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                ></textarea>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="submit"></label>
                <div className="gap-2 d-flex justify-content-md-end">
                  <button onClick={props.onClose} className="btn btn-primary">
                    Cancel
                  </button>
                  <button type="submit" id="submit" name="submit" className="btn btn-primary" value="1">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
