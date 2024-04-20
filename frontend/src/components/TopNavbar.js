import React from "react";
import { Container, Row, Col, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { PersonCircle, BoxArrowLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";



const TopNavbar = () => {

  const { logout } = useLogout()

  const handleClick = () => {
    logout();
  }

  return (
    <Row>
      <Col>
        <Navbar style={{ background: "#AFD3E2" }} expand="md">
          <Container>
            {/* Navbar brand and toggle */}
            <Navbar.Brand
              as={Link}
              to="/"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Container>
                <img
                  src="default.svg"
                  height="40"
                  width="40"
                  style={{ marginRight: "0.5rem", maxWidth: "100%" }}
                  className="align-top"
                  alt="logo of inventory"
                />
              </Container>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="top-nav" />

            {/* Navbar collapsible content */}
            <Navbar.Collapse id="top-nav">
              {/* Navbar left items */}
              <Nav className="mx-auto fw-bold">
                <Nav.Link as={Link} to="/">
                  Dashboard
                </Nav.Link>

                <NavDropdown title="Categories" id="top-nav">
                  <NavDropdown.Item as={Link} to="/category">
                    Categories list
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/category-add">
                    Add New Category
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title='Products' id='top-nav'>
                  <NavDropdown.Item as={Link} to="/product">Manage products</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/product-add">
                    Add New product
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Sales" id="top-nav">
                <NavDropdown.Item as={Link} to="/sales">View Sales</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/sale-add">
                    Add New Sale
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
        
                </NavDropdown>

                <NavDropdown title="Customer" id="top-nav">
                  <NavDropdown.Item as={Link} to ="/customers">View Customers</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/customer-add">Add Customer</NavDropdown.Item>
                  <NavDropdown.Divider />
        
                </NavDropdown>
              </Nav>

              {/* Navbar right items */}
              <Nav>
                <Nav.Link href="#profile">
                  <PersonCircle /> Profile
                </Nav.Link>
              </Nav>
              <Navbar.Text>
                <NavDropdown>
                  <Nav.Link onClick={handleClick}>
                    Logout <BoxArrowLeft />
                  </Nav.Link>
                </NavDropdown>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Col>
    </Row>
  );
};

export default TopNavbar;
