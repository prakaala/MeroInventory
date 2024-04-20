import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const AddCustomer = () => {
  
  //const [productImage, setProductImage] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  //const [productCategories, setProductCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
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

    if (customerName === "") {
      alert("Please enter a customer name.");
      return;
    }

    if (customerEmail === "") {
      alert("Please enter the customer name.");
      return;
    }

    // if (selectedCategory === "") {
    //   alert("Please select a category.");
    //   return;
    // }

    if (customerPhone === "") {
      alert("Please enter a customer phone.");
      return;
    }

    if (customerAddress === "") {
      alert("Please enter a customer address.");
      return;
    }

    // Make a request to the backend API to create the new product.
    const formData = new FormData();
    console.log(customerName)

    const payload = {
      "name":customerName,
      "email":customerEmail,
      //"categoryName":selectedCategory,
      "phone":customerPhone,
      "address":customerAddress
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
  
  axios.post("http://localhost:5000/api/create-customer", payload, {
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
        alert("Error adding the customer");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

//   useEffect(() => {
//     // Get the list of categories from the backend API.
//     axios
//       .get("http://localhost:5000/api/getallcustomers", {
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
        <h2>Customers</h2>
        <div className="w-90 p-3 mb-2" style={{ background: "#AFD3E2" }}>
          Add New Customer
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
          <label htmlFor="customername" className="form-label">
            <b>Customer Name</b>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>
        <div className="w-90 p-3">
          <label htmlFor="email" className="form-label">
            <b>Email</b>
          </label>
          <input
            type ="email"
            className="form-control"
            placeholder="Enter email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
          />
        </div>
        {/* <div className="w-90 p-3">
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
        </div> */}
        <div className="w-90 p-3">
          <label htmlFor="phone" className="form-label">
            <b>Phone</b>
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter phone"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
          />
        </div>
        <div className="w-90 p-3">
          <label htmlFor="customerAddress" className="form-label">
            <b>Address</b>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter customerAddress"
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
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
              Add Customer
            </button>
            <Link
              to="/customers"
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

export default AddCustomer;
