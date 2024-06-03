import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Hrmscss/App.css'
import {toast } from 'react-toastify';
import './Hrmscss/App.css';
import LoadingPage from "./LoadingPage";

export default function CandidateDetails() {

    const [Candidates, setCandidate] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("response-token")

    useEffect(() => {
        axios.get(`/apigateway/hrms/interviewCandidate/allInterviewCandidate`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setCandidate(response.data);
            setLoading(false); 
        }).catch(error => {
            console.log("error occoured", error);
            toast.error( error.response.data.message || "Error fetching details" );
            setLoading(false); 
        })
    }, []);

    if (!Candidates) return null;

    return (
        <div className="mt-3"><nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
               {loading ? <LoadingPage/> : ''}
        <ol className="breadcrumb" style={{ color: "white" ,marginLeft:'20px'}}>
        
            <li className="breadcrumb-item"><Link to="/">Home</Link> </li>
            <li className="breadcrumb-item"><a href="">Hiring</a></li>
            <li className="breadcrumb-item active" aria-current="page">Get candidate </li>
        </ol>
    </nav>
        <div className="table-responsive-sm" style={{ margin:'100px 10px ',height: '562px'}}>
             <h1  className='Heading1' > Candidate Details</h1>
            <table border='2' className="table table-striped table-bordered">
                <thead className="head">
                    <tr className="table-danger table-striped">
                        <th>CandidateId</th>
                        <th>Candidate Name</th>
                        <th>Email Id</th>
                        <th>Contact No</th>
                        <th>Address</th>
                        <th>Highest Qualification</th>
                        <th>Work Experience</th>
                        <th>Technical Stack</th>
                        <th>CV Shortlisted</th>
                        <th>Last CTC</th>
                        <th>Notice Period</th>
                        <th>Dob</th>
                    </tr>
                </thead>
                <tbody className="body">
                    {/* map over the employees array */}
                    {Candidates.map((Candidate) => (
                        // display a <div> element with the employees.emailId and employees.designation
                        // parent element needs to have a unique key
                        <tr key={Candidate.candidateId}>
                            <td><Link to={`/EditCandidate/${Candidate.candidateId}`} className="Candidate-id">{Candidate.candidateId}</Link></td>
                            <td>{Candidate.candidateName}</td>
                            <td>{Candidate.emailId}</td>
                            <td>{Candidate.contactNo}</td>
                            <td>{Candidate.address}</td>
                            <td>{Candidate.highestQualification}</td>
                            <td>{Candidate.workExperience}</td>
                            <td>{Candidate.technicalStack}</td>
                            <td>{String(Candidate.cvShortlisted)}</td>
                            <td>{Candidate.lastCTC}</td>
                            <td>{Candidate.noticePeriod}</td>
                            <td>{Candidate.dob}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
       </div>

    );
}