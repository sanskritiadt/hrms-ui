import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import './Hrmscss/App.css'

const GetGstDetails = () => {
  const token = localStorage.getItem("response-token");
  const [Gst, setGst] = useState([]);

  useEffect(() => {
    axios
      .get(`/apigateway/expensemanagement/gst/displayAllGSTDetails`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setGst(response.data.content);
        //toast.success('Assets data found successfully!!',{position:'top-center',theme:'colored'})
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error occured try after sometime.', { position: 'top-center', theme: 'colored' })
      })
  }, [])
  if (!Gst) return null;

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

  return (
    <div className="table-responsive-sm">
      <div className=" mt-3">
        <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
          <ol className="breadcrumb" style={{ color: "white" ,marginLeft:'20px'}}>
            <li className="breadcrumb-item"><Link to="/">Home</Link> </li>
            <li className="breadcrumb-item"><a href="">Employee Management</a></li>
            <li className="breadcrumb-item active" aria-current="page">GST Details</li>
          </ol>
        </nav>
      </div>
      <div style={{width:screenWidth-50, display:'flex', justifyContent:'center'}}>
        <div>
        <h1 className='Heading1 my-4' > GST Details</h1>
        <div style={{width:"160vh", overflowX:'auto'}}>
          <table border='2' className="table table-striped table-bordered">
            <thead className="head">
              <tr className="table-danger table-striped">
                <th>ID</th>
                <th>INVOICE NUMBER</th>
                <th>FINANCIAL YEAR</th>
                <th>INVOICE DATE</th>
                <th>GST PERIOD</th>
                <th>BILIING PERIOD</th>
                <th>CUSTOMER ID</th>
                <th>PAID TO</th>
                <th>TAXABLE AMOUNT</th>
                <th>TDS</th>
                <th>GST</th>
                <th>INVOICE AMOUNT</th>
                <th>RECEIVEABLE</th>
                <th>AMOUNT RECEIVED</th>
                <th>DATE RECEIVED</th>
                <th>INVOICE BALANCE</th>
                <th>STATUS</th>
                <th>TDS CREDITED</th>
                <th>TDS BALANCE</th>
              </tr>
            </thead>
            <tbody className="body">
             
              {Gst.map((gst) => (
                // display a <div> element with the employees.emailId and employees.designation
                // parent element needs to have a unique key
                <tr key={gst.id}>
                  {/* <td><Link to={`/EditAssets/${gst.id}`} className="Candidate-id">{assets.id}</Link></td> */}
                  <td>{gst.id}</td>
                  <td>{gst.invoiceNumber}</td>
                  <td>{gst.fy}</td>
                  <td>{gst.invoiceDate}</td>
                  <td>{gst.gstPeriod}</td>
                  <td>{gst.billingPeriod}</td>
                  <td>{gst.customerId}</td>
                  <td>{gst.paidTo}</td>
                  <td>{gst.taxableAmount}</td>
                  <td>{gst.tds}</td>
                  <td>{gst.gst}</td>
                  <td>{gst.invoiceAmount}</td>
                  <td>{gst.receivable}</td>
                  <td>{gst.amountReceived}</td>
                  <td>{gst.dateReceived}</td>
                  <td>{gst.invoiceBalance}</td>
                  <td>{gst.status}</td>
                  <td>{gst.tdsCredited}</td>
                  <td>{gst.tdsBalance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  )
};

export default GetGstDetails;
