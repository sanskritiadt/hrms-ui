// import axios from "axios";
// import React from "react";
// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import LoadingPage from "./LoadingPage";
// import { useSelector } from 'react-redux';
// export default function PositionDetails() {
//   const [loading, setLoading] = useState(true);
//   const [positions, setPosition] = useState([]);
//   const [screenWidth, setScreenWidth] = useState(window.innerWidth);
//   // const token = localStorage.getItem("response-token");
//   const  token = useSelector((state) => state.auth.token);

//   useEffect(() => {
//     axios
//       .get("/apigateway/hrms/interview/getAllPositionNew", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setPosition(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         toast.error(error.response.data.message || "Error fetching details");
//         console.log("error occurred", error);
//         setLoading(false);
//       });

//     const handleResize = () => {
//       setScreenWidth(window.innerWidth);
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   if (!positions) return null;

//   return (
//     <div>
//       <div className="mt-3">
//         {loading ? <LoadingPage /> : ""}
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
//               Employee Position
//             </li>
//           </ol>
//         </nav>
//       </div>
//       <div
//         className="d-flex justify-content-center  "
//         style={{ width: screenWidth - 80 }}
//       >
//         <div className="table-responsive-sm" style={{ width: "160vh"}}>
//           <div className="my-4">
//             <h1 className="Heading1">Employee Position</h1>
//           </div>
//           <table border="2" className="table table-striped table-bordered">
//             <thead className="head">
//               <tr className="table-danger table-striped">
//                 <th>POSITION NAME</th>
//                 <th>TECH STACK</th>
//                 <th>VACANCY</th>
//                 <th>POSITION OPEN DATE</th>
//                 <th>POSITION CLOSE DATE</th>
//                 <th>STATUS</th>
//                 <th>EXPERIENCE IN YEAR</th>
//                 <th>REMOTE</th>
//                 <th>POSITION TYPE</th>
//                 <th>Update</th>
//               </tr>
//             </thead>
//             <tbody className="body">
//               {positions.map((position) => (
//                 // display a <div> element with the employees.emailId and employees.designation
//                 // parent element needs to have a unique key
//                 <tr key={position.positionId}>
//                   <td>{position.positionName}</td>
//                   <td>{position.techStack.join(",")}</td>
//                   <td>{position.vacancy}</td>
//                   <td>{position.positionopendate}</td>
//                   <td>{position.positionclosedate}</td>
//                   <td>{position.status}</td>
//                   <td>{position.experienceInYear}</td>
//                   <td>{String(position.remote)}</td>
//                   <td>{position.positionType}</td>
//                   <th>
//                     <Link to={`/EditPosition/${position.positionId}`}>
//                       <Button variant="outline-primary" type="button">
//                         Edit
//                       </Button>
//                     </Link>
//                   </th>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import LoadingPage from "./LoadingPage";
import { useSelector } from 'react-redux';

export default function PositionDetails() {
  const [positions, setPositions] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [filters, setFilters] = useState({
    techStack: "",
    vacancy: "",
    status: "",
    experienceInYear: "",
    remote: "",
    positionType: "",
    openDateFrom: "",
    openDateTo: "",
    closeDateFrom: "",
    closeDateTo: ""
  });
  const [loading, setLoading] = useState(true);
  // const token = localStorage.getItem("response-token");
  const  token = useSelector((state) => state.auth.token);

  useEffect(() => {
    axios
      .get("/apigateway/hrms/interview/getAllPositionNew", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setPositions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching positions:", error);
        setLoading(false);
        // Handle error as needed
      });
  }, [token]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to get unique values from an array of objects based on a key
  const getUniqueValues = (key) => {
    const uniqueValues = new Set();
    positions.forEach((position) => {
      if (position[key]) {
        if (Array.isArray(position[key])) {
          position[key].forEach((value) => uniqueValues.add(value));
        } else {
          uniqueValues.add(position[key]);
        }
      }
    });
    return Array.from(uniqueValues).sort();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      techStack: "",
      vacancy: "",
      status: "",
      experienceInYear: "",
      remote: "",
      positionType: "",
      openDateFrom: "",
      openDateTo: "",
      closeDateFrom: "",
      closeDateTo: ""
    });
  };

  const filteredPositions = positions.filter((position) => {
    for (let key in filters) {
      if (filters[key]) {
        if (key === "openDateFrom" && filters[key] && new Date(position.positionopendate) < new Date(filters[key])) {
          return false;
        }
        if (key === "openDateTo" && filters[key] && new Date(position.positionopendate) > new Date(filters[key])) {
          return false;
        }
        if (key === "closeDateFrom" && filters[key] && new Date(position.positionclosedate) < new Date(filters[key])) {
          return false;
        }
        if (key === "closeDateTo" && filters[key] && new Date(position.positionclosedate) > new Date(filters[key])) {
          return false;
        }
        if (key !== "openDateFrom" && key !== "openDateTo" && key !== "closeDateFrom" && key !== "closeDateTo" && String(position[key]).toLowerCase().indexOf(filters[key].toLowerCase()) === -1) {
          return false;
        }
      }
    }
    return true;
  });

  if (loading) return <LoadingPage />;
  if (positions.length === 0) return null;

  return (
    <div>
      <div className="mt-3">
        <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
          <ol className="breadcrumb" style={{ color: "white", marginLeft: '20px' }}>
            <li className="breadcrumb-item"><Link to="/">Home</Link> </li>
            <li className="breadcrumb-item"><a href="">Employee Management</a></li>
            <li className="breadcrumb-item active" aria-current="page">Employee Position</li>
          </ol>
        </nav>
      </div>
      <div className="d-flex justify-content-center" style={{ width: screenWidth - 50 }}>
        <div className="table-responsive-sm">
          <div className="my-4">
            <h1 className='Heading1'>Employee Position</h1>
          </div>
          <div>
            <div className="row">
              <div className="col-lg-12 container pt-2">
                <form>
                  <div className="mb-2 d-grid gap-1 d-md-flex justify-content-center">
                    <Button
                      variant="outline-primary"
                      onClick={clearFilters}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <table border='2' className="table table-striped table-bordered">
            <thead className="head">
              <tr className="table-danger table-striped">
                <th>
                  <select
                    name="techStack"
                    value={filters.techStack}
                    onChange={handleFilterChange}
                    className="form-control"
                  >
                    <option value="">All</option>
                    {getUniqueValues("techStack").map((value) => (
                      <option key={value} value={value}>{value}</option>
                    ))}
                  </select>
                </th>
                <th>
                  <select
                    name="vacancy"
                    value={filters.vacancy}
                    onChange={handleFilterChange}
                    className="form-control"
                  >
                    <option value="">All</option>
                    {getUniqueValues("vacancy").map((value) => (
                      <option key={value} value={value}>{value}</option>
                    ))}
                  </select>
                </th>
                <th>
                  <input
                    type="date"
                    name="openDateFrom"
                    value={filters.openDateFrom}
                    onChange={handleFilterChange}
                    className="form-control"
                  />
                  <input
                    type="date"
                    name="openDateTo"
                    value={filters.openDateTo}
                    onChange={handleFilterChange}
                    className="form-control"
                  />
                </th>
                <th>
                  <input
                    type="date"
                    name="closeDateFrom"
                    value={filters.closeDateFrom}
                    onChange={handleFilterChange}
                    className="form-control"
                  />
                  <input
                    type="date"
                    name="closeDateTo"
                    value={filters.closeDateTo}
                    onChange={handleFilterChange}
                    className="form-control"
                  />
                </th>
                <th>
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                    className="form-control"
                  >
                    <option value="">All</option>
                    {getUniqueValues("status").map((value) => (
                      <option key={value} value={value}>{value}</option>
                    ))}
                  </select>
                </th>
                <th>
                  <select
                    name="experienceInYear"
                    value={filters.experienceInYear}
                    onChange={handleFilterChange}
                    className="form-control"
                  >
                    <option value="">All</option>
                    {getUniqueValues("experienceInYear").map((value) => (
                      <option key={value} value={value}>{value}</option>
                    ))}
                  </select>
                </th>
                <th>
                  <select
                    name="remote"
                    value={filters.remote}
                    onChange={handleFilterChange}
                    className="form-control"
                  >
                    <option value="">All</option>
                    <option value="true">Remote</option>
                    <option value="false">Not Remote</option>
                  </select>
                </th>
                <th>
                  <select
                    name="positionType"
                    value={filters.positionType}
                    onChange={handleFilterChange}
                    className="form-control"
                  >
                    <option value="">All</option>
                    {getUniqueValues("positionType").map((value) => (
                      <option key={value} value={value}>{value}</option>
                    ))}
                  </select>
                </th>
              </tr>
            </thead>
            <tbody className="body">
              {filteredPositions.map((position) => (
                <tr key={position.uiid}>
                  <td>{position.techStack.join(",")}</td>
                  <td>{position.vacancy}</td>
                  <td>{position.positionopendate}</td>
                  <td>{position.positionclosedate}</td>
                  <td>{position.status}</td>
                  <td>{position.experienceInYear}</td>
                  <td>{String(position.remote)}</td>
                  <td>{position.positionType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
