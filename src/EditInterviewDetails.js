import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditInterviewDetails = () => {
    const token = localStorage.getItem("response-token")
    const { id } = useParams();
    const { id2 } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        interviewId: "",
        tech_id: "",
        marks: "",
        communication: "",
        enthusiasm: "",
        notes: "",
        offerReleased: "",
        workExInYears: "",
        interviewerName: "",
        candidateName: "",
        source: "",
        offerAccepted: "",
        position_id: "",
        type: "",
        date: "",
        screeningRound: "",
        clientName: "",
        rounds: "",
        selected: "",
        candidate_id: ""
    });
    useEffect(() => {
        axios.get(`/hrms/interview/getInterviewDetailByIdAndRound?interviewId=${id}&round=${id2}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                console.log(response.data);
                setData(response.data);
            }).catch(error => {
                console.log(error)
            })
    }, [id, id2]);

    function handleSubmit(e) {
        e.preventDefault();
        axios.put(`/hrms/interview/updateInterviewDetails`, {
            interviewId: data.interviewId,
            tech_id: data.tech_id,
            marks: data.marks,
            communication: data.communication,
            enthusiasm: data.enthusiasm,
            notes: data.notes,
            offerReleased: data.offerReleased,
            workExInYears: data.workExInYears,
            interviewerName: data.interviewerName,
            candidateName: data.candidateName,
            source: data.source,
            offerAccepted: data.offerAccepted,
            position_id: data.position_id,
            type: data.type,
            date: data.date,
            screeningRound: data.screeningRound,
            clientName: data.clientName,
            rounds: data.rounds,
            selected: data.selected,
            candidate_id: data.candidate_id
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            console.log(response.data);
            toast.success("data has been updated successfully!!", { position: "top-center", theme: 'colored' });
            navigate('/getinterviewdetails')
        }).catch(error => {
            console.log(error.response.data);
            console.log(error);
            toast.error("error occured try after sometime.", { position: "top-center", theme: 'colored' });
        })
    }
    return (
        <div className='container pt-3'>
            <div className='row'>
                <div className='col-lg-8 col-md-10 mx-auto'>
                    <div className='card border-0 shadow'>
                        <div className='card-body'>
                            <form className='container py-3  mb-3' onSubmit={handleSubmit}>

                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='interviewId'>interviewId:</label>
                                    <div className="col-sm-10">
                                        <input disabled value={data.interviewId || ''}
                                            type="number" className="form-control"
                                            id="interviewId" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='tech_id'>tech_id:</label>
                                    <div className="col-sm-10">
                                        <input value={data.tech_id || ''}
                                            onChange={e => setData({ ...data, tech_id: e.target.value })}
                                            type="number" className="form-control"
                                            id="tech_id" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='candidate_id'>candidate_id:</label>
                                    <div className="col-sm-10">
                                        <input value={data.candidate_id || ''}
                                            onChange={e => setData({ ...data, candidate_id: e.target.value })}
                                            type="number" className="form-control"
                                            id="tech_id" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='position_id'>position_id:</label>
                                    <div className="col-sm-10">
                                        <input value={data.position_id || ''}
                                            onChange={e => setData({ ...data, position_id: e.target.value })}
                                            type="number" className="form-control"
                                            id="position_id" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='marks'>marks</label>
                                    <div className="col-sm-10">
                                        <input value={data.marks || ''}
                                            onChange={e => setData({ ...data, marks: e.target.value })}
                                            type="number" className="form-control"
                                            id="marks" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='communication'>communication</label>
                                    <div className="col-sm-10">
                                        <input value={data.communication || ''}
                                            onChange={e => setData({ ...data, communication: e.target.value })}
                                            // onChange={ }
                                            type="number" className="form-control"
                                            id="communication" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='enthusiasm'>enthusiasm</label>
                                    <div className="col-sm-10">
                                        <input value={data.enthusiasm || ''}
                                            onChange={e => setData({ ...data, enthusiasm: e.target.value })}
                                            type="number" className="form-control"
                                            id="enthusiasm" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='notes'>notes</label>
                                    <div className="col-sm-10">
                                        <input value={data.notes || ''}
                                            onChange={e => setData({ ...data, notes: e.target.value })}
                                            type="text"
                                            id="notes"
                                            step='0.1'
                                            className="form-control" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="workExInYears">WorkExInYears</label>
                                    <div className="col-sm-10">
                                        <input value={data.workExInYears || ''}
                                            onChange={e => setData({ ...data, workExInYears: e.target.value })}
                                            type="number" className="form-control"
                                            id="workExInYears" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="interviewerName">InterviewerName</label>
                                    <div className="col-sm-10">
                                        <input value={data.interviewerName || ''}
                                            onChange={e => setData({ ...data, interviewerName: e.target.value })}
                                            type="text" className="form-control"
                                            placeholder='enter your interviewer Name.'
                                            id="interviewerName" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='candidateName'>CandidateName</label>
                                    <div className="col-sm-10">
                                        <input value={data.candidateName || ''}
                                            onChange={e => setData({ ...data, candidateName: e.target.value })}
                                            type="text" className="form-control"
                                            id="candidateName" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='source'>Source</label>
                                    <div className="col-sm-10">
                                        <input value={data.source || ''}
                                            onChange={e => setData({ ...data, source: e.target.value })}
                                            type="text" className="form-control"
                                            id="source" />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="date">Date</label>
                                    <div className="col-sm-10">
                                        <input value={data.date || ''}
                                            onChange={e => setData({ ...data, date: e.target.value })}
                                            type="date" className="form-control"
                                            placeholder='created By'
                                            id="date" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="rounds">Rounds</label>
                                    <div className="col-sm-10">
                                        <input value={data.rounds || ''}
                                            onChange={e => setData({ ...data, rounds: e.target.value })}
                                            type="number " className="form-control"
                                            id="rounds" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="clientName">clientName</label>
                                    <div className="col-sm-10">
                                        <input value={data.clientName || ''}
                                            onChange={e => setData({ ...data, clientName: e.target.value })}
                                            type="text " className="form-control"
                                            id="clientName" />
                                    </div>
                                </div>

                                {/* The first input element is a radio button for "Yes" and is checked if data.isActive is true. The value prop is also set to data.isActive so that the value of the radio button matches the value in the state. The onChange handler updates the isActive value in the state when this radio button is selected.*/}

                                <fieldset className="row mb-3">
                                    <legend className="col-form-label col-sm-2 pt-0">Offer Released</legend>
                                    <div className="col-sm-10">
                                        <div className="form-check form-check-inline">
                                            <input checked={data.offerReleased === true} value={true || ''} onChange={e => setData({ ...data, offerReleased: true })} className="form-check-input" type="radio" name="inlineRadioOptions" id="offerReleased" />
                                            <label className="form-check-label" htmlFor="true">Yes</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input checked={data.offerReleased === false} value={false || ''} onChange={e => setData({ ...data, offerReleased: false })} className="form-check-input" type="radio" name="inlineRadioOptions" id="offerReleased" />
                                            <label className="form-check-label" htmlFor="false">No</label>
                                        </div>
                                    </div>
                                </fieldset>
                                <fieldset className="row mb-3">
                                    <legend className="col-form-label col-sm-2 pt-0">Offer Accepted</legend>
                                    <div className="col-sm-10">
                                        <div className="form-check form-check-inline">
                                            <input checked={data.offerAccepted === true} value={true || ''} onChange={e => setData({ ...data, offerAccepted: true })} className="form-check-input" type="radio" name="inlineRadioOptions1" id="offerAccepted" />
                                            <label className="form-check-label" htmlFor="true">Yes</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input checked={data.offerAccepted === false} value={false || ''} onChange={e => setData({ ...data, offerAccepted: false })} className="form-check-input" type="radio" name="inlineRadioOptions1" id="offerAccepted" />
                                            <label className="form-check-label" htmlFor="false">No</label>
                                        </div>
                                    </div>
                                </fieldset>
                                <fieldset className="row mb-3">
                                    <legend className="col-form-label col-sm-2 pt-0">Screening Round</legend>
                                    <div className="col-sm-10">
                                        <div className="form-check form-check-inline">
                                            <input checked={data.screeningRound === true} value={true || ''} onChange={e => setData({ ...data, screeningRound: true })} className="form-check-input" type="radio" name="inlineRadioOptions2" id="screeningRound" />
                                            <label className="form-check-label" htmlFor="true">Yes</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input checked={data.screeningRound === false} value={false || ''} onChange={e => setData({ ...data, screeningRound: false })} className="form-check-input" type="radio" name="inlineRadioOptions2" id="screeningRound" />
                                            <label className="form-check-label" htmlFor="false">No</label>
                                        </div>
                                    </div>
                                </fieldset>
                                <fieldset className="row mb-3">
                                    <legend className="col-form-label col-sm-2 pt-0">Selected</legend>
                                    <div className="col-sm-10">
                                        <div className="form-check form-check-inline">
                                            <input checked={data.selected === true} value={true || ''} onChange={e => setData({ ...data, selected: true })} className="form-check-input" type="radio" name="inlineRadioOptions3" id="selected" />
                                            <label className="form-check-label" htmlFor="true">Yes</label>
                                        </div>

                                        <div className="form-check form-check-inline">
                                            <input checked={data.selected === false} value={false || ''} onChange={e => setData({ ...data, selected: false })} className="form-check-input" type="radio" name="inlineRadioOptions3" id="selected" />
                                            <label className="form-check-label" htmlFor="false">No</label>
                                        </div>
                                    </div>
                                </fieldset>

                                <fieldset className="row mb-3">
                                    <legend className="col-form-label col-sm-2 pt-0">Type</legend>
                                    <div className="col-sm-10">
                                        <div className="form-check form-check-inline">
                                            <input checked={data.type === "Inbound"} value={"Inbound" || ''} onChange={e => setData({ ...data, type: "Inbound" })} className="form-check-input" type="radio" name="inlineRadioOptions4" id="type" />
                                            <label className="form-check-label" htmlFor="true">Inbound</label>
                                        </div>

                                        <div className="form-check form-check-inline">
                                            <input checked={data.type === "Outbound"} value={"Outbound" || ''} onChange={e => setData({ ...data, type: "Outbound" })} className="form-check-input" type="radio" name="inlineRadioOptions4" id="type" />
                                            <label className="form-check-label" htmlFor="false">Outbound</label>
                                        </div>
                                    </div>
                                </fieldset>
                                <div className="d-grid gap-2 col-6 mx-auto">
                                    <button className="btn btn-outline-success" type="submit">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditInterviewDetails