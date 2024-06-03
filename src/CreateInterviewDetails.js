import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import handleAuthError from "./CommonErrorHandling";
import { Link } from "react-router-dom";
import LoadingPage from './LoadingPage'

const CreateInterview = () => {
  const token = localStorage.getItem("response-token");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    interviewId: "",
    tech_id: "",
    position_id: "",
    candidate_id: "",
    marks: "",
    communication: "",
    enthusiasm: "",
    notes: "",
    offerReleased: "",
    workExInYears: "",
    interviewerName: "",
    source: "",
    offerAccepted: "",
    screeningRound: "",
    selected: "",
    type: "",
    clientName: "",
    rounds: "",
    date: "",
    status: "",
  });
  const [technology, setTechnology] = useState([]);
  const [position, setPosition] = useState([]);
  const [candidate, setCandidate] = useState([]);
  
  useEffect(() => {

    axios
      .get(`/apigateway/hrms/interview/alltech`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setTechnology(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error.response.data.message
        );
      });
    axios
      .get(`/apigateway/hrms/interviewCandidate/allInterviewCandidate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setCandidate(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error.response.data.message
        );
      });
    
    axios
      .get(`/apigateway/hrms/interview/getAllPositionNew`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setPosition(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });

  }, []);
//  console.log(technology);
 // console.log(candidate);
  //console.log(position);
  function submit(e) {
    e.preventDefault();
    setLoading(true); 
    axios
      .post(
        `/apigateway/hrms/interview/saveInterviewNew`,
        {
          interviewId: parseInt(data.interviewId),
          tech_id: parseInt(data.tech_id),
          marks: parseInt(data.marks),
          communication: parseInt(data.communication),
          enthusiasm: parseInt(data.enthusiasm),
          notes: data.notes,
          offerReleased: data.offerReleased,
          workExInYears: parseInt(data.workExInYears),
          interviewerName: data.interviewerName,
          source: data.source,
          offerAccepted: data.offerAccepted,
          type: data.type,
          clientName: data.clientName,
          rounds: parseInt(data.rounds),
          date: data.date,
          position_id: parseInt(data.position_id),
          candidate_id: parseInt(data.candidate_id),
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
        setLoading(false); 
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        toast.error( error.response.data.message);
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
  function radiobutton1(e) {
    console.log(str2bool(e.target.value));
    data.offerReleased = str2bool(e.target.value);
  }
  function radiobutton2(e) {
    console.log(str2bool(e.target.value));
    data.offerAccepted = str2bool(e.target.value);
  }

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }
  return (
    <div>
      <div className=" mt-3">
         {loading ? <LoadingPage/> : ''}
        <nav
          aria-label="breadcrumb"
          style={{ "--bs-breadcrumb-divider": "'>>'" }}
        >
          <ol className="breadcrumb" style={{ color: "white" ,marginLeft:'20px'}}>
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>{" "}
            </li>
            <li className="breadcrumb-item">
              <a href="">Hiring</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Create Interview
            </li>
          </ol>
        </nav>
      </div>

      <div className="container pt-3">
        <div className="row">
          <div className="col-sm-10 mx-auto">
            <div
              className="card border-0 shadow"
              style={{ width: "700px", height: "1500px" }}
            >
              <div className="card-body">
                <form className="container py-3  mb-3">
                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-2 col-form-label"
                      name="interviewId"
                    >
                      Interview Id
                    </label>
                    <div className="col-sm-10">
                      <input
                        required
                        onChange={(e) => {
                          handle(e);
                        }}
                        value={data.interviewId}
                        type="text"
                        className="form-control"
                        placeholder="enter the interview Id."
                        id="interviewId"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-2 col-form-label"
                      name="notes"
                    >
                      Rounds
                    </label>
                    <div className="col-sm-10">
                      <input
                        required
                        onChange={(e) => {
                          handle(e);
                        }}
                        value={data.rounds}
                        type="text"
                        className="form-control"
                        placeholder="enter the number of  Rounds."
                        id="rounds"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-2 col-form-label"
                      name="candidate_id"
                    >
                      Candidate Name
                    </label>
                    <div className="col-sm-10">
                      <select
                        required
                        onChange={(e) => {
                          handle(e);
                        }}
                        value={candidate.candidateId}
                        className="form-control"
                        id="candidate_id"
                      >
                        <option defaultValue>Select Candidate</option>
                        {candidate.map((user) => (
                          <option
                            key={user.candidateId}
                            value={user.candidateId}
                          >
                            {user.candidateName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputEmail3"
                      className="col-sm-2 col-form-label"
                      name="tech_id"
                    >
                      Technology
                    </label>
                    <div className="col-sm-10">
                      <select
                        required
                        onChange={(e) => {
                          handle(e);
                        }}
                        value={technology.techId}
                        id="tech_id"
                        className="form-control"
                      >
                        <option defaultValue>Select Technology</option>
                        {technology.map((tech) => (
                          <option key={tech.techId} value={tech.techId}>
                            {tech.description}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-2 col-form-label"
                      name="position_id"
                    >
                      Position Name
                    </label>
                    <div className="col-sm-10">
                      <select
                        required
                        onChange={(e) => {
                          handle(e);
                        }}
                        value={position.uiid}
                        className="form-control"
                        id="position_id"
                      >
                        <option defaultValue>Select Position Name</option>
                        {position.map((pos) => (
                          <option key={pos.uiid} value={pos.uiid}>
                            {pos.positionName} ({pos.experienceInYear}yrs)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-2 col-form-label"
                      name="marks"
                    >
                      Marks
                    </label>
                    <div className="col-sm-10">
                      <input
                        required
                        onChange={(e) => {
                          handle(e);
                        }}
                        value={data.marks}
                        type="text"
                        className="form-control"
                        placeholder="enter marks in number.."
                        id="marks"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-2 col-form-label"
                      name="communication"
                    >
                      Communication
                    </label>
                    <div className="col-sm-10">
                      <input
                        required
                        onChange={(e) => {
                          handle(e);
                        }}
                        value={data.communication}
                        type="text"
                        className="form-control"
                        placeholder="enter communication marks..."
                        id="communication"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-2 col-form-label"
                      name="enthusiasm"
                    >
                      Enthusiasm
                    </label>
                    <div className="col-sm-10">
                      <input
                        required
                        onChange={(e) => {
                          handle(e);
                        }}
                        value={data.enthusiasm}
                        type="text"
                        className="form-control"
                        placeholder="enter enthusiasm marks..."
                        id="enthusiasm"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-2 col-form-label"
                      name="notes"
                    >
                      Notes
                    </label>
                    <div className="col-sm-10">
                      <input
                        required
                        onChange={(e) => {
                          handle(e);
                        }}
                        value={data.notes}
                        type="text"
                        className="form-control"
                        placeholder="enter your notes"
                        id="notes"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-2 col-form-label"
                      name="notes"
                    >
                      Work Exp In Years
                    </label>
                    <div className="col-sm-10">
                      <input
                        required
                        onChange={(e) => {
                          handle(e);
                        }}
                        value={data.workExInYears}
                        type="text"
                        className="form-control"
                        placeholder="enter your work experience in years."
                        id="workExInYears"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-2 col-form-label"
                      name="interviewerName"
                    >
                      Interviewer Name
                    </label>
                    <div className="col-sm-10">
                      <input
                        required
                        onChange={(e) => {
                          handle(e);
                        }}
                        value={data.interviewerName}
                        type="text"
                        className="form-control"
                        placeholder="enter interviewer Name"
                        id="interviewerName"
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-2 col-form-label"
                      name="source"
                    >
                      Source
                    </label>
                    <div className="col-sm-10">
                      <input
                        required
                        onChange={(e) => {
                          handle(e);
                        }}
                        value={data.source}
                        type="text"
                        className="form-control"
                        placeholder="enter your source"
                        id="source"
                      />
                    </div>
                  </div>
                  {/* <fieldset className="row mb-3">
                                    <legend className="col-form-label col-sm-2 pt-0">Screening Round</legend>
                                    <div className="col-sm-10">

                                        <div className="form-check form-check-inline">
                                            <input onChange={radiobutton4} value="true" className="form-check-input" type="radio" name="screeningRound" id="screeningRound" />
                                            <label className="form-check-label" htmlFor="inlineRadio1">Yes</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input onChange={radiobutton4} value="false" className="form-check-input" type="radio" name="screeningRound" id="screeningRound" />
                                            <label className="form-check-label" htmlFor="inlineRadio2">No</label>
                                        </div>
                                    </div>
                                </fieldset> */}
                  {/* <fieldset className="row mb-3">
                                    <legend className="col-form-label col-sm-2 pt-0">Selected</legend>
                                    <div className="col-sm-10">
                                        <div className="form-check form-check-inline">
                                            <input onChange={radiobutton3} value="true" className="form-check-input" type="radio" name="selected" id="selected" />
                                            <label className="form-check-label" htmlFor="inlineRadio1">Yes</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input onChange={radiobutton3} value="false" className="form-check-input" type="radio" name="selected" id="selected" />
                                            <label className="form-check-label" htmlFor="inlineRadio2">No</label>
                                        </div>
                                    </div>
                                </fieldset> */}
                  <fieldset className="row mb-3">
                    <legend className="col-form-label col-sm-2 pt-0">
                      Offer Released
                    </legend>
                    <div className="col-sm-10">
                      <div className="form-check form-check-inline">
                        <input
                          onChange={radiobutton1}
                          value="true"
                          className="form-check-input"
                          type="radio"
                          name="offerReleased"
                          id="offerReleased"
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
                          onChange={radiobutton1}
                          value="false"
                          className="form-check-input"
                          type="radio"
                          name="offerReleased"
                          id="offerReleased"
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

                  <fieldset className="row mb-3">
                    <legend className="col-form-label col-sm-2 pt-0">
                      Offer Accepted
                    </legend>
                    <div className="col-sm-10">
                      <div className="form-check form-check-inline">
                        <input
                          onChange={radiobutton2}
                          value="true"
                          className="form-check-input"
                          type="radio"
                          name="offerAccepted"
                          id="offerAccepted"
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
                          onChange={radiobutton2}
                          value="false"
                          className="form-check-input"
                          type="radio"
                          name="offerAccepted"
                          id="offerAccepted"
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
                  <fieldset className="row mb-3">
                    <legend className="col-form-label col-sm-2 pt-0">
                      Type
                    </legend>
                    <div className="col-sm-10">
                      <div className="form-check form-check-inline">
                        <input
                          onChange={(e) => {
                            handle(e);
                          }}
                          value="Inbound"
                          className="form-check-input"
                          type="radio"
                          name="type"
                          id="type"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio1"
                        >
                          Inbound
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          onChange={(e) => {
                            handle(e);
                          }}
                          value="Outbound"
                          className="form-check-input"
                          type="radio"
                          name="type"
                          id="type"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio2"
                        >
                          Outbound
                        </label>
                      </div>
                    </div>
                  </fieldset>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
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
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-2 col-form-label"
                      name="clientName"
                    >
                      Client Name
                    </label>
                    <div className="col-sm-10">
                      <input
                        required
                        onChange={(e) => {
                          handle(e);
                        }}
                        value={data.clientName}
                        type="text"
                        className="form-control"
                        placeholder="enter client Name"
                        id="clientName"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="inputPassword3"
                      className="col-sm-2 col-form-label"
                      name="date"
                    >
                      Date
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => {
                          handle(e);
                        }}
                        value={data.date}
                        type="date"
                        className="form-control"
                        id="date"
                      />
                    </div>
                  </div>
                  <div className="d-grid gap-2 col-6 mx-auto">
                    <button
                      className="btn btn-outline-danger"
                      type="submit"
                      onClick={(e) => {
                        submit(e);
                      }}
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
    </div>
  );
};

export default CreateInterview;
