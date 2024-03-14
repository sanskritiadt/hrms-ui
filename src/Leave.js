
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const LeaveForm = () => {
    const [leaveForm, setLeaveForm] = useState({
        leave: [],
        name: '',
        leaveBalance: '',
        leaveType: '',
        leaveReason: '',
        selectedDates: [],
    });
    const empID = localStorage.getItem('EmpID');
    const token = localStorage.getItem('response-token');

    useEffect(() => {
        axios
            .get(`/apigateway/payroll/leave/getById/${empID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                console.log(response.data);
                setLeaveForm((prevState) => ({
                    ...prevState,
                    leave: response.data,
                    leaveBalance: response.data.leaveBalance}));
                toast.success('Leave data found successfully!!', { position: 'top-center', theme: 'colored' });

            })
            .catch(error => {
                console.log(error);
                toast.error('Something went wrong. Please try again later.', {
                    position: 'top-center',
                    theme: 'colored',
                });
            });
    }, []);

    const handleDateChange = date => {
        setLeaveForm(prevState => ({ ...prevState, selectedDates: [...prevState.selectedDates, date] }));
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setLeaveForm(prevState => ({ ...prevState, [name]: value }));
    };
    

    const handleSubmit = async e => {
        e.preventDefault();
        const { name, leaveBalance, leaveType, leaveReason, selectedDates } = leaveForm;
        const payload = {
            empid: 81,
            leavedate: selectedDates.map(date => format(date, 'yyyy/MM/dd')),
            name: name,
            leaveBalance: leaveBalance,
            leaveType: leaveType,
            leaveReason: leaveReason,
        };
        try {
            const response = await axios.post(`/apigateway/payroll/leave/leaveRequest`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success(response.data, { position: 'top-center', theme: 'colored' });
        } catch (error) {
            console.error(error);
            toast.error('An error occurred. Please try again later.', { position: 'top-center', theme: 'colored' });
        }
    };

    const { leave, name, leaveBalance, leaveType, leaveReason, selectedDates } = leaveForm;

    return (
        <div>
           <nav    aria-label="breadcrumb"   style={{ "--bs-breadcrumb-divider": "'>>'" }} >
        <ol className="breadcrumb" style={{  color: "white" }}>
        
            <li className="breadcrumb-item"><Link to="/">Home</Link> </li>
            <li className="breadcrumb-item"><Link to="/TimeSheet">Timesheet</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Leave Request</li>
        </ol>
    </nav>
        <div style={{ margin: '100px 100px', height: '562px' }}>
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
                            value={leave.name || ''}
                        />
                        <label htmlFor="Leave Balance">Leave Balance</label>
                        <input
                            type="text"
                            name="leaveBalance"
                            placeholder="Leave Balance"
                            value={leaveBalance || ''}
                        />
                        <label htmlFor="Leave Type">Leave Type</label>
                        <input
                            type="text"
                            name="leaveType"
                            placeholder="Leave Type"
                            value={leaveType || ''}
                            onChange={handleChange}
                        />
                        <label htmlFor="Leave Reason">Leave Reason</label>
                        <textarea
                            name="leaveReason"
                            placeholder="Leave Reason"
                            value={leaveReason || ''}
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
                            {selectedDates.map(date => (
                                <li key={date}>{format(date, 'yyyy-MM-dd')}</li>
                            ))}
                        </ul>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </Container>
            {/* <div className='container pt-3'>
                <div className='row'>

                    <div className='col-md-8 mx-auto' >
                        <div className='card border-0 shadow' style={{ width: '600px', height: '650px' }}>

                            <div className='card-body'>
                                <form className='container py-3  mb-3' >
                                    <div className="row mb-3">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='positionName'>Name</label>
                                        <div className="col-sm-10">
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Name"
                                                value={leave.name}
                                                onChange={handleChange}
                                                className="form-control" />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='vacancy'>Leave Balance </label>
                                        <div className="col-sm-10">
                                            <input
                                                type="text"
                                                name="leaveBalance"
                                                placeholder="Leave Balance"
                                                value={leave.leaveBalance}
                                                onChange={handleChange}
                                                className="form-control" />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='experienceInYear'>Leave Type</label>
                                        <div className="col-sm-10">
                                            <input
                                                type="text"
                                                name="leaveType"
                                                placeholder="Leave Type"
                                                value={leaveType}
                                                onChange={handleChange}
                                                className="form-control" />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='experienceInYear'>Leave Reason</label>
                                        <div className="col-sm-10">
                                            <textarea
                                                name="leaveReason"
                                                placeholder="Leave Reason"
                                                value={leaveReason}
                                                onChange={handleChange}

                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='experienceInYear'>Select Date</label>
                                        <div className="col-sm-10">


                                            <DatePicker
                                                selected={null}
                                                onChange={handleDateChange}
                                                isClearable
                                                placeholderText="Select a date"
                                                dateFormat="yyyy-MM-dd"
                                                excludeDates={selectedDates}
                                            />
                                            <ul>
                                                {selectedDates.map(date => (
                                                    <li key={date}>{format(date, 'yyyy-MM-dd')}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2 col-6 mx-auto">
                                        <button className="btn btn-outline-danger" type="submit">Submit</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
        </div>
    );
};

export default LeaveForm;
