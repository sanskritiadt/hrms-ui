// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';
// import LoadingPage from './LoadingPage';
// import { useSelector } from 'react-redux';
// const GetAllEmpAttendance = () => {
//   // const token = localStorage.getItem('response-token');
//   // const empid = localStorage.getItem('EmpID');
//   const  token = useSelector((state) => state.auth.token);
//   const  empid = useSelector((state) => state.auth.empId);

//   const [getAttendence, setAttendence] = useState({
//     fromDate: '',
//     toDate: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [getData, setData] = useState([]);

//   const submit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     axios
//       .get(`/apigateway/payroll/timeSheet/allEmpAttendence?fromDate=${getAttendence.fromDate}&toDate=${getAttendence.toDate}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       })
//       .then(response => {
//         setData(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         toast.error( error.response.data.message || "Error fetching details" );
//         console.error("Error happened:", error);
//         setLoading(false);
//       });
//   };

//   const handle = (e) => {
//     const newDate = { ...getAttendence };
//     newDate[e.target.id] = e.target.value;
//     setAttendence(newDate);
//     console.log(newDate);
//   };

//   const exportToExcel = () => {
//     setLoading(true);
//     axios({
//       url: `/apigateway/payroll/timeSheet/exporttoexcel?fromDate=${getAttendence.fromDate}&toDate=${getAttendence.toDate}`,
//       method: 'GET',
//       responseType: 'blob', 
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }).then(response => {
//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         const link = document.createElement('a');
//         link.href = url;
//         link.setAttribute('download', 'timesheet.xlsx'); 
//         document.body.appendChild(link);
//         link.click();
//         setLoading(false);
//       })
//       .catch(error => {
//         toast.error( error.response.data.message || "Error uploading excel." );
//         console.error("Error happened:", error);
//         setLoading(false);
//       });
//   };

//   const [screenWidth, setScreenWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => {
//       setScreenWidth(window.innerWidth);
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <div>
//       <div className='mt-3'>
//         <nav aria-label='breadcrumb' style={{ '--bs-breadcrumb-divider': "'>>'" }}>
//           <ol className='breadcrumb' style={{ color: 'white', marginLeft: '20px' }}>
//             <li className='breadcrumb-item'>
//               <Link to='/'>Home</Link>{' '}
//             </li>
//             <li className='breadcrumb-item'>
//               <a href=''>Employee Management</a>
//             </li>
//             <li className='breadcrumb-item active' aria-current='page'>
//               Employee Attendance{' '}
//             </li>
//           </ol>
//         </nav>
//       </div>
//       <div className='d-flex justify-content-center  ' style={{ width: screenWidth - 50 }}>
//         <div>
//           <div className='pt-2'>
//             <h1 className='Heading1 my-4'>Employee Attendance</h1>
//             <form onSubmit={(e) => { submit(e) }} >
//               {loading ? <LoadingPage /> : ''}
//               <div className='mb-2 d-grid gap-1 d-md-flex justify-content-center my-4'>
//                 <label className='pt-2 fs-5 mb-0' htmlFor='fromdate'>fromDate:</label>
//                 <input onChange={(e) => { handle(e) }} value={getAttendence.fromDate}
//                   type='date' className='form-control mb-0'
//                   id='fromDate' />
//                 <label className='pt-2 fs-5 mb-0' htmlFor='todate'>toDate:</label>
//                 <input onChange={(e) => { handle(e) }} value={getAttendence.toDate}
//                   type='date' className='form-control mb-0'
//                   id='toDate' />
//                 <button className='btn btn-outline-primary mt-0 '>Get</button>
//               </div>
//             </form>
//             <button onClick={exportToExcel} className='btn btn-primary mt-0'>Export to Excel</button>
//           </div>
//           <div className='table-responsive-sm my-4'>
//             <table border='2' className='table table-striped table-bordered'>
//               <thead className='head'>
//                 <tr className='table-danger table-striped'>
//                   <th>EMPLOYEE NAME</th>
//                   <th>EMPLOYEE ID</th>
//                   <th>CHECK OUT</th>
//                   <th>CHECK IN</th>
//                   <th>WORKING HOUR</th>
//                   <th>DATE</th>
//                   <th>STATUS</th>
//                   <th>MONTH</th>
//                   <th>YEAR</th>
//                   <th>LEAVE INTERVAL</th>
//                   <th>INTERVALSTATUS</th>
//                 </tr>
//               </thead>
//               <tbody className='body'>
//                 {getData.map((getDataa) => (
//                   <tr key={getDataa.timeSheetId}>
//                     <td>{getDataa.employeeName}</td>
//                     <td>{getDataa.employeeId}</td>
//                     <td>{getDataa.checkOut}</td>
//                     <td>{getDataa.checkIn}</td>
//                     <td>{getDataa.workingHour}</td>
//                     <td>{getDataa.date}</td>
//                     <td>{getDataa.status}</td>
//                     <td>{getDataa.month}</td>
//                     <td>{getDataa.year}</td>
//                     <td>{getDataa.leaveInterval}</td>
//                     <td>{getDataa.intervalStatus}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default GetAllEmpAttendance;



import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import LoadingPage from './LoadingPage';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
const GetAllEmpAttendance = () => {
    // const token = localStorage.getItem("response-token");
    // const empid = localStorage.getItem("EmpID");
    const  token = useSelector((state) => state.auth.token);
    const [getAttendence, setAttendence] = useState({
        fromDate: "",
        toDate: ""
    });
    const [loading, setLoading] = useState(false);
    const [getData, setData] = useState([]);
    const [filters, setFilters] = useState({
        employeeName: "",
        employeeId: "",
        checkOut: "",
        checkIn: "",
        workingHour: "",
        date: "",
        status: "",
        month: "",
        year: "",
        leaveInterval: "",
        intervalStatus: ""
    });

    useEffect(() => {
        if (getAttendence.fromDate && getAttendence.toDate) {
            setLoading(true);
            axios.get(`/apigateway/payroll/timeSheet/allEmpAttendence?fromDate=${getAttendence.fromDate}&toDate=${getAttendence.toDate}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                setData(response.data);
                setLoading(false);
            }).catch(error => {
                toast.error("Error occurred, try again later.", { position: "top-center", theme: "colored" });
                setLoading(false);
            });
        }
    }, [getAttendence.fromDate, getAttendence.toDate]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            employeeName: "",
            employeeId: "",
            checkOut: "",
            checkIn: "",
            workingHour: "",
            date: "",
            status: "",
            month: "",
            year: "",
            leaveInterval: "",
            intervalStatus: ""
        });
    };

    const getUniqueValues = (key) => {
        const uniqueValues = new Set();
        getData.forEach((item) => {
            if (item[key]) {
                uniqueValues.add(item[key]);
            }
        });
        return Array.from(uniqueValues).sort();
    };

    const filteredData = getData.filter(data => {
        for (let key in filters) {
            if (filters[key] && !String(data[key]).toLowerCase().includes(filters[key].toLowerCase())) {
                return false;
            }
        }
        return true;
    });

    const handle = (e) => {
        const newDate = { ...getAttendence };
        newDate[e.target.id] = e.target.value;
        setAttendence(newDate);
    };

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <div className='mt-3'>
                <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
                    <ol className="breadcrumb" style={{ color: "white", marginLeft: '20px' }}>
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="">Employee Management</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Employee Attendance</li>
                    </ol>
                </nav>
            </div>
            <div className="d-flex justify-content-center" style={{ width: screenWidth - 50 }}>
                <div>
                    <div className="pt-2">
                        <h1 className='Heading1 my-4'>Employee Attendance</h1>
                        <div className="mb-2 d-grid gap-1 d-md-flex justify-content-center my-4">
                            <label className="pt-2 fs-5 mb-0" htmlFor="fromDate">From Date:</label>
                            <input
                                onChange={handle}
                                value={getAttendence.fromDate}
                                type="date"
                                className="form-control mb-0"
                                id="fromDate"
                            />
                            <label className="pt-2 fs-5 mb-0" htmlFor="toDate">To Date:</label>
                            <input
                                onChange={handle}
                                value={getAttendence.toDate}
                                type="date"
                                className="form-control mb-0"
                                id="toDate"
                            />
                            <button className="btn btn-primary mt-0" onClick={() => { /* Trigger your data fetch logic here if needed */ }}>Get</button>
                        </div>
                    </div>

                    {loading && <LoadingPage />}

                    <div className="table-responsive-sm my-4">
                        <div className="mb-2 d-grid gap-1 d-md-flex justify-content-center">
                            <Button
                                variant="outline-primary"
                                onClick={clearFilters}
                            >
                                Clear Filters
                            </Button>
                        </div>
                        <table border='2' className="table table-striped table-bordered">
                            <thead className="head">
                                <tr className="table-danger table-striped">
                                    <th>
                                        <select
                                            name="employeeName"
                                            value={filters.employeeName}
                                            onChange={handleFilterChange}
                                            className="form-control"
                                        >
                                            <option value="">All</option>
                                            {getUniqueValues("employeeName").map(value => (
                                                <option key={value} value={value}>{value}</option>
                                            ))}
                                        </select>
                                    </th>
                                    <th>
                                        <select
                                            name="employeeId"
                                            value={filters.employeeId}
                                            onChange={handleFilterChange}
                                            className="form-control"
                                        >
                                            <option value="">All</option>
                                            {getUniqueValues("employeeId").map(value => (
                                                <option key={value} value={value}>{value}</option>
                                            ))}
                                        </select>
                                    </th>
                                    <th>
                                        <select
                                            name="checkOut"
                                            value={filters.checkOut}
                                            onChange={handleFilterChange}
                                            className="form-control"
                                        >
                                            <option value="">All</option>
                                            {getUniqueValues("checkOut").map(value => (
                                                <option key={value} value={value}>{value}</option>
                                            ))}
                                        </select>
                                    </th>
                                    <th>
                                        <select
                                            name="checkIn"
                                            value={filters.checkIn}
                                            onChange={handleFilterChange}
                                            className="form-control"
                                        >
                                            <option value="">All</option>
                                            {getUniqueValues("checkIn").map(value => (
                                                <option key={value} value={value}>{value}</option>
                                            ))}
                                        </select>
                                    </th>
                                    <th>
                                        <select
                                            name="workingHour"
                                            value={filters.workingHour}
                                            onChange={handleFilterChange}
                                            className="form-control"
                                        >
                                            <option value="">All</option>
                                            {getUniqueValues("workingHour").map(value => (
                                                <option key={value} value={value}>{value}</option>
                                            ))}
                                        </select>
                                    </th>
                                    <th>
                                        <input
                                            type="date"
                                            name="date"
                                            value={filters.date}
                                            onChange={handleFilterChange}
                                            className="form-control"
                                        />
                                    </th>
                                    <th>
                                        <select
                                            name="status"
                                            value={filters.status}
                                            onChange={handleFilterChange}
                                            className="form-control"
                                        >
                                            <option value="">All</option>
                                            {getUniqueValues("status").map(value => (
                                                <option key={value} value={value}>{value}</option>
                                            ))}
                                        </select>
                                    </th>
                                    <th>
                                        <select
                                            name="month"
                                            value={filters.month}
                                            onChange={handleFilterChange}
                                            className="form-control"
                                        >
                                            <option value="">All</option>
                                            {getUniqueValues("month").map(value => (
                                                <option key={value} value={value}>{value}</option>
                                            ))}
                                        </select>
                                    </th>
                                    <th>
                                        <select
                                            name="year"
                                            value={filters.year}
                                            onChange={handleFilterChange}
                                            className="form-control"
                                        >
                                            <option value="">All</option>
                                            {getUniqueValues("year").map(value => (
                                                <option key={value} value={value}>{value}</option>
                                            ))}
                                        </select>
                                    </th>
                                    <th>
                                        <select
                                            name="leaveInterval"
                                            value={filters.leaveInterval}
                                            onChange={handleFilterChange}
                                            className="form-control"
                                        >
                                            <option value="">All</option>
                                            {getUniqueValues("leaveInterval").map(value => (
                                                <option key={value} value={value}>{value}</option>
                                            ))}
                                        </select>
                                    </th>
                                    <th>
                                        <select
                                            name="intervalStatus"
                                            value={filters.intervalStatus}
                                            onChange={handleFilterChange}
                                            className="form-control"
                                        >
                                            <option value="">All</option>
                                            {getUniqueValues("intervalStatus").map(value => (
                                                <option key={value} value={value}>{value}</option>
                                            ))}
                                        </select>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="body">
                                {filteredData.map((data) => (
                                    <tr key={data.timeSheetId}>
                                        <td>{data.employeeName}</td>
                                        <td>{data.employeeId}</td>
                                        <td>{data.checkOut}</td>
                                        <td>{data.checkIn}</td>
                                        <td>{data.workingHour}</td>
                                        <td>{data.date}</td>
                                        <td>{data.status}</td>
                                        <td>{data.month}</td>
                                        <td>{data.year}</td>
                                        <td>{data.leaveInterval}</td>
                                        <td>{data.intervalStatus}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetAllEmpAttendance;

