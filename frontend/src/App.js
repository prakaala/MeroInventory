import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import TopNavbar from "./components/TopNavbar";
import InvRoutes from './pages/routes/InvRoutes';

const ConditionalNavBar = () => {
  const location = useLocation();
  if (location.pathname === "/login") {
    return null;
  }
  if (location.pathname === "/register") {
    return null;
  }
  return <TopNavbar />
}

function App() {

  return (
    <>
      <BrowserRouter>
        <ConditionalNavBar />
        <InvRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
