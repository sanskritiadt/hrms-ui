import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Tooltip, Button, Select, MenuItem, FormControl, InputLabel, Typography, Modal, Breadcrumbs, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Checkbox, FormControlLabel, ListItemText } from "@mui/material";
import { Form, Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { toast } from "react-toastify";
import Graph from './Graph';
import LoadingPage from "./LoadingPage";
import {
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { blueGrey } from "@mui/material/colors";

const GetAllEmpAttendance = () => {
  const token = useSelector((state) => state.auth.token);
  const empid = useSelector((state) => state.auth.empId);

  const [getAttendence, setAttendence] = useState({
    fromDate: "",
    toDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [getData, setData] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [showGraph, setShowGraph] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [error, setError] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({
    employeeName: true,
    checkIn: true,
    checkOut: true,
    workingHour: true,
    date: true,
    status: true,
    month: true,
    year: true
  });

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(
        `/apigateway/payroll/timeSheet/allEmpAttendence?fromDate=${getAttendence.fromDate}&toDate=${getAttendence.toDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Error fetching details");
        setLoading(false);
      });
  };

  const handle = (e) => {
    const { id, value } = e.target;
    setAttendence((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    if (id === "toDate" && value < getAttendence.fromDate) {
      setError("To Date cannot be less than From Date");
    } else {
      setError("");
    }
  };

  const handleSelectChange = (event) => {
    setSelectedEmployee(event.target.value);
  };

  const exportToExcel = () => {
    setLoading(true);
    axios({
      url: `/apigateway/payroll/timeSheet/exporttoexcel?fromDate=${getAttendence.fromDate}&toDate=${getAttendence.toDate}`,
      method: "GET",
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "timesheet.xlsx");
        document.body.appendChild(link);
        link.click();
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Error uploading excel.");
        setLoading(false);
      });
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleColumnVisibility = (columnName) => {
    setColumnVisibility((prevVisibility) => ({
      ...prevVisibility,
      [columnName]: !prevVisibility[columnName],
    }));
  };



  const toggleAllColumns = (isVisible) => {
    const updatedVisibility = {};
    Object.keys(columnVisibility).forEach((key) => {
      updatedVisibility[key] = isVisible;
    });
    setColumnVisibility(updatedVisibility);
  };


  const columns = useMemo(
    () => [
      {
        accessorKey: "employeeName",
        header: "Employee Name",
        meta: { filterVariant: "select" },
        isVisible: columnVisibility.employeeName,

      },
      {
        accessorKey: "checkIn",
        header: "Check In",
        meta: { filterVariant: "select" },
        isVisible: columnVisibility.checkIn,
      },
      {
        accessorKey: "checkOut",
        header: "Check Out",
        meta: { filterVariant: "select" },
        isVisible: columnVisibility.checkOut,
      },
      {
        accessorKey: "workingHour",
        header: "Working Hour",
        meta: { filterVariant: "select" },
        isVisible: columnVisibility.workingHour,
      },
      {
        accessorKey: "date",
        header: "Date",
        meta: { filterVariant: "select" },
        isVisible: columnVisibility.date,
      },
      {
        accessorKey: "status",
        header: "Status",
        meta: { filterVariant: "select" },
        isVisible: columnVisibility.status,
      },
      {
        accessorKey: "month",
        header: "Month",
        meta: { filterVariant: "select" },
        isVisible: columnVisibility.month,
      },
      {
        accessorKey: "year",
        header: "Year",
        meta: { filterVariant: "select" },
        isVisible: columnVisibility.year,
      },
    ],
    [columnVisibility]
  );

  const table = useReactTable({
    data: getData,
    columns: columns.filter((col) => col.isVisible),
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

  const filteredData = useMemo(() => {
    if (selectedEmployee.length === 0) return getData;
    return getData.filter((item) =>
      selectedEmployee.includes(item.employeeName)
    );
  }, [selectedEmployee, getData]);


  const todayDate = new Date().toISOString().split("T")[0];

  const handleOpen = () => {
    setShowGraph(true);
  };

  const handleClose = () => {
    setShowGraph(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Home
        </Link>
        <Link
          to="/employee-management"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Employee Management
        </Link>
        <Typography color="textPrimary">Employee Attendance</Typography>
      </Breadcrumbs>
      <div className="mt-3">
        <div style={{ display: "flex", alignItems: "flex-start", width: "100%", marginBottom: '10px', marginLeft: "0px" }}>
          <form onSubmit={submit} style={{ display: "flex", alignItems: "center", width: "100%", maxWidth: "920px", margin: "0 auto" }}>
            {loading && <LoadingPage />}

            <TextField
              id="fromDate"
              label="From Date"
              type="date"
              value={getAttendence.fromDate}
              onChange={handle}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ max: todayDate }}
              style={{ marginRight: "20px", width: "180px", height: "20px" }}
              InputProps={{
                style: {
                  height: "40px",
                  padding: '0 14px',
                }
              }}
            />

            <TextField
              id="toDate"
              label="To Date"
              type="date"
              value={getAttendence.toDate}
              onChange={handle}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ max: todayDate }}
              style={{ marginRight: "20px", width: "180px", height: "20px" }}
              InputProps={{
                style: {
                  height: "40px",
                  padding: '0 14px',
                }
              }}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading || !getAttendence.fromDate || !getAttendence.toDate}
              style={{ marginRight: "20px", height: "40px", marginTop: "20px" }}

            >
              Get
            </Button>

            <Tooltip title="Download employee attendance data" arrow>
              <Button
                onClick={exportToExcel}
                variant="contained"
                startIcon={<FileDownloadOutlinedIcon />}
                style={{ marginRight: "20px", height: "40px", marginTop: "20px" }}
              >
                Download
              </Button>
            </Tooltip>

            <Button
              onClick={handleOpen}
              variant="contained"
              style={{ marginRight: "20px", height: "40px", marginTop: "20px" }}
            >
              View Graph
            </Button>

            {error && <Typography color="error">{error}</Typography>}
          </form>

          <Modal
            open={showGraph}
            onClose={handleClose}
            aria-labelledby="graph-modal-title"
            aria-describedby="graph-modal-description"
          >
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', backgroundColor: 'white', padding: '20px', outline: 'none', boxShadow: 24 }}>
              <Typography id="graph-modal-title" variant="h6" component="h2">
                Attendance Graph
              </Typography>
              <Graph data={filteredData} />
              <Button onClick={handleClose} variant="contained" style={{ marginTop: '20px' }}>Close</Button>
            </div>
          </Modal>
        </div>
        <FormControl fullWidth style={{ marginTop: "20px" }}>
          <InputLabel id="employee-select-label">Select Employees</InputLabel>
          <Select
            labelId="employee-select-label"
            id="employee-select"
            multiple
            value={selectedEmployee}
            onChange={handleSelectChange}
            renderValue={(selected) => selected.join(", ")}
          >
            {Array.from(new Set(getData.map((item) => item.employeeName))).map(
              (name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={selectedEmployee.includes(name)} />
                  <ListItemText primary={name} />
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
        <div className="mt-2">
          <strong>Show/Hide Columns:</strong>
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
              Select Columns
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Object.keys(columnVisibility).map((columnKey) => (
                <Dropdown.Item key={columnKey}>
                  <Form.Check
                    type="checkbox"
                    label={columnKey}
                    checked={columnVisibility[columnKey]}
                    onChange={() => toggleColumnVisibility(columnKey)}
                  />
                </Dropdown.Item>
              ))}
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => toggleAllColumns(true)}>
                Select All
              </Dropdown.Item>
              <Dropdown.Item onClick={() => toggleAllColumns(false)}>
                Deselect All
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <TableContainer>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id} colSpan={header.colSpan} style={{ backgroundColor: "lavenderblush" }}>
                      {header.isPlaceholder ? null : (
                        <div
                          style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getIsSorted() === "asc" ? " ↑" : header.column.getIsSorted() === "desc" ? " ↓" : null}
                        </div>
                      )}
                      {header.column.getCanFilter() && (
                        <div>
                          <Filter column={header.column} table={table} />
                        </div>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
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
    <FormControl fullWidth>
      <Select
        value={columnFilterValue || ""}
        onChange={(e) => column.setFilterValue(e.target.value)}

        sx={{
          height: '30px', // Adjust the height as needed
          padding: '0 14px',
          '& .MuiSelect-select': {
            height: '100%',
            display: 'flex',
            alignItems: 'center',
          },
        }}
      >
        <MenuItem value="">All</MenuItem>
        {sortedUniqueValues.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ) : filterVariant === "range" ? (
    <div>
      <TextField
        type="number"
        label={`Min (${column.getFacetedMinMaxValues()?.[0] ?? ""})`}
        value={(columnFilterValue ? columnFilterValue[0] : "") || ""}
        onChange={(e) =>
          column.setFilterValue((old) => [e.target.value, old?.[1]])
        }
        style={{ marginRight: '10px' }}
      />
      <TextField
        type="number"
        label={`Max (${column.getFacetedMinMaxValues()?.[1] ?? ""})`}
        value={(columnFilterValue ? columnFilterValue[1] : "") || ""}
        onChange={(e) =>
          column.setFilterValue((old) => [old?.[0], e.target.value])
        }
      />
    </div>
  ) : null;
}

function DebouncedInput({ value: initialValue, onChange, debounce = 500, ...props }) {
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
    <TextField
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default GetAllEmpAttendance;