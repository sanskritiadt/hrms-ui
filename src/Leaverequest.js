// import React, { useState } from 'react';
// import { Container } from "react-bootstrap";
// import MultipleDatePicker from 'react-multiple-datepicker'
// import 'react-datepicker/dist/react-datepicker.css';

// //npm install react-datepicker

// function DateSelector() {
//     const [selectDate, setSelectedDate] = useState([]);
//     return (
//         <React.Fragment>
//             <Container>
//                 <div className="row">
//                     <div className="col-sm-10">
//                         <h5 className="mt-3 mb-4 text-black"> Select leave date</h5>
//                         <form className='row'>
//                             <div className="row mb-4">
//                                 <label className="col-sm-2 col-form-label"> Date</label>
//                                 <div className="col-sm-5">
//                                     <MultipleDatePicker
//                                         onSubmit={dates => setSelectedDate(dates)
//                                         }
//                                     />
//                                 </div>
//                             </div>
//                             <div className="row mb-4">
//                                 <label className="col-sm-2 col-form-label"></label>
//                                 <div className="col-sm-4">
//                                     <button type="submit" className="btn btn-success">Submit</button>
//                                 </div>
//                             </div>

//                         </form>

//                     </div>
//                 </div>
//             </Container>
//         </React.Fragment>
//     );
// }

// export default DateSelector;
import axios from 'axios';
import React, { useState } from 'react';
import MultiDatePicker from 'react-multi-date-picker';

function DateSelector() {
    const empID = localStorage.getItem('EmpID');
    const [leavedate, setleavedate] = useState([]);

    const handleDateChange = (date) => {
        setleavedate([...leavedate, date]);
        console.log(leavedate);
        console.log(date);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Call your API with selectedDates
        axios.post(`/payroll/leave/leaveRequest`, {
            empid: empID,
            leavedate: leavedate
        }).then((response)=>{
            console.log(response.data);
            alert('leave request sent successfully.')
        }).catch((error)=>{
            console.log(error);
            alert('getting issue in leave request.')
        })

    }

    return (
        <div className=' mb-2 d-grid gap-2 d-md-flex justify-content-center pt-5'>
            <MultiDatePicker
                minDate={new Date()}
                value={null}
                onChange={handleDateChange}
                multiple
            />
            <button onSubmit={handleSubmit} className=" btn btn-primary">submit</button>
        </div>
    );
}

export default DateSelector;