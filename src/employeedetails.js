// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Form, Button } from "react-bootstrap";
// import LoadingPage from "./LoadingPage";
// import "./Hrmscss/App.css";
// import { useSelector } from 'react-redux';

// export default function Empfunc() {
//   const [employees, setEmployees] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [employeesPerPage] = useState(10);
//   const [loading, setLoading] = useState(true);
//   const [searchCriterion, setSearchCriterion] = useState("firstName");
//   const [searchValue, setSearchValue] = useState("");
//   const [searchResult, setSearchResult] = useState(null);

//   //const token = localStorage.getItem("response-token");
//   const  token = useSelector((state) => state.auth.token);

//   const handleCriterionChange = (e) => {
//     setSearchCriterion(e.target.value);
//   };

//   const handleValueChange = (e) => {
//     setSearchValue(e.target.value);
//   };

//   const fetchEmployees = async (page) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`/apigateway/hrms/employee/getAllEmp`, {
//         params: {
//           page: page - 1,
//           size: employeesPerPage,
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setEmployees(response.data.content);
//       setTotalPages(response.data.totalPages);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//       toast.error(error.response.data.message || "Error fetching details");
//       setLoading(false);
//     }
//   };

//   const handleSearch = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `/apigateway/hrms/employee/searchEmployees`,
//         {
//           params: {
//             [searchCriterion]: searchValue,
//           },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setSearchResult(response.data.content);
//       setTotalPages(response.data.totalPages);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error searching employees:", error);
//       toast.error(error.response.data.message || "Error searching details");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees(currentPage);
//   }, [currentPage]);

//   if (loading) return <LoadingPage />;

//   const currentEmployees = searchResult || employees;

//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div style={{ margin: "25px 100px", width: "820px", height: "750px" }}>
//       <div className="mt-3 pl-4">
//         <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
//           <ol className="breadcrumb" style={{ color: "white", marginLeft: "20px" }}>
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
//       <div className="d-flex justify-content-center" style={{ width: "90%" }}>
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
//                   <option  value="firstName" selected >First Name</option>
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
//           <div className="table-responsive-sm" style={{ width: "145vh", overflowX: "auto" }}>
//             <table border="2" className="table table-striped table-bordered">
//               <thead className="head">
//                 <tr className="table-danger table-striped">
//                   {/* <th>EMPLOYEE ID</th> */}
//                   <th>NAME</th>
//                   <th>DOB</th>
//                   <th>EMAIL</th>
//                   {/* <th>FIRST NAME</th>
//                   <th>LAST NAME</th> */}
//                   {/* <th>MARITAL STATUS</th> */}
//                   {/* <th>GENDER</th> */}
//                   {/* <th>EMAIL VERIFIED</th> */}
//                   <th>MOBILE NO</th>
//                   {/* <th>USERNAME</th> */}
//                   <th>PAYROLL DETAILS</th>
//                   <th>PERSONAL DETAILS</th>
//                 </tr>
//               </thead>
//               <tbody className="body">
//                 {currentEmployees.map((employee) => (
//                   <tr key={employee.employeeId}>
//                     {/* <td>
//                       <Link to={`/EditEmployee/${employee.employeeId}`} className="Candidate-id">
//                         {employee.employeeId}
//                       </Link>
//                     </td> */}
//                     <td>{employee.firstName} {employee.lastName}</td>
//                     <td>{employee.dob}</td>
//                     <td>{employee.email}</td>
//                     {/* <td>{employee.lastName}</td> */}
//                     {/* <td>{employee.maritalStatus}</td> */}
//                     {/* <td>{employee.gender}</td> */}
//                     {/* <td>{String(employee.isEmailVerified)}</td> */}
//                     <td>{employee.mobileNo}</td>
//                     {/* <td>{employee.userName}</td> */}
//                     <td>
//                       <Link to={`/UpdatePayrollSalary/${employee.employeeId}`} className="Candidate-id" variant="btn btn-outline-info">
//                         Payroll
//                       </Link>
//                     </td>
//                     <td>
//                       <Link to={`/EditEmployee/${employee.employeeId}`}  className="Candidate-id" variant="btn btn-outline-info">
//                         personal
//                       </Link>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <nav>
//             <ul className="pagination justify-content-center mt-2">
//               {Array.from({ length: totalPages }).map((_, index) => (
//                 <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
//                   <button onClick={() => paginate(index + 1)} className="page-link mx-1">
//                     {index + 1}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// }

// import axios from "axios";
// import React, { useState, useEffect, useMemo } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Table, Form, Button } from "react-bootstrap";
// import LoadingPage from "./LoadingPage";
// import { useSelector } from 'react-redux';
// import {
//   useReactTable,
//   flexRender,
//   getCoreRowModel,
//   getFacetedMinMaxValues,
//   getFacetedRowModel,
//   getFacetedUniqueValues,
//   getFilteredRowModel,
//   getSortedRowModel,
// } from "@tanstack/react-table";
// import { Edit as EditIcon } from "@mui/icons-material";
// import { IconButton } from "@mui/material";

// export default function Empfunc() {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [searchCriterion, setSearchCriterion] = useState("firstName");
//   const [searchValue, setSearchValue] = useState("");
//   const token = useSelector((state) => state.auth.token);
//   const [columnFilters, setColumnFilters] = useState([]);

//   useEffect(() => {
//     fetchEmployees(currentPage);
//   }, [currentPage]);

//   const fetchEmployees = async (page) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`/apigateway/hrms/employee/getAllEmp`, {
//         params: {
//           page: page - 1,
//           size: 10, // assuming 10 employees per page
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setEmployees(response.data.content);
//       setTotalPages(response.data.totalPages);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//       toast.error(error.response.data.message || "Error fetching details");
//       setLoading(false);
//     }
//   };

//   const handleSearch = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`/apigateway/hrms/employee/searchEmployees`, {
//         params: {
//           [searchCriterion]: searchValue,
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setEmployees(response.data.content);
//       setTotalPages(response.data.totalPages);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error searching employees:", error);
//       toast.error(error.response.data.message || "Error searching details");
//       setLoading(false);
//     }
//   };

//   const columns = useMemo(() => [
//     {
//       accessorKey: 'firstName',
//       header: 'First Name',
//       meta: { filterVariant: 'select' }
//     },
//     {
//       accessorKey: 'lastName',
//       header: 'Last Name',
//       meta: { filterVariant: 'select' }
//     },
//     {
//       accessorKey: 'dob',
//       header: 'DOB',
//       meta: { filterVariant: 'select' }
//     },
//     {
//       accessorKey: 'email',
//       header: 'Email',
//       meta: { filterVariant: 'select' }
//     },
//     {
//       accessorKey: 'mobileNo',
//       header: 'Mobile No',
//       meta: { filterVariant: 'select' }
//     },
//     {
//       accessorKey: 'employeeId',
//       header: 'Payroll',
//       cell: (cell) => (
//         <div>
//           <Link to={`/UpdatePayrollSalary/${cell.row.original.employeeId}`}>
//             <IconButton color="primary">
//             <EditIcon />
//             </IconButton>
//           </Link>
//         </div>
//       )
//     }, {
//       accessorKey: 'employeeId',
//       header: 'Per',
//       cell: (cell) => (
//         <div>
//           <Link to={`/EditEmployee/${cell.row.original.employeeId}`}>
//             <IconButton color="primary">
//               <EditIcon />
//             </IconButton>
//           </Link>
//         </div>
//       )
//     }
//   ], []);

//   const table = useReactTable({
//     data: employees,
//      state: { columnFilters },
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFacetedRowModel: getFacetedRowModel(),
//     getFacetedUniqueValues: getFacetedUniqueValues(),
//     getFacetedMinMaxValues: getFacetedMinMaxValues(),
//     debugTable: true,
//     debugHeaders: true,
//     debugColumns: false,
//   });

//   if (loading) return <LoadingPage />;

//   return (
//     <div style={{ margin: "25px 100px", width: "820px", height: "750px" }}>
//       <div className="mt-3 pl-4">
//         <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
//           <ol className="breadcrumb" style={{ color: "white", marginLeft: "20px" }}>
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
//       <div className="d-flex justify-content-center" style={{ width: "90%" }}>
//         <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
//           <h1 className="Heading1 my-4">Employee Details</h1>
//           <div className="d-flex justify-content-between">
//             <Form.Group controlId="employeeSearch">
//               <Form.Label className="my-2">Search By</Form.Label>
//               <div className="d-flex my-2">
//                 <Form.Control
//                   as="select"
//                   value={searchCriterion}
//                   onChange={(e) => setSearchCriterion(e.target.value)}
//                   style={{
//                     width: "39vh",
//                     marginRight: "10px",
//                     marginBottom: 0,
//                   }}
//                 >
//                   <option value="firstName">First Name</option>
//                   <option value="lastName">Last Name</option>
//                   <option value="email">Email</option>
//                   <option value="mobileNo">Mobile Number</option>
//                 </Form.Control>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter Search Value"
//                   value={searchValue}
//                   onChange={(e) => setSearchValue(e.target.value)}
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
//           <div className="table-responsive-sm" style={{ width: "145vh", overflowX: "auto" }}>
//             <Table striped bordered hover className="custom-table">
//               <thead className="table-danger table-striped">
//                 {table.getHeaderGroups().map((headerGroup) => (
//                   <tr key={headerGroup.id}>
//                     {headerGroup.headers.map((header) => (
//                       <th key={header.id} colSpan={header.colSpan}>
//                         {header.isPlaceholder ? null : (
//                           <>
//                             <div
//                               className={
//                                 header.column.getCanSort()
//                                   ? "cursor-pointer select-none"
//                                   : ""
//                               }
//                               onClick={header.column.getToggleSortingHandler()}
//                             >
//                               {flexRender(
//                                 header.column.columnDef.header,
//                                 header.getContext()
//                               )}
//                               {header.column.getIsSorted() === "asc"
//                                 ? " 🔼"
//                                 : header.column.getIsSorted() === "desc"
//                                 ? " 🔽"
//                                 : null}
//                             </div>
//                           </>
//                         )}
//                       </th>
//                     ))}
//                   </tr>
//                 ))}
//               </thead>
//               <tbody className="body">
//                 {table.getRowModel().rows.map((row) => (
//                   <tr key={row.id}>
//                     {row.getVisibleCells().map((cell) => (
//                       <td key={cell.id}>
//                         {flexRender(
//                           cell.column.columnDef.cell,
//                           cell.getContext()
//                         )}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </div>
//           <nav>
//             <ul className="pagination justify-content-center mt-2">
//               {Array.from({ length: totalPages }).map((_, index) => (
//                 <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
//                   <button onClick={() => setCurrentPage(index + 1)} className="page-link mx-1">
//                     {index + 1}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// }

import axios from "axios";
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Table, Form, Button } from "react-bootstrap";
import LoadingPage from "./LoadingPage";
import { useSelector } from 'react-redux';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Edit as EditIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";

 function Empfunc() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchCriterion, setSearchCriterion] = useState("firstName");
  const [searchValue, setSearchValue] = useState("");
  const token = useSelector((state) => state.auth.token);
  const [columnFilters, setColumnFilters] = useState([]);

  useEffect(() => {
    fetchEmployees(currentPage);
  }, [currentPage]);

  const fetchEmployees = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`/apigateway/hrms/employee/getAllEmp`, {
        params: {
          page: page - 1,
          size: 10, // assuming 10 employees per page
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(response.data.content);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error(error.response?.data?.message || "Error fetching details");
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/apigateway/hrms/employee/searchEmployees`, {
        params: {
          [searchCriterion]: searchValue,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(response.data.content);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error searching employees:", error);
      toast.error(error.response?.data?.message || "Error searching details");
      setLoading(false);
    }
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'firstName',
      header: 'First Name',
      meta: { filterVariant: 'select' }
    },
    {
      accessorKey: 'lastName',
      header: 'Last Name',
      meta: { filterVariant: 'select' }
    },
    {
      accessorKey: 'dob',
      header: 'DOB',
      meta: { filterVariant: 'select' }
    },
    {
      accessorKey: 'email',
      header: 'Email',
      meta: { filterVariant: 'select' }
    },
    {
      accessorKey: 'mobileNo',
      header: 'Mobile No',
      meta: { filterVariant: 'select' }
    },
    {
      accessorKey: 'employeeId',
      header: 'Payroll',
      cell: (cell) => (
        <div>
          <Link to={`/UpdatePayrollSalary/${cell.row.original.employeeId}`}>
            <IconButton color="primary">
            <EditIcon />
            </IconButton>
          </Link>
        </div>
      )
    }, {
      accessorKey: 'employeeId',
      header: 'Personal',
      cell: (cell) => (
        <div>
          <Link to={`/EditEmployee/${cell.row.original.employeeId}`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
        </div>
      )
    }
  ], []);

  const table = useReactTable({
    data: employees,
    columns,
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  if (loading) return <LoadingPage />;

  return (
    <div style={{ margin: "25px 100px", width: "820px", height: "750px" }}>
      <div className="mt-3 pl-4">
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
      <div className="d-flex justify-content-center" style={{ width: "90%" }}>
        <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          <h1 className="Heading1 my-4">Employee Details</h1>
          <div className="d-flex justify-content-between">
            <Form.Group controlId="employeeSearch">
              <Form.Label className="my-2">Search By</Form.Label>
              <div className="d-flex my-2">
                <Form.Control
                  as="select"
                  value={searchCriterion}
                  onChange={(e) => setSearchCriterion(e.target.value)}
                  style={{
                    width: "39vh",
                    marginRight: "10px",
                    marginBottom: 0,
                  }}
                >
                  <option value="firstName">First Name</option>
                  <option value="lastName">Last Name</option>
                  <option value="email">Email</option>
                  <option value="mobileNo">Mobile Number</option>
                </Form.Control>
                <Form.Control
                  type="text"
                  placeholder="Enter Search Value"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
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
          <Table striped bordered hover className="custom-table">
            <thead className="table-danger table-striped">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={
                              header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : ""
                            }
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getIsSorted() === "asc"
                              ? " 🔼"
                              : header.column.getIsSorted() === "desc"
                              ? " 🔽"
                              : null}
                          </div>
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} />
                            </div>
                          ) : null}
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="body">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            </Table>
          </div>
          <nav>
            <ul className="pagination justify-content-center mt-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                  <button onClick={() => setCurrentPage(index + 1)} className="page-link mx-1">
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

function Filter({ column }) {
  const { filterVariant } = column.columnDef.meta || {};

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () =>
      filterVariant === "select"
        ? Array.from(column.getFacetedUniqueValues().keys()).sort()
        : [],
    [column.getFacetedUniqueValues(), filterVariant]
  );

  return filterVariant === "select" ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={columnFilterValue?.toString() || ""}
    >
      <option value="">All</option>
      {sortedUniqueValues.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  ) : filterVariant === "range" ? (
    <div>
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue ? columnFilterValue[0] : "") ?? ""}
          onChange={(e) =>
            column.setFilterValue((old) => [e.target?.value, old?.[1]])
        }
        
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0] !== undefined
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ""
          }`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue ? columnFilterValue[1] : "") ?? ""}
          onChange={(e) =>
            column.setFilterValue((old) => [e.target?.value, old?.[1]])
        }
        
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1] !== undefined
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ""
          }`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : null; 
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default Empfunc;