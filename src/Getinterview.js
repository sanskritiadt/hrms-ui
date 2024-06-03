import axios from "axios";
import React, { useState, useEffect } from 'react';
import './Hrmscss/App.css'
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import LoadingPage from "./LoadingPage";

export default function Getinterviewdetails() {
    const [positions, setPosition] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const token = localStorage.getItem("response-token")
    useEffect(() => {
        axios.get("/apigateway/hrms/interview/getAllInterviewDetails", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setPosition(response.data);
            setLoading(false); 
        }).catch((error) => {
            console.log("error occured", error);
            toast.error( error.response.data.message || "Error fetching details" );
            setLoading(false); 
        })
    }, []);


    if (!positions) return null;


    return (
        <div><nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
               {loading ? <LoadingPage/> : ''}
        <ol className="breadcrumb" style={{ color: "white" ,marginLeft:'20px'}}>
        
            <li className="breadcrumb-item"><Link to="/">Home</Link> </li>
            <li className="breadcrumb-item"><a href="">Hiring</a></li>
            <li className="breadcrumb-item active" aria-current="page">Get Interview Details </li>
        </ol>
    </nav>
        <div className="table-responsive-sm">
               <h1  className='Heading1' >Interview Details</h1>
            <table border='2' className="table table-striped table-bordered">
                <thead className="head">
                    <tr className="table-danger table-striped">
                        <th>INTERVIEWID</th>
                        <th>ROUNDS</th>
                        <th>TECHNOLOGY</th>
                        <th>POSITION NAME</th>
                        <th>CANDIDATE NAME</th>
                        <th>MARKS</th>
                        <th>COMMUNICATION</th>
                        <th>ENTHUSIASM</th>
                        <th>NOTES</th>
                        <th>WORK EXP IN YEARS</th>
                        <th>INTERVIEWER NAME</th>
                        <th>CANDIDATE NAME</th>
                        <th>SOURCE</th>
                        <th>OFFER ACCEPTED</th>
                        <th>TYPE</th>
                        <th>CLIENT NAME</th>
                        <th>DATE</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody className="body">
                    {/* map over the employees array */}
                    {positions.map(position => (
                        // display a <div> element with the employees.emailId and employees.designation
                        // parent element needs to have a unique key
                        <tr key={position.interviewId}>
                            <td><Link to={`/EditInterviewDetails/${position.interviewId}/${position.rounds}`} className="Candidate-id">{position.interviewId}</Link></td>
                            <td><Link to={`/EditInterviewDetails/${position.interviewId}/${position.rounds}`} className="Candidate-id">{position.rounds}
                            </Link></td>
                            <td>{position.tech_id.description}</td>
                            <td>{position.position_id.positionName}</td>
                            <td>{position.candidate_id.candidateName}</td>
                            <td>{position.marks}</td>
                            <td>{position.communication}</td>
                            <td>{position.enthusiasm}</td>
                            <td>{position.notes}</td>
                            <td>{position.workExInYears}</td>
                            <td>{position.interviewerName}</td>
                            <td>{position.candidateName}</td>
                            <td>{position.source}</td>
                            <td>{String(position.offerAccepted)}</td>
                            <td>{position.type}</td>
                            <td>{position.clientName}</td>
                            <td>{position.date}</td>
                            <td>{position.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
       </div>

    );
}