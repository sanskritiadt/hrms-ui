import React, { useState, useEffect } from "react";
import axios from "axios";
import {toast} from  'react-toastify';
import handleAuthError from './CommonErrorHandling';
import LoadingPage from './LoadingPage'
import { useSelector } from 'react-redux';

export default function EmpPayrollDetail() {
  // const token = localStorage.getItem("response-token");
  // const EmpId = localStorage.getItem("EmpID");
  const  token = useSelector((state) => state.auth.token);
  const  EmpId = useSelector((state) => state.auth.empId);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    empId: '',
    designation: '',
    joinDate: '',
    salary: '',
    bankName: '',
    accountNumber: '',
    ifscCode: ''
});

  function HandleSubmit(e) {
    e.preventDefault();
    setLoading(true); 
    axios
      .post(
        `/apigateway/hrms/employee/updatePayrollByUser`,
        {
            empId: data.id,
            designation: data.designation,
            joinDate: data.joinDate,
            salary: data.salary,
            bankName: data.bankName,
            accountNumber: data.accountNumber,
            ifscCode: data.ifscCode
        },
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
        setLoading(false); 
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message || "Error updating details" );
        setLoading(false); 
      });
  }

  useEffect(() => {
    setLoading(true); 
    axios
      .get(`/apigateway/hrms/employee/getEmpPayrollById/${EmpId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false); 
      })
      .catch((error) => {
        console.log(error);
        toast.error( error.response.data.message || "Error fetching details" );
        setLoading(false); 
      });
  }, []);

  return (
    <div>
      <div
        className="container pt-3"
        style={{ width: "1000px", height: "800px" }}
      >    {loading ? <LoadingPage/> : ''}
        <div className="row">
          <div className="col-lg-8 col-md-8 mx-auto">
            <div className="card border-0 shadow">
              <div className="card-body">
                <form className="container py-3  mb-3" onSubmit={HandleSubmit}>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-2 col-form-label"
                      name="projectId"
                    >
                      EmployeeId
                    </label>
                    <div className="col-sm-10">
                      <input
                        disabled
                        value={data.empId || ""}
                        type="text"
                        className="form-control"
                        id="projectId"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-2 col-form-label"
                      name="projectName"
                    >
                      Salary
                    </label>
                    <div className="col-sm-10">
                      <input disabled
                        value={data.salary || ""}
                        // onChange={(e) =>
                        //   setData({ ...data, salary: e.target.value })
                        // }
                        type="text"
                        className="form-control"
                        id="projectName"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputEmail3"
                      className="col-sm-2 col-form-label"
                      name="emailId"
                    >
                      Bank Name
                    </label>
                    <div className="col-sm-10">
                      <input
                        value={data.bankName || ""}
                        onChange={(e) =>
                          setData({ ...data, bankName: e.target.value })
                        }
                        type="text"
                        id="projectDescription"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-2 col-form-label"
                      name="startDate"
                    >
                      Designation
                    </label>
                    <div className="col-sm-10">
                      <input disabled
                        value={data.designation || ""}
                        // onChange={(e) =>
                        //   setData({ ...data, designation: e.target.value })
                        // }
                        type="text"
                        className="form-control"
                        id="startDate"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-2 col-form-label"
                      name="endDate"
                    >
                      Join Date
                    </label>
                    <div className="col-sm-10">
                      <input disabled
                        value={data.joinDate || ""}
                        // onChange={(e) =>
                        //   setData({ ...data, joinDate: e.target.value })
                        // }
                        type="text"
                        className="form-control"
                        id="lastName"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-2 col-form-label"
                      name="endDate"
                    >
                      Account Number
                    </label>
                    <div className="col-sm-10">
                      <input
                        value={data.accountNumber || ""}
                        onChange={(e) =>
                          setData({ ...data, accountNumber: e.target.value })
                        }
                        type="text"
                        className="form-control"
                        id="endDate"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-2 col-form-label"
                      name="endDate"
                    >
                      IFSC Code
                    </label>
                    <div className="col-sm-10">
                      <input
                        value={data.ifscCode || ""}
                        onChange={(e) =>
                          setData({ ...data, ifscCode: e.target.value })
                        }
                        type="text"
                        className="form-control"
                        id="endDate"
                      />
                    </div>
                  </div>

                  <div className="d-grid gap-2 col-6 mx-auto">
                    <button className="btn btn-outline-success" type="submit">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
