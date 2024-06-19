import React, { useState } from "react";
import axios from "axios";
import handleAuthError from "./CommonErrorHandling";
import { toast } from "react-toastify";
import LoadingPage from './LoadingPage'
import { useSelector } from 'react-redux';
export default function SaveGstinvoice() {
  // const token = localStorage.getItem("response-token");
  const  token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    invoiceNumber: "",
    fy: "",
    invoiceDate: "",
    gstPeriod: "",
    billingPeriod: "",
    customerId: "",
    paidTo: "",
    taxableAmount: "",
    tds: "",
    gst: "",
    invoiceAmount: "",
    receivable: "",
    amountReceived: "",
    dateReceived: "",
    invoiceBalance: "",
    status: "",
    tdsCredited: "",
    tdsBalance: "",
  });

  function submit(e) {
    e.preventDefault();
    setLoading(true); 
    axios
      .post(
        `/apigateway/expensemanagement/gst/saveGSTDetails`,
        {
          invoiceNumber: data.invoiceNumber,
          fy: data.fy,
          invoiceDate: data.invoiceDate,
          gstPeriod: data.gstPeriod,
          billingPeriod: data.billingPeriod,
          customerId: data.customerId,
          paidTo: data.paidTo,
          taxableAmount: parseInt(data.taxableAmount),
          tds: parseInt(data.tds),
          gst: parseInt(data.gst),
          invoiceAmount: parseInt(data.invoiceAmount),
          receivable: parseInt(data.receivable),
          amountReceived: parseInt(data.amountReceived),
          dateReceived: data.dateReceived,
          invoiceBalance: parseInt(data.invoiceBalance),
          status: data.status,
          tdsCredited: parseInt(data.tdsCredited),
          tdsBalance: parseInt(data.tdsBalance),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        toast.success("GST data created successfully!!", {
          position: "top-center",
          theme: "colored",
        });
        setLoading(false);
      })
      .catch((error) => {
        toast.error( error.response.data.message || "Error saving details" );
        console.log(error);
        setLoading(false);
      });
  }
  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }

  return (
    <div>
      <div>  
        {loading ? <LoadingPage/> : ''}
        <nav
          aria-label="breadcrumb"
          style={{ "--bs-breadcrumb-divider": "'>>'" }}
        >
          {/* <ol className="breadcrumb" style={{  color: "white" }}>

  <li className="breadcrumb-item"><Link to="/">Home</Link> </li>
  <li className="breadcrumb-item"><a href="">Employee Management</a></li>
  <li className="breadcrumb-item active" aria-current="page">Employee Position</li>
</ol> */}
        </nav>
        <div className="container pt-3">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div
                className="card border-0 shadow"
                style={{
                  marginLeft: "100px",
                  width: "700px",
                  height: "1050px",
                }}
              >
                <div className="card-body">
                  <form
                    className="container py-3  mb-3"
                    onSubmit={(e) => {
                      submit(e);
                    }}
                  >
                    <div className="row mb-3">
                      <label
                        htmlFor="inputEmail3"
                        className="col-sm-2 col-form-label"
                        name="invoiceNumber"
                      >
                        Invoice No.
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            handle(e);
                          }}
                          value={data.invoiceNumber}
                          type="text"
                          id="invoiceNumber"
                          placeholder="Enter Inovice No"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputEmail3"
                        className="col-sm-2 col-form-label"
                        name="fy"
                      >
                        Financial Year
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            handle(e);
                          }}
                          value={data.fy}
                          type="date"
                          id="fy"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputEmail3"
                        className="col-sm-2 col-form-label"
                        name="invoiceDate"
                      >
                        Invoice Date
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            handle(e);
                          }}
                          value={data.invoiceDate}
                          type="date"
                          id="invoiceDate"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputEmail3"
                        className="col-sm-2 col-form-label"
                        name="gstPeriod"
                      >
                        GST Period
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            handle(e);
                          }}
                          value={data.gstPeriod}
                          type="text"
                          id="gstPeriod"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 col-form-label"
                        name="billingPeriod"
                      >
                        Billing Period
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            handle(e);
                          }}
                          value={data.billingPeriod}
                          type="text"
                          className="form-control"
                          id="billingPeriod"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 col-form-label"
                        name="customerId"
                      >
                        Cust ID
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            handle(e);
                          }}
                          value={data.customerId}
                          type="text"
                          className="form-control"
                          placeholder="Enter Customer ID"
                          id="customerId"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 col-form-label"
                        name="paidTo"
                      >
                        Paid To
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            handle(e);
                          }}
                          value={data.paidTo}
                          type="text"
                          className="form-control"
                          placeholder="Enter client name"
                          id="paidTo"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 col-form-label"
                        name="taxableAmount"
                      >
                        Taxable Amount
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            handle(e);
                          }}
                          value={data.taxableAmount}
                          type="number"
                          step="0.1"
                          className="form-control"
                          placeholder="Enter Taxable Amount"
                          id="taxableAmount"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 col-form-label"
                        name="tds"
                      >
                        TDS
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            handle(e);
                          }}
                          value={data.tds}
                          type="number"
                          step="0.1"
                          className="form-control"
                          placeholder="Enter TDS"
                          id="tds"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 col-form-label"
                        name="gst"
                      >
                        GST @ 18%
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            handle(e);
                          }}
                          value={data.gst}
                          type="number"
                          step="0.1"
                          className="form-control"
                          placeholder="Enter GST @ 18%"
                          id="gst"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 col-form-label"
                        name="invoiceAmount"
                      >
                        Invoice Amt INR
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            handle(e);
                          }}
                          value={data.invoiceAmount}
                          type="text"
                          className="form-control"
                          placeholder="Enter Invoice Amt INR."
                          id="invoiceAmount"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 col-form-label"
                        name="receivable"
                      >
                        Receivable
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            handle(e);
                          }}
                          value={data.receivable}
                          type="number"
                          step="0.1"
                          className="form-control"
                          placeholder="Enter Receivable"
                          id="receivable"
                        />
                      </div>
                    </div>
                    {/* <div className="row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 col-form-label"
                        name="amountReceived"
                      >
                        Amount Received
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            handle(e);
                          }}
                          value={data.amountReceived}
                          type="number"
                          step="0.1"
                          className="form-control"
                          placeholder="Enter Invoice Amount Received"
                          id="amountReceived"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 col-form-label"
                        name="dateReceived"
                      >
                        Date Received
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            handle(e);
                          }}
                          value={data.dateReceived}
                          type="date"
                          className="form-control"
                          id="dateReceived"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 col-form-label"
                        name="invoiceBalance"
                      >
                        Invoice Balance
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            handle(e);
                          }}
                          value={data.invoiceBalance}
                          type="number"
                          step="0.1"
                          className="form-control"
                          placeholder="Enter Invoice Balance"
                          id="invoiceBalance"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 col-form-label"
                        name="tdsCredited"
                      >
                        TDS Credited
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            handle(e);
                          }}
                          value={data.tdsCredited}
                          type="number"
                          step="0.1"
                          className="form-control"
                          placeholder="Enter TDS Credited"
                          id="tdsCredited"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 col-form-label"
                        name="tdsBalance"
                      >
                        TDS Balance
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            handle(e);
                          }}
                          value={data.tdsBalance}
                          type="number"
                          step="0.1"
                          className="form-control"
                          placeholder="Enter TDS Balance"
                          id="tdsBalance"
                        />
                      </div>
                    </div>
                    <fieldset className="row mb-3">
                      <legend className="col-form-label col-sm-2 pt-0">
                        Status
                      </legend>
                      <div className="col-sm-10">
                        <div className="form-check form-check-inline">
                          <input
                            onChange={(e) => {
                              handle(e);
                            }}
                            value="Pending"
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="status"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                          >
                            Pending
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            onChange={(e) => {
                              handle(e);
                            }}
                            value="Completed"
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="status"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio2"
                          >
                            Completed
                          </label>
                        </div>
                      </div>
                    </fieldset> */}
                    <div className="d-grid gap-2 col-6 mx-auto">
                      <button className="btn btn-outline-danger" type="submit">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
       
        <div className="container pt-3">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div
                className="card border-0 shadow"
                style={{
                  marginLeft: "100px",
                  width: "700px",
                  height: "550px",
                }}
              >
                <div className="card-body">
                  <form
                    className="container py-3  mb-3"
                    onSubmit={(e) => {
                      submit(e);
                    }}
                  >
                    <div className="row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 col-form-label"
                        name="amountReceived"
                      >
                        Amount Received
                      </label>
                      <div className="col-sm-10">
                        <input disabled
                          onChange={(e) => {
                            handle(e);
                          }}
                          value={data.amountReceived}
                          type="number"
                          step="0.1"
                          className="form-control"
                          id="amountReceived"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 col-form-label"
                        name="dateReceived"
                      >
                        Date Received
                      </label>
                      <div className="col-sm-10">
                        <input disabled
                          onChange={(e) => {
                            handle(e);
                          }}
                          value={data.dateReceived}
                          type="date"
                          className="form-control"
                          id="dateReceived"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 col-form-label"
                        name="invoiceBalance"
                      >
                        Invoice Balance
                      </label>
                      <div className="col-sm-10">
                        <input disabled
                          onChange={(e) => {
                            handle(e);
                          }}
                          value={data.invoiceBalance}
                          type="number"
                          step="0.1"
                          className="form-control"
                          id="invoiceBalance"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 col-form-label"
                        name="tdsCredited"
                      >
                        TDS Credited
                      </label>
                      <div className="col-sm-10">
                        <input disabled
                          onChange={(e) => {
                            handle(e);
                          }}
                          value={data.tdsCredited}
                          type="number"
                          step="0.1"
                          className="form-control"
                          id="tdsCredited"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 col-form-label"
                        name="tdsBalance"
                      >
                        TDS Balance
                      </label>
                      <div className="col-sm-10">
                        <input disabled
                          onChange={(e) => {
                            handle(e);
                          }}
                          value={data.tdsBalance}
                          type="number"
                          step="0.1"
                          className="form-control"
                          id="tdsBalance"
                        />
                      </div>
                    </div>
                    <fieldset className="row mb-3">
                      <legend className="col-form-label col-sm-2 pt-0">
                        Status
                      </legend>
                      <div className="col-sm-10">
                        <div className="form-check form-check-inline">
                          <input disabled
                            onChange={(e) => {
                              handle(e);
                            }}
                            value="Pending"
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="status"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                          >
                            Pending
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input disabled
                            onChange={(e) => {
                              handle(e);
                            }}
                            value="Completed"
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="status"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio2"
                          >
                            Completed
                          </label>
                        </div>
                      </div>
                    </fieldset>
                    {/* <div className="d-grid gap-2 col-6 mx-auto">
                      <button className="btn btn-outline-danger" type="submit">
                        Submit
                      </button>
                    </div> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
