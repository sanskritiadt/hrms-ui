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
      const response = await axios.get(
        `/apigateway/hrms/employee/searchEmployees`,
        {
          params: {
            [searchCriterion]: searchValue,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSearchResult(response.data.content);
      setLoading(false); 
    } catch (error) {
      console.error("Error searching employees:", error);
      toast.error( error.response.data.message || "Error searching details" );
    } finally {
      setLoading(false);
    }
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
        toast.error( error.response.data.message || "Error fetching details");
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingPage />;

  const currentEmployees = searchResult || employees;
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const paginatedEmployees = currentEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ margin: "25px 100px  ", width: "820px", height: "750px" }}>
      <div className=" mt-3 pl-4">
        <nav
          aria-label="breadcrumb"
          style={{ "--bs-breadcrumb-divider": "'>>'" }}
        >
          <ol
            className="breadcrumb"
            style={{ color: "white", marginLeft: "20px" }}
          >
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
          <div
            className="table-responsive-sm"
            style={{ width: "145vh", overflowX: "auto" }}
          >
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
                      <Link
                        to={`/EditEmployee/${employee.employeeId}`}
                        className="Candidate-id"
                      >
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
                      <Link
                        to={`/UpdatePayrollSalary/${employee.employeeId}`}
                        className="Candidate-id"
                        variant="btn btn-outline-info"
                      >
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
              {Array.from({
                length: Math.ceil(currentEmployees.length / employeesPerPage),
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
        </div>
      </div>
    </div>
  );
}
