// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import LoadingPage from "./LoadingPage";
// import { useSelector } from "react-redux";
// const EditInterviewDetails = () => {
//   const token = useSelector((state) => state.auth.token);
//   const [loading, setLoading] = useState(false);
//   const { id } = useParams();
//   const { id2 } = useParams();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//     const [technology, setTechnology] = useState([]);
//   const [position, setPosition] = useState([]);
//   const [candidate, setCandidate] = useState([]);
//   const [data, setData] = useState({
//     interviewId: "",
//     email:"",
//     tech_id: "",
//     marks: "",
//     communication: "",
//     enthusiasm: "",
//     notes: "",
//     offerReleased: "",
//     workExInYears: "",
//     interviewerName: "",
//     candidateName: "",
//     source: "",
//     offerAccepted: "",
//     position_id: "",
//     type: "",
//     date: "",
//     // screeningRound: "",
//     clientName: "",
//     rounds: "",
//     // selected: "",
//     candidate_id: "",
//     status: "",
//   });
//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(
//         `/apigateway/hrms/interview/getInterviewDetailByIdAndRound?interviewId=${id}&round=${id2}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response.data);
//         setData(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         toast.error(error.response.data.message || "Error fetching details");
//         console.log(error);
//         setLoading(false);
//       });
//       axios
//       .get(`/apigateway/hrms/interview/alltech`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         // console.log(response.data);
//         setTechnology(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error(
//           error.response.data.message
//         );
//       });
//     axios
//       .get(`/apigateway/hrms/interviewCandidate/allInterviewCandidate`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         // console.log(response.data);
//         setCandidate(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error(
//           error.response.data.message
//         );
//       });

//     axios
//       .get(`/apigateway/hrms/interview/getAllPositionNew`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         // console.log(response.data);
//         setPosition(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error(error.response.data.message);
//       });
//   }, [id, id2]);
//   // "candidateName": "Ankit",
//   // "email":"ankit123@gmail.com",
//   // "candidate_id": 5,
//   // "clientName": "Rawone",
//   // "communication": 5,
//   // "date": "2024-05-08",
//   // "enthusiasm": 4,
//   // "interviewId": 2,
//   // "interviewerName": "sachin",
//   // "marks": 4,
//   // "notes": "good",
//   // "offerAccepted": false,
//   // "offerReleased": false,
//   // "position_id": 6,
//   // "rounds": 1,
//   // "source": "LinkedIn",
//   // "status": "Accepted",
//   // "tech_id": 1,
//   // "type": "Inbound",
//   // "workExInYears": 3
//   function handleSubmit(e) {
//     setLoading(true);
//     e.preventDefault();
//     axios
//       .put(
//         `/apigateway/hrms/interview/updateInterviewByIdAndRound`,
//         {
//           candidateName: data.candidateName,
//           email: data.email,
//           candidate_id: data.candidate_id.candidateId,
//           clientName: data.clientName,
//           communication: data.communication,
//           date: data.date,
//           enthusiasm: data.enthusiasm,
//           interviewId: data.interviewId,
//           interviewerName: data.interviewerName,
//           marks: data.marks,
//           notes: data.notes,
//           offerAccepted: data.offerAccepted,
//           offerReleased: data.offerReleased,
//           position_id: data.position_id.positionId,
//           rounds: data.rounds,
//           source: data.source,
//           status: data.status,
//           tech_id: data.tech_id.techId,
//           type: data.type,
//           workExInYears: data.workExInYears,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response.data);
//         toast.success("Interview details has been updated successfully.", {
//           position: "top-center",
//           theme: "colored",
//         });
//         navigate("/getinterviewdetails");
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error.response.data);
//         console.log(error);
//         toast.error(error.response.data.message || "Error updating details");
//         setLoading(false);
//       });
//   }
//   const handleSelection = (event) => {
//     const selectedId = event.target.value;
//     const selectedCandidate = candidate.find(
//       (cand) => cand.candidateId === parseInt(selectedId)
//     );
//     if (selectedCandidate) {
//       setEmail(selectedCandidate.emailId);
//     } else {
//       setEmail("");
//     }
//     const newData = { ...data, candidate_id: selectedId };
//     setData(newData);
//   };
//   return (
//     <div className="container pt-3">
//       {loading ? <LoadingPage /> : ""}
//       <div className="row">
//         <div className="col-lg-8 col-md-10 mx-auto">
//           <div
//             className="card border-0 shadow"
//             style={{ marginLeft: "100px", width: "800px", height: "1550PX" }}
//           >
//             <div className="card-body">
//               <form className="container py-3  mb-3" onSubmit={handleSubmit}>
//                 {/* <div className="row mb-3">
//                   <label
//                     htmlFor="inputPassword3"
//                     className="col-sm-2 col-form-label"
//                     name="interviewId"
//                   >
//                     interviewId:
//                   </label>
//                   <div className="col-sm-10">
//                     <input
//                       disabled
//                       value={data.interviewId || ""}
//                       type="number"
//                       className="form-control"
//                       id="interviewId"
//                     />
//                   </div>
//                 </div> */}
//                <div className="row mb-3">
//                     <label
//                       htmlFor="inputEmail3"
//                       className="col-sm-2 col-form-label"
//                       name="tech_id"
//                     >
//                       Technology
//                     </label>
//                     <div className="col-sm-10">
//                       <select
//                         required
//                         onChange={(e) => {
//                           handle(e);
//                         }}
//                         value={technology.techId}
//                         id="tech_id"
//                         className="form-control"
//                       >
//                         <option defaultValue>Select Technology</option>
//                         {technology.map((tech) => (
//                           <option key={tech.techId} value={tech.techId}>
//                             {tech.description}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                   <div className="row mb-3">
//                     <label
//                       htmlFor="inputPassword3"
//                       className="col-sm-2 col-form-label"
//                       name="candidate_id"
//                     >
//                       Candidate Name
//                     </label>
//                     <div className="col-sm-10">
//                     <select required onChange={handleSelection} className="form-control" id="candidate_id" value={data.candidate_id}>
//                         <option defaultValue>Select Candidate</option>
//                         {candidate.map((user) => (
//                           <option key={user.candidateId} value={user.candidateId}>
//                             {user.candidateName}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                   <div className="row mb-3">
//                     <label className="col-sm-2 col-form-label">
//                       Email
//                     </label>
//                     <div className="col-sm-10">
//                       <input type="text" className="form-control" value={email} readOnly />
//                     </div>
//                   </div>
//                   <div className="row mb-3">
//                     <label
//                       htmlFor="inputPassword3"
//                       className="col-sm-2 col-form-label"
//                       name="position_id"
//                     >
//                       Position Name
//                     </label>
//                     <div className="col-sm-10">
//                       <select
//                         required
//                         onChange={(e) => {
//                           handle(e);
//                         }}
//                         value={position.positionId}
//                         className="form-control"
//                         id="position_id"
//                       >
//                         <option defaultValue>Select Position Name</option>
//                         {position.map((pos) => (
//                           <option key={pos.positionId} value={pos.positionId}>
//                             {pos.positionName} ({pos.experienceInYear}yrs)
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 <div className="row mb-3">
//                   <label
//                     htmlFor="inputPassword3"
//                     className="col-sm-2 col-form-label"
//                     name="marks"
//                   >
//                     Marks
//                   </label>
//                   <div className="col-sm-10">
//                     <input
//                       value={data.marks || ""}
//                       onChange={(e) =>
//                         setData({ ...data, marks: e.target.value })
//                       }
//                       type="number"
//                       className="form-control"
//                       id="marks"
//                     />
//                   </div>
//                 </div>
//                 <div className="row mb-3">
//                   <label
//                     htmlFor="inputPassword3"
//                     className="col-sm-2 col-form-label"
//                     name="communication"
//                   >
//                     Communication
//                   </label>
//                   <div className="col-sm-10">
//                     <input
//                       value={data.communication || ""}
//                       onChange={(e) =>
//                         setData({ ...data, communication: e.target.value })
//                       }
//                       // onChange={ }
//                       type="number"
//                       className="form-control"
//                       id="communication"
//                     />
//                   </div>
//                 </div>
//                 <div className="row mb-3">
//                   <label
//                     htmlFor="inputPassword3"
//                     className="col-sm-2 col-form-label"
//                     name="enthusiasm"
//                   >
//                     Enthusiasm
//                   </label>
//                   <div className="col-sm-10">
//                     <input
//                       value={data.enthusiasm || ""}
//                       onChange={(e) =>
//                         setData({ ...data, enthusiasm: e.target.value })
//                       }
//                       type="number"
//                       className="form-control"
//                       id="enthusiasm"
//                     />
//                   </div>
//                 </div>
//                 <div className="row mb-3">
//                   <label
//                     htmlFor="inputEmail3"
//                     className="col-sm-2 col-form-label"
//                     name="notes"
//                   >
//                     Notes
//                   </label>
//                   <div className="col-sm-10">
//                     <input
//                       value={data.notes || ""}
//                       onChange={(e) =>
//                         setData({ ...data, notes: e.target.value })
//                       }
//                       type="text"
//                       id="notes"
//                       step="0.1"
//                       className="form-control"
//                     />
//                   </div>
//                 </div>
//                 <div className="row mb-3">
//                   <label
//                     htmlFor="inputPassword3"
//                     className="col-sm-2 col-form-label"
//                     name="workExInYears"
//                   >
//                     WorkExInYears
//                   </label>
//                   <div className="col-sm-10">
//                     <input
//                       value={data.workExInYears || ""}
//                       onChange={(e) =>
//                         setData({ ...data, workExInYears: e.target.value })
//                       }
//                       type="number"
//                       className="form-control"
//                       id="workExInYears"
//                     />
//                   </div>
//                 </div>
//                 <div className="row mb-3">
//                   <label
//                     htmlFor="inputPassword3"
//                     className="col-sm-2 col-form-label"
//                     name="interviewerName"
//                   >
//                     InterviewerName
//                   </label>
//                   <div className="col-sm-10">
//                     <input
//                       value={data.interviewerName || ""}
//                       onChange={(e) =>
//                         setData({ ...data, interviewerName: e.target.value })
//                       }
//                       type="text"
//                       className="form-control"
//                       placeholder="enter your interviewer Name."
//                       id="interviewerName"
//                     />
//                   </div>
//                 </div>
//                 {/* <div className="row mb-3">
//                   <label
//                     htmlFor="inputPassword3"
//                     className="col-sm-2 col-form-label"
//                     name="candidateName"
//                   >
//                     CandidateName
//                   </label>
//                   <div className="col-sm-10">
//                     <input
//                       value={data.candidateName || ""}
//                       onChange={(e) =>
//                         setData({ ...data, candidateName: e.target.value })
//                       }
//                       type="text"
//                       className="form-control"
//                       id="candidateName"
//                     />
//                   </div>
//                 </div> */}
//                 <div className="row mb-3">
//                   <label
//                     htmlFor="inputPassword3"
//                     className="col-sm-2 col-form-label"
//                     name="source"
//                   >
//                     Source
//                   </label>
//                   <div className="col-sm-10">
//                     <input
//                       value={data.source || ""}
//                       onChange={(e) =>
//                         setData({ ...data, source: e.target.value })
//                       }
//                       type="text"
//                       className="form-control"
//                       id="source"
//                     />
//                   </div>
//                 </div>

//                 <div className="row mb-3">
//                   <label
//                     htmlFor="inputPassword3"
//                     className="col-sm-2 col-form-label"
//                     name="date"
//                   >
//                     Date
//                   </label>
//                   <div className="col-sm-10">
//                     <input
//                       value={data.date || ""}
//                       onChange={(e) =>
//                         setData({ ...data, date: e.target.value })
//                       }
//                       type="date"
//                       className="form-control"
//                       placeholder="created By"
//                       id="date"
//                     />
//                   </div>
//                 </div>
//                 <div className="row mb-3">
//                   <label
//                     htmlFor="inputPassword3"
//                     className="col-sm-2 col-form-label"
//                     name="rounds"
//                   >
//                     Rounds
//                   </label>
//                   <div className="col-sm-10">
//                     <input
//                       value={data.rounds || ""}
//                       onChange={(e) =>
//                         setData({ ...data, rounds: e.target.value })
//                       }
//                       type="number "
//                       className="form-control"
//                       id="rounds"
//                       min="0"
//                     />
//                   </div>
//                 </div>
//                 <div className="row mb-3">
//                   <label
//                     htmlFor="inputPassword3"
//                     className="col-sm-2 col-form-label"
//                     name="clientName"
//                   >
//                     ClientName
//                   </label>
//                   <div className="col-sm-10">
//                     <input
//                       value={data.clientName || ""}
//                       onChange={(e) =>
//                         setData({ ...data, clientName: e.target.value })
//                       }
//                       type="text "
//                       className="form-control"
//                       id="clientName"
//                     />
//                   </div>
//                 </div>

//                 {/* The first input element is a radio button for "Yes" and is checked if data.isActive is true. The value prop is also set to data.isActive so that the value of the radio button matches the value in the state. The onChange handler updates the isActive value in the state when this radio button is selected.*/}

//                 <fieldset className="row mb-3">
//                   <legend className="col-form-label col-sm-2 pt-0">
//                     Offer Released
//                   </legend>
//                   <div className="col-sm-10">
//                     <div className="form-check form-check-inline">
//                       <input
//                         checked={data.offerReleased === true}
//                         value={true || ""}
//                         onChange={(e) =>
//                           setData({ ...data, offerReleased: true })
//                         }
//                         className="form-check-input"
//                         type="radio"
//                         name="inlineRadioOptions"
//                         id="offerReleased"
//                       />
//                       <label className="form-check-label" htmlFor="true">
//                         Yes
//                       </label>
//                     </div>
//                     <div className="form-check form-check-inline">
//                       <input
//                         checked={data.offerReleased === false}
//                         value={false || ""}
//                         onChange={(e) =>
//                           setData({ ...data, offerReleased: false })
//                         }
//                         className="form-check-input"
//                         type="radio"
//                         name="inlineRadioOptions"
//                         id="offerReleased"
//                       />
//                       <label className="form-check-label" htmlFor="false">
//                         No
//                       </label>
//                     </div>
//                   </div>
//                 </fieldset>
//                 <fieldset className="row mb-3">
//                   <legend className="col-form-label col-sm-2 pt-0">
//                     Offer Accepted
//                   </legend>
//                   <div className="col-sm-10">
//                     <div className="form-check form-check-inline">
//                       <input
//                         checked={data.offerAccepted === true}
//                         value={true || ""}
//                         onChange={(e) =>
//                           setData({ ...data, offerAccepted: true })
//                         }
//                         className="form-check-input"
//                         type="radio"
//                         name="inlineRadioOptions1"
//                         id="offerAccepted"
//                       />
//                       <label className="form-check-label" htmlFor="true">
//                         Yes
//                       </label>
//                     </div>
//                     <div className="form-check form-check-inline">
//                       <input
//                         checked={data.offerAccepted === false}
//                         value={false || ""}
//                         onChange={(e) =>
//                           setData({ ...data, offerAccepted: false })
//                         }
//                         className="form-check-input"
//                         type="radio"
//                         name="inlineRadioOptions1"
//                         id="offerAccepted"
//                       />
//                       <label className="form-check-label" htmlFor="false">
//                         No
//                       </label>
//                     </div>
//                   </div>
//                 </fieldset>
//                 <div className="row mb-3">
//                   <label
//                     htmlFor="inputPassword3"
//                     className="col-sm-2 col-form-label"
//                   >
//                     Status
//                   </label>
//                   <div className="col-sm-10">
//                     <select
//                       id="status"
//                       value={data.status || ""}
//                       onChange={(e) =>
//                         setData({ ...data, status: e.target.value })
//                       }
//                       className="form-select"
//                     >
//                       <option defaultValue>Select your status type</option>
//                       <option value="Accepted">Accepted</option>
//                       <option value="Rejected">Rejected</option>
//                       <option value="Pending">Pending</option>
//                     </select>
//                   </div>
//                 </div>

//                 <fieldset className="row mb-3">
//                   <legend className="col-form-label col-sm-2 pt-0">Type</legend>
//                   <div className="col-sm-10">
//                     <div className="form-check form-check-inline">
//                       <input
//                         checked={data.type === "Inbound"}
//                         value={"Inbound" || ""}
//                         onChange={(e) => setData({ ...data, type: "Inbound" })}
//                         className="form-check-input"
//                         type="radio"
//                         name="inlineRadioOptions4"
//                         id="type"
//                       />
//                       <label className="form-check-label" htmlFor="true">
//                         Inbound
//                       </label>
//                     </div>

//                     <div className="form-check form-check-inline">
//                       <input
//                         checked={data.type === "Outbound"}
//                         value={"Outbound" || ""}
//                         onChange={(e) => setData({ ...data, type: "Outbound" })}
//                         className="form-check-input"
//                         type="radio"
//                         name="inlineRadioOptions4"
//                         id="type"
//                       />
//                       <label className="form-check-label" htmlFor="false">
//                         Outbound
//                       </label>
//                     </div>
//                   </div>
//                 </fieldset>
//                 <div className="d-grid gap-2 col-6 mx-auto">
//                   <button className="btn btn-outline-success" type="submit">
//                     Update
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditInterviewDetails;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingPage from "./LoadingPage";
import { useSelector } from "react-redux";

const EditInterviewDetails = () => {
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const { id, id2 } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [technology, setTechnology] = useState([]);
  const [position, setPosition] = useState([]);
  const [candidate, setCandidate] = useState([]);
  const [data, setData] = useState({
    email: "",
    tech_id: { techId: "", description: "" },
    marks: "",
    communication: "",
    enthusiasm: "",
    notes: "",
    offerReleased: "",
    workExInYears: "",
    interviewerName: "",
    candidate_id: { candidateId: "", candidateName: "" },
    source: "",
    offerAccepted: "",
    position_id: { positionId: "", positionName: "" },
    type: "",
    date: "",
    clientName: "",
    rounds: "",
    candidateName: "",
    status: "",
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `/apigateway/hrms/interview/getInterviewDetailByIdAndRound?interviewId=${id}&round=${id2}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const interviewData = response.data;
        setData({
          ...interviewData,
          tech_id: interviewData.tech_id || { techId: "", description: "" },
          candidate_id: interviewData.candidate_id || {
            candidateId: "",
            candidateName: "",
          },
          position_id: interviewData.position_id || {
            positionId: "",
            positionName: "",
          },
        });
        setEmail(interviewData.candidate_id.emailId);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message || "Error fetching details");
        setLoading(false);
      });

    axios
      .get(`/apigateway/hrms/interview/alltech`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTechnology(response.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });

    axios
      .get(`/apigateway/hrms/interviewCandidate/allInterviewCandidate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCandidate(response.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });

    axios
      .get(`/apigateway/hrms/interview/getAllPositionNew`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPosition(response.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, [id, id2, token]);

  const handleTechChange = (event) => {
    const selectedTech = technology.find(
      (tech) => tech.techId === parseInt(event.target.value)
    );
    setData({ ...data, tech_id: selectedTech });
  };

  const handleCandidateChange = (event) => {
    const selectedCandidate = candidate.find(
      (cand) => cand.candidateId === parseInt(event.target.value)
    );
    setEmail(selectedCandidate.emailId);
    setData({ 
        ...data, 
        candidate_id: selectedCandidate,
        candidateName: selectedCandidate.candidateName 
      });
  };

  const handlePositionChange = (event) => {
    const selectedPosition = position.find(
      (pos) => pos.positionId === parseInt(event.target.value)
    );
    setData({ ...data, position_id: selectedPosition });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
        ...data,
        tech_id: data.tech_id.techId,
        candidate_id: data.candidate_id.candidateId,
        position_id: data.position_id.positionId,
        candidateName: data.candidateName 
      };
    axios
      .put(`/apigateway/hrms/interview/updateInterviewByIdAndRound`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success("Interview details has been updated successfully.", {
          position: "top-center",
          theme: "colored",
        });
        navigate("/getinterviewdetails");
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message || "Error updating details");
        setLoading(false);
      });
  };

  return (
    <div className="container pt-3">
      {loading && <LoadingPage />}
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          <div
            className="card border-0 shadow"
            style={{ marginLeft: "100px", width: "800px", height: "auto" }}
          >
            <div className="card-body">
              <form className="container py-3 mb-3" onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <label htmlFor="tech_id" className="col-sm-2 col-form-label">
                    Technology
                  </label>
                  <div className="col-sm-10">
                    <select
                      required
                      onChange={handleTechChange}
                      value={data.tech_id.techId}
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
                    htmlFor="candidate_id"
                    className="col-sm-2 col-form-label"
                  >
                    Candidate Name
                  </label>
                  <div className="col-sm-10">
                    <select
                      required
                      onChange={handleCandidateChange}
                      className="form-control"
                      id="candidate_id"
                      value={data.candidate_id.candidateId}
                    >
                      <option defaultValue>Select Candidate</option>
                      {candidate.map((user) => (
                        <option key={user.candidateId} value={user.candidateId}>
                          {user.candidateName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">Email</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      value={email}
                      readOnly
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="position_id"
                    className="col-sm-2 col-form-label"
                  >
                    Position Name
                  </label>
                  <div className="col-sm-10">
                    <select
                      required
                      onChange={handlePositionChange}
                      value={data.position_id.positionId}
                      className="form-control"
                      id="position_id"
                    >
                      <option defaultValue>Select Position Name</option>
                      {position.map((pos) => (
                        <option key={pos.positionId} value={pos.positionId}>
                          {pos.positionName} ({pos.experienceInYear}yrs)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="marks" className="col-sm-2 col-form-label">
                    Marks
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      className="form-control"
                      id="marks"
                      name="marks"
                      value={data.marks}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="communication"
                    className="col-sm-2 col-form-label"
                  >
                    Communication
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="communication"
                      name="communication"
                      value={data.communication}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="enthusiasm"
                    className="col-sm-2 col-form-label"
                  >
                    Enthusiasm
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="enthusiasm"
                      name="enthusiasm"
                      value={data.enthusiasm}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="notes" className="col-sm-2 col-form-label">
                    Notes
                  </label>
                  <div className="col-sm-10">
                    <textarea
                      className="form-control"
                      id="notes"
                      name="notes"
                      value={data.notes}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="offerReleased"
                    className="col-sm-2 col-form-label"
                  >
                    Offer Released
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="offerReleased"
                      name="offerReleased"
                      value={data.offerReleased}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="workExInYears"
                    className="col-sm-2 col-form-label"
                  >
                    Work Experience (Years)
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      className="form-control"
                      id="workExInYears"
                      name="workExInYears"
                      value={data.workExInYears}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="interviewerName"
                    className="col-sm-2 col-form-label"
                  >
                    Interviewer Name
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="interviewerName"
                      name="interviewerName"
                      value={data.interviewerName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="source" className="col-sm-2 col-form-label">
                    Source
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="source"
                      name="source"
                      value={data.source}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <fieldset className="row mb-3">
                  <legend className="col-form-label col-sm-2 pt-0">
                    Offer Accepted
                  </legend>
                  <div className="col-sm-10">
                    <div className="form-check form-check-inline">
                      <input
                        checked={data.offerAccepted === true}
                        value={true || ""}
                        onChange={(e) =>
                          setData({ ...data, offerAccepted: true })
                        }
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions1"
                        id="offerAccepted"
                      />
                      <label className="form-check-label" htmlFor="true">
                        Yes
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        checked={data.offerAccepted === false}
                        value={false || ""}
                        onChange={(e) =>
                          setData({ ...data, offerAccepted: false })
                        }
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions1"
                        id="offerAccepted"
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
                  >
                    Status
                  </label>
                  <div className="col-sm-10">
                    <select
                      id="status"
                      value={data.status || ""}
                      onChange={(e) =>
                        setData({ ...data, status: e.target.value })
                      }
                      className="form-select"
                    >
                      <option defaultValue>Select your status type</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                </div>

              <fieldset className="row mb-3">
                  <legend className="col-form-label col-sm-2 pt-0">Type</legend>
                  <div className="col-sm-10">
                    <div className="form-check form-check-inline">
                      <input
                        checked={data.type === "Inbound"}
                        value={"Inbound" || ""}
                        onChange={(e) => setData({ ...data, type: "Inbound" })}
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions4"
                        id="type"
                      />
                      <label className="form-check-label" htmlFor="true">
                        Inbound
                      </label>
                    </div>

                    <div className="form-check form-check-inline">
                      <input
                        checked={data.type === "Outbound"}
                        value={"Outbound" || ""}
                        onChange={(e) => setData({ ...data, type: "Outbound" })}
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions4"
                        id="type"
                      />
                      <label className="form-check-label" htmlFor="false">
                        Outbound
                      </label>
                    </div>
                  </div>
                </fieldset>

                <div className="row mb-3">
                  <label htmlFor="date" className="col-sm-2 col-form-label">
                    Date
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      name="date"
                      value={data.date}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label
                    htmlFor="clientName"
                    className="col-sm-2 col-form-label"
                  >
                    Client Name
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="clientName"
                      name="clientName"
                      value={data.clientName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="rounds" className="col-sm-2 col-form-label">
                    Rounds
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      className="form-control"
                      id="rounds"
                      name="rounds"
                      value={data.rounds}
                      onChange={handleChange}
                    />
                  </div>
                </div>
            
                <div className="d-grid gap-2 col-6 mx-auto">
                  <button className="btn btn-outline-success" type="submit">
                    Update
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

export default EditInterviewDetails;
