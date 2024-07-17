// // import axios from "axios";
// // import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import { toast } from "react-toastify";
// // import "./Hrmscss/App.css";
// // import { Button } from "react-bootstrap";
// // import LoadingPage from "./LoadingPage";
// // import { useSelector } from 'react-redux';
// // const GetAllAssets = () => {
// //   // const token = localStorage.getItem("response-token");
// //   const  token = useSelector((state) => state.auth.token);
// //   const [assets, setAssets] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [screenWidth, setScreenWidth] = useState(window.innerWidth);

// //   useEffect(() => {
// //     const fetchAssets = async () => {
// //       try {
// //         const response = await axios.get(
// //           `/apigateway/hrms/masterAsset/getAllMasterAsset`,
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           }
// //         );
// //         setAssets(response.data);
// //         setLoading(false);
// //       } catch (error) {
// //         console.error(error);
// //         toast.error(error.response.data.message || "Error fetching assets.");
// //         setLoading(false);
// //       }
// //     };
// //     fetchAssets();

// //     const handleResize = () => {
// //       setScreenWidth(window.innerWidth);
// //     };

// //     window.addEventListener("resize", handleResize);

// //     return () => {
// //       window.removeEventListener("resize", handleResize);
// //     };
   
// //   }, [token]);

// //   return (
// //     <div className="table-responsive-sm">
// //       {loading ? <LoadingPage /> : ""}
// //       <div className=" mt-3">
// //         <nav
// //           aria-label="breadcrumb"
// //           style={{ "--bs-breadcrumb-divider": "'>>'" }}
// //         >
// //           <ol className="breadcrumb" style={{ color: "white" }}>
// //             <li className="breadcrumb-item">
// //               <Link to="/">Home</Link>{" "}
// //             </li>
// //             <li className="breadcrumb-item">
// //               <a href="">Employee Management</a>
// //             </li>
// //             <li className="breadcrumb-item active" aria-current="page">
// //               Employee Assets
// //             </li>
// //           </ol>
// //         </nav>
// //       </div>
// //       <div
// //         className="d-flex justify-content-center  "
// //         style={{ width: screenWidth - 70 }}
// //       >
// //       <div className="table-responsive-sm"style={{ width: "180vh", overflowX: "auto" }}>
// //           <div className="my-4">
// //             <h1 className="Heading1">Employee Assets</h1>
// //           </div>
// //       <table className="table table-striped table-bordered" >
// //         <thead className="head">
// //           <tr className="table-danger table-striped">
// //             <th>ID</th>
// //             <th>ASSET USER</th>
// //             <th>ASSET NAME</th>
// //             <th>ASSET ID</th>
// //             <th>ASSET NUMBER</th>
// //             <th>ASSET TYPE</th>
// //             <th>PROCESSOR</th>
// //             <th>RAM</th>
// //             <th>DISK TYPE</th>
// //             <th>OPERATING SYSTEM</th>
// //             <th>PURCHASE DATE</th>
// //             <th>WARRANTY</th>
// //             <th>WARRANTY DATE</th>
// //             <th>STATUS</th>
// //             <th>Update</th>
// //           </tr>
// //         </thead>
// //         <tbody className="body">
// //           {assets.map((asset) => (
// //             <tr key={asset.id}>
// //               <td>{asset.id}</td>
// //               <td>{asset.assetUser}</td>
// //               <td>{asset.assetName}</td>
// //               <td>{asset.assetId}</td>
// //               <td>{asset.assetNo}</td>
// //               <td>{asset.assetType}</td>
// //               <td>{asset.processor}</td>
// //               <td>{asset.ram}</td>
// //               <td>{asset.diskType}</td>
// //               <td>{asset.operatingSystem}</td>
// //               <td>{asset.purchesDate}</td>
// //               <td>{asset.warrenty}</td>
// //               <td>{asset.warrentyDate}</td>
// //               <td>{asset.status}</td>
// //               <td>
// //                 <Link Link to={`/EditAssets/${asset.id}`}>
// //                   <Button variant="outline-primary" type="button">
// //                     Edit
// //                   </Button>
// //                 </Link>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //       </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default GetAllAssets;

// import React, { useState, useEffect, useMemo } from "react";
// import { Table } from "react-bootstrap";
// import {
//     Edit as EditIcon,
//   } from "@mui/icons-material";
//   import {
//     Button,
//     IconButton,
//   } from "@mui/material";
// import { toast } from "react-toastify";
// import { Link  } from "react-router-dom";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import LoadingPage from "./LoadingPage";
// import {
//   useReactTable,
//   flexRender,
//   getCoreRowModel,
//   getFacetedMinMaxValues,
//   getFacetedRowModel,
//   getFacetedUniqueValues,
//   getFilteredRowModel,
//   getSortedRowModel,
// } from "@tanstack/react-table";

// function GetAllAssets() {
//   const token = useSelector((state) => state.auth.token);
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState([]);
//   const [columnFilters, setColumnFilters] = useState([]);

//   useEffect(() => {
//     axios
//       .get("/apigateway/hrms/masterAsset/getAllMasterAsset", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setData(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error(error.response.data.message || "Error fetching details");
//         setLoading(false);
//       });
//   }, [token]);

//   const columns = useMemo(() => [
//     {
//       accessorKey: 'assetUser',
//       header: 'Asset User',
//       meta: { filterVariant: 'select' }
//     },
//     {
//       accessorKey: 'assetName',
//       header: 'Asset Name',
//       meta: { filterVariant: 'select' }
//     },
//     {
//       accessorKey: 'assetId',
//       header: 'Asset ID',
//       meta: { filterVariant: 'select' }
//     },
//     {
//       accessorKey: 'assetNo',
//       header: 'Asset No',
//       meta: { filterVariant: 'select' }
//     },
//     {
//       accessorKey: 'assetType',
//       header: 'Asset Type',
//       meta: { filterVariant: 'select' }
//     },
//     {
//       accessorKey: 'processor',
//       header: 'Processor',
//       meta: { filterVariant: 'select' }
//     },
//     {
//       accessorKey: 'ram',
//       header: 'RAM',
//       meta: { filterVariant: 'select' }
//     },
//     {
//       accessorKey: 'diskType',
//       header: 'Disk Type',
//       meta: { filterVariant: 'select' }
//     },
//     {
//       accessorKey: 'operatingSystem',
//       header: 'Operating System',
//       meta: { filterVariant: 'select' }
//     },
//     {
//       accessorKey: 'purchesDate',
//       header: 'Purchase Date',
//       meta: { filterVariant: 'select' }
//     },
//     {
//       accessorKey: 'warrenty',
//       header: 'Warranty',
//       meta: { filterVariant: 'select' }
//     },
//     {
//       accessorKey: 'warrentyDate',
//       header: 'Warranty Date',
//       meta: { filterVariant: 'select' }
//     },
//     {
//       accessorKey: 'status',
//       header: 'Status',
//       meta: { filterVariant: 'select' }
//     },
//     {
//       accessorKey: 'edit',
//       header: 'Edit',
//       meta: { filterable: false },
//       cell: (cell) => (
//         <Link to={`/EditAssets/${cell.row.original.id}`}>
//           <IconButton color="primary">
//               <EditIcon />
//             </IconButton>
//         </Link>
//       )
//     }
//   ], []);

//   const table = useReactTable({
//     data: data,
//     columns,
//     state: { columnFilters },
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFacetedRowModel: getFacetedRowModel(),
//     getFacetedUniqueValues: getFacetedUniqueValues(),
//     getFacetedMinMaxValues: getFacetedMinMaxValues(),
//     debugTable: true,
//     debugHeaders: true,
//     debugColumns: false,
//   });


//   return (
//     <div className="mt-3">
//       {loading ? <LoadingPage /> : ""}
//       <div className="mt-3">
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
//               <Link to="">Employee Management</Link>
//             </li>
//             <li className="breadcrumb-item active" aria-current="page">
//             Employee Assets
//             </li>
//           </ol>
//         </nav>
//       </div>
//       <div style={{ margin: "25px 100px", width: "820px", height: "750px" }}>
//         <h1 className="Heading1"> Employee Assets</h1>
//         <div>
//         <Table striped bordered hover className="custom-table">
//             <thead className="table-danger table-striped">
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <tr key={headerGroup.id}>
//                   {headerGroup.headers.map((header) => (
//                     <th key={header.id} colSpan={header.colSpan}>
//                       {header.isPlaceholder ? null : (
//                         <>
//                           <div
//                             className={
//                               header.column.getCanSort()
//                                 ? "cursor-pointer select-none"
//                                 : ""
//                             }
//                             onClick={header.column.getToggleSortingHandler()}
//                           >
//                             {flexRender(
//                               header.column.columnDef.header,
//                               header.getContext()
//                             )}
//                             {header.column.getIsSorted() === "asc"
//                               ? " 🔼"
//                               : header.column.getIsSorted() === "desc"
//                               ? " 🔽"
//                               : null}
//                           </div>
//                           {header.column.getCanFilter() ? (
//                             <div>
//                               <Filter column={header.column} />
//                             </div>
//                           ) : null}
//                         </>
//                       )}
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody className="body">
//               {table.getRowModel().rows.map((row) => (
//                 <tr key={row.id}>
//                   {row.getVisibleCells().map((cell) => (
//                     <td key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//             </Table>
//         </div>
//       </div>
//     </div>
//   );
// }


// function Filter({ column }) {
//     const { filterVariant } = column.columnDef.meta || {};
  
//     const columnFilterValue = column.getFilterValue();
  
//     const sortedUniqueValues = useMemo(
//       () =>
//         filterVariant === "select"
//           ? Array.from(column.getFacetedUniqueValues().keys()).sort()
//           : [],
//       [column.getFacetedUniqueValues(), filterVariant]
//     );
  
//     return filterVariant === "select" ? (
//       <select
//         onChange={(e) => column.setFilterValue(e.target.value)}
//         value={columnFilterValue?.toString() || ""}
//       >
//         <option value="">All</option>
//         {sortedUniqueValues.map((value) => (
//           <option key={value} value={value}>
//             {value}
//           </option>
//         ))}
//       </select>
//     ) : filterVariant === "range" ? (
//       <div>
//         <div className="flex space-x-2">
//           <DebouncedInput
//             type="number"
//             min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
//             max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
//             value={(columnFilterValue ? columnFilterValue[0] : "") ?? ""}
//             onChange={(e) =>
//               column.setFilterValue((old) => [e.target?.value, old?.[1]])
//           }
          
//             placeholder={`Min ${
//               column.getFacetedMinMaxValues()?.[0] !== undefined
//                 ? `(${column.getFacetedMinMaxValues()?.[0]})`
//                 : ""
//             }`}
//             className="w-24 border shadow rounded"
//           />
//           <DebouncedInput
//             type="number"
//             min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
//             max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
//             value={(columnFilterValue ? columnFilterValue[1] : "") ?? ""}
//             onChange={(e) =>
//               column.setFilterValue((old) => [e.target?.value, old?.[1]])
//           }
          
//             placeholder={`Max ${
//               column.getFacetedMinMaxValues()?.[1] !== undefined
//                 ? `(${column.getFacetedMinMaxValues()?.[1]})`
//                 : ""
//             }`}
//             className="w-24 border shadow rounded"
//           />
//         </div>
//         <div className="h-1" />
//       </div>
//     ) : null; 
//   }
  
//   function DebouncedInput({
//     value: initialValue,
//     onChange,
//     debounce = 500,
//     ...props
//   }) {
//     const [value, setValue] = useState(initialValue);
  
//     useEffect(() => {
//       setValue(initialValue);
//     }, [initialValue]);
  
//     useEffect(() => {
//       const timeout = setTimeout(() => {
//         onChange(value);
//       }, debounce);
  
//       return () => clearTimeout(timeout);
//     }, [value]);
  
//     return (
//       <input
//         {...props}
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//       />
//     );
//   }
// export default GetAllAssets;


import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import "react-toastify/dist/ReactToastify.css";
import ManageAsset from './ManageAsset';
import { useSelector } from 'react-redux';
import ManageUserAsset from "./ManageUserAsset";
import Divider from "@mui/material/Divider";
import ViewAssets from './ViewAssets'


export default function GetAllAssets() {
  const  token = useSelector((state) => state.auth.token);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(true);

  const [assetTypeData, setAssetTypeData] = useState([]);

  useEffect(() => {
    fetchAssetTypeData();
  }, []);

  const fetchAssetTypeData = async () => {
    try {
      setLoading(false);
      const response = await axios.get(
        `/apigateway/hrms/masterAsset/getAllAssetType`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAssetTypeData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching asset type data", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch asset type data"
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return (
    <div
      style={{
        width: screenWidth - 80,
        display: "flex",
        flexDirection: "column",
        marginLeft: "5vh",
      }}
    > 
      <Box
        display="flex"
        justifyContent="flex"
        alignItems="center"
        height="30vh"
        marginRight='5vh'
      >
        <ManageAsset assetTypeData={assetTypeData} fetchAssetTypeData={fetchAssetTypeData} setAssetTypeData={setAssetTypeData}/>
        <Divider orientation="vertical" flexItem sx={{  margin : "5vh", bgcolor: 'grey.700'}} />
        <ManageUserAsset assetTypeData={assetTypeData} fetchAssetTypeData={fetchAssetTypeData} setAssetTypeData={setAssetTypeData}/>
      </Box>
      <Divider sx={{  width: '100%', bgcolor: 'grey.700', marginBottom:'10px'}} />
      <ViewAssets assetTypeData={assetTypeData} fetchAssetTypeData={fetchAssetTypeData} setAssetTypeData={setAssetTypeData}/>
    </div>
  );
}
