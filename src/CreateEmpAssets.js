import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const CreateEmpAssets = () => {
  const token = localStorage.getItem("response-token");
  const [data, setData] = useState({
    assetUser: "",
    assetName: "",
    assetId: "",
    assetNo: "",
    assetType: "",
    processor: "",
    ram: "",
    diskType: "",
    operatingSystem: "",
    purchesDate: "",
    warrenty: "",
    warrentyDate: "",
    status: "",
  });
  function submit(e) {
    e.preventDefault();
    axios
      .post(
        `/apigateway/hrms/masterAsset/insertAssets`,
        {
          assetUser: data.assetUser,
          assetName: data.assetName,
          assetId: data.assetId,
          assetNo: data.assetNo,
          assetType: data.assetType,
          processor: data.processor,
          ram: data.ram,
          diskType: data.diskType,
          operatingSystem: data.operatingSystem,
          purchesDate: data.purchesDate,
          warrenty: data.warrenty,
          warrentyDate: data.warrentyDate,
          status: data.status,
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
        toast.error("Error occured try after sometime!!", {
          position: "top-center",
          theme: "colored",
        });
      });
  }
  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  }
  // {
  //     "assetUser": "nidhi",
  //     "assetName": "v djhdb",
  //     "assetId": "235667",
  //     "assetNo": " nn vvdv",
  //     "assetType": "jhuisd",
  //     "processor": "sakjhf",
  //     "ram": "78",
  //     "diskType": "askjdj",
  //     "operatingSystem": "sakfn",
  //     "purchesDate": "2023-06-01",
  //     "warrenty": "sdkjhf",
  //     "warrentyDate": "2023-06-09",
  //     "status": "jksahu"
  // }
  return (
    <div>
      {" "}
      <nav
        aria-label="breadcrumb"
        style={{ "--bs-breadcrumb-divider": "'>>'" }}
      >
        <ol className="breadcrumb" style={{ color: "white" }}>
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>{" "}
          </li>
          <li className="breadcrumb-item">
            <a href="">Employee Management</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Employee Position
          </li>
        </ol>
      </nav>
      <div className="container pt-3">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div
              className="card border-0 shadow"
              style={{ marginLeft: "100px", width: "700px", height: "1100PX" }}
            >
              <div className="card-body">
                <form
                  className="container py-3  mb-3"
                  onSubmit={(e) => {
                    submit(e);
                  }}
                >
                  <div className="row mb-3">
                    <label
                      htmlFor="inputEmail3"
                      className="col-sm-2 col-form-label"
                      name="assetUser"
                    >
                      Asset User
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => {
                          handle(e);
                        }}
                        value={data.assetUser || ""}
                        type="text"
                        id="assetUser"
                        placeholder="Enter asset user name"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputEmail3"
                      className="col-sm-2 col-form-label"
                      name="assetName"
                    >
                      Asset Name
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => {
                          handle(e);
                        }}
                        value={data.assetName || ""}
                        type="text"
                        id="assetName"
                        placeholder="Enter asset name"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputEmail3"
                      className="col-sm-2 col-form-label"
                      name="assetId"
                    >
                      Asset Id
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => {
                          handle(e);
                        }}
                        value={data.assetId || ""}
                        type="text"
                        id="assetId"
                        placeholder="Enter asset Id"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputEmail3"
                      className="col-sm-2 col-form-label"
                      name="assetNo"
                    >
                      Asset Number
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => {
                          handle(e);
                        }}
                        value={data.assetNo || ""}
                        type="text"
                        id="assetNo"
                        placeholder="Enter asset number"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-2 col-form-label"
                      name="assetType"
                    >
                      Asset Type
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => {
                          handle(e);
                        }}
                        value={data.assetType || ""}
                        type="text"
                        className="form-control"
                        placeholder="Enter asset asset type."
                        id="assetType"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-2 col-form-label"
                      name="processor"
                    >
                      Processor
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => {
                          handle(e);
                        }}
                        value={data.processor || ""}
                        type="text"
                        className="form-control"
                        placeholder="Enter asset processor"
                        id="processor"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-2 col-form-label"
                      name="ram"
                    >
                      RAM
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => {
                          handle(e);
                        }}
                        value={data.ram || ""}
                        type="text"
                        className="form-control"
                        placeholder="Enter asset ram."
                        id="ram"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-2 col-form-label"
                      name="diskType"
                    >
                      Disk Type
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => {
                          handle(e);
                        }}
                        value={data.diskType || ""}
                        type="text"
                        className="form-control"
                        placeholder="Enter asset disk type"
                        id="diskType"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-2 col-form-label"
                      name="operatingSystem"
                    >
                      Operating System
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => {
                          handle(e);
                        }}
                        value={data.operatingSystem || ""}
                        type="text"
                        className="form-control"
                        placeholder="Enter asset operating system"
                        id="operatingSystem"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-2 col-form-label"
                      name="purchesDate"
                    >
                      Purchase Date
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => {
                          handle(e);
                        }}
                        value={data.purchesDate || ""}
                        type="date"
                        className="form-control"
                        id="purchesDate"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-2 col-form-label"
                      name="warrenty"
                    >
                      Warranty
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => {
                          handle(e);
                        }}
                        value={data.warrenty || ""}
                        type="text"
                        className="form-control"
                        placeholder="Enter warranty."
                        id="warrenty"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-2 col-form-label"
                      name="warrentyDate"
                    >
                      Warranty Date
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => {
                          handle(e);
                        }}
                        value={data.warrentyDate || ""}
                        type="date"
                        className="form-control"
                        id="warrentyDate"
                      />
                    </div>
                  </div>
                  <fieldset className="row mb-3">
                    <legend className="col-form-label col-sm-2 pt-0">
                      Status
                    </legend>
                    <div className="col-sm-10">
                      <div className="form-check form-check-inline">
                        <input
                          onChange={(e) => {
                            handle(e);
                          }}
                          value="true"
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="status"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio1"
                        >
                          Active
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          onChange={(e) => {
                            handle(e);
                          }}
                          value="false"
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="status"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio2"
                        >
                          InActive
                        </label>
                      </div>
                    </div>
                  </fieldset>
                  <div className="d-grid gap-2 col-6 mx-auto">
                    <button className="btn btn-outline-danger" type="submit">
                      Submit
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
};

export default CreateEmpAssets;
