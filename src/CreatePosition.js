import React, { useState } from 'react';
import axios from 'axios';
export default function CreatePosition() {
    const token = localStorage.getItem("response-token")
    const [data, setData] = useState({
        techid: "",
        positionopendate: "",
        positionclosedate: "",
        status: "",
        experienceInYear: "",
        positionType: "",
        remote: ""
    });
    // {
    //     "uiid" : 8,
    //     "techid" : 2,
    //     "positionopendate" : "31-09-2022",
    //     "positionclosedate" : "31-10-2022",
    //     "status" : "Available",
    //     "experienceInYear" : 6.0,
    //     "remote" : true,
    //     "positionType" : "Contract"

    // }
    function submit(e) {
        e.preventDefault();
        axios.post(`/hrms/interview/savePosition`, {
            techid: parseInt(data.techid),
            positionopendate: data.positionopendate,
            positionclosedate: data.positionclosedate,
            status: data.status,
            experienceInYear: data.experienceInYear,
            positionType: data.positionType,
            remote: data.remote
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response.data)
                alert("position created successfully!!")
            }).catch((err) => {
                console.log(err)
                alert("cannot create the position values!!")

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
        data.remote = str2bool(e.target.value);
    }
    function handle(e) {
        const newdata = { ...data };
        newdata[e.target.id] = e.target.value;
        setData(newdata);
        console.log(newdata);
    }
    return (
        <>
            <div className='container pt-3'>
                <div className='row'>
                    <div className='col-lg-8 col-md-10 mx-auto'>
                        <div className='card border-0 shadow'>
                            <div className='card-body'>
                                <form className='container py-3  mb-3' onSubmit={(e) => { submit(e) }}>
                                    <div className="row mb-3">
                                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='experienceInYear'>Experience in years</label>
                                        <div className="col-sm-10">
                                            <input onChange={(e) => { handle(e) }} value={data.experienceInYear}
                                                type="number"
                                                id="experienceInYear"
                                                placeholder='enter your experience in years'
                                                className="form-control" />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='positionopendate'>Position open date</label>
                                        <div className="col-sm-10">
                                            <input onChange={(e) => { handle(e) }} value={data.positionopendate}
                                                type="date" className="form-control"
                                                id="positionopendate" />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='positionclosedate'>Position close date</label>
                                        <div className="col-sm-10">
                                            <input onChange={(e) => { handle(e) }} value={data.positionclosedate}
                                                type="date" className="form-control"
                                                id="positionclosedate" />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name="positionType">Position type</label>
                                        <div className="col-sm-10">
                                            <input onChange={(e) => { handle(e) }} value={data.positionType}
                                                type="text" className="form-control"
                                                placeholder='enter your position type'
                                                id="positionType" />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Status</label>
                                        <div className="col-sm-10">
                                            <input onChange={(e) => { handle(e) }} value={data.status}
                                                type="text" className="form-control"
                                                placeholder='enter your status'
                                                id="status" />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Tech Id</label>
                                        <div className="col-sm-10">
                                            <input onChange={(e) => { handle(e) }} value={data.techid}
                                                type="number" className="form-control"
                                                placeholder='enter your tech id'
                                                id="techid" />
                                        </div>
                                    </div>
                                    <fieldset className="row mb-3">
                                        <legend className="col-form-label col-sm-2 pt-0">Remote</legend>
                                        <div className="col-sm-10">

                                            <div className="form-check form-check-inline">
                                                <input onChange={radiobut} value="true" className="form-check-input" type="radio" name="inlineRadioOptions" id="remote" />
                                                <label className="form-check-label" htmlFor="inlineRadio1">Yes</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input onChange={radiobut} value="false" className="form-check-input" type="radio" name="inlineRadioOptions" id="remote" />
                                                <label className="form-check-label" htmlFor="inlineRadio2">No</label>
                                            </div>
                                        </div>
                                    </fieldset>

                                    <div className="d-grid gap-2 col-6 mx-auto">
                                        <button className="btn btn-outline-danger" type="submit">Submit</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}