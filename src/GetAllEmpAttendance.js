// import axios from 'axios';
// import React, { useState, useEffect, useMemo } from "react";
// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';
// import LoadingPage from './LoadingPage';
// import { useSelector } from 'react-redux';
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

// const GetAllEmpAttendance = () => {
//   // const token = localStorage.getItem('response-token');
//   // const empid = localStorage.getItem('EmpID');
//   const  token = useSelector((state) => state.auth.token);
//   const  empid = useSelector((state) => state.auth.empId);

//   const [getAttendence, setAttendence] = useState({
//     fromDate: '',
//     toDate: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [getData, setData] = useState([]);
//   const [columnFilters, setColumnFilters] = useState([]);

//   const submit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     axios
//       .get(`/apigateway/payroll/timeSheet/allEmpAttendence?fromDate=${getAttendence.fromDate}&toDate=${getAttendence.toDate}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       })
//       .then(response => {
//         setData(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         toast.error( error.response.data.message || "Error fetching details" );
//         console.error("Error happened:", error);
//         setLoading(false);
//       });
//   };

//   const handle = (e) => {
//     const newDate = { ...getAttendence };
//     newDate[e.target.id] = e.target.value;
//     setAttendence(newDate);
//     console.log(newDate);
//   };

//   const exportToExcel = () => {
//     setLoading(true);
//     axios({
//       url: `/apigateway/payroll/timeSheet/exporttoexcel?fromDate=${getAttendence.fromDate}&toDate=${getAttendence.toDate}`,
//       method: 'GET',
//       responseType: 'blob',
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }).then(response => {
//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', 'timesheet.xlsx');
//         document.body.appendChild(link);
//         link.click();
//         setLoading(false);
//       })
//       .catch(error => {
//         toast.error( error.response.data.message || "Error uploading excel." );
//         console.error("Error happened:", error);
//         setLoading(false);
//       });
//   };

//   const [screenWidth, setScreenWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => {
//       setScreenWidth(window.innerWidth);
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

// //   {
// //     "timeSheetId": 299,
// //     "employeeId": 19,
// //     "checkOut": "23:15:00",
// //     "checkIn": "23:13:00",
// //     "workingHour": "00:01:53",
// //     "date": "30-05-2024",
// //     "status": "Present",
// //     "month": "MAY",
// //     "year": "2024",
// //     "leaveInterval": "0:0:7",
// //     "intervalStatus": false,
// //     "checkInLatitude": "22.7352914",
// //     "checkInLongitude": "75.8132079",
// //     "checkInDistance": "5668.905420828274",
// //     "checkOutLatitude": "22.7352914",
// //     "checkOutLongitude": "75.8132079",
// //     "checkOutDistance": "5668.905420828274",
// //     "employeeName": "Ajay Mishra"
// // },

//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: "Employee Name",
//         header: "employeeName",
//         meta: { filterVariant: "select" },
//       },
//       {
//         accessorKey: "Check Out",
//         header: "checkOut",
//         meta: { filterVariant: "select" },
//       },
//       {
//         accessorKey: "Check In",
//         header: "checkIn",
//         meta: { filterVariant: "select" },
//       },
//       {
//         accessorKey: "Working Hour",
//         header: "workingHour",
//         meta: { filterVariant: "select" },
//       },
//       {
//         accessorKey: "Date",
//         header: "date",
//         meta: { filterVariant: "select" },
//       },
//       {
//         accessorKey: "Status",
//         header: "status",
//         meta: { filterVariant: "select" },
//       },
//       {
//         accessorKey: "Month",
//         header: "month",
//         meta: { filterVariant: "select" },
//       },
//       {
//         accessorKey: "Year",
//         header: "year",
//         meta: { filterVariant: "select" },
//       },
//       {
//         accessorKey: "Leave Interval",
//         header: "leaveInterval",
//         meta: { filterVariant: "select" },
//       },
//       {
//         accessorKey: "Interval Status",
//         header: "intervalStatus",
//         meta: { filterVariant: "select" },
//       },
//     ],
//     []
//   );
//   const table = useReactTable({
//     data: getData,
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

//   return (
//     <div>
//       <div className='mt-3'>
//         <nav aria-label='breadcrumb' style={{ '--bs-breadcrumb-divider': "'>>'" }}>
//           <ol className='breadcrumb' style={{ color: 'white', marginLeft: '20px' }}>
//             <li className='breadcrumb-item'>
//               <Link to='/'>Home</Link>{' '}
//             </li>
//             <li className='breadcrumb-item'>
//               <a href=''>Employee Management</a>
//             </li>
//             <li className='breadcrumb-item active' aria-current='page'>
//               Employee Attendance
//             </li>
//           </ol>
//         </nav>
//       </div>
//       <div className='d-flex justify-content-center  ' style={{ width: screenWidth - 50 }}>
//         <div>
//           <div className='pt-2'>
//             <h1 className='Heading1 my-4'>Employee Attendance</h1>
//             <form onSubmit={(e) => { submit(e) }} >
//               {loading ? <LoadingPage /> : ''}
//               <div className='mb-2 d-grid gap-1 d-md-flex justify-content-center my-4'>
//                 <label className='pt-2 fs-5 mb-0' htmlFor='fromdate'>fromDate:</label>
//                 <input onChange={(e) => { handle(e) }} value={getAttendence.fromDate}
//                   type='date' className='form-control mb-0'
//                   id='fromDate' />
//                 <label className='pt-2 fs-5 mb-0' htmlFor='todate'>toDate:</label>
//                 <input onChange={(e) => { handle(e) }} value={getAttendence.toDate}
//                   type='date' className='form-control mb-0'
//                   id='toDate' />
//                 <button className='btn btn-outline-primary mt-0 '>Get</button>
//               </div>
//             </form>
//             <button onClick={exportToExcel} className='btn btn-primary mt-0'>Export to Excel</button>
//           </div>
//           <div className='table-responsive-sm my-4'>
//         <Table striped bordered hover className="custom-table">
//             <thead className="table-danger table-striped">
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <tr key={headerGroup.id}>
//                   {headerGroup.headers.map((header) => (
//                     <th key={header.id} colSpan={header.colSpan}>
//                       {header.isPlaceholder ? null : (
//                         <>
//                           <div
//                             className={
//                               header.column.getCanSort()
//                                 ? "cursor-pointer select-none"
//                                 : ""
//                             }
//                             onClick={header.column.getToggleSortingHandler()}
//                           >
//                             {flexRender(
//                               header.column.columnDef.header,
//                               header.getContext()
//                             )}
//                             {header.column.getIsSorted() === "asc"
//                               ? " 🔼"
//                               : header.column.getIsSorted() === "desc"
//                               ? " 🔽"
//                               : null}
//                           </div>
//                           {header.column.getCanFilter() ? (
//                             <div>
//                               <Filter column={header.column} />
//                             </div>
//                           ) : null}
//                         </>
//                       )}
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody className="body">
//               {table.getRowModel().rows.map((row) => (
//                 <tr key={row.id}>
//                   {row.getVisibleCells().map((cell) => (
//                     <td key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//             </Table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
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
//         }
        
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
//             column.setFilterValue((old) => [e.target?.value, old?.[1]])
//         }
        
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
// export default GetAllEmpAttendance;


// import axios from 'axios';
// import React, { useState, useEffect, useMemo } from "react";
// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';
// import LoadingPage from './LoadingPage';
// import { useSelector } from 'react-redux';
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

// const GetAllEmpAttendance = () => {
//   const token = useSelector((state) => state.auth.token);
//   const empid = useSelector((state) => state.auth.empId);

//   const [getAttendence, setAttendence] = useState({
//     fromDate: '',
//     toDate: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [getData, setData] = useState([]);
//   const [columnFilters, setColumnFilters] = useState([]);

//   const submit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     axios
//       .get(`/apigateway/payroll/timeSheet/allEmpAttendence?fromDate=${getAttendence.fromDate}&toDate=${getAttendence.toDate}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       })
//       .then(response => {
//         console.log("API Response Data:", response.data); // Log response data
//         setData(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         toast.error(error.response?.data?.message || "Error fetching details");
//         console.error("Error happened:", error);
//         setLoading(false);
//       });
//   };

//   const handle = (e) => {
//     const newDate = { ...getAttendence };
//     newDate[e.target.id] = e.target.value;
//     setAttendence(newDate);
//     console.log(newDate);
//   };

//   const exportToExcel = () => {
//     setLoading(true);
//     axios({
//       url: `/apigateway/payroll/timeSheet/exporttoexcel?fromDate=${getAttendence.fromDate}&toDate=${getAttendence.toDate}`,
//       method: 'GET',
//       responseType: 'blob',
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }).then(response => {
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'timesheet.xlsx');
//       document.body.appendChild(link);
//       link.click();
//       setLoading(false);
//     })
//       .catch(error => {
//         toast.error(error.response?.data?.message || "Error uploading excel.");
//         console.error("Error happened:", error);
//         setLoading(false);
//       });
//   };

//   const [screenWidth, setScreenWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => {
//       setScreenWidth(window.innerWidth);
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: "employeeName",
//         header: "Employee Name",
//         meta: { filterVariant: "select" },
//       },
//       {
//         accessorKey: "checkOut",
//         header: "Check Out",
//         meta: { filterVariant: "select" },
//       },
//       {
//         accessorKey: "checkIn",
//         header: "Check In",
//         meta: { filterVariant: "select" },
//       },
//       {
//         accessorKey: "workingHour",
//         header: "Working Hour",
//         meta: { filterVariant: "select" },
//       },
//       {
//         accessorKey: "date",
//         header: "Date",
//         meta: { filterVariant: "select" },
//       },
//       {
//         accessorKey: "status",
//         header: "Status",
//         meta: { filterVariant: "select" },
//       },
//       {
//         accessorKey: "month",
//         header: "Month",
//         meta: { filterVariant: "select" },
//       },
//       {
//         accessorKey: "year",
//         header: "Year",
//         meta: { filterVariant: "select" },
//       },
//       {
//         accessorKey: "leaveInterval",
//         header: "Leave Interval",
//         meta: { filterVariant: "select" },
//       },
//       {
//         accessorKey: "intervalStatus",
//         header: "Interval Status",
//         meta: { filterVariant: "select" },
//       },
//     ],
//     []
//   );

//   const table = useReactTable({
//     data: getData,
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

//   return (
//     <div>
//       <div className='mt-3'>
//         <nav aria-label='breadcrumb' style={{ '--bs-breadcrumb-divider': "'>>'" }}>
//           <ol className='breadcrumb' style={{ color: 'white', marginLeft: '20px' }}>
//             <li className='breadcrumb-item'>
//               <Link to='/'>Home</Link>{' '}
//             </li>
//             <li className='breadcrumb-item'>
//               <a href=''>Employee Management</a>
//             </li>
//             <li className='breadcrumb-item active' aria-current='page'>
//               Employee Attendance
//             </li>
//           </ol>
//         </nav>
//       </div>
//       <div className='d-flex justify-content-center  ' style={{ width: screenWidth - 50 }}>
//         <div>
//           <div className='pt-2'>
//             <h1 className='Heading1 my-4'>Employee Attendance</h1>
//             <form onSubmit={submit}>
//               {loading ? <LoadingPage /> : ''}
//               <div className='mb-2 d-grid gap-1 d-md-flex justify-content-center my-4'>
//                 <label className='pt-2 fs-5 mb-0' htmlFor='fromDate'>fromDate:</label>
//                 <input onChange={handle} value={getAttendence.fromDate}
//                   type='date' className='form-control mb-0'
//                   id='fromDate' />
//                 <label className='pt-2 fs-5 mb-0' htmlFor='toDate'>toDate:</label>
//                 <input onChange={handle} value={getAttendence.toDate}
//                   type='date' className='form-control mb-0'
//                   id='toDate' />
//                 <button className='btn btn-outline-primary mt-0'>Get</button>
//               </div>
//             </form>
//             <button onClick={exportToExcel} className='btn btn-primary mt-0'>Export to Excel</button>
//           </div>
//           <div className='table-responsive-sm my-4'>
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
//             </Table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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

// export default GetAllEmpAttendance;

// import axios from 'axios';
// import React, { useState, useEffect, useMemo } from "react";
// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';
// import LoadingPage from './LoadingPage';
// import { useSelector } from 'react-redux';
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

// const GetAllEmpAttendance = () => {
//   const token = useSelector((state) => state.auth.token);
//   const empid = useSelector((state) => state.auth.empId);

//   const [getAttendence, setAttendence] = useState({
//     fromDate: '',
//     toDate: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [getData, setData] = useState([]);
//   const [columnFilters, setColumnFilters] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [graphData, setGraphData] = useState(null);

//   const [screenWidth, setScreenWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => {
//       setScreenWidth(window.innerWidth);
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const submit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     axios
//       .get(`/apigateway/payroll/timeSheet/allEmpAttendence?fromDate=${getAttendence.fromDate}&toDate=${getAttendence.toDate}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       })
//       .then(response => {
//         setData(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         toast.error(error.response?.data?.message || "Error fetching details");
//         setLoading(false);
//       });
//   };

//   const handle = (e) => {
//     const newDate = { ...getAttendence };
//     newDate[e.target.id] = e.target.value;
//     setAttendence(newDate);
//   };

//   const exportToExcel = () => {
//     setLoading(true);
//     axios({
//       url: `/apigateway/payroll/timeSheet/exporttoexcel?fromDate=${getAttendence.fromDate}&toDate=${getAttendence.toDate}`,
//       method: 'GET',
//       responseType: 'blob',
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }).then(response => {
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'timesheet.xlsx');
//       document.body.appendChild(link);
//       link.click();
//       setLoading(false);
//     })
//       .catch(error => {
//         toast.error(error.response?.data?.message || "Error uploading excel.");
//         setLoading(false);
//       });
//   };

//   const fetchEmployeeAttendance = (employeeName) => {
//     setLoading(true);
//     axios
//       .get(`/apigateway/payroll/timeSheet/empAttendence?employeeName=${employeeName}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       })
//       .then(response => {
//         setGraphData(prepareGraphData(response.data));
//         setLoading(false);
//       })
//       .catch(error => {
//         toast.error(error.response?.data?.message || "Error fetching employee attendance");
//         setLoading(false);
//       });
//   };

//   const prepareGraphData = (data) => {
//     const dates = data.map(entry => entry.date);
//     const workingHours = data.map(entry => {
//       return entry.workingHour ? parseInt(entry.workingHour) : 0;
//     });
//     return {
//       labels: dates,
//       datasets: [
//         {
//           label: 'Working Performance',
//           data: workingHours,
//           fill: false,
//           backgroundColor: 'rgba(75,192,192,0.4)',
//           borderColor: 'rgba(75,192,192,1)',
//         },
//       ],
//     };
//   };

//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: "employeeName",
//         header: "Employee Name",
//         meta: { filterVariant: "select" },
//       },
//       {
//         accessorKey: "checkOut",
//         header: "Check Out",
//         meta: { filterVariant: "select" },
//       },
//       {
//         accessorKey: "checkIn",
//         header: "Check In",
//         meta: { filterVariant: "select" },
//       },
//       {
//         accessorKey: "workingHour",
//         header: "Working Hour",
//         meta: { filterVariant: "select" },
//       },
//       {
//         accessorKey: "date",
//         header: "Date",
//         meta: { filterVariant: "select" },
//       },
//       {
//         accessorKey: "status",
//         header: "Status",
//         meta: { filterVariant: "select" },
//       },
//       {
//         accessorKey: "month",
//         header: "Month",
//         meta: { filterVariant: "select" },
//       },
//       {
//         accessorKey: "year",
//         header: "Year",
//         meta: { filterVariant: "select" },
//       },
//       {
//         accessorKey: "leaveInterval",
//         header: "Leave Interval",
//         meta: { filterVariant: "select" },
//       },
//       {
//         accessorKey: "intervalStatus",
//         header: "Interval Status",
//         meta: { filterVariant: "select" },
//       },
//     ],
//     []
//   );

//   const table = useReactTable({
//     data: getData,
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

//   return (
//     <div>
//       <div className='mt-3'>
//         <nav aria-label='breadcrumb' style={{ '--bs-breadcrumb-divider': "'>>'" }}>
//           <ol className='breadcrumb' style={{ color: 'white', marginLeft: '20px' }}>
//             <li className='breadcrumb-item'>
//               <Link to='/'>Home</Link>{' '}
//             </li>
//             <li className='breadcrumb-item'>
//               <a href=''>Employee Management</a>
//             </li>
//             <li className='breadcrumb-item active' aria-current='page'>
//               Employee Attendance
//             </li>
//           </ol>
//         </nav>
//       </div>
//       <div className='d-flex justify-content-center' style={{ width: screenWidth - 50 }}>
//         <div>
//           <div className='pt-2'>
//             <h1 className='Heading1 my-4'>Employee Attendance</h1>
//             <form onSubmit={submit}>
//               {loading ? <LoadingPage /> : ''}
//               <div className='mb-2 d-grid gap-1 d-md-flex justify-content-center my-4'>
//                 <label className='pt-2 fs-5 mb-0' htmlFor='fromDate'>fromDate:</label>
//                 <input onChange={handle} value={getAttendence.fromDate}
//                   type='date' className='form-control mb-0'
//                   id='fromDate' />
//                 <label className='pt-2 fs-5 mb-0' htmlFor='toDate'>toDate:</label>
//                 <input onChange={handle} value={getAttendence.toDate}
//                   type='date' className='form-control mb-0'
//                   id='toDate' />
//                 <button className='btn btn-outline-primary mt-0'>Get</button>
//               </div>
//             </form>
//             <button onClick={exportToExcel} className='btn btn-primary mt-0'>Export to Excel</button>
//             {selectedEmployee && (
//               <button onClick={() => fetchEmployeeAttendance(selectedEmployee)} className='btn btn-secondary mt-0'>Show Graph</button>
//             )}
//           </div>
//           <div className='table-responsive-sm my-4'>
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
//                   <tr
//                     key={row.id}
//                     onClick={() => {
//                       console.log("Row clicked:", row.original);
//                       if (row.original && row.original.employeeName) {
//                         console.log("Setting selectedEmployee to:", row.original.employeeName);
//                         setSelectedEmployee(row.original.employeeName);
//                       } else {
//                         console.log("No employeeName found in row data");
//                       }
//                     }}
//                     style={{ cursor: 'pointer' }}
//                   >
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
//           {graphData && (
//             <div>
//               <Line data={graphData} />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
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

// export default GetAllEmpAttendance;


import axios from 'axios';
import React, { useState, useEffect, useMemo } from "react";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import LoadingPage from './LoadingPage';
import { useSelector } from 'react-redux';
import { Table } from "react-bootstrap";
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

const GetAllEmpAttendance = () => {
  const token = useSelector((state) => state.auth.token);
  const empid = useSelector((state) => state.auth.empId);

  const [getAttendence, setAttendence] = useState({
    fromDate: '',
    toDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [getData, setData] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(`/apigateway/payroll/timeSheet/allEmpAttendence?fromDate=${getAttendence.fromDate}&toDate=${getAttendence.toDate}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log("API Response Data:", response.data); // Log response data
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        toast.error(error.response?.data?.message || "Error fetching details");
        console.error("Error happened:", error);
        setLoading(false);
      });
  };

  const handle = (e) => {
    const newDate = { ...getAttendence };
    newDate[e.target.id] = e.target.value;
    setAttendence(newDate);
    console.log(newDate);
  };

  const exportToExcel = () => {
    setLoading(true);
    axios({
      url: `/apigateway/payroll/timeSheet/exporttoexcel?fromDate=${getAttendence.fromDate}&toDate=${getAttendence.toDate}`,
      method: 'GET',
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'timesheet.xlsx');
      document.body.appendChild(link);
      link.click();
      setLoading(false);
    })
      .catch(error => {
        toast.error(error.response?.data?.message || "Error uploading excel.");
        console.error("Error happened:", error);
        setLoading(false);
      });
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "employeeName",
        header: "Employee Name",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "checkOut",
        header: "Check Out",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "checkIn",
        header: "Check In",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "workingHour",
        header: "Working Hour",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "date",
        header: "Date",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "status",
        header: "Status",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "month",
        header: "Month",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "year",
        header: "Year",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "leaveInterval",
        header: "Leave Interval",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "intervalStatus",
        header: "Interval Status",
        meta: { filterVariant: "select" },
      },
    ],
    []
  );

  const table = useReactTable({
    data: getData,
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

  return (
    <div>
      <div className='mt-3'>
        <nav aria-label='breadcrumb' style={{ '--bs-breadcrumb-divider': "'>>'" }}>
          <ol className='breadcrumb' style={{ color: 'white', marginLeft: '20px' }}>
            <li className='breadcrumb-item'>
              <Link to='/'>Home</Link>{' '}
            </li>
            <li className='breadcrumb-item'>
              <a href=''>Employee Management</a>
            </li>
            <li className='breadcrumb-item active' aria-current='page'>
              Employee Attendance
            </li>
          </ol>
        </nav>
      </div>
      <div className='d-flex justify-content-center  ' style={{ width: screenWidth - 50 }}>
        <div>
          <div className='pt-2'>
            <h1 className='Heading1 my-4'>Employee Attendance</h1>
            <form onSubmit={submit}>
              {loading ? <LoadingPage /> : ''}
              <div className='mb-2 d-grid gap-1 d-md-flex justify-content-center my-4'>
                <label className='pt-2 fs-5 mb-0' htmlFor='fromDate'>fromDate:</label>
                <input onChange={handle} value={getAttendence.fromDate}
                  type='date' className='form-control mb-0'
                  id='fromDate' />
                <label className='pt-2 fs-5 mb-0' htmlFor='toDate'>toDate:</label>
                <input onChange={handle} value={getAttendence.toDate}
                  type='date' className='form-control mb-0'
                  id='toDate' />
                <button className='btn btn-outline-primary mt-0'>Get</button>
              </div>
            </form>
            <button onClick={exportToExcel} className='btn btn-primary mt-0'>Export to Excel</button>
          </div>
          <div className='table-responsive-sm my-4'>
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
            column.setFilterValue((old) => [old?.[0], e.target?.value])
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

export default GetAllEmpAttendance;






