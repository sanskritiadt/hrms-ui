import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import './Hrmscss/App.css'
import LoadingPage from "./LoadingPage";
const Getallexpenses = () => {
  const token = localStorage.getItem("response-token")
  const [expenseItems, setExpenseItems] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);

  let Navigate = useNavigate();

  useEffect(() => {
    axios.get("/apigateway/expensemanagement/getAllExpenses", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      console.log(response.data)
      setExpenseItems(response.data);
      setLoading(false); 
      toast.success("data found successfully!!", { position: "top-center", theme: 'colored' })
    }).catch(error => {
      console.log(error);
      setLoading(false); 
      toast.error("error happened try after sometime.", { position: "top-center", theme: 'colored' })
    })
  }, []);


  const routeCreateExpense = () => {
    Navigate('/CreateExpense')
  }

  const getExpenseByDate = (e) => {
    setLoading(true); 
    e.preventDefault();
    axios.get(`/apigateway/expensemanagement/getExpenseByDateRange?startDate=${startDate}&endDate=${endDate}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      setLoading(false); 
      console.log(response.data);
      expenseItems.length = 0;
      setExpenseItems(response.data);
     // toast.success("data found successfully!!", { position: "top-center", theme: 'colored' })
      Navigate('/Getallexpenses')
    }).catch((error) => {
      setLoading(false); 
      console.log(error);
      toast.error("error happened try after sometime.", { position: "top-center", theme: 'colored' })
    })
  }

  if (!expenseItems) return null;

  return (
    <div>
      {loading ? <LoadingPage/> : ''}
      <div className=" mt-3">
      <nav    aria-label="breadcrumb"   style={{ "--bs-breadcrumb-divider": "'>>'" }} >
        <ol className="breadcrumb" style={{ color: "white" ,marginLeft:'20px'}}>
        
            <li className="breadcrumb-item"><Link to="/">Home</Link> </li>
            <li className="breadcrumb-item"><a href="">Expense</a></li>
            <li className="breadcrumb-item active" aria-current="page">Get ALL Expense Details</li>
        </ol>
    </nav>
    </div>
    <div style={{ margin:'25px 100px  ',  width:'820px',height:'750px'}}>
      <div className="row">
      <h1  className='Heading1' >Get All Expense </h1>
        <div className=" col-lg-12 container pt-2">
          <form onSubmit={getExpenseByDate} >
            <div className="mb-2 d-grid gap-1 d-md-flex justify-content-center ">
              <label className="pt-3" htmlFor="startDate">startDate:</label>

              <input onChange={(e) => setStartDate(e.target.value)} value={startDate}

                type="date" className="form-control" name="start-date"
                id="startDate" />

              <label className="pt-3" htmlFor="endDate">endDate:</label>

              <input onChange={(e) => setEndDate(e.target.value)} value={endDate}

                type="date" name="end-date" className="form-control"
                id="endDate" />
             <Button type='submit' variant="outline-primary" style={{ margin:'3px',height:'37px',}}>Search</Button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <table border='2' className="table table-striped table-bordered">
          <thead className="table-danger table-striped">
            <tr styles={{ width: '50%' }}>
              <th styles={{ width: '50%' }}>ID</th>
              <th styles={{ width: '50%' }}>Payment_Date</th>
              <th styles={{ width: '50%' }}>Payment_Mode</th>
              <th styles={{ width: '50%' }}>Paid_By</th>
              <th styles={{ width: '50%' }}>Created_By</th>
              <th styles={{ width: '50%' }}>Amount</th>
              <th styles={{ width: '50%' }}>Description</th>
              <th styles={{ width: '50%' }}>Category</th>
              <th styles={{ width: '50%' }}>GST</th>
              <th styles={{ width: '50%' }}>Comments</th>
              <th><Button  variant="outline-primary" style={{height:'53px',}} type='submit' onClick={routeCreateExpense}>
                Create exp
              </Button></th>
            </tr>
          </thead>
          <tbody className="body">
            {/* map over the employees array */}
            {expenseItems.map((expenseItem) => (
              // display a <div> element with the employees.emailId and employees.designation
              // parent element needs to have a unique key
              <tr key={expenseItem.id}>
                <td><Link to={`/editexpenses/${expenseItem.id}`} className="expense-id">{expenseItem.id}</Link></td>
                <td>{expenseItem.paymentDate}</td>
                <td>{expenseItem.paymentMode}</td>
                <td>{expenseItem.paidBy}</td>
                <td>{expenseItem.createdBy}</td>
                <td>{expenseItem.amount}</td>
                <td>{expenseItem.description}</td>
                <td>{expenseItem.category}</td>
                <td>{String(expenseItem.gst)}</td>
                <td>{expenseItem.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
    </div>
  )
}
export default Getallexpenses;