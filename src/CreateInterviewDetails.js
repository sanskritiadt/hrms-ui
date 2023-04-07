import axios from 'axios';
import React from 'react'
import { useState } from 'react';
const CreateInterview = () => {
    const token = localStorage.getItem("response-token")
    const [data, setData] = useState({
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
        screeningRound: "",
        selected: "",
        type: "",
        clientName: "",
        rounds: "",
        date: "",
        position_id: "",
        candidate_id: ""
    });

    function submit(e) {
        e.preventDefault();
        axios.post(`/hrms/interview/saveInterviewDetails`, {
            tech_id: parseInt(data.tech_id),
            marks: parseInt(data.marks),
            communication: parseInt(data.communication),
            enthusiasm: parseInt(data.enthusiasm),
            notes: data.notes,
            offerReleased: data.offerReleased,
            workExInYears: parseInt(data.workExInYears),
            interviewerName: data.interviewerName,
            candidateName: data.candidateName,
            source: data.source,
            offerAccepted: data.offerAccepted,
            screeningRound: data.screeningRound,
            selected: data.selected,
            type: data.type,
            clientName: data.clientName,
            rounds: parseInt(data.rounds),
            date: data.date,
            position_id: parseInt(data.position_id),
            candidate_id: parseInt(data.candidate_id)
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        ).then(response => {
            console.log(response.data);
            alert("interview details has been created successfully.")
        }).catch(error => {
            console.log(error);
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            alert("error found try after sometime.")
        })
    }
    // {
    //     "marks": 84,
    //     "communication": 67,
    //     "enthusiasm": 3,
    //     "notes": "Good",
    //     "offerReleased": true,
    //     "workExInYears": 2.5,
    //     "interviewerName": "Sunali",    
    //     "candidateName": "Ankit",
    //     "source": "Hirect",
    //     "offerAccepted": true,
    //     "screeningRound": false,
    //     "selected": true,
    //     "type": "Inbound",
    //     "clientName": "nescafe",
    //     "rounds": 3,
    //     "date": "2007-12-03",
    //     "tech_id": 2,
    //     "position_id": 28,
    //     "candidate_id": 1
    // }
    var str2bool = (value) => {
        if (value && typeof value === "string") {
            if (value.toLowerCase() === "true") return true;
            if (value.toLowerCase() === "false") return false;
        }
        return value;
    }
    function radiobutton1(e) {
        console.log(str2bool(e.target.value));
        // Here we can send the data to further processing (Action/Store/Rest)
        data.offerReleased = str2bool(e.target.value); 
    }
    function radiobutton2(e) {
        console.log(str2bool(e.target.value));
        // Here we can send the data to further processing (Action/Store/Rest)
        data.offerAccepted = str2bool(e.target.value);
    }
    function radiobutton3(e) {
        console.log(str2bool(e.target.value));
        // Here we can send the data to further processing (Action/Store/Rest)
        data.selected = str2bool(e.target.value);
    }
    function radiobutton4(e) {
        console.log(str2bool(e.target.value));
        // Here we can send the data to further processing (Action/Store/Rest)
        data.screeningRound = str2bool(e.target.value);
    }

    function handle(e) {
        const newdata = { ...data };
        newdata[e.target.id] = e.target.value;
        setData(newdata);
        console.log(newdata);
    }
    return (
        <div className='container pt-3'>
            <div className='row'>
                <div className='col-lg-8 col-md-10 mx-auto'>
                    <div className='card border-0 shadow'>
                        <div className='card-body'>
                            <form className='container py-3  mb-3' >
                                <div className="row mb-3">
                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='tech_id'>Tech Id</label>
                                    <div className="col-sm-10">
                                        <input required onChange={(e) => { handle(e) }} value={data.tech_id}
                                            type="number"
                                            id="tech_id"
                                            step='0.1'
                                            className="form-control" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='position_id'>Position Id</label>
                                    <div className="col-sm-10">
                                        <input required onChange={(e) => { handle(e) }} value={data.position_id}
                                            type="number" step='0.1' className="form-control"
                                            id="position_id" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='candidate_id'>Candidate Id</label>
                                    <div className="col-sm-10">
                                        <input required onChange={(e) => { handle(e) }} value={data.candidate_id}
                                            type="number" step='0.1' className="form-control"
                                            id="candidate_id" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='marks'>Marks</label>
                                    <div className="col-sm-10">
                                        <input required onChange={(e) => { handle(e) }} value={data.marks}
                                            type="number" step='0.1' className="form-control"  
                                            id="marks" />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='communication'>Communication</label>
                                    <div className="col-sm-10">
                                        <input required onChange={(e) => { handle(e) }} value={data.communication}
                                            type="number" step='0.1' className="form-control"
                                            id="communication" />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="enthusiasm">Enthusiasm</label>
                                    <div className="col-sm-10">
                                        <input required onChange={(e) => { handle(e) }} value={data.enthusiasm}
                                            type="number" className="form-control"
                                            step='0.1'
                                            id="enthusiasm" />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="notes">Notes</label>
                                    <div className="col-sm-10">
                                        <input required onChange={(e) => { handle(e) }} value={data.notes}
                                            type="text" className="form-control"
                                            placeholder='enter your notes'
                                            id="notes" />
                                    </div>
                                </div>
                               
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="notes">Work Exp In Years</label>
                                    <div className="col-sm-10">
                                        <input required onChange={(e) => { handle(e) }} value={data.workExInYears}
                                            type="number" className="form-control"
                                            placeholder='enter your work experience in years.'
                                            id="workExInYears" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="interviewerName">Interviewer Name</label>
                                    <div className="col-sm-10">
                                        <input required onChange={(e) => { handle(e) }} value={data.interviewerName}
                                            type="text" className="form-control"
                                            placeholder='enter interviewer Name'
                                            id="interviewerName" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="candidateName">Candidate Name</label>
                                    <div className="col-sm-10">
                                        <input required onChange={(e) => { handle(e) }} value={data.candidateName}
                                            type="text" className="form-control"
                                            placeholder='enter candidate Name'
                                            id="candidateName" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="source">Source</label>
                                    <div className="col-sm-10">
                                        <input required onChange={(e) => { handle(e) }} value={data.source}
                                            type="text" className="form-control"
                                            placeholder='enter your source'
                                            id="source" />
                                    </div>
                                </div>
                                <fieldset className="row mb-3">
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
                                </fieldset>
                                <fieldset className="row mb-3">
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
                                </fieldset>

                                <fieldset className="row mb-3">
                                    <legend className="col-form-label col-sm-2 pt-0">Offer Released</legend>
                                    <div className="col-sm-10">
                                        <div className="form-check form-check-inline">
                                            <input onChange={radiobutton1} value="true" className="form-check-input" type="radio" name="offerReleased" id="offerReleased" />
                                            <label className="form-check-label" htmlFor="inlineRadio1">Yes</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input onChange={radiobutton1} value="false" className="form-check-input" type="radio" name="offerReleased" id="offerReleased" />
                                            <label className="form-check-label" htmlFor="inlineRadio2">No</label>
                                        </div>
                                    </div>
                                </fieldset>

                                <fieldset className="row mb-3">
                                    <legend className="col-form-label col-sm-2 pt-0">Offer Accepted</legend>
                                    <div className="col-sm-10">
                                        <div className="form-check form-check-inline">
                                            <input onChange={radiobutton2} value="true" className="form-check-input" type="radio" name="offerAccepted" id="offerAccepted" />
                                            <label className="form-check-label" htmlFor="inlineRadio1">Yes</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input onChange={radiobutton2} value="false" className="form-check-input" type="radio" name="offerAccepted" id="offerAccepted" />
                                            <label className="form-check-label" htmlFor="inlineRadio2">No</label>
                                        </div>
                                    </div>
                                </fieldset>
                                <fieldset className="row mb-3">
                                    <legend className="col-form-label col-sm-2 pt-0">Type</legend>
                                    <div className="col-sm-10">
                                        <div className="form-check form-check-inline">
                                            <input  onChange={(e) => { handle(e) }} value="Outbound" className="form-check-input" type="radio" name="type" id="type" />
                                            <label className="form-check-label" htmlFor="inlineRadio1">Inbound</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input onChange={(e) => { handle(e) }} value="Outbound"className="form-check-input" type="radio" name="type" id="type" />
                                            <label className="form-check-label" htmlFor="inlineRadio2">Outbound</label>
                                        </div>
                                    </div>
                                </fieldset>

                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="clientName">Client Name</label>
                                    <div className="col-sm-10">
                                        <input required onChange={(e) => { handle(e) }} value={data.clientName}
                                            type="text" className="form-control"
                                            placeholder='enter client Name'
                                            id="clientName" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="notes">Rounds</label>
                                    <div className="col-sm-10">
                                        <input required onChange={(e) => { handle(e) }} value={data.rounds}
                                            type="number" className="form-control"
                                            placeholder='enter the number of  Rounds.'
                                            id="rounds" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='date'>Date</label>
                                        <div className="col-sm-10">
                                            <input onChange={(e) => { handle(e) }} value={data.date}
                                                type="date" className="form-control"
                                                id="date" />
                                        </div>
                                    </div>
                                <div className="d-grid gap-2 col-6 mx-auto">
                                    <button className="btn btn-outline-danger" type="submit" onClick={(e) => { submit(e) }}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateInterview