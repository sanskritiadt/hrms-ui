// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
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
// import LoadingPage from "./LoadingPage";
// import { useSelector } from 'react-redux';
// import ManageAssetAttributes from './ManageAssetAttributes';

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialogContent-root": {
//     padding: theme.spacing(2),
//   },
//   "& .MuiDialogActions-root": {
//     padding: theme.spacing(1),
//   },
// }));

// const ManageAsset = () => {
//   const token = useSelector((state) => state.auth.token);
//   const [newAssetType, setNewAssetType] = useState({
//     assetName: ""
//   });
//   const [open, setOpen] = useState(false);
//   const [assetTypeData, setAssetTypeData] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [editingAssetType, setEditingAssetType] = useState(null);
//   const [totalElements, setTotalElements] = useState(0);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchAssetTypeData(page, rowsPerPage);
//   }, [page, rowsPerPage]);

//   const fetchAssetTypeData = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `/apigateway/hrms/masterAsset/getAllAssetType`,
//         {
//           params: { page, size: rowsPerPage },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setAssetTypeData(response.data.data);
//       setTotalElements(response.data.totalElements);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching asset type data", error);
//       toast.error(
//         error.response?.data?.message || "Failed to fetch asset type data"
//       );
//       setLoading(false);
//     }
//   };

//   const handleAddAssetType = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.post(
//         `/apigateway/hrms/masterAsset/addAssetType`,
//         newAssetType,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setAssetTypeData([...assetTypeData, response.data]);
//       setNewAssetType({ assetName: "" });
//       toast.success("Asset type added successfully");
//       fetchAssetTypeData();
//       setLoading(false);
//     } catch (error) {
//       console.error("Error adding asset type", error);
//       toast.error(error.response.data.message || "Failed to add asset type");
//       setLoading(false);
//     }
//   };

//   const handleDeleteAssetType = async (assetTypeId) => {
//     if (!window.confirm("Are you sure you want to delete this asset type?")) {
//       return;
//     }
//     try {
//       setLoading(true);
//       await axios.delete(
//         `/apigateway/hrms/masterAsset/deleteAssetTypeById/${assetTypeId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setAssetTypeData(assetTypeData.filter((type) => type.id !== assetTypeId));
//       toast.success("Asset type deleted successfully");
//       fetchAssetTypeData();
//       setLoading(false);
//     } catch (error) {
//       console.error("Error deleting asset type", error);
//       toast.error(
//         error.response.data.message || "Failed to delete asset type"
//       );
//       setLoading(false);
//     }
//   };

//   const handleEditAssetType = (assetType) => {
//     setEditingAssetType(assetType);
//   };
// //curl --location --request PUT 'http://localhost:9093/hrms/masterAsset/updateAssetTypeById/14?assetTypeName=MOUSE'
//   const handleSaveAssetType = async () => {
//     try {
//       setLoading(true);
//       await axios.put(
//         `/apigateway/hrms/masterAsset/updateAssetTypeById/${editingAssetType.id}?assetTypeName=${editingAssetType.assetName}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setAssetTypeData(
//         assetTypeData.map((type) =>
//           type.id === editingAssetType.id ? editingAssetType : type
//         )
//       );
//       setEditingAssetType(null);
//       toast.success("Asset type updated successfully");
//       fetchAssetTypeData();
//       setLoading(false);
//     } catch (error) {
//       console.error("Error updating asset type", error);
//       toast.error(
//         error.response.data.message || "Failed to update asset type"
//       );
//       setLoading(false);
//     }
//   };

// //   const handleChangePage = async (event, newPage) => {
// //     setPage(newPage);
// //   };

// //   const handleChangeRowsPerPage = (event) => {
// //     const newRowsPerPage = parseInt(event.target.value, 10);
// //     setRowsPerPage(newRowsPerPage);
// //     setPage(0);
// //   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <Box
//       display="flex"
//       justifyContent="flex"
//       alignItems="center"
//       height="30vh"
//       width="22vh"
//     >
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Manage Asset Types
//       </Button>

//       <BootstrapDialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={open}
//       >  
//         {loading && <LoadingPage />}
//         <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
//           Manage Asset Types
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
//               label="Asset Type Name"
//               variant="outlined"
//               value={newAssetType.assetName}
//               onChange={(e) =>
//                 setNewAssetType({ ...newAssetType, assetName: e.target.value })
//               }
//               style={{ marginRight: "10px" }}
//             />
//             <IconButton color="primary" onClick={handleAddAssetType}>
//               <AddIcon />
//             </IconButton>
//           </Box>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Asset Type ID</TableCell>
//                   <TableCell>Asset Type Name</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {assetTypeData.map((type) => (
//                   <TableRow key={type.id}>
//                     <TableCell>{type.id}</TableCell>
//                     <TableCell>
//                       {editingAssetType && editingAssetType.id === type.id ? (
//                         <TextField
//                           value={editingAssetType.assetName}
//                           onChange={(e) =>
//                             setEditingAssetType({
//                               ...editingAssetType,
//                               assetName: e.target.value,
//                             })
//                           }
//                         />
//                       ) : (
//                         type.assetName
//                       )}
//                     </TableCell>
//                     <TableCell>
//                       {editingAssetType && editingAssetType.id === type.id ? (
//                         <IconButton color="primary" onClick={handleSaveAssetType}>
//                           <SaveIcon />
//                         </IconButton>
//                       ) : (
//                         <IconButton
//                           color="primary"
//                           onClick={() => handleEditAssetType(type)}
//                         >
//                           <EditIcon />
//                         </IconButton>
//                       )}
//                       <IconButton
//                         color="secondary"
//                         onClick={() => handleDeleteAssetType(type.id)}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                       <ManageAssetAttributes assetTypeId={type.id} />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//             {/* <TablePagination
//               rowsPerPageOptions={[10, 25, 50]}
//               component="div"
//               count={totalElements}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             /> */}
//           </TableContainer>
//         </DialogContent>
//       </BootstrapDialog>
//     </Box>
//   );
// };

// export default ManageAsset;

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
  Typography,
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
import { useSelector } from 'react-redux';
import ManageAssetAttributes from './ManageAssetAttributes';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ManageAsset = () => {
  const token = useSelector((state) => state.auth.token);
  const [newAssetType, setNewAssetType] = useState({
    assetName: ""
  });
  const [open, setOpen] = useState(false);
  const [assetTypeData, setAssetTypeData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editingAssetType, setEditingAssetType] = useState(null);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAssetTypeData(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const fetchAssetTypeData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/apigateway/hrms/masterAsset/getAllAssetType`,
        {
          params: { page, size: rowsPerPage },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAssetTypeData(response.data.data);
      setTotalElements(response.data.totalElements);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching asset type data", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch asset type data"
      );
      setLoading(false);
    }
  };

  const handleAddAssetType = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `/apigateway/hrms/masterAsset/addAssetType`,
        newAssetType,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAssetTypeData([...assetTypeData, response.data]);
      setNewAssetType({ assetName: "" });
      toast.success("Asset type added successfully");
      fetchAssetTypeData();
      setLoading(false);
    } catch (error) {
      console.error("Error adding asset type", error);
      toast.error(error.response.data.message || "Failed to add asset type");
      setLoading(false);
    }
  };

  const handleDeleteAssetType = async (assetTypeId) => {
    if (!window.confirm("Are you sure you want to delete this asset type?")) {
      return;
    }
    try {
      setLoading(true);
      await axios.delete(
        `/apigateway/hrms/masterAsset/deleteAssetTypeById/${assetTypeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAssetTypeData(assetTypeData.filter((type) => type.id !== assetTypeId));
      toast.success("Asset type deleted successfully");
      fetchAssetTypeData();
      setLoading(false);
    } catch (error) {
      console.error("Error deleting asset type", error);
      toast.error(
        error.response.data.message || "Failed to delete asset type"
      );
      setLoading(false);
    }
  };

  const handleEditAssetType = (assetType) => {
    setEditingAssetType(assetType);
  };

  const handleSaveAssetType = async () => {
    try {
      setLoading(true);
      await axios.put(
        `/apigateway/hrms/masterAsset/updateAssetTypeById/${editingAssetType.id}?assetTypeName=${editingAssetType.assetName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAssetTypeData(
        assetTypeData.map((type) =>
          type.id === editingAssetType.id ? editingAssetType : type
        )
      );
      setEditingAssetType(null);
      toast.success("Asset type updated successfully");
      fetchAssetTypeData();
      setLoading(false);
    } catch (error) {
      console.error("Error updating asset type", error);
      toast.error(
        error.response.data.message || "Failed to update asset type"
      );
      setLoading(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box display="flex" justifyContent="flex" alignItems="center" height="100vh">
      <Button variant="outlined" onClick={handleClickOpen}>
        Manage Asset Types
      </Button>

      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        {loading && <LoadingPage />}
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Manage Asset Types
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box display="flex" alignItems="center" mb={2}>
            <TextField
              label="Asset Type Name"
              variant="outlined"
              value={newAssetType.assetName}
              onChange={(e) => setNewAssetType({ ...newAssetType, assetName: e.target.value })}
              style={{ marginRight: "10px" }}
              fullWidth
            />
            <IconButton color="primary" onClick={handleAddAssetType}>
              <AddIcon />
            </IconButton>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Asset Type ID</TableCell>
                  <TableCell>Asset Type Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assetTypeData.map((type) => (
                  <TableRow key={type.id}>
                    <TableCell>{type.id}</TableCell>
                    <TableCell>
                      {editingAssetType && editingAssetType.id === type.id ? (
                        <TextField
                          value={editingAssetType.assetName}
                          onChange={(e) =>
                            setEditingAssetType({
                              ...editingAssetType,
                              assetName: e.target.value,
                            })
                          }
                          fullWidth
                        />
                      ) : (
                        <Typography>{type.assetName}</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingAssetType && editingAssetType.id === type.id ? (
                        <IconButton color="primary" onClick={handleSaveAssetType}>
                          <SaveIcon />
                        </IconButton>
                      ) : (
                        <IconButton color="primary" onClick={() => handleEditAssetType(type)}>
                          <EditIcon />
                        </IconButton>
                      )}
                      <IconButton color="secondary" onClick={() => handleDeleteAssetType(type.id)}>
                        <DeleteIcon />
                      </IconButton>
                      <ManageAssetAttributes assetTypeId={type.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </BootstrapDialog>
    </Box>
  );
};

export default ManageAsset;

