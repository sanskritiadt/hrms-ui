// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   CircularProgress,
//   MenuItem,
//   Box,
//   Button,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   Checkbox,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { Close as CloseIcon, Search as SearchIcon } from "@mui/icons-material";
// import { toast } from "react-toastify";
// import LoadingPage from "./LoadingPage"; 


// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialogContent-root": {
//     padding: theme.spacing(2),
//   },
//   "& .MuiDialogActions-root": {
//     padding: theme.spacing(1),
//   },
// }));

// const TotalApiCount = ({ count }) => (
//     <Box mb={2}>
//      Selected APIs: {count}
//     </Box>
//   );

// const ManageAPIRoleMapping = () => {
//   const token = localStorage.getItem("response-token");
//   const [open, setOpen] = useState(false);
//   const [searchCriterion, setSearchCriterion] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [apiloading, setApiLoading] = useState(false);
//   const [allRoles, setAllRoles] = useState([]);
//   const [allApiData, setAllApiData] = useState([]);
//   const [roleApiData, setRoleApiData] = useState([]);
//   const [checkedApis, setCheckedApis] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [totalPages, setTotalPages] = useState(0);
//   const [totalElements, setTotalElements] = useState(0);
//   const [LoadingPage, setLoadingPage] = useState(false);


//   useEffect(() => {
//     const fetchAllRoles = async () => {
//       try {
//         const response = await axios.get("/apigateway/api/role/getAllRoles", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setAllRoles(response.data.content);
//       } catch (error) {
//         console.error("Error fetching all roles:", error);
//         toast.error(
//           error.response.data.message || "Error fetching all roles"
//         );
//       }
//     };

//     const fetchAllApis = async () => {
//       try {
//         const response = await axios.get(
//           "/apigateway/api/role/getAllApiDetails",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setAllApiData(response.data.content);
//         setTotalPages(response.data.totalPages);
//         setTotalElements(response.data.totalElements);
//       } catch (error) {
//         console.error("Error fetching all APIs:", error);
//         toast.error(
//           error.response.data.message || "Error fetching all APIs"
//         );
//       }
//     };

//     fetchAllRoles();
//     fetchAllApis();
//   }, [token]);

//   useEffect(() => {
//     const checkedApis = roleApiData.map((api) => api.api_name);
//     setCheckedApis(checkedApis);
//   }, [roleApiData]);

//   const handleCriterionChange = (event) => {
//     setSearchCriterion(event.target.value);
//   };


// const handleSearch = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `/apigateway/api/role/getListOfApiNameByRole?apiName=${searchCriterion}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setRoleApiData(response.data.body);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching API data:", error);
//       toast.error(
//         error.response.data.message || "Error fetching API data"
//       );
//       setLoading(false);
//     }
//   };

//   const handleUpdateApi = async () => {
//     setApiLoading(true);
//     try {
//       const response = await axios.put(
//         `/apigateway/api/role/addAndUpdateRoleMapping?roleName=${searchCriterion}`, checkedApis,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log('API role mappings updated successfully:', response.data);
//       setApiLoading(false);
//       toast.success(response.data || 'API role mappings updated successfully');
//     } catch (error) {
//       console.error('Error updating API role mappings:', error);
//       setApiLoading(false);
//       toast.error(
//         error.response.data.message || "Error updating API role mappings"
//       );
//     }
//   };
  
  

//   const handleToggle = (apiName) => {
//     setCheckedApis((prev) =>
//       prev.includes(apiName)
//         ? prev.filter((name) => name !== apiName)
//         : [...prev, apiName]
//     );
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//     fetchAllApis(newPage, rowsPerPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//     fetchAllApis(0, parseInt(event.target.value, 10));
//   };


//   const fetchAllApis = async (page, size) => {
//     try {
//       setLoadingPage(true)
//       const response = await axios.get(
//         `/apigateway/api/role/getAllApiDetails?page=${page}&size=${size}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setAllApiData(response.data.content);
//       setTotalPages(response.data.totalPages);
//       setTotalElements(response.data.totalElements);
//       setLoadingPage(false)
//     } catch (error) {
//       console.error("Error fetching all APIs:", error);
//       toast.error(
//         error.response.data.message || "Error fetching all APIs"
//       );
//       setLoadingPage(false)
//     }
//   };

//   return (
//     <Box
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       height="100vh"
//     >
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Manage API Role Mapping
//       </Button>
//       <BootstrapDialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={open}
//       > 
//         <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
//           Manage API Role Mapping
//           <IconButton
//             aria-label="close"
//             onClick={handleClose}
//             sx={{
//               position: "absolute",
//               right: 8,
//               top: 8,
//               color: (theme) => theme.palette.grey[500],
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           <Box display="flex" alignItems="center" mb={2}>
//             <TextField
//               select
//               label="Select Role"
//               value={searchCriterion}
//               onChange={handleCriterionChange}
//               variant="outlined"
//               sx={{ width: "39vh", mr: 1 }}
//             >
//               <MenuItem value="">Select Role</MenuItem>
//               {allRoles.map((role) => (
//                 <MenuItem key={role.id} value={role.role}>
//                   {role.role}
//                 </MenuItem>
//               ))}
//             </TextField>

//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSearch}
//               disabled={loading}
//               sx={{ width: "15vh", height: "8vh",marginRight:"5vh" }}
//             >
//               {loading ? <CircularProgress size={24} /> : "Search"}
//             </Button>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleUpdateApi}
//               disabled={loading}
//               sx={{ width: "15vh", height: "8vh" }}
//             >
//               {apiloading ? <CircularProgress size={24} /> : "Update API"}
//             </Button>
//           </Box>{LoadingPage ? <LoadingPage/> : ''}
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell><TotalApiCount count={checkedApis.length} /></TableCell>
//                   <TableCell>API Name</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {allApiData.map((api) => (
//                   <TableRow key={api.apiId}>
//                     <TableCell>
//                       <Checkbox
//                         checked={checkedApis.includes(api.apiName)}
//                         onChange={() => handleToggle(api.apiName)}
//                       />
//                     </TableCell>
//                     <TableCell>{api.apiName}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//             <TablePagination
//               rowsPerPageOptions={[10, 25, 50]}
//               component="div"
//               count={totalElements}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//           </TableContainer>
//         </DialogContent>
//       </BootstrapDialog>
//     </Box>
//   );
// };

// export default ManageAPIRoleMapping;
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CircularProgress,
  MenuItem,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Close as CloseIcon, Search as SearchIcon } from "@mui/icons-material";
import { toast } from "react-toastify";
import LoadingPage from "./LoadingPage";  // Ensure this path is correct

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const TotalApiCount = ({ count }) => (
  <Box mb={2}>Selected APIs: {count}</Box>
);

const ManageAPIRoleMapping = () => {
  const token = localStorage.getItem("response-token");
  const [open, setOpen] = useState(false);
  const [searchCriterion, setSearchCriterion] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiloading, setApiLoading] = useState(false);
  const [allRoles, setAllRoles] = useState([]);
  const [allApiData, setAllApiData] = useState([]);
  const [roleApiData, setRoleApiData] = useState([]);
  const [checkedApis, setCheckedApis] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loadingPage, setLoadingPage] = useState(false);  // Renamed to avoid conflict

  useEffect(() => {
    const fetchAllRoles = async () => {
      try {
        const response = await axios.get("/apigateway/api/role/getAllRoles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllRoles(response.data.content);
      } catch (error) {
        console.error("Error fetching all roles:", error);
        toast.error(
          error.response.data.message || "Error fetching all roles"
        );
      }
    };

    const fetchAllApis = async () => {
      try {
        const response = await axios.get(
          "/apigateway/api/role/getAllApiDetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAllApiData(response.data.content);
        setTotalPages(response.data.totalPages);
        setTotalElements(response.data.totalElements);
      } catch (error) {
        console.error("Error fetching all APIs:", error);
        toast.error(
          error.response.data.message || "Error fetching all APIs"
        );
      }
    };

    fetchAllRoles();
    fetchAllApis();
  }, [token]);

  useEffect(() => {
    const checkedApis = roleApiData.map((api) => api.api_name);
    setCheckedApis(checkedApis);
  }, [roleApiData]);

  const handleCriterionChange = (event) => {
    setSearchCriterion(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/apigateway/api/role/getListOfApiNameByRole?apiName=${searchCriterion}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRoleApiData(response.data.body);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching API data:", error);
      toast.error(
        error.response.data.message || "Error fetching API data"
      );
      setLoading(false);
    }
  };

  const handleUpdateApi = async () => {
    setApiLoading(true);
    try {
      const response = await axios.put(
        `/apigateway/api/role/addAndUpdateRoleMapping?roleName=${searchCriterion}`, checkedApis,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('API role mappings updated successfully:', response.data);
      setApiLoading(false);
      toast.success(response.data || 'API role mappings updated successfully');
    } catch (error) {
      console.error('Error updating API role mappings:', error);
      setApiLoading(false);
      toast.error(
        error.response.data.message || "Error updating API role mappings"
      );
    }
  };

  const handleToggle = (apiName) => {
    setCheckedApis((prev) =>
      prev.includes(apiName)
        ? prev.filter((name) => name !== apiName)
        : [...prev, apiName]
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchAllApis(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    fetchAllApis(0, parseInt(event.target.value, 10));
  };

  const fetchAllApis = async (page, size) => {
    try {
      setLoadingPage(true);
      const response = await axios.get(
        `/apigateway/api/role/getAllApiDetails?page=${page}&size=${size}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllApiData(response.data.content);
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);
      setLoadingPage(false);
    } catch (error) {
      console.error("Error fetching all APIs:", error);
      toast.error(
        error.response.data.message || "Error fetching all APIs"
      );
      setLoadingPage(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Button variant="outlined" onClick={handleClickOpen}>
        Manage API Role Mapping
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Manage API Role Mapping
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box display="flex" alignItems="center" mb={2}>
            <TextField
              select
              label="Select Role"
              value={searchCriterion}
              onChange={handleCriterionChange}
              variant="outlined"
              sx={{ width: "39vh", mr: 1 }}
            >
              <MenuItem value="">Select Role</MenuItem>
              {allRoles.map((role) => (
                <MenuItem key={role.id} value={role.role}>
                  {role.role}
                </MenuItem>
              ))}
            </TextField>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              disabled={loading}
              sx={{ width: "15vh", height: "8vh", marginRight: "5vh" }}
            >
              {loading ? <CircularProgress size={24} /> : "Search"}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateApi}
              disabled={loading}
              sx={{ width: "15vh", height: "8vh" }}
            >
              {apiloading ? <CircularProgress size={24} /> : "Update API"}
            </Button>
          </Box>
          {loadingPage ? <LoadingPage /> : ''}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TotalApiCount count={checkedApis.length} />
                  </TableCell>
                  <TableCell>API Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allApiData.map((api) => (
                  <TableRow key={api.apiId}>
                    <TableCell>
                      <Checkbox
                        checked={checkedApis.includes(api.apiName)}
                        onChange={() => handleToggle(api.apiName)}
                      />
                    </TableCell>
                    <TableCell>{api.apiName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={totalElements}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </DialogContent>
      </BootstrapDialog>
    </Box>
  );
};

export default ManageAPIRoleMapping;

