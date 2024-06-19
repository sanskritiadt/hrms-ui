// import axios from "axios";
// import React, { useState, useEffect } from 'react';
// import './Hrmscss/App.css'
// import { Link } from "react-router-dom";
// import { toast } from 'react-toastify';
// import LoadingPage from "./LoadingPage";
// import { useSelector } from 'react-redux';
// import { Button } from "react-bootstrap";
// export default function Getinterviewdetails() {
//     const [positions, setPosition] = useState([]);
//     const [loading, setLoading] = useState(true);
//     // const token = localStorage.getItem("response-token")
//     const  token = useSelector((state) => state.auth.token);

//     useEffect(() => {
//         axios.get("/apigateway/hrms/interview/getAllInterviewDetails", {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         }).then((response) => {
//             setPosition(response.data);
//             setLoading(false);
//         }).catch((error) => {
//             console.log("error occured", error);
//             toast.error( error.response.data.message || "Error fetching details" );
//             setLoading(false);
//         })
//     }, []);

//     if (!positions) return null;

//     return (
//         <div><nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
//                {loading ? <LoadingPage/> : ''}
//         <ol className="breadcrumb" style={{ color: "white" ,marginLeft:'20px'}}>

//             <li className="breadcrumb-item"><Link to="/">Home</Link> </li>
//             <li className="breadcrumb-item"><a href="">Hiring</a></li>
//             <li className="breadcrumb-item active" aria-current="page">Get Interview Details </li>
//         </ol>
//     </nav>
//         <div className="table-responsive-sm">
//                <h1  className='Heading1' >Interview Details</h1>
//             <table border='2' className="table table-striped table-bordered">
//                 <thead className="head">
//                     <tr className="table-danger table-striped">
//                         <th>INTERVIEWID</th>
//                         <th>ROUNDS</th>
//                         <th>TECHNOLOGY</th>
//                         <th>POSITION NAME</th>
//                         <th>CANDIDATE NAME</th>
//                         <th>MARKS</th>
//                         <th>COMMUNICATION</th>
//                         <th>ENTHUSIASM</th>
//                         <th>NOTES</th>
//                         <th>WORK EXP IN YEARS</th>
//                         <th>INTERVIEWER NAME</th>
//                         <th>CANDIDATE NAME</th>
//                         <th>SOURCE</th>
//                         <th>OFFER ACCEPTED</th>
//                         <th>TYPE</th>
//                         <th>CLIENT NAME</th>
//                         <th>DATE</th>
//                         <th>STATUS</th>
//                         <th>EDIT</th>
//                     </tr>
//                 </thead>
//                 <tbody className="body">
//                     {/* map over the employees array */}
//                     {positions.map(position => (
//                         // display a <div> element with the employees.emailId and employees.designation
//                         // parent element needs to have a unique key
//                         <tr key={position.interviewId}>
//                             <td>{position.interviewId}</td>
//                             <td>{position.rounds}</td>
//                             <td>{position.tech_id.description}</td>
//                             <td>{position.position_id.positionName}</td>
//                             <td>{position.candidate_id.candidateName}</td>
//                             <td>{position.marks}</td>
//                             <td>{position.communication}</td>
//                             <td>{position.enthusiasm}</td>
//                             <td>{position.notes}</td>
//                             <td>{position.workExInYears}</td>
//                             <td>{position.interviewerName}</td>
//                             <td>{position.candidateName}</td>
//                             <td>{position.source}</td>
//                             <td>{String(position.offerAccepted)}</td>
//                             <td>{position.type}</td>
//                             <td>{position.clientName}</td>
//                             <td>{position.date}</td>
//                             <td>{position.status}</td>
//                             <td> <Link to={`/EditInterviewDetails/${position.interviewId}/${position.rounds}`}>
//                       <Button variant="outline-primary" type="button">
//                         Edit
//                       </Button>
//                     </Link></td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//        </div>

//     );
// }

import React, { useState, useEffect, useMemo } from "react";
import { Table } from "react-bootstrap";
import { Edit as EditIcon } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
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

function Getinterviewdetails() {
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  useEffect(() => {
    axios
      .get(`/apigateway/hrms/interview/getAllInterviewDetails`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error occoured", error);
        toast.error(error.response.data.message || "Error fetching details");
        setLoading(false);
      });
  }, [token]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "tech_id.description",
        header: "Tech Description",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "position_id.positionName",
        header: "Position Name",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "candidate_id.candidateName",
        header: "Candidate Name",
        meta: { filterVariant: "select" },
      },
      { accessorKey: "marks", header: "Marks", meta: { filterable: true } },
      {
        accessorKey: "communication",
        header: "Communication",
        meta: { filterable: true },
      },
      {
        accessorKey: "enthusiasm",
        header: "Enthusiasm",
        meta: { filterable: true },
      },
      {
        accessorKey: "notes",
        header: "Notes",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "workExInYears",
        header: "Work Experience (Years)",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "interviewerName",
        header: "Interviewer Name",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "source",
        header: "Source",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "offerAccepted",
        header: "Offer Accepted",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "type",
        header: "Type",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "clientName",
        header: "Client Name",
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
        accessor: "edit",
        header: "Edit",
        cell: (cell) => (
          <Link
            to={`/EditInterviewDetails/${cell.row.original.interviewId}/${cell.row.original.rounds}`}
          >
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
              <Link to="">Hiring</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Interview Details
            </li>
          </ol>
        </nav>
      </div>
      <div style={{ margin: "25px 100px", width: "820px", height: "750px" }}>
        <h1 className="Heading1">Interview Details</h1>
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
export default Getinterviewdetails;
