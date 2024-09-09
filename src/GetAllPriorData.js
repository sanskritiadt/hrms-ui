// import React, { useEffect, useState } from 'react';
// import { Container, Table, Button } from 'react-bootstrap';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';
// import LoadingPage from './LoadingPage'
// import { useSelector } from 'react-redux';
// function GetAllPriorTimeRequest() {
//   // const token = localStorage.getItem("response-token");
//   const  token = useSelector((state) => state.auth.token);

//   const [loading, setLoading] = useState(true);
//   const [priorTimeRequest, setPriorTimeRequest] = useState([]);

//   useEffect(() => {
//     getAllPriorTimeRequest();
//   }, []);

//   const getAllPriorTimeRequest = () => {
//     setLoading(true);
//     axios.get("/apigateway/payroll/timeSheet/getAllPriorTimeRequest", {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     }).then((response) => {
//       setPriorTimeRequest(response.data);
//       setLoading(false);
//     }).catch(error => {
//       console.log(error);
//       toast.error( error.response.data.message || "Error fetching details" );
//       setLoading(false);
//     });
//   };

//   return (
//     <div  className="mt-3">
//           {loading ? <LoadingPage/> : ''}
//       <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
//     <ol className="breadcrumb" style={{ color: "white" ,marginLeft:'20px'}}>
//         <li className="breadcrumb-item"><Link to="/">Home</Link> </li>
//         <li className="breadcrumb-item"><Link to="">Employee Management</Link></li>
//         <li className="breadcrumb-item"><Link to="">Employee Attendance</Link></li>
//         <li className="breadcrumb-item active" aria-current="page">PriorTimeRequest</li>
//     </ol>
// </nav>
//     <div style={{ margin: '100px 100px', height: '562px' }}>
//       <h1 className="Heading1">priorTime Request</h1>
//       <Container>

//         <Table striped bordered hover className="custom-table">
//           <thead>
//             <tr>
//               <th>priortimeId</th>
//               <th>employeeId</th>
//               <th>checkIn</th>
//               <th>checkOut</th>
//               <th>date</th>
//               <th>month</th>
//               <th>status</th>
//               <th>workingHour</th>
//               <th>year</th>
//               <th>email</th>
//               <th>checkInLatitude</th>
//               <th>checkInLongitude</th>
//               <th>checkInDistance</th>
//               <th>checkOutLatitude</th>
//               <th>checkOutLongitude</th>
//               <th>checkOutDistance</th>
//               <th>expiryTime</th>
//               <th>updatedBy</th>
//             </tr>
//           </thead>
//           <tbody>
//             {
//               priorTimeRequest.map((priorTimeRequest, index) => (
//                 <tr key={index}>
//                   <td>{priorTimeRequest.priortimeId}</td>
//                   <td>{priorTimeRequest.employeeId}</td>
//                   <td>{priorTimeRequest.checkIn}</td>
//                   <td>{priorTimeRequest.checkOut}</td>
//                   <td>{priorTimeRequest.date}</td>
//                   <td>{priorTimeRequest.month}</td>
//                   <td>{priorTimeRequest.status}</td>
//                   <td>{priorTimeRequest.workingHour}</td>
//                   <td>{priorTimeRequest.year}</td>
//                   <td>{priorTimeRequest.email}</td>
//                   <td>{priorTimeRequest.checkInLatitude}</td>
//                   <td>{priorTimeRequest.checkInLongitude}</td>
//                   <td>{priorTimeRequest.checkInDistance}</td>
//                   <td>{priorTimeRequest.checkOutLatitude}</td>
//                   <td>{priorTimeRequest.checkOutLongitude}</td>
//                   <td>{priorTimeRequest.checkOutDistance}</td>
//                   <td>{priorTimeRequest.expiryTime}</td>
//                   <td>{priorTimeRequest.updatedBy}</td>
//                 </tr>
//               ))
//             }
//           </tbody>
//         </Table>
//       </Container>
//     </div>
//    </div>
//   );
// }

// export default GetAllPriorTimeRequest;

import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { useSelector } from "react-redux";

function GetAllPriorTimeRequest() {
  const token = useSelector((state) => state.auth.token);

  const [loading, setLoading] = useState(true);
  const [priorTimeRequests, setPriorTimeRequests] = useState([]);

  useEffect(() => {
    getAllPriorTimeRequest();
  }, []);

  const getAllPriorTimeRequest = () => {
    setLoading(true);
    axios
      .get("/apigateway/payroll/timeSheet/getAllPriorTimeRequest", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Flatten the content array to get a single list of all prior time requests
        const requests = response.data.content.flatMap((employeeRequests) =>
          Object.values(employeeRequests).flat()
        );
        setPriorTimeRequests(requests);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message || "Error fetching details");
        setLoading(false);
      });
  };

  return (
    <div className="mt-3">
      {loading && <LoadingPage />}
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
            <Link to="#">Employee Management</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            PriorTimeRequest
          </li>
        </ol>
      </nav>
      <div style={{ margin: "100px 100px", height: "562px" }}>
        <h1 className="Heading1">PriorTime Request</h1>
        <Container>
          <Table striped bordered hover className="custom-table">
            <thead>
              <tr>
                {/* <th>priortimeId</th> */}
                <th>employeeId</th>
                <th>employeeName</th>
                <th>checkIn</th>
                <th>checkOut</th>
                <th>date</th>
                <th>month</th>
                <th>status</th>
                <th>workingHour</th>
                <th>year</th>
                {/* <th>email</th> */}
                {/* <th>checkInLatitude</th>   
                <th>checkInLongitude</th>
                <th>checkInDistance</th>
                <th>checkOutLatitude</th>
                <th>checkOutLongitude</th>
                <th>checkOutDistance</th>
                <th>expiryTime</th> */}
                <th>updatedBy</th>
                <th>Approve</th>
                <th>Reject</th>
              </tr>
            </thead>
            <tbody>
              {priorTimeRequests.map((request, index) => (
                <tr key={index}>
                  {/* <td>{request.priortimeId}</td> */}
                  <td>{request.employeeId}</td>
                  <td>{request.employeeName}</td>
                  <td>{request.checkIn}</td>
                  <td>{request.checkOut}</td>
                  <td>{request.date}</td>
                  <td>{request.month}</td>
                  <td>{request.status}</td>
                  <td>{request.workingHour}</td>
                  <td>{request.year}</td>
                  {/* <td>{request.email}</td>
                    <td>{request.checkInLatitude}</td>
                    <td>{request.checkInLongitude}</td>
                    <td>{request.checkInDistance}</td>
                    <td>{request.checkOutLatitude}</td>
                    <td>{request.checkOutLongitude}</td>
                    <td>{request.checkOutDistance}</td>
                    <td>{new Date(request.expiryTime).toLocaleString()}</td> */}
                  <td>{request.updatedBy || "N/A"}</td>
                  <td>
                    <Button
                      type="submit"
                      variant="outline-primary"
                      style={{ margin: "3px", height: "37px" }}
                    >
                      Approve
                    </Button>
                  </td>
                  <td>
                    <Button
                      type="submit"
                      variant="outline-danger"
                      style={{ margin: "3px", height: "37px" }}
                    >
                      Reject
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
  );
}

export default GetAllPriorTimeRequest;
