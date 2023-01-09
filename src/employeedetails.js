import axios from "axios";
import React from "react";
import './App.css'

export default function Empfunc() {

  const [employees, setEmployees] = React.useState([]);

  React.useEffect(() => {
    axios.get("/employee/getAllEmp").then((response) => {
      setEmployees(response.data);
    });
  }, []);


  if (!employees) return null;

  return (
    <div>
      <table border='2' className="table table-striped">
        <thead className="head" style={{ backgroundColor: "lightblue" }}>
          <tr styles={{ width: '50%' }}>
            <th styles={{ width: '50%' }}>EmpID</th>
            <th styles={{ width: '50%' }}>Mobile No</th>
            <th styles={{ width: '50%' }}>EmailID</th>
            <th styles={{ width: '50%' }}>Designation</th>
            <th styles={{ width: '50%' }}>JoinDate</th>
            <th styles={{ width: '50%' }}>Gender</th>
            <th styles={{ width: '50%' }}>DOB</th>
            <th styles={{ width: '50%' }}>MaritalStatus</th>
            <th styles={{ width: '50%' }}>LastName</th>
            <th styles={{ width: '50%' }} >FirstName</th>
          </tr>
        </thead>
        <tbody className="body">
          {/* map over the employees array */}
          {employees.map((employee) => (
            // display a <div> element with the employees.emailId and employees.designation
            // parent element needs to have a unique key
            <tr key={employee.empId}>
              <td>{employee.empId}</td>
              <td>{employee.mobileNo}</td>
              <td>{employee.emailId}</td>
              <td>{employee.designation}</td>
              <td>{employee.joinDate}</td>
              <td>{employee.gender}</td>
              <td>{employee.dob}</td>
              <td>{employee.maritalStatus}</td>
              <td>{employee.lname}</td>
              <td>{employee.fname}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}