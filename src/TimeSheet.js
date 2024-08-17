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
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingPage from './LoadingPage'
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { Modal, Button, Form } from "react-bootstrap";  // Add these imports for the Modal
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
  const todayDate = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format


  return (
    <>
      <div className="container">
      {loading ? <LoadingPage/> : ''}
        <div
          className="row justify-content-center align-items-center"
          style={{ height: "90vh" }}
        >
          <nav
            aria-label="breadcrumb"
            style={{ "--bs-breadcrumb-divider": "'>>'" }}
          >
            <ol className="breadcrumb" style={{ color: "white" }}>
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>{" "}
              </li>

              <li className="breadcrumb-item active" aria-current="page">
                TimeSheet
              </li>
            </ol>
          </nav>

          <div
            className=" d-grid gap-2 d-md-flex justify-content-center pt-1 "
            style={{ paddingLeft: "120px" }}
          >
            <button
              disabled={checkindisable}
              onClick={checkIn}
              type="button"
              className="btn btn-outline-dark btn-lg"
            >
              CHECK IN
            </button>
            <button
              disabled={checkoutdisable}
              onClick={checkOut}
              type="button"
              className="btn btn-outline-dark btn-lg"
            >
              CHECK OUT
            </button>
            <button
              type="button"
              className="btn btn-outline-dark btn-lg"
              onClick={handleClick}
            >
              {isPaused ? "Play" : "Pause"}
            </button>
            <button
              disabled={earlycheckoutdisable}
              onClick={handleOpenEarlyPopUp}
              type="button"
              className="btn btn-outline-dark btn-lg"
            >
              EARLY CHECK OUT
            </button>
            <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Early Check Out</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Group controlId="earlyType" className="mb-4">
                {/* <Form.Label>Type of Early Check Out</Form.Label> */}
                {/* <Form.Control
                  type="text"
                  placeholder="Enter type for early check out"
                  value={earlyType}
                  onChange={(e) => setEarlyType(e.target.value)}
                /> */}
                {/* <Form.Label>Type of Early Check Out</Form.Label> */}
      <Form.Select
        value={earlyType}
        onChange={(e) => setEarlyType(e.target.value)}
      >
        <option value="">Select type for early check out</option>
        <option value="medical reason">Medical Reason</option>
        <option value="personal reason">Personal Reason</option>
        <option value="urgent work">Urgent Work</option>
        {/* Add more options as needed */}
      </Form.Select>
              </Form.Group>
              <Form.Group controlId="earlyReason">
                {/* <Form.Label>Reason for Early Check Out</Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="Enter reason for early check out"
                  value={earlyReason}
                  onChange={(e) => setEarlyReason(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <Button variant="primary" onClick={() => 
              {
                  handleEarlyCheckOut();  // First, call the API
                  handleCloseModal();     // Then, close the modal
              }}>
             Request
               </Button>
            </Modal.Footer>
            {/* <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleEarlyCheckOut} >
                EARLY REQUEST SUBMIT
              </Button>
            </Modal.Footer> */}
          </Modal>
          </div>
          <div
            className=" mb-2 d-grid gap-2 d-md-flex justify-content-center"
            style={{ paddingLeft: "120px" }}
          >
            <Link
              // to="/Leave"
              to="/GetEmpLeavesDetails"
              type="button" 
              className="btn btn-outline-dark btn-lg my-2" 
            >
              LeaveRequest
            </Link>
          </div>
          <div
            className=" mb-2 d-grid gap-2 d-md-flex justify-content-center"
            style={{ paddingLeft: "120px" }}
          >
            {/* <Link
                to="/PriorTimeAdj"
                type="button"
                className="btn btn-outline-dark btn-lg my-2"
              >
                Prior Time Request
              </Link> */}
            <Link
              to={{
                pathname: "/PriorTimeAdj",
                state: { latitude: latitude, longitude: longitude },
              }}
              type="button"
              className="btn btn-outline-dark btn-lg my-2"
            >
              Prior Time Request
            </Link>
          </div>
          <div className=" col-lg-10 container pt-2">
            <form
              onSubmit={(e) => {
                submit(e);
              }}
            >
              <div
                className=" mb-2 d-grid gap-1 d-md-flex justify-content-center "
                style={{ width: "600px" }}
              >
                <label className="pt-2 fs-5" htmlFor="fromdate">
                  FromDate:
                </label>
                <input
                  onChange={(e) => {
                    handle(e);
                  }}
                  value={date.fromDate}
                  type="date"
                  className="form-control"
                  id="fromDate"
                  max={todayDate}
                />
                <label className="pt-2 fs-5" htmlFor="todate">
                  ToDate:
                </label>
                <input
                  onChange={(e) => {
                    handle(e);
                  }}
                  value={date.toDate}
                  type="date"
                  className="form-control"
                  id="toDate"
                  max={todayDate}
                />
                <button
                  className=" btn btn-primary m-0"
                  style={{ height: "45px" }}
                >
                  Get
                </button>
              </div>
            </form>
          </div>

          <div
            className="table-responsive-sm "
            style={{ paddingLeft: "140px", paddingRight: "60px" }}
          >
            <table border="2" className="table table-striped table-bordered">
              <thead className="head">
                <tr className="table-danger table-striped">
                  <th>EMPLOYEE ID</th>
                  <th>CHECKIN</th>
                  <th>CHECKOUT</th>
                  <th>WORKING HOUR</th>
                  <th>DATE</th>
                  <th>STATUS</th>
                  <th>LEAVE INTERVAL</th>
                </tr>
              </thead>
              <tbody className="body">
                {getDate.map((date) => (
                  // display a <div> element with the dates.checkout and dates.checkin
                  // parent element needs to have a unique key
                  <tr key={date.employeeId}>
                    <td>{date.employeeId}</td>
                    <td>{date.checkIn}</td>
                    <td>{date.checkOut}</td>
                    <td>{date.workingHour}</td>
                    <td>{date.date}</td>
                    <td>{date.status}</td>
                    <td>{date.leaveInterval}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        {graphData && (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Graphical Representation (Hour/Date)</h5>
                  <Line data={graphData} />
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
          </div>
        </div>
      </div>
    </>
  );
};
export default TimeSheet;

