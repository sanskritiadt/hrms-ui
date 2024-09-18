// import axios from "axios";
// import React from "react";
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "react-bootstrap";
// import { toast } from 'react-toastify';
// import './Hrmscss/App.css'
// import LoadingPage from "./LoadingPage";
// import { useSelector } from 'react-redux';

// const Getallexpenses = () => {

//   const  token = useSelector((state) => state.auth.token);
//   const [expenseItems, setExpenseItems] = useState([]);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [loading, setLoading] = useState(true);

//   let Navigate = useNavigate();

//   useEffect(() => {
//     axios.get("/apigateway/expensemanagement/getAllExpenses", {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     }).then((response) => {
//       console.log(response.data)
//       setExpenseItems(response.data);
//       setLoading(false);
//       toast.success("data found successfully!!", { position: "top-center", theme: 'colored' })
//     }).catch(error => {
//       console.log(error);
//       setLoading(false);
//       toast.error( error.response.data.message || "Error fetching details" );
//     })
//   }, []);

//   const getExpenseByDate = (e) => {
//     setLoading(true);
//     e.preventDefault();
//     axios.get(`/apigateway/expensemanagement/getExpenseByDateRange?startDate=${startDate}&endDate=${endDate}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     }).then((response) => {
//       setLoading(false);
//       console.log(response.data);
//       expenseItems.length = 0;
//       setExpenseItems(response.data);
//      // toast.success("data found successfully!!", { position: "top-center", theme: 'colored' })
//       Navigate('/Getallexpenses')
//     }).catch((error) => {
//       setLoading(false);
//       console.log(error);
//       toast.error( error.response.data.message || "Error fetching details" );
//     })
//   }

//   if (!expenseItems) return null;

//   return (
//     <div>
//       {loading ? <LoadingPage/> : ''}
//       <div className=" mt-3">
//       <nav    aria-label="breadcrumb"   style={{ "--bs-breadcrumb-divider": "'>>'" }} >
//         <ol className="breadcrumb" style={{ color: "white" ,marginLeft:'20px'}}>

//             <li className="breadcrumb-item"><Link to="/">Home</Link> </li>
//             <li className="breadcrumb-item"><a href="">Expense</a></li>
//             <li className="breadcrumb-item active" aria-current="page">Get ALL Expense Details</li>
//         </ol>
//     </nav>
//     </div>
//     <div style={{ margin:'25px 100px  ',  width:'820px',height:'750px'}}>
//       <div className="row">
//       <h1  className='Heading1' >Get All Expense </h1>
//         <div className=" col-lg-12 container pt-2">
//           <form onSubmit={getExpenseByDate} >
//             <div className="mb-2 d-grid gap-1 d-md-flex justify-content-center ">
//               <label className="pt-3" htmlFor="startDate">startDate:</label>

//               <input onChange={(e) => setStartDate(e.target.value)} value={startDate}

//                 type="date" className="form-control" name="start-date"
//                 id="startDate" />

//               <label className="pt-3" htmlFor="endDate">endDate:</label>

//               <input onChange={(e) => setEndDate(e.target.value)} value={endDate}

//                 type="date" name="end-date" className="form-control"
//                 id="endDate" />
//              <Button type='submit' variant="outline-primary" style={{ margin:'3px',height:'37px',}}>Search</Button>
//             </div>
//           </form>
//         </div>
//       </div>
//       <div>
//         <table border='2' className="table table-striped table-bordered">
//           <thead className="table-danger table-striped">
//             <tr styles={{ width: '50%' }}>
//               {/* <th styles={{ width: '50%' }}>ID</th> */}
//               <th styles={{ width: '50%' }}>Payment_Date</th>
//               <th styles={{ width: '50%' }}>Payment_Mode</th>
//               <th styles={{ width: '50%' }}>Paid_By</th>
//               <th styles={{ width: '50%' }}>Created_By</th>
//               <th styles={{ width: '50%' }}>Amount</th>
//               <th styles={{ width: '50%' }}>Description</th>
//               <th styles={{ width: '50%' }}>Category</th>
//               <th styles={{ width: '50%' }}>GST</th>
//               <th styles={{ width: '50%' }}>Comments</th>
//               <th styles={{ width: '50%' }}>Edit</th>
//               {/* <th><Button  variant="outline-primary" style={{height:'53px',}} type='submit' onClick={routeCreateExpense}>
//                 Create exp
//               </Button></th> */}
//             </tr>
//           </thead>
//           <tbody className="body">
//             {/* map over the employees array */}
//             {expenseItems.map((expenseItem) => (
//               // display a <div> element with the employees.emailId and employees.designation
//               // parent element needs to have a unique key
//               <tr key={expenseItem.id}>
//                 {/* <td>{expenseItem.id}</td> */}
//                 <td>{expenseItem.paymentDate}</td>
//                 <td>{expenseItem.paymentMode}</td>
//                 <td>{expenseItem.paidBy}</td>
//                 <td>{expenseItem.createdBy}</td>
//                 <td>{expenseItem.amount}</td>
//                 <td>{expenseItem.description}</td>
//                 <td>{expenseItem.category}</td>
//                 <td>{String(expenseItem.gst)}</td>
//                 <td>{expenseItem.comments}</td>
//                 <td> <Link to={`/editexpenses/${expenseItem.id}`}>
//                       <Button variant="outline-primary" type="button">
//                         Edit
//                       </Button>
//                     </Link></td>

//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//     </div>
//     </div>
//   )
// }
// export default Getallexpenses;

// import axios from "axios";
// import React from "react";
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "react-bootstrap";
// import { toast } from 'react-toastify';
// import './Hrmscss/App.css';
// import LoadingPage from "./LoadingPage";
// import { useSelector } from 'react-redux';

// const Getallexpenses = () => {
//   const token = useSelector((state) => state.auth.token);
//   const permissions = useSelector((state) => state.auth.permissions);

//   const [expenseItems, setExpenseItems] = useState([]);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [loading, setLoading] = useState(true);

//   let navigate = useNavigate();

//   useEffect(() => {
//     axios.get("/apigateway/expensemanagement/getAllExpenses", {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     }).then((response) => {
//       setExpenseItems(response.data);
//       setLoading(false);
//       toast.success("Data found successfully!!", { position: "top-center", theme: 'colored' });
//     }).catch(error => {
//       setLoading(false);
//       toast.error(error.response?.data?.message || "Error fetching details");
//     });
//   }, [token]);

//   const routeCreateExpense = () => {
//     navigate('/CreateExpense');
//   }

//   const getExpenseByDate = (e) => {
//     setLoading(true);
//     e.preventDefault();
//     axios.get(`/apigateway/expensemanagement/getExpenseByDateRange?startDate=${startDate}&endDate=${endDate}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     }).then((response) => {
//       setLoading(false);
//       setExpenseItems(response.data);
//       navigate('/Getallexpenses');
//     }).catch((error) => {
//       setLoading(false);
//       toast.error(error.response?.data?.message || "Error fetching details");
//     });
//   }

//   if (!expenseItems) return null;

//   return (
//     <div>
//       {loading && <LoadingPage />}
//       <div className="mt-3">
//         <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
//           <ol className="breadcrumb" style={{ color: "white", marginLeft: '20px' }}>
//             <li className="breadcrumb-item"><Link to="/">Home</Link></li>
//             <li className="breadcrumb-item"><a href="#">Expense</a></li>
//             <li className="breadcrumb-item active" aria-current="page">Get ALL Expense Details</li>
//           </ol>
//         </nav>
//       </div>
//       <div style={{ margin: '25px 100px', width: '820px', height: '750px' }}>
//         <div className="row">
//           <h1 className='Heading1'>Get All Expense</h1>
//           <div className="col-lg-12 container pt-2">
//             <form onSubmit={getExpenseByDate}>
//               <div className="mb-2 d-grid gap-1 d-md-flex justify-content-center">
//                 <label className="pt-3" htmlFor="startDate">startDate:</label>
//                 <input
//                   onChange={(e) => setStartDate(e.target.value)}
//                   value={startDate}
//                   type="date"
//                   className="form-control"
//                   name="start-date"
//                   id="startDate"
//                 />
//                 <label className="pt-3" htmlFor="endDate">endDate:</label>
//                 <input
//                   onChange={(e) => setEndDate(e.target.value)}
//                   value={endDate}
//                   type="date"
//                   name="end-date"
//                   className="form-control"
//                   id="endDate"
//                 />
//                 <Button type='submit' variant="outline-primary" style={{ margin: '3px', height: '37px' }}>Search</Button>
//               </div>
//             </form>
//           </div>
//         </div>
//         <div>
//           <table border='2' className="table table-striped table-bordered">
//             <thead className="table-danger table-striped">
//               <tr styles={{ width: '50%' }}>
//                 <th>ID</th>
//                 <th>Payment_Date</th>
//                 <th>Payment_Mode</th>
//                 <th>Paid_By</th>
//                 <th>Created_By</th>
//                 <th>Amount</th>
//                 <th>Description</th>
//                 <th>Category</th>
//                 <th>GST</th>
//                 <th>Comments</th>
//                 <th>Edit</th>
//               </tr>
//             </thead>
//             <tbody className="body">
//               {expenseItems.map((expenseItem) => (
//                 <tr key={expenseItem.id}>
//                   <td>{expenseItem.id}</td>
//                   <td>{expenseItem.paymentDate}</td>
//                   <td>{expenseItem.paymentMode}</td>
//                   <td>{expenseItem.paidBy}</td>
//                   <td>{expenseItem.createdBy}</td>
//                   <td>{expenseItem.amount}</td>
//                   <td>{expenseItem.description}</td>
//                   <td>{expenseItem.category}</td>
//                   <td>{String(expenseItem.gst)}</td>
//                   <td>{expenseItem.comments}</td>
//                   <td>
//                     {permissions.includes('UPDATE_EXPENSE') && (
//                       <Link to={`/editexpenses/${expenseItem.id}`}>
//                         <Button variant="outline-primary" type="button">Edit</Button>
//                       </Link>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Getallexpenses;

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Table,Button } from "react-bootstrap";
import {
  Edit as EditIcon,
} from "@mui/icons-material";
import {
  IconButton,
} from "@mui/material";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { toast } from "react-toastify";
import LoadingPage from "./LoadingPage";
import { useSelector } from "react-redux";

const Getallexpenses = () => {
  const token = useSelector((state) => state.auth.token);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [expenseItems, setExpenseItems] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/apigateway/expensemanagement/getAllExpenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setExpenseItems(response.data);
        setLoading(false);
        toast.success("Data found successfully!!", {
          position: "top-center",
          theme: "colored",
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("Error happened. Try again later.", {
          position: "top-center",
          theme: "colored",
        });
      });
  }, [token]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "paymentDate",
        header: "Payment Date",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "paymentMode",
        header: "Payment Mode",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "paidBy",
        header: "Paid By",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "createdBy",
        header: "Created By",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "amount",
        header: "Amount",
        meta: { filterable: true },
      },
      {
        accessorKey: "description",
        header: "Description",
        meta: { filterVariant: "select" },
      },
      {
        accessorKey: "category",
        header: "Category",
        meta: { filterVariant: "select" },
      },
      { accessorKey: "gst", header: "GST", meta: { filterVariant: "boolean" } },
      {
        accessorKey: "comments",
        header: "Comments",
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
          <Link to={`/editexpenses/${cell.row.original.id}`}>
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
    data: expenseItems,
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

  const getExpenseByDate = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(
        `/apigateway/expensemanagement/getExpenseByDateRange?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setExpenseItems(response.data);
        setLoading(false);
        toast.success("Data found successfully!!", {
          position: "top-center",
          theme: "colored",
        });
        navigate("/Getallexpenses");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        toast.error("Error happened. Try again later.", {
          position: "top-center",
          theme: "colored",
        });
      });
  };

  return (
    <div>
      {loading ? <LoadingPage /> : ""}
      <div className="mt-3">
        <nav
          aria-label="breadcrumb"
          style={{ "--bs-breadcrumb-divider": "'>>'" }}
        ></nav>
      </div>
      <div style={{ margin: "25px 100px", width: "820px", height: "750px" }}>
        <div className="row">
          <h1 className="Heading1">Get All Expense</h1>
          <div className="col-lg-12 container pt-2">
            <form onSubmit={getExpenseByDate}>
              <div className="mb-2 d-grid gap-1 d-md-flex justify-content-center ">
                <label className="pt-3" htmlFor="startDate">
                  startDate:
                </label>
                <input
                  onChange={(e) => setStartDate(e.target.value)}
                  value={startDate}
                  type="date"
                  className="form-control"
                  name="start-date"
                  id="startDate"
                />
                <label className="pt-3" htmlFor="endDate">
                  endDate:
                </label>
                <input
                  onChange={(e) => setEndDate(e.target.value)}
                  value={endDate}
                  type="date"
                  name="end-date"
                  className="form-control"
                  id="endDate"
                />
                <Button
                  type="submit"
                  variant="outline-primary"
                  style={{ margin: "3px", height: "37px" }}
                >
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>
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
};

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

export default Getallexpenses;
