import React, { useEffect, useState } from "react";
import { BsEye, BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { Link } from 'react-router-dom'
import axios from 'axios';
import ProductView from "./ProductView";
import ProductEdit from "./ProductEdit";
import '../App.css';

export default function ProductList(props) {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editedProduct, setEditedProduct] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [deletingItemId, setDeletingItemId] = useState(null);


    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/getAllProducts');
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    const updateProductList = async () => {
        await fetchProducts();
    };
    useEffect(() => {
        fetchProducts();
    }, []);



    const viewProduct = (product) => {
        setSelectedProduct(product);
    };

    const closeDetails = () => {
        setSelectedProduct(null);
    };
    const closeEditDetails = () => {
        setEditedProduct(null);
    };

    const deleteRow = (id) => {
        console.log(id);
        setDeletingItemId(id);
        setShowPopup(true);
    };

    const confirmDelete = () => {
        axios.delete(`http://localhost:5000/api/deleteproduct/${deletingItemId}`)
        setShowPopup(false);
        updateProductList();
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const editProduct = (product) => {
        setEditedProduct(product);
    };

    return (
        <div>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
                crossOrigin="anonymous"
            />

            <div className="container">
                <h2>Products</h2>
                <hr className="hr" />

                <h2>Manage Products</h2>
                <hr className="hr" />

                <div className="table-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <table className="table table-striped text-center" style={{ width: '1300px', margin: 'auto' }}>
                        <thead>
                            <tr>
                                <th scope="col">SN</th>
                            
                                <th scope="col">Product Name</th>
                                <th scope="col">Category</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((row, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                    
                                    <td>{row.name}</td>
                                    <td>{row.category?.name}</td>
                                    <td>{row.price}</td>
                                    <td>{row.quantity}</td>
                                    <td>
                                        <span>
                                            <button className="icon-btn" onClick={() => viewProduct(row)}>
                                                <BsEye size={18} color="blue" />{" "}
                                            </button>
                                            <button className="icon-btn" onClick={() => editProduct(row)}>
                                                <BsPencilSquare size={18} color="black" />{" "}
                                            </button>
                                            <button className="icon-btn" onClick={() => deleteRow(row._id)}>
                                                <BsFillTrashFill size={18} color="red" />
                                            </button>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedProduct && (
                <ProductView
                    name={selectedProduct.name}
                    description={selectedProduct.description}
                    category={selectedProduct.category?.name}
                    price={selectedProduct.price}
                    qty={selectedProduct.quantity}
                    onClose={closeDetails}
                />
            )}
            {editedProduct && (
                <ProductEdit
                    id={editedProduct._id}
                    name={editedProduct.name}
                    description={editedProduct.description}
                    category={editedProduct.category?.name}
                    price={editedProduct.price}
                    qty={editedProduct.quantity}
                    onClose={() => {
                        closeEditDetails();
                        updateProductList();
                    }}
                />
            )}

            {showPopup && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-dialog" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Are you sure you want to delete this product?</h5>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-danger" onClick={confirmDelete}>
                                    OK
                                </button>
                                <button className="btn btn-primary" onClick={closePopup}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
