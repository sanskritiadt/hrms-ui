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

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialogContent-root": {
//     padding: theme.spacing(2),
//   },
//   "& .MuiDialogActions-root": {
//     padding: theme.spacing(1),
//   },
// }));

// const ManageAssetAttributes = ({ assetTypeId }) => {
//   const token = useSelector((state) => state.auth.token);
//   const [newAttribute, setNewAttribute] = useState({
//     assetAttributeName: "",
//   });
//   const [open, setOpen] = useState(false);
//   const [attributes, setAttributes] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [editingAttribute, setEditingAttribute] = useState(null);
//   const [totalElements, setTotalElements] = useState(0);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (assetTypeId) {
//       fetchAttributes(page, rowsPerPage);
//     }
//   }, [assetTypeId, page, rowsPerPage]);

//   const fetchAttributes = async (page, rowsPerPage) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `/apigateway/hrms/masterAsset/getAllAssetAttributesByAssetTypeId/${assetTypeId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setAttributes(response.data.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching attributes", error);
//       toast.error(
//         error.response?.data?.message || "Failed to fetch attributes"
//       );
//       setLoading(false);
//     }
//   };

//   const handleAddAttribute = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.post(
//         `/apigateway/hrms/masterAsset/addAssetAttributeByAssetTypeId/${assetTypeId}?assetAttributeName=${newAttribute.assetAttributeName}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setAttributes([...attributes, response.data]);
//       setNewAttribute({ assetAttributeName: "" });
//       toast.success(response.data);
//       fetchAttributes();
//       setLoading(false);
//     } catch (error) {
//       console.error("Error adding attribute", error);
//       toast.error(error.response.data.message || "Failed to add attribute");
//       setLoading(false);
//     }
//   };

//   const handleDeleteAttribute = async (attributeId) => {
//     if (!window.confirm("Are you sure you want to delete this attribute?")) {
//       return;
//     }
//     try {
//       setLoading(true);
//       const response = await axios.delete(
//         `/apigateway/hrms/masterAsset/deleteAssetAttributeById/${attributeId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setAttributes(attributes.filter((attr) => attr.id !== attributeId));
//       toast.success(response.data);
//       fetchAttributes()
//       setLoading(false);
//     } catch (error) {
//       console.error("Error deleting attribute", error);
//       toast.error(
//         error.response.data.message || "Failed to delete attribute"
//       );
//       setLoading(false);
//     }
//   };

//   const handleEditAttribute = (attribute) => {
//     setEditingAttribute(attribute);
//   };

//   const handleSaveAttribute = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.put(
//         `/apigateway/hrms/masterAsset/updateAssetAttributeById/${editingAttribute.id}?assetTypeId=${assetTypeId}&assetAttributeName=${editingAttribute.assetAttributeName}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setAttributes(
//         attributes.map((attr) =>
//           attr.id === editingAttribute.id ? editingAttribute : attr
//         )
//       );
//       setEditingAttribute(null);
//       toast.success(response.data);
//       fetchAttributes();
//       setLoading(false);
//     } catch (error) {
//       console.error("Error updating attribute", error);
//       toast.error(
//         error.response.data.message || "Failed to update attribute"
//       );
//       setLoading(false);
//     }
//   };

//   const handleChangePage = async (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     const newRowsPerPage = parseInt(event.target.value, 10);
//     setRowsPerPage(newRowsPerPage);
//     setPage(0);
//   };

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
//         Manage Asset Attributes
//       </Button>

//       <BootstrapDialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={open}
//       >
//         {loading ? <LoadingPage /> : ''}
//         <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
//           Manage Asset Attributes
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
//               label="Attribute name"
//               variant="outlined"
//               value={newAttribute.assetAttributeName}
//               onChange={(e) =>
//                 setNewAttribute({ ...newAttribute, assetAttributeName: e.target.value })
//               }
//               style={{ marginRight: "10px" }}
//             />
//             <IconButton color="primary" onClick={handleAddAttribute}>
//               <AddIcon />
//             </IconButton>
//           </Box>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Attribute ID</TableCell>
//                   <TableCell>Attribute Name</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {attributes.map((attr) => (
//                   <TableRow key={attr.id}>
//                     <TableCell>{attr.id}</TableCell>
//                     <TableCell>
//                       {editingAttribute && editingAttribute.id === attr.id ? (
//                         <TextField
//                           value={editingAttribute.assetAttributeName}
//                           onChange={(e) =>
//                             setEditingAttribute({
//                               ...editingAttribute,
//                               assetAttributeName: e.target.value,
//                             })
//                           }
//                         />
//                       ) : (
//                         attr.assetAttributeName
//                       )}
//                     </TableCell>
//                     <TableCell>
//                       {editingAttribute && editingAttribute.id === attr.id ? (
//                         <IconButton color="primary" onClick={handleSaveAttribute}>
//                           <SaveIcon />
//                         </IconButton>
//                       ) : (
//                         <IconButton
//                           color="primary"
//                           onClick={() => handleEditAttribute(attr)}
//                         >
//                           <EditIcon />
//                         </IconButton>
//                       )}
//                       <IconButton
//                         color="secondary"
//                         onClick={() => handleDeleteAttribute(attr.id)}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
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

// export default ManageAssetAttributes;

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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ManageAssetAttributes = ({ assetTypeId }) => {
  const token = useSelector((state) => state.auth.token);
  const [newAssetAttribute, setNewAssetAttribute] = useState({
    assetAttributeName: "",
  });
  const [open, setOpen] = useState(false);
  const [assetAttributes, setAssetAttributes] = useState([]);
  const [editingAttribute, setEditingAttribute] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAssetAttributes();
  }, []);

  const fetchAssetAttributes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/apigateway/hrms/masterAsset/getAllAssetAttributesByAssetTypeId/${assetTypeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAssetAttributes(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching asset attributes", error);
    //   toast.error(
    //     error.response?.data?.message || "Failed to fetch asset attributes"
    //   );
      setLoading(false);
    }
  };

  const handleAddAssetAttribute = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `/apigateway/hrms/masterAsset/addAssetAttributeByAssetTypeId/${assetTypeId}?assetAttributeName=${newAssetAttribute.assetAttributeName}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAssetAttributes([...assetAttributes, response.data]);
      setNewAssetAttribute({ assetAttributeName: "" });
      toast.success("Asset attribute added successfully");
      fetchAssetAttributes();
      setLoading(false);
    } catch (error) {
      console.error("Error adding asset attribute", error);
      toast.error(error.response.data.message || "Failed to add asset attribute");
      setLoading(false);
    }
  };

  const handleDeleteAssetAttribute = async (attributeId) => {
    if (!window.confirm("Are you sure you want to delete this asset attribute?")) {
      return;
    }
    try {
      setLoading(true);
      await axios.delete(
        `/apigateway/hrms/masterAsset/deleteAssetAttributeById/${attributeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAssetAttributes(assetAttributes.filter((attr) => attr.id !== attributeId));
      toast.success("Asset attribute deleted successfully");
      fetchAssetAttributes();
      setLoading(false);
    } catch (error) {
      console.error("Error deleting asset attribute", error);
      toast.error(
        error.response.data.message || "Failed to delete asset attribute"
      );
      setLoading(false);
    }
  };

  const handleEditAssetAttribute = (attribute) => {
    setEditingAttribute(attribute);
  };

  const handleSaveAssetAttribute = async () => {
    try {
      setLoading(true);
      await axios.put(
        `/apigateway/hrms/masterAsset/updateAssetAttributeById/${editingAttribute.id}?assetTypeId=${assetTypeId}&assetAttributeName=${editingAttribute.assetAttributeName}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAssetAttributes(
        assetAttributes.map((attr) =>
          attr.id === editingAttribute.id ? editingAttribute : attr
        )
      );
      setEditingAttribute(null);
      toast.success("Asset attribute updated successfully");
      fetchAssetAttributes();
      setLoading(false);
    } catch (error) {
      console.error("Error updating asset attribute", error);
      toast.error(
        error.response.data.message || "Failed to update asset attribute"
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
    <Box display="flex" justifyContent="flex" alignItems="center">
      <IconButton color="primary" onClick={handleClickOpen}>
        <AddIcon />
      </IconButton>

      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        {loading && <LoadingPage />}
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Manage Asset Attributes
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
              label="Attribute Name"
              variant="outlined"
              value={newAssetAttribute.assetAttributeName}
              onChange={(e) =>
                setNewAssetAttribute({
                  ...newAssetAttribute,
                  assetAttributeName: e.target.value,
                })
              }
              style={{ marginRight: "10px" }}
              fullWidth
            />
            <IconButton color="primary" onClick={handleAddAssetAttribute}>
              <AddIcon />
            </IconButton>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Attribute Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assetAttributes.map((attr) => (
                  <TableRow key={attr.id}>
                    <TableCell>
                      {editingAttribute && editingAttribute.id === attr.id ? (
                        <TextField
                          value={editingAttribute.assetAttributeName}
                          onChange={(e) =>
                            setEditingAttribute({
                              ...editingAttribute,
                              assetAttributeName: e.target.value,
                            })
                          }
                          fullWidth
                        />
                      ) : (
                        <Typography>{attr.assetAttributeName}</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingAttribute && editingAttribute.id === attr.id ? (
                        <IconButton color="primary" onClick={handleSaveAssetAttribute}>
                          <SaveIcon />
                        </IconButton>
                      ) : (
                        <IconButton color="primary" onClick={() => handleEditAssetAttribute(attr)}>
                          <EditIcon />
                        </IconButton>
                      )}
                      <IconButton color="secondary" onClick={() => handleDeleteAssetAttribute(attr.id)}>
                        <DeleteIcon />
                      </IconButton>
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

export default ManageAssetAttributes;

