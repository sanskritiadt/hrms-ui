import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
const Editclient = () => {
    const token = localStorage.getItem("response-token")
    const [id, setId] = useState('');
    const [companyName, setcompanyName] = useState('')
    const [address, setaddress] = useState('')
    const [phone, setphone] = useState('')
    const [email, setemail] = useState('')
    const [contactPerson, setcontactPerson] = useState('')
    const [gstin, setgstin] = useState('')
    function handleSubmit(e) {
        e.preventDefault();
        window.location.reload();
        axios.put(`/expenseManagement/clientInfo/updateClientInfo/${id}`, {
            id,
            companyName,
            address,
            phone,
            email,
            contactPerson,
            gstin,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            console.log(response.data)
            alert("data has been updated successfully!!")
        }).catch(error => {
            console.log(error)
            alert("error happened try after sometime.")
        })
    }
    useEffect(() => {
        setId(localStorage.getItem('id', id));
        setcompanyName(localStorage.getItem('companyName', companyName));
        setaddress(localStorage.getItem('address', address));
        setphone(localStorage.getItem('phone', phone));
        setemail(localStorage.getItem('email', email));
        setcontactPerson(localStorage.getItem('contactPerson', contactPerson));
        setgstin(localStorage.getItem('gstin', gstin))
    }, []);
    return (
        <div className='container pt-3'>
            <div className='row'>
                <div className='col-lg-8 col-md-10 mx-auto'>
                    <div className='card border-0 shadow'>
                        <div className='card-body'>
                            <form className='container py-3  mb-3' onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='description'>ID</label>
                                    <div className="col-sm-10">
                                        <input disabled value={id}
                                            type="text" className="form-control"
                                            id="description" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='companyName'>Company Name</label>
                                    <div className="col-sm-10">
                                        <input value={companyName}
                                            // onChange={e => setData({ ...data, companyName: e.target.value })}
                                            onChange={(e) => setcompanyName(e.target.value)}
                                            type="text"
                                            id="companyName"
                                            placeholder='Enter company name.'
                                            className="form-control" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='address'>Address</label>
                                    <div className="col-sm-10">
                                        <input value={address}
                                            // onChange={e => setData({ ...data, address: e.target.value })}
                                            onChange={(e) => setaddress(e.target.value)}
                                            type="text"
                                            placeholder='Enter address name.' className="form-control"
                                            id="address" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='phone'>Phone</label>
                                    <div className="col-sm-10">
                                        <input value={phone}
                                            // onChange={e => setData({ ...data, phone: e.target.value })}
                                            onChange={(e) => setphone(e.target.value)}
                                            type="number" className="form-control"
                                            id="phone" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="email">Email</label>
                                    <div className="col-sm-10">
                                        <input value={email}
                                            // onChange={e => setData({ ...data, email: e.target.value })}
                                            onChange={(e) => setemail(e.target.value)}
                                            type="email" className="form-control"
                                            placeholder='Enter your email.'
                                            id="paymenemailtMode" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="contactPerson">Contact Person</label>
                                    <div className="col-sm-10">
                                        <input value={contactPerson}
                                            // onChange={e => setData({ ...data, contactPerson: e.target.value })}
                                            onChange={(e) => setcontactPerson(e.target.value)}
                                            type="text" className="form-control"
                                            placeholder=' Enter your contact person.'
                                            id="contactPerson" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="gstin">Gst IN </label>
                                    <div className="col-sm-10">
                                        <input value={gstin}
                                            // onChange={e => setData({ ...data, gstin: e.target.value })}
                                            onChange={(e) => setgstin(e.target.value)}
                                            type="text" className="form-control"
                                            placeholder='Enter the gst in.'
                                            id="gstin" />
                                    </div>
                                </div>
                                <div className="d-grid gap-2 col-6 mx-auto">
                                    <button className="btn btn-outline-success" type="submit">Update</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Editclient;
