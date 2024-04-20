import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFolderFill } from "react-icons/bs";
import { BrowserRouter, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

export default function ProductEdit(props) {
  const [name, setName] = useState(props.name || '');
  const [description, setDescription] = useState(props.description || '');

  let [category, setCategories] = useState(props.category || '');
  const [price, setPrice] = useState(props.price || '');
  const [quantity, setQuantity] = useState(props.qty || '');
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [productCategories, setProductCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (e) => {
    console.log(e)
    setCategories(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name,
      description,
      category,
      price,
      quantity,
    };
    console.log(data)

    axios.put(`http://localhost:5000/api/updateproduct/${props.id}`, data, {
      headers: {
        'Authorization': `Bearer ${user.accessToken}`
      }
    })
      .then((response) => {
        if (response.status === 200) {
          setName("");
          setDescription("");
          setCategories("");
          setPrice("");
          setQuantity("");
          props.onClose()

        } else {
          alert("Error updating product category");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const handleImageChange = (e) => {
  //   const selectedImage = e.target.files[0];
  //   setImage(selectedImage);
  // };

  useEffect(() => {
    // Get the list of categories from the backend API.
    axios
      .get("http://localhost:5000/api/getallcategories", {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      })
      .then((categories) => {
        setProductCategories(categories.data);
      });
  }, [productCategories]);

  return (

    <>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
        crossOrigin="anonymous"
      />
      <div className="view-overlay">
        <div
          className="w-90 p-3"
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
            width: '700px',
            height: '720px',
            border: '2px solid black',
            borderRadius: '10px',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white'
          }}
        >

          <form onSubmit={handleSubmit}>
            <div className="form">
              <div className="w-90 p-3 mb-2 text-dark" style={{ fontSize: '20px' }}>
                <b>Edit Product</b>
              </div>
              <hr className="hr" />
              <div className="w-90 p-1">
                <label htmlFor="productname" className="form-label">
                  <b>Product Name</b>
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
              {/* <div className="w-90 p-1">
                <label htmlFor="image" className="form-label">
                  <b>Image</b>

                </label>
                <br />
                <label htmlFor="upload" className="custom-file-upload">
                  <BsFolderFill size={40} />
                </label>
                <input
                  type="file"
                  id="upload"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </div> */}

              <div className="w-90 p-1">
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
              <div className="w-90 p-1">
                <label htmlFor="categories" className="form-label">
                  <b>Categories</b>
                </label>
                {/* <input
                  type="text"
                  className="form-control"
                  id="categoryname"
                  placeholder="Enter Category Name"
                  onChange={(e) => setCategories(e.target.value)}
                  value={category}
                /> */}
                <select value={props.category} onChange={handleCategoryChange}>
                  <option value="">Select a category</option>
                  {productCategories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-90 p-1">
                <label htmlFor="price" className="form-label">
                  <b>Price</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="categoryname"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </div>
              <div className="w-90 p-1">
                <label htmlFor="qty" className="form-label">
                  <b>Qty</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="categoryname"
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                />
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="submit"></label>
                <div className="gap-2 d-flex justify-content-md-end">
                  <button onClick={props.onClose} className="btn btn-primary">Cancel</button>
                  <button type='submit' id="submit" name="submit" className="btn btn-primary" value="1">
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