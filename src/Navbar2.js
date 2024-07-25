import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, Button, Container, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import MyProfile from "./MyProfile";
import GroupIcon from "@mui/icons-material/Group";
import { Tooltip, IconButton } from "@mui/material";
import logoImg from "./Images/logo.png";
import "./Hrmscss/navabr2.css";

function AppNavbar() {
  const [open, setOpen] = useState(false);
  const empId = useSelector((state) => state.auth.empId);
  const name = useSelector((state) => state.auth.name);
  const roles = useSelector((state) => state.auth.roles);
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="main">
      <Navbar expand="lg" className="navbar navbar-light bg-light">
        <Container fluid>
          <Navbar.Brand className="p-0 m-0">
            <Link to="/">
              <img
                src={logoImg}
                className="d-inline-block align-top w-auto"
                alt="Logo"
              />
            </Link>
          </Navbar.Brand>
          <Nav className="ml-auto">
            {empId ? (
              <div className="d-flex align-items-center">
                <span className="mx-2">{name}</span>
                <Tooltip title="View Roles" arrow>
                  <IconButton onClick={handleClickOpen} className="icon-button">
                    <GroupIcon />
                  </IconButton>
                </Tooltip>
                <MyProfile />
              </div>
            ) : (
              <Button
                onClick={handleLogin}
                variant="outline-success"
                className="mx-2 py-2 px-4"
              >
                Login
              </Button>
            )}
          </Nav>
        </Container>
      </Navbar>

      {/* Modal to display user roles */}
      <Modal show={open} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title  style={{ textAlign: "center" }}>Roles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {roles.map((role, index) => (
              <li key={index} style={{ textAlign: "center" }}>
                {role}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AppNavbar;
