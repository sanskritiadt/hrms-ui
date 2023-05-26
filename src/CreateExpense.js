import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import {toast } from 'react-toastify';
const CreateExpense = () => {
    const token = localStorage.getItem("response-token");
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

    function submit(e) {
        e.preventDefault();
        axios.post(`/expenseManagement/createExpenses`, {
            amount: parseInt(data.amount),
            description: data.description,
            paymentMode: data.paymentMode,
            paymentDate: data.paymentDate,
            createdBy: data.createdBy,
            category: data.category,
            gst: data.gst,
            paidBy: data.paidBy,
            comments: data.comments,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        ).then((response) => {
            console.log(response.data)
            toast.success("expense data created successfully!!", { position: 'top-center', theme: "colored" })
        }).catch((err) => {
            console.log(err)
            toast.error("error occured try after sometime.", { position: 'top-center', theme: "colored" })

        })
    }

    var str2bool = (value) => {
        if (value && typeof value === "string") {
            if (value.toLowerCase() === "true") return true;
            if (value.toLowerCase() === "false") return false;

        }
        return value;
    }
    function radiobut(e) {
        console.log(str2bool(e.target.value));
        // Here we can send the data to further processing (Action/Store/Rest)
        data.gst = str2bool(e.target.value);
    }
    function handle(e) {
        const newdata = { ...data };
        newdata[e.target.id] = e.target.value;
        setData(newdata);
        console.log(newdata);
    }
    // {
    //     "amount" : 9000,
    //     "description" : "Char",
    //     "paymentMode" : "PhonePay",
    //     "paymentDate" : "2023-02-15",
    //     "createdBy" : "Nisha",
    //     "category" : "Office",
    //     "gst" : true,
    //     "paidBy" : "NS",
    //     "comments" : "decortion"
    // }
    return (
        <div className='container pt-3'>
            <div className='row'>
                <div className='col-md-8 mx-auto'>
                    <div className='card border-0 shadow'>
                        <div className='card-body'>
                            <form className='container py-3  mb-3' onSubmit={(e) => { submit(e) }}>
                                <div className="row mb-3">
                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='amount'>Amount</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => { handle(e) }} value={data.amount}
                                            type="number"
                                            id="amount"
                                            step='0.1' placeholder='enter amount'
                                            className="form-control" />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='description'>Description</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => { handle(e) }} value={data.description}
                                            type="text" className="form-control"
                                            id="description" />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='paymentDate'>Payment Date</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => { handle(e) }} value={data.paymentDate}
                                            type="date" className="form-control"
                                            id="paymentDate" />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="paymentMode">Payment Mode</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => { handle(e) }} value={data.paymentMode}
                                            type="text" className="form-control"
                                            placeholder='enter your Payment Mode.'
                                            id="paymentMode" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="createdBy">Created By</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => { handle(e) }} value={data.createdBy}
                                            type="text" className="form-control"
                                            placeholder='created By'
                                            id="createdBy" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="category">Category</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => { handle(e) }} value={data.category}
                                            type="text" className="form-control"
                                            placeholder='enter the expense type.'
                                            id="category" />
                                    </div>
                                </div>
                                <fieldset className="row mb-3">
                                    <legend className="col-form-label col-sm-2 pt-0">GST</legend>
                                    <div className="col-sm-10">

                                        <div className="form-check form-check-inline">
                                            <input onChange={radiobut} value="true" className="form-check-input" type="radio" name="inlineRadioOptions" id="gst" />
                                            <label className="form-check-label" htmlFor="inlineRadio1">Yes</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input onChange={radiobut} value="false" className="form-check-input" type="radio" name="inlineRadioOptions" id="gst" />
                                            <label className="form-check-label" htmlFor="inlineRadio2">No</label>
                                        </div>
                                    </div>
                                </fieldset>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Paid By</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => { handle(e) }} value={data.paidBy}
                                            type="text" className="form-control"
                                            placeholder='paid By'
                                            id="paidBy" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Comments</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => { handle(e) }} value={data.comments}
                                            type="text" className="form-control"
                                            placeholder='enter your comments'
                                            id="comments" />
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
    )
}

export default CreateExpense