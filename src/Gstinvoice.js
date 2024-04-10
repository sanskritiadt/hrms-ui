import React, { useState } from 'react'

export default function Gstinvoice() {

    const [data, setData] = useState();
  return (
    <div>   <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
    {/* <ol className="breadcrumb" style={{  color: "white" }}>
    
        <li className="breadcrumb-item"><Link to="/">Home</Link> </li>
        <li className="breadcrumb-item"><a href="">Employee Management</a></li>
        <li className="breadcrumb-item active" aria-current="page">Employee Position</li>
    </ol> */}
</nav>
    <div className='container pt-3'>     
    <div className='row'>
        <div className='col-md-8 mx-auto'>
            <div className='card border-0 shadow' style={{  marginLeft:'100px',width:'700px',height:'1400PX'}}>
          
                <div className='card-body'>
                    <form className='container py-3  mb-3' onSubmit={(e) => { submit(e) }}>
                        <div className="row mb-3">
                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='assetUser'>Inovice No.</label>
                            <div className="col-sm-10">
                                <input 
                                    type="text"
                                    id="assetUser"
                                   placeholder='Enter Inovice No'
                                    className="form-control" />
                            </div>
                        </div>  
                        <div className="row mb-3">
                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='assetName'>Financial Year</label>
                            <div className="col-sm-10">
                                <input 
                                    type="date"
                                    id="assetName"
                                    className="form-control" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='assetId'>Invoice Date</label>
                            <div className="col-sm-10">
                                <input 
                                    type="date"
                                    id="InvoiceDate"
                                    className="form-control" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='assetNo'>GST Period</label>
                            <div className="col-sm-10">
                                <input 
                                    type="date"
                                    id="GSTPeriod"
                                    className="form-control" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='assetType'>Billing Period</label>
                            <div className="col-sm-10">
                                <input 
                                    type="date" className="form-control"
                                    id="assetType" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='processor'>Cust ID</label>
                            <div className="col-sm-10">
                                <input
                                    type="number" className="form-control"
                                    placeholder='Enter Customer ID'
                                    id="processor" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='ram'>To</label>
                            <div className="col-sm-10">
                                <input 
                                    type="text" className="form-control"
                                    placeholder='Enter client name'
                                    id="ram" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='diskType'>Taxable Amount</label>
                            <div className="col-sm-10">
                                <input 
                                    type="number" className="form-control"
                                    placeholder='Enter Taxable Amount'
                                    id="diskType" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='operatingSystem'>TDS</label>
                            <div className="col-sm-10">
                                <input 
                                    type="number" className="form-control"
                                    placeholder='Enter TDS'
                                    id="operatingSystem" />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='purchesDate'>GST @ 18%</label>
                            <div className="col-sm-10">
                                <input 
                                    type="number" className="form-control"
                                    placeholder='Enter GST @ 18%'
                                    id="purchesDate" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='warrenty'>Invoice Amt INR</label>
                            <div className="col-sm-10">
                                <input 
                                    type="text" className="form-control"
                                    placeholder='Enter Invoice Amt INR.'
                                    id="warrenty" />
                            </div>
                        </div> 
                        <div className="row mb-3">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='warrentyDate'>Receivable</label>
                            <div className="col-sm-10">
                                <input 
                                    type="number" className="form-control"
                                    placeholder='Enter Receivable'
                                    id="warrentyDate" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='warrentyDate'>Amount Received</label>
                            <div className="col-sm-10">
                                <input 
                                    type="number" className="form-control"
                                    placeholder='Enter Invoice Amount Received'
                                    id="warrentyDate" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='warrentyDate'>Date Received</label>
                            <div className="col-sm-10">
                                <input 
                                    type="date" className="form-control"
                                    id="warrentyDate" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='warrentyDate'>Invoice Balance</label>
                            <div className="col-sm-10">
                                <input 
                                    type="number" className="form-control"
                                    placeholder='Enter Invoice Balance'
                                    id="warrentyDate" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='warrentyDate'>TDS Credited</label>
                            <div className="col-sm-10">
                                <input 
                                    type="number" className="form-control"
                                    placeholder='Enter TDS Credited'
                                    id="warrentyDate" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='warrentyDate'>TDS Balance</label>
                            <div className="col-sm-10">
                                <input 
                                    type="number" className="form-control"
                                    placeholder='Enter TDS Balance'
                                    id="warrentyDate" />
                            </div>
                        </div>
                        {/* <fieldset className="row mb-3">
                            <legend className="col-form-label col-sm-2 pt-0">Status</legend>
                            <div className="col-sm-10">
                                <div className="form-check form-check-inline">
                                    <input onChange={(e) => { handle(e) }}  value="true" className="form-check-input" type="radio" name="inlineRadioOptions" id="status" />
                                    <label className="form-check-label" htmlFor="inlineRadio1">Active</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input onChange={(e) => { handle(e) }}  value="false" className="form-check-input" type="radio" name="inlineRadioOptions" id="status" />
                                    <label className="form-check-label" htmlFor="inlineRadio2">InActive</label>
                                </div>
                            </div>
                        </fieldset> */}
                        <div className="d-grid gap-2 col-6 mx-auto">
                            <button className="btn btn-outline-danger" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
  )
}
