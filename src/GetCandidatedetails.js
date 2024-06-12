// import axios from "axios";
// import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
// import './Hrmscss/App.css'
// import {toast } from 'react-toastify';
// import { Button } from "react-bootstrap";
// import './Hrmscss/App.css';
// import LoadingPage from "./LoadingPage";
// import { useSelector } from 'react-redux';
// export default function CandidateDetails() {

//     const [Candidates, setCandidate] = useState([]);
//     const [loading, setLoading] = useState(true);
//     // const token = localStorage.getItem("response-token")
//     const  token = useSelector((state) => state.auth.token);

//     useEffect(() => {
//         axios.get(`/apigateway/hrms/interviewCandidate/allInterviewCandidate`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         }).then((response) => {
//             setCandidate(response.data);
//             setLoading(false);
//         }).catch(error => {
//             console.log("error occoured", error);
//             toast.error( error.response.data.message || "Error fetching details" );
//             setLoading(false);
//         })
//     }, []);

//     if (!Candidates) return null;

//     return (
//         <div className="mt-3"><nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
//                {loading ? <LoadingPage/> : ''}
//         <ol className="breadcrumb" style={{ color: "white" ,marginLeft:'20px'}}>

//             <li className="breadcrumb-item"><Link to="/">Home</Link> </li>
//             <li className="breadcrumb-item"><a href="">Hiring</a></li>
//             <li className="breadcrumb-item active" aria-current="page">Get candidate </li>
//         </ol>
//     </nav>
//         <div className="table-responsive-sm" style={{ margin:'100px 10px ',height: '562px'}}>
//              <h1  className='Heading1' > Candidate Details</h1>
//             <table border='2' className="table table-striped table-bordered">
//                 <thead className="head">
//                     <tr className="table-danger table-striped">
//                         {/* <th>CandidateId</th> */}
//                         <th>Candidate Name</th>
//                         <th>Email Id</th>
//                         <th>Contact No</th>
//                         <th>Address</th>
//                         <th>Highest Qualification</th>
//                         <th>Work Experience</th>
//                         <th>Technical Stack</th>
//                         <th>CV Shortlisted</th>
//                         <th>Last CTC</th>
//                         <th>Notice Period</th>
//                         <th>Dob</th>
//                         <th>Edit</th>
//                     </tr>
//                 </thead>
//                 <tbody className="body">
//                     {/* map over the employees array */}
//                     {Candidates.map((Candidate) => (
//                         // display a <div> element with the employees.emailId and employees.designation
//                         // parent element needs to have a unique key
//                         <tr key={Candidate.candidateId}>
//                             {/* <td><Link to={`/EditCandidate/${Candidate.candidateId}`} className="Candidate-id">{Candidate.candidateId}</Link></td> */}
//                             <td>{Candidate.candidateName}</td>
//                             <td>{Candidate.emailId}</td>
//                             <td>{Candidate.contactNo}</td>
//                             <td>{Candidate.address}</td>
//                             <td>{Candidate.highestQualification}</td>
//                             <td>{Candidate.workExperience}</td>
//                             <td>{Candidate.technicalStack}</td>
//                             <td>{String(Candidate.cvShortlisted)}</td>
//                             <td>{Candidate.lastCTC}</td>
//                             <td>{Candidate.noticePeriod}</td>
//                             <td>{Candidate.dob}</td>
//                             <td><Link  to={`/EditCandidate/${Candidate.candidateId}`} >
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

function CandidateDetails() {
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(true);
  const [Candidates, setCandidate] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  useEffect(() => {
    axios
      .get(`/apigateway/hrms/interviewCandidate/allInterviewCandidate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCandidate(response.data);
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
        accessorKey: "candidateName",
        header: "Candidate Name",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "emailId",
        header: "Email ID",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "contactNo",
        header: "Contact No",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "address",
        header: "Address",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "highestQualification",
        header: "Highest Qualification",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "workExperience",
        header: "Work Experience",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "technicalStack",
        header: "Technical Stack",
        meta: { filterVariant: "select" },
      },
      { accessorKey: "cvShortlisted", header: "CV Shortlisted",  meta: { filterable: true }},
      {
        accessorKey: "lastCTC",
        header: "Last CTC",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "noticePeriod",
        header: "Notice Period",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "dob",
        header: "Date of Birth",
        meta: { filterVariant: "select" },
      },
      {
        accessor: "edit",
        header: "Edit",
        cell: (cell) => (
          <Link to={`/EditCandidate/${cell.row.original.candidateId}`}>
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
    data: Candidates,
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
              <a href="">Hiring</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Candidate Information
            </li>
          </ol>
        </nav>
      </div>
      <div style={{ margin: "25px 100px", width: "820px", height: "750px" }}>
        <h1 className="Heading1">Candidate Information</h1>
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
export default CandidateDetails;
