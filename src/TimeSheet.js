// import axios from 'axios';
// import React, { useState, useEffect, useMemo } from "react";
// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';
// import LoadingPage from './LoadingPage';
// import { useSelector } from 'react-redux';
// <<<<<<< Updated upstream
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );
// =======
// import { Table } from "react-bootstrap";
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
// >>>>>>> Stashed changes
// const TimeSheet = () => {
//   const [checkindisable, setcheckinDisable] = useState(false);
//   const [checkoutdisable, setcheckoutDisable] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const [getDate, setNewDate] = useState([]);
//   const [latitude, setLatitude] = useState("");
//   const [longitude, setLongitude] = useState("");
//   const [loading, setLoading] = useState(false);
// <<<<<<< Updated upstream
//   const [graphData, setGraphData] = useState(null);
// =======
//   const [columnFilters, setColumnFilters] = useState([]);
// >>>>>>> Stashed changes

//   const  token = useSelector((state) => state.auth.token);
//   const  empId = useSelector((state) => state.auth.empId);


//   const [date, setDate] = useState({
//     fromDate: "",
//     toDate: "",
//   });
//   //HRMS-94
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((position) => {
//      // console.log(position);
//       setLatitude(position.coords.latitude);
//       setLongitude(position.coords.longitude);
//     });
//   }, []);

//   const checkIn = (e) => {
//     e.preventDefault();
//     setLoading(true); 
//     axios
//       .post(
//         `/apigateway/payroll/timeSheet/checkIn/${empId}?Latitude=${latitude}&Longitude=${longitude}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response.data);
//         toast.success(response.data, {
//           position: "top-center",
//           theme: "colored",
//         });
//         setcheckinDisable(true);
//         setLoading(false);
//       })
//       .catch((error) => {
//         toast.error( error.response.data.message || "Error while checkin" );
//         // alert(latitude,longitude)
//         console.log(error);
//         setLoading(false);
//       });
//   };
//   const checkOut = (e) => {
//     e.preventDefault();
//     setLoading(true); 
//     axios
//       .put(
//         `/apigateway/payroll/timeSheet/checkOut/${empId}?Latitude=${latitude}&Longitude=${longitude}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response.data);
//         toast.success(response.data, {
//           position: "top-center",
//           theme: "colored",
//         });
//         setcheckoutDisable(true);
//         setLoading(false);
//       })
//       .catch((error) => {
//         toast.error( error.response.data.message || "Error while checkout" );
//         console.log(error);
//         setLoading(false);
//       });
//   };

//   const handleClick = () => {
//     setLoading(true); 
//     const apiUrl = isPaused
//       ? `/apigateway/payroll/timeSheet/resume/${empId}`
//       : `/apigateway/payroll/timeSheet/pause/${empId}`;
//     const method = isPaused ? "patch" : "put";
//     axios
//       .request({
//         method: method,
//         url: apiUrl,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setIsPaused(!isPaused);
//         toast.success(response.data, {
//           position: "top-center",
//           theme: "colored",
//         });
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error( error.response.data.message);
//         setLoading(false);
//       });
//   };

//   function submit(e) {
//     e.preventDefault();
//     setLoading(true); 
//     axios
//       .get(
//         `/apigateway/payroll/timeSheet/empAttendence?fromDate=${date.fromDate}&toDate=${date.toDate}&empId=${empId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         setNewDate(response.data);
//         setGraphData(prepareGraphData(response.data)); 
//         console.log(response.data);
//         toast.success("Data found successfully.", {
//           position: "top-center",
//           theme: "colored",
//         });
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error.response.data);
//         toast.error( error.response.data.message || "Error while fetching details." );
//         setLoading(false);
//       });
//   }

//   function handle(e) {
//     const newdate = { ...date };
//     newdate[e.target.id] = e.target.value;
//     setDate(newdate);
//     console.log(newdate);
//   }
// <<<<<<< Updated upstream
 
//   const prepareGraphData = (data) => {
//       const dates = data.map((entry) => entry.date);
//       const workingHours = data.map((entry) => {
//         return entry.workingHour ? parseInt(entry.workingHour) : 0;
//    });    
//       return {
//         labels: dates,
//         datasets: [
//           {
//             label: 'Working Performance',
//             data: workingHours,
//             fill: false,
//             backgroundColor: 'rgba(75,192,192,0.4)',
//             borderColor: 'rgba(75,192,192,1)',
//           },
//         ],
//       };
//     };
// =======
  
//   const columns = useMemo(() => [
//     {
//       accessorKey: 'employeeId',
//       header: 'employeeId',
//     },
//     {
//       accessorKey: 'checkIn',
//       header: 'checkIn',
//       meta: { filterVariant: 'select' }
//     },
//     {
//       accessorKey: 'workingHour',
//       header: 'workingHour',
//       meta: { filterVariant: 'select' }
//     },
//     {
//       accessorKey: 'date',
//       header: 'date',
//       meta: { filterVariant: 'select' }
//     },
//     {
//       accessorKey: 'status',
//       header: 'status',
//       meta: { filterVariant: 'select' }
//     },
//     {
//       accessorKey: 'leaveInterval',
//       header: 'leaveInterval',
//       meta: { filterVariant: 'select' }
//     }

//   ], []);

//   const table = useReactTable({
//     data: getDate,
//     columns,
//     state: { columnFilters },
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
// >>>>>>> Stashed changes

//   return (
//     <>
//       <div className="container">
//       {loading ? <LoadingPage/> : ''}
//         <div
//           className="row justify-content-center align-items-center"
//           style={{ height: "90vh" }}
//         >
//           <nav
//             aria-label="breadcrumb"
//             style={{ "--bs-breadcrumb-divider": "'>>'" }}
//           >
//             <ol className="breadcrumb" style={{ color: "white" }}>
//               <li className="breadcrumb-item">
//                 <Link to="/">Home</Link>{" "}
//               </li>

//               <li className="breadcrumb-item active" aria-current="page">
//                 TimeSheet
//               </li>
//             </ol>
//           </nav>

//           <div
//             className=" d-grid gap-2 d-md-flex justify-content-center pt-1 "
//             style={{ paddingLeft: "120px" }}
//           >
//             <button
//               disabled={checkindisable}
//               onClick={checkIn}
//               type="button"
//               className="btn btn-outline-dark btn-lg"
//             >
//               CHECK IN
//             </button>
//             <button
//               disabled={checkoutdisable}
//               onClick={checkOut}
//               type="button"
//               className="btn btn-outline-dark btn-lg"
//             >
//               CHECK OUT
//             </button>
//             <button
//               type="button"
//               className="btn btn-outline-dark btn-lg"
//               onClick={handleClick}
//             >
//               {isPaused ? "Play" : "Pause"}
//             </button>
//           </div>
//           <div
//             className=" mb-2 d-grid gap-2 d-md-flex justify-content-center"
//             style={{ paddingLeft: "120px" }}
//           >
//             <Link
//               to="/Leave"
//               type="button"
//               className="btn btn-outline-dark btn-lg my-2"
//             >
//               LeaveRequest
//             </Link>
//           </div>
//           <div
//             className=" mb-2 d-grid gap-2 d-md-flex justify-content-center"
//             style={{ paddingLeft: "120px" }}
//           >
//             {/* <Link
//                 to="/PriorTimeAdj"
//                 type="button"
//                 className="btn btn-outline-dark btn-lg my-2"
//               >
//                 Prior Time Request
//               </Link> */}
//             <Link
//               to={{
//                 pathname: "/PriorTimeAdj",
//                 state: { latitude: latitude, longitude: longitude },
//               }}
//               type="button"
//               className="btn btn-outline-dark btn-lg my-2"
//             >
//               Prior Time Request
//             </Link>
//           </div>
//           <div className=" col-lg-10 container pt-2">
//             <form
//               onSubmit={(e) => {
//                 submit(e);
//               }}
//             >
//               <div
//                 className=" mb-2 d-grid gap-1 d-md-flex justify-content-center "
//                 style={{ width: "600px" }}
//               >
//                 <label className="pt-2 fs-5" htmlFor="fromdate">
//                   FromDate:
//                 </label>
//                 <input
//                   onChange={(e) => {
//                     handle(e);
//                   }}
//                   value={date.fromDate}
//                   type="date"
//                   className="form-control"
//                   id="fromDate"
//                 />
//                 <label className="pt-2 fs-5" htmlFor="todate">
//                   ToDate:
//                 </label>
//                 <input
//                   onChange={(e) => {
//                     handle(e);
//                   }}
//                   value={date.toDate}
//                   type="date"
//                   className="form-control"
//                   id="toDate"
//                 />
//                 <button
//                   className=" btn btn-primary m-0"
//                   style={{ height: "45px" }}
//                 >
//                   Get
//                 </button>
//               </div>
//             </form>
//           </div>
//           <div
//             className="table-responsive-sm "
//             style={{ paddingLeft: "140px", paddingRight: "60px" }}
//           >
//            <Table striped bordered hover className="custom-table">
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
//                                   ? " 🔽"
//                                   : null}
//                             </div>
//                             {header.column.getCanFilter() ? (
//                               <div>
//                                 <Filter column={header.column} />
//                               </div>
//                             ) : null}
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
// <<<<<<< Updated upstream
//             </table>
//         {graphData && (
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-lg-10">
//               <div className="card">
//                 <div className="card-body">
//                   <h5 className="card-title">Graphical Representation (Hour/Date)</h5>
//                   <Line data={graphData} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         )}
// =======
//             </Table>
// >>>>>>> Stashed changes
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };


// function Filter({ column }) {
//   const { filterVariant } = column.columnDef.meta || {};

//   const columnFilterValue = column.getFilterValue();

//   const sortedUniqueValues = useMemo(
//     () =>
//       filterVariant === "select"
//         ? Array.from(column.getFacetedUniqueValues().keys()).sort()
//         : [],
//     [column.getFacetedUniqueValues(), filterVariant]
//   );

//   return filterVariant === "select" ? (
//     <select
//       onChange={(e) => column.setFilterValue(e.target.value)}
//       value={columnFilterValue?.toString() || ""}
//     >
//       <option value="">All</option>
//       {sortedUniqueValues.map((value) => (
//         <option key={value} value={value}>
//           {value}
//         </option>
//       ))}
//     </select>
//   ) : filterVariant === "range" ? (
//     <div>
//       <div className="flex space-x-2">
//         <DebouncedInput
//           type="number"
//           min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
//           max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
//           value={(columnFilterValue ? columnFilterValue[0] : "") ?? ""}
//           onChange={(e) =>
//             column.setFilterValue((old) => [e.target?.value, old?.[1]])
//           }
//           placeholder={`Min ${
//             column.getFacetedMinMaxValues()?.[0] !== undefined
//               ? `(${column.getFacetedMinMaxValues()?.[0]})`
//               : ""
//           }`}
//           className="w-24 border shadow rounded"
//         />
//         <DebouncedInput
//           type="number"
//           min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
//           max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
//           value={(columnFilterValue ? columnFilterValue[1] : "") ?? ""}
//           onChange={(e) =>
//             column.setFilterValue((old) => [old?.[0], e.target?.value])
//           }
//           placeholder={`Max ${
//             column.getFacetedMinMaxValues()?.[1] !== undefined
//               ? `(${column.getFacetedMinMaxValues()?.[1]})`
//               : ""
//           }`}
//           className="w-24 border shadow rounded"
//         />
//       </div>
//       <div className="h-1" />
//     </div>
//   ) : null;
// }

// function DebouncedInput({
//   value: initialValue,
//   onChange,
//   debounce = 500,
//   ...props
// }) {
//   const [value, setValue] = useState(initialValue);

//   useEffect(() => {
//     setValue(initialValue);
//   }, [initialValue]);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       onChange(value);
//     }, debounce);

//     return () => clearTimeout(timeout);
//   }, [value]);

//   return (
//     <input
//       {...props}
//       value={value}
//       onChange={(e) => setValue(e.target.value)}
//     />
//   );
// }

// export default TimeSheet;

// import axios from "axios";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import LoadingPage from './LoadingPage'
// import { useSelector } from 'react-redux';
// import { Line } from 'react-chartjs-2';
// import { Modal, Button, Form } from "react-bootstrap";  // Add these imports for the Modal
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );
// const TimeSheet = () => {
//   const [checkindisable, setcheckinDisable] = useState(false);
//   const [checkoutdisable, setcheckoutDisable] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const [earlycheckoutdisable, setearlycheckoutDisable] = useState(false);
//   const [getDate, setNewDate] = useState([]);
//   const [latitude, setLatitude] = useState("");
//   const [longitude, setLongitude] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [graphData, setGraphData] = useState(null);
//   const [earlyReason, setEarlyReason] = useState("");
//   const [earlyType, setEarlyType] = useState("");
//   const [showModal, setShowModal] = useState(false); // For managing modal visibility


//   // const token = localStorage.getItem("response-token");
//   // const empId = localStorage.getItem("EmpID");
//   const  token = useSelector((state) => state.auth.token);
//   const  empId = useSelector((state) => state.auth.empId);

//   const [date, setDate] = useState({
//     fromDate: "",
//     toDate: "",
//   });
//   //HRMS-94
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((position) => {
//      // console.log(position);
//       setLatitude(position.coords.latitude);
//       setLongitude(position.coords.longitude);
//     });
//   }, []);

//   const handleOpenEarlyPopUp = () => setShowModal(true); // Function to show the modal
//   const handleCloseModal = () => setShowModal(false); // Function to close the modal

//   const handleEarlyCheckOut = () => {
//     setLoading(true);
//     axios
//       .put(
//         `/apigateway/payroll/timeSheet/earlyCheckOut/${empId}?Latitude=${latitude}&Longitude=${longitude}&reason=${earlyReason}&type=${earlyType}`,
//         { reason: earlyReason, type: earlyType },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         toast.success(response.data, {
//           position: "top-center",
//           theme: "colored",
//         });
//         setearlycheckoutDisable(true);
//         setLoading(false);
//         handleCloseModal(); // Close the modal upon successful submission
//       })
//       .catch((error) => {
//         toast.error(error.response.data.message || "Error during early checkout");
//         console.log(error);
//         setLoading(false);
//       });
//   };


//   const checkIn = (e) => {
//     e.preventDefault();
//     setLoading(true); 
//     axios.post(
//         `/apigateway/payroll/timeSheet/checkIn/${empId}?Latitude=${latitude}&Longitude=${longitude}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response.data);
//         toast.success(response.data, {
//           position: "top-center",
//           theme: "colored",
//         });
//         setcheckinDisable(true);
//         setLoading(false);
//       })
//       .catch((error) => {
//         toast.error( error.response.data.message || "Error while checkin" );
//         // alert(latitude,longitude)
//         console.log(error);
//         setLoading(false);
//       });
//   };

//   const checkOut = (e) => { 
//     e.preventDefault();
//     setLoading(true); 
//     axios
//       .put(
//         `/apigateway/payroll/timeSheet/checkOut/${empId}?Latitude=${latitude}&Longitude=${longitude}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response.data);
//         toast.success(response.data, {
//           position: "top-center",
//           theme: "colored",
//         });
//         setcheckoutDisable(true);
//         setLoading(false);
//       })
//       .catch((error) => {
//         toast.error( error.response.data.message || "Error while checkout" );
//         console.log(error);
//         setLoading(false);
//       });
//   };

//   const handleClick = () => {
//     setLoading(true); 
//     const apiUrl = isPaused
//       ? `/apigateway/payroll/timeSheet/resume/${empId}`
//       : `/apigateway/payroll/timeSheet/pause/${empId}`;
//     const method = isPaused ? "patch" : "put";
//     axios
//       .request({
//         method: method,
//         url: apiUrl,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setIsPaused(!isPaused);
//         toast.success(response.data, {
//           position: "top-center",
//           theme: "colored",
//         });
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error( error.response.data.message);
//         setLoading(false);
//       });
//   };
  

//   function submit(e) {
//     e.preventDefault();
//     setLoading(true); 
//     axios
//       .get(
//         `/apigateway/payroll/timeSheet/empAttendence?fromDate=${date.fromDate}&toDate=${date.toDate}&empId=${empId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         setNewDate(response.data);
//         setGraphData(prepareGraphData(response.data)); 
//         console.log(response.data);
//         toast.success("Data found successfully.", {
//           position: "top-center",
//           theme: "colored",
//         });
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error.response.data);
//         toast.error( error.response.data.message || "Error while fetching details." );
//         setLoading(false);
//       });
//   }

//   function handle(e) {
//     const newdate = { ...date };
//     newdate[e.target.id] = e.target.value;
//     setDate(newdate);
//     console.log(newdate);
//   }
 
//   const prepareGraphData = (data) => {
//       const dates = data.map((entry) => entry.date);
//       const workingHours = data.map((entry) => {
//         if(entry.workingHour){
//           const [hours, minutes, seconds] = entry.workingHour.split(':').map(Number);
//           const totalHours = hours + (minutes / 60) + (seconds / 3600);
//           return parseFloat(totalHours.toFixed(2));
//         }else{
//           return 0;
//         }
//    });    
//       return {
//         labels: dates,
//         datasets: [
//           {
//             label: 'Working Performance',
//             data: workingHours,
//             fill: false,
//             backgroundColor: 'rgba(75,192,192,0.4)',
//             borderColor: 'rgba(75,192,192,1)',
//           },
//         ],
//       };
//     };
//   const todayDate = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format


//   return (
//     <>
//       <div className="container">
//       {loading ? <LoadingPage/> : ''}
//         <div
//           className="row justify-content-center align-items-center"
//           style={{ height: "90vh" }}
//         >
//           <nav
//             aria-label="breadcrumb"
//             style={{ "--bs-breadcrumb-divider": "'>>'" }}
//           >
//             <ol className="breadcrumb" style={{ color: "white" }}>
//               <li className="breadcrumb-item">
//                 <Link to="/">Home</Link>{" "}
//               </li>

//               <li className="breadcrumb-item active" aria-current="page">
//                 TimeSheet
//               </li>
//             </ol>
//           </nav>

//           <div
//             className=" d-grid gap-2 d-md-flex justify-content-center pt-1 "
//             style={{ paddingLeft: "120px" }}
//           >
//             <button
//               disabled={checkindisable}
//               onClick={checkIn}
//               type="button"
//               className="btn btn-outline-dark btn-lg"
//             >
//               CHECK IN
//             </button>
//             <button
//               disabled={checkoutdisable}
//               onClick={checkOut}
//               type="button"
//               className="btn btn-outline-dark btn-lg"
//             >
//               CHECK OUT
//             </button>
//             <button
//               type="button"
//               className="btn btn-outline-dark btn-lg"
//               onClick={handleClick}
//             >
//               {isPaused ? "Play" : "Pause"}
//             </button>
//             <button
//               disabled={earlycheckoutdisable}
//               onClick={handleOpenEarlyPopUp}
//               type="button"
//               className="btn btn-outline-dark btn-lg"
//             >
//               EARLY CHECK OUT
//             </button>
//             <Modal show={showModal} onHide={handleCloseModal}>
//             <Modal.Header closeButton>
//               <Modal.Title>Early Check Out</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//             <Form.Group controlId="earlyType" className="mb-4">
//                 {/* <Form.Label>Type of Early Check Out</Form.Label> */}
//                 {/* <Form.Control
//                   type="text"
//                   placeholder="Enter type for early check out"
//                   value={earlyType}
//                   onChange={(e) => setEarlyType(e.target.value)}
//                 /> */}
//                 {/* <Form.Label>Type of Early Check Out</Form.Label> */}
//       <Form.Select
//         value={earlyType}
//         onChange={(e) => setEarlyType(e.target.value)}
//       >
//         <option value="">Select type for early check out</option>
//         <option value="medical reason">Medical Reason</option>
//         <option value="personal reason">Personal Reason</option>
//         <option value="urgent work">Urgent Work</option>
//         {/* Add more options as needed */}
//       </Form.Select>
//               </Form.Group>
//               <Form.Group controlId="earlyReason">
//                 {/* <Form.Label>Reason for Early Check Out</Form.Label> */}
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter reason for early check out"
//                   value={earlyReason}
//                   onChange={(e) => setEarlyReason(e.target.value)}
//                 />
//               </Form.Group>
//             </Modal.Body>
//             <Modal.Footer className="justify-content-center">
//               <Button variant="primary" onClick={() => 
//               {
//                   handleEarlyCheckOut();  // First, call the API
//                   handleCloseModal();     // Then, close the modal
//               }}>
//              Request
//                </Button>
//             </Modal.Footer>
//             {/* <Modal.Footer>
//               <Button variant="secondary" onClick={handleCloseModal}>
//                 Close
//               </Button>
//               <Button variant="primary" onClick={handleEarlyCheckOut} >
//                 EARLY REQUEST SUBMIT
//               </Button>
//             </Modal.Footer> */}
//           </Modal>
//           </div>
//           <div
//             className=" mb-2 d-grid gap-2 d-md-flex justify-content-center"
//             style={{ paddingLeft: "120px" }}
//           >
//             <Link
//               // to="/Leave"
//               to="/GetEmpLeavesDetails"
//               type="button" 
//               className="btn btn-outline-dark btn-lg my-2" 
//             >
//               LeaveRequest
//             </Link>
//           </div>
//           <div
//             className=" mb-2 d-grid gap-2 d-md-flex justify-content-center"
//             style={{ paddingLeft: "120px" }}
//           >
//             {/* <Link
//                 to="/PriorTimeAdj"
//                 type="button"
//                 className="btn btn-outline-dark btn-lg my-2"
//               >
//                 Prior Time Request
//               </Link> */}
//             <Link
//               to={{
//                 pathname: "/PriorTimeAdj",
//                 state: { latitude: latitude, longitude: longitude },
//               }}
//               type="button"
//               className="btn btn-outline-dark btn-lg my-2"
//             >
//               Prior Time Request
//             </Link>
//           </div>
//           <div className=" col-lg-10 container pt-2">
//             <form
//               onSubmit={(e) => {
//                 submit(e);
//               }}
//             >
//               <div
//                 className=" mb-2 d-grid gap-1 d-md-flex justify-content-center "
//                 style={{ width: "600px" }}
//               >
//                 <label className="pt-2 fs-5" htmlFor="fromdate">
//                   FromDate:
//                 </label>
//                 <input
//                   onChange={(e) => {
//                     handle(e);
//                   }}
//                   value={date.fromDate}
//                   type="date"
//                   className="form-control"
//                   id="fromDate"
//                   max={todayDate}
//                 />
//                 <label className="pt-2 fs-5" htmlFor="todate">
//                   ToDate:
//                 </label>
//                 <input
//                   onChange={(e) => {
//                     handle(e);
//                   }}
//                   value={date.toDate}
//                   type="date"
//                   className="form-control"
//                   id="toDate"
//                   max={todayDate}
//                 />
//                 <button
//                   className=" btn btn-primary m-0"
//                   style={{ height: "45px" }}
//                 >
//                   Get
//                 </button>
//               </div>
//             </form>
//           </div>

//           <div
//             className="table-responsive-sm "
//             style={{ paddingLeft: "140px", paddingRight: "60px" }}
//           >
//             <table border="2" className="table table-striped table-bordered">
//               <thead className="head">
//                 <tr className="table-danger table-striped">
//                   <th>EMPLOYEE ID</th>
//                   <th>CHECKIN</th>
//                   <th>CHECKOUT</th>
//                   <th>WORKING HOUR</th>
//                   <th>DATE</th>
//                   <th>DAY</th>
//                   <th>STATUS</th>
//                   {/* <th>LEAVE INTERVAL</th> */}
//                 </tr>
//               </thead>
//               <tbody className="body">
//                 {getDate.map((date) => (
//                   // display a <div> element with the dates.checkout and dates.checkin
//                   // parent element needs to have a unique key
//                   <tr key={date.employeeId}>
//                     <td>{date.employeeId}</td>
//                     <td>{date.checkIn}</td>
//                     <td>{date.checkOut}</td>
//                     <td>{date.workingHour}</td>
//                     <td>{date.date}</td>
//                     <td>{date.day}</td>
//                     <td>{date.status}</td>
//                     {/* <td>{date.leaveInterval}</td> */}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//         {graphData && (
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-lg-10">
//               <div className="card">
//                 <div className="card-body">
//                   <h5 className="card-title">Graphical Representation (Hour/Date)</h5>
//                   <Line data={graphData} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default TimeSheet;


// import React, { useState, useEffect } from "react";
// import { useSelector } from 'react-redux';
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Line } from 'react-chartjs-2';
// import {
//   Box,
//   Button,
//   Container,
//   Grid,
//   TextField,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Modal,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Breadcrumbs,
// } from '@mui/material';
// import LoadingPage from './LoadingPage';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const TimeSheet = () => {
//   const [checkindisable, setcheckinDisable] = useState(false);
//   const [checkoutdisable, setcheckoutDisable] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const [earlycheckoutdisable, setearlycheckoutDisable] = useState(false);
//   const [getDate, setNewDate] = useState([]);
//   const [latitude, setLatitude] = useState("");
//   const [longitude, setLongitude] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [graphData, setGraphData] = useState(null);
//   const [earlyReason, setEarlyReason] = useState("");
//   const [earlyType, setEarlyType] = useState("");
//   const [showModal, setShowModal] = useState(false); 

//   const  token = useSelector((state) => state.auth.token);
//   const  empId = useSelector((state) => state.auth.empId);

//   const [date, setDate] = useState({
//     fromDate: "",
//     toDate: "",
//   });
//   //HRMS-94
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       setLatitude(position.coords.latitude);
//       setLongitude(position.coords.longitude);
//     });
//   }, []);

//   const handleOpenEarlyPopUp = () => setShowModal(true); 
//   const handleCloseModal = () => setShowModal(false); 

//   const handleEarlyCheckOut = () => {
//     setLoading(true);
//     axios
//       .put(
//         `/apigateway/payroll/timeSheet/earlyCheckOut/${empId}?Latitude=${latitude}&Longitude=${longitude}&reason=${earlyReason}&type=${earlyType}`,
//         { reason: earlyReason, type: earlyType },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         toast.success(response.data, {
//           position: "top-center",
//           theme: "colored",
//         });
//         setearlycheckoutDisable(true);
//         setLoading(false);
//         handleCloseModal(); // Close the modal upon successful submission
//       })
//       .catch((error) => {
//         toast.error(error.response.data.message || "Error during early checkout");
//         console.log(error);
//         setLoading(false);
//       });
//   };


//   const checkIn = (e) => {
//     e.preventDefault();
//     setLoading(true); 
//     axios.post(
//         `/apigateway/payroll/timeSheet/checkIn/${empId}?Latitude=${latitude}&Longitude=${longitude}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response.data);
//         toast.success(response.data, {
//           position: "top-center",
//           theme: "colored",
//         });
//         setcheckinDisable(true);
//         setLoading(false);
//       })
//       .catch((error) => {
//         toast.error( error.response.data.message || "Error while checkin" );
//         // alert(latitude,longitude)
//         console.log(error);
//         setLoading(false);
//       });
//   };

//   const checkOut = (e) => { 
//     e.preventDefault();
//     setLoading(true); 
//     axios
//       .put(
//         `/apigateway/payroll/timeSheet/checkOut/${empId}?Latitude=${latitude}&Longitude=${longitude}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response.data);
//         toast.success(response.data, {
//           position: "top-center",
//           theme: "colored",
//         });
//         setcheckoutDisable(true);
//         setLoading(false);
//       })
//       .catch((error) => {
//         toast.error( error.response.data.message || "Error while checkout" );
//         console.log(error);
//         setLoading(false);
//       });
//   };

//   const handleClick = () => {
//     setLoading(true); 
//     const apiUrl = isPaused
//       ? `/apigateway/payroll/timeSheet/resume/${empId}`
//       : `/apigateway/payroll/timeSheet/pause/${empId}`;
//     const method = isPaused ? "patch" : "put";
//     axios
//       .request({
//         method: method,
//         url: apiUrl,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setIsPaused(!isPaused);
//         toast.success(response.data, {
//           position: "top-center",
//           theme: "colored",
//         });
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error( error.response.data.message);
//         setLoading(false);
//       });
//   };
  

//   function submit(e) {
//     e.preventDefault();
//     setLoading(true); 
//     axios
//       .get(
//         `/apigateway/payroll/timeSheet/empAttendence?fromDate=${date.fromDate}&toDate=${date.toDate}&empId=${empId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         setNewDate(response.data);
//         setGraphData(prepareGraphData(response.data)); 
//         console.log(response.data);
//         toast.success("Data found successfully.", {
//           position: "top-center",
//           theme: "colored",
//         });
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error.response.data);
//         toast.error( error.response.data.message || "Error while fetching details." );
//         setLoading(false);
//       });
//   }

//   function handle(e) {
//     const newDate = { ...date };
//     const selectedDate = new Date(e.target.value);
//     const today = new Date();
    
//     if (selectedDate <= today) {
//       newDate[e.target.id] = e.target.value;
//       setDate(newDate);
//     } else {
//       toast.error("Cannot select a future date");
//     }
//   }
 
//   const prepareGraphData = (data) => {
//       const dates = data.map((entry) => entry.date);
//       const workingHours = data.map((entry) => {
//         if(entry.workingHour){
//           const [hours, minutes, seconds] = entry.workingHour.split(':').map(Number);
//           const totalHours = hours + (minutes / 60) + (seconds / 3600);
//           return parseFloat(totalHours.toFixed(2));
//         }else{
//           return 0;
//         }
//    });    
//       return {
//         labels: dates,
//         datasets: [
//           {
//             label: 'Working Performance',
//             data: workingHours,
//             fill: false,
//             backgroundColor: 'rgba(75,192,192,0.4)',
//             borderColor: 'rgba(75,192,192,1)',
//           },
//         ],
//       };
//     };
//     const formatDate = (date) => {
//       return date.toISOString().split('T')[0];
//     };
  
//     const todayDate = formatDate(new Date());

//   return (
//     <Container maxWidth="lg">
//       {loading && <LoadingPage />}
//       <Box sx={{ my: 4 }}>
//         <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
//           <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
//             Home
//           </Link>
//           <Typography color="text.primary">TimeSheet</Typography>
//         </Breadcrumbs>

//         <Typography variant="h4" component="h1" gutterBottom>
//           TimeSheet
//         </Typography>

//         <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
//           <Grid item>
//             <Button
//               variant="outlined"
//               disabled={checkindisable}
//               onClick={checkIn}
//             >
//               CHECK IN
//             </Button>
//           </Grid>
//           <Grid item>
//             <Button
//               variant="outlined"
//               disabled={checkoutdisable}
//               onClick={checkOut}
//             >
//               CHECK OUT
//             </Button>
//           </Grid>
//           <Grid item>
//             <Button
//               variant="outlined"
//               onClick={handleClick}
//             >
//               {isPaused ? "Play" : "Pause"}
//             </Button>
//           </Grid>
//           <Grid item>
//             <Button
//               variant="outlined"
//               disabled={earlycheckoutdisable}
//               onClick={handleOpenEarlyPopUp}
//             >
//               EARLY CHECK OUT
//             </Button>
//           </Grid>
//         </Grid>

//         <Grid container justifyContent="center" spacing={2} sx={{ mb: 4 }}>
//           <Grid item>
//             <Button
//               component={Link}
//               to="/GetEmpLeavesDetails"
//               variant="outlined"
//             >
//               LeaveRequest
//             </Button>
//           </Grid>
//           <Grid item>
//             <Button
//               component={Link}
//               to={{
//                 pathname: "/PriorTimeAdj",
//                 state: { latitude: latitude, longitude: longitude },
//               }}
//               variant="outlined"
//             >
//               Prior Time Request
//             </Button>
//           </Grid>
//         </Grid>

//         <Box component="form" onSubmit={submit} sx={{ mb: 4 }}>
//           <Grid container spacing={2} alignItems="center" justifyContent="center">
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 id="fromDate"
//                 label="From Date"
//                 type="date"
//                 value={date.fromDate}
//                 onChange={handle}
//                 InputLabelProps={{ shrink: true }}
//                 inputProps={{
//                   max: todayDate,
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 fullWidth
//                 id="toDate"
//                 label="To Date"
//                 type="date"
//                 value={date.toDate}
//                 onChange={handle}
//                 InputLabelProps={{ shrink: true }}
//                 inputProps={{
//                   max: todayDate,
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={2}>
//               <Button type="submit" variant="contained" fullWidth>Get</Button>
//             </Grid>
//           </Grid>
//         </Box>

//         <TableContainer component={Paper} sx={{ mb: 4 }}>
//           <Table sx={{ minWidth: 650 }} aria-label="timesheet table">
//             <TableHead>
//               <TableRow>
//                 <TableCell>EMPLOYEE ID</TableCell>
//                 <TableCell>CHECKIN</TableCell>
//                 <TableCell>CHECKOUT</TableCell>
//                 <TableCell>WORKING HOUR</TableCell>
//                 <TableCell>DATE</TableCell>
//                 <TableCell>DAY</TableCell>
//                 <TableCell>STATUS</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {getDate.map((date) => (
//                 <TableRow key={date.employeeId}>
//                   <TableCell>{date.employeeId}</TableCell>
//                   <TableCell>{date.checkIn}</TableCell>
//                   <TableCell>{date.checkOut}</TableCell>
//                   <TableCell>{date.workingHour}</TableCell>
//                   <TableCell>{date.date}</TableCell>
//                   <TableCell>{date.day}</TableCell>
//                   <TableCell>{date.status}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {graphData && (
//           <Box sx={{ mt: 4 }}>
//             <Typography variant="h6" gutterBottom>
//               Graphical Representation (Hour/Date)
//             </Typography>
//             <Paper elevation={3} sx={{ p: 2 }}>
//               <Line data={graphData} />
//             </Paper>
//           </Box>
//         )}

//         <Modal
//           open={showModal}
//           onClose={handleCloseModal}
//           aria-labelledby="early-checkout-modal"
//         >
//           <Box sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 400,
//             bgcolor: 'background.paper',
//             boxShadow: 24,
//             p: 4,
//           }}>
//             <Typography id="early-checkout-modal" variant="h6" component="h2" gutterBottom>
//               Early Check Out
//             </Typography>
//             <FormControl fullWidth sx={{ mb: 2 }}>
//               <InputLabel id="early-type-label">Type of Early Check Out</InputLabel>
//               <Select
//                 labelId="early-type-label"
//                 value={earlyType}
//                 label="Type of Early Check Out"
//                 onChange={(e) => setEarlyType(e.target.value)}
//               >
//                 <MenuItem value="">
//                   <em>Select type for early check out</em>
//                 </MenuItem>
//                 <MenuItem value="medical reason">Medical Reason</MenuItem>
//                 <MenuItem value="personal reason">Personal Reason</MenuItem>
//                 <MenuItem value="urgent work">Urgent Work</MenuItem>
//               </Select>
//             </FormControl>
//             <TextField
//               fullWidth
//               sx={{ mb: 2 }}
//               label="Reason for Early Check Out"
//               value={earlyReason}
//               onChange={(e) => setEarlyReason(e.target.value)}
//             />
//             <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//               <Button 
//                 onClick={() => {
//                   handleEarlyCheckOut();
//                   handleCloseModal();
//                 }} 
//                 variant="contained"
//               >
//                 Request
//               </Button>
//             </Box>
//           </Box>
//         </Modal>
//       </Box>
//     </Container>
//   );
// };

// export default TimeSheet;

import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Line } from 'react-chartjs-2';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Breadcrumbs,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import LoadingPage from './LoadingPage';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TimeSheet = () => {
  const [checkindisable, setcheckinDisable] = useState(false);
  const [checkoutdisable, setcheckoutDisable] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [earlycheckoutdisable, setearlycheckoutDisable] = useState(false);
  const [getDate, setNewDate] = useState([]);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(false);
  const [graphData, setGraphData] = useState(null);
  const [earlyReason, setEarlyReason] = useState("");
  const [earlyType, setEarlyType] = useState("");
  const [showModal, setShowModal] = useState(false); // For managing modal visibility


  // const token = localStorage.getItem("response-token");
  // const empId = localStorage.getItem("EmpID");
  const  token = useSelector((state) => state.auth.token);
  const  empId = useSelector((state) => state.auth.empId);

  const [date, setDate] = useState({
    fromDate: "",
    toDate: "",
  });
  //HRMS-94
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
     // console.log(position);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  const handleOpenEarlyPopUp = () => setShowModal(true); // Function to show the modal
  const handleCloseModal = () => setShowModal(false); // Function to close the modal

  const handleEarlyCheckOut = () => {
    setLoading(true);
    axios
      .put(
        `/apigateway/payroll/timeSheet/earlyCheckOut/${empId}?Latitude=${latitude}&Longitude=${longitude}&reason=${earlyReason}&type=${earlyType}`,
        { reason: earlyReason, type: earlyType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        toast.success(response.data, {
          position: "top-center",
          theme: "colored",
        });
        setearlycheckoutDisable(true);
        setLoading(false);
        handleCloseModal(); // Close the modal upon successful submission
      })
      .catch((error) => {
        toast.error(error.response.data.message || "Error during early checkout");
        console.log(error);
        setLoading(false);
      });
  };


  const checkIn = (e) => {
    e.preventDefault();
    setLoading(true); 
    axios.post(
        `/apigateway/payroll/timeSheet/checkIn/${empId}?Latitude=${latitude}&Longitude=${longitude}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        toast.success(response.data, {
          position: "top-center",
          theme: "colored",
        });
        setcheckinDisable(true);
        setLoading(false);
      })
      .catch((error) => {
        toast.error( error.response.data.message || "Error while checkin" );
        // alert(latitude,longitude)
        console.log(error);
        setLoading(false);
      });
  };

  const checkOut = (e) => { 
    e.preventDefault();
    setLoading(true); 
    axios
      .put(
        `/apigateway/payroll/timeSheet/checkOut/${empId}?Latitude=${latitude}&Longitude=${longitude}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        toast.success(response.data, {
          position: "top-center",
          theme: "colored",
        });
        setcheckoutDisable(true);
        setLoading(false);
      })
      .catch((error) => {
        toast.error( error.response.data.message || "Error while checkout" );
        console.log(error);
        setLoading(false);
      });
  };

  const handleClick = () => {
    setLoading(true); 
    const apiUrl = isPaused
      ? `/apigateway/payroll/timeSheet/resume/${empId}`
      : `/apigateway/payroll/timeSheet/pause/${empId}`;
    const method = isPaused ? "patch" : "put";
    axios
      .request({
        method: method,
        url: apiUrl,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setIsPaused(!isPaused);
        toast.success(response.data, {
          position: "top-center",
          theme: "colored",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error( error.response.data.message);
        setLoading(false);
      });
  };
  

  function submit(e) {
    e.preventDefault();
    setLoading(true); 
    axios
      .get(
        `/apigateway/payroll/timeSheet/empAttendence?fromDate=${date.fromDate}&toDate=${date.toDate}&empId=${empId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setNewDate(response.data);
        setGraphData(prepareGraphData(response.data)); 
        console.log(response.data);
        toast.success("Data found successfully.", {
          position: "top-center",
          theme: "colored",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error( error.response.data.message || "Error while fetching details." );
        setLoading(false);
      });
  }

  function handle(e) {
    const newdate = { ...date };
    newdate[e.target.id] = e.target.value;
    setDate(newdate);
    console.log(newdate);
  }
 
  const prepareGraphData = (data) => {
      const dates = data.map((entry) => entry.date);
      const workingHours = data.map((entry) => {
        if(entry.workingHour){
          const [hours, minutes, seconds] = entry.workingHour.split(':').map(Number);
          const totalHours = hours + (minutes / 60) + (seconds / 3600);
          return parseFloat(totalHours.toFixed(2));
        }else{
          return 0;
        }
   });    
      return {
        labels: dates,
        datasets: [
          {
            label: 'Working Performance',
            data: workingHours,
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
          },
        ],
      };
    };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const todayDate = formatDate(new Date());

  return (
    <Container maxWidth="lg">
      {loading && <LoadingPage />}
      <Box sx={{ my: { xs: 2, sm: 3, md: 4 } }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2, fontSize: { xs: '0.8rem', sm: '1rem' } }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Home
          </Link>
          <Typography color="text.primary" sx={{ fontSize: 'inherit' }}>TimeSheet</Typography>
        </Breadcrumbs>

        <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
          {['CHECK IN', 'CHECK OUT', isPaused ? "Play" : "Pause", 'EARLY CHECK OUT'].map((label, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Button
             
                variant="outlined"
                fullWidth
                disabled={
                  (label === 'CHECK IN' && checkindisable) ||
                  (label === 'CHECK OUT' && checkoutdisable) ||
                  (label === 'EARLY CHECK OUT' && earlycheckoutdisable)
                }
                onClick={
                  label === 'CHECK IN' ? checkIn :
                  label === 'CHECK OUT' ? checkOut :
                  label === 'EARLY CHECK OUT' ? handleOpenEarlyPopUp :
                  handleClick
                }
              >
                {label}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Grid container justifyContent="center" spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              component={Link}
              to="/GetEmpLeavesDetails"
              variant="outlined"
              fullWidth
            >
              LeaveRequest
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              component={Link}
              to={{
                pathname: "/PriorTimeAdj",
                state: { latitude: latitude, longitude: longitude },
              }}
              variant="outlined"
              fullWidth
            >
              Prior Time Request
            </Button>
          </Grid>
        </Grid>

        <Box component="form" onSubmit={submit} sx={{ mb: 4 }}>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="fromDate"
                label="From Date"
                type="date"
                value={date.fromDate}
                onChange={handle}
                InputLabelProps={{ shrink: true }}
                inputProps={{ max: todayDate }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="toDate"
                label="To Date"
                type="date"
                value={date.toDate}
                onChange={handle}
                InputLabelProps={{ shrink: true }}
                inputProps={{ max: todayDate }}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button type="submit" variant="contained" fullWidth>Get</Button>
            </Grid>
          </Grid>
        </Box>
        <TableContainer component={Paper} sx={{ mb: 4, overflowX: 'auto' }}>
          <Table sx={{ minWidth: isMobile ? 300 : 650 }} aria-label="timesheet table">
            <TableHead>
              <TableRow>
                {['EMPLOYEE ID','DATE', 'STATUS', 'WORKING HOUR','CHECKIN', 'CHECKOUT', 'LEAVEINTERVAL','DAY'].map((header, index) => (
                  <TableCell key={index} sx={{ whiteSpace: 'nowrap', fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {getDate.map((date) => (
                <TableRow key={date.employeeId}>
                  {Object.values(date).map((value, index) => (
                    <TableCell key={index} sx={{ whiteSpace: 'nowrap', fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>
                      {value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {graphData && (
          <Box sx={{ mt: 4 }}>
            <Typography variant={isMobile ? "h6" : "h5"} gutterBottom>
              Graphical Representation (Hour/Date)
            </Typography>
            <Paper elevation={3} sx={{ p: { xs: 1, sm: 2 } }}>
              <Line data={graphData} options={{ responsive: true, maintainAspectRatio: false, aspectRatio: isMobile ? 1 : 2 }} />
            </Paper>
          </Box>
        )}

        <Modal
          open={showModal}
          onClose={handleCloseModal}
          aria-labelledby="early-checkout-modal"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 400 },
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: { xs: 2, sm: 4 },
          }}>
            <Typography id="early-checkout-modal" variant="h6" component="h2" gutterBottom>
              Early Check Out
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="early-type-label">Type of Early Check Out</InputLabel>
              <Select
                labelId="early-type-label"
                value={earlyType}
                label="Type of Early Check Out"
                onChange={(e) => setEarlyType(e.target.value)}
              >
                <MenuItem value=""><em>Select type for early check out</em></MenuItem>
                <MenuItem value="medical reason">Medical Reason</MenuItem>
                <MenuItem value="personal reason">Personal Reason</MenuItem>
                <MenuItem value="urgent work">Urgent Work</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              sx={{ mb: 2 }}
              label="Reason for Early Check Out"
              value={earlyReason}
              onChange={(e) => setEarlyReason(e.target.value)}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button 
                onClick={() => {
                  handleEarlyCheckOut();
                  handleCloseModal();
                }} 
                variant="contained"
              >
                Request
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Container>
  );
};

export default TimeSheet;



