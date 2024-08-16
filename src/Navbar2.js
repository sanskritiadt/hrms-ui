// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { Navbar, Nav, Button, Container, Modal } from "react-bootstrap";
// import { useSelector } from "react-redux";
// import MyProfile from "./MyProfile";
// import GroupIcon from "@mui/icons-material/Group";
// import { Tooltip, IconButton } from "@mui/material";
// import logoImg from "./Images/logo.png";
// import "./Hrmscss/navabr2.css";

// function AppNavbar() {
//   const [open, setOpen] = useState(false);
//   const empId = useSelector((state) => state.auth.empId);
//   const name = useSelector((state) => state.auth.name);
//   const roles = useSelector((state) => state.auth.roles);
//   const navigate = useNavigate();
//   const handleLogin = () => {
//     navigate("/login");
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
//             <Link to="/">
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
//               <Button
//                 onClick={handleLogin}
//                 variant="outline-success"
//                 className="mx-2 py-2 px-4"
//               >
//                 Login
//               </Button>
//             )}
//           </Nav>
//         </Container>
//       </Navbar>

//       {/* Modal to display user roles */}
//       <Modal show={open} onHide={handleClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title  style={{ textAlign: "center" }}>Roles</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <ul style={{ listStyleType: "none", padding: 0 }}>
//             {roles.map((role, index) => (
//               <li key={index} style={{ textAlign: "center" }}>
//                 {role}
//               </li>
//             ))}
//           </ul>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// export default AppNavbar;

// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Container,
//   Modal,
//   Box,
//   Tooltip,
//   IconButton,
// } from "@mui/material";
// import GroupIcon from "@mui/icons-material/Group";
// import MyProfile from "./MyProfile";
// import logoImg from "./Images/logo.png";
// import "./Hrmscss/navabr2.css";

// function AppNavbar() {
//   const [open, setOpen] = useState(false);
//   const empId = useSelector((state) => state.auth.empId);
//   const name = useSelector((state) => state.auth.name);
//   const roles = useSelector((state) => state.auth.roles);
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     navigate("/login");
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div className="main">
//       <AppBar position="static" className="navbar navbar-light bg-light">
//         <Container>
//           <Toolbar>
//             <Link to="/" className="navbar-brand">
//               <img
//                 src={logoImg}
//                 className="d-inline-block align-top w-auto"
//                 alt="Logo"
//                 style={{ height: '40px' }}
//               />
//             </Link>
//             <Box sx={{ flexGrow: 1 }} />
//             {empId ? (
//               <div className="d-flex align-items-center">
//                 <Typography className="mx-2">{name}</Typography>
//                 <Tooltip title="View Roles" arrow>
//                   <IconButton onClick={handleClickOpen} className="icon-button">
//                     <GroupIcon />
//                   </IconButton>
//                 </Tooltip>
//                 <MyProfile />
//               </div>
//             ) : (
//               <Button
//                 onClick={handleLogin}
//                 variant="outlined"
//                 className="mx-2 py-2 px-4"
//                 color="success"
//               >
//                 Login
//               </Button>
//             )}
//           </Toolbar>
//         </Container>
//       </AppBar>

//       {/* Modal to display user roles */}
//       <Modal open={open} onClose={handleClose} aria-labelledby="roles-modal-title" aria-describedby="roles-modal-description">
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 300,
//             bgcolor: 'background.paper',
//             border: '2px solid #000',
//             boxShadow: 24,
//             p: 4,
//           }}
//         >
//           <Typography id="roles-modal-title" variant="h6" component="h2" style={{ textAlign: "center" }}>
//             Roles
//           </Typography>
//           <ul style={{ listStyleType: "none", padding: 0, textAlign: "center" }}>
//             {roles.map((role, index) => (
//               <li key={index}>{role}</li>
//             ))}
//           </ul>
//           <Box display="flex" justifyContent="center" mt={2}>
//             <Button variant="contained" onClick={handleClose}>
//               Close
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </div>
//   );
// }

// export default AppNavbar;




// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Container,
//   Box,
//   Typography,
//   Button,
//   IconButton,
//   Tooltip,
//   Menu,
//   MenuItem,
//   useMediaQuery,
//   useTheme,
//   Modal,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import GroupIcon from "@mui/icons-material/Group";
// import MyProfile from "./MyProfile"; // Assuming this is your custom component
// import logoImg from "./Images/logo.png";
// import { useSelector } from "react-redux";
// import { useNavigate, Link } from "react-router-dom";

// const AppNavbar = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const [anchorEl, setAnchorEl] = useState(null);
//   const empId = useSelector((state) => state.auth.empId);
//   const name = useSelector((state) => state.auth.name);
//   const roles = useSelector((state) => state.auth.roles);
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     setOpen(false);
//   };

//   const handleLogin = () => {
//     navigate("/login");
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   return (
//     <>
//       <AppBar position="static" color="default" elevation={1}>
//         <Container   sx={{ maxWidth: 'none !important' }}>
//           <Toolbar disableGutters>
//             <Link
//               to="/"
//               style={{ flexGrow: 1, display: "flex", alignItems: "center" }}
//             >
//               <img
//                 src={logoImg}
//                 alt="Logo"
//                 style={{ height: "40px" }}
//               />
//             </Link>

//             {empId ? (
//               <>
//                 {isMobile ? (
//                   <Box>
//                     <IconButton
//                       size="large"
//                       edge="start"
//                       color="inherit"
//                       aria-label="menu"
//                       onClick={handleMenu}
//                     >
//                       <MenuIcon />
//                     </IconButton>
//                     <Menu
//                       anchorEl={anchorEl}
//                       anchorOrigin={{
//                         vertical: "top",
//                         horizontal: "right",
//                       }}
//                       keepMounted
//                       transformOrigin={{
//                         vertical: "top",
//                         horizontal: "right",
//                       }}
//                       open={Boolean(anchorEl)}
//                       onClose={handleClose}
//                     >
//                       <MenuItem onClick={handleClose}>
//                         <Typography>{name}</Typography>
//                       </MenuItem>
//                       <MenuItem onClick={handleClickOpen}>
//                         <GroupIcon sx={{ mr: 1 }} /> View Roles
//                       </MenuItem>
//                       <MenuItem
//                         onClick={(e) => {
//                           e.stopPropagation();
//                         }}
//                       >
//                         <MyProfile />
//                       </MenuItem>
//                     </Menu>
//                   </Box>
//                 ) : (
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <Typography sx={{ mr: 2 }}>{name}</Typography>
//                     <Tooltip title="View Roles" arrow>
//                       <IconButton onClick={handleClickOpen} color="inherit">
//                         <GroupIcon />
//                       </IconButton>
//                     </Tooltip>
//                     <MyProfile />
//                   </Box>
//                 )}
//               </>
//             ) : (
//               <Button
//                 onClick={handleLogin}
//                 variant="outlined"
//                 color="primary"
//                 sx={{ my: 1, mx: 1.5 }}
//               >
//                 Login
//               </Button>
//             )}
//           </Toolbar>
//         </Container>
//       </AppBar>

//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="roles-modal-title"
//         aria-describedby="roles-modal-description"
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 300,
//             bgcolor: "background.paper",
//             border: "2px solid #000",
//             boxShadow: 24,
//             p: 4,
//           }}
//         >
//           <Typography
//             id="roles-modal-title"
//             variant="h6"
//             component="h2"
//             style={{ textAlign: "center" }}
//           >
//             Roles
//           </Typography>
//           <ul
//             style={{ listStyleType: "none", padding: 0, textAlign: "center" }}
//           >
//             {roles.map((role, index) => (
//               <li key={index}>{role}</li>
//             ))}
//           </ul>
//           <Box display="flex" justifyContent="center" mt={2}>
//             <Button variant="contained" onClick={handleClose}>
//               Close
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default AppNavbar;


import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  useTheme,
  Modal,
  useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import GroupIcon from "@mui/icons-material/Group";
import MyProfile from "./MyProfile"; // Assuming this is your custom component
import logoImg from "./Images/logo.png";
import { useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";

const AppNavbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);
  const empId = useSelector((state) => state.auth.empId);
  const name = useSelector((state) => state.auth.name);
  const roles = useSelector((state) => state.auth.roles);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoginButton, setShowLoginButton] = useState(true);

  useEffect(() => {
    // Check if the current route is the login page
    if (location.pathname === "/login") {
      setShowLoginButton(false);
    } else {
      setShowLoginButton(true);
    }
  }, [location.pathname]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleLogin = () => {
    setShowLoginButton(false); // Hide the button when clicked
    navigate("/login");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Container sx={{ maxWidth: 'none !important' }}>
          <Toolbar disableGutters>
            <Link
              to="/"
              style={{ flexGrow: 1, display: "flex", alignItems: "center" }}
            >
              <img
                src={logoImg}
                alt="Logo"
                style={{ height: "40px" }}
              />
            </Link>

            {empId ? (
              <>
                {isMobile ? (
                  <Box>
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      onClick={handleMenu}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>
                        <Typography>{name}</Typography>
                      </MenuItem>
                      <MenuItem onClick={handleClickOpen}>
                        <GroupIcon sx={{ mr: 1 }} /> View Roles
                      </MenuItem>
                      <MenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <MyProfile />
                      </MenuItem>
                    </Menu>
                  </Box>
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography sx={{ mr: 2 }}>{name}</Typography>
                    <Tooltip title="View Roles" arrow>
                      <IconButton onClick={handleClickOpen} color="inherit">
                        <GroupIcon />
                      </IconButton>
                    </Tooltip>
                    <MyProfile />
                  </Box>
                )}
              </>
            ) : (
              showLoginButton && (
                <Button
                  onClick={handleLogin}
                  variant="outlined"
                  color="primary"
                  sx={{ my: 1, mx: 1.5 }}
                >
                  Login
                </Button>
              )
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="roles-modal-title"
        aria-describedby="roles-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="roles-modal-title"
            variant="h6"
            component="h2"
            style={{ textAlign: "center" }}
          >
            Roles
          </Typography>
          <ul
            style={{ listStyleType: "none", padding: 0, textAlign: "center" }}
          >
            {roles.map((role, index) => (
              <li key={index}>{role}</li>
            ))}
          </ul>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AppNavbar;

