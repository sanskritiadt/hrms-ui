import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import handleAuthError from './CommonErrorHandling';
import LoadingPage from './LoadingPage'

const EditCandidate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("response-token");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        candidateName: "",
        emailId: "",
        contactNo: "",
        address: "",
        highestQualification: "",
        workExperience: "",
        technicalStack: "",
        cvShortlisted: "",
        lastCTC: "",
        noticePeriod: "",
        dob:""
    });

    useEffect(() => {
        setLoading(true); 
        axios.get(`/apigateway/hrms/interviewCandidate/interviewCandidateById/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                setData(response.data)
               // console.log(response);
                setLoading(false); 
            }).catch((error) => {
                toast.error( error.response.data.message || "Error updating details" );
                // console.log(error);
                // console.log(error.response.data)
                setLoading(false); 
            })
    }, [])
    function HandleSubmit(e) {
        e.preventDefault();
        axios.put(`/apigateway/hrms/interviewCandidate/updateInterviewCandidate/${id}`, {
            candidateName: data.candidateName,
            emailId: data.emailId,
            contactNo: data.contactNo,
            address: data.address,
            highestQualification: data.highestQualification,
            workExperience: data.workExperience,
            technicalStack: data.technicalStack,
            cvShortlisted: data.cvShortlisted,
            lastCTC: data.lastCTC,
            noticePeriod: parseInt(data.noticePeriod),
            dob: data.dob
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response);
            // alert("Candidate data has been updated successfully.");
            toast.success("Candidate data has been updated successfully.", { position: 'top-center', theme: "colored" });
            navigate('/getcandidate');
        }).catch((error) => {
            handleAuthError(error);
            console.log(error);
            // toast.error("Something Bad happened try after sometime.", { position: 'top-center', theme: "colored" })
        })
    }
    function HandleDelete() {
        axios.delete(`/hrms/interviewCandidate/interviewCandidateById/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response)
                toast.success("Candidate Data Deleted successfully.", { position: 'top-center', theme: "colored" });
                navigate('/getcandidate');
            }).catch((error) => {
                handleAuthError(error);
                console.log(error);
                // toast.error("Cannot delete Candidate Details Try after sometime.", { position: 'top-center', theme: "colored" })
            })
    }

    return (
        <div className='container pt-3'>
             {loading ? <LoadingPage/> : ''}
            <div className='row'>
                <div className='col-lg-8 col-md-10 mx-auto'>
                    <div className='card border-0 shadow'>
                        <div className='card-body'>
                            <form className='container py-3  mb-3' onSubmit={HandleSubmit}>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='candidateName'>Candidate Name</label>
                                    <div className="col-sm-10">
                                        <input value={data.candidateName || ''}
                                            onChange={e => setData({ ...data, candidateName: e.target.value })}
                                            type="text" className="form-control"
                                            id="candidateName" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='emailId'>Email Id</label>
                                    <div className="col-sm-10">
                                        <input value={data.emailId || ''}
                                            onChange={e => setData({ ...data, emailId: e.target.value })}
                                            type="email"
                                            id="emailId"
                                            step='0.1' placeholder='enter amount'
                                            className="form-control" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='contactNo'>Contact No</label>
                                    <div className="col-sm-10">
                                        <input value={data.contactNo || ''}
                                            onChange={e => setData({ ...data, contactNo: e.target.value })}
                                            type="number" className="form-control"
                                            id="contactNo" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='address'>Address</label>
                                    <div className="col-sm-10">
                                        <input value={data.address || ''}
                                            onChange={e => setData({ ...data, address: e.target.value })}
                                            type="text" className="form-control"
                                            id="address" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="highestQualification">Highest Qualification</label>
                                    <div className="col-sm-10">
                                        <input value={data.highestQualification || ''}
                                            onChange={e => setData({ ...data, highestQualification: e.target.value })}
                                            type="text" className="form-control"
                                            placeholder='enter your highest Qualification.'
                                            id="highestQualification" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="workExperience">Work Experience</label>
                                    <div className="col-sm-10">
                                        <input value={data.workExperience || ''}
                                            onChange={e => setData({ ...data, workExperience: e.target.value })}
                                            type="text" className="form-control"
                                            placeholder='created By'
                                            id="workExperience" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="technicalStack">Technical Stack</label>
                                    <div className="col-sm-10">
                                        <input value={data.technicalStack || ''}
                                            onChange={e => setData({ ...data, technicalStack: e.target.value })}
                                            type="text" className="form-control"
                                            placeholder='enter the technical Stack.'
                                            id="technicalStack" />
                                    </div>
                                </div>
                                <fieldset className="row mb-3">
                                    <legend className="col-form-label col-sm-2 pt-0">CV Shortlisted</legend>
                                    <div className="col-sm-10">
                                        <div className="form-check form-check-inline">
                                            <input checked={data.cvShortlisted === true} onChange={e => setData({ ...data, cvShortlisted: true })} value={data.cvShortlisted || ''} className="form-check-input" type="radio" name="inlineRadioOptions" id="cvShortlisted" />
                                            <label className="form-check-label" htmlFor="inlineRadio1">Yes</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input checked={data.cvShortlisted === false} onChange={e => setData({ ...data, cvShortlisted: false })} value={data.cvShortlisted || ''} className="form-check-input" type="radio" name="inlineRadioOptions" id="cvShortlisted" />
                                            <label className="form-check-label" htmlFor="inlineRadio2">No</label>
                                        </div>
                                    </div>
                                </fieldset>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="lastCTC">Last CTC</label>
                                    <div className="col-sm-10">
                                        <input value={data.lastCTC || ''}
                                            onChange={e => setData({ ...data, lastCTC: e.target.value })}
                                            type="number" className="form-control"
                                            placeholder='paid By'
                                            id="lastCTC" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="noticePeriod">Notice Period </label>
                                    <div className="col-sm-10">
                                        <input value={data.noticePeriod || ''}
                                            onChange={e => setData({ ...data, noticePeriod: e.target.value })}
                                            type="text" className="form-control"
                                            placeholder='enter your noticePeriod'
                                            id="noticePeriod" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="noticePeriod">DOB</label>
                                    <div className="col-sm-10">
                                        <input value={data.dob || ''}
                                            onChange={e => setData({ ...data, dob: e.target.value })}
                                            type="date" className="form-control"
                                            id="dob"/>
                                    </div>
                                </div>
                                <div className="d-grid gap-2 col-6 mx-auto">
                                    <button className="btn btn-outline-success" type="submit">Update Candidate</button>
                                </div>
                            </form>
                            <div className="d-grid gap-2 col-6 mx-auto">
                                <button className="btn btn-outline-danger" onClick={HandleDelete} type="submit">Delete Candidate</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCandidate