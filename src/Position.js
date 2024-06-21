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

import React, { useState, useEffect, useMemo } from "react";
import { Table } from "react-bootstrap";
import {
    Edit as EditIcon,
  } from "@mui/icons-material";
  import {
    Button,
    IconButton,
  } from "@mui/material";
import { toast } from "react-toastify";
import { Link  } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import LoadingPage from "./LoadingPage";
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

function PositionDetails() {
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(true);
  const [positions, setPositions] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  useEffect(() => {
    axios
      .get("/apigateway/hrms/interview/getAllPositionNew", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPositions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message || "Error fetching details");
        setLoading(false);
      });
  }, [token]);


  const columns = useMemo(() => [
    {
      accessorKey: 'positionName',
      header: 'Position Name',
      meta: { filterVariant: 'select' }
    },
    {
      accessorKey: 'vacancy',
      header: 'Vacancy',
      meta: { filterVariant: 'select' }
    },
    {
      accessorKey: 'positionOpenDate',
      header: 'Position Open Date',
      meta: { filterVariant: 'select' }
    },
    {
      accessorKey: 'positionCloseDate',
      header: 'position Close Date',
      meta: { filterVariant: 'select' }
    },
    {
      accessorKey: 'status',
      header: 'status',
      meta: { filterVariant: 'select' }
    },
    {
      accessorKey: 'experienceInYear',
      header: 'experienceInYear',
      meta: { filterVariant: 'select' }
    },
    {
      accessorKey: 'remote',
      header: 'remote',
      meta: { filterVariant: 'select' }
    },
    {
      accessorKey: 'positionType',
      header: 'positionType',
      meta: { filterVariant: 'select' }
    },
    {
      accessorKey: 'positionId',
      header: 'Edit',
      meta: { filterable: false },
      cell: (cell) => (
        <Link to={`/EditPosition/${cell.row.original.positionId}`}>
          <IconButton color="primary">
              <EditIcon />
            </IconButton>
        </Link>
      )
    }
  ], []);


  const table = useReactTable({
    data: positions,
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
    <div className="mt-3">
      {loading ? <LoadingPage /> : ""}
      <div className="mt-3">
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
              <Link to="">Hiring</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
            Employee Position
            </li>
          </ol>
        </nav>
      </div>
      <div style={{ margin: "25px 100px", width: "820px", height: "750px" }}>
        <h1 className="Heading1"> Employee Position</h1>
        <div>
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
export default PositionDetails;