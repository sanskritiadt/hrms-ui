// import React, { useState, useEffect } from 'react';
// import { Container, Table } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Hrmscss/ExampleTable.css'
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';
// import './Hrmscss/App.css';
// import { Button } from "react-bootstrap";
// import LoadingPage from "./LoadingPage";
// import { useSelector } from 'react-redux';
// function ClientInfoTable() {
//     // const token = localStorage.getItem("response-token")
//     const  token = useSelector((state) => state.auth.token);
//     const [clientInfo, setClientInfo] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {

//         axios.get(`/apigateway/expensemanagement/clientInfo/getAllClientInfo`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         }).then(response => {
//             setClientInfo(response.data);
//             setLoading(false);
//         })
//             .catch(error => {
//                 console.log(error);
//                 toast.error( error.response.data.message || "Error fetching details" );
//                 setLoading(false);
//             });
//     }, []);

//     // Otherwise, render the client information in a table
//     return (
//         <div  className="mt-3"><nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
//                {loading ? <LoadingPage/> : ''}
//         <ol className="breadcrumb" style={{ color: "white" ,marginLeft:'20px'}}>

//             <li className="breadcrumb-item"><Link to="/">Home</Link> </li>
//             <li className="breadcrumb-item"><a href="">Partner</a></li>
//             <li className="breadcrumb-item active" aria-current="page">Get Client Information</li>
//         </ol>
//     </nav>
//         <div  style={{  marginTop:'50px', marginLeft : '80px ', width:'820px',height:'750px'}}>
//             <Container>
//             <h1  className='Heading1' >Get Client Information </h1>
//                 <Table striped bordered hover className="custom-table">
//                     <thead >
//                         <tr>
//                             {/* <th>Id</th> */}
//                             <th>Company Name</th>
//                             <th>Address</th>
//                             <th>Phone</th>
//                             <th>Email</th>
//                             <th>Contact Person</th>
//                             <th>GSTIN</th>
//                             <th>Edit</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {clientInfo.map(client => (
//                             <tr key={client.id}>
//                                 {/* <td><Link className="Candidate-id" to={`/EditClient/${client.id}`}>{client.id}</Link></td> */}
//                                 <td>{client.companyName}</td>
//                                 <td>{client.address}</td>
//                                 <td>{client.phone}</td>
//                                 <td>{client.email}</td>
//                                 <td>{client.contactPerson}</td>
//                                 <td>{client.gstin}</td>
//                                 <td> <Link to={`/EditClient/${client.id}`}>
//                       <Button variant="outline-primary" type="button">
//                         Edit
//                       </Button>
//                     </Link></td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>
//             </Container>
//         </div>
//         </div>
//     )
// };
// export default ClientInfoTable;

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

function ClientInfoTable() {
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(true);
  const [clientInfo, setClientInfo] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  useEffect(() => {
    axios
      .get("/apigateway/expensemanagement/clientInfo/getAllClientInfo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setClientInfo(response.data);
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
        accessorKey: "companyName",
        header: "Company Name",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "address",
        header: "Address",
        meta: { filterVariant: "select" },
      },
      { accessorKey: "phone", header: "Phone", meta: { filterVariant: "select" } },
      { accessorKey: "email", header: "Email", meta: { filterVariant: "select" } },
      {
        accessorKey: "contactPerson",
        header: "Contact Person",
        meta: { filterVariant: "select" },
      },
      { accessorKey: "gstin", header: "GSTIN", meta: { filterVariant: "select" } },
      {
        accessorKey: "edit",
        header: "Edit",
        cell: (cell) => (
          <Link to={`/EditClient/${cell.row.original.id}`}>
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
    data: clientInfo,
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
              <a href="">Partner</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Get Client Information
            </li>
          </ol>
        </nav>
      </div>
      <div style={{ margin: "25px 100px", width: "820px", height: "750px" }}>
        <h1 className="Heading1">Get Client Information</h1>
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
export default ClientInfoTable;
