import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';


const LeaveForm = () => {
    const [selectedDates, setSelectedDates] = useState([]);
    const empID = localStorage.getItem('EmpID');
    const token = localStorage.getItem("response-token")
    const handleDateChange = (date) => {
        setSelectedDates([...selectedDates, date]);
        console.log(selectedDates);
        console.log(date);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            empid: empID,
            leavedate: selectedDates.map((date) => format(date, 'yyyy/MM/dd')),
        };
        console.log(selectedDates);
        try {
            const response = await axios.post(`/payroll/leave/leaveRequest`, payload, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            toast.success("Leave request sent successfully.", { position: "top-center", theme: "colored" });
        } catch (error) {
            console.error(error);
            toast.error("Error occured try after sometime.", { position: "top-center", theme: "colored" });
        }
    };

    return (
        <div className='pt-5'>
            <form onSubmit={handleSubmit}>
                <DatePicker
                    selected={null}
                    onChange={handleDateChange}
                    isClearable
                    placeholderText="Select a date"
                    dateFormat="yyyy-MM-dd"
                    excludeDates={selectedDates}
                // Additional props for configuring the date picker can be added here
                />
                <ul>
                    {selectedDates.map((date) => (
                        <li key={date}>
                            {format(date, 'yyyy-MM-dd')}
                        </li>
                    ))}
                </ul>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default LeaveForm;
