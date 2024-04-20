import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Category from "../../components/CategoryList";
import CategoryAdd from "../../components/CategoryAdd";
import CategoryListEdit from "../../components/CategoryListEdit";
import CategoryListDelete from "../../components/CategoryListDelete";
import DashBoard from "../../components/Dashboard";
import ProductAdd from "../../components/ProductAdd";
import ProductList from "../../components/ProductList";
import ProductEdit from "../../components/ProductEdit";
import LoginForm from "../Login";
import SignupForm from "../SignUp";
import { useAuthContext } from "../../hooks/useAuthContext";
import AddSales from "../../components/SalesAdd";
import SalesList from "../../components/SalesList"
import AddCustomer from "../../components/CustomerAdd";
import CustomerList from "../../components/CustomerList";

const InvRoutes = () => {
  const { user } = useAuthContext()
  return (
    <>
      <Routes>
        <Route path="/login" element={!user ? <LoginForm /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <SignupForm /> : <Navigate to="/" />} />
        <Route path="/" element={user ? <DashBoard /> : <Navigate to="/login" />} />
        <Route path="/category" element={user ? <Category /> : <Navigate to="/login" />} />
        <Route path="/category-add" element={user ? <CategoryAdd /> : <Navigate to="/login" />} />
        <Route path="/category-edit" element={user ? <CategoryListEdit /> : <Navigate to="/login" />} />
        <Route path="/category-delete" element={user ? <CategoryListDelete /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={user ? <DashBoard /> : <Navigate to="/login" />} />
        <Route path="/product-add" element={user ? <ProductAdd /> : <Navigate to="/login" />} />
        <Route path="/product" element={user ? <ProductList /> : <Navigate to="/login" />} />
        <Route path="/customer-add" element={user ? <AddCustomer /> : <Navigate to="/login" />} />
        <Route path="/customers" element={user ? <CustomerList /> : <Navigate to="/login" />} />
        <Route path="/product-edit" element={user ? <ProductEdit /> : <Navigate to="/login" />} />
        <Route path="/sale-add" element={user ? <AddSales /> : <Navigate to="/login" />} />
        <Route path="/sales" element={user ? <SalesList /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default InvRoutes;
