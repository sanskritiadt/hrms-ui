import React, { useState, useEffect } from "react";
import axios from "axios";
import {toast} from  'react-toastify';
import handleAuthError from './CommonErrorHandling';

export default function EmpPayrollDetail() {
  const token = localStorage.getItem("response-token");
  const EmpId = localStorage.getItem("EmpID");
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
      })
      .catch((error) => {
        console.log(error);
        handleAuthError(error);
      });
  }

  useEffect(() => {
    axios
      .get(`/apigateway/hrms/employee/getEmpPayrollById/${EmpId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        //console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div
        className="container pt-3"
        style={{ width: "1000px", height: "800px" }}
      >
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
