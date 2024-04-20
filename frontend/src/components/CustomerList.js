import React, { useEffect, useState } from "react";
import { BsEye, BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { Link } from 'react-router-dom'
import axios from 'axios';
import '../App.css';

export default function CustomerList(props) {
    const [customers, setCustomers] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(1);
    // const [selectedProduct, setSelectedProduct] = useState(null);
    // const [editedProduct, setEditedProduct] = useState(null);
    // const [showPopup, setShowPopup] = useState(false);
    // const [deletingItemId, setDeletingItemId] = useState(null);


    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/getallcustomers');

            
            setCustomers(response.data);
            
        } catch (error) {
            console.log(error);
        }
    }

   
    // const updateProductList = async () => {
    //     await fetchCustomers();
    // };


    useEffect(() => {
        fetchCustomers();
    }, []);



   

    return (
        <div>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
                crossOrigin="anonymous"
            />

            <div className="container">
                <h2>Customers</h2>
                <hr className="hr" />

                <h2>Manage Customers</h2>
                <hr className="hr" />

                <div className="table-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <table className="table table-striped text-center" style={{ width: '1300px', margin: 'auto' }}>
                        <thead>
                            <tr>
                                <th scope="col">SN</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Address</th>
                            </tr>
                        </thead>

                        <tbody>
                            {customers.map((row, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
            
                                    <td>{row.name ? row.name :'N/A'}</td>
                                    <td>{row.email}</td>
                                    <td>{row.phone}</td>
                                    <td>{row.address}</td>

                
                                </tr>
                            ))}
                        </tbody>
                    </table>
                   
                </div>
            </div>


        </div>
    );
}
