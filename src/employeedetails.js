import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Hrmscss/App.css";
import { Form, Button } from "react-bootstrap";
import { FaDownload } from "react-icons/fa";
import LoadingPage from "./LoadingPage";

export default function Empfunc() {

  const [employees, setEmployees] = useState([]);
  const [empName, setempName] = useState("");
  const [emp, setEmp] = useState([]);
  const [emailid, setEmailid] = useState("");
  // const [empdata, setempdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);
  const [loading, setLoading] = useState(true); 
  const token = localStorage.getItem("response-token");
  const EmpId = localStorage.getItem("EmpID");

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);


        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

  const handleNameChange = (event) => {
    setempName(event.target.value);
    console.log(empName);
  };

  // download Aadhar Card
  const downloadAadharCard = () => {
    const url = `/apigateway/hrms/employee/downloadAadharCard/${EmpId}`;

    axios
      .get(url, {
        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `AadharCard_${employeeId}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("AadharCard downloaded successfully.", {
          position: "top-center",
          theme: "colored",
        });
      })
      .catch((error) => {
        console.error("Error downloading AadharCard:", error);
        toast.error("Error downloading AadharCard. Please try again later.", {
          position: "top-center",
          theme: "colored",
        });
      });
  };

  const downloadPanCard = () => {
    const employeeId = 14; // Hard-coded employee ID
    const url = `/apigateway/hrms/employee/downloadPanCard/${employeeId}`;

    axios
      .get(url, {
        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `PanCard_${employeeId}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("PanCard  downloaded successfully.", {
          position: "top-center",
          theme: "colored",
        });
      })
      .catch((error) => {
        console.error("Error downloading PanCard:", error);
        toast.error("Error downloading PanCard. Please try again later.", {
          position: "top-center",
          theme: "colored",
        });
      });
  };

  const handleSubmit = () => {
    setLoading(true); 
    axios
      .get(`/apigateway/hrms/employee/searchByName?query=${empName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
      //  console.log(response.data);
        setEmp(response.data.content);
        setLoading(false); 
        toast.success("Employee Name  found successfully", {
          position: "top-center",
          theme: "colored",
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); 
        toast.error("Error occurred, try again later.", {
          position: "top-center",
          theme: "colored",
        });
      });
  };

  const handleSearchByTypeAndStatus = () => {
    setLoading(true); 
    axios
      .get(`/apigateway/hrms/employee/searchByEmail?query=${emailid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        // Update the asset state with the data from the second API call
        setEmp(response.data.content);
        setLoading(false); 
        toast.success("Employee data found successfully", {
          position: "top-center",
          theme: "colored",
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error occurred while searching by asset type.", {
          position: "top-center",
          theme: "colored",
        });
        setLoading(false); 
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
  // useEffect(() => {
  //   axios
  //     .get(`/sit/gateway/hrms/employee/getAllEmp`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       setEmployees(response.data.content);
  //       console.log(response.data.content);
  //       toast.success("Data found successfully.", {
  //         position: "top-center",
  //         theme: "colored",
  //         closeOnClick: true,
  //       });

  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       toast.error("An error occurred. Please try again later.", {
  //         position: "top-center",
  //         theme: "colored",
  //       });
  //     });
  // }, []);
  if (!employees) return null;
  // Pagination logic
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
       {loading ? <LoadingPage/> : ''}
      <div className=" mt-3 pl-4">
      {/* {loading ? <LoadingPage/> : ''} */}
        <nav
          aria-label="breadcrumb"
          style={{ "--bs-breadcrumb-divider": "'>>'" }}
        >
          <ol className="breadcrumb" style={{ color: "white" ,marginLeft:'20px'}}>
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>{" "}
            </li>
            <li className="breadcrumb-item">
              <a href="">Employee Management</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Employee Details
            </li>
          </ol>
        </nav>
      </div>
      <div className="d-flex justify-content-center " style={{ width: screenWidth-50}}>
        <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          <h1 className="Heading1 my-4">Employee Details</h1>

          <div className="" style={{ width: "145vh", overflowX: "auto" }}>
            <div className="table-responsive-sm">
              <table border="2" className="table table-striped table-bordered">
                <thead className="head">
                  <tr className="table-danger table-striped">
                    <th>EMPLOYEE ID</th>
                    <th>IS ACTIVE</th>
                    <th>DESIGNATION</th>
                    <th>DOB</th>
                    <th>EMAIL</th>
                    <th>FIRST NAME</th>
                    <th>LAST NAME</th>
                    <th>MARITAL STATUS</th>
                    <th>GENDER</th>
                    <th>EMAIL VERIFIED</th>
                    <th>JOIN DATE</th>
                    <th>MOBILE NO</th>
                    <th>USERNAME</th>
                    <th>SALARY</th>
                    <th>BANK NAME</th>
                    <th>ACCOUNT NO</th>
                    <th>IFSC CODE</th>
                    <th>AADHAR CARD </th>
                    <th>PAN CARD</th>
                  </tr>
                </thead>
                <tbody className="body">
                  {currentEmployees.map((employee) => (
                    <tr key={employee.employeeId}>
                      <td>
                        <Link
                          to={`/EditEmployee/${employee.employeeId}`}
                          className="Candidate-id"
                        >
                          {employee.employeeId}
                        </Link>
                      </td>
                      <td>{String(employee.isActive)}</td>
                      <td>{employee.designation}</td>
                      <td>{employee.dob}</td>
                      <td>{employee.email}</td>
                      <td>{employee.firstName}</td>
                      <td>{employee.lastName}</td>
                      <td>{employee.maritalStatus}</td>
                      <td>{employee.gender}</td>
                      <td>{String(employee.isEmailVerified)}</td>
                      <td>{employee.joinDate}</td>
                      <td>{employee.mobileNo}</td>
                      <td>{employee.userName}</td>
                      <td>{employee.salary}</td>
                      <td>{employee.bankName}</td>
                      <td>{employee.accountNumber}</td>
                      <td>{employee.ifscCode}</td>
                      <td>
                        <FaDownload
                          style={{ cursor: "pointer" }}
                          onClick={downloadAadharCard}
                        />
                      </td>
                      <td>
                        <FaDownload
                          style={{ cursor: "pointer" }}
                          onClick={downloadPanCard}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <nav>
            <ul className="pagination justify-content-center mt-2">
              {Array.from({
                length: Math.ceil(employees.length / employeesPerPage),
              }).map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    onClick={() => paginate(index + 1)}
                    className="page-link mx-1"
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className=" d-flex justify-content-between">
            <Form.Group controlId="employeeName">
              <Form.Label className=" my-2">Search By Employee Name</Form.Label>
              <div className=" d-flex my-2">
                <Form.Control
                  type="text"
                  placeholder="Enter Employee Name "
                  value={empName}
                  onChange={handleNameChange}
                  style={{ width: "50vh", marginBottom: 0 }}
                />
                <Button onClick={handleSubmit} className=" mt-0 mx-2">
                  Search
                </Button>
              </div>
            </Form.Group>

            <Form.Group controlId="assetType">
              <Form.Label className=" my-2">Search By Email ID </Form.Label>
              <div className="d-flex my-2">
                <Form.Control
                  type="text"
                  placeholder="Enter Employee Email"
                  value={emailid}
                  onChange={(e) => setEmailid(e.target.value)}
                  style={{ width: "50vh", marginBottom: 0 }}
                />
                <Button
                  onClick={handleSearchByTypeAndStatus}
                  className=" mt-0 mx-2"
                >
                  Search
                </Button>
              </div>
            </Form.Group>
          </div>

          <div
            className=""
            style={{
              width: "145vh",
              overflowX: "auto",
              marginTop: "40px",
              marginBottom: "40px",
            }}
          >
             
            <div className="table-responsive-sm">
              <table border="2" className="table table-striped table-bordered">
                <thead className="head">
                  <tr className="table-danger table-striped">
                    <th>EMPLOYEE ID</th>
                    <th>ISACTIVE</th>
                    <th>DESIGNATION</th>
                    <th>DOB</th>
                    <th>EMAIL</th>
                    <th>FIRST NAME</th>
                    <th>LAST NAME</th>
                    <th>MARITAL STATUS</th>
                    <th>GENDER</th>
                    <th>EMAIL VERIFIED</th>
                    <th>JOIN DATE</th>
                    <th>MOBILE NO</th>
                    <th>USERNAME</th>
                    <th>SALARY</th>
                    <th>BANK NAME</th>
                    <th>ACCOUNT NO</th>
                    <th>IFSC CODE</th>
                  </tr>
                </thead>
                <tbody className="body">
                  {emp.map((employee) => (
                    <tr key={employee.employeeId}>
                      <td>
                        <Link
                          to={`/EditEmployee/${employee.employeeId}`}
                          className="Candidate-id"
                        >
                          {employee.employeeId}
                        </Link>
                      </td>
                      <td>{String(employee.isActive)}</td>
                      <td>{employee.designation}</td>
                      <td>{employee.dob}</td>
                      <td>{employee.email}</td>
                      <td>{employee.firstName}</td>
                      <td>{employee.lastName}</td>
                      <td>{employee.maritalStatus}</td>
                      <td>{employee.gender}</td>
                      <td>{String(employee.isEmailVerified)}</td>
                      <td>{employee.joinDate}</td>
                      <td>{employee.mobileNo}</td>
                      <td>{employee.userName}</td>
                      <td>{employee.salary}</td>
                      <td>{employee.bankName}</td>
                      <td>{employee.accountNumber}</td>
                      <td>{employee.ifscCode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
