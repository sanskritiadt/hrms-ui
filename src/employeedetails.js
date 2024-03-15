import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Hrmscss/App.css";
import {  Form, Button } from 'react-bootstrap';
import { FaDownload } from 'react-icons/fa';


export default function Empfunc() {
  const [employees, setEmployees] = useState([]);

  const [empName, setempName] = useState('');
  const [emp, setEmp] = useState([]);
   
  const [emailid, setEmailid] = useState('')

  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5); // Number of employees per page
  const token = localStorage.getItem("response-token");


  const handleNameChange = (event) => {
    setempName(event.target.value);
    console.log(empName)
  }

// download Aadhar Card 
const downloadAadharCard = () => {
  const employeeId = 14; // Hard-coded employee ID
  const url = `/apigateway/hrms/employee/downloadAadharCard/${employeeId}`;

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
    axios.get(`/apigateway/hrms/employee/searchByName?query=${empName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response)
      console.log(response.data);
      setEmp(response.data);
      toast.success('Employee Name  found successfully', { position: 'top-center', theme: 'colored' });
    })
    .catch((error) => {
      console.log(error);
      toast.error('Error occurred, try again later.', { position: 'top-center', theme: 'colored' });
    });
  }


  const handleSearchByTypeAndStatus = () => {
    // Second API call: Search by asset type
    axios.get(`/apigateway/hrms/employee/searchByEmail?query=${emailid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
 
      console.log(response.data);
      // Update the asset state with the data from the second API call
      setEmp(response.data);
      toast.success('Employee data found successfully', { position: 'top-center', theme: 'colored' });
    })
    .catch((error) => {
      console.log(error);
      toast.error('Error occurred while searching by asset type.', { position: 'top-center', theme: 'colored' });
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
        setEmployees(response.data);
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
      });
  }, []);

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
      <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
      <ol className="breadcrumb" style={{  color: "white" }}>
    
        <li className="breadcrumb-item"><Link to="/">Home</Link> </li>
        <li className="breadcrumb-item"><a href="">Employee Management</a></li>
        <li className="breadcrumb-item active" aria-current="page">Employee Details </li>
    </ol>
      </nav>
      <div style={{ margin: "25px  20px", width: "820px", height: "750px" }}>
        <h1 className="Heading1">Employee Details</h1>
        <div className="table-responsive-sm">
          <table border="2" className="table table-striped table-bordered">
          <thead className="head">
          <tr className="table-danger table-striped">
            <th>employeeId</th>
            <th>isActive</th>
            <th>designation</th>
            <th>DOB</th>
            <th>email</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>MaritalStatus</th>
            <th>gender</th>
            <th>isEmailVerified</th>
            <th>joinDate</th>
            <th>mobileNo</th>
            <th>username</th>
            <th>salary</th>
            <th>bankName</th>
            <th>accountNumber</th>
            <th>ifscCode</th>
            <th>Aadhar Card </th>
            <th>Pan Card</th>

          </tr>
        </thead>
            <tbody className="body">
              {currentEmployees.map((employee) => (
                 <tr key={employee.employeeId}>
                 <td><Link to={`/EditEmployee/${employee.employeeId}`} className="Candidate-id">{employee.employeeId}</Link></td>
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
                 <td> <FaDownload style={{'cursor':'pointer'}} onClick={downloadAadharCard}/>  </td>
                 <td> <FaDownload style={{'cursor':'pointer'}} onClick={downloadPanCard} /> </td>
               </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav>
          <ul className="pagination justify-content-center">
            {Array.from({ length: Math.ceil(employees.length / employeesPerPage) }).map((_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
              >
                <button
                  onClick={() => paginate(index + 1)}
                  className="page-link"
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <Form.Group controlId="employeeName">
            <Form.Label>Search By Employee Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Employee Name " value={empName} onChange={handleNameChange} style={{ width: '50%' }} />
          </Form.Group>
          <Button onClick={handleSubmit}>Search</Button>
        <br /><br />
       
        <Form.Group controlId="assetType">
            <Form.Label>Search By Email ID </Form.Label>
            <Form.Control type="text" placeholder="Enter Asset Type" value={emailid} onChange={(e) =>setEmailid(e.target.value)} style={{ width: '50%' }} />
          </Form.Group>                                                                                                                       

          {/* Button to trigger the second API call */}
          <Button onClick={handleSearchByTypeAndStatus}>Search By Email</Button>
          <br /><br />   
          <div className="table-responsive-sm">
          <table border="2" className="table table-striped table-bordered">
          <thead className="head">
          <tr className="table-danger table-striped">
            <th>employeeId</th>
            <th>isActive</th>
            <th>designation</th>
            <th>DOB</th>
            <th>email</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>MaritalStatus</th>
            <th>gender</th>
            <th>isEmailVerified</th>
            <th>joinDate</th>
            <th>mobileNo</th>
            <th>username</th>
            <th>salary</th>
            <th>bankName</th>
            <th>accountNumber</th>
            <th>ifscCode</th>


          </tr>
        </thead>
            <tbody className="body">
              {emp.map((employee) => (
                 <tr key={employee.employeeId}>
                 <td><Link to={`/EditEmployee/${employee.employeeId}`} className="Candidate-id">{employee.employeeId}</Link></td>
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
  );
}














