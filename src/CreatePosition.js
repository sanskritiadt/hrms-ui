import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { useSelector } from 'react-redux';
import ManageSkills from "./ManageSkills";

export default function CreatePosition() {
  // const token = localStorage.getItem("response-token");
  const  token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    positionName: "",
    techStack: "",
    vacancy: "",
    positionOpenDate: "",
    positionCloseDate: "",
    status: "",
    experienceInYear: "",
    positionType: "",
    remote: "",
  });
  const [selectedValue, setSelectedValue] = useState([]);
  const [techOptions, setTechOptions] = useState([]);
  console.log(selectedValue);

  useEffect(() => {
    axios
      .get(`/apigateway/hrms/interview/alltech`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const options = response.data.map((tech) => ({
          label: tech.description,
          value: tech.description,
        }));
        setTechOptions(options);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });
  }, [token]);

  function submit(e) {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        `/apigateway/hrms/interview/savePosition`,
        {
          positionName: data.positionName,
          techStack: selectedValue,
          vacancy: data.vacancy,
          positionOpenDate: data.positionOpenDate,
          positionCloseDate: data.positionCloseDate,
          status: data.status,
          experienceInYear: data.experienceInYear,
          positionType: data.positionType,
          remote: data.remote,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        toast.success("Position created successfully!!", {
          position: "top-center",
          theme: "colored",
        });
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log(error);
        setLoading(false);
      });
  }

  var str2bool = (value) => {
    if (value && typeof value === "string") {
      if (value.toLowerCase() === "true") return true;
      if (value.toLowerCase() === "false") return false;
    }
    return value;
  };

  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
    console.log(e);
  };

  function radiobut(e) {
    console.log(str2bool(e.target.value));
    data.remote = str2bool(e.target.value);
  }

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }

  return (
    <>
      <div className=" mt-3">
        <nav
          aria-label="breadcrumb"
          style={{ "--bs-breadcrumb-divider": "'>>'" }}
        >
          {loading ? <LoadingPage /> : ""}
          <ol
            className="breadcrumb"
            style={{ color: "white", marginLeft: "20px" }}
          >
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="">Hiring</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Create Position
            </li>
          </ol>
        </nav>
        <div className="container pt-3">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div
                className="card border-0 shadow"
                style={{ marginLeft: "100px", width: "700px", height: "800PX" }}
              >
                <div className="card-body">
                <ManageSkills/>
                  <form
                    className="container mb-3"
                    onSubmit={(e) => {
                      submit(e);
                    }}
                  >
                    <div className="row mb-3">
                      <label
                        htmlFor="positionName"
                        className="col-sm-2 col-form-label"
                      >
                        Position-Name
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            handle(e);
                          }}
                          value={data.positionName}
                          type="text"
                          id="positionName"
                          placeholder="enter your positionName"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="techStack"
                        className="col-sm-2 col-form-label"
                      >
                        Tech-Stack
                      </label>
                      <div className="col-sm-10">
                        <Select
                          isMulti
                          name="techStack"
                          options={techOptions}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={handleChange}
                          value={techOptions.filter((obj) =>
                            selectedValue.includes(obj.value)
                          )}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="vacancy"
                        className="col-sm-2 col-form-label"
                      >
                        Vacancy
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            handle(e);
                          }}
                          value={data.vacancy}
                          type="text"
                          id="vacancy"
                          placeholder="enter your vacancy"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="experienceInYear"
                        className="col-sm-2 col-form-label"
                      >
                        Experience in years
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            handle(e);
                          }}
                          value={data.experienceInYear}
                          type="text"
                          id="experienceInYear"
                          placeholder="enter your experience in years"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="positionOpenDate"
                        className="col-sm-2 col-form-label"
                      >
                        Position open date
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            handle(e);
                          }}
                          value={data.positionOpenDate}
                          type="date"
                          className="form-control"
                          id="positionOpenDate"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="positionCloseDate"
                        className="col-sm-2 col-form-label"
                      >
                        Position close date
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            handle(e);
                          }}
                          value={data.positionCloseDate}
                          type="date"
                          className="form-control"
                          id="positionCloseDate"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="positionType"
                        className="col-sm-2 col-form-label"
                      >
                        Position type:
                      </label>
                      <div className="col-sm-10">
                        <select
                          id="positionType"
                          value={data.positionType}
                          onChange={(e) => {
                            handle(e);
                          }}
                          className="form-select"
                        >
                          <option defaultValue>
                            Select your position type
                          </option>
                          <option value="Permanent">Permanent</option>
                          <option value="Contractual">Contractual</option>
                          <option value="Traineeship">Traineeship</option>
                        </select>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="status"
                        className="col-sm-2 col-form-label"
                      >
                        Status
                      </label>
                      <div className="col-sm-10">
                        <select
                          id="status"
                          value={data.status}
                          onChange={(e) => {
                            handle(e);
                          }}
                          className="form-select"
                        >
                          <option defaultValue>Select your status type</option>
                          <option value="Available">Available</option>
                          <option value="Not Available"> Not Available</option>
                        </select>
                      </div>
                    </div>
                    <fieldset className="row mb-3">
                      <legend className="col-form-label col-sm-2 pt-0">
                        Remote
                      </legend>
                      <div className="col-sm-10">
                        <div className="form-check form-check-inline">
                          <input
                            onChange={radiobut}
                            value="true"
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="remote"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                          >
                            Yes
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            onChange={radiobut}
                            value="false"
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="remote"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio2"
                          >
                            No
                          </label>
                        </div>
                      </div>
                    </fieldset>
                    <div className="row mb-3">
                      <div className="d-grid gap-2 col-6 mx-auto">
                        <button
                          className="btn btn-outline-danger"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
