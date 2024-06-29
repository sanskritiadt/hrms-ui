import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import handleAuthError from "./CommonErrorHandling";
import { Link } from "react-router-dom";
import LoadingPage from './LoadingPage';
import { useSelector } from 'react-redux';
import {
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
    Button,
    FormControl,
    FormLabel,
    Box
  } from '@mui/material';
import { Padding } from "@mui/icons-material";
const AddAppraisalDetails = () => {
  // const token = localStorage.getItem("response-token");
  // const empId = localStorage.getItem("EmpID");
  const  token = useSelector((state) => state.auth.token);
  const  empId = useSelector((state) => state.auth.empId);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('appraisal');

const initialappraisalData ={
  empId: "",
  year: "",
  month: null,
  appraisalDate: null,
  amount: null,
  salary: null,
  variable: "",
  bonus: ""
}
const initalrewardsData={
  empId: "",
  rewardType: "",
  appraisalDate: null,
  amount: null
}
const [appraisalData, setAppraisalData] = useState(initialappraisalData);
  const [rewardsData, setRewardsData] = useState(initalrewardsData);
  const years = Array.from(new Array(10), (val, index) => new Date().getFullYear() + index);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const submit = (e) => {
    e.preventDefault();
      setLoading(true); 
      axios
        .post(
          `/apigateway/payroll/salarydetails/addAppraisalDetails`,appraisalData,
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
          setAppraisalData(initialappraisalData)
        })
        .catch((error) => {
          console.log(error);
          toast.error( error.response.data || "Error saving details." );
          setLoading(false); 
        });
  };
  const submitRewards = (e) => {
    e.preventDefault();
      setLoading(true); 
      axios
        .post(
          `/apigateway/payroll/salarydetails/saveRewardDetails`,
          rewardsData,
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
          setRewardsData(initalrewardsData)
        })
        .catch((error) => {
          console.log(error);
          toast.error( error.response.data.message || "Error saving details." );
          setLoading(false); 
          setRewardsData(initalrewardsData)
        });
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  function handle(e) {
    if(selectedOption === 'appraisal'){
    const newdata = { ...appraisalData };
    newdata[e.target.id] = e.target.value;
    setAppraisalData(newdata);
    console.log(newdata);
    }else{
    const newdata = { ...rewardsData };
    newdata[e.target.id] = e.target.value;

    setRewardsData(newdata);
    console.log(newdata);
    }
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
            <Link to="">Performance & Reward</Link>
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
            style={{ marginRight: "80px", width: "700px", height: "950px" }}
          >
            <div className="card-body">
            <FormControl component="fieldset" className="container py-3  mb-3" style={{ marginLeft: "20px" }} >
            <div className="row mb-3" >
                <FormLabel component="legend" className="col-sm-2" >Select Option</FormLabel>
                <div className="col-sm-10">
                <RadioGroup
                  aria-label="option"
                  name="option"
                  value={selectedOption}
                  onChange={handleOptionChange}
                  row
                >
                  <FormControlLabel value="appraisal" control={<Radio />} label="Add Appraisal Details" />
                  <FormControlLabel value="rewards" control={<Radio />} label="Add Rewards" />
                </RadioGroup>
                </div>
                </div>
              </FormControl>
              <form className="container py-3  mb-3" style={{ marginTop: "-50px" }}>
                <div className="row mb-3">
                  <label htmlFor="EmpId" className="col-sm-2 col-form-label">
                    Emp ID
                  </label>
                  <div className="col-sm-10">
                    <input
                      onChange={handle}
                      value={appraisalData.empId}
                      type="text"
                      id="empId"
                      placeholder="Enter Emp id"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="details"
                    className="col-sm-2 col-form-label"
                  >
                        Effective Date   
                  </label>
                  <div className="col-sm-10">
                    <input
                      onChange={handle}
                      value={appraisalData.appraisalDate}
                      type="date"
                      id="date"
                      className="form-control"
                    />
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
                      onChange={handle}
                      value={appraisalData.amount}
                      type="number"
                      id="amount"
                      placeholder="Enter Amount"
                      className="form-control"
                    />
                  </div>
                </div>
                {selectedOption !== 'appraisal' && (
                  <>
                   <div className="row mb-3">
                  <label
                    htmlFor="details"
                    className="col-sm-2 col-form-label"
                  >
                   Reward Type
                  </label>
                  <div className="col-sm-10">
                    <input
                      onChange={handle}
                      value={rewardsData.rewardType}
                      type="text"
                      id="rewardType"
                      placeholder="Enter Reward type."
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto">
                  <button
                    onClick={(e) => submitRewards(e)}
                    className="btn btn-outline-danger"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
                </> 
                
            )}
                {selectedOption === 'appraisal' && (
                  <>
                <div className="row mb-3">
                  <label htmlFor="details" className="col-sm-2 col-form-label">
                    Year
                  </label>
                  <div className="col-sm-3" style={{ marginBottom: "30px" }}>
                  <select onChange={handle} value={appraisalData.year} className="form-select" id="year">
                                                <option value="">Year</option>
                                                {years.map((year, index) => (
                                                    <option key={index} value={year}>{year}</option>
                                                ))}
                                            </select>           
                  </div>
                  <label htmlFor="details" className="col-sm-2 col-form-label">
                    Month
                  </label>
                  <div className="col-sm-3" style={{ marginRight: "90px", marginBottom: "30px" }}>
                  <select onChange={handle} value={appraisalData.month} className="form-select" id="month">
                                                <option value="">Month</option>
                                                {months.map((month, index) => (
                                                    <option key={index} value={month}>{month}</option>
                                                ))}
                                            </select>             
                  </div>  
                </div>
                {/* <div className="row mb-3">
                  <label
                    htmlFor="details"
                    className="col-sm-2 col-form-label"
                  >
                    Month
                  </label>
                  <div className="col-sm-10">
                  <select onChange={handle} value={appraisalData.month} className="form-select" id="month">
                                                <option value="">Select Month</option>
                                                {months.map((month, index) => (
                                                    <option key={index} value={month}>{month}</option>
                                                ))}
                                            </select>
                    {errors.month && (
                      <div className="text-danger">
                        {errors.month}
                      </div>
                    )}                
                  </div>
                </div> */}
                <div className="row mb-3">
                  <label
                    htmlFor="details"
                    className="col-sm-2 col-form-label"
                  >
                    Salary
                  </label>
                  <div className="col-sm-10">
                    <input
                      onChange={handle}
                      value={appraisalData.salary}
                      type="number"
                      id="salary"
                      placeholder="Enter salary"
                      className="form-control"
                    />
                    
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
                      onChange={handle}
                      value={appraisalData.variable}
                      type="number"
                      id="variable"
                      placeholder="Enter Variable"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="bonus"
                    className="col-sm-2 col-form-label"
                  >
                    Bonus
                  </label>
                  <div className="col-sm-10">
                    <input
                      onChange={handle}
                      value={appraisalData.bonus}
                      type="number"
                      id="bonus"
                      placeholder="Enter Bonus"
                      className="form-control"
                    />
                    
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
                </>
            )}
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAppraisalDetails;
