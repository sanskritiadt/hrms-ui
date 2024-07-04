import React, { useState, useEffect, useMemo } from "react";
import { Table } from "react-bootstrap";
import { Edit as EditIcon } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import LoadingPage from "./LoadingPage";
import ViewApprRewardHistModal from "./ViewApprRewardHistModal";

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
import { object } from "yup";

function GetAllEmpAppraisalDetails() {
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [appraisalHistory, setAppraisalHistory] = useState([]);
  const [showAppraisalHistoryModal, setShowAppraisalHistoryModal] = useState(false);
  const [type, setType] = useState('');
  const [empId, setEmpId] = useState();

  // useEffect(() => {
  //   axios
  //     .get("/apigateway/payroll/salarydetails/getAllEmployeesWithLatestAppraisal", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       setData(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       toast.error(error.response.data.message || "Error fetching details");
  //       setLoading(false);
  //     });
  // }, [token]);

  useEffect(() => {
    fetchAppraisal(currentPage);
  }, [currentPage]);

  const fetchAppraisal = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`/apigateway/payroll/salarydetails/getAllEmployeesWithLatestAppraisal`, {
        params: {
          page: page - 1,
          size: 10, // assuming 10 employees per page
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        setData(response.data.content);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      }catch(error){
          console.log(error);
          toast.error(error.response.data.message || "Error fetching details");
          setLoading(false);
        };
  };


  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        meta: { filterVariant: false },
      },
      {
        accessorKey: "amount",
        header: "Amount",
        meta: { filterVariant: false },
      },
      {
        accessorKey: "salary",
        header: "Salary",
        meta: { filterVariant: false },
      },
      {
        accessorKey: "appraisalDate",
        header: "Date",
        meta: { filterVariant: false },
      },
      {
        accessorKey: "bonus",
        header: "Bonus",
        meta: { filterVariant: false },
      },
      {
        accessorKey: "variable",
        header: "Variable",
        meta: { filterVariant: false },
      },
      {
        accessorKey: "history",
        header: "Appraisal History",
        meta: { filterable: false },
        cell: (cell) => (
            <Button id="history"
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleAppraisalHistoryOnClick(cell.row.original.empId)}
            //onClick={handleAppraisalHistoryOnClick1}
            >
              View Appraisal
            </Button>
          ),
      },
      {
        accessorKey: "view",
        header: "View Rewards",
        meta: { filterable: false },
        cell: (cell) => (
            <Button id="reward"
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleRewardHistoryOnClick(cell.row.original.empId)}
              //onClick={handleAppraisalHistoryOnClick2}
            >View Reward
            </Button>
          ),
      },
    ],
    []
  );
  // const handleAppraisalHistoryOnClick1 = () => {
  //   setAppraisalHistory(null);
  //   setShowAppraisalHistoryModal(true);
  //   setType('history')
  // }
  // const handleAppraisalHistoryOnClick2 = () => {
  //   setAppraisalHistory(null);
  //   setShowAppraisalHistoryModal(true);
  //   setType('reward')
  // }
  const handleAppraisalHistoryOnClick = (empId) => {
    axios
      .get(`/apigateway/payroll/salarydetails/getAllAppraisalDetailsbyId/${empId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAppraisalHistory(response.data);
        setShowAppraisalHistoryModal(true);
        setType('history');
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data || "Error fetching appraisal history");
      });
  };

  const handleRewardHistoryOnClick = (empId) => {
    axios
      .get(`/apigateway/payroll/salarydetails/getRewardDetails/${empId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAppraisalHistory(response.data);
        setShowAppraisalHistoryModal(true);
        setType('reward');
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data || "Error fetching reward history");
      });
  };
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
              Appraisal Details
            </li>
          </ol>
        </nav>
      </div>
      <div style={{ margin: "25px 100px", width: "820px", height: "750px" }}>
        <h1 className="Heading1">Appraisal Details</h1>
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
        <nav>
            <ul className="pagination justify-content-center mt-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                  <button onClick={() => setCurrentPage(index + 1)} className="page-link mx-1">
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
      </div>
      
      <ViewApprRewardHistModal
        show={showAppraisalHistoryModal}
        onHide={() => setShowAppraisalHistoryModal(false)}
        appraisalHistory={appraisalHistory}
        type={type}
      />
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
export default GetAllEmpAppraisalDetails;
