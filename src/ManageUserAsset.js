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

const ManageUserAsset = ({assetTypeData,fetchAssetTypeData}) => {
  const token = useSelector((state) => state.auth.token);
  const [open, setOpen] = useState(false);
  //const [assetTypeData, setAssetTypeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAssetType, setSelectedAssetType] = useState("");
  const [assetAttributes, setAssetAttributes] = useState([]);
  const [attributeValues, setAttributeValues] = useState({});

  // useEffect(() => {
  //   fetchAssetTypeData();
  // }, []);

  // const fetchAssetTypeData = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get(
  //       `/apigateway/hrms/masterAsset/getAllAssetType`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setAssetTypeData(response.data.data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching asset type data", error);
  //     toast.error(error.response?.data?.message || "Failed to fetch asset type data");
  //     setLoading(false);
  //   }
  // };

  const fetchAssetAttributes = async (assetTypeId) => {
    try {
      setLoading(true)
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
      },  fetchAssetTypeData(),
      setLoading(false)
      , {}));
    } catch (error) {
      console.error("Error fetching asset attributes", error);
      toast.error(error.response?.data?.message || "Failed to fetch asset attributes");
      setLoading(false);
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
      fetchAssetTypeData();
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
    setSelectedAssetType("");
    setAssetAttributes([]);
    setAttributeValues({});
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Button variant="outlined" onClick={handleClickOpen}>
        Assign Attribute
      </Button>
 
      <BootstrapDialog   fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      {loading && <LoadingPage />}
        <DialogTitle   sx={{ m: 0, p: 2 }} id="customized-dialog-title">
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
