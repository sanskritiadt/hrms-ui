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
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { toast } from "react-toastify";
// import LoadingPage from "./LoadingPage";
// import { useSelector } from 'react-redux';
// import {
//     Close as CloseIcon,
//     Add as AddIcon,
//     Edit as EditIcon,
//     Delete as DeleteIcon,
//     Save as SaveIcon,
//   } from "@mui/icons-material";

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialogContent-root": {
//     padding: theme.spacing(2),
//   },
//   "& .MuiDialogActions-root": {
//     padding: theme.spacing(1),
//   },
// }));

// const ManageUserAsset = () => {
//   const token = useSelector((state) => state.auth.token);
//   const [newAssetType, setNewAssetType] = useState({ assetName: "" });
//   const [open, setOpen] = useState(false);
//   const [assetTypeData, setAssetTypeData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedAssetType, setSelectedAssetType] = useState("");
//   const [assetAttributes, setAssetAttributes] = useState([]);
//   const [attributeValues, setAttributeValues] = useState({});

//   useEffect(() => {
//     fetchAssetTypeData();
//   }, []);

//   const fetchAssetTypeData = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `/apigateway/hrms/masterAsset/getAllAssetType`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//       );
//       setAssetTypeData(response.data.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching asset type data", error);
//       toast.error(error.response?.data?.message || "Failed to fetch asset type data");
//       setLoading(false);
//     }
//   };

//   const fetchAssetAttributes = async (assetTypeId) => {
//     try {
//       const response = await axios.get(
//         `/apigateway/hrms/masterAsset/getAllAssetAttributesByAssetTypeId/${assetTypeId}`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//       );
//       setAssetAttributes(response.data.data);
//       setAttributeValues(response.data.data.reduce((acc, attr) => {
//         acc[attr.asset_attribute_id] = "";
//         return acc;
//       }, {}));
//     } catch (error) {
//       console.error("Error fetching asset attributes", error);
//       toast.error(error.response?.data?.message || "Failed to fetch asset attributes");
//     }
//   };

//   const handleAddAssetType = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.post(
//         `/apigateway/hrms/masterAsset/addAssetType`,
//         newAssetType, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//       );
//       setAssetTypeData([...assetTypeData, response.data]);
//       setNewAssetType({ assetName: "" });
//       toast.success("Asset type added successfully");
//       fetchAssetTypeData();
//       setLoading(false);
//     } catch (error) {
//       console.error("Error adding asset type", error);
//       toast.error(error.response?.data?.message || "Failed to add asset type");
//       setLoading(false);
//     }
//   };

//   const handleSelectAssetType = (event) => {
//     const assetTypeId = event.target.value;
//     setSelectedAssetType(assetTypeId);
//     fetchAssetAttributes(assetTypeId);
//   };

//   const handleAttributeChange = (id, value) => {
//     setAttributeValues({ ...attributeValues, [id]: value });
//   };

//   const handleSubmit = async () => {
//     const payload = {
//       assetTypeId: selectedAssetType,
//       assetAttributeMappingList: Object.keys(attributeValues).map((key) => ({
//         asset_attribute_id: key,
//         assetAttributeValue: attributeValues[key],
//       })),
//     };

//     try {
//       await axios.post(
//         `/apigateway/hrms/masterAsset/saveAssetInfo`,
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       toast.success("Asset info saved successfully");
//       setOpen(false);
//     } catch (error) {
//       console.error("Error saving asset info", error);
//       toast.error(error.response?.data?.message || "Failed to save asset info");
//     }
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <Box display="flex" justifyContent="flex" alignItems="center" height="100vh">
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Assign Asset 
//       </Button>

//       <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
//         {loading && <LoadingPage />}
//         <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
//           Manage Asset Types
//           <IconButton
//             aria-label="close"
//             onClick={handleClose}
//             sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
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
//               onChange={(e) => setNewAssetType({ ...newAssetType, assetName: e.target.value })}
//               style={{ marginRight: "10px" }}
//               fullWidth
//             />
//             <IconButton color="primary" onClick={handleAddAssetType}>
//               <AddIcon />
//             </IconButton>
//           </Box>
//           <FormControl fullWidth margin="normal">
//             <InputLabel>Asset Type</InputLabel>
//             <Select
//               value={selectedAssetType}
//               onChange={handleSelectAssetType}
//               label="Asset Type"
//             >
//               {assetTypeData.map((type) => (
//                 <MenuItem key={type.id} value={type.id}>
//                   {type.assetName}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           {assetAttributes.map((attr) => (
//             <TextField
//               key={attr.asset_attribute_id}
//               label={attr.asset_attribute_name}
//               value={attributeValues[attr.asset_attribute_id]}
//               onChange={(e) => handleAttributeChange(attr.asset_attribute_id, e.target.value)}
//               fullWidth
//               margin="normal"
//             />
//           ))}
//           <Button variant="contained" color="primary" onClick={handleSubmit}>
//             Submit
//           </Button>
//         </DialogContent>
//       </BootstrapDialog>
//     </Box>
//   );
// };

// export default ManageUserAsset;
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import LoadingPage from "./LoadingPage";
import { useSelector } from 'react-redux';
import {
  Close as CloseIcon,
} from "@mui/icons-material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ManageUserAsset = () => {
  const token = useSelector((state) => state.auth.token);
  const [open, setOpen] = useState(false);
  const [assetTypeData, setAssetTypeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAssetType, setSelectedAssetType] = useState("");
  const [assetAttributes, setAssetAttributes] = useState([]);
  const [attributeValues, setAttributeValues] = useState({});

  useEffect(() => {
    fetchAssetTypeData();
  }, []);

  const fetchAssetTypeData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/apigateway/hrms/masterAsset/getAllAssetType`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAssetTypeData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching asset type data", error);
      toast.error(error.response?.data?.message || "Failed to fetch asset type data");
      setLoading(false);
    }
  };

  const fetchAssetAttributes = async (assetTypeId) => {
    try {
      const response = await axios.get(
        `/apigateway/hrms/masterAsset/getAllAssetAttributesByAssetTypeId/${assetTypeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAssetAttributes(response.data.data);
      setAttributeValues(response.data.data.reduce((acc, attr) => {
        acc[attr.id] = "";
        return acc;
      }, {}));
    } catch (error) {
      console.error("Error fetching asset attributes", error);
      toast.error(error.response?.data?.message || "Failed to fetch asset attributes");
    }
  };

  const handleSelectAssetType = (event) => {
    const assetTypeId = event.target.value;
    setSelectedAssetType(assetTypeId);
    fetchAssetAttributes(assetTypeId);
  };

  const handleAttributeChange = (id, value) => {
    setAttributeValues({ ...attributeValues, [id]: value });
  };

  const handleSubmit = async () => {
    const payload = {
      assetTypeId: selectedAssetType,
      assetAttributeMappingList: Object.keys(attributeValues).map((key) => ({
        asset_attribute_id: key,
        assetAttributeValue: attributeValues[key],
      })),
    };

    try {
        setLoading(true);
      await axios.post(
        `/apigateway/hrms/masterAsset/saveAssetInfo`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Asset info saved successfully");
      setLoading(false);
      setOpen(false);
    } catch (error) {
        setLoading(false);
      console.error("Error saving asset info", error);
      toast.error(error.response?.data?.message || "Failed to save asset info");
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Button variant="outlined" onClick={handleClickOpen}>
        Assign Attribute
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
          <FormControl fullWidth margin="normal">
            <InputLabel>Asset Type</InputLabel>
            <Select
              value={selectedAssetType}
              onChange={handleSelectAssetType}
              label="Asset Type"
            >
              {assetTypeData.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.assetName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {assetAttributes.map((attr) => (
            <TextField
              key={attr.id}
              label={attr.assetAttributeName}
              value={attributeValues[attr.id]}
              onChange={(e) => handleAttributeChange(attr.id, e.target.value)}
              fullWidth
              margin="normal"
            />
          ))}
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogContent>
      </BootstrapDialog>
    </Box>
  );
};

export default ManageUserAsset;
