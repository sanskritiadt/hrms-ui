import React, { useEffect, useState } from 'react';
import { Container, Table, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


function EditHolidayCalender() {
  const token = localStorage.getItem("response-token");
  const [holiday, setHoliday] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [searchedHoliday, setSearchedHoliday] = useState(null);


  useEffect(() => {
    fetchHolidayData();
  }, []);

  const fetchHolidayData = () => {
    axios.get("/apigateway/hrms/holiday/getHolidayCalendar", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      console.log(response.data);
      console.log(token)
      setHoliday(response.data);
     // toast.success("Data found successfully!", { position: "top-center", theme: 'colored' });
    }).catch(error => {
      console.log(error);
      toast.error("Error occurred, please try again later.", { position: "top-center", theme: 'colored' });
    });
  };

  // const handlePdf = () => {
  //   axios.get(`/hrms/holiday/downloadHolidayCalendar`, {
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   }).then((response) => {
  //     console.log(response.data)
  //     var pdf = response.data;
  //     var url = `data:application/pdf;base64${pdf}`;
  //     // Open the PDF in a new tab
  //     var newTab = window.open(url, "_blank");
  //     toast.success('Holiday calender generated successfully.', {
  //       position: 'top-center',
  //       theme: 'colored',
  //     })
  //   }).catch((error) => {
  //     console.log(error)
  //     toast.error('Error occured try after sometime.', {
  //       position: 'top-center',
  //       theme: 'colored',
  //     })
  //   })
  // }
  const handlePdf = () => {
    axios.get(`/apigateway/hrms/holiday/downloadHolidayCalendar`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      responseType: 'arraybuffer'  // Set the response type to 'arraybuffer'
    }).then((response) => {
      const pdfData = new Uint8Array(response.data);
      const blob = new Blob([pdfData], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      // Open the PDF in a new tab
      var newTab = window.open(url, "_blank");
      
      toast.success('Holiday calendar generated successfully.', {
        position: 'top-center',
        theme: 'colored',
      });
    }).catch((error) => {
      console.log(error);
      toast.error('Error occurred, please try again later.', {
        position: 'top-center',
        theme: 'colored',
      });
    });
  };
  return (
    <div><nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
    <ol className="breadcrumb" style={{  color: "white" }}>
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
