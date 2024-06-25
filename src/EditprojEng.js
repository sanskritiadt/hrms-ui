import React ,{useState,useEffect}from 'react'
import axios from 'axios'
import {toast} from  'react-toastify';
import { useParams,useNavigate } from 'react-router-dom';
import LoadingPage from './LoadingPage';
import { useSelector } from 'react-redux';
const EditprojEng = () => {
    // const token = localStorage.getItem("response-token");
    const  token = useSelector((state) => state.auth.token);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate()
    const [data,setData] = useState({
        projectId:'',
        contractor:'',
        endClient:'',
        primaryResource:'',
        secondaryResource:'',
        startDate:'',
        endDate:'',
        status:'',
    });

useEffect(() => {
    setLoading(true);
axios.get(`/apigateway/hrms/engagement/ProjectEngagementDetailById/${id}`,{
    headers:{
    'Authorization' : `Bearer ${token}`
}}).then((response)=>{
    console.log(response.data);
    setData(response.data);
    setLoading(false); 
}).catch((error)=>{
    console.log(error);
    toast.error( error.response.data.message || "Error fetching details" );
    setLoading(false); 
})
}, [token,id])


function HandleSubmit(e){
    setLoading(true);
    e.preventDefault();
    axios.put(`/apigateway/hrms/engagement/updateProjectEngagement/${id}`,{
        projectId:data.projectId,
        contractor:data.contractor,
        endClient:data.endClient,
        primaryResource:data.primaryResource,
        secondaryResource:data.secondaryResource,
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
        setLoading(false); 
    }).catch((error)=>{
        console.log(error)
        toast.error( error.response.data.message || "Error updating details" );
        setLoading(false); 
    })
}
function HandleDelete(){
    if (!window.confirm("Are you sure you want to delete this Project?")) {
        return;
      }
    setLoading(true);
    axios.delete(`/apigateway/hrms/engagement/DeleteProjectEngagement/${id}`,{
        headers: {
            'Authorization' :`Bearer ${token}`
        }
    }).then((response)=>{
        console.log(response.data);
        toast.success(response.data, { position: 'top-center', theme: "colored" })
        setLoading(false); 
    }).catch((error)=>{
        console.log(error);
        toast.error( error.response.data.message || "Error deleting details" );  
        setLoading(false); 
      })
}
  return (
  <div className='container pt-3'style={{  marginLeft:'100px',width:'1100px',height:'650PX'}}>
    {loading ? <LoadingPage/> : ''}
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
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='contractor'>Contractor</label>
                                    <div className="col-sm-10">
                                        <input value={data.contractor || ''}
                                            onChange={e => setData({ ...data, contractor: e.target.value })}
                                            type="text" className="form-control"
                                            id="contractor"
                                            placeholder='enter contractor' />
                                    </div>   
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='endClient'>End Client</label>
                                    <div className="col-sm-10">
                                        <input value={data.endClient || ''}
                                            onChange={e => setData({ ...data, endClient: e.target.value })}
                                            type="text"
                                            id="endClient"
                                         placeholder='enter end client'
                                            className="form-control" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='primaryResource'>Primary Resource</label>
                                    <div className="col-sm-10">
                                        <input value={data.primaryResource || ''}
                                            onChange={e => setData({ ...data, primaryResource: e.target.value })}
                                            type="text"
                                            id="primaryResource"
                                         placeholder='enter primary resource name'
                                            className="form-control" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='secondaryResource'>Secondary Employee</label>
                                    <div className="col-sm-10">
                                        <input value={data.secondaryResource || ''}
                                            onChange={e => setData({ ...data, secondaryResource: e.target.value })}
                                            type="text"
                                            id="secondaryResource"
                                         placeholder='enter secondary resource name'
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
