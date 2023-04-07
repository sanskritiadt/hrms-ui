import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Hrmscss/ExampleTable.css'
import axios from 'axios';

function ClientInfoTable() {
    const token = localStorage.getItem("response-token")
    const [clientInfo, setClientInfo] = useState([]);

    useEffect(() => {
        // Fetch the client information from the server when the component mounts
        axios.get('/expenseManagement/clientInfo/getAllClientInfo',{
            headers: {
                'Authorization': `Bearer ${token}`
            }
          }).then(response => {
                setClientInfo(response.data)
                console.log(response.data)
            })
            .catch(error => console.log(error));
    }, []);
    const setData = (data) => {
        let { id, companyName, address, phone, email, contactPerson, gstin } = data;
        localStorage.setItem('id', id);
        localStorage.setItem('companyName', companyName);
        localStorage.setItem('address', address);
        localStorage.setItem('phone', phone)
        localStorage.setItem('email', email)
        localStorage.setItem('contactPerson', contactPerson)
        localStorage.setItem('gstin', gstin)
    }
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
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientInfo.map(client => (
                            <tr key={client.id}>
                                <td>{client.id}</td>
                                <td>{client.companyName}</td>
                                <td>{client.address}</td>
                                <td>{client.phone}</td>
                                <td>{client.email}</td>
                                <td>{client.contactPerson}</td>
                                <td>{client.gstin}</td>
                                <td> <button onClick={() => {
                                    setData(client)
                                    window.location.reload()
                                }} className='btn btn-success'>Update</button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
};
export default ClientInfoTable;

