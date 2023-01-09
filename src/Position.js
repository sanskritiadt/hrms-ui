import axios from "axios";
import React from "react";
import './App.css'
export default function PositionDetails() {

    const [positions, setPosition] = React.useState([]);

    React.useEffect(() => {
    axios.get("/intervPosition/getAllPosition").then((response) => {
        setPosition(response.data);
    });
  }, []);


    if (!positions) return null;

    return (
        <div>
            <table border='2' className="table table-striped">
                <thead className="head" style={{ backgroundColor: "lightblue" }}>
                    <tr styles={{ width: '50%' }}>
                        <th styles={{ width: '50%' }}>ID</th>
                        <th styles={{ width: '50%' }}>TECHID</th>
                        <th styles={{ width: '50%' }}>POSITION OPEN DATE</th>
                        <th styles={{ width: '50%' }}>POSITION CLOSE DATE</th>
                        <th styles={{ width: '50%' }}>STATUS</th>
                        <th styles={{ width: '50%' }}>EXPERIENCE IN YEAR</th>
                        <th styles={{ width: '50%' }}>REMOTE</th>
                        <th styles={{ width: '50%' }}>POSITION TYPE</th>
                    </tr>
                </thead>
                <tbody className="body">
                    {/* map over the employees array */}
                    {positions.map((position) => (
                        // display a <div> element with the employees.emailId and employees.designation
                        // parent element needs to have a unique key
                        <tr key={position.id}>
                            <td>{position.id}</td>
                            <td>{position.techId}</td>
                            <td>{position.positionOpenDate}</td>
                            <td>{position.positionCloseDate}</td>
                            <td>{position.status}</td>
                            <td>{position.experienceInYear}</td>
                            <td>{position.remote}</td>
                            <td>{position.positionType}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
}