import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import LoadingPage from './LoadingPage'
import { useSelector } from 'react-redux';
function EditHolidayCalender() {
  // const token = localStorage.getItem("response-token");
  const  token = useSelector((state) => state.auth.token);
  
  const [loading, setLoading] = useState(false);
  const [holiday, setHoliday] = useState([]);


  useEffect(() => {
    fetchHolidayData();
  }, []);

  const fetchHolidayData = () => {
    setLoading(true); 
    axios.get("/apigateway/hrms/holiday/getHolidayCalendar", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      setHoliday(response.data);
      setLoading(false); 
    }).catch(error => {
      console.log(error);
      toast.error( error.response.data.message || "Error fetching details" );
      setLoading(false); 
    });
  };


  const handlePdf = () => {
    setLoading(true); 
    axios.get(`/apigateway/hrms/holiday/downloadHolidayCalendar`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      responseType: 'arraybuffer'  // Set the response type to 'arraybuffer'
    }).then((response) => {
      const pdfData = new Uint8Array(response.data);
      const blob = new Blob([pdfData], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      var newTab = window.open(url, "_blank");
      
      toast.success('Holiday calendar generated successfully.', {
        position: 'top-center',
        theme: 'colored',
      });
      setLoading(false); 
    }).catch((error) => {
      console.log(error);
      toast.error( error.response.data.message || "Error updating details" );
      setLoading(false); 
    });
  };
  return (
    <div  className="mt-3">
          {loading ? <LoadingPage/> : ''}
      <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
    <ol className="breadcrumb" style={{ color: "white" ,marginLeft:'20px'}}>
        <li className="breadcrumb-item"><Link to="/">Home</Link> </li>
        <li className="breadcrumb-item"><a href="">Employee Services</a></li>
        <li className="breadcrumb-item active" aria-current="page">Holiday Calender </li>
    </ol>
</nav>
    <div style={{ margin: '100px 100px', height: '562px' }}>
      <h1 className="Heading1">Holiday Calendar</h1>
      <Container>

        <Table striped bordered hover className="custom-table">
          <thead>
            <tr>
              <th>Holiday_ID</th>
              <th>Holiday_Name</th>
              <th>Date</th>
              <th>Month</th>
              <th>Day</th>
            </tr>
          </thead>
          <tbody>
            {
              holiday.map((holiday, index) => (
                <tr key={index}>
                  <td>{holiday.hid}</td>
                  <td>{holiday.holidayName}</td>
                  <td>{holiday.date}</td>
                  <td>{holiday.month}</td>
                  <td>{holiday.day}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        <Button variant="outline-primary" onClick={handlePdf}>Download PDF</Button>
      </Container>
    </div>
   </div>
  );
}

export default EditHolidayCalender;

