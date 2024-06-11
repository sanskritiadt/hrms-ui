import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { Button } from "react-bootstrap";
import './Hrmscss/App.css';
import LoadingPage from "./LoadingPage";
import { useSelector } from 'react-redux';
function GetAllPrEngagement() {
    const [project , setProject ] = useState([]);
    const [loading, setLoading] = useState(true);
    // const token = localStorage.getItem("response-token")
    const  token = useSelector((state) => state.auth.token);
    React.useEffect(() => {
      axios.get(`/apigateway/hrms/engagement/allProjectEngagement`, {
         headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((response) => {
        setProject(response.data);
        setLoading(false); 
        //toast.success("Data found successfully.", { position: 'top-center', theme: "colored", closeOnClick: true })
      }).catch(error => {
        console.log(error)
        toast.error( error.response.data.message || "Error fetching details" );
        setLoading(false); 
      })
    }, []);
    if (!project) return null;
  
    return (
      <div  className="mt-3">
           {loading ? <LoadingPage/> : ''}
      <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
        <ol className="breadcrumb" style={{ color: "white" ,marginLeft:'20px'}}>
            <li className="breadcrumb-item"><Link to="/">Home</Link> </li>
            <li className="breadcrumb-item"><a href="">Partner</a></li>
            <li className="breadcrumb-item active" aria-current="page">Project Engagement</li>
        </ol>
    </nav>
      
      < div  style={{ margin:'25px  20px',  width:'820px',height:'750px'}}>
          <h1  className='Heading1' >Project   Details</h1>
      <div className="table-responsive-sm">
        <table border='2' className="table table-striped table-bordered">
      
          <thead className="head">
            <tr className="table-danger table-striped">
              {/* <th>Project Id</th> */}
              <th>Project Name</th>
              <th>Project Description</th>
              <th>Engaged Employee</th>
              <th>Start Date </th>
              <th>End Date</th>
              <th>Status</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody className="body">
            {project.map((project ) => (
              <tr key={project.projectId}>
                {/* <td><Link to={`/EditprojEng/${project.projectId}`} className="Candidate-id">{project.projectId}</Link></td> */}
                <td>{project.projectName}</td>
                <td>{project.projectDescription}</td>
                <td>{project.engagedEmployee}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <td>{String(project.status)}</td>
                <td> <Link to={`/EditprojEng/${project.projectId}`} >
                      <Button variant="outline-primary" type="button">
                        Edit
                      </Button>
                    </Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      </div>
    );
}

export default GetAllPrEngagement
