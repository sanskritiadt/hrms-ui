import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingPage from './LoadingPage';
import { useSelector } from 'react-redux';
const EditGstDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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
  
  useEffect(() => {
    setLoading(true);
    axios.get(`/apigateway/expensemanagement/gst/displayGSTDetailsByInvoiceNumber/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((response) => {
        setData(response.data);
        console.log(response.data);
        setLoading(false); 
    }).catch((error) => {
        console.log(error)
        toast.error( error.response.data.message || "Error fetching details" );
        setLoading(false); 
    })
}, [token, id])


  function submit(e) {
    e.preventDefault();
    setLoading(true);
    axios
      .put(
        `/apigateway/expensemanagement/gst/updateGSTDetailsByInvoiceNumber/${id}`,
        {
          invoiceNumber: data.invoiceNumber,
          fy: data.fy,
          invoiceDate: data.invoiceDate,
          gstPeriod:data.gstPeriod ,
          billingPeriod:data.billingPeriod ,
          customerId: data.customerId,
          paidTo:data.paidTo ,
          taxableAmount:parseInt(data.taxableAmount) ,
          tds:parseInt(data.tds),
          gst:parseInt(data.gst) ,
          invoiceAmount:parseInt(data.invoiceAmount) ,
          receivable:parseInt(data.receivable),
          amountReceived:parseInt(data.amountReceived) ,
          dateReceived: data.dateReceived,
          invoiceBalance:parseInt(data.invoiceBalance) ,
          status:data.status ,
          tdsCredited:parseInt(data.tdsCredited) ,
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
        toast.success("GST data updated successfully!!", {
          position: "top-center",
          theme: "colored",
        });
        setLoading(false); 
      })
      .catch((error) => {
        console.log(error);
        toast.error( error.response.data.message || "Error updating details" );
        setLoading(false); 
      });
  }

  function HandleDelete() {
    setLoading(true);
    axios.delete(`/apigateway/expensemanagement/gst/deleteGSTInvoiceByInvoiceNumber/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then((response) => {
            console.log(response)
            toast.success("Gst Data Deleted successfully.", { position: 'top-center', theme: "colored" });
            navigate('/GetGstDetails');
            setLoading(false); 
        }).catch((error) => {
            toast.error( error.response.data.message || "Error deleting details" );
            console.log(error);
            setLoading(false); 
        })
}

    return (
      <div>
        <div className="container pt-3">
          {loading ? <LoadingPage /> : ""}
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div
                className="card border-0 shadow"
                style={{ width: "700px", height: "1000px" }}
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
                        name="dataId"
                      >
                        Id
                      </label>
                      <div className="col-sm-10">
                        <input
                          disabled
                          value={data.id || ""}
                          type="text"
                          id="id"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputEmail3"
                        className="col-sm-2 col-form-label"
                        name="dataUser"
                      >
                        Invoice Number
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            setData({ ...data, invoiceNumber: e.target.value });
                          }}
                          value={data.invoiceNumber || ""}
                          type="text"
                          disabled
                          id="invoiceNumber"
                          placeholder="Enter data user name"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputEmail3"
                        className="col-sm-2 col-form-label"
                        name="dataName"
                      >
                        Financial Year
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            setData({ ...data, fy: e.target.value });
                          }}
                          value={data.fy || ""}
                          type="text"
                          disabled
                          id="fy"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputEmail3"
                        className="col-sm-2 col-form-label"
                        name="dataNo"
                      >
                        Invoice Date
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            setData({ ...data, invoiceDate: e.target.value });
                          }}
                          value={data.invoiceDate || ""}
                          type="text"
                          disabled
                          id="invoiceDate"
                          placeholder="Enter data number"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 col-form-label"
                        name="dataType"
                      >
                        GST Period
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            setData({ ...data, gstPeriod: e.target.value });
                          }}
                          value={data.gstPeriod || ""}
                          disabled
                          type="date"
                          className="form-control"
                          id="gstPeriod"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 col-form-label"
                        name="processor"
                      >
                        Billing Period
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            setData({ ...data, billingPeriod: e.target.value });
                          }}
                          value={data.billingPeriod || ""}
                          disabled
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
                        name="ram"
                      >
                        Customer Id
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            setData({ ...data, customerId: e.target.value });
                          }}
                          value={data.customerId || ""}
                          disabled
                          type="text"
                          className="form-control"
                          id="customerId"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 col-form-label"
                        name="diskType"
                      >
                        Paid To
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            setData({ ...data, paidTo: e.target.value });
                          }}
                          value={data.paidTo || ""}
                          disabled
                          type="text"
                          className="form-control"
                          id="paidTo"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 col-form-label"
                        name="operatingSystem"
                      >
                        Taxable Amount
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            setData({ ...data, taxableAmount: e.target.value });
                          }}
                          value={data.taxableAmount || ""}
                          disabled
                          type="text"
                          className="form-control"
                          id="taxableAmount"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 col-form-label"
                        name="purchesDate"
                      >
                        TDS
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            setData({ ...data, tds: e.target.value });
                          }}
                          value={data.tds || ""}
                          disabled
                          type="text"
                          className="form-control"
                          id="tds"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 col-form-label"
                        name="warrenty"
                      >
                        GST
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            setData({ ...data, gst: e.target.value });
                          }}
                          value={data.gst || ""}
                          disabled
                          type="text"
                          className="form-control"
                          id="gst"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 col-form-label"
                        name="warrentyDate"
                      >
                        Invoice Amount
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            setData({ ...data, invoiceAmount: e.target.value });
                          }}
                          value={data.invoiceAmount || ""}
                          disabled
                          type="number"
                          className="form-control"
                          id="invoiceAmount"
                        />
                      </div>
                    </div>
                    {/* <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='warrentyDate'>Receivable</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => {setData({...data,receivable:e.target.value})}}value={data.receivable || ''}
                                            type="number" className="form-control"
                                            id="receivable" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='warrentyDate'>Amount Received</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => {setData({...data,amountReceived:e.target.value})}}value={data.amountReceived || ''}
                                            type="number" className="form-control"
                                            id="amountReceived" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='warrentyDate'>Receivable</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => {setData({...data,receivable:e.target.value})}}value={data.receivable || ''}
                                            type="number" className="form-control"
                                            id="receivable" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='warrentyDate'>Date Received</label>
                                    <div className="col-sm-10"> 
                                        <input onChange={(e) => {setData({...data,dateReceived:e.target.value})}}value={data.dateReceived || ''}
                                            type="text" className="form-control"
                                            id="dateReceived" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='warrentyDate'>Status</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => {setData({...data,status:e.target.value})}}value={data.status || ''}
                                            type="text" className="form-control"
                                            id="status" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='warrentyDate'>TDS Credited</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => {setData({...data,tdsCredited:e.target.value})}}value={data.tdsCredited || ''}
                                            type="number" className="form-control"
                                            id="tdsCredited" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='warrentyDate'>TDS Balance</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => {setData({...data,tdsBalance:e.target.value})}}value={data.tdsBalance || ''}
                                            type="number" className="form-control"
                                            id="tdsBalance" />
                                    </div>
                                </div> */}
                    {/* <div className="d-grid gap-2 col-6 mx-auto">
                                    <button className="btn btn-outline-primary" type="submit">Update</button>
                                </div> */}
                  </form>
                  {/* <div className="d-grid gap-2 col-6 mx-auto">
                                <button className="btn btn-outline-danger" onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you wish to delete this data?"
                        )
                      ) {
                        HandleDelete(document.id);
                      }
                    }}type="submit">Delete</button>
                            </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container pt-3">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div
                className="card border-0 shadow"
                style={{ width: "700px", height: "560px" }}
              >
                <div className="card-body">
                  <form
                    className="container py-3  mb-3"
                    onSubmit={(e) => {
                      submit(e);
                    }}
                  >
                    {/* <div className="row mb-3">
                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='dataId'>Id</label>
                                    <div className="col-sm-10">
                                        <input disabled value={data.id || ''}
                                            type="text"
                                            id="id"
                                            className="form-control" />
                                    </div>                                                                                                          
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='dataUser'>Invoice Number</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => { setData({ ...data, invoiceNumber: e.target.value }) }} value={data.invoiceNumber || ''}
                                            type="text"
                                            id="invoiceNumber"
                                            placeholder='Enter data user name'
                                            className="form-control" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='dataName'>Financial Year</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => {setData({...data,fy:e.target.value})}} value={data.fy || ''}
                                            type="text"
                                            id="fy"
                                            className="form-control" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='dataNo'>Invoice Date</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => { setData({...data,invoiceDate:e.target.value})}} value={data.invoiceDate || ''}
                                            type="text"
                                            id="invoiceDate"
                                            placeholder='Enter data number'
                                            className="form-control" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='dataType'>GST Period</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => {setData({...data,gstPeriod:e.target.value})}} value={data.gstPeriod || ''}
                                            type="text" className="form-control"
                                            id="gstPeriod" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='processor'>Billing Period</label>
                                    <div className="col-sm-10">
                                        <input  onChange={(e) => {setData({...data,billingPeriod:e.target.value})}} value={data.billingPeriod || ''}
                                            type="text" className="form-control"
                                            id="billingPeriod" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='ram'>Customer Id</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => {setData({...data,customerId:e.target.value})}} value={data.customerId || ''}
                                            type="text" className="form-control"
                                            id="customerId" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='diskType'>Paid To</label>
                                    <div className="col-sm-10">
                                        <input  onChange={(e) => {setData({...data,paidTo:e.target.value})}}value={data.paidTo || ''}
                                            type="text" className="form-control"
                                            id="paidTo" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='operatingSystem'>Taxable Amount</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => {setData({...data,taxableAmount:e.target.value})}} value={data.taxableAmount || ''}
                                            type="text" className="form-control"
                                            id="taxableAmount" />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='purchesDate'>TDS</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => {setData({...data,tds:e.target.value})}} value={data.tds || ''}
                                            type="text" className="form-control"
                                            id="tds" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='warrenty'>GST</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => {setData({...data,gst:e.target.value})}} value={data.gst || ''}
                                            type="text" className="form-control"
                                            id="gst" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='warrentyDate'>Invoice Amount</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => {setData({...data,invoiceAmount:e.target.value})}}value={data.invoiceAmount || ''}
                                            type="number" className="form-control"
                                            id="invoiceAmount" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='warrentyDate'>Receivable</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => {setData({...data,receivable:e.target.value})}}value={data.receivable || ''}
                                            type="number" className="form-control"
                                            id="receivable" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='warrentyDate'>Amount Received</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => {setData({...data,amountReceived:e.target.value})}}value={data.amountReceived || ''}
                                            type="number" className="form-control"
                                            id="amountReceived" />
                                    </div>
                                </div> */}
                    <div className="row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 col-form-label"
                        name="warrentyDate"
                      >
                        Receivable
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            setData({ ...data, receivable: e.target.value });
                          }}
                          value={data.receivable || ""}
                          type="number"
                          className="form-control"
                          id="receivable"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 col-form-label"
                        name="warrentyDate"
                      >
                        Date Received
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            setData({ ...data, dateReceived: e.target.value });
                          }}
                          value={data.dateReceived || ""}
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
                        name="warrentyDate"
                      >
                        Status
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            setData({ ...data, status: e.target.value });
                          }}
                          value={data.status || ""}
                          type="text"
                          className="form-control"
                          id="status"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 col-form-label"
                        name="warrentyDate"
                      >
                        TDS Credited
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            setData({ ...data, tdsCredited: e.target.value });
                          }}
                          value={data.tdsCredited || ""}
                          type="number"
                          className="form-control"
                          id="tdsCredited"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="inputPassword3"
                        className="col-sm-2 col-form-label"
                        name="warrentyDate"
                      >
                        TDS Balance
                      </label>
                      <div className="col-sm-10">
                        <input
                          onChange={(e) => {
                            setData({ ...data, tdsBalance: e.target.value });
                          }}
                          value={data.tdsBalance || ""}
                          type="number"
                          className="form-control"
                          id="tdsBalance"
                        />
                      </div>
                    </div>
                    <div className="d-grid gap-2 col-6 mx-auto">
                      <button className="btn btn-outline-primary" type="submit">
                        Update
                      </button>
                    </div>
                  </form>
                  <div className="d-grid gap-2 col-6 mx-auto">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you wish to delete this data?"
                          )
                        ) {
                          HandleDelete(document.id);
                        }
                      }}
                      type="submit"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default EditGstDetails
