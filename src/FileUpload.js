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
  const [email, setEmail] = useState();
  const [isDBSelected, setIsDBSelected] = useState(false);
  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }
  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  var str2bool = (value) => {
    if (value && typeof value === "string") {
      if (value.toLowerCase() === "true") return true;
      if (value.toLowerCase() === "false") return false;
    }
    return value;
  };
  function handleSelectType(event) {
    setIsDBSelected(str2bool(event.target.value));
    console.log(str2bool(event.target.value));
  }

  // function Submit(event) {
  //   event.preventDefault();
  //   setLoading(true);
  //   axios
  //     .get(`/apigateway/payroll/generatePaySlipForAll?emailInput=${email}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       alert(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       toast.error(error.response.data.message || "Error creating details");
  //       setLoading(false);
  //     });
  // }




  function Submit(event) {
    event.preventDefault();

    let url = `/apigateway/payroll/generatePaySlipForAll?isDBSelected=${isDBSelected}`;

    if (email) {
      url += `&emailInput=${email}`;
    }

    setLoading(true);
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        alert(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data || "Error creating details");
        setLoading(false);
      });
  }


  function handleSubmit(event) {
    console.log(file);
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    let url = "/apigateway/payroll/genPayAll";
    if (email) {
      url += `?email=${email}`;
    }

    setLoading(true);
    axios
      .post(url, formData, {
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
      {loading ? <LoadingPage /> : ""}
      <form onSubmit={Submit}>
        Do you want to save the records in DB?
        <label>
          <input
            type="radio"
            name="type"
            value="false"
            id="db"
            onChange={handleSelectType}
            defaultChecked
            defaultValue={isDBSelected}
          />
          Non-DB
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="true"
            id="db"
            onChange={handleSelectType}
            checked={isDBSelected === true}
          />
          DB
        </label>
        Email
        <input
          type="email"
          onChange={handleEmailChange}
          placeholder="Enter Email."
        />
        <button type="submit">generate all Payslip from DB</button>
      </form>
      <form onSubmit={handleSubmit}>
        Email
        <input
          type="email"
          onChange={handleEmailChange}
          placeholder="Enter Email."
        />
        <input
          type="file"
          required
          onChange={handleFileChange}
          className="mb-4"
        />
        <button type="submit">generate all Payslip with excel</button>
      </form>
    </div>
  );
}

export default FileUpload;
