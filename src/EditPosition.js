// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import LoadingPage from './LoadingPage'
// import './Hrmscss/App.css';
// import Select from "react-select";
// const EditPosition = () => {
//     const token = localStorage.getItem("response-token");
//     const [selectedValue, setSelectedValue] = useState([]);
//     const [techOptions, setTechOptions] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [data, setData] = useState({
//       positionName: "",
//       techStack: "",
//       vacancy: "",
//       positionopendate: "",
//       positionclosedate: "",
//       status: "",
//       experienceInYear: "",
//       positionType: "",
//       remote: ""
//   });

//     useEffect(() => {
//       setLoading(true);
//       axios
//       .get(`/apigateway/hrms/interview/alltech`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         const options = response.data.map((tech) => ({
//           label: tech.description,
//           value: tech.description,
//         }));
//         setTechOptions(options);
//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error(error.response.data.message);
//       });
//       axios
//         .get(`/apigateway/hrms/interview/getByPositionId/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((response) => {
//           console.log(response.data);
//           setData(response.data);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.log(error);
//           setLoading(false);
//           toast.error(error.response.data.message || "Error fetching details");
//         });
//     }, [id]);

//     const handleChange = (e) => {
//       setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
//       console.log(e);
//     };
  

//   //   {
//   //     "positionId": 4,
//   //     "positionName": "Java Developer",
//   //     "techStack": [
//   //         "Java",
//   //         "SpringBoot"
//   //     ],
//   //     "positionOpenDate": "2024-05-01T06:45:27",
//   //     "positionCloseDate": null,
//   //     "status": "Available",
//   //     "experienceInYear": 4.0,
//   //     "remote": true,
//   //     "positionType": "Permanent",
//   //     "vacancy": 3
//   // }
  
//     function handleSubmit(e) {
//       e.preventDefault();
//       setLoading(true);
//       axios
//         .put(
//           `/apigateway/expensemanagement/clientInfo/updateClientInfo/${id}`,
//           {
//             id: data.id,
//             address: data.address,
//             companyName: data.companyName,
//             contactPerson: data.contactPerson,
//             email: data.email,
//             gstin: data.gstin,
//             phone: data.phone,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         )
//         .then((response) => {
//           toast.success("data has been updated successfully!!", {
//             position: "top-center",
//             theme: "colored",
//           });
//           console.log(response.data);
//           navigate("/Getclientinfo");
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.log(error);
//           toast.error(error.response.data.message || "Error updating details");
//           setLoading(false);
//         });
//     }
//     return (
//       <div className='container pt-3'>
//        {loading ? <LoadingPage/> : ''}
//       <div className='row'>
//           <div className='col-md-8 mx-auto' >
//               <div className='card border-0 shadow'style={{  marginLeft:'100px',width:'700px',height:'750PX'}}>
//                   <div className='card-body'>
//                       <form className='container py-3  mb-3' onSubmit={(e) => { submit(e) }}>
//                           <div className="row mb-3">
//                               <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='positionName'>Position-Name</label>
//                               <div className="col-sm-10">
//                                   <input onChange={(e) => { handle(e) }} value={data.positionName}
//                                       type="text"
//                                       id="positionName"
//                                       placeholder='enter your positionName'
//                                       className="form-control" />
//                               </div>
//                           </div>
//                           <div className="row mb-3">
//                               <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='positionName'>Tech-Stack</label>
//                               <div className="col-sm-10">
//                                   <Select
//                                       isMulti
//                                       name="positionName"
//                                       options={techOptions}
//                                       id='positionName'
//                                       className="basic-multi-select"
//                                       classNamePrefix="select"
//                                       onChange={handleChange}
//                                       value={techOptions.filter(obj => selectedValue.includes(obj.value))}

//                                   />
//                                   {/* <input onChange={(e) => { handle(e) }} value={data.techStack}
//                                       type="text"
//                                       id="techStack"
//                                       placeholder='enter your techStack'
//                                       className="form-control" /> */}
//                               </div>
//                           </div>
//                           <div className="row mb-3">
//                               <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='vacancy'>Vacancy</label>
//                               <div className="col-sm-10">
//                                   <input onChange={(e) => { handle(e) }} value={data.vacancy}
//                                       type="text"
//                                       id="vacancy"
//                                       placeholder='enter your vacancy'
//                                       className="form-control" />
//                               </div>
//                           </div>
//                           <div className="row mb-3">
//                               <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='experienceInYear'>Experience in years</label>
//                               <div className="col-sm-10">
//                                   <input onChange={(e) => { handle(e) }} value={data.experienceInYear}
//                                       type="text"
//                                       id="experienceInYear"
//                                       placeholder='enter your experience in years'
//                                       className="form-control" />
//                               </div>
//                           </div>
//                           <div className="row mb-3">
//                               <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='positionopendate'>Position open date</label>
//                               <div className="col-sm-10">
//                                   <input onChange={(e) => { handle(e) }} value={data.positionopendate}
//                                       type="date" className="form-control"
//                                       id="positionopendate" />
//                               </div>
//                           </div>
//                           <div className="row mb-3">
//                               <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='positionclosedate'>Position close date</label>
//                               <div className="col-sm-10">
//                                   <input onChange={(e) => { handle(e) }} value={data.positionclosedate}
//                                       type="date" className="form-control"
//                                       id="positionclosedate" />
//                               </div>
//                           </div>
//                           <div className="row mb-3">
//                               <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="positionType">Position type:</label>
//                               <div className="col-sm-10">
//                                   <select id="positionType" value={data.positionType} onChange={(e) => { handle(e) }} className="form-select">
//                                       <option defaultValue>Select your position type</option>
//                                       <option value="Permanent">Permanent</option>
//                                       <option value="Contractual">Contractual</option>
//                                       <option value="Traineeship">Traineeship</option>
//                                   </select>
//                               </div>
//                               {/* <div className="col-sm-10">
//                                   <input onChange={(e) => { handle(e) }} value={data.positionType}
//                                       type="text" className="form-control"
//                                       placeholder='enter your position type'
//                                       id="positionType" />
//                               </div> */}
//                           </div>
//                           <div className="row mb-3">
//                               <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Status</label>
//                               <div className="col-sm-10">
//                                   <select id="status" value={data.status} onChange={(e) => { handle(e) }} className="form-select">
//                                       <option defaultValue>Select your status type</option>
//                                       <option value="Available">Available</option>
//                                       <option value="Not Available"> Not Available</option>
//                                   </select>
//                               </div>
//                           </div>
//                           <fieldset className="row mb-3">
//                               <legend className="col-form-label col-sm-2 pt-0">Remote</legend>
//                               <div className="col-sm-10">

//                                   <div className="form-check form-check-inline">
//                                       <input onChange={radiobut} value="true" className="form-check-input" type="radio" name="inlineRadioOptions" id="remote" />
//                                       <label className="form-check-label" htmlFor="inlineRadio1">Yes</label>
//                                   </div>
//                                   <div className="form-check form-check-inline">
//                                       <input onChange={radiobut} value="false" className="form-check-input" type="radio" name="inlineRadioOptions" id="remote" />
//                                       <label className="form-check-label" htmlFor="inlineRadio2">No</label>
//                                   </div>
//                               </div>
//                           </fieldset>
//                           <div className="d-grid gap-2 col-6 mx-auto">
//                               <button className="btn btn-outline-danger" type="submit">Submit</button>
//                           </div>

//                       </form>
//                   </div>
//               </div>
//           </div>
//       </div>
//   </div>
//     );
//   }

// export default EditPosition
