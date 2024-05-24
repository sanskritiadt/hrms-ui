// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import "./Hrmscss/App.css";
// import { Form, Button } from "react-bootstrap";
// import { FaDownload } from "react-icons/fa";
// import LoadingPage from "./LoadingPage";

// export default function Empfunc() {
//   const [employees, setEmployees] = useState([]);
//   const [empName, setempName] = useState("");
//   const [emp, setEmp] = useState([]);
//   const [emailid, setEmailid] = useState("");
//   // const [empdata, setempdata] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [employeesPerPage] = useState(5);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("response-token");
//   const EmpId = localStorage.getItem("EmpID");

//   const [screenWidth, setScreenWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => {
//       setScreenWidth(window.innerWidth);
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const handleNameChange = (event) => {
//     setempName(event.target.value);
//     console.log(empName);
//   };

//   const handleSubmit = () => {
//     setLoading(true);
//     axios
//       .get(`/apigateway/hrms/employee/searchByName?query=${empName}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         console.log(response);
//         //  console.log(response.data);
//         setEmp(response.data.content);
//         setLoading(false);
//         toast.success("Employee Name  found successfully", {
//           position: "top-center",
//           theme: "colored",
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//         toast.error("Error occurred, try again later.", {
//           position: "top-center",
//           theme: "colored",
//         });
//       });
//   };

//   const payrollDetails = () => {
//     setLoading(true);
//     axios
//       .get(`/apigateway/hrms/employee/getEmpPayrollById/${EmpId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         console.log(response);
//         //  console.log(response.data);
//         setEmp(response.data.content);
//         setLoading(false);
//         toast.success("Employee Name  found successfully", {
//           position: "top-center",
//           theme: "colored",
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//         toast.error("Error occurred, try again later.", {
//           position: "top-center",
//           theme: "colored",
//         });
//       });
//   };

//   const handleSearchByTypeAndStatus = () => {
//     setLoading(true);
//     axios
//       .get(`/apigateway/hrms/employee/searchByEmail?query=${emailid}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         console.log(response.data);
//         // Update the asset state with the data from the second API call
//         setEmp(response.data.content);
//         setLoading(false);
//         toast.success("Employee data found successfully", {
//           position: "top-center",
//           theme: "colored",
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error("Error occurred while searching by asset type.", {
//           position: "top-center",
//           theme: "colored",
//         });
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     axios
//       .get(`/apigateway/hrms/employee/getAllEmp`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setEmployees(response.data.content);
//         setLoading(false);
//         toast.success("Data found successfully.", {
//           position: "top-center",
//           theme: "colored",
//           closeOnClick: true,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error("An error occurred. Please try again later.", {
//           position: "top-center",
//           theme: "colored",
//         });
//         setLoading(false);
//       });
//   }, []);
//   // useEffect(() => {
//   //   axios
//   //     .get(`/sit/gateway/hrms/employee/getAllEmp`, {
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //     })
//   //     .then((response) => {
//   //       setEmployees(response.data.content);
//   //       console.log(response.data.content);
//   //       toast.success("Data found successfully.", {
//   //         position: "top-center",
//   //         theme: "colored",
//   //         closeOnClick: true,
//   //       });

//   //     })
//   //     .catch((error) => {
//   //       console.log(error);
//   //       toast.error("An error occurred. Please try again later.", {
//   //         position: "top-center",
//   //         theme: "colored",
//   //       });
//   //     });
//   // }, []);
//   if (!employees) return null;
//   // Pagination logic
//   const indexOfLastEmployee = currentPage * employeesPerPage;
//   const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
//   const currentEmployees = employees.slice(
//     indexOfFirstEmployee,
//     indexOfLastEmployee
//   );

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div>
//       {loading ? <LoadingPage /> : ""}
//       <div className=" mt-3 pl-4">
//         {/* {loading ? <LoadingPage/> : ''} */}
//         <nav
//           aria-label="breadcrumb"
//           style={{ "--bs-breadcrumb-divider": "'>>'" }}
//         >
//           <ol
//             className="breadcrumb"
//             style={{ color: "white", marginLeft: "20px" }}
//           >
//             <li className="breadcrumb-item">
//               <Link to="/">Home</Link>{" "}
//             </li>
//             <li className="breadcrumb-item">
//               <a href="">Employee Management</a>
//             </li>
//             <li className="breadcrumb-item active" aria-current="page">
//               Employee Details
//             </li>
//           </ol>
//         </nav>
//       </div>
//       <div
//         className="d-flex justify-content-center "
//         style={{ width: screenWidth - 50 }}
//       >
//         <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
//           <h1 className="Heading1 my-4">Employee Details</h1>
//           <div className="" style={{ width: "145vh", overflowX: "auto" }}>
//             <div className="table-responsive-sm">
//               <table border="2" className="table table-striped table-bordered">
//                 <thead className="head">
//                   <tr className="table-danger table-striped">
//                     <th>EMPLOYEE ID</th>
//                     <th>DOB</th>
//                     <th>EMAIL</th>
//                     <th>FIRST NAME</th>
//                     <th>LAST NAME</th>
//                     <th>MARITAL STATUS</th>
//                     <th>GENDER</th>
//                     <th>EMAIL VERIFIED</th>
//                     <th>MOBILE NO</th>
//                     <th>USERNAME</th>
//                     <th>PAYROLL DETAILS</th>
//                     <th>PAYROLL DOCUMENTS</th>
//                   </tr>
//                 </thead>
//                 <tbody className="body">
//                   {currentEmployees.map((employee) => (
//                     <tr key={employee.employeeId}>
//                       <td>
//                         <Link
//                           to={`/EditEmployee/${employee.employeeId}`}
//                           className="Candidate-id"
//                         >
//                           {employee.employeeId}
//                         </Link>
//                       </td>
//                       <td>{employee.dob}</td>
//                       <td>{employee.email}</td>
//                       <td>{employee.firstName}</td>
//                       <td>{employee.lastName}</td>
//                       <td>{employee.maritalStatus}</td>
//                       <td>{employee.gender}</td>
//                       <td>{String(employee.isEmailVerified)}</td>
//                       <td>{employee.mobileNo}</td>
//                       <td>{employee.userName}</td>
//                       <td>
//                         <button type="button" class="btn btn-outline-info" onClick={payrollDetails}>
//                           Payroll
//                         </button>
//                       </td>
//                       <td>
//                         <button type="button" class="btn btn-outline-info">
//                           Documents
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <nav>
//             <ul className="pagination justify-content-center mt-2">
//               {Array.from({
//                 length: Math.ceil(employees.length / employeesPerPage),
//               }).map((_, index) => (
//                 <li
//                   key={index}
//                   className={`page-item ${
//                     currentPage === index + 1 ? "active" : ""
//                   }`}
//                 >
//                   <button
//                     onClick={() => paginate(index + 1)}
//                     className="page-link mx-1"
//                   >
//                     {index + 1}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//           <div className=" d-flex justify-content-between">
//             <Form.Group controlId="employeeName">
//               <Form.Label className=" my-2">Search By Employee Name</Form.Label>
//               <div className=" d-flex my-2">
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter Employee Name "
//                   value={empName}
//                   onChange={handleNameChange}
//                   style={{ width: "50vh", marginBottom: 0 }}
//                 />
//                 <Button onClick={handleSubmit} className=" mt-0 mx-2">
//                   Search
//                 </Button>
//               </div>
//             </Form.Group>

//             <Form.Group controlId="assetType">
//               <Form.Label className=" my-2">Search By Email ID </Form.Label>
//               <div className="d-flex my-2">
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter Employee Email"
//                   value={emailid}
//                   onChange={(e) => setEmailid(e.target.value)}
//                   style={{ width: "50vh", marginBottom: 0 }}
//                 />
//                 <Button
//                   onClick={handleSearchByTypeAndStatus}
//                   className=" mt-0 mx-2"
//                 >
//                   Search
//                 </Button>
//               </div>
//             </Form.Group>
//           </div>

//           <div
//             className=""
//             style={{
//               width: "145vh",
//               overflowX: "auto",
//               marginTop: "40px",
//               marginBottom: "40px",
//             }}
//           >
//             <div className="table-responsive-sm">
//               <table border="2" className="table table-striped table-bordered">
//                 <thead className="head">
//                   <tr className="table-danger table-striped">
//                     <th>EMPLOYEE ID</th>
//                     <th>DOB</th>
//                     <th>EMAIL</th>
//                     <th>FIRST NAME</th>
//                     <th>LAST NAME</th>
//                     <th>MARITAL STATUS</th>
//                     <th>GENDER</th>
//                     <th>EMAIL VERIFIED</th>
//                     <th>MOBILE NO</th>
//                     <th>USERNAME</th>
//                   </tr>
//                 </thead>
//                 <tbody className="body">
//                   {emp.map((employee) => (
//                     <tr key={employee.employeeId}>
//                       <td>
//                         <Link
//                           to={`/EditEmployee/${employee.employeeId}`}
//                           className="Candidate-id"
//                         >
//                           {employee.employeeId}
//                         </Link>
//                       </td>
//                       <td>{employee.dob}</td>
//                       <td>{employee.email}</td>
//                       <td>{employee.firstName}</td>
//                       <td>{employee.lastName}</td>
//                       <td>{employee.maritalStatus}</td>
//                       <td>{employee.gender}</td>
//                       <td>{String(employee.isEmailVerified)}</td>
//                       <td>{employee.mobileNo}</td>
//                       <td>{employee.userName}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Form, Button, Modal } from "react-bootstrap";
// import LoadingPage from "./LoadingPage";
// import "./Hrmscss/App.css";

// export default function Empfunc() {
//   const [employees, setEmployees] = useState([]);
//   const [empName, setEmpName] = useState("");
//   const [emp, setEmp] = useState([]);
//   const [emailid, setEmailid] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [employeesPerPage] = useState(5);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [payrollDetails, setPayrollDetails] = useState(null);
//   const [searchCriterion, setSearchCriterion] = useState("");
//   const [searchValue, setSearchValue] = useState("");
//   const [searchResult, setSearchResult] = useState(null);

//   const token = localStorage.getItem("response-token");
//   const EmpId = localStorage.getItem("EmpID");

//   const handleCriterionChange = (e) => {
//     setSearchCriterion(e.target.value);
//   };

//   const handleValueChange = (e) => {
//     setSearchValue(e.target.value);
//   };

//   const handleSearch = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("/hrms/employee/searchEmployees", {
//         params: {
//           [searchCriterion]: searchValue,
//         },
//       });
//       setSearchResult(response.data);
//     } catch (error) {
//       console.error("Error searching employees:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const [screenWidth, setScreenWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => {
//       setScreenWidth(window.innerWidth);
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   const fetchPayrollDetails = (employeeId) => {
//     setLoading(true);
//     axios
//       .get(`/apigateway/hrms/employee/getEmpPayrollById/${employeeId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         console.log(response);
//         setPayrollDetails(response.data);
//         setLoading(false);
//         setShowModal(true);
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//         toast.error("Error occurred while fetching payroll details.", {
//           position: "top-center",
//           theme: "colored",
//         });
//       });
//   };

//   useEffect(() => {
//     axios
//       .get(`/apigateway/hrms/employee/getAllEmp`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setEmployees(response.data.content);
//         setLoading(false);
//         toast.success("Data found successfully.", {
//           position: "top-center",
//           theme: "colored",
//           closeOnClick: true,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error("An error occurred. Please try again later.", {
//           position: "top-center",
//           theme: "colored",
//         });
//         setLoading(false);
//       });
//   }, []);

//   if (!employees) return null;

//   const indexOfLastEmployee = currentPage * employeesPerPage;
//   const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
//   const currentEmployees = employees.slice(
//     indexOfFirstEmployee,
//     indexOfLastEmployee
//   );

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div>
//       {loading ? <LoadingPage /> : ""}
//       <div className=" mt-3 pl-4">
//         <nav
//           aria-label="breadcrumb"
//           style={{ "--bs-breadcrumb-divider": "'>>'" }}
//         >
//           <ol
//             className="breadcrumb"
//             style={{ color: "white", marginLeft: "20px" }}
//           >
//             <li className="breadcrumb-item">
//               <Link to="/">Home</Link>
//             </li>
//             <li className="breadcrumb-item">
//               <a href="#">Employee Management</a>
//             </li>
//             <li className="breadcrumb-item active" aria-current="page">
//               Employee Details
//             </li>
//           </ol>
//         </nav>
//       </div>
//       <div
//         className="d-flex justify-content-center "
//         style={{ width: screenWidth - 50 }}
//       >
//         <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
//           <h1 className="Heading1 my-4">Employee Details</h1>
//           <div className="d-flex justify-content-between">
//             <Form.Group controlId="employeeSearch">
//               <Form.Label className="my-2">Search By</Form.Label>
//               <div className="d-flex my-2">
//                 <Form.Control
//                   as="select"
//                   value={searchCriterion}
//                   onChange={handleCriterionChange}
//                   style={{
//                     width: "39vh",
//                     marginRight: "10px",
//                     marginBottom: 0,
//                   }}
//                 >
//                   <option value="">Select Search Criterion</option>
//                   <option value="firstName">First Name</option>
//                   <option value="lastName">Last Name</option>
//                   <option value="email">Email</option>
//                   <option value="mobileNo">Mobile Number</option>
//                 </Form.Control>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter Search Value"
//                   value={searchValue}
//                   onChange={handleValueChange}
//                   style={{
//                     width: "30vh",
//                     marginRight: "10px",
//                     marginBottom: 0,
//                   }}
//                 />
//                 <Button onClick={handleSearch} className="mt-0">
//                   Search
//                 </Button>
//               </div>
//             </Form.Group>
//           </div>
//           <div className="" style={{ width: "145vh", overflowX: "auto" }}>
//             <div className="table-responsive-sm">
//               <table border="2" className="table table-striped table-bordered">
//                 <thead className="head">
//                   <tr className="table-danger table-striped">
//                     <th>EMPLOYEE ID</th>
//                     <th>DOB</th>
//                     <th>EMAIL</th>
//                     <th>FIRST NAME</th>
//                     <th>LAST NAME</th>
//                     <th>MARITAL STATUS</th>
//                     <th>GENDER</th>
//                     <th>EMAIL VERIFIED</th>
//                     <th>MOBILE NO</th>
//                     <th>USERNAME</th>
//                     <th>PAYROLL DETAILS</th>
//                     <th>PAYROLL DOCUMENTS</th>
//                   </tr>
//                 </thead>
//                 <tbody className="body">
//                   {currentEmployees.map((employee) => (
//                     <tr key={employee.employeeId}>
//                       <td>
//                         <Link
//                           to={`/EditEmployee/${employee.employeeId}`}
//                           className="Candidate-id"
//                         >
//                           {employee.employeeId}
//                         </Link>
//                       </td>
//                       <td>{employee.dob}</td>
//                       <td>{employee.email}</td>
//                       <td>{employee.firstName}</td>
//                       <td>{employee.lastName}</td>
//                       <td>{employee.maritalStatus}</td>
//                       <td>{employee.gender}</td>
//                       <td>{String(employee.isEmailVerified)}</td>
//                       <td>{employee.mobileNo}</td>
//                       <td>{employee.userName}</td>
//                       <td>
//                         <button
//                           type="button"
//                           className="btn btn-outline-info"
//                           onClick={() =>
//                             fetchPayrollDetails(employee.employeeId)
//                           }
//                         >
//                           Payroll
//                         </button>
//                       </td>
//                       <td>
//                         <button type="button" className="btn btn-outline-info">
//                           Documents
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <nav>
//             <ul className="pagination justify-content-center mt-2">
//               {Array.from({
//                 length: Math.ceil(employees.length / employeesPerPage),
//               }).map((_, index) => (
//                 <li
//                   key={index}
//                   className={`page-item ${
//                     currentPage === index + 1 ? "active" : ""
//                   }`}
//                 >
//                   <button
//                     onClick={() => paginate(index + 1)}
//                     className="page-link mx-1"
//                   >
//                     {index + 1}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </div>
//       </div>

//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Payroll Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {payrollDetails ? (
//             <div>
//               <p>
//                 <strong>Employee ID:</strong> {payrollDetails.empId}
//               </p>
//               <p>
//                 <strong>Salary:</strong> {payrollDetails.salary}
//               </p>
//               <p>
//                 <strong>Bank Name:</strong> {payrollDetails.bankName}
//               </p>
//               <p>
//                 <strong>Designation:</strong> {payrollDetails.designation}
//               </p>
//               <p>
//                 <strong>Join Date:</strong> {payrollDetails.joinDate}
//               </p>
//               <p>
//                 <strong>Account Number:</strong> {payrollDetails.accountNumber}
//               </p>
//               <p>
//                 <strong>IFSC Code:</strong> {payrollDetails.ifscCode}
//               </p>
//             </div>
//           ) : (
//             <p>Loading...</p>
//           )}
//         </Modal.Body>
//         {/* <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer> */}
//       </Modal>
//     </div>
//   );
// }
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Button, Modal } from "react-bootstrap";
import LoadingPage from "./LoadingPage";
import "./Hrmscss/App.css";

export default function Empfunc() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [payrollDetails, setPayrollDetails] = useState(null);
  const [searchCriterion, setSearchCriterion] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const token = localStorage.getItem("response-token");

  const handleCriterionChange = (e) => {
    setSearchCriterion(e.target.value);
  };

  const handleValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = async () => {
    if (!searchCriterion || !searchValue) {
      toast.error("Please select a search criterion and enter a search value.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get("/hrms/employee/searchEmployees", {
        params: {
          [searchCriterion]: searchValue,
        },
      });
      setSearchResult(response.data.content);
    } catch (error) {
      console.error("Error searching employees:", error);
      toast.error("An error occurred while searching. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPayrollDetails = (employeeId) => {
    setLoading(true);
    axios
      .get(`/apigateway/hrms/employee/getEmpPayrollById/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setPayrollDetails(response.data);
        setLoading(false);
        setShowModal(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("Error occurred while fetching payroll details.", {
          position: "top-center",
          theme: "colored",
        });
      });
  };

  useEffect(() => {
    axios
      .get(`/apigateway/hrms/employee/getAllEmp`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEmployees(response.data.content);
        setLoading(false);
        toast.success("Data found successfully.", {
          position: "top-center",
          theme: "colored",
          closeOnClick: true,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred. Please try again later.", {
          position: "top-center",
          theme: "colored",
        });
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingPage />;

  const currentEmployees = searchResult || employees;
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const paginatedEmployees = currentEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ margin:'25px 100px  ',  width:'820px',height:'750px'}}>
      <div className=" mt-3 pl-4">
        <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
          <ol className="breadcrumb" style={{ color: "white", marginLeft: "20px" }}>
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Employee Management</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Employee Details
            </li>
          </ol>
        </nav>
      </div>
      <div className="d-flex justify-content-center " style={{ width: "90%" }}>
        <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          <h1 className="Heading1 my-4">Employee Details</h1>
          <div className="d-flex justify-content-between">
            <Form.Group controlId="employeeSearch">
              <Form.Label className="my-2">Search By</Form.Label>
              <div className="d-flex my-2">
                <Form.Control
                  as="select"
                  value={searchCriterion}
                  onChange={handleCriterionChange}
                  style={{
                    width: "39vh",
                    marginRight: "10px",
                    marginBottom: 0,
                  }}
                >
                  <option value="">Select Search Criterion</option>
                  <option value="firstName">First Name</option>
                  <option value="lastName">Last Name</option>
                  <option value="email">Email</option>
                  <option value="mobileNo">Mobile Number</option>
                </Form.Control>
                <Form.Control
                  type="text"
                  placeholder="Enter Search Value"
                  value={searchValue}
                  onChange={handleValueChange}
                  style={{
                    width: "30vh",
                    marginRight: "10px",
                    marginBottom: 0,
                  }}
                />
                <Button onClick={handleSearch} className="mt-0">
                  Search
                </Button>
              </div>
            </Form.Group>
          </div>
          <div className="table-responsive-sm" style={{ width: "145vh", overflowX: "auto" }}>
            <table border="2" className="table table-striped table-bordered">
              <thead className="head">
                <tr className="table-danger table-striped">
                  <th>EMPLOYEE ID</th>
                  <th>DOB</th>
                  <th>EMAIL</th>
                  <th>FIRST NAME</th>
                  <th>LAST NAME</th>
                  <th>MARITAL STATUS</th>
                  <th>GENDER</th>
                  <th>EMAIL VERIFIED</th>
                  <th>MOBILE NO</th>
                  <th>USERNAME</th>
                  <th>PAYROLL DETAILS</th>
                </tr>
              </thead>
              <tbody className="body">
                {paginatedEmployees.map((employee) => (
                  <tr key={employee.employeeId}>
                    <td>
                      <Link to={`/EditEmployee/${employee.employeeId}`} className="Candidate-id">
                        {employee.employeeId}
                      </Link>
                    </td>
                    <td>{employee.dob}</td>
                    <td>{employee.email}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.maritalStatus}</td>
                    <td>{employee.gender}</td>
                    <td>{String(employee.isEmailVerified)}</td>
                    <td>{employee.mobileNo}</td>
                    <td>{employee.userName}</td>
                    <td>
                      {/* <button
                        type="button"
                        className="btn btn-outline-info"
                        onClick={() => fetchPayrollDetails(employee.employeeId)}
                      >
                        Payroll
                      </button> */}<Link to={`/UpdatePayrollSalary/${employee.employeeId}`} className = "Candidate-id" variant="btn btn-outline-info" >
                  Payroll
              </Link>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <nav>
            <ul className="pagination justify-content-center mt-2">
              {Array.from({ length: Math.ceil(currentEmployees.length / employeesPerPage) }).map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                  <button onClick={() => paginate(index + 1)} className="page-link mx-1">
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Payroll Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {payrollDetails ? (
            <div>
              <p>
                <strong>Employee ID:</strong> {payrollDetails.empId}
              </p>
              <p>
                <strong>Salary:</strong> {payrollDetails.salary}
              </p>
              <p>
                <strong>Bank Name:</strong> {payrollDetails.bankName}
              </p>
              <p>
                <strong>Designation:</strong> {payrollDetails.designation}
              </p>
              <p>
                <strong>Join Date:</strong> {payrollDetails.joinDate}
              </p>
              <p>
                <strong>Account Number:</strong> {payrollDetails.accountNumber}
              </p>
              <p>
                <strong>IFSC Code:</strong> {payrollDetails.ifscCode}
              </p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

