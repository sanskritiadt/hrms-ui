import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Hrmscss/ExampleTable.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

//******** USe Prototype obj */

function ClientInfoTable() {
    const token = localStorage.getItem("response-token")
    const [clientInfo, setClientInfo] = useState([]);

    useEffect(() => {
        // Fetch the client information from the server when the component mounts
        axios.get('/expensemanagement/clientInfo/getAllClientInfo', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            setClientInfo(response.data)
            console.log(response.data);
            toast.success("Client data found successfully!!", { position: "top-center", theme: 'colored' })

        })
            .catch(error => {
                console.log(error);
                toast.error("something went wrong please try after sometime.", { position: "top-center", theme: 'colored' })
            });
    }, []);

    // Otherwise, render the client information in a table
    return (
        <div style={{ marginTop: '20px' }}>
            <Container>
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
    )
};
export default ClientInfoTable;

