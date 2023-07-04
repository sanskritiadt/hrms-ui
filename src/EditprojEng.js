import React ,{useState,useEffect}from 'react'
import axios from 'axios'
import {toast} from  'react-toastify';
import { useParams,useNavigate } from 'react-router-dom';
import handleAuthError from './CommonErrorHandling';
const EditprojEng = () => {
    const token = localStorage.getItem("response-token")
    const { id } = useParams();
    const navigate = useNavigate()
    const [data,setData] = useState({
        projectId:'',
        projectName:'',
        projectDescription:'',
        engagedEmployee:'',
        startDate:'',
        endDate:'',
        status:'',
    });

useEffect(() => {
axios.get(`/hrms/engagement/ProjectEngagementDetailById/${id}`,{
    headers:{
    'Authorization' : `Bearer ${token}`
}}).then((response)=>{
    console.log(response.data);
    setData(response.data);
}).catch((error)=>{
    console.log(error);
})
}, [token,id])


function HandleSubmit(e){
    e.preventDefault();
    axios.put(`/hrms/engagement/updateProjectEngagement/${id}`,{
        projectId:data.projectId,
        projectName:data.projectName,
        projectDescription:data.projectDescription,
        engagedEmployee:data.engagedEmployee,
        startDate:data.startDate,
        endDate:data.endDate,
        status:data.status
    },{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    }).then((response)=>{
        console.log(response.data);
        navigate('/GetAllPrEngagement');
        toast.success(response.data,{ position: 'top-center', theme: "colored" })
    }).catch((error)=>{
        console.log(error)
        handleAuthError(error);
    })
}
function HandleDelete(){
    axios.delete(`/hrms/engagement/DeleteProjectEngagement/${id}`,{
        headers: {
            'Authorization' :`Bearer ${token}`
        }
    }).then((response)=>{
        console.log(response.data);
        toast.success(response.data, { position: 'top-center', theme: "colored" })
    }).catch((error)=>{
        console.log(error);
        handleAuthError(error);
    })
}

    // {
    //     "projectName":"HEB",
    //     "projectDescription":"Online zilla booking site",
    //     "engagedEmployee":"kailash",
    //     "startDate":"01/05/2024",
    //     "endDate":"20/05/2023",
    //     "status":true   
    // }
  return (
  <div className='container pt-3'>
            <div className='row'>
                <div className='col-lg-8 col-md-8 mx-auto'>
                    <div className='card border-0 shadow'>
                        <div className='card-body'>
                            <form className='container py-3  mb-3' onSubmit={HandleSubmit}>
                            <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='projectId'>Project ID</label>
                                    <div className="col-sm-10">
                                        <input disabled value={data.projectId || ''}
                                            type="text" className="form-control"
                                            id="projectId" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='projectName'>Project Name</label>
                                    <div className="col-sm-10">
                                        <input value={data.projectName || ''}
                                            onChange={e => setData({ ...data, projectName: e.target.value })}
                                            type="text" className="form-control"
                                            id="projectName" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='emailId'>Project Description</label>
                                    <div className="col-sm-10">
                                        <input value={data.projectDescription || ''}
                                            onChange={e => setData({ ...data, projectDescription: e.target.value })}
                                            type="text"
                                            id="projectDescription"
                                         placeholder='enter Project Description'
                                            className="form-control" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='startDate'>Start Date</label>
                                    <div className="col-sm-10">
                                        <input value={data.startDate || ''}
                                            onChange={e => setData({ ...data, startDate: e.target.value })}
                                            type="date" className="form-control"
                                            id="startDate" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='endDate'>End Date</label>
                                    <div className="col-sm-10">
                                        <input value={data.endDate || ''}
                                            onChange={e => setData({ ...data, endDate: e.target.value })}
                                            type="date" className="form-control"
                                            id="endDate" />
                                    </div>
                                </div>
                               
                                <fieldset className="row mb-3">
                                    <legend className="col-form-label col-sm-2 pt-0">Status</legend>
                                    <div className="col-sm-10">
                                        <div className="form-check form-check-inline">
                                            <input checked={data.status === true} onChange={e => setData({ ...data, status: true })} value={data.status || ''} className="form-check-input" type="radio" name="inlineRadioOptions" id="status" />
                                            <label className="form-check-label" htmlFor="inlineRadio1">Active</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input checked={data.status === false} onChange={e => setData({ ...data, status: false })} value={data.status || ''} className="form-check-input" type="radio" name="inlineRadioOptions" id="status" />
                                            <label className="form-check-label" htmlFor="inlineRadio2">InActive</label>
                                        </div>
                                    </div>
                                </fieldset>
                              
                                <div className="d-grid gap-2 col-6 mx-auto">
                                    <button className="btn btn-outline-success" type="submit">Update project details</button>
                                </div>
                            </form>
                            <div className="d-grid gap-2 col-6 mx-auto">
                                <button className="btn btn-outline-danger" onClick={HandleDelete} type="submit">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default EditprojEng;
