
import React, { useState, useEffect } from 'react';
import { Container, Table, Pagination, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Hrmscss/ExampleTable.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import './Hrmscss/App.css';
import FileUpload from './FileUpload';



function EmployeeSalary() {
  const token = localStorage.getItem("response-token")
  const EmpID = localStorage.getItem('EmpID');
  const [clientInfo, setClientInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(4);
  const [year, setYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [searchName, setSearchName] = useState(''); // Added state for search query
// Inside the EmployeeSalary component, add the following state
const [paySlipData, setPaySlipData] = useState(null);

  useEffect(() => {
    axios
      .get(`/apigateway/payroll/salary/getAllEmpSalary`,{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
      .then((response) => {
        setClientInfo(response.data);
        console.log(response.data);
        toast.success('Employee Salary found successfully!!', {
          position: 'top-center',
          theme: 'colored',
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong. Please try again later.', {
          position: 'top-center',
          theme: 'colored',
        });
      });
  }, []);

  // Calculate the indexes for pagination
  
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  // Filter clientInfo array based on searchName
  const filteredClientInfo = clientInfo.filter((client) =>
    client.empName.toLowerCase().includes(searchName.toLowerCase())
  );

  const currentRows = filteredClientInfo.slice(indexOfFirstRow, indexOfLastRow);

  // Change page
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Handle input changes
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleNameChange = (event) => {
    setSearchName(event.target.value);
  }; // Added event handler for search name input

  // Handle Generate Pay Slip button click
 const handleGeneratePaySlip = (empId) => {
   const selectedEmployee = clientInfo.find((employee) => employee.empId === empId);

   if (selectedEmployee) {
     const requestBody = {
       empName: selectedEmployee.empName,
       empId: selectedEmployee.empId,
       email: selectedEmployee.email,
       joinDate: selectedEmployee.joinDate,
       bankName: selectedEmployee.bankName,
       accountNumber: selectedEmployee.accountNumber,
       role: selectedEmployee.role,
       salary: selectedEmployee.salary,
     }; 

axios
  .post(`/apigateway/payroll/viewPay?month=${selectedMonth}&year=${year}`, requestBody,{
    headers:{
      'Authorization':`Bearer ${token}`
    }
  })
  .then((response) => {
    console.log(response.data);

    var pdfData = response.data;

    var url = `data:application/pdf;base64,${pdfData}`;

    // Open the PDF in a new tab
    var newTab = window.open(url, "_blank");

    toast.success('Pay slip generated successfully.', {
      position: 'top-center',
      theme: 'colored',
    });
  })
       .catch((error) => {
         console.log(error);
         toast.error('Error occurred while generating pay slip. Please try again.', {
           position: 'top-center',
           theme: 'colored',
         });
       });
   }
 };

  return (
         <div className=" mt-3"><nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
         <ol className="breadcrumb" style={{ color: "white" ,marginLeft:'20px'}}>
         
             <li className="breadcrumb-item"><Link to="/">Home</Link> </li>
             <li className="breadcrumb-item"><a href="">Employee Services</a></li>
             <li className="breadcrumb-item active" aria-current="page">Employee Salary</li>
         </ol>
     </nav>
    <div style={{ marginTop: '50px', marginLeft: '80px', width: '820px', height: '60rem' }}>

      <Container>
        <h1 className="Heading1">Employee Salary</h1>
        <Form style={{ marginBottom: '20px' }}>
          <Form.Group controlId="employeeName">
            <Form.Label>Search by Employee Name</Form.Label>
            <Form.Control type="text" placeholder='Enter Name' value={searchName} onChange={handleNameChange} />
          </Form.Group>
          <Form.Group controlId="selectedYear">
            <Form.Label>Select Year</Form.Label>
            <Form.Control as="select" placeholder='Enter Year' value={year} onChange={handleYearChange}>
            <option value="">Enter Year</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
              <option value="2031">2031</option>
              <option value="2032">2032</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="selectedMonth">
            <Form.Label>Select Month</Form.Label>
            <Form.Control as="select" value={selectedMonth} onChange={handleMonthChange}>
            <option value="">Enter Month </option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </Form.Control>
          </Form.Group>
        </Form>
        <Table striped bordered hover className="custom-table">
          <thead>
            <tr>
              <th>Serial number</th>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Email</th>
              <th>Join Date</th>
              <th>Bank Name</th>
              <th>Account Number</th>
              <th>Role</th>
              <th>Salary</th>
              <th>Payslip</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((client) => (
              <tr key={client.id}>
                <td>{client.serialNo}</td>
                <td>{client.empId}</td>
                <td>{client.empName}</td>
                <td>{client.email}</td>
                <td>{client.joinDate}</td>
                <td>{client.bankName}</td>
                <td>{client.accountNumber}</td>
                <td>{client.role}</td>
                <td>{client.salary}</td>
                <td>
                  <button onClick={() => handleGeneratePaySlip(client.empId)}>Generate_Slip</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination>
          {Array.from({ length: Math.ceil(filteredClientInfo.length / rowsPerPage) }).map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>

      <FileUpload/>


    </div>
    </div>
  );
}

export default EmployeeSalary;



