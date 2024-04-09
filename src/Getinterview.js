import axios from "axios";
import React from "react";
import './Hrmscss/App.css'
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import handleAuthError from './CommonErrorHandling';

export default function Getinterviewdetails() {

    const [positions, setPosition] = React.useState([]);
    const token = localStorage.getItem("response-token")
    React.useEffect(() => {
        axios.get("/apigateway/hrms/interview/getAllInterviewDetails", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setPosition(response.data);
          //  toast.success("data found succesfully.", { position: 'top-center', theme: "colored" })
        }).catch((error) => {
            handleAuthError(error);
            console.log("error occured", error)
            // toast.error("error occured data not found.", { position: 'top-center', theme: "colored" })
        })
    }, []);


    if (!positions) return null;

    // {
    //     "interviewId": 11,
    //     "rounds": 3,
    //     "candidate_id": {
    //         "candidateId": 2,
    //         "candidateName": "Rahul Tichkule",
    //         "emailId": "rahul@gmail.com",
    //         "contactNo": "9575258566",
    //         "address": "Indore, MP",
    //         "highestQualification": "BE",
    //         "workExperience": "3.5 Year",
    //         "technicalStack": "Java",
    //         "cvShortlisted": true,
    //         "lastCTC": 3.0,
    //         "noticePeriod": 90,
    //         "dob": null
    //     },
    //     "tech_id": {
    //         "techId": 1,
    //         "description": "Java"
    //     },
    //     "position_id": {
    //         "positionId": 2,
    //         "positionName": "Java Developer",
    //         "techStack": [
    //             "Java",
    //             "SpringBoot"
    //         ],
    //         "positionOpenDate": "2023-05-01T16:29:30.412",
    //         "positionCloseDate": "2023-05-31T16:29:30.412",
    //         "status": "Available",
    //         "experienceInYear": 2.5,
    //         "remote": true,
    //         "positionType": "Contractual",
    //         "vacancy": 3
    //     },
    //     "marks": 80,
    //     "communication": 90,
    //     "enthusiasm": 80,
    //     "notes": "Bad",
    //     "offerReleased": false,
    //     "workExInYears": 3.0,
    //     "interviewerName": "Akash",
    //     "candidateName": "Rahul Tichkule",
    //     "source": "LinkedIn",
    //     "offerAccepted": false,
    //     "type": "Outbound",
    //     "date": "2023-02-06",
    //     "clientName": "Facebook",
    //     "status": "Rejected"
    // }
    return (
        <div><nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
        <ol className="breadcrumb" style={{  color: "white" }}>
        
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