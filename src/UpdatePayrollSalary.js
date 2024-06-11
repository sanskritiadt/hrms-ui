import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Box, Tabs, Tab } from "@mui/material";
import UpdateEmpDocumentByAdmin from "./UpdateEmpDocumentByAdmin";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import LoadingPage from "./LoadingPage";
import { useSelector } from 'react-redux';
const UpdatePayrollSalary = () => {
  const [activeTab, setActiveTab] = useState("one");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    empId: "",
    salary: "",
    bankName: "",
    designation: "",
    joinDate: "",
    accountNumber: "",
    ifscCode: "",
    basic: "",
    houseRentAllowance: "",
    employeeESICAmount: "",
    employerESICAmount: "",
    employeePFAmount: "",
    employerPFAmount: "",
    grossSalary: "",
    netSalary: "",
    medicalInsurance: "",
  });
  const { id } = useParams();
  // const token = localStorage.getItem("response-token");
  const  token = useSelector((state) => state.auth.token);

  const baseURL = "/apigateway/payroll";

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setLoading(true); 
    axios
      .get(`${baseURL}/getEmployeePayrollSalaryDetailsByEmpId/${id}`, {
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
        toast.error(error.response.data.message);
        setLoading(false);
      });
  }, [id, token]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post(`${baseURL}/salarydetails/saveEmployeeSalaryDetails`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading(false);
        //console.log("Data saved successfully", response.data);
        toast.success(response.data, {
          position: "top-center",
          theme: "colored",
        });
      })
      .catch((error) => {
       // console.log("Error saving data", error);
       toast.error( error.response.data.message || "Error creating details" );
       setLoading(false);
      });
  };

  return (
    <div style={{ width: screenWidth - 70 }}>
        {loading && <LoadingPage />}
      <Container>
        <Box sx={{ borderBottom: 2, borderColor: "divider", width: "100%" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="Tabs example"
          >
            <Tab value="one" label="Payroll Details" />
            <Tab value="two" label="Salary Details" />
            <Tab value="three" label="Document Details" />
          </Tabs>
        </Box>
        <Container>
          {activeTab === "one" && (
            <div
              className="container pt-3"
              style={{ width: "1000px", height: "800px" }}
            >
              <div className="row">
                <div className="col-lg-8 col-md-8 mx-auto">
                  <div className="card border-0 shadow">
                    <div className="card-body">
                      <form className="container py-3 mb-3">
                        <div className="row mb-3">
                          <label
                            htmlFor="empId"
                            className="col-sm-2 col-form-label"
                          >
                            EmployeeId
                          </label>
                          <div className="col-sm-10">
                            <input
                              value={data.empId || ""}
                              type="text"
                              className="form-control"
                              id="empId"
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="salary"
                            className="col-sm-2 col-form-label"
                          >
                            Salary
                          </label>
                          <div className="col-sm-10">
                            <input
                              value={data.salary || ""}
                              type="text"
                              className="form-control"
                              id="salary"
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="bankName"
                            className="col-sm-2 col-form-label"
                          >
                            Bank Name
                          </label>
                          <div className="col-sm-10">
                            <input
                              value={data.bankName || ""}
                              name="bankName"
                              onChange={handleInputChange}
                              type="text"
                              className="form-control"
                              id="bankName"
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="designation"
                            className="col-sm-2 col-form-label"
                          >
                            Designation
                          </label>
                          <div className="col-sm-10">
                            <input
                              value={data.designation || ""}
                              name="designation"
                              onChange={handleInputChange}
                              type="text"
                              className="form-control"
                              id="designation"
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="joinDate"
                            className="col-sm-2 col-form-label"
                          >
                            Join Date
                          </label>
                          <div className="col-sm-10">
                            <input
                              value={data.joinDate || ""}
                              name="joinDate"
                              onChange={handleInputChange}
                              type="date"
                              className="form-control"
                              id="joinDate"
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="accountNumber"
                            className="col-sm-2 col-form-label"
                          >
                            Account Number
                          </label>
                          <div className="col-sm-10">
                            <input
                              value={data.accountNumber || ""}
                              name="accountNumber"
                              onChange={handleInputChange}
                              type="text"
                              className="form-control"
                              id="accountNumber"
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="ifscCode"
                            className="col-sm-2 col-form-label"
                          >
                            IFSC Code
                          </label>
                          <div className="col-sm-10">
                            <input
                              value={data.ifscCode || ""}
                              name="ifscCode"
                              onChange={handleInputChange}
                              type="text"
                              className="form-control"
                              id="ifscCode"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === "two" && (
            <div
              className="container pt-3"
              style={{ width: "1000px", height: "800px" }}
            >
              <div className="row">
                <div className="col-lg-8 col-md-8 mx-auto">
                  <div className="card border-0 shadow">
                    <div className="card-body">
                      <form
                        className="container py-3 mb-3"
                        onSubmit={handleSubmit}
                      >
                        <div className="row mb-3">
                          <label
                            htmlFor="basic"
                            className="col-sm-2 col-form-label"
                          >
                            Basic
                          </label>
                          <div className="col-sm-10">
                            <input
                              value={data.basic || ""}
                              name="basic"
                              onChange={handleInputChange}
                              type="text"
                              className="form-control"
                              id="basic"
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="houseRentAllowance"
                            className="col-sm-2 col-form-label"
                          >
                            H R A
                          </label>
                          <div className="col-sm-10">
                            <input
                              value={data.houseRentAllowance || ""}
                              name="houseRentAllowance"
                              onChange={handleInputChange}
                              type="text"
                              className="form-control"
                              id="houseRentAllowance"
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="employeeESICAmount"
                            className="col-sm-2 col-form-label"
                          >
                            Employee ESIC
                          </label>
                          <div className="col-sm-10">
                            <input
                              value={data.employeeESICAmount || ""}
                              name="employeeESICAmount"
                              onChange={handleInputChange}
                              type="text"
                              className="form-control"
                              id="employeeESICAmount"
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="employerESICAmount"
                            className="col-sm-2 col-form-label"
                          >
                            Employer ESIC
                          </label>
                          <div className="col-sm-10">
                            <input
                              value={data.employerESICAmount || ""}
                              name="employerESICAmount"
                              onChange={handleInputChange}
                              type="text"
                              className="form-control"
                              id="employerESICAmount"
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="employeePFAmount"
                            className="col-sm-2 col-form-label"
                          >
                            Employee PF
                          </label>
                          <div className="col-sm-10">
                            <input
                              value={data.employeePFAmount || ""}
                              name="employeePFAmount"
                              onChange={handleInputChange}
                              type="text"
                              className="form-control"
                              id="employeePFAmount"
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="employerPFAmount"
                            className="col-sm-2 col-form-label"
                          >
                            Employer PF
                          </label>
                          <div className="col-sm-10">
                            <input
                              value={data.employerPFAmount || ""}
                              name="employerPFAmount"
                              onChange={handleInputChange}
                              type="text"
                              className="form-control"
                              id="employerPFAmount"
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="grossSalary"
                            className="col-sm-2 col-form-label"
                          >
                            Gross Salary
                          </label>
                          <div className="col-sm-10">
                            <input
                              value={data.grossSalary || ""}
                              name="grossSalary"
                              onChange={handleInputChange}
                              type="text"
                              className="form-control"
                              id="grossSalary"
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="netSalary"
                            className="col-sm-2 col-form-label"
                          >
                            Net Salary
                          </label>
                          <div className="col-sm-10">
                            <input
                              value={data.netSalary || ""}
                              name="netSalary"
                              onChange={handleInputChange}
                              type="text"
                              className="form-control"
                              id="netSalary"
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="medicalInsurance"
                            className="col-sm-2 col-form-label"
                          >
                            Medical Insurance
                          </label>
                          <div className="col-sm-10">
                            <input
                              value={data.medicalInsurance || ""}
                              name="medicalInsurance"
                              onChange={handleInputChange}
                              type="text"
                              className="form-control"
                              id="medicalInsurance"
                            />
                          </div>
                        </div>
                        <div className="d-grid gap-2 col-6 mx-auto">
                          <button
                            className="btn btn-outline-success"
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
          )}
          {activeTab === "three" && <UpdateEmpDocumentByAdmin />}
        </Container>
      </Container>
    </div>
  );
};

export default UpdatePayrollSalary;
