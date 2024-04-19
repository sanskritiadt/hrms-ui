// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, CardContent, Typography, Button } from "@mui/material";

// export default function EmpDocuments() {
//   const token = localStorage.getItem("response-token");
//   const [documents, setDocuments] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`/apigateway/hrms/employee/getDocumentTypes`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         console.log(response.data);
//         setDocuments(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [token]);

//   const handleDownload = (documentId) => {
//     // Implement download functionality
//   };

//   const handleUpload = (documentId) => {
//     // Implement upload functionality
//   };

//   return (
//     <div>
//       {documents.map((document) => (
//         <Card
//           key={document.id}
//           sx={{
//             maxWidth: 800,
//             margin: "auto",
//             marginTop: 3,
//             textAlign: "center",
//           }}
//         >
//           <CardContent>
//             <Typography color="textSecondary"  >
//               Type: {document.documentType}
//             </Typography>
//             <div
//               sx={{
//                 marginTop: 1,
//                 justifyContent: "space-around",
//               }}
//             >
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => handleDownload(document.id)}
//               >
//                 Download
//               </Button>
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 onClick={() => handleUpload(document.id)}
//               >
//                 Upload
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  Select,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";
import { toast } from "react-toastify";
import { Input } from "@mui/material";
export default function EmpDocuments() {
  const token = localStorage.getItem("response-token");
  const EmpId = localStorage.getItem("EmpID");
  const [documents, setDocuments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [selectedDocumentType, setSelectedDocumentType] = useState("");

  useEffect(() => {
    axios
      .get(`/apigateway/hrms/employee/getAllDocumentDetailsById/${EmpId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        const documentTypesArray = response.data.map(
          (item) => item.documentType
        );
        setDocuments(documentTypesArray);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`/apigateway/hrms/employee/getDocumentTypes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setDocumentTypes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  const handleDelete = (documentId) => {
    axios
      .delete(
        `/apigateway/hrms/employee/deleteDocument/${EmpId}/${documentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        toast.success(response.data, {
          position: "top-center",
          theme: "colored",
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error while deleting the file.", {
          position: "top-center",
          theme: "colored",
        });
      });
  };

  const handleDownload = (documentId) => {
    axios
      .get(
        `/apigateway/hrms/employee/downloadDocument/${EmpId}/${documentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "arraybuffer",
        }
      )
      .then((response) => {
        if (response.data.byteLength > 0) {
          const contentType = response.headers["content-type"];
          let mimeType;
          let fileExtension;

          if (contentType.includes("application/pdf")) {
            mimeType = "application/pdf";
            fileExtension = "pdf";
          } else if (contentType.includes("image/jpeg")) {
            mimeType = "image/jpeg";
            fileExtension = "jpg";
          } else if (contentType.includes("image/png")) {
            mimeType = "image/png";
            fileExtension = "png";
          } else {
            console.error("Unsupported file type");
            return;
          }
          const blob = new Blob([response.data], { type: mimeType });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          const filename = `EmployeeDocument${EmpId}.${fileExtension}`;
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          toast.success("File downloaded successfully.", {
            position: "top-center",
            theme: "colored",
          });
        } else {
          // console.error("File not found");
          toast.success("File not found.", {
            position: "top-center",
            theme: "colored",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error occurred, please try again later.", {
          position: "top-center",
          theme: "colored",
        });
      });
  };

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    const documentId = selectedDocumentType; // Using the selected document type
    const body = {
      empId: EmpId,
      docTypeId: documentId,
    };
    formData.append("emp", JSON.stringify(body));
    const documentFile = document.getElementById("myfile").files[0];
    formData.append("document", documentFile);
    axios
      .post(
        `/apigateway/hrms/employee/uploadDocument/${EmpId}/${documentId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        toast.success(response.data, {
          position: "top-center",
          theme: "colored",
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error uploading document. Please try again.", {
          position: "top-center",
          theme: "colored",
        });
      });
  }

  const styles = {
    tableContainer: {
      maxWidth: "700px",
      margin: "0 auto",
    },
  };
  return (
    <div>
      <Button sx={{
        display: 'flex',
        // justifyContent: 'flex-end', 
        alignItems: 'flex-start', 
        position: 'absolute', 
        top: '50px', 
        right: '110px', 
        margin: '20px',
    }} variant="contained" onClick={() => setIsModalOpen(true)}>
        Upload
      </Button>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography variant="subtitle1" sx={{ mr: 2 }}>
                Document Type:
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={selectedDocumentType}
                  onChange={(event) =>
                    setSelectedDocumentType(event.target.value)
                  }
                >
                  <MenuItem value="">
                    <em>Select document type</em>
                  </MenuItem>
                  {documentTypes.map((docType) => (
                    <MenuItem key={docType.id} value={docType.id}>
                      {docType.documentType}
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
              <Button variant="contained" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      <TableContainer component={Paper} style={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Document Type</TableCell>
              <TableCell>Download</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          {documents.map((document) => (
            <TableBody key={document.id}>
              <TableRow>
                <TableCell>{document.documentType}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleDownload(document.id)}
                  >
                    Download
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you wish to delete this item?"
                        )
                      ) {
                        handleDelete(document.id);
                      }
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </TableContainer>
    </div>
  );
}
