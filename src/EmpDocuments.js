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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function EmpDocuments() {
    const token = localStorage.getItem("response-token");
    const EmpId = localStorage.getItem("EmpID");
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    axios
      .get(`/apigateway/hrms/employee/getDocumentTypes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setDocuments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ token]);

  const handleDownload = (documentId) => {
    const url = `/apigateway/hrms/employee/downloadDocument/${EmpId}/${documentId}`;
    axios
      .get(url, {
        responseType: 'arraybuffer',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `Document${employeeId}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast.success("Document downloaded successfully.", {
              position: "top-center",
              theme: "colored",
            });
          })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpload = (documentId) => {
    // Implement upload functionality
  };
  const styles = {
    tableContainer: {
      maxWidth: '600px', // Adjust the width as needed
      margin: '0 auto', // Center the table
    },
  };
  return (
            <TableContainer component={Paper} style={styles.tableContainer}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Document Type</TableCell>
                    <TableCell>Download</TableCell>
                    <TableCell>Upload</TableCell>
                  </TableRow>
                </TableHead>
                {documents.map((document) => (
                <TableBody>
                    <TableRow key={document.id}>
                      <TableCell>{document.documentType}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleDownload(document.id)}
                        >
                          Download
                        </Button>
                        </TableCell>
                        <TableCell>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleUpload(document.id)}
                        >
                          Upload
                        </Button>
                      </TableCell>
                    </TableRow>
                </TableBody>
                  ))}
              </Table>
            </TableContainer>
  );
}
