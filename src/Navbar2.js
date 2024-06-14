// import { useState, useEffect } from 'react';
// import { useNavigate,Link } from 'react-router-dom';
// import { Navbar, Nav, Button, Container } from 'react-bootstrap';
// import logoImg from './Images/logo.png';
// import './Hrmscss/navabr2.css';
// import MyProfile from './MyProfile';
// import { useSelector } from 'react-redux';

// function AppNavbar() {
//   const [click, setClick] = useState(true);
//   const empId = useSelector((state) => state.auth.empId);
//   const name = useSelector((state) => state.auth.name);
//   const roles = useSelector((state) => state.auth.roles);

//   useEffect(() => {
//     if (empId) {
//       setClick(false);
//     }
//   }, [empId]);

//   const navigate = useNavigate();

//   function handleLogin() {
//     navigate('/login');
//   }

//   return (
//     <div className="main">
//       <Navbar expand="lg" className="navbar navbar-light bg-light">
//         <Container fluid>
//           <Navbar.Brand className="p-0 m-0">
//             <div>
//             <Link to='/' >
//               <img
//                 src={logoImg}
//                 className="d-inline-block align-top w-auto"
//                 alt="Logo"
//               />
//                </Link>
//             </div>
//           </Navbar.Brand>
//           <Nav className="ml-auto">
//             {click ? (
//               <Button onClick={handleLogin} variant="outline-success" className="mx-2 py-2 px-4">
//                 Login
//               </Button>
//             ) : (
//               <div className="d-flex align-items-center">
//                 <span className="mx-2">{name}</span>
//                 <MyProfile />
//               </div>
//             )}
//           </Nav>
//         </Container>
//       </Navbar>
//     </div>
//   );
// }

// export default AppNavbar;

// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { Navbar, Nav, Button, Container } from 'react-bootstrap';
// import { useSelector } from 'react-redux';
// import DialogTitle from '@mui/material/DialogTitle';
// import Dialog from '@mui/material/Dialog';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import logoImg from './Images/logo.png';
// import './Hrmscss/navabr2.css';
// import MyProfile from './MyProfile';
// import GroupIcon from '@mui/icons-material/Group'; // Import GroupIcon from Material-UI
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';

// function AppNavbar() {
//   const [open, setOpen] = useState(false);
//   const empId = useSelector((state) => state.auth.empId);
//   const name = useSelector((state) => state.auth.name);
//   const roles = useSelector((state) => state.auth.roles); // Assuming roles are stored as an array of strings

//   const navigate = useNavigate();

//   const handleLogin = () => {
//     navigate('/login');
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div className="main">
//       <Navbar expand="lg" className="navbar navbar-light bg-light">
//         <Container fluid>
//           <Navbar.Brand className="p-0 m-0">
//             <Link to='/'>
//               <img
//                 src={logoImg}
//                 className="d-inline-block align-top w-auto"
//                 alt="Logo"
//               />
//             </Link>
//           </Navbar.Brand>
//           <Nav className="ml-auto">
//             {empId ? (
//               <div className="d-flex align-items-center">
//                 <span className="mx-2">{name}</span>
//                 <Tooltip title="View Roles" arrow>
//                   <IconButton onClick={handleClickOpen} className="icon-button">
//                     <GroupIcon />
//                   </IconButton>
//                 </Tooltip>
//                 <MyProfile />
//               </div>
//             ) : (
//               <Button onClick={handleLogin} variant="outline-success" className="mx-2 py-2 px-4">
//                 Login
//               </Button>
//             )}
//           </Nav>
//         </Container>
//       </Navbar>

//       {/* Dialog to display user roles */}
//       <Dialog onClose={handleClose} open={open} style={{ width: '400px', maxHeight: '80vh', textAlign: 'center' }}>
//         <DialogTitle>User Roles</DialogTitle>
//         <List>
//           {roles.map((role, index) => (
//             <ListItem disablePadding key={index}>
//               <ListItemText primary={role} />
//             </ListItem>
//           ))}
//         </List>
//       </Dialog>
//     </div>
//   );
// }

// export default AppNavbar;
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
          <Modal.Title>User Roles</Modal.Title>
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
