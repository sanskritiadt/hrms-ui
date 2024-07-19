import axios from "axios";
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import LoadingPage from './LoadingPage';

export default function SaveGstinvoice() {
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [isOB, setIsOB] = useState(false); // State to track the toggle value
  const [data, setData] = useState({
    invoiceNumber: "",
    fy: "",
    invoiceDate: "",
    gstPeriod: "",
    billingPeriod: "",
    customerId: "",
    paidTo: "",
    taxableAmount: "",
    // tds: "",
    gst: "",
    invoiceAmount: "",
    receivable: "",
    amountReceived: "",
    dateReceived: "",
    invoiceBalance: "",
    status: "",
    // tdsCredited: "",
    // tdsBalance: "",
    tdsDetails: {
      tds: "",
      tdsBalance: "",
      tdsCredited: ""
    }
  });

  function submit(e) {
    e.preventDefault();
    setLoading(true); 
    axios
      .post(
        `/apigateway/expensemanagement/gst/saveGSTDetails`,
        {
          // invoiceNumber: data.invoiceNumber,
          fy: data.fy,
          invoiceDate: data.invoiceDate,
          gstPeriod: data.gstPeriod,
          billingPeriod: data.billingPeriod,
          customerId: data.customerId,
          paidTo: data.paidTo,
          taxableAmount: parseInt(data.taxableAmount),
          // tds: parseInt(data.tds),
          gst: parseInt(data.gst),
          invoiceAmount: parseInt(data.invoiceAmount),
          receivable: parseInt(data.receivable),
          amountReceived: parseInt(data.amountReceived),
          dateReceived: data.dateReceived,
          invoiceBalance: parseInt(data.invoiceBalance),
          status: data.status,
          projectType: data.projectType,
          // tdsCredited: parseInt(data.tdsCredited),
          // tdsBalance: parseInt(data.tdsBalance),
          tdsDetails: {
            tds: parseFloat(data.tds), // Convert to float if necessary
            tdsCredited: parseInt(data.tdsCredited),
            tdsBalance: parseInt(data.tdsBalance)
          }
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
        toast.error(error.response.data.message || "Error saving details");
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
        {loading ? <LoadingPage /> : ''}
        <h1 className="Heading1 my-4">GST INVOICE</h1>
        <div className="container pt-3">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div
                className="card border-0 shadow"
                style={{
                  marginLeft: "100px",
                  width: "700px",
                  height: "1580px",
                }}
              >
                <div className="card-body">
                  <form
                    className="container py-3 mb-3"
                    onSubmit={(e) => {
                      submit(e);
                    }}
                  >
                    {/* Toggle for IB and OB */}
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">Type</label>
                      <div className="col-sm-10">
                        <div className="form-check form-check-inline">
                          <input
                            onChange={() => setIsOB(false)}
                            className="form-check-input"
                            type="radio"
                            name="typeOptions"
                            id="typeIB"
                            checked={!isOB}
                          />
                          <label className="form-check-label" htmlFor="typeIB">
                            InBound
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            onChange={() => setIsOB(true)}
                            className="form-check-input"
                            type="radio"
                            name="typeOptions"
                            id="typeOB"
                            checked={isOB}
                          />
                          <label className="form-check-label" htmlFor="typeOB">
                            OutBound
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Other input fields */}
                    {/* <div className="row mb-3">
                      <label htmlFor="invoiceNumber" className="col-sm-2 col-form-label">Invoice No.</label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => handle(e)}
                          value={data.invoiceNumber}
                          type="text"
                          id="invoiceNumber"
                          placeholder="Enter Inovice No"
                          className="form-control"
                        />
                      </div>
                    </div> */}
                    <div className="row mb-3">
                      <label htmlFor="fy" className="col-sm-2 col-form-label">Financial Year</label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => handle(e)}
                          value={data.fy}
                          type="date"
                          id="fy"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="invoiceDate" className="col-sm-2 col-form-label">Invoice Date</label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => handle(e)}
                          value={data.invoiceDate}
                          type="date"
                          id="invoiceDate"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="gstPeriod" className="col-sm-2 col-form-label">GST Period</label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => handle(e)}
                          value={data.gstPeriod}
                          type="text"
                          id="gstPeriod"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="billingPeriod" className="col-sm-2 col-form-label">Billing Period</label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => handle(e)}
                          value={data.billingPeriod}
                          type="text"
                          className="form-control"
                          id="billingPeriod"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="customerId" className="col-sm-2 col-form-label">Cust ID</label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => handle(e)}
                          value={data.customerId}
                          type="text"
                          className="form-control"
                          placeholder="Enter Customer ID"
                          id="customerId"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="paidTo" className="col-sm-2 col-form-label">Paid To</label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => handle(e)}
                          value={data.paidTo}
                          type="text"
                          className="form-control"
                          placeholder="Enter client name"
                          id="paidTo"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="taxableAmount" className="col-sm-2 col-form-label">Taxable Amount</label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => handle(e)}
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
                      <label htmlFor="tds" className="col-sm-2 col-form-label">TDS</label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => handle(e)}
                          value={data.tds}
                          type="number"
                          step="0.1"
                          className="form-control"
                          placeholder="Enter TDS"
                          id="tds"
                          disabled={!isOB} // Disable TDS field if not OB
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="gst" className="col-sm-2 col-form-label">GST @ 18%</label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => handle(e)}
                          value={data.gst}
                          type="number"
                          step="0.1"
                          className="form-control"
                          placeholder="Enter GST"
                          id="gst"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="invoiceAmount" className="col-sm-2 col-form-label">Invoice Amount</label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => handle(e)}
                          value={data.invoiceAmount}
                          type="number"
                          step="0.1"
                          className="form-control"
                          placeholder="Enter Invoice Amount"
                          id="invoiceAmount"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="receivable" className="col-sm-2 col-form-label">Receivable</label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => handle(e)}
                          value={data.receivable}
                          type="number"
                          step="0.1"
                          className="form-control"
                          placeholder="Enter Receivable"
                          id="receivable"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="amountReceived" className="col-sm-2 col-form-label">Amount Received</label>
                      <div className="col-sm-10">
                        <input
                        disabled
                          onChange={(e) => handle(e)}
                          value={data.amountReceived}
                          type="number"
                          step="0.1"
                          className="form-control"
                          placeholder="Enter Amount Received"
                          id="amountReceived"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="dateReceived" className="col-sm-2 col-form-label">Date Received</label>
                      <div className="col-sm-10">
                        <input
                        disabled
                          onChange={(e) => handle(e)}
                          value={data.dateReceived}
                          type="date"
                          className="form-control"
                          id="dateReceived"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="invoiceBalance" className="col-sm-2 col-form-label">Invoice Balance</label>
                      <div className="col-sm-10">
                        <input
                        disabled
                          onChange={(e) => handle(e)}
                          value={data.invoiceBalance}
                          type="number"
                          step="0.1"
                          className="form-control"
                          placeholder="Enter Invoice Balance"
                          id="invoiceBalance"
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
                    <div className="row mb-3">
                      <label htmlFor="tdsCredited" className="col-sm-2 col-form-label">TDS Credited</label>
                      <div className="col-sm-10">
                        <input
                        disabled
                          onChange={(e) => handle(e)}
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
                      <label htmlFor="tdsBalance" className="col-sm-2 col-form-label">TDS Balance</label>
                      <div className="col-sm-10">
                        <input
                        disabled
                          onChange={(e) => handle(e)}
                          value={data.tdsBalance}
                          type="number"
                          step="0.1"
                          className="form-control"
                          placeholder="Enter TDS Balance"
                          id="tdsBalance"
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg w-50"
                      >
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
    </div>
  );
}
