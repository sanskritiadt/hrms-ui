
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, json } from "react-router-dom";
import { toast } from "react-toastify";
import handleAuthError from "./CommonErrorHandling";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("response-token");
  const [data, setData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    salary: "",
    maritalStatus: "",
    mobileNo: "",
    joinDate: "",
    gender: "",
    dob: "",
    designation: "",
    isActive: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    email: "",
    isEmailVerified: "",
    userName: "",
    resume: [],
    aadhar: [],
    pan: [],
  });
  const panData = new FormData();
  const aadhData = new FormData();
  const resumeData = new FormData();

  useEffect(() => {
    axios
      .get(`/apigateway/hrms/employee/getById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);

        setData(response.data);
      })
      .catch((error) => {
        handleAuthError(error);
        console.log(error);
      });
  }, []);
  
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    // Append form data
    const body = {
      employeeId: data.employeeId,
      firstName: data.firstName,
      lastName: data.lastName,
      salary: data.salary,
      maritalStatus: data.maritalStatus,
      mobileNo: data.mobileNo,
      joinDate: data.joinDate,
      gender: data.gender,
      dob: data.dob,
      designation: data.designation,
      isActive: data.isActive,
      bankName: data.bankName,
      accountNumber: data.accountNumber,
      ifscCode: data.ifscCode,
      email: data.email,
      isEmailVerified: data.isEmailVerified,
      userName: data.userName,
    };
    // Only append files if they are present
    if (data.resume && data.resume.length > 0) {
      for (let i = 0; i < data.resume.length; i++) {
        resumeData.append("file", data.resume[i]);
      }
    }

    if (data.aadharCard && data.aadharCard.length > 0) {
      for (let i = 0; i < data.aadharCard.length; i++) {
        aadhData.append("image", data.aadharCard[i]);
      }
    }

    if (data.panCard && data.panCard.length > 0) {
      for (let i = 0; i < data.panCard.length; i++) {
        panData.append("image1", data.panCard[i]);
      }
    }
    formData.append('resume', resumeData);
    formData.append('emp', JSON.stringify(body));
    formData.append('aadhar', aadhData);
    formData.append('pan', panData);
    axios
      .put(`/apigateway/hrms/employee/updateEmp`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Candidate data has been updated successfully.", {
          position: "top-center",
          theme: "colored",
        });
        navigate("/empfunc");
      })
      .catch((error) => {
        // handleAuthError(error);
        console.log(error.response.data);
        toast.error("Error, try after sometime.", {
          position: "top-center",
          theme: "colored",
        });
      });
  }
  
  return (
    <div className="container pt-3">
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          <div
            className="card border-0 shadow"
            style={{ width: "700px", height: "1500px" }}
          >
            <div className="card-body">
              <form className="container py-3  mb-3" onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-2 col-form-label"
                    name="id"
                  >
                    ID:
                  </label>
                  <div className="col-sm-10">
                    <input
                      disabled
                      value={data.employeeId || ""}
                      type="text"
                      className="form-control"
                      id="id"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-2 col-form-label"
                    name="isEmailVerified"
                  >
                    Email Verified
                  </label>
                  <div className="col-sm-10">
                    <input
                      disabled
                      value={data.isEmailVerified || ""}
                      type="text"
                      className="form-control"
                      id="isEmailVerified"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-2 col-form-label"
                    name="email"
                  >
                    Email
                  </label>
                  <div className="col-sm-10">
                    <input
                      disabled
                      value={data.email || ""}
                      type="email"
                      className="form-control"
                      id="email"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-2 col-form-label"
                    name="firstName"
                  >
                    First Name
                  </label>
                  <div className="col-sm-10">
                    <input
                      value={data.firstName || ""}
                      onChange={(e) =>
                        setData({ ...data, firstName: e.target.value })
                      }
                      type="text"
                      className="form-control"
                      id="firstName"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputEmail3"
                    className="col-sm-2 col-form-label"
                    name="lastName"
                  >
                    Last Name
                  </label>
                  <div className="col-sm-10">
                    <input
                      value={data.lastName || ""}
                      onChange={(e) =>
                        setData({ ...data, lastName: e.target.value })
                      }
                      type="text"
                      id="lastName"
                      step="0.1"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-2 col-form-label"
                    name="dob"
                  >
                    DOB
                  </label>
                  <div className="col-sm-10">
                    <input
                      value={data.dob || ""}  
                      onChange={(e) =>
                        setData({ ...data, dob: e.target.value })
                      }
                      type="date"
                      className="form-control"
                      id="dob"
                    />
                  </div>  
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-2 col-form-label"
                    name="highestQualification"
                  >
                    Mobile No
                  </label>
                  <div className="col-sm-10">
                    <input
                      value={data.mobileNo || ""}
                      onChange={(e) =>
                        setData({ ...data, mobileNo: e.target.value })
                      }
                      type="number"
                      className="form-control"
                      placeholder="enter your mobile number. ."
                      id="mobileNo"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-2 col-form-label"
                    name="salary"
                  >
                    Salary
                  </label>
                  <div className="col-sm-10">
                    <input
                      value={data.salary || ""}
                      onChange={(e) =>
                        setData({ ...data, salary: e.target.value })
                      }
                      type="number"
                      className="form-control"
                      id="salary"
                      min="1"
                      step="1"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-2 col-form-label"
                    name="maritalStatus"
                  >
                    Marital Status
                  </label>
                  <div className="col-sm-10">
                    <input
                      value={data.maritalStatus || ""}
                      onChange={(e) =>
                        setData({ ...data, maritalStatus: e.target.value })
                      }
                      type="text"
                      className="form-control"
                      id="maritalStatus"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-2 col-form-label"
                    name="joinDate"
                  >
                    Join Date
                  </label>
                  <div className="col-sm-10">
                    <input
                      value={data.joinDate || ""}
                      onChange={(e) =>
                        setData({ ...data, joinDate: e.target.value })
                      }
                      type="date"
                      className="form-control"
                      placeholder="created By"
                      id="joinDate"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-2 col-form-label"
                    name="gender"
                  >
                    Gender
                  </label>
                  <div className="col-sm-10">
                    <input
                      value={data.gender || ""}
                      onChange={(e) =>
                        setData({ ...data, gender: e.target.value })
                      }
                      type="text"
                      className="form-control"
                      id="gender"
                    />
                  </div>
                </div>
                {/* <fieldset className="row mb-3">
                                    <legend className="col-form-label col-sm-2 pt-0">IsActive</legend>
                                    <div className="col-sm-10">
                                        <div className="form-check form-check-inline">
                                            <input checked={data.isActive} value={data.isActive} onChange={e => setData({ ...data, isActive: e.target.value })} className="form-check-input" type="radio" name="inlineRadioOptions" id="true" />
                                            <label className="form-check-label" htmlFor="true">Yes</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input checked={data.isActive} value={data.isActive} onChange={e => setData({ ...data, isActive: e.target.value })} className="form-check-input" type="radio" name="inlineRadioOptions" id="false" />
                                            <label className="form-check-label" htmlFor="false">No</label>
                                        </div>
                                    </div>
                                </fieldset> */}
                {/* The first input element is a radio button for "Yes" and is checked if data.isActive is true. The value prop is also set to data.isActive so that the value of the radio button matches the value in the state. The onChange handler updates the isActive value in the state when this radio button is selected.*/}
                <fieldset className="row mb-3">
                  <legend className="col-form-label col-sm-2 pt-0">
                    Active
                  </legend>
                  <div className="col-sm-10">
                    <div className="form-check form-check-inline">
                      <input
                        checked={data.isActive === true}
                        value={true || ""}
                        onChange={(e) => setData({ ...data, isActive: true })}
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="true"
                      />
                      <label className="form-check-label" htmlFor="true">
                        Yes
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        checked={data.isActive === false}
                        value={false || ""}
                        onChange={(e) => setData({ ...data, isActive: false })}
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="false"
                      />
                      <label className="form-check-label" htmlFor="false">
                        No
                      </label>
                    </div>
                  </div>
                </fieldset>
                <div className="row mb-3">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-2 col-form-label"
                    name="designation"
                  >
                    Designation
                  </label>
                  <div className="col-sm-10">
                    <input
                      value={data.designation || ""}
                      onChange={(e) =>
                        setData({ ...data, designation: e.target.value })
                      }
                      type="text"
                      className="form-control"
                      id="designation"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-2 col-form-label"
                    name="bankName"
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
                      className="form-control"
                      id="bankName"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-2 col-form-label"
                    name="accountNumber"
                  >
                    Account Number
                  </label>
                  <div className="col-sm-10">
                    <input
                      value={data.accountNumber || ""}
                      onChange={(e) =>
                        setData({ ...data, accountNumber: e.target.value })
                      }
                      type="number"
                      className="form-control"
                      id="accountNumber"
                      min="1"
                      step="1"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-2 col-form-label"
                    name="ifscCode"
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
                      id="ifscCode"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-2 col-form-label"
                  >
                    Upload Resume
                  </label>
                  <div className="col-sm-10">
                    <input
                      onChange={(e) =>
                        setData({ ...data, resume: e.target.files })
                      }
                      type="file"
                      multiple
                      className="form-control"
                      id="resume"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-2 col-form-label"
                  >
                    Upload Aadhar{" "}
                  </label>
                  <div className="col-sm-10">
                    <input
                      onChange={(e) =>
                        setData({ ...data, aadharCard: e.target.files })
                      }
                      type="file"
                      multiple
                      className="form-control"
                      id="aadhar"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-2 col-form-label"
                  >
                    Upload PAN
                  </label>
                  <div className="col-sm-10">
                    <input
                      onChange={(e) =>
                        setData({ ...data, panCard: e.target.files })
                      }
                      type="file"
                      multiple
                      className="form-control"
                      id="pan"
                    />
                  </div>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto">
                  <button className="btn btn-outline-success" type="submit">
                    Update Employeee
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

export default EditEmployee;
