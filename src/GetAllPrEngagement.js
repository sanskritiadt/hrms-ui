import React, { useState, useEffect, useMemo } from "react";
import { Table, Modal, Form } from "react-bootstrap";
import { EditOutlined as EditIcon } from "@mui/icons-material"; // Updated import
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

const years = Array.from(
  new Array(10),
  (val, index) => new Date().getFullYear() + index
);
function RevenueDetailsModal({
  show,
  onHide,
  revenueDetails,
  currentDetail,
  projectId,
  token,
  onSave,
  handleAddNewRevenueDetail,
  handleEditRevenueDetail,
}) {
  const [formData, setFormData] = useState({
    year: "",
    month: "",
    projectRevenue: "",
    resourceExpense: "",
    contractorRevenue: "",
  });

  useEffect(() => {
    if (currentDetail) {
      setFormData({
        year: currentDetail.year || "",
        month: currentDetail.month || "",
        projectRevenue: currentDetail.projectRevenue || "",
        resourceExpense: currentDetail.resourceExpense || "",
        contractorRevenue: currentDetail.contractorRevenue || "",
      });
    }
  }, [currentDetail]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Regular expression to match integers and decimals
    const numericValue = /^[+-]?([0-9]*[.])?[0-9]+$/;

    // Check if the entered value is a valid numeric value
    if (name !== 'month' && (value === '' || numericValue.test(value))) {
      // Update formData state with the new value
      setFormData({
        ...formData,
        [name]: value
      });
    } else if (name === 'month') {
      // Allow non-numeric values for month
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSave = () => {
    const newId = currentDetail && currentDetail.id ? currentDetail.id : null;
    axios
      .post(
        `/apigateway/hrms/engagement/saveProjectRevenue`,
        {
          id: newId,
          projectEngagement: {
            projectId: projectId,
          },
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        toast.success(response.data, {
          position: "top-center",
          theme: "colored",
        });
        onSave();
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error.response.data.message || "Error saving revenue detail"
        );
      });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      style={{ maxWidth: "100%", margin: "auto" }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Revenue Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ overflowX: "auto" }}>
          <Table striped bordered hover style={{ minWidth: "100%" }}>
            <thead style={{ backgroundColor: "#f8d7da", textAlign: "center" }}>
              <tr>
                <th style={{ width: "20%" }}>End Client</th>
                <th style={{ width: "15%" }}>Year</th>
                <th style={{ width: "15%" }}>Month</th>
                <th style={{ width: "15%" }}>Project Revenue</th>
                <th style={{ width: "15%" }}>Resource Expense</th>
                <th style={{ width: "15%" }}>Contractor Expense</th>
                <th style={{ width: "5%" }}>Edit</th>
              </tr>
            </thead>
            <tbody>
              {revenueDetails.map((detail) => (
                <tr key={detail.id} style={{ textAlign: "center" }}>
                  <td>{detail.projectEngagement.endClient}</td>
                  <td>{detail.year}</td>
                  <td>{detail.month}</td>
                  <td>{detail.projectRevenue}</td>
                  <td>{detail.resourceExpense}</td>
                  <td>{detail.contractorRevenue}</td>
                  <td>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditRevenueDetail(detail)}
                    >
                      <EditIcon />
                    </Button>
                  </td>
                </tr>
              ))}
              <tr style={{ textAlign: "center" }}>
                <td colSpan={7}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddNewRevenueDetail}
                  >
                    Add New
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <Form>
          <Form.Group controlId="formYear">
            <Form.Label>Year</Form.Label>
            <Form.Control
              as="select"
              name="year"
              value={formData.year}
              onChange={handleChange}
            >
              <option value="">Select Year</option>
              {Array.from(
                { length: 11 },
                (_, i) => new Date().getFullYear() - 3 + i
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formMonth">
            <Form.Label>Month</Form.Label>
            <Form.Control
              as="select"
              name="month"
              value={formData.month}
              onChange={handleChange}
            >
              <option value="">Select Month</option>
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formProjectRevenue">
            <Form.Label>Project Revenue</Form.Label>
            <Form.Control
              type="text"
              name="projectRevenue"
              value={formData.projectRevenue}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formResourceExpense">
            <Form.Label>Resource Expense</Form.Label>
            <Form.Control
              type="text"
              name="resourceExpense"
              value={formData.resourceExpense}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formContractorExpense">
            <Form.Label>Contractor Expense</Form.Label>
            <Form.Control
              type="text"
              name="contractorRevenue"
              value={formData.contractorRevenue}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}


function GetAllPrEngagement() {
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [revenueDetails, setRevenueDetails] = useState([]);
  const [showRevenueModal, setShowRevenueModal] = useState(false);
  const [columnFilters, setColumnFilters] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentRevenueDetail, setCurrentRevenueDetail] = useState(null);

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

  const handleRevenueDetailsClick = (projectId) => {
    axios
      .get(
        `/apigateway/hrms/engagement/getRevenueDetailsByprojectId/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setRevenueDetails(response.data);
        setSelectedProject(projectId);
        setShowRevenueModal(true);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error.response.data.message || "Error fetching revenue details"
        );
      });
  };

  const handleAddNewRevenueDetail = () => {
    setCurrentRevenueDetail({
      id: null,
      projectEngagement: { projectId: selectedProject },
      year: "",
      month: "",
      projectRevenue: "",
      resourceExpense: "",
    });
    setShowRevenueModal(true);
  };

  const handleEditRevenueDetail = (detail) => {
    setCurrentRevenueDetail(detail);
    setShowRevenueModal(true);
  };

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
        accessorKey: "revenueDetails",
        header: "Revenue Details",
        meta: { filterable: false },
        cell: (cell) => (
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              handleRevenueDetailsClick(cell.row.original.projectId)
            }
          >
            View
          </Button>
        ),
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

      <RevenueDetailsModal
        show={showRevenueModal}
        onHide={() => setShowRevenueModal(false)}
        revenueDetails={revenueDetails}
        currentDetail={currentRevenueDetail}
        projectId={selectedProject}
        token={token}
        onSave={() => {
          setShowRevenueModal(false);
          handleRevenueDetailsClick(selectedProject);
        }}
        handleAddNewRevenueDetail={handleAddNewRevenueDetail}
        handleEditRevenueDetail={handleEditRevenueDetail}
      />
    </div>
  );
}



// function RevenueDetailsModal({
//   show,
//   onHide,
//   revenueDetails,
//   currentDetail,
//   projectId,
//   token,
//   onSave,
//   handleAddNewRevenueDetail,
//   handleEditRevenueDetail,
// }) {
//   const [formData, setFormData] = useState({
//     year: "",
//     month: "",
//     projectRevenue: "",
//     resourceExpense: "",
//     contractorRevenue: "",
//   });

//   useEffect(() => {
//     if (currentDetail) {
//       setFormData({
//         year: currentDetail.year || "",
//         month: currentDetail.month || "",
//         projectRevenue: currentDetail.projectRevenue || "",
//         resourceExpense: currentDetail.resourceExpense || "",
//         contractorRevenue: currentDetail.contractorRevenue || "",
//       });
//     }
//   }, [currentDetail]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
  
//     // Regular expression to match integers and decimals
//     const numericValue = /^[+-]?([0-9]*[.])?[0-9]+$/;
  
//     // Check if the entered value is a valid numeric value
//     if (value === '' || numericValue.test(value)) {
//       // Update formData state with the new value
//       setFormData({
//         ...formData,
//         [name]: value
//       });
//     }
//     // If the entered value is not a valid numeric value, do not update formData
//     // This will prevent non-numeric values from being displayed
//   };

//   const handleSave = () => {
//     const newId = currentDetail && currentDetail.id ? currentDetail.id : null;
//     axios
//       .post(
//         `/apigateway/hrms/engagement/saveProjectRevenue`,
//         {
//           id: newId,
//           projectEngagement: {
//             projectId: projectId,
//           },
//           ...formData,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response.data);
//         toast.success(response.data, {
//           position: "top-center",
//           theme: "colored",
//         });
//         onSave();
//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error(
//           error.response.data.message || "Error saving revenue detail"
//         );
//       });
//   };

//   return (
//     <Modal
//       show={show}
//       onHide={onHide}
//       style={{ maxWidth: "100%", margin: "auto" }}
//     >
//       <Modal.Header closeButton>
//         <Modal.Title>Revenue Details</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <div style={{ overflowX: "auto" }}>
//           <Table striped bordered hover style={{ minWidth: "100%" }}>
//             <thead style={{ backgroundColor: "#f8d7da", textAlign: "center" }}>
//               <tr>
//                 <th style={{ width: "20%" }}>End Client</th>
//                 <th style={{ width: "15%" }}>Year</th>
//                 <th style={{ width: "15%" }}>Month</th>
//                 <th style={{ width: "15%" }}>Project Revenue</th>
//                 <th style={{ width: "15%" }}>Resource Expense</th>
//                 <th style={{ width: "15%" }}>Contractor Expense</th>
//                 <th style={{ width: "5%" }}>Edit</th>
//               </tr>
//             </thead>
//             <tbody>
//               {revenueDetails.map((detail) => (
//                 <tr key={detail.id} style={{ textAlign: "center" }}>
//                   <td>{detail.projectEngagement.endClient}</td>
//                   <td>{detail.year}</td>
//                   <td>{detail.month}</td>
//                   <td>{detail.projectRevenue}</td>
//                   <td>{detail.resourceExpense}</td>
//                   <td>{detail.contractorRevenue}</td>
//                   <td>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={() => handleEditRevenueDetail(detail)}
//                     >
//                       <EditIcon />
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//               <tr style={{ textAlign: "center" }}>
//                 <td colSpan={7}>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleAddNewRevenueDetail}
//                   >
//                     Add New
//                   </Button>
//                 </td>
//               </tr>
//             </tbody>
//           </Table>
//         </div>
//         <Form>
//           <Form.Group controlId="formYear">
//             <Form.Label>Year</Form.Label>
//             <Form.Control
//               as="select"
//               name="year"
//               value={formData.year}
//               onChange={handleChange}
//             >
//               <option value="">Select Year</option>
//               {Array.from(
//                 { length: 11 },
//                 (_, i) => new Date().getFullYear() - 3 + i
//               ).map((year) => (
//                 <option key={year} value={year}>
//                   {year}
//                 </option>
//               ))}
//             </Form.Control>
//           </Form.Group>
//           <Form.Group controlId="formMonth">
//             <Form.Label>Month</Form.Label>
//             <Form.Control
//               as="select"
//               name="month"
//               value={formData.month}
//               onChange={handleChange}
//             >
//               <option value="">Select Month</option>
//               {[
//                 "January",
//                 "February",
//                 "March",
//                 "April",
//                 "May",
//                 "June",
//                 "July",
//                 "August",
//                 "September",
//                 "October",
//                 "November",
//                 "December",
//               ].map((month, index) => (
//                 <option key={index} value={month}>
//                   {month}
//                 </option>
//               ))}
//             </Form.Control>
//           </Form.Group>
//           <Form.Group controlId="formProjectRevenue">
//             <Form.Label>Project Revenue</Form.Label>
//             <Form.Control
//               type="text"
//               name="projectRevenue"
//               value={formData.projectRevenue}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="formResourceExpense">
//             <Form.Label>Resource Expense</Form.Label>
//             <Form.Control
//               type="text"
//               name="resourceExpense"
//               value={formData.resourceExpense}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="formContractorExpense">
//             <Form.Label>Contractor Expense</Form.Label>
//             <Form.Control
//               type="text"
//               name="contractorRevenue"
//               value={formData.contractorRevenue}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Button variant="primary" onClick={handleSave}>
//             Save
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// }

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
