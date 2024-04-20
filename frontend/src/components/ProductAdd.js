import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const AddProduct = () => {
  
  //const [productImage, setProductImage] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategories, setProductCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const navigate = useNavigate();
  const { user } = useAuthContext();

  // const handleImageChange = (e) => {
  //   setProductImage(e.target.files[0]);
  // };
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // function handleChange(event) {
  //   const value = event.target.value;

  //   // Update the state of the `categories` variable.
  //   this.setState({
  //     categories: value,
  //   });
  // }

  const handleSubmit = (e) => {
    console.log("before")
    e.preventDefault();
    console.log("after");
    //Vallidate the input fields
    // if (productImage === "") {
    //   alert("Please insert an image.");
    //   return;
    // }

    if (productName === "") {
      alert("Please enter a product name.");
      return;
    }

    if (productDescription === "") {
      alert("Please enter a product description.");
      return;
    }

    if (selectedCategory === "") {
      alert("Please select a category.");
      return;
    }

    if (productPrice === "") {
      alert("Please enter a product price.");
      return;
    }

    if (productQuantity === "") {
      alert("Please enter a product quantity.");
      return;
    }

    // Make a request to the backend API to create the new product.
    const formData = new FormData();
    console.log(productName)

    const payload = {
      "name":productName,
      "description":productDescription,
      "categoryName":selectedCategory,
      "price":productPrice,
      "quantity":productQuantity
    }

    console.log("Axios Request BEfore")
    console.log(payload)
  //   axios
  //     .post("http://localhost:5000/api/addProduct", payload, {
  //       headers: {
  //         'Authorization': `Bearer ${user.accessToken}`,
  //         "Content-Type": "multipart/form-data",
  //       }
  //     })
  //     .then((product) => {
  //       // Redirect the user back to the inventory page.
  //       navigate("/product");
  //     });
  // };
  
  axios.post("http://localhost:5000/api/addProduct", payload, {
    headers: {
      'Authorization': `Bearer ${user.accessToken}`
    }
  })
    .then((response) => {
      if (response.status === 201) {
        //setName("");
        //setDescription("");
        alert("Added Successfully!!")
      } else {
        alert("Error adding product category");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

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
  }, []);

  return (
    <div className="mx-5">
      <form onSubmit={handleSubmit} className="w-75">
        <h2>Products</h2>
        <div className="w-90 p-3 mb-2" style={{ background: "#AFD3E2" }}>
          Add New Products
        </div>
        {/* <div className="w-90 p-3">
          <label htmlFor="img" className="form-label">
            <b>Image</b>
          </label>
          <input
            type="file"
            className="form-control"
            id="productImage"
            name="image"
            onChange={handleImageChange}
          />
        </div> */}
        <div className="w-90 p-3">
          <label htmlFor="productname" className="form-label">
            <b>Product Name</b>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="w-90 p-3">
          <label htmlFor="description" className="form-label">
            <b>Description</b>
          </label>
          <textarea
            className="form-control"
            placeholder="Enter Description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>
        <div className="w-90 p-3">
          <label htmlFor="categoryname" className="form-label">
            <b>Categories</b>
          </label>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Select a category</option>
            {productCategories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-90 p-3">
          <label htmlFor="price" className="form-label">
            <b>Price</b>
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
        <div className="w-90 p-3">
          <label htmlFor="quantity" className="form-label">
            <b>Quantity</b>
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter quantity"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="submit"></label>
          <div className=" gap-2 d-flex justify-content-md-end text-dark">
            <button
              id="submit"
              //name="submit"
              className="btn btn-primary text-dark"
              style={{ background: "#19A7CE" }}
              //value="1"
            >
              Add Product
            </button>
            <Link
              to="/product"
              id="cancel"
              name="cancel"
              className="btn btn-default"
              style={{ background: "#19A7CE" }}
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
