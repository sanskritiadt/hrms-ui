import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Hrmscss/ExampleTable.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import './Hrmscss/App.css';
import handleAuthError from './CommonErrorHandling';


//******** USe Prototype obj */

function ClientInfoTable() {
    const token = localStorage.getItem("response-token")
    const [clientInfo, setClientInfo] = useState([]);

    useEffect(() => {
        // Fetch the client information from the server when the component mounts
        axios.get(`/apigateway/expensemanagement/clientInfo/getAllClientInfo`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            setClientInfo(response.data)
            console.log(response.data);
           // toast.success("Client data found successfully!!", { position: "top-center", theme: 'colored' })

        })
            .catch(error => {
                console.log(error);
                handleAuthError(error);
                // toast.error("something went wrong please try after sometime.", { position: "top-center", theme: 'colored' })
            });
    }, []);

    // Otherwise, render the client information in a table
    return (
        <div  className="mt-3"><nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
        <ol className="breadcrumb" style={{ color: "white" ,marginLeft:'20px'}}>
        
            <li className="breadcrumb-item"><Link to="/">Home</Link> </li>
            <li className="breadcrumb-item"><a href="">Partner</a></li>
            <li className="breadcrumb-item active" aria-current="page">Get Client Information</li>
        </ol>
    </nav>
        <div  style={{  marginTop:'50px', marginLeft : '80px ', width:'820px',height:'750px'}}>
            <Container>
            <h1  className='Heading1' >Get Client Information </h1>
                <Table striped bordered hover className="custom-table">
                    <thead >
                        <tr>
                            <th>Id</th>
                            <th>Company Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Contact Person</th>
                            <th>GSTIN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientInfo.map(client => (
                            <tr key={client.id}>
                                <td><Link className="Candidate-id" to={`/EditClient/${client.id}`}>{client.id}</Link></td>
                                <td>{client.companyName}</td>
                                <td>{client.address}</td>
                                <td>{client.phone}</td>
                                <td>{client.email}</td>
                                <td>{client.contactPerson}</td>
                                <td>{client.gstin}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
        </div>
    )
};
export default ClientInfoTable;

