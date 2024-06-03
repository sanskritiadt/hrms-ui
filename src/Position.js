import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import handleAuthError from './CommonErrorHandling';
import { Link } from "react-router-dom";
import LoadingPage from './LoadingPage';

export default function PositionDetails() {
    const [loading, setLoading] = useState(true);
    const [positions, setPosition] = React.useState([]);
    const token = localStorage.getItem("response-token")

    React.useEffect(() => {

        axios.get("/apigateway/hrms/interview/getAllPositionNew", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setPosition(response.data);
            setLoading(false);
        }).catch(error => {
            toast.error( error.response.data.message || "Error fetching details" );
            console.log("error occurred", error)
            setLoading(false);
        })
    }, []);

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);


        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (!positions) return null;

    return (
        <div>
            <div className="mt-3">
                {loading ? <LoadingPage/> : ''}
                <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
                    <ol className="breadcrumb" style={{ color: "white" ,marginLeft:'20px'}}>

                        <li className="breadcrumb-item"><Link to="/">Home</Link> </li>
                        <li className="breadcrumb-item"><a href="">Employee Management</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Employee Position</li>
                    </ol>
                </nav>
            </div>
            <div className="d-flex justify-content-center  " style={{ width: screenWidth-50}}>

                <div className="table-responsive-sm">
                    <div className="my-4">
                    <h1 className='Heading1'>Employee Position</h1>
                    </div>
                    <table border='2' className="table table-striped table-bordered">
                        <thead className="head">
                            <tr className="table-danger table-striped">
                                <th>ID</th>
                                <th>TECH STACK</th>
                                <th>VACANCY</th>
                                <th>POSITION OPEN DATE</th>
                                <th>POSITION CLOSE DATE</th>
                                <th>STATUS</th>
                                <th>EXPERIENCE IN YEAR</th>
                                <th>REMOTE</th>
                                <th>POSITION TYPE</th>
                            </tr>
                        </thead>
                        <tbody className="body">
                           
                            {positions.map((position) => (
                                // display a <div> element with the employees.emailId and employees.designation
                                // parent element needs to have a unique key
                                <tr key={position.uiid}>
                                    <td>{position.uiid}</td>
                                    <td>{position.techStack.join(",")}</td>
                                    <td>{position.vacancy}</td>
                                    <td>{position.positionopendate}</td>
                                    <td>{position.positionclosedate}</td>
                                    <td>{position.status}</td>
                                    <td>{position.experienceInYear}</td>
                                    <td>{String(position.remote)}</td>
                                    <td>{position.positionType}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}





