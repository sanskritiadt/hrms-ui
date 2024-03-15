import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import './Hrmscss/App.css'
import {toast } from 'react-toastify';
import './Hrmscss/App.css';
import handleAuthError from './CommonErrorHandling';

export default function CandidateDetails() {

    const [Candidates, setCandidate] = React.useState([]);
    const token = localStorage.getItem("response-token")

    React.useEffect(() => {
        axios.get(`/apigateway/hrms/interviewCandidate/allInterviewCandidate`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setCandidate(response.data);
            toast.success(" Candidate data found successfully!!", { position: "top-center", theme: 'colored' })
        }).catch(error => {
            handleAuthError(error )
            console.log("error occoured", error)
            // toast.error("something went wrong please try after sometime.", { position: "top-center", theme: 'colored' })
        })
    }, []);

    // {
    //     "candidateId": 1,
    //     "candidateName": "Ankit",
    //     "emailId": "ankit@gmail.com",
    //     "contactNo": "9575255565",
    //     "address": "Indore, MP",
    //     "highestQualification": "BE",
    //     "workExperience": "1.5 Year",
    //     "technicalStack": "Java, React",
    //     "cvShortlisted": true,
    //     "lastCTC": 3.0,
    //     "noticePeriod": 90
    // }    
    if (!Candidates) return null;

    return (
        <div><nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
        <ol className="breadcrumb" style={{  color: "white" }}>
        
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