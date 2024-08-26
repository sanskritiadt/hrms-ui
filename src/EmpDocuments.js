import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  Box,
  Select,
  MenuItem,
  Typography,
  FormControl,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
} from "@mui/material";
import { toast } from "react-toastify";
import LoadingPage from "./LoadingPage";
import { useSelector } from "react-redux";
import { CloudDownload, Delete,CloudUpload } from "@mui/icons-material";
const useDocumentsByCategory = (token, category, setLoading) => {
  const [documents, setDocuments] = useState([]);

  const fetchDocuments = useCallback(async () => {
    if (!category) return;
    setLoading({ type: "documents", value: true });
    try {
      const { data } = await axios.get(
        `/apigateway/hrms/employee/getDocumentByCategory?documentCategoryType=${category}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDocuments(data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error fetching details");
    } finally {
      setLoading({ type: "documents", value: false });
    }
  }, [token, category, setLoading]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return { documents, fetchDocuments };
};

const DocumentUploadModal = ({
  isOpen,
  onClose,
  onSubmit,
  selectedDocumentType,
  setSelectedDocumentType,
  documents,
  loading,
}) => (
  <Modal open={isOpen} onClose={onClose}>
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        maxWidth: 400,
      }}
    >
      <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
        Upload Document
      </Typography>
      <form onSubmit={onSubmit}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mr: 2 }}>
            Document Type:
          </Typography>
          <FormControl fullWidth>
            <Select
              value={selectedDocumentType}
              onChange={(event) => setSelectedDocumentType(event.target.value)}
            >
              <MenuItem value="">
                <em>Select document type</em>
              </MenuItem>
              {documents.map((doc) => (
                <MenuItem key={doc.id} value={doc.id}>
                  {doc.documentType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <FormControl fullWidth>
          <Input type="file" id="myfile" name="myfile" />
        </FormControl>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" type="submit">
            Upload
          </Button>
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </Box>
      </form>
    </Box>
  </Modal>
);

const DocumentUpload = () => {
  const token = useSelector((state) => state.auth.token);
  const EmpId = useSelector((state) => state.auth.empId);

  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [loading, setLoading] = useState({ type: "", value: false });

  const categories = [
    "kyc_document",
    "personal_document",
    "professional_document",
    "academic_document",
  ];

  const { documents, fetchDocuments } = useDocumentsByCategory(
    token,
    categories[activeTab],
    setLoading
  );

  const fetchUploadedDocuments = useCallback(async () => {
    setLoading({ type: "uploadedDocs", value: true });
    try {
      const { data } = await axios.get(
        `/apigateway/hrms/employee/getAllDocumentDetailsByEmpId/${EmpId}/${categories[activeTab]}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUploadedDocuments(data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching uploaded documents");
    } finally {
      setLoading({ type: "uploadedDocs", value: false });
    }
  }, [token, EmpId, activeTab]);

  useEffect(() => {
    fetchUploadedDocuments();
  }, [fetchUploadedDocuments]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading({ type: "upload", value: true });
    const formData = new FormData();
    const documentFile = document.getElementById("myfile").files[0];
    formData.append("document", documentFile);

    try {
      const response = await axios.post(
        `/apigateway/hrms/employee/uploadDocument/${EmpId}/${selectedDocumentType}/${categories[activeTab]}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data);
      setIsModalOpen(false);
      fetchDocuments();
      fetchUploadedDocuments();
    } catch (error) {
      console.error(error);
      toast.error("Error uploading document. Please try again.");
    } finally {
      setLoading({ type: "upload", value: false });
    }
  };

  const handleDownload = async (id) => {
    setLoading({ type: "download", value: true });
    try {
      const { data, headers } = await axios.get(
        `/apigateway/hrms/employee/downloadDocument/${EmpId}/${id}/${categories[activeTab]}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "arraybuffer",
        }
      );

      if (data.byteLength > 0) {
        const contentType = headers["content-type"];
        const fileExtension = contentType.split("/")[1];
        const blob = new Blob([data], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `EmployeeDocument${EmpId}.${fileExtension}`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("File downloaded successfully.", {
          position: "top-center",
          theme: "colored",
        });
      } else {
        toast.error("File not found.", {
          position: "top-center",
          theme: "colored",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error occurred, please try again later.", {
        position: "top-center",
        theme: "colored",
      });
    } finally {
      setLoading({ type: "download", value: false });
    }
  };

  const handleDelete = async (documentId) => {
    setLoading({ type: "delete", value: true });
    try {
      await axios.delete(
        `/apigateway/hrms/employee/deleteDocument/${EmpId}/${documentId}/${categories[activeTab]}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Document deleted successfully");
      fetchUploadedDocuments();
    } catch (error) {
      console.error(error);
      toast.error("Error deleting document");
    } finally {
      setLoading({ type: "delete", value: false });
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {loading.value ? (
        <LoadingPage />
      ) : (
        <>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
          >
            {categories.map((category, index) => (
              <Tab key={index} label={category.replace("_", " ")} />
            ))}
          </Tabs>
          <Button
            variant="contained"
            onClick={() => setIsModalOpen(true)}
            sx={{ mt: 2 }}
             size="small"
            startIcon={<CloudUpload/>}
          >
            Upload Document
          </Button>
          <DocumentUploadModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmit}
            selectedDocumentType={selectedDocumentType}
            setSelectedDocumentType={setSelectedDocumentType}
            documents={documents}
            loading={loading}
          />
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Document Type</TableCell>
                  <TableCell>Mandatory</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {uploadedDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>{doc.documentType.documentType}</TableCell>
                    <TableCell>
                      {doc.documentType.mandatory ? "Yes" : "No"}
                    </TableCell>
                    {/* <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => handleDownload(doc.documentType.id)}
                      >
                        {!loading.type === 'download' && 'Download'}
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(doc.documentType.id)}     
                      >
                        {!loading.type === 'delete' && 'Delete'}
                      </Button>
                    </TableCell> */}
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<CloudDownload />}
                           size="small"
                          onClick={() => handleDownload(doc.documentType.id)}
                          // disabled={loading.type === "download"}
                        >
                          Download
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                           size="small"
                          startIcon={<Delete />}
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you wish to delete this item?"
                              )
                            ) {
                              handleDelete(doc.documentType.id);
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default DocumentUpload;
