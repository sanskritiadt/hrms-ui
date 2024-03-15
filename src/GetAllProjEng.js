import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import './Hrmscss/App.css'

function GetAllPrEngagement() {
    const [project , setProject ] = useState([]);
    const token = localStorage.getItem("response-token")
    React.useEffect(() => {
      axios.get(`/apigateway/hrms/engagement/allProjectEngagement`, {
         headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((response) => {
        setProject(response.data);
        toast.success("data found successfully.", { position: 'top-center', theme: "colored", closeOnClick: true })
      }).catch(error => {
        console.log(error)
        toast.error("error happend try after sometime.", { position: "top-center", theme: 'colored' })
      })
    }, []);
    if (!project) return null;
  
    //
    // "projectId": 100,
	// "projectName":"rki",
	// "projectDescription":"Online villa booking site",
	// "engagedEmployee":"vikash",
	// "startDate":"01/05/2023",
	// "endDate":"20/06/2023",
	// "status":"active"
  
    return (
      
      < div  style={{ margin:'25px  20px',  width:'820px',height:'750px'}}>
          <h1  className='Heading1' >Project   Details</h1>
      <div className="table-responsive-sm">
        <table border='2' className="table table-striped table-bordered">
      
          <thead className="head">
            <tr className="table-danger table-striped">
              <th>Project Id</th>
              <th>Project Name</th>
              <th>Project Description</th>
              <th>Engaged Employee</th>
              <th>Start Date </th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="body">
            {project.map((project ) => (
              // display a <div> element with the employees.emailId and employees.designation
              // parent element needs to have a unique key
              <tr key={project.projectId}>
                <td><Link to={`/EditprojEng/${project.projectId}`} className="Candidate-id">{project.projectId}</Link></td>
                <td>{project.projectName}</td>
                <td>{project.projectDescription}</td>
                <td>{project.engagedEmployee}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <td>{String(project.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    );
}

export default GetAllPrEngagement
