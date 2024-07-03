import React, { useState, useEffect, useMemo } from "react";
import { Container, Table } from "react-bootstrap";
import { Button } from "@mui/material";
import "./Hrmscss/ExampleTable.css";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Hrmscss/App.css";
import FileUpload from "./FileUpload";
import LoadingPage from "./LoadingPage";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
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

function EmployeeSalary() {
  const token = useSelector((state) => state.auth.token);
  // const  EmpId = useSelector((state) => state.auth.empId);
  const [loading, setLoading] = useState(false);
  const [clientInfo, setClientInfo] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/apigateway/payroll/salarydetails/getAllMonthlySalaryDetails`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setClientInfo(response.data);
        console.log(response.data);
        toast.success("Employee Salary found successfully!!", {
          position: "top-center",
          theme: "colored",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message || "Error fetching details");
        setLoading(false);
      });
  }, []);
  const columns = useMemo(
    () => [
      {
        accessorKey: "empId",
        header: "Emp ID",
        meta: { filterable: true },
      },
      {
        accessorKey: "employeeName",
        header: "Employee Name",
        meta: { filterVariant: "select" }
      },
      {
        accessorKey: "bankName",
        header: "Bank Name",
        meta: { filterVariant: "select" }
      },
      {
        accessorKey: "accountNo",
        header: "Account No",
        meta: { filterable: true },
      },
      {
        accessorKey: "netPay",
        header: "Net Pay",
        meta: { filterable: true },
      },
      {
        accessorKey: "employerPf",
        header: "Employer Pf",
        meta: { filterable: true },
      },
      {
        accessorKey: "employeePf",
        header: "Employee Pf",
        meta: { filterable: true },
      },
      {
        accessorKey: "employerEsic",
        header: "Employer Esic",
        meta: { filterable: true },
      },
      {
        accessorKey: "employeeEsic",
        header: "Employee Esic",
        meta: { filterable: true },
      },
      {
        accessorKey: "medicalAmount",
        header: "Medical Amount",
        meta: { filterable: true },
      },
      {
        accessorKey: "view",
        header: " View Archive",
        meta: { filterable: false },
        cell: (cell) => (
          <Link to={`/view-salary-details/${cell.row.original.empId}`}>
            <Button variant="contained" color="primary">
              View
            </Button>
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
    <div className=" mt-3">
      {loading ? <LoadingPage /> : ""}
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
            <Link to="">Employee Services</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Employee Salary
          </li>
        </ol>
      </nav>
      <div
        style={{
          marginTop: "50px",
          marginLeft: "80px",
          width: "820px",
          height: "60rem",
        }}
      >
        <FileUpload />
        <Container>
          <h1 className="Heading1">Employee Salary</h1>
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
        </Container>
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
export default EmployeeSalary;
