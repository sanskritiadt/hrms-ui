// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import "./Hrmscss/App.css";
// import LoadingPage from "./LoadingPage";
// import { useSelector } from 'react-redux';
// import { Button } from "react-bootstrap";

// const GetGstDetails = () => {
//   // const token = localStorage.getItem("response-token");
//   const  token = useSelector((state) => state.auth.token);
//   const [Gst, setGst] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get(`/apigateway/expensemanagement/gst/displayAllGSTDetails`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setGst(response.data.content);
//         setLoading(false);

//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error( error.response.data.message || "Error fetching details" );
//         setLoading(false);
//       });
//   }, []);
//   if (!Gst) return null;

//   const [screenWidth, setScreenWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => {
//       setScreenWidth(window.innerWidth);
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return (
//     <div className="table-responsive-sm">
//          {loading ? <LoadingPage/> : ''}
//       <div className=" mt-3">
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
//               GST Details
//             </li>
//           </ol>
//         </nav>
//       </div>
//       <div
//         style={{
//           width: screenWidth - 50,
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         <div>
//           <h1 className="Heading1 my-4">GST Details</h1>
//           <div style={{ width: "160vh", overflowX: "auto" }}>
//             <table border="2" className="table table-striped table-bordered">
//               <thead className="head">
//                 <tr className="table-danger table-striped">
//                   <th>ID</th>
//                   <th>INVOICE NUMBER</th>
//                   <th>FINANCIAL YEAR</th>
//                   <th>INVOICE DATE</th>
//                   <th>GST PERIOD</th>
//                   <th>BILIING PERIOD</th>
//                   <th>CUSTOMER ID</th>
//                   <th>PAID TO</th>
//                   <th>TAXABLE AMOUNT</th>
//                   <th>TDS</th>
//                   <th>GST</th>
//                   <th>INVOICE AMOUNT</th>
//                   <th>RECEIVEABLE</th>
//                   <th>AMOUNT RECEIVED</th>
//                   <th>DATE RECEIVED</th>
//                   <th>INVOICE BALANCE</th>
//                   <th>STATUS</th>
//                   <th>TDS CREDITED</th>
//                   <th>TDS BALANCE</th>
//                   <th>EDIT</th>
//                 </tr>
//               </thead>
//               <tbody className="body">
//                 {Gst.map((gst) => (
//                   <tr key={gst.id}>
//                     <td>{gst.id}</td>
//                     {/* <td>{gst.invoiceNumber}</td> */}
//                     <td> {gst.invoiceNumber}</td>
//                     <td>{gst.fy}</td>
//                     <td>{gst.invoiceDate}</td>
//                     <td>{gst.gstPeriod}</td>
//                     <td>{gst.billingPeriod}</td>
//                     <td>{gst.customerId}</td>
//                     <td>{gst.paidTo}</td>
//                     <td>{gst.taxableAmount}</td>
//                     <td>{gst.tds}</td>
//                     <td>{gst.gst}</td>
//                     <td>{gst.invoiceAmount}</td>
//                     <td>{gst.receivable}</td>
//                     <td>{gst.amountReceived}</td>
//                     <td>{gst.dateReceived}</td>
//                     <td>{gst.invoiceBalance}</td>
//                     <td>{gst.status}</td>
//                     <td>{gst.tdsCredited}</td>
//                     <td>{gst.tdsBalance}</td>
//                     <td> <Link to={`/EditGstDetails/${gst.invoiceNumber}`}>
//                       <Button variant="outline-primary" type="button">
//                         Edit
//                       </Button>
//                     </Link></td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GetGstDetails;

import React, { useState, useEffect, useMemo } from "react";
import { Table } from "react-bootstrap";
import { Edit as EditIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";
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

function GetGstDetails() {
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(true);
  const [Gst, setGst] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  useEffect(() => {
    axios
      .get("/apigateway/expensemanagement/gst/displayAllGSTDetails", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setGst(response.data.content);
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
            accessorKey: "invoiceNumber",
            header: "Invoice Number",
            meta: { filterVariant: "select" },
        },
        { accessorKey: "fy", header: "FY", meta: { filterVariant: "select" } },
        {
            accessorKey: "invoiceDate",
            header: "Invoice Date",
            meta: { filterVariant: "select" },
        },
        {
            accessorKey: "gstPeriod",
            header: "GST Period",
            meta: { filterVariant: "select" },
        },
        {
            accessorKey: "billingPeriod",
            header: "Billing Period",
            meta: { filterVariant: "select" },
        },
        {
            accessorKey: "customerId",
            header: "Customer ID",
            meta: { filterVariant: "select" },
        },
        {
            accessorKey: "paidTo",
            header: "Paid To",
            meta: { filterVariant: "select" },
        },
        {
            accessorKey: "taxableAmount",
            header: "Taxable Amount",
            meta: { filterable: true }
        },
        { accessorKey: "tds", header: "TDS", meta: { filterable: true } },
        { accessorKey: "gst", header: "GST", meta: { filterable: true } },
        {
            accessorKey: "invoiceAmount",
            header: "Invoice Amount",
            meta: { filterable: true },
        },
        {
            accessorKey: "receivable",
            header: "Receivable",
            meta: { filterable: true },
        },
        {
            accessorKey: "amountReceived",
            header: "Amount Received",
            meta: { filterable: true },
        },
        {
            accessorKey: "dateReceived",
            header: "Date Received",
            meta: { filterVariant: "select" },
        },
        {
            accessorKey: "invoiceBalance",
            header: "Invoice Balance",
            meta: { filterable: true },
        },
        {
            accessorKey: "status",
            header: "Status",
            meta: { filterVariant: "select" },
        },
        {
            accessorKey: "tdsCredited",
            header: "TDS Credited",
            meta: { filterable: true },
        },
        {
            accessorKey: "tdsBalance",
            header: "TDS Balance",
            meta: { filterable: true },
        },
        {
            accessorKey: "edit",
            header: "Edit",
            cell: ({ row }) => (
                <Link to={`/EditGstDetails/${row.original.invoiceNumber}`}>
                    <IconButton color="primary">
                        <EditIcon />
                    </IconButton>
                </Link>
            ),
            meta: { filterable: false },
        },
    ],
    []
);


  const table = useReactTable({
    data: Gst,
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
              <a href="">Employee Management</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              GST Details
            </li>
          </ol>
        </nav>
      </div>
      <div style={{ margin: "25px 100px", width: "820px", height: "750px" }}>
        <h1 className="Heading1"> GST Details</h1>
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
export default GetGstDetails;
