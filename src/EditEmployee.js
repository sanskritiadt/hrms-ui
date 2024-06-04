
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, json } from "react-router-dom";
import { toast } from "react-toastify";

import LoadingPage from './LoadingPage'

//   {
//     "employeeId": 19,
//     "updatedAt": "2024-04-04T14:58:27.225Z",
//     "isActive": true,
//     "dob": "08/05/1992",
//     "email": "ajaymishra.adt@gmail.com",
//     "firstName": "Ajay",
//     "gender": "Male",
//     "isEmailVerified": true,
//     "lastName": "Mishra",
//     "maritalStatus": "Married",
//     "mobileNo": 8975663255,
//     "userName": "ajaymishra"
// }

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("response-token");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    maritalStatus: "",
    mobileNo: "",
    gender: "",
    dob: "",
    designation: "",
    isActive: "",
    email: "",
    isEmailVerified: "",
    userName: "",
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/apigateway/hrms/employee/getById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        //console.log(response.data);
        setData(response.data);
        setLoading(false); 
      })
      .catch((error) => {
        toast.error( error.response.data.message || "Error fetching details" );
        console.log(error);
        setLoading(false); 
      });
  }, []);
  function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    
    const body = {
      employeeId: data.employeeId,
      firstName: data.firstName,
      lastName: data.lastName,
      maritalStatus: data.maritalStatus,
      mobileNo: data.mobileNo,
      gender: data.gender,
      dob: data.dob,
      designation: data.designation,
      isActive: data.isActive,
      email: data.email,
      isEmailVerified: data.isEmailVerified,
      userName: data.userName,
    };
   
    axios
      .put(`/apigateway/hrms/employee/updateEmp`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success(response.data, {
          position: "top-center",
          theme: "colored",
        });
        navigate("/empfunc");
        setLoading(false); 
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error( error.response.data.message || "Error updating details" );
        setLoading(false); 
      });
  }
  
  return (
    <div className="container pt-3"> 
    {loading ? <LoadingPage/> : ''}
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          <div
            className="card border-0 shadow"
            style={{ width: "700px", height: "850px" }}
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
