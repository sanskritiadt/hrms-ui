import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingPage from './LoadingPage'

const TimeSheet = () => {
  const [checkindisable, setcheckinDisable] = useState(false);
  const [checkoutdisable, setcheckoutDisable] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [getDate, setNewDate] = useState([]);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const token = localStorage.getItem("response-token");
  const empId = localStorage.getItem("EmpID");
  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState({
    fromDate: "",
    toDate: "",
  });
  //HRMS-94
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
     // console.log(position);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  const checkIn = (e) => {
    e.preventDefault();
    setLoading(true); 
    axios
      .post(
        `/apigateway/payroll/timeSheet/checkIn/${empId}?Latitude=${latitude}&Longitude=${longitude}`,
        {},
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
        setcheckinDisable(true);
        setLoading(false);
      })
      .catch((error) => {
        toast.error( error.response.data.message || "Error while checkin" );
        // alert(latitude,longitude)
        console.log(error);
        setLoading(false);
      });
  };
  const checkOut = (e) => {
    e.preventDefault();
    setLoading(true); 
    axios
      .put(
        `/apigateway/payroll/timeSheet/checkOut/${empId}?Latitude=${latitude}&Longitude=${longitude}`,
        {},
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
        setcheckoutDisable(true);
        setLoading(false);
      })
      .catch((error) => {
        toast.error( error.response.data.message || "Error while checkout" );
        console.log(error);
        setLoading(false);
      });
  };

  const handleClick = () => {
    setLoading(true); 
    const apiUrl = isPaused
      ? `/apigateway/payroll/timeSheet/resume/${empId}`
      : `/apigateway/payroll/timeSheet/pause/${empId}`;
    const method = isPaused ? "patch" : "put";
    axios
      .request({
        method: method,
        url: apiUrl,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setIsPaused(!isPaused);
        toast.success(response.data, {
          position: "top-center",
          theme: "colored",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error( error.response.data.message);
        setLoading(false);
      });
  };

  function submit(e) {
    e.preventDefault();
    setLoading(true); 
    axios
      .get(
        `/apigateway/payroll/timeSheet/empAttendence?fromDate=${date.fromDate}&toDate=${date.toDate}&empId=${empId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setNewDate(response.data);
        console.log(response.data);
        toast.success("Data found successfully.", {
          position: "top-center",
          theme: "colored",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error( error.response.data.message || "Error while fetching details." );
        setLoading(false);
      });
  }

  function handle(e) {
    const newdate = { ...date };
    newdate[e.target.id] = e.target.value;
    setDate(newdate);
    console.log(newdate);
  }
  return (
    <>
      <div className="container">
      {loading ? <LoadingPage/> : ''}
        <div
          className="row justify-content-center align-items-center"
          style={{ height: "90vh" }}
        >
          <nav
            aria-label="breadcrumb"
            style={{ "--bs-breadcrumb-divider": "'>>'" }}
          >
            <ol className="breadcrumb" style={{ color: "white" }}>
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>{" "}
              </li>

              <li className="breadcrumb-item active" aria-current="page">
                TimeSheet
              </li>
            </ol>
          </nav>

          <div
            className=" d-grid gap-2 d-md-flex justify-content-center pt-1 "
            style={{ paddingLeft: "120px" }}
          >
            <button
              disabled={checkindisable}
              onClick={checkIn}
              type="button"
              className="btn btn-outline-dark btn-lg"
            >
              CHECK IN
            </button>
            <button
              disabled={checkoutdisable}
              onClick={checkOut}
              type="button"
              className="btn btn-outline-dark btn-lg"
            >
              CHECK OUT
            </button>
            <button
              type="button"
              className="btn btn-outline-dark btn-lg"
              onClick={handleClick}
            >
              {isPaused ? "Play" : "Pause"}
            </button>
          </div>
          <div
            className=" mb-2 d-grid gap-2 d-md-flex justify-content-center"
            style={{ paddingLeft: "120px" }}
          >
            <Link
              to="/Leave"
              type="button"
              className="btn btn-outline-dark btn-lg my-2"
            >
              LeaveRequest
            </Link>
          </div>
          <div
            className=" mb-2 d-grid gap-2 d-md-flex justify-content-center"
            style={{ paddingLeft: "120px" }}
          >
            {/* <Link
                to="/PriorTimeAdj"
                type="button"
                className="btn btn-outline-dark btn-lg my-2"
              >
                Prior Time Request
              </Link> */}
            <Link
              to={{
                pathname: "/PriorTimeAdj",
                state: { latitude: latitude, longitude: longitude },
              }}
              type="button"
              className="btn btn-outline-dark btn-lg my-2"
            >
              Prior Time Request
            </Link>
          </div>
          <div className=" col-lg-10 container pt-2">
            <form
              onSubmit={(e) => {
                submit(e);
              }}
            >
              <div
                className=" mb-2 d-grid gap-1 d-md-flex justify-content-center "
                style={{ width: "600px" }}
              >
                <label className="pt-2 fs-5" htmlFor="fromdate">
                  FromDate:
                </label>
                <input
                  onChange={(e) => {
                    handle(e);
                  }}
                  value={date.fromDate}
                  type="date"
                  className="form-control"
                  id="fromDate"
                />
                <label className="pt-2 fs-5" htmlFor="todate">
                  ToDate:
                </label>
                <input
                  onChange={(e) => {
                    handle(e);
                  }}
                  value={date.toDate}
                  type="date"
                  className="form-control"
                  id="toDate"
                />
                <button
                  className=" btn btn-primary m-0"
                  style={{ height: "45px" }}
                >
                  Get
                </button>
              </div>
            </form>
          </div>

          <div
            className="table-responsive-sm "
            style={{ paddingLeft: "140px", paddingRight: "60px" }}
          >
            <table border="2" className="table table-striped table-bordered">
              <thead className="head">
                <tr className="table-danger table-striped">
                  <th>EMPLOYEE ID</th>
                  <th>CHECKIN</th>
                  <th>CHECKOUT</th>
                  <th>WORKING HOUR</th>
                  <th>DATE</th>
                  <th>STATUS</th>
                  <th>LEAVE INTERVAL</th>
                </tr>
              </thead>
              <tbody className="body">
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
        </div>
      </div>
    </>
  );
};
export default TimeSheet;
