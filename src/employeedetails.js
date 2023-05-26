import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import './Hrmscss/App.css'

export default function Empfunc() {

  const [employees, setEmployees] = useState([]);
  const token = localStorage.getItem("response-token")
  React.useEffect(() => {
    axios.get(`/hrms/employee/getAllEmp`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      setEmployees(response.data);
      toast.success("data found successfully.", { position: 'top-center', theme: "colored", closeOnClick: true })
    }).catch(error => {
      console.log(error)
      toast.error("error happend try after sometime.", { position: "top-center", theme: 'colored' })
    })
  }, []);
  if (!employees) return null;
  // "employeeId": 3,
  // "createdAt": "13:10:49.55",
  // "updatedAt": "13:11:09.865",
  // "isActive": true,
  // "designation": "Senior Java Developer",
  // "dob": "02-09-1987",
  // "email": "mukeshchandalwar.adt@gmail.com",
  // "firstName": "Mukesh",
  // "lastName": "Chandalwar",
  // "gender": "M",
  // "isEmailVerified": true,
  // "joinDate": "19-11-2022",
  // "maritalStatus": "",
  // "mobileNo": 9764552941,
  // "password": "$2a$10$fkIZDP7xlmKjhCrPGRzmo./3RSshzU2xxQyGNfmEBH4A6tvB8kssu",
  // "username": "mukesh",
  // "salary": 25000.0,
  // "bankName": "SBI BANK",
  // "accountNumber": "784896355",
  // "ifscCode": "DIKE5D6E5F6DE"

  return (
    <div className="table-responsive-sm">
      <table border='2' className="table table-striped table-bordered">
        <thead className="head">
          <tr className="table-danger table-striped">
            <th>employeeId</th>
            <th>isActive</th>
            <th>designation</th>
            <th>DOB</th>
            <th>email</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>MaritalStatus</th>
            <th>gender</th>
            <th>isEmailVerified</th>
            <th>joinDate</th>
            <th>mobileNo</th>
            <th>username</th>
            <th>salary</th>
            <th>bankName</th>
            <th>accountNumber</th>
            <th>ifscCode</th>


          </tr>
        </thead>
        <tbody className="body">
          {/* map over the employees array */}
          {employees.map((employee) => (
            // display a <div> element with the employees.emailId and employees.designation
            // parent element needs to have a unique key
            <tr key={employee.employeeId}>
              <td><Link to={`/EditEmployee/${employee.employeeId}`} className="Candidate-id">{employee.employeeId}</Link></td>
              <td>{String(employee.isActive)}</td>
              <td>{employee.designation}</td>
              <td>{employee.dob}</td>
              <td>{employee.email}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.maritalStatus}</td>
              <td>{employee.gender}</td>
              <td>{String(employee.isEmailVerified)}</td>
              <td>{employee.joinDate}</td>
              <td>{employee.mobileNo}</td>
              <td>{employee.username}</td>
              <td>{employee.salary}</td>
              <td>{employee.bankName}</td>
              <td>{employee.accountNumber}</td>
              <td>{employee.ifscCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}