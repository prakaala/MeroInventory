import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const AddSales = () => {
  
  //const [productImage, setProductImage] = useState("");
  const [product, setProduct] = useState("");

  const [productQuantity, setProductQuantity] = useState("");
  const navigate = useNavigate();
  const { user } = useAuthContext();

  // const handleImageChange = (e) => {
  //   setProductImage(e.target.files[0]);
  // };
 

  // function handleChange(event) {
  //   const value = event.target.value;

  //   // Update the state of the `categories` variable.
  //   this.setState({
  //     categories: value,
  //   });
  // }

  const handleSubmit = (e) => {
    
    e.preventDefault();
 
    //Vallidate the input fields
    // if (productImage === "") {
    //   alert("Please insert an image.");
    //   return;
    // }

    

    if (productQuantity === "") {
      alert("Please enter a product quantity.");
      return;
    }

    // Make a request to the backend API to create the new product.
    const formData = new FormData();
    console.log(product)

    const payload = {
      "product":product,
      "quantity":productQuantity
    }

    console.log("Axios Request Before")
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
  
  axios.post("http://localhost:5000/api/create-sale", payload, {
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

//   useEffect(() => {
//     // Get the list of categories from the backend API.
//     axios
//       .get("http://localhost:5000/api/getallsales", {
//         headers: {
//           'Authorization': `Bearer ${user.accessToken}`
//         }
//       })
//       .then((categories) => {
//         setProductCategories(categories.data);
//       });
//   }, []);

  return (
    <div className="mx-5">
      <form onSubmit={handleSubmit} className="w-75">
        <h2>Products</h2>
        <div className="w-90 p-3 mb-2" style={{ background: "#AFD3E2" }}>
          Add New Products
        </div>
        <div className="w-90 p-3">
          <label htmlFor="product" className="form-label">
            <b>Product</b>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
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
              Add Sale
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

export default AddSales;
