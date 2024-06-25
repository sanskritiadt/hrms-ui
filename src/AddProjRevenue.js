import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import handleAuthError from './CommonErrorHandling';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AddProjRevenue = () => {
    const  token = useSelector((state) => state.auth.token);
    const [data, setData] = useState({
        endClient: '',
        year: '',
        month: '',
        projectRevenue: '',
        resourceExpense: ''
    });
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get(`/apigateway/hrms/engagement/allProjectEngagement`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setProjects(response.data);
        }).catch((error) => {
            console.log(error);
            handleAuthError(error);
        });
    }, [token]);

    const years = Array.from(new Array(10), (val, index) => new Date().getFullYear() + index);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function submit(e) {
        e.preventDefault();
        const selectedProject = projects.find(project => project.endClient === data.endClient);
        const projectId = selectedProject ? selectedProject.projectId : null;

        if (!projectId) {
            toast.error("Invalid project selected", { position: 'top-center', theme: "colored" });
            return;
        }

        // Generate a new ID dynamically
        const newId = generateNewId(); // Implement this function to generate a new integer ID

        axios.post(`/apigateway/hrms/engagement/saveProjectRevenue`, {
            id: newId,
            projectEngagement: {
                projectId: projectId
            },
            year: data.year,
            month: data.month,
            projectRevenue: data.projectRevenue,
            resourceExpense: data.resourceExpense
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response.data);
            toast.success(response.data, { position: 'top-center', theme: "colored" });
        }).catch((error) => {
            console.log(error);
            handleAuthError(error);
        });

        // Clear form data after submission
        setData({
            endClient: '',
            year: '',
            month: '',
            projectRevenue: '',
            resourceExpense: ''
        });
    }

    // Function to generate a new integer ID
    function generateNewId() {
        // Implement your logic to generate a new unique ID
        // For example, find the max ID in existing data and add 1
        // Or use a simple counter if IDs are not persisted
        return Math.floor(Math.random() * 1000); // Example: Generates a random integer ID (adjust as needed)
    }

    function handle(e) {
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
    }

    return (
        <div className="mt-3">
            <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
                <ol className="breadcrumb" style={{ color: "white", marginLeft: '20px' }}>
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/">Partner</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Project Revenue Details</li>
                </ol>
            </nav>
            <div className='container pt-3'>
                <div className='row'>
                    <div>
                        <h1 className='Heading1' style={{ textAlign: 'center' }}>Project Revenue Details</h1>
                    </div>
                    <div className='col-md-8 mx-auto'>
                        <div className='card border-0 shadow' style={{ marginRight: '100px', width: '700px', height: '600px' }}>
                            <div className='card-body'>
                                <form className='container py-3 mb-3' onSubmit={submit}>
                                    <div className="row mb-3">
                                        <label htmlFor="endClient" className="col-sm-2 col-form-label">End Client</label>
                                        <div className="col-sm-10">
                                            <select onChange={handle} value={data.endClient} className="form-select" id="endClient">
                                                <option value="">Select End Client</option>
                                                {projects.map((project, index) => (
                                                    <option key={index} value={project.endClient}>{project.endClient}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="year" className="col-sm-2 col-form-label">Year</label>
                                        <div className="col-sm-10">
                                            <select onChange={handle} value={data.year} className="form-select" id="year">
                                                <option value="">Select Year</option>
                                                {years.map((year, index) => (
                                                    <option key={index} value={year}>{year}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="month" className="col-sm-2 col-form-label">Month</label>
                                        <div className="col-sm-10">
                                            <select onChange={handle} value={data.month} className="form-select" id="month">
                                                <option value="">Select Month</option>
                                                {months.map((month, index) => (
                                                    <option key={index} value={month}>{month}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="projectRevenue" className="col-sm-2 col-form-label">Project Revenue</label>
                                        <div className="col-sm-10">
                                            <input onChange={handle} value={data.projectRevenue} type="number" className="form-control" id="projectRevenue" placeholder='Enter Project Revenue' />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="resourceExpense" className="col-sm-2 col-form-label">Resource Expense</label>
                                        <div className="col-sm-10">
                                            <input onChange={handle} value={data.resourceExpense} type="number" className="form-control" id="resourceExpense" placeholder='Enter Resource Expense' />
                                        </div>
                                    </div>

                                    <div className="d-grid gap-2 col-6 mx-auto">
                                        <button className="btn btn-outline-danger" type="submit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProjRevenue;
