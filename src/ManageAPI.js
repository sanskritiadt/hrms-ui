// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   Divider,
//   IconButton,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import {
//   Close as CloseIcon,
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Save as SaveIcon,
// } from "@mui/icons-material";
// import { toast } from "react-toastify";
// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialogContent-root": {
//     padding: theme.spacing(2),
//   },
//   "& .MuiDialogActions-root": {
//     padding: theme.spacing(1),
//   },
// }));
// const ManageAPI = () => {
//   const token = localStorage.getItem("response-token");
//   const [newRole, setNewRole] = useState({
//     apiName: "",
//     methodType: "",
//     serviceName: "",
//   });
//   const [open, setOpen] = useState(false);
//   const [apiData, setApiData] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [editingApi, setEditingApi] = useState(null);
//   const [totalPages, setTotalPages] = useState(0);
//   const [totalElements, setTotalElements] = useState(0);
  
//   useEffect(() => {
//     fetchApiData();
//   }, []);

//   const fetchApiData = async () => {
//     try {
//       const response = await axios.get(
//         `/apigateway/api/role/getAllApiDetails?page=${page}&size=${rowsPerPage}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const { content, totalPages, totalElements } = response.data;
//       setApiData(content);
//       setTotalPages(totalPages);
//       setTotalElements(totalElements);
//     } catch (error) {
//       console.error("Error fetching API data", error);
//       toast.error(
//         error.response?.data?.message || "Failed to fetch API data"
//       );
//     }
//   };

//   const handleAddRole = async () => {
//     try {
//       const response = await axios.post(
//         "/apigateway/api/role/saveApiDetails",
//         newRole,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setApiData([...apiData, response.data]);
//       setNewRole({ apiName: "", methodType: "", serviceName: "" });
//       toast.success(response.data);
//     } catch (error) {
//       console.error("Error adding role", error);
//       toast.error(error.response.data.message || "Failed to add API details");
//     }
//   };

//   const handleDeleteRole = async (apiName) => {
//     if (!window.confirm("Are you sure you want to delete this api?")) {
//       return;
//     }
//     try {
//       const response = await axios.delete(
//         `/apigateway/api/role/deleteApiDetailData?apiName=${apiName}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setApiData(apiData.filter((role) => role.apiName !== apiName));
//       toast.success(response.data);
//     } catch (error) {
//       console.error("Error deleting role", error);
//       toast.error(
//         error.response.data.message || "Failed to delete API details"
//       );
//     }
//   };

//   const handleEditApi = (api) => {
//     setEditingApi(api);
//   };

//   const handleSaveApi = async () => {
//     try {
//       const response = await axios.put(
//         "/apigateway/api/role/updateApiDetails",
//         editingApi,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setApiData(
//         apiData.map((api) =>
//           api.apiId === editingApi.apiId ? editingApi : api
//         )
//       );
//       setEditingApi(null);
//       toast.success(response.data);
//     } catch (error) {
//       console.error("Error updating API", error);
//       toast.error(
//         error.response.data.message || "Failed to update API details"
//       );
//     }
//   };
  
//   const handleChangePage = async (event, newPage) => {
//     try {
//       const response = await axios.get(
//         `/apigateway/api/role/getAllApiDetails?page=${newPage}&size=${rowsPerPage}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const { content } = response.data;
//       setApiData([...apiData, ...content]);
//       setPage(newPage);
//     } catch (error) {
//       console.error("Error fetching API data", error);
//       toast.error(
//         error.response?.data?.message || "Failed to fetch API data"
//       );
//     }
//   };
  
  
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//     fetchApiData(0, parseInt(event.target.value, 10));
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//       <Box
//         display="flex"
//          justifyContent="flex"
//         alignItems="center"
//         height="30vh"
//         width="30vh"
//         marginRight="5vh"
//       >
//         <Button variant="outlined" onClick={handleClickOpen}>
//           Manage API
//         </Button>
   
      
//       <BootstrapDialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={open}
//       >
//         <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
//           ManageAPI
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
//               label="API name"
//               variant="outlined"
//               value={newRole.apiName}
//               onChange={(e) =>
//                 setNewRole({ ...newRole, apiName: e.target.value })
//               }
//               style={{ marginRight: "10px" }}
//             />
//             <TextField
//               label="Method Type"
//               variant="outlined"
//               value={newRole.methodType}
//               onChange={(e) =>
//                 setNewRole({ ...newRole, methodType: e.target.value })
//               }
//               style={{ marginRight: "10px" }}
//             />
//             <TextField
//               label="Service Name"
//               variant="outlined"
//               value={newRole.serviceName}
//               onChange={(e) =>
//                 setNewRole({ ...newRole, serviceName: e.target.value })
//               }
//               style={{ marginRight: "10px" }}
//             />
//             <IconButton color="primary" onClick={handleAddRole}>
//               <AddIcon />
//             </IconButton>
//           </Box>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>API ID</TableCell>
//                   <TableCell>API Name</TableCell>
//                   <TableCell>methodType</TableCell>
//                   <TableCell>Service Name</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {apiData
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((api) => (
//                     <TableRow key={api.apiId}>
//                       <TableCell>{api.apiId}</TableCell>
//                       <TableCell>
//                         {editingApi && editingApi.apiId === api.apiId ? (
//                           <TextField
//                             value={editingApi.apiName}
//                             onChange={(e) =>
//                               setEditingApi({
//                                 ...editingApi,
//                                 apiName: e.target.value,
//                               })
//                             }
//                           />
//                         ) : (
//                           api.apiName
//                         )}
//                       </TableCell>
//                       <TableCell>
//                         {editingApi && editingApi.apiId === api.apiId ? (
//                           <TextField
//                             value={editingApi.methodType}
//                             onChange={(e) =>
//                               setEditingApi({
//                                 ...editingApi,
//                                 methodType: e.target.value,
//                               })
//                             }
//                           />
//                         ) : (
//                           api.methodType
//                         )}
//                       </TableCell>
//                       <TableCell>
//                         {editingApi && editingApi.apiId === api.apiId ? (
//                           <TextField
//                             value={editingApi.serviceName}
//                             onChange={(e) =>
//                               setEditingApi({
//                                 ...editingApi,
//                                 serviceName: e.target.value,
//                               })
//                             }
//                           />
//                         ) : (
//                           api.serviceName
//                         )}
//                       </TableCell>
//                       <TableCell>
//                         {editingApi && editingApi.apiId === api.apiId ? (
//                           <IconButton color="primary" onClick={handleSaveApi}>
//                             <SaveIcon />
//                           </IconButton>
//                         ) : (
//                           <IconButton
//                             color="primary"
//                             onClick={() => handleEditApi(api)}
//                           >
//                             <EditIcon />
//                           </IconButton>
//                         )}
//                         <IconButton
//                           color="secondary"
//                           onClick={() => handleDeleteRole(api.apiName)}
//                         >
//                           <DeleteIcon />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))}
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
//       </Box>
//   );
// };

// export default ManageAPI;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Close as CloseIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import LoadingPage from "./LoadingPage"; 


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ManageAPI = () => {
  const token = localStorage.getItem("response-token");
  const [newRole, setNewRole] = useState({
    apiName: "",
    methodType: "",
    serviceName: "",
  });
  const [open, setOpen] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingApi, setEditingApi] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetchApiData(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const fetchApiData = async (page, rowsPerPage) => {
    try {
      setLoading(true)
      const response = await axios.get(
        `/apigateway/api/role/getAllApiDetails?page=${page}&size=${rowsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { content, totalPages, totalElements } = response.data;
      setApiData(content);
      setTotalPages(totalPages);
      setTotalElements(totalElements);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching API data", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch API data"
      );
      setLoading(false)
    }
  };

  const handleAddRole = async () => {
    try {
      setLoading(true)
      const response = await axios.post(
        "/apigateway/api/role/saveApiDetails",
        newRole,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApiData([...apiData, response.data]);
      setNewRole({ apiName: "", methodType: "", serviceName: "" });
      toast.success(response.data);
      setLoading(false)
    } catch (error) {
      console.error("Error adding role", error);
      toast.error(error.response.data.message || "Failed to add API details");
      setLoading(false)
    }
  };

  const handleDeleteRole = async (apiName) => {
    if (!window.confirm("Are you sure you want to delete this api?")) {
      return;
    }
    try {
      setLoading(true)
      const response = await axios.delete(
        `/apigateway/api/role/deleteApiDetailData?apiName=${apiName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApiData(apiData.filter((role) => role.apiName !== apiName));
      toast.success(response.data);
      setLoading(false)
    } catch (error) {
      console.error("Error deleting role", error);
      toast.error(
        error.response.data.message || "Failed to delete API details"
      );
      setLoading(false)
    }
  };

  const handleEditApi = (api) => {
    setEditingApi(api);
  };

  const handleSaveApi = async () => {
    try {
      setLoading(true)
      const response = await axios.put(
        "/apigateway/api/role/updateApiDetails",
        editingApi,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApiData(
        apiData.map((api) =>
          api.apiId === editingApi.apiId ? editingApi : api
        )
      );
      setEditingApi(null);
      toast.success(response.data);
      setLoading(false)
    } catch (error) {
      console.error("Error updating API", error);
      toast.error(
        error.response.data.message || "Failed to update API details"
      );
      setLoading(false)
    }
  };

  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="flex"
      alignItems="center"
      height="30vh"
      width="22vh"
    >
      <Button variant="outlined" onClick={handleClickOpen}>
        Manage API
      </Button>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >  {loading ? <LoadingPage/> : ''}
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Manage API
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
              label="API name"
              variant="outlined"
              value={newRole.apiName}
              onChange={(e) =>
                setNewRole({ ...newRole, apiName: e.target.value })
              }
              style={{ marginRight: "10px" }}
            />
            <TextField
              label="Method Type"
              variant="outlined"
              value={newRole.methodType}
              onChange={(e) =>
                setNewRole({ ...newRole, methodType: e.target.value })
              }
              style={{ marginRight: "10px" }}
            />
            <TextField
              label="Service Name"
              variant="outlined"
              value={newRole.serviceName}
              onChange={(e) =>
                setNewRole({ ...newRole, serviceName: e.target.value })
              }
              style={{ marginRight: "10px" }}
            />
            <IconButton color="primary" onClick={handleAddRole}>
              <AddIcon />
            </IconButton>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>API ID</TableCell>
                  <TableCell>API Name</TableCell>
                  <TableCell>Method Type</TableCell>
                  <TableCell>Service Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {apiData.map((api) => (
                  <TableRow key={api.apiId}>
                    <TableCell>{api.apiId}</TableCell>
                    <TableCell>
                      {editingApi && editingApi.apiId === api.apiId ? (
                        <TextField
                          value={editingApi.apiName}
                          onChange={(e) =>
                            setEditingApi({
                              ...editingApi,
                              apiName: e.target.value,
                            })
                          }
                        />
                      ) : (
                        api.apiName
                      )}
                    </TableCell>
                    <TableCell>
                      {editingApi && editingApi.apiId === api.apiId ? (
                        <TextField
                          value={editingApi.methodType}
                          onChange={(e) =>
                            setEditingApi({
                              ...editingApi,
                              methodType: e.target.value,
                            })
                          }
                        />
                      ) : (
                        api.methodType
                      )}
                    </TableCell>
                    <TableCell>
                      {editingApi && editingApi.apiId === api.apiId ? (
                        <TextField
                          value={editingApi.serviceName}
                          onChange={(e) =>
                            setEditingApi({
                              ...editingApi,
                              serviceName: e.target.value,
                            })
                          }
                        />
                      ) : (
                        api.serviceName
                      )}
                    </TableCell>
                    <TableCell>
                      {editingApi && editingApi.apiId === api.apiId ? (
                        <IconButton color="primary" onClick={handleSaveApi}>
                          <SaveIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          color="primary"
                          onClick={() => handleEditApi(api)}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeleteRole(api.apiName)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
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

export default ManageAPI;
