import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
const EditExpenses = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("response-token")
    const [data, setData] = useState({
        amount: "",
        description: "",
        paymentMode: "",
        paymentDate: "",
        createdBy: "",
        category: "",
        gst: "",
        paidBy: "",
        comments: ""
    });

    useEffect(() => {
        axios.get(`/expenseManagement/getExpenseById/${id}`).then(res => {
            setData(res.data)
            console.log(res.data.gst)
        }).catch(error => console.log(error))
    }, [])

    // {
    //     "amount": 200,
    //     "description": "Desktop Repair",
    //     "paymentMode": "PhonePay",
    //     "paymentDate": "2023-02-09",
    //     "createdBy": "Vialp",
    //     "category": "Office",
    //     "gst": true,
    //     "paidBy": "SR",
    //     "comments": "decortion"
    // }

    function handleSubmit(e) {
        e.preventDefault();
        axios.put(`/expenseManagement/updateExpense/${id}`, {
            amount: parseInt(data.amount),
            description: data.description,
            paymentMode: data.paymentMode,
            paymentDate: data.paymentDate,
            createdBy: data.createdBy,
            category: data.category,
            gst: data.gst,
            paidBy: data.paidBy,
            comments: data.comments
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            console.log(response.data)
            alert("data has been updated successfully!!")
            navigate('/Getallexpenses');
        }).catch(error => {
            console.log(error)
            alert("error happened try after sometime.")
        })
    }
 
    return (
        <div className='container pt-3'>
            <div className='row'>
                <div className='col-lg-8 col-md-10 mx-auto'>
                    <div className='card border-0 shadow'>
                        <div className='card-body'>
                            <form className='container py-3  mb-3' onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='description'>ID:</label>
                                    <div className="col-sm-10">
                                        <input disabled value={data.id}
                                            type="text" className="form-control"
                                            id="description" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='amount'>Amount</label>
                                    <div className="col-sm-10">
                                        <input value={data.amount}
                                            onChange={e => setData({ ...data, amount: e.target.value })}
                                            type="number"
                                            id="amount"
                                            step='0.1' placeholder='enter amount'
                                            className="form-control" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='description'>Description</label>
                                    <div className="col-sm-10">
                                        <input value={data.description}
                                            onChange={e => setData({ ...data, description: e.target.value })}
                                            type="text" className="form-control"
                                            id="description" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='paymentDate'>Payment Date</label>
                                    <div className="col-sm-10">
                                        <input value={data.paymentDate}
                                            onChange={e => setData({ ...data, paymentDate: e.target.value })}
                                            type="date" className="form-control"
                                            id="paymentDate" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="paymentMode">Payment Mode</label>
                                    <div className="col-sm-10">
                                        <input value={data.paymentMode}
                                            onChange={e => setData({ ...data, paymentMode: e.target.value })}
                                            type="text" className="form-control"
                                            placeholder='enter your Payment Mode.'
                                            id="paymentMode" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="createdBy">Created By</label>
                                    <div className="col-sm-10">
                                        <input value={data.createdBy}
                                            onChange={e => setData({ ...data, createdBy: e.target.value })}
                                            type="text" className="form-control"
                                            placeholder='created By'
                                            id="createdBy" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="category">Category</label>
                                    <div className="col-sm-10">
                                        <input value={data.category}
                                            onChange={e => setData({ ...data, category: e.target.value })}
                                            type="text" className="form-control"
                                            placeholder='enter the expense type.'
                                            id="category" />
                                    </div>
                                </div>
                                <fieldset className="row mb-3">
                                    <legend className="col-form-label col-sm-2 pt-0">GST</legend>
                                    <div className="col-sm-10">
                                        <div className="form-check form-check-inline">
                                            <input onChange={e => setData({ ...data, amount: e.target.value })} value={data.gst} className="form-check-input" type="radio" name="inlineRadioOptions" id="gst" />
                                            <label className="form-check-label" htmlFor="inlineRadio1">Yes</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input onChange={e => setData({ ...data, amount: e.target.value })} value={data.gst} className="form-check-input" type="radio" name="inlineRadioOptions" id="gst" />
                                            <label className="form-check-label" htmlFor="inlineRadio2">No</label>
                                        </div>
                                    </div>
                                </fieldset>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Paid By</label>
                                    <div className="col-sm-10">
                                        <input value={data.paidBy}
                                            onChange={e => setData({ ...data, paidBy: e.target.value })}
                                            type="text" className="form-control"
                                            placeholder='paid By'
                                            id="paidBy" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Comments</label>
                                    <div className="col-sm-10">
                                        <input value={data.comments}
                                            onChange={e => setData({ ...data, comments: e.target.value })}
                                            type="text" className="form-control"
                                            placeholder='enter your comments'
                                            id="comments" />
                                    </div>
                                </div>
                                <div className="d-grid gap-2 col-6 mx-auto">
                                    <button className="btn btn-outline-success" type="submit">Update Expenses</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditExpenses