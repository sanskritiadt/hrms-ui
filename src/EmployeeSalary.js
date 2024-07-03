import React, { useState, useEffect } from "react";
import { Container, Table, Pagination, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Hrmscss/ExampleTable.css";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Hrmscss/App.css";
import FileUpload from "./FileUpload";
import LoadingPage from "./LoadingPage";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
function EmployeeSalary() {
  // const token = localStorage.getItem("response-token");
  const token = useSelector((state) => state.auth.token);
  // const  EmpId = useSelector((state) => state.auth.empId);
  const [loading, setLoading] = useState(false);
  const [clientInfo, setClientInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(4);
  const [year, setYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/apigateway/payroll/salarydetails/getAllMonthlySalaryDetails`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setClientInfo(response.data);
        console.log(response.data);
        toast.success("Employee Salary found successfully!!", {
          position: "top-center",
          theme: "colored",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message || "Error fetching details");
        setLoading(false);
      });
  }, []);

  // const indexOfLastRow = currentPage * rowsPerPage;
  // const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  // const filteredClientInfo = clientInfo.filter((client) =>
  //   client.empName.toLowerCase().includes(searchName.toLowerCase())
  // );

  // const currentRows = filteredClientInfo.slice(indexOfFirstRow, indexOfLastRow);

  // const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // const handleYearChange = (event) => {
  //   setYear(event.target.value);
  // };

  // const handleMonthChange = (event) => {
  //   setSelectedMonth(event.target.value);
  // };

  // const handleNameChange = (event) => {
  //   setSearchName(event.target.value);
  // };

  // const handleGeneratePaySlip = (empId) => {
  //   const selectedEmployee = clientInfo.find(
  //     (employee) => employee.empId === empId
  //   );

  //   if (selectedEmployee) {
  //     const requestBody = {
  //       empName: selectedEmployee.empName,
  //       empId: selectedEmployee.empId,
  //       email: selectedEmployee.email,
  //       joinDate: selectedEmployee.joinDate,
  //       bankName: selectedEmployee.bankName,
  //       accountNumber: selectedEmployee.accountNumber,
  //       role: selectedEmployee.role,
  //       salary: selectedEmployee.salary,
  //     };
  //     setLoading(true);
  //     axios
  //       .post(
  //         `/apigateway/payroll/viewPay?month=${selectedMonth}&year=${year}`,
  //         requestBody,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         console.log(response.data);

  //         var pdfData = response.data;

  //         var url = `data:application/pdf;base64,${pdfData}`;

  //         // Open the PDF in a new tab
  //         var newTab = window.open(url, "_blank");

  //         toast.success("Pay slip generated successfully.", {
  //           position: "top-center",
  //           theme: "colored",
  //         });
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         toast.error(error.response.data.message || "Error creating details");
  //         setLoading(false);
  //       });
  //   }
  // };
  const years = Array.from(
    new Array(10),
    (val, index) => new Date().getFullYear() + index
  );
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className=" mt-3">
      {loading ? <LoadingPage /> : ""}
      <nav
        aria-label="breadcrumb"
        style={{ "--bs-breadcrumb-divider": "'>>'" }}
      >
        <ol
          className="breadcrumb"
          style={{ color: "white", marginLeft: "20px" }}
        >
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>{" "}
          </li>
          <li className="breadcrumb-item">
            <Link to="">Employee Services</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Employee Salary
          </li>
        </ol>
      </nav>
      <div
        style={{
          marginTop: "50px",
          marginLeft: "80px",
          width: "820px",
          height: "60rem",
        }}
      >
        <FileUpload />
        <Container>
          <h1 className="Heading1">Employee Salary</h1>
          {/*<Form style={{ marginBottom: "20px" }}>
             <Form.Group controlId="employeeName">
              <Form.Label>Search by Employee Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={searchName}
                onChange={handleNameChange}
              />
            </Form.Group>
            <Form.Group controlId="selectedYear">
              <Form.Label>Select Year</Form.Label>
              <Form.Control
                as="select"
                placeholder="Enter Year"
                value={year}
                onChange={handleYearChange}
              >
                <option value="">Year</option>
                {years.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="selectedMonth">
              <Form.Label>Select Month</Form.Label>
              <Form.Control
                as="select"
                value={selectedMonth}
                onChange={handleMonthChange}
              >
                <option value="">Month</option>
                {months.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form> */}
          <Table striped bordered hover className="custom-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Bank Name</th>
                <th>Account Number</th>
                <th>Net Pay</th>
                <th>Employeer PF</th>
                <th>Employee PF</th>
                <th>Employeer ESIC</th>
                <th>Employee ESIC</th>
                <th>Medical Amount</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {clientInfo.map((client) => (
                <tr key={client.id}>
                  <td>{client.empId}</td>
                  <td>{client.employeeName}</td>
                  <td>{client.bankName}</td>
                  <td>{client.accountNo}</td>
                  <td>{client.netPay}</td>
                  <td>{client.employerPf}</td>
                  <td>{client.employeePf}</td>
                  <td>{client.employerEsic}</td>
                  <td>{client.employeeEsic}</td>
                  <td>{client.medicalAmount}</td>
                  <td>
                    <button onClick={() => handleGeneratePaySlip(client.empId)}>
                      View details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody> 
          </Table>
          {/* <Pagination>
            {Array.from({
              length: Math.ceil(filteredClientInfo.length / rowsPerPage),
            }).map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination> */}
        </Container>

        
      </div>
    </div>
  );
}

export default EmployeeSalary;
