// import React, { useState } from 'react'
// import axios from 'axios';
// const Payslipdetails = () => {
//     const empID = localStorage.getItem("EmpID");
//     const token = localStorage.getItem("response-token")
//     const [data, setData] = useState()
//     const [year, setYear] = useState();
//     const [adhoc, setadhoc] = useState()
//     const [month, setMonth] = useState({})
//     console.log(month);
//     console.log(data)
//     console.log(year);
//     console.log(adhoc);   
//     const handleMonth = (event) => {
//         setData(event.target.value);
//     }
//     const handleYear = (event) => {
//         setYear(event.target.value);
//     }
//     const handleadhoc = (event) => {
//         setadhoc(event.target.value);
//     }
//     const handleSubmit = (event) => {
//         alert("your month is" + data)
//         event.preventDefault()
//         axios.get(`/payroll/slip?empId=${1}&month=${data}&year=${year}&adhoc=${adhoc}`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         }).then(response => {
//                 console.log(response.data)
//                 alert("data found successfully.")
//                 setMonth(response.data)
//             }).catch(error => {
//                 console.log("error occured", error)
//                 alert("error occured in getting details please try after sometime.")
//             })
//     }
//     return (
//         <div className=" mb-2 d-flex gap-2 d-md-flex justify-content-center pt-5">
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     <select className="form-select mb-3" value={year} onChange={handleYear}>
//                         <option defaultValue >select your year</option>
//                         <option value="2021">2021</option>
//                         <option value="2022" >2022</option>
//                         <option value="2023">2023</option>
//                         <option value="2024">2024</option>
//                         <option value="2025">2025</option>
//                         <option value="2026">2026</option>
//                         <option value="2027">2027</option>
//                         <option value="2028">2028</option>
//                         <option value="2029">2029</option>
//                         <option value="2030">2030 </option>
//                     </select>
//                 </label>
//                 <label>
//                     <select className="form-select mb-3" value={data} onChange={handleMonth}>
//                         <option defaultValue >select your month</option>
//                         <option value="January">January</option>
//                         <option value="February" >February</option>
//                         <option value="March" >March</option>
//                         <option value="April">April</option>
//                         <option value="May">May</option>
//                         <option value="June">June</option>
//                         <option value="July">July</option>
//                         <option value="August">August</option>
//                         <option value="September">September</option>
//                         <option value="October">October</option>
//                         <option value="November">November </option>
//                         <option value="December">December </option>
//                     </select>
//                 </label>
//                 <div className="row mb-3">
//                     <label htmlFor="Phone" className="col-sm-2 col-form-label" name='adhoc'>ADHOC</label>
//                     <div className="col-sm-10">
//                         <input onChange={handleadhoc} value={adhoc}
//                             type="number" className="form-control"
//                             name='adhoc' id="adhoc" placeholder='Enter ADHOC...' />
//                     </div>
//                 </div>
//                 <input type="submit" value="Submit" className="btn btn-outline-dark btn-md" />
//             </form>
//             <div className="container mt-5 mb-5">
//                 <div className="row">
//                     <div className="col-md-12">
//                         <div className="row">
//                             <div className="col-md-10">
//                                 <div className="row">
//                                     <div className="col-md-6">
//                                         <div> <span className="fw-bolder">Employee Name :</span> <small className="ms-3">{month.name}</small> </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div> <span className="fw-bolder">Designation :</span> <small className="ms-3">{month.jobTitle}</small> </div>
//                                     </div>
//                                 </div>
//                                 <div className="row">
//                                     <div className="col-md-6">
//                                         <div> <span className="fw-bolder">Present Date :</span> <small className="ms-3">{month.presentDate}</small> </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div> <span className="fw-bolder">Mob no:</span> <small className="ms-3">{month.mobileNo}</small> </div>
//                                     </div>
//                                 </div>
//                                 <div className="row">
//                                     <div className="col-md-6">
//                                         <div> <span className="fw-bolder">Account No :</span> <small className="ms-3">{month.accountNumber}</small> </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div> <span className="fw-bolder">Bank Name :</span> <small className="ms-3">{month.bankName}</small> </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <table className="mt-4 table table-bordered">
//                                 <tbody className="bg-white text-dark">
//                                     <tr>
//                                         <th scope="row"> Pay Periods</th>
//                                         <td>{month.payPeriods}</td>
//                                     </tr>
//                                     <tr>
//                                         <th scope="row">Working Days</th>
//                                         <td>{month.youWorkingDays}</td>
//                                     </tr>
//                                     <tr>
//                                         <th scope="row">Leaves Taken</th>
//                                         <td>{month.numberOfLeavesTaken}</td>
//                                     </tr>
//                                     <tr>
//                                         <th scope="row">Amount Deducted for Leaves</th>
//                                         <td>{month.amountDeductedForLeaves}</td>
//                                     </tr>
//                                     <tr>
//                                         <th scope="row">Amount Payable Per Day</th>
//                                         <td> {month.amountPayablePerDay}</td>
//                                     </tr>
//                                     <tr>
//                                         <th scope="row">Gross Salary</th>
//                                         <td>{month.grossSalary}</td>
//                                     </tr>
//                                     <tr>
//                                         <th scope="row">Net Amount Payable</th>
//                                         <td>{month.netAmountPayable}</td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                         </div>
//                         <div className="d-flex justify-content-end">
//                             <div className="d-flex flex-column mt-2"> <span className="mt-4">Authorised Signatory</span> </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     )
// }

// export default Payslipdetails
import React, { useState } from 'react'
import axios from 'axios';
import './Hrmscss/PaySlip.css';
import { toast } from 'react-toastify';
//import { useSelector } from 'react-redux';

function PaySlip() {
    const empID = localStorage.getItem("EmpID");
    const token = localStorage.getItem("response-token")
    const [data, setData] = useState();
    const [year, setYear] = useState();
    const [adhoc, setadhoc] = useState();
    const [month, setMonth] = useState({});
    // const empid = useSelector((state) => state.data.empID);
    console.log(month);
    console.log(data)
    console.log(year);
    console.log(adhoc);
    // console.log(empid);
    const handleMonth = (event) => {
        setData(event.target.value);
    }
    const handleYear = (event) => {
        setYear(event.target.value);
    }
    const handleadhoc = (event) => {
        setadhoc(event.target.value);
    }
    const handleSubmit = (event) => {
        alert("your month is" + data)
        event.preventDefault()
        axios.get(`/payroll/slip?empId=${empID}&month=${data}&year=${year}&adhoc=${adhoc}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data)
                toast.success("Data found successfully.", { position: "top-center", theme: "colored" })
                setMonth(response.data)
            }).catch(error => {
                console.log("error occured", error)
                toast.error("Error occured try after sometime.", { position: "top-center", theme: "colored" })
            })
    }

    return (
        <div className=" mb-2 d-flex gap-2 d-md-flex justify-content-center pt-5">
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="year" className="form-label">Select your year:</label>
                                <select className="form-select" value={year} onChange={handleYear}>
                                    <option defaultValue>Select your year</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2028</option>
                                    <option value="2029">2029</option>
                                    <option value="2030">2030</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="month" className="form-label">Select your month:</label>
                                <select className="form-select" value={data} onChange={handleMonth}>
                                    <option defaultValue>Select your month</option>
                                    <option value="January">January</option>
                                    <option value="February">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="August">August</option>
                                    <option value="September">September</option>
                                    <option value="October">October</option>
                                    <option value="November">November</option>
                                    <option value="December">December</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="adhoc" className="form-label">Enter ADHOC:</label>
                                <input onChange={handleadhoc} value={adhoc} type="number" className="form-control" name="adhoc" id="adhoc" placeholder="Enter ADHOC..." />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>

                    </div>
                    <div className="container mt-5 mb-5">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-10">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div> <span className="fw-bolder">Employee Name :</span> <small className="ms-3">{month.name}</small> </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div> <span className="fw-bolder">Designation :</span> <small className="ms-3">{month.jobTitle}</small> </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div> <span className="fw-bolder">Present Date :</span> <small className="ms-3">{month.presentDate}</small> </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div> <span className="fw-bolder">Account No :</span> <small className="ms-3">{month.accountNumber}</small> </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div> <span className="fw-bolder">Bank Name :</span> <small className="ms-3">{month.bankName}</small> </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <table className="mt-4 table table-bordered">
                                            <tbody className="bg-white text-dark">
                                                <tr>
                                                    <th scope="row"> Pay Periods</th>
                                                    <td>{month.payPeriods}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Your Working Days</th>
                                                    <td>{month.youWorkingDays}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Total Working Days</th>
                                                    <td>{month.totalWorkingDays}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Leaves Taken</th>
                                                    <td>{month.numberOfLeavesTaken}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Amount Deducted for Leaves</th>
                                                    <td>{month.amountDeductedForLeaves}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">ADHOC</th>
                                                    <td>{month.adhoc}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Gross Salary</th>
                                                    <td style={{ width: "50%" }}>{month.grossSalary}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Net Amount Payable</th>
                                                    <td>{month.netAmountPayable}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <div className="d-flex flex-column mt-2"> <span className="mt-4">Authorised Signatory</span> </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PaySlip
