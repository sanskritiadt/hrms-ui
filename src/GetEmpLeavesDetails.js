
import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import LoadingPage from './LoadingPage'
import { useSelector } from 'react-redux';


const GetEmpLeavesDetails = () => {
  const  empId = useSelector((state) => state.auth.empId);
//   const  leaveId = useSelector((state) => state.auth.leaveId);
//   // const token = localStorage.getItem("response-token");
  const  token = useSelector((state) => state.auth.token);
  
  const [loading, setLoading] = useState(false);
 const [leave, setLeave] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
 const [totalPages, setTotalPages] = useState(0);


  // useEffect(() => {
  //   fetchEmpLeaveData();
  // }, []);

  useEffect(() => {
    fetchEmpLeaveData(currentPage);
  }, [currentPage]);

  const fetchEmpLeaveData = (page) => {
    setLoading(true); 
      axios.get(`/apigateway/payroll/leave/getAllLeaveByEmpId/${empId}`, {
        params: {
          page: page - 1,
          size: 10, 
        },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      setLeave(response.data.content);
      setTotalPages(response.data.totalPages);
      setLoading(false); 
    }).catch(error => {
      console.log(error);
      toast.error( error.response.data.message || "Error fetching details" );
      setLoading(false); 
    });
  };

  // const fetchEmployees = async (page) => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`/apigateway/hrms/employee/getAllEmp`, {
  //       params: {
  //         page: page - 1,
  //         size: 10, 
  //       },
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setEmployees(response.data.content);
  //     setTotalPages(response.data.totalPages);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching employees:", error);
  //     toast.error(error.response?.data?.message || "Error fetching details");
  //     setLoading(false);
  //   }
  // };

  return (
    <div  className="mt-3">
          {loading ? <LoadingPage/> : ''}
      <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
    <ol className="breadcrumb" style={{ color: "white" ,marginLeft:'20px'}}>
        <li className="breadcrumb-item"><Link to="/">Home</Link> </li>
        <li className="breadcrumb-item"><Link to="/">TimeSheet</Link></li>
        <li className="breadcrumb-item active" aria-current="page">Employee Leave Details</li>
    </ol>
</nav>
    <div style={{ margin: '100px 100px', height: '562px' }}>
      <h1 className="Heading1">Employee Leave Details</h1>
      <Container>

        <Table striped bordered hover className="custom-table">
          <thead>
            <tr>
              <th>LeaveType</th>
              <th>LeaveReason</th>
              <th>Status</th>
              <th>LeaveDate</th>
            </tr>
          </thead>
          <tbody>
            {
              leave.map((leave, index) => (
                <tr key={index}>
                  <td>{leave.leaveType}</td>
                  <td>{leave.leaveReason}</td>
                  <td>{leave.status}</td>
                  <td>{leave.leavedate.join(', ')}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        <nav>
            <ul className="pagination justify-content-center mt-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    onClick={() => setCurrentPage(index + 1)}
                    className="page-link mx-1"
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
      </Container>
    </div>
   </div>
  );
}

export default GetEmpLeavesDetails;


