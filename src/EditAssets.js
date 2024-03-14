import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const EditAssets = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('response-token')
    const [asset, setAsset] = useState({
        id: '',
        assetUser: "",
        assetName: "",
        assetId: "",
        assetNo: "",
        assetType: "",
        processor: "",
        ram: "",
        diskType: "",
        operatingSystem: "",
        purchesDate: "",
        warrenty: "",
        warrentyDate: "",
        status: ""
    })

    useEffect(() => {
        axios.get(`/hrms/masterAsset/GetAssetById/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setAsset(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error)
        })
    }, [token, id])
    function submit(e) {
        e.preventDefault();
        axios.put(`/hrms/masterAsset/updateMasterAssetbyid`, {
            id:asset.id,
            assetUser: asset.assetUser,
            assetName: asset.assetName,
            assetId: asset.assetId,
            assetNo: asset.assetNo,
            assetType: asset.assetType,
            processor: asset.processor,
            ram: asset.ram,
            diskType: asset.diskType,
            operatingSystem: asset.operatingSystem,
            purchesDate: asset.purchesDate,
            warrenty: asset.warrenty,
            warrentyDate: asset.warrentyDate,
            status: asset.status
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response)=>{
        console.log(response.data);
        navigate('/GetAllAssets')
        toast.success(response.data,{position:'top-center',theme:'colored'})
        }) .catch((error)=>{
            console.log(error);
            toast.error('Error occured try after sometime',{position:'top-center',theme:'colored'})
        }) 
    }
function handle(){

}

    // {
    //     "assetUser": "nidhi",
    //     "assetName": "v djhdb",
    //     "assetId": "235667",
    //     "assetNo": " nn vvdv",
    //     "assetType": "jhuisd",
    //     "processor": "sakjhf",
    //     "ram": "78",
    //     "diskType": "askjdj",
    //     "operatingSystem": "sakfn",
    //     "purchesDate": "2023-06-01",
    //     "warrenty": "sdkjhf",
    //     "warrentyDate": "2023-06-09",
    //     "status": "jksahu"
    // }
    return (
        <div className='container pt-3'>
            <div className='row'>
                <div className='col-md-8 mx-auto'>
                    <div className='card border-0 shadow'>
                        <div className='card-body'>
                            <form className='container py-3  mb-3' onSubmit={(e) => { submit(e) }}>
                            <div className="row mb-3">
                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='assetId'>Asset Id</label>
                                    <div className="col-sm-10">
                                        <input disabled value={asset.assetId || ''}
                                            type="text"
                                            id="assetId"
                                            placeholder='Enter asset Id'
                                            className="form-control" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='assetUser'>Asset User</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => { setAsset({ ...asset, assetUser: e.target.value }) }} value={asset.assetUser || ''}
                                            type="text"
                                            id="assetUser"
                                            placeholder='Enter asset user name'
                                            className="form-control" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='assetName'>Asset Name</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => {setAsset({...asset,assetName:e.target.value})}} value={asset.assetName || ''}
                                            type="text"
                                            id="assetName"
                                            placeholder='Enter asset name'
                                            className="form-control" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='assetNo'>Asset Number</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => { setAsset({...asset,assetNo:e.target.value})}} value={asset.assetNo || ''}
                                            type="text"
                                            id="assetNo"
                                            placeholder='Enter asset number'
                                            className="form-control" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='assetType'>Asset Type</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => {setAsset({...asset,assetType:e.target.value})}} value={asset.assetType || ''}
                                            type="text" className="form-control"
                                            id="assetType" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='processor'>Processor</label>
                                    <div className="col-sm-10">
                                        <input  onChange={(e) => {setAsset({...asset,processor:e.target.value})}} value={asset.processor || ''}
                                            type="text" className="form-control"
                                            id="processor" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='ram'>RAM</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => {setAsset({...asset,ram:e.target.value})}} value={asset.ram || ''}
                                            type="text" className="form-control"
                                            id="ram" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='diskType'>Disk Type</label>
                                    <div className="col-sm-10">
                                        <input  onChange={(e) => {setAsset({...asset,diskType:e.target.value})}}value={asset.diskType || ''}
                                            type="text" className="form-control"
                                            id="diskType" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='operatingSystem'>Operating System</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => {setAsset({...asset,operatingSystem:e.target.value})}} value={asset.operatingSystem || ''}
                                            type="text" className="form-control"
                                            id="operatingSystem" />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='purchesDate'>Purchase Date</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => {setAsset({...asset,purchesDate:e.target.value})}} value={asset.purchesDate || ''}
                                            type="date" className="form-control"
                                            id="purchesDate" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='warrenty'>Warranty</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => {setAsset({...asset,warrenty:e.target.value})}} value={asset.warrenty || ''}
                                            type="text" className="form-control"
                                            id="warrenty" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='warrentyDate'>Warranty Date</label>
                                    <div className="col-sm-10">
                                        <input onChange={(e) => {setAsset({...asset,warrentyDate:e.target.value})}}value={asset.warrentyDate || ''}
                                            type="date" className="form-control"
                                            id="warrentyDate" />
                                    </div>
                                </div>
                                <fieldset className="row mb-3">
                                    <legend className="col-form-label col-sm-2 pt-0">Status</legend>
                                    <div className="col-sm-10">
                                        <div className="form-check form-check-inline">
                                            <input checked={asset.status === "true"} value={"true" || ''} onChange={e => setAsset({ ...asset, status: e.target.value })} className="form-check-input" type="radio" name="inlineRadioOptions" id="status" />
                                            <label className="form-check-label" htmlFor="true">Yes</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input checked={asset.status === "false"} value={"false"|| ''} onChange={e => setAsset({ ...asset, status: e.target.value })} className="form-check-input" type="radio" name="inlineRadioOptions" id="status" />
                                            <label className="form-check-label" htmlFor="false">No</label>
                                        </div>
                                    </div>
                                </fieldset>
                                <div className="d-grid gap-2 col-6 mx-auto">
                                    <button className="btn btn-outline-danger" type="submit">Update</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditAssets
