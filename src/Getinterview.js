import axios from "axios";
import React from "react";
import './Hrmscss/App.css'
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

export default function Getinterviewdetails() {

    const [positions, setPosition] = React.useState([]);
    const token = localStorage.getItem("response-token")
    React.useEffect(() => {
        axios.get("/hrms/interview/getAllInterviewDetails", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setPosition(response.data);
            toast.success("data found succesfully.", { position: 'top-center', theme: "colored" })
        }).catch((error) => {
            console.log("error occured", error)
            toast.error("error occured data not found.", { position: 'top-center', theme: "colored" })
        })
    }, []);


    if (!positions) return null;

    // {
    //     "interviewId": 1,
    //     "tech_id": null,
    //     "marks": 84,
    //     "communication": 67,
    //     "enthusiasm": 3,
    //     "notes": "Good",
    //     "offerReleased": true,
    //     "workExInYears": 2.5,
    //     "interviewerName": "Sunali",
    //     "candidateName": "Satyam",
    //     "source": "Hirect",
    //     "offerAccepted": true,
    //     "position_id": null,
    //     "type": "Inbound",
    //     "date": "2007-12-03",
    //     "screeningRound": false,
    //     "clientName": "Abc",
    //     "rounds": 3,
    //     "selected": true,
    //     "candidate_id": null
    // }

    return (
        <div className="table-responsive-sm">
            <table border='2' className="table table-striped table-bordered">
                <thead className="head">
                    <tr className="table-danger table-striped">
                        <th>INTERVIEWID</th>
                        <th>ROUNDS</th>
                        <th>TECHID</th>
                        <th>POSITION ID</th>
                        <th>CANDIDATE ID</th>
                        <th>MARKS</th>
                        <th>COMMUNICATION</th>
                        <th>ENTHUSIASM</th>
                        <th>NOTES</th>
                        <th>WORK EXP IN YEARS</th>
                        <th>INTERVIEWER NAME</th>
                        <th>CANDIDATE NAME</th>
                        <th>SOURCE</th>
                        <th>OFFER ACCEPTED</th>
                        <th>SCREENING ROUND</th>
                        <th>SELECTED</th>
                        <th>OFFER RELEASED</th>
                        <th>TYPE</th>
                        <th>CLIENT NAME</th>
                        <th>DATE</th>
                    </tr>
                </thead>
                <tbody className="body">
                    {/* map over the employees array */}
                    {positions.map((position) => (
                        // display a <div> element with the employees.emailId and employees.designation
                        // parent element needs to have a unique key
                        <tr key={position.interviewId}>
                            <td><Link to={`/EditInterviewDetails/${position.interviewId}/${position.rounds}`} className="Candidate-id">{position.interviewId}</Link></td>
                            <td><Link to={`/EditInterviewDetails/${position.interviewId}/${position.rounds}`} className="Candidate-id">{position.rounds}
                            </Link></td>
                            <td>{position.tech_id}</td>
                            <td>{position.position_id}</td>
                            <td>{position.candidate_id}</td>
                            <td>{position.marks}</td>
                            <td>{position.communication}</td>
                            <td>{position.enthusiasm}</td>
                            <td>{position.notes}</td>
                            <td>{position.workExInYears}</td>
                            <td>{position.interviewerName}</td>
                            <td>{position.candidateName}</td>
                            <td>{position.source}</td>
                            <td>{String(position.offerAccepted)}</td>
                            <td>{String(position.screeningRound)}</td>
                            <td>{String(position.selected)}</td>
                            <td>{String(position.offerReleased)}</td>
                            <td>{position.type}</td>
                            <td>{position.clientName}</td>
                            <td>{position.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
}