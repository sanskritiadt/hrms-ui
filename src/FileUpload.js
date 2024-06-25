import React, { useState } from "react";
import axios from "axios";
import LoadingPage from "./LoadingPage";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
function FileUpload() {
  // const token = localStorage.getItem("response-token");
  const token = useSelector((state) => state.auth.token);

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState(null);
  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  
  function Submit(event) {
    event.preventDefault();
    setLoading(true);
    axios
      .get(
        `/apigateway/payroll/generatePaySlipForAll?emailInput=${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        alert(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.message || "Error creating details");
        setLoading(false);
      });
  }

  function handleSubmit(event) {
    console.log(file);
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    axios
      .post(`/apigateway/payroll/genPayAll`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        alert(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.message || "Error creating details");
        setLoading(false);
      });
  }

  return (
    <div className="d-flex ">
      {" "}
      {loading ? <LoadingPage /> : ""}
      <form onSubmit={Submit}>
        Email  <input type="email" onChange={handleEmailChange} placeholder="Enter Email."/> 
        <button type="submit">
          generate all Payslip from DB{" "}
        </button>
      </form>
      <form onSubmit={handleSubmit} >
        <input type="file" onChange={handleFileChange} className="mb-4" />

        <button type="submit">generate all Payslip with excel</button>
      </form>
    </div>
  );
}

export default FileUpload;
