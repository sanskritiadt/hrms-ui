import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import handleAuthError from "./CommonErrorHandling";
import { Link } from "react-router-dom";
import LoadingPage from './LoadingPage';
import { useSelector } from 'react-redux';
const AddAppraisalDetails = () => {
  // const token = localStorage.getItem("response-token");
  // const empId = localStorage.getItem("EmpID");
  const  token = useSelector((state) => state.auth.token);
  const  empId = useSelector((state) => state.auth.empId);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    empId: "",
    year: "",
    month: null,
    appraisalDate: null,
    amount: null,
    salary: null,
    variable: "",
    bonus: "",
  });
  const years = Array.from(new Array(10), (val, index) => new Date().getFullYear() + index);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [errors, setErrors] = useState({});

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    Object.keys(data).forEach((key) => {
      if (!data[key]) {
        newErrors[key] = `${key} is required`;
        isValid = false;
      } else if (isNaN(data[key])) {
        newErrors[key] = `${key} should be a number`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const submit = (e) => {
    e.preventDefault();
      setLoading(true); 
      axios
        .post(
          `apigateway/payroll/salarydetails/addAppraisalDetails`,
          data,
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
          toast.error( error.response.data.message || "Error saving details." );
          setLoading(false); 
        });
    
  };

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }
  return (
    <div className="mt-3">
       {loading ? <LoadingPage/> : ''}
      <nav
        aria-label="breadcrumb"
        style={{ "--bs-breadcrumb-divider": "'>>'" }}
      >
        <ol
          className="breadcrumb"
          style={{ color: "white", marginLeft: "20px" }}
        >
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>{" "}
          </li>
          <li className="breadcrumb-item">
            <Link to="">Payslip</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Appraisal Details
          </li>
        </ol>
      </nav>

      <div className="container pt-3">
        <h1 className="Heading1" style={{ textAlign: "center" }}>
          Appraisal Details
        </h1>
        <div className="col-md-8 mx-auto">
          <div
            className="card border-0 shadow"
            style={{ marginRight: "100px", width: "700px", height: "950px" }}
          >
            <div className="card-body">
              <form className="container py-3  mb-3">
                <div className="row mb-3">
                  <label htmlFor="EmpId" className="col-sm-2 col-form-label">
                    Emp ID
                  </label>
                  <div className="col-sm-10">
                    <input
                      onChange={handle}
                      type="text"
                      id="empid"
                      placeholder="Enter Emp id"
                      className="form-control"
                    />
                    {errors.basic && (
                      <div className="text-danger">{errors.empId}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="details" className="col-sm-2 col-form-label">
                    Year
                  </label>
                  <div className="col-sm-10">
                  <select onChange={handle} value={data.year} className="form-select" id="year">
                                                <option value="">Select Year</option>
                                                {years.map((year, index) => (
                                                    <option key={index} value={year}>{year}</option>
                                                ))}
                                            </select>
                    {errors.basic && (
                      <div className="text-danger">{errors.basic}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="details"
                    className="col-sm-2 col-form-label"
                  >
                    Month
                  </label>
                  <div className="col-sm-10">
                  <select onChange={handle} value={data.month} className="form-select" id="month">
                                                <option value="">Select Month</option>
                                                {months.map((month, index) => (
                                                    <option key={index} value={month}>{month}</option>
                                                ))}
                                            </select>
                    {errors.houseRentAllowance && (
                      <div className="text-danger">
                        {errors.houseRentAllowance}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="details"
                    className="col-sm-2 col-form-label"
                  >
                        Date   
                  </label>
                  <div className="col-sm-10">
                    <input
                      onChange={handle}
                      type="date"
                      id="date"
                      className="form-control"
                    />
                    {errors.employeeESICAmount && (
                      <div className="text-danger">
                        {errors.employeeESICAmount}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="details"
                    className="col-sm-2 col-form-label"
                  >
                   Amount
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      id="amount"
                      placeholder="Enter Amount"
                      className="form-control"
                    />
                    {errors.employerESICAmount && (
                      <div className="text-danger">
                        {errors.employerESICAmount}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="details"
                    className="col-sm-2 col-form-label"
                  >
                    Salary
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      id="salary"
                      placeholder="Enter salary"
                      className="form-control"
                    />
                    {errors.employeePFAmount && (
                      <div className="text-danger">
                        {errors.employeePFAmount}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="details"
                    className="col-sm-2 col-form-label"
                  >
                   Variable
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      id="variable"
                      placeholder="Enter Variable"
                      className="form-control"
                    />
                    {errors.employerPFAmount && (
                      <div className="text-danger">
                        {errors.employerPFAmount}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="grossSalary"
                    className="col-sm-2 col-form-label"
                  >
                    Bonus
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      id="bonus"
                      placeholder="Enter Bonus"
                      className="form-control"
                    />
                    {errors.grossSalary && (
                      <div className="text-danger">{errors.grossSalary}</div>
                    )}
                  </div>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto">
                  <button
                    onClick={(e) => submit(e)}
                    className="btn btn-outline-danger"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAppraisalDetails;
