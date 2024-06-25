// import axios from "axios";
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { toast } from 'react-toastify';
// import { Button } from "react-bootstrap";
// import './Hrmscss/App.css';
// import LoadingPage from "./LoadingPage";
// import { useSelector } from 'react-redux';
// function GetAllPrEngagement() {
//     const [project , setProject ] = useState([]);
//     const [loading, setLoading] = useState(true);
//     // const token = localStorage.getItem("response-token")
//     const  token = useSelector((state) => state.auth.token);
//     React.useEffect(() => {
//       axios.get(`/apigateway/hrms/engagement/allProjectEngagement`, {
//          headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       }).then((response) => {
//         setProject(response.data);
//         setLoading(false);
//         //toast.success("Data found successfully.", { position: 'top-center', theme: "colored", closeOnClick: true })
//       }).catch(error => {
//         console.log(error)
//         toast.error( error.response.data.message || "Error fetching details" );
//         setLoading(false);
//       })
//     }, []);
//     if (!project) return null;

//     return (
//       <div  className="mt-3">
//            {loading ? <LoadingPage/> : ''}
//       <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
//         <ol className="breadcrumb" style={{ color: "white" ,marginLeft:'20px'}}>
//             <li className="breadcrumb-item"><Link to="/">Home</Link> </li>
//             <li className="breadcrumb-item"><a href="">Partner</a></li>
//             <li className="breadcrumb-item active" aria-current="page">Project Engagement</li>
//         </ol>
//     </nav>

//       < div  style={{ margin:'25px  20px',  width:'820px',height:'750px'}}>
//           <h1  className='Heading1' >Project   Details</h1>
//       <div className="table-responsive-sm">
//         <table border='2' className="table table-striped table-bordered">

//           <thead className="head">
//             <tr className="table-danger table-striped">
//               {/* <th>Project Id</th> */}
//               <th>Project Name</th>
//               <th>Project Description</th>
//               <th>Engaged Employee</th>
//               <th>Start Date </th>
//               <th>End Date</th>
//               <th>Status</th>
//               <th>Edit</th>
//             </tr>
//           </thead>
//           <tbody className="body">
//             {project.map((project ) => (
//               <tr key={project.projectId}>
//                 {/* <td><Link to={`/EditprojEng/${project.projectId}`} className="Candidate-id">{project.projectId}</Link></td> */}
//                 <td>{project.projectName}</td>
//                 <td>{project.projectDescription}</td>
//                 <td>{project.engagedEmployee}</td>
//                 <td>{project.startDate}</td>
//                 <td>{project.endDate}</td>
//                 <td>{String(project.status)}</td>
//                 <td> <Link to={`/EditprojEng/${project.projectId}`} >
//                       <Button variant="outline-primary" type="button">
//                         Edit
//                       </Button>
//                     </Link></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       </div>
//       </div>
//     );
// }

// export default GetAllPrEngagement

import React, { useState, useEffect, useMemo } from "react";
import { Table } from "react-bootstrap";
import { Edit as EditIcon } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
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

function GetAllPrEngagement() {
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  useEffect(() => {
    axios
      .get("/apigateway/hrms/engagement/allProjectEngagement", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message || "Error fetching details");
        setLoading(false);
      });
  }, [token]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "contractor",
        header: "Contractor",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "endClient",
        header: "End Client",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "primaryResource",
        header: "Primary Resource",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "secondaryResource",
        header: "Secondary Resource",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "startDate",
        header: "Start Date",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "endDate",
        header: "End Date",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "status",
        header: "Status",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "edit",
        header: "Edit",
        meta: { filterable: false },
        cell: (cell) => (
          <Link to={`/EditprojEng/${cell.row.original.projectId}`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: data,
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
              <Link to="">Partner</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              View Project Engagement
            </li>
          </ol>
        </nav>
      </div>
      <div style={{ margin: "25px 100px", width: "820px", height: "750px" }}>
        <h1 className="Heading1">Project Engagement</h1>
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
export default GetAllPrEngagement;
