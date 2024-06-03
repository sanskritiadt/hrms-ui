import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import LoadingPage from './LoadingPage'
const LeaveForm = () => {
  const [loading, setLoading] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    leave: [],
    name: "",
    leaveBalance: "",
    leaveType: "",
    leaveReason: "",
    selectedDates: [],
  });
  const empID = localStorage.getItem("EmpID");
  const token = localStorage.getItem("response-token");

  useEffect(() => {
    setLoading(true); 
    axios
      .get(`/apigateway/payroll/leave/getById/${empID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setLeaveForm((prevState) => ({
          ...prevState,
          leave: response.data,
          leaveBalance: response.data.leaveBalance,
        }));
        toast.success("Leave data found successfully!!", {
          position: "top-center",
          theme: "colored",
        });
        setLoading(false); 
      })
      .catch((error) => {
        console.log(error);
        toast.error( error.response.data.message || "Error fetching details" );
        setLoading(false); 
      });
  }, []);

  const handleDateChange = (date) => {
    setLeaveForm((prevState) => ({
      ...prevState,
      selectedDates: [...prevState.selectedDates, date],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, leaveBalance, leaveType, leaveReason, selectedDates } =
      leaveForm;
    const payload = {
      empid: 81,
      leavedate: selectedDates.map((date) => format(date, "yyyy/MM/dd")),
      name: name,
      leaveBalance: leaveBalance,
      leaveType: leaveType,
      leaveReason: leaveReason,
    };
    try {
      setLoading(true); 
      const response = await axios.post(
        `/apigateway/payroll/leave/leaveRequest`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data, {
        position: "top-center",
        theme: "colored",
      });
      setLoading(false); 
    } catch (error) {
      console.error(error);
      toast.error( error.response.data.message || "Error creating details" );
      setLoading(false);
    }
  };

  const { leave, name, leaveBalance, leaveType, leaveReason, selectedDates } =
    leaveForm;

  return (
    <div>
      <nav
        aria-label="breadcrumb"
        style={{ "--bs-breadcrumb-divider": "'>>'" }}
      >     {loading ? <LoadingPage/> : ''}
        <ol className="breadcrumb" style={{ color: "white" }}>
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>{" "}
          </li>
          <li className="breadcrumb-item">
            <Link to="/TimeSheet">Timesheet</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Leave Request
          </li>
        </ol>
      </nav>
      <div
        style={{
          width: "140vh",
          height: "auto",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          marginLeft:"200px"
        }}
      >
        <div>
          <h1 className="Heading1">Leave Request</h1>
          <Container>
            <Table striped bordered hover className="custom-table">
              <thead>
                <tr>
                  <th>Employee_ID</th>
                  <th>Name</th>
                  <th>Leave_Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr key={leave.id}>
                  <td>{leave.empId}</td>
                  <td>{leave.name}</td>
                  <td>{leave.leaveBalance}</td>
                </tr>
              </tbody>
            </Table>

            <div className="pt-5 container">
              <form onSubmit={handleSubmit}>
                <label htmlFor="Name">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={leave.name || ""}
                />
                <label htmlFor="Leave Balance">Leave Balance</label>
                <input
                  type="text"
                  name="leaveBalance"
                  placeholder="Leave Balance"
                  value={leaveBalance || ""}
                />
                <label htmlFor="Leave Type">Leave Type</label>
                <input
                  type="text"
                  name="leaveType"
                  placeholder="Leave Type"
                  value={leaveType || ""}
                  onChange={handleChange}
                />
                <label htmlFor="Leave Reason">Leave Reason</label>
                <textarea
                  name="leaveReason"
                  placeholder="Leave Reason"
                  value={leaveReason || ""}
                  onChange={handleChange}
                ></textarea>
                <label htmlFor="Select Date">Select Date</label>
                <DatePicker
                  selected={null}
                  onChange={handleDateChange}
                  isClearable
                  placeholderText="Select a date"
                  dateFormat="yyyy-MM-dd"
                  excludeDates={selectedDates}
                />
                <ul>
                  {selectedDates.map((date) => (
                    <li key={date}>{format(date, "yyyy-MM-dd")}</li>
                  ))}
                </ul>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button type="submit" className=" px-4 py-2 mb-4">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default LeaveForm;
