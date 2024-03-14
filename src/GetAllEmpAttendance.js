import axios from 'axios'
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const GetAllEmpAttendance = () => {
    
    const token = localStorage.getItem("response-token")
    const empid = localStorage.getItem("EmpID")
    const [getAttendence, setAttendence] = useState({
        fromDate: "",
        toDate: ""
    })
    const [getData, setData] = useState([])
    const submit = (e) => {
        e.preventDefault();
        axios.get(`/apigateway/payroll/timeSheet/allEmpAttendence?fromDate=${getAttendence.fromDate}&toDate=${getAttendence.toDate}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            toast.success("data found succesfully.", { position: "top-center", theme: "colored" });
            console.log(response.data)
            setData(response.data);
        }).catch(error => {
            toast.error("error occured try after sometime.", { position: "top-center", theme: "colored" });
            console.log("error happend", error)
        })

    }
    const handle = (e) => {
        const newDate = { ...getAttendence };
        newDate[e.target.id] = e.target.value;
        setAttendence(newDate);
        console.log(newDate)
    }


    return (
        <div>     <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
        <ol className="breadcrumb" style={{  color: "white" }}>
        
            <li className="breadcrumb-item"><Link to="/">Home</Link> </li>
            <li className="breadcrumb-item"><a href="">Employee Management</a></li>
            <li className="breadcrumb-item active" aria-current="page">Employee Attendance </li>
        </ol>
    </nav>
        <div  style={{ margin:' 116px 38px',height:'562px'  }} >
          
            <div className=" col-lg-10 container pt-2">
            <h1  className='Heading1' >Employee  Attendance </h1>
                <form onSubmit={(e) => { submit(e) }} >
                    <div className="mb-2 d-grid gap-1 d-md-flex justify-content-center">
                        <label className="pt-3" htmlFor="fromdate">fromDate:</label>
                        <input onChange={(e) => { handle(e) }} value={getAttendence.fromDate}
                            type="date" className="form-control"
                            id="fromDate" />
                        <label className="pt-3" htmlFor="todate">toDate:</label>
                        <input onChange={(e) => { handle(e) }} value={getAttendence.toDate}
                            type="date" className="form-control"
                            id="toDate" />
                        <button className=" btn btn-primary  pb-1 ">Get</button>
                    </div>
                </form>
            </div>

            <div className="table-responsive-sm">
                <table border='2' className="table table-striped table-bordered">
                    <thead className="head">
                        <tr className="table-danger table-striped">
                        <th>EMPLOYEE NAME</th>
                            <th>EMPLOYEE ID</th>
                            <th>CHECK OUT</th>
                            <th>CHECK IN</th>
                            <th>WORKING HOUR</th>
                            <th>DATE</th>
                            <th>STATUS</th>
                            <th>MONTH</th>
                            <th>YEAR</th>
                            <th>LEAVE INTERVAL</th>
                            <th>INTERVALSTATUS</th>
                        </tr>
                    </thead>
                    <tbody className="body">
                        {/* map over the employees array */}
                        {getData.map((getDataa) => (
                            // display a <div> element with the employees.emailId and employees.designation
                            // parent element needs to have a unique key
                            <tr key={getDataa.timeSheetId}>
                                <td>{getDataa.employeeName}</td>
                                <td>{getDataa.employeeId}</td>
                                <td>{getDataa.checkOut}</td>
                                <td>{getDataa.checkIn}</td>
                                <td>{getDataa.workingHour}</td>
                                <td>{getDataa.date}</td>
                                <td>{getDataa.status}</td>
                                <td>{getDataa.month}</td>
                                <td>{getDataa.year}</td>
                                <td>{getDataa.leaveInterval}</td>
                                <td>{getDataa.intervalStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    )
}

export default GetAllEmpAttendance;
