// import React, { useState,useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   Dropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
// } from "reactstrap";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import LoadingPage from "./LoadingPage";
// import "./Hrmscss/App.css";

// const UserProfileDropdown = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [profilePicture, setProfilePicture] = useState(null);
//   const token = localStorage.getItem("response-token");
//   const navigate = useNavigate();
//  const EmpId = localStorage.getItem("EmpID");

//   useEffect(() => {
//     console.log("Component mounted. Fetching profile picture...");
//     fetchProfilePicture();
//   }, []);

//   const toggle = () => setDropdownOpen((prevState) => !prevState);

//   const fetchProfilePicture = async () => {
//     console.log("Fetching profile picture...");
//     try {
//       const response = await axios.get(
//         `/sit/gateway/hrms/employee/profilePicture/${EmpId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           responseType: "arraybuffer",
//         }
//       );
//       console.log("Profile picture response:", response);

//       if (response.status === 200) {
//         const contentType = response.headers["content-type"];
//         const blob = new Blob([response.data], { type: contentType });
//         const imageUrl = URL.createObjectURL(blob);
//         setProfilePicture(imageUrl);
//         console.log("Profile picture set.");
//       }
//     } catch (error) {
//       console.error("Error fetching profile picture", error);
//     }
//   };

//   const handleLogout = () => {
//     setLoading(true);
//     axios
//       .post(
//         `/apigateway/api/user/logout`,
//         {
//           deviceInfo: {
//             deviceId: "D1",
//             deviceType: "DEVICE_TYPE_ANDROID",
//             notificationToken: null,
//           },
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((res) => {
//         if (res.status === 200) {
//           setTimeout(() => {
//             toast.success("Logout Successful.", {
//               position: "top-center",
//               theme: "colored",
//             });
//             navigate("/");
//             window.location.reload();
//             localStorage.clear();
//             setLoading(false);
//           }, 4000);
//         }
//       })
//       .catch((error) => {
//         localStorage.clear();
//         toast.error(error.response.data.message || "Error while logging out.");
//         window.location.reload();
//         setLoading(false);
//       });
//   };

//   return (
//     <Dropdown isOpen={dropdownOpen} toggle={toggle}>
//       {loading ? <LoadingPage /> : ""}
//       <DropdownToggle className="btn btn-floating dropdown-toggle hidden-arrow bg-dark rounded-circle">
//         {profilePicture ? (
//           <img src={profilePicture} alt="Profile" className="rounded-circle" width="40" height="40"/>
//         ) : (
//           <i className="fas fa-user-alt" />
//         )}
//       </DropdownToggle>
//       <DropdownMenu>
//         <DropdownItem
//           style={{ fontSize: "15px", padding: "10px" }}
//           className=" d-flex justify-content-between"
//         >
//           <Link to="/MyProfileDetails" className="Candidate-id2">
//             My Profile
//           </Link>
//           <i className="fas fa-user-alt " />
//         </DropdownItem>
//         <DropdownItem
//           style={{ fontSize: "15px", padding: "10px" }}
//           className=" d-flex justify-content-between"
//         >
//           <Link to="/ChangepasswordForm" className="Candidate-id2">
//             Change Password
//           </Link>
//           <i className="fas fa-key"></i>
//         </DropdownItem>
//         <DropdownItem
//           style={{ fontSize: "15px", padding: "10px" }}
//           className=" d-flex justify-content-between"
//         >
//           <Link to="/ManageRoles" className="Candidate-id2">
//             Manage Permission
//           </Link>
//           <i class="fa fa-user-plus" aria-hidden="true"></i>
//         </DropdownItem>
//         <DropdownItem style={{ fontSize: "15px", padding: "10px" }} className=" d-flex justify-content-between"
//           onClick={handleLogout}>
//          Logout
//          <i class="fas fa-sign-out-alt"></i>
//         </DropdownItem>
//       </DropdownMenu>
//     </Dropdown>
//   );
// };

// export default UserProfileDropdown;
import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingPage from "./LoadingPage";
import LockIcon from "@mui/icons-material/Lock";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import Logout from "@mui/icons-material/Logout";
import { useSelector } from 'react-redux';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [profilePicture, setProfilePicture] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  // const token = localStorage.getItem("response-token");
  // const EmpId = localStorage.getItem("EmpID");
  const  token = useSelector((state) => state.auth.token);
  const  EmpId = useSelector((state) => state.auth.empId);

  React.useEffect(() => {
    fetchProfilePicture();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchProfilePicture = async () => {
    try {
      const response = await axios.get(
        `/apigateway/hrms/employee/profilePicture/${EmpId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "arraybuffer",
        }
      );
      if (response.status === 200) {
        const contentType = response.headers["content-type"];
        const blob = new Blob([response.data], { type: contentType });
        const imageUrl = URL.createObjectURL(blob);
        setProfilePicture(imageUrl);
      }
    } catch (error) {
      console.error("Error fetching profile picture", error);
    }
  };

  const handleLogout = () => {
    setLoading(true);
    axios
      .post(
        `/apigateway/api/user/logout`,
        {
          deviceInfo: {
            deviceId: "D1",
            deviceType: "DEVICE_TYPE_ANDROID",
            notificationToken: null,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setTimeout(() => {
            toast.success("Logout Successful.", {
              position: "top-center",
              theme: "colored",
            });
            navigate("/");
            window.location.reload();
            localStorage.clear();
            setLoading(false);
          }, 4000);
        }
      })
      .catch((error) => {
        localStorage.clear();
        toast.error(error.response.data.message || "Error while logging out.");
        window.location.reload();
        setLoading(false);
      });
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {loading ? (
              <LoadingPage />
            ) : profilePicture ? (
              <Avatar src={profilePicture} />
            ) : (
              <Avatar />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem component={Link} to="/MyProfileDetails" onClick={handleClose}>
          <ListItemIcon>
              <Avatar fontSize="small" />
          </ListItemIcon>
          My Profile
        </MenuItem>
        <MenuItem
          component={Link}
          to="/ChangepasswordForm"
          onClick={handleClose}
        >
          <ListItemIcon>
            <Avatar>
              <LockIcon fontSize="small" />
            </Avatar>
          </ListItemIcon>
          Change Password
        </MenuItem>
        <MenuItem component={Link} to="/ManageRoles" onClick={handleClose}>
          <ListItemIcon>
            <Avatar>
              <SupervisorAccountIcon fontSize="small" />
            </Avatar>
          </ListItemIcon>
          Manage Permission
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
