import React, { useEffect, useState } from "react";
import { BsEye, BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { Link } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext";

import axios from "axios";
import CategoryView from "./CategoryView";
import '../App.css'
import CategoryListEdit from "./CategoryListEdit";


export default function CategoryList(props) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editedCategory, setEditedCategory] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const { user } = useAuthContext()


  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getallcategories', {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      });
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  const updateCategoryList = async () => {
    await fetchCategories();
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const viewCategory = (category) => {
    setSelectedCategory(category);
  };

  const closeDetails = () => {
    setSelectedCategory(null);
  };
  const closeEditDetails = () => {
    setEditedCategory(null);
  };

  const deleteRow = (id) => {
    console.log(id);
    setDeletingItemId(id);
    setShowPopup(true);
  };

  const confirmDelete = () => {
    axios.delete(`http://localhost:5000/api/delete-category/${deletingItemId}`, {
      headers: {
        'Authorization': `Bearer ${user.accessToken}`
      }
    })
    setShowPopup(false);
    updateCategoryList();
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  const editCategory = (category) => {
    setEditedCategory(category);
  };


  return (
    <>
      <div>
        <h2>Categories</h2>
        <hr className="hr" />

        <h2>Category List</h2>
        <hr className="hr" />
        <div className="table-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <table className="table table-striped text-center" style={{ width: '1000px', height: '200px' }}>
            <thead>
              <tr>
                <th scope="col">SN</th>
                <th scope="col">Categories</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row.name}</td>
                  <td>
                    <span>
                      <button className="icon-btn" onClick={() => viewCategory(row)}>
                        <BsEye size={18} color="blue" />{" "}
                      </button>
                      <button className="icon-btn" onClick={() => editCategory(row)}>
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
        {selectedCategory && (
          <CategoryView
            name={selectedCategory.name}
            description={selectedCategory.description}
            onClose={closeDetails}
          />
        )}
        {editedCategory && (
          <CategoryListEdit
            id={editedCategory._id}
            name={editedCategory.name}
            description={editedCategory.description}
            onClose={() => {
              closeEditDetails();
              updateCategoryList();
            }}
          />
        )}
        {showPopup && (
          <div className="modal" style={{ display: 'block' }}>
            <div className="modal-dialog" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    Are you sure you want to delete this category?
                  </h5>
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
    </>
  );
}
