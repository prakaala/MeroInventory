import React, { useState } from 'react';

const CategoryListDelete = () => {
  const [data, setData] = useState([
    { id: 1, name: 'Mobile' },
    { id: 2, name: 'Laptop' },
    { id: 3, name: 'Ipad' },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);

  const deleteRow = (id) => {
    setDeletingItemId(id);
    setShowPopup(true);
  };

  const confirmDelete = () => {
    const updatedData = data.filter((item) => item.id !== deletingItemId);
    setData(updatedData);
    setShowPopup(false);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
        crossOrigin="anonymous"
      ></link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <button onClick={() => deleteRow(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="modal" 
         style={{
             display: 'block'}}>
         <div className="modal-dialog" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
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
  );
};

export default CategoryListDelete;
