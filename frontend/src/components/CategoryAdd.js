import React, { useState } from "react";
import Axios from "axios";
//import { Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext";

const CategoryAdd = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useAuthContext();

  // Add form submit handler here
  const handleSubmit = (e) => {
    e.preventDefault();

    //Vallidate the input fields
    if (name.trim() === "") {
      alert("Please enter a name for the product category.");
      return;
    }

    if (description.trim() === "") {
      alert("Please enter a description for the product category.");
      return;
    }

    // Redirect to the product category list page
    ///window.location.href = "/product-categories";
    // Send a POST request to your backend API to create a new product category
    const data = {
      name,
      description,
    };
    console.log(data)
    Axios.post("http://localhost:5000/api/create-category", data, {
      headers: {
        'Authorization': `Bearer ${user.accessToken}`
      }
    })
      .then((response) => {
        if (response.status === 201) {
          setName("");
          setDescription("");
          alert("Added Successfully!!")
        } else {
          alert("Error adding product category");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mx-5">
      <form onSubmit={handleSubmit} className="w-75">
        <h2>Categories</h2>
        <div className="w-90 p-3 mb-2 bg-info text-dark">Add New Category</div>
        <div className="w-90 p-3">
          <label for="categoryname" className="form-label">
            <b>Category Name</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="categoryname"
            placeholder="Enter Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="w-90 p-3">
          <label for="description" className="form-label">
            <b>Category Description</b>
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
          <div className=" gap-2 d-flex justify-content-md-end">
            <button id="submit" name="submit" className="btn btn-primary" value="1">
              Add Category
            </button>
            <Link
              to="/category"
              id="cancel"
              name="cancel"
              className="btn btn-default"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
//  <Button type="submit">Add Category</Button>
export default CategoryAdd;
