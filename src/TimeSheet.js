import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';


const TimeSheet = () => {
    const [checkindisable, setcheckinDisable] = useState(false);
    const [checkoutdisable, setcheckoutDisable] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [getDate, setNewDate] = useState([])
    const token = localStorage.getItem("response-token");
    const empId = localStorage.getItem("EmpID");

    const [date, setDate] = useState({
        fromDate: "",
        toDate: ""
    })

    const checkIn = (e) => {
        e.preventDefault()
        axios.post(`payroll/timeSheet/checkIn/${empId}`, {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                console.log(response.data)
                toast.success(response.data, { position: "top-center", theme: "colored" })
                setcheckinDisable(true);
            }).catch(error => {
                toast.error("Error found try after sometime.", { position: "top-center", theme: "colored" })
                console.log(error)
            })
    }

    const checkOut = (e) => {
        e.preventDefault()
        axios.put(`payroll/timeSheet/checkOut/${empId}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            console.log(response.data)
            toast.success(response.data, { position: "top-center", theme: "colored" })
            setcheckoutDisable(true)
        }).catch(error => {
            toast.error("Error found try after sometime.", { position: "top-center", theme: "colored" })
            console.log(error)
        })
    }

    // const pauseTime = (e) => {
    //     e.preventDefault();
    //     axios.put(`/payroll/timeSheet/pause/${10}`, {}).then(response => {
    //         console.log(response.data);
    //         toast.success(response.data, { position: "top-center", theme: "colored" });
    //     }).catch(error => {
    //         toast.error(error.response.data, { position: "top-center", theme: "colored" })
    //         console.log(error)
    //     })

    // }
    // const playTime = (e) => {
    //     e.preventDefault();
    //     axios.patch(`/payroll/timeSheet/resume/${10}`, {}
    //     ).then(response => {
    //         console.log(response.data);
    //         toast.success(response.data, { position: "top-center", theme: "colored" });
    //     }).catch(error => {
    //         toast.error(error.response.data, { position: "top-center", theme: "colored" });
    //         console.log(error.response.data);
    //     })

    // }
    const handleClick = () => {
        const apiUrl = isPaused
            ? `/payroll/timeSheet/resume/${empId}`
            : `/payroll/timeSheet/pause/${empId}`;
        const method = isPaused ? "patch" : "put";
        axios
            .request({
                method: method,
                url: apiUrl,
                headers: {
                    'Authorization': `Bearer ${token}`
                }

            })
            .then((response) => {
                setIsPaused(!isPaused);
                toast.success(response.data, { position: "top-center", theme: "colored" })
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data, { position: "top-center", theme: "colored" })
            });
    };

    function submit(e) {
        e.preventDefault()
        axios.get(`/payroll/timeSheet/empAttendence?fromDate=${date.fromDate}&toDate=${date.toDate}&empId=${empId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setNewDate(response.data);
            console.log(response.data);
            toast.success("Data found successfully.", { position: "top-center", theme: "colored" })
        }).catch(error => {
            console.log(error.response.data)
            toast.error("Error, try after sometime", { position: "top-center", theme: "colored" })
        })
    }

    function handle(e) {
        const newdate = { ...date };
        newdate[e.target.id] = e.target.value;
        setDate(newdate);
        console.log(newdate);
    }
    return (
        <>
            <div className=" mb-2 d-grid gap-2 d-md-flex justify-content-center pt-5">
                <button disabled={checkindisable} onClick={checkIn} type="button" className="btn btn-outline-dark btn-lg">CHECK IN</button>
                <button disabled={checkoutdisable} onClick={checkOut} type="button" className="btn btn-outline-dark btn-lg">CHECK OUT</button>
                <button type="button" className="btn btn-outline-dark btn-lg" onClick={handleClick}>{isPaused ? "Play" : "Pause"}</button>
            </div>
            <div className=" mb-2 d-grid gap-2 d-md-flex justify-content-center">
                <Link to="/Leave" type="button" className="btn btn-outline-dark btn-lg my-5">LeaveRequest</Link>
            </div>
            <div className=" col-lg-10 container pt-2">
                <form onSubmit={(e) => { submit(e) }} >
                    <div className=" mb-2 d-grid gap-1 d-md-flex justify-content-center">
                        <label className="pt-3" htmlFor="fromdate">fromDate:</label>
                        <input onChange={(e) => { handle(e) }} value={date.fromDate}
                            type="date" className="form-control"
                            id="fromDate" />
                        <label className="pt-3" htmlFor="todate">toDate:</label>
                        <input onChange={(e) => { handle(e) }} value={date.toDate}
                            type="date" className="form-control"
                            id="toDate" />
                        <button className=" btn btn-primary  pb-1">Get</button>
                    </div>
                </form>
            </div>
            {/* {
                "employeeId": 10,
            "date": "01-05-2023",
            "checkOut": "13:00:49",
            "checkIn": "13:00:21",
            "workingHour": "00:00:18",
            "leaveInterval": "0:0:10",
            "status": "Present"
    }, */}
            <div className="table-responsive-sm">
                <table border='2' className="table table-striped table-bordered">
                    <thead className="head">
                        <tr className="table-danger table-striped">
                            <th >Employee ID</th>
                            <th>CheckIn</th>
                            <th >CheckOut</th>
                            <th >workingHour</th>
                            <th >date</th>
                            <th>status</th>
                            <th>Leave Interval</th>
                        </tr>
                    </thead>
                    <tbody className="body">
                        {/* map over the dates array */}
                        {getDate.map((date) => (
                            // display a <div> element with the dates.checkout and dates.checkin
                            // parent element needs to have a unique key
                            <tr key={date.employeeId}>
                                <td>{date.employeeId}</td>
                                <td>{date.checkIn}</td>
                                <td>{date.checkOut}</td>
                                <td>{date.workingHour}</td>
                                <td>{date.date}</td>
                                <td>{date.status}</td>
                                <td>{date.leaveInterval}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>

    )
}
export default TimeSheet;