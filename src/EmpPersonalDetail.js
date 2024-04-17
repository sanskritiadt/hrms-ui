import React ,{useState,useEffect}from 'react'
import axios from 'axios'
import {toast} from  'react-toastify';
import handleAuthError from './CommonErrorHandling';
export default function EmpPersonalDetail() {
    const token = localStorage.getItem("response-token")
    const EmpId = localStorage.getItem("EmpID");
    const [data,setData] = useState({
        employeeId: '',
        dob: '',
        email:'',
        firstName: '',
        gender: '',
        lastName: '',
        maritalStatus:'',
        mobileNo: '',
        userName: ''
    });


    function HandleSubmit(e) {
        e.preventDefault();
        axios
          .put(
            `/apigateway/hrms/employee/updatePersonalDetailsById`,
            {
              employeeId: data.employeeId,
              dob: data.dob,
              email: data.email,
              firstName: data.firstName,
              gender: data.gender,
              lastName: data.lastName,
              maritalStatus: data.maritalStatus,
              mobileNo: data.mobileNo,
              userName: data.userName,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            toast.success(response.data, {
              position: "top-center",
              theme: "colored",
            });
          })
          .catch((error) => {
            console.log(error);
            handleAuthError(error);
          });
      }
      useEffect(() => {
        axios
          .get(`/apigateway/hrms/employee/getById/${EmpId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
           // console.log(response.data);
            setData(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
        
  return (
    <div>
      <div className='container pt-3' style={{width:'1000px',height:'800px'}}>
            <div className='row'>
                <div className='col-lg-8 col-md-8 mx-auto'>
                    <div className='card border-0 shadow'>
                        <div className='card-body'>
                            <form className='container py-3  mb-3' onSubmit={HandleSubmit}>
                            <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='projectId'>EmployeeId</label>
                                    <div className="col-sm-10">
                                        <input disabled value={data.employeeId || ''}
                                            type="text" className="form-control"
                                            id="projectId" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='projectName'>DOB</label>
                                    <div className="col-sm-10">
                                        <input value={data.dob || ''}
                                            onChange={e => setData({ ...data, dob: e.target.value })}
                                            type="text" className="form-control"
                                            id="projectName" />
                                    </div>   
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label" name='emailId'>Email</label>
                                    <div className="col-sm-10">
                                        <input value={data.email || ''}
                                            onChange={e => setData({ ...data, email: e.target.value })}
                                            type="text"
                                            id="projectDescription"
                                            className="form-control" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='startDate'>First Name</label>
                                    <div className="col-sm-10">
                                        <input value={data.firstName || ''}
                                            onChange={e => setData({ ...data, firstName: e.target.value })}
                                            type="text" className="form-control"
                                            id="startDate" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='endDate'>Last Name</label>
                                    <div className="col-sm-10">
                                        <input value={data.lastName || ''}
                                            onChange={e => setData({ ...data, lastName: e.target.value })}
                                            type="text" className="form-control"
                                            id="lastName" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='endDate'>Marital Status</label>
                                    <div className="col-sm-10">
                                        <input value={data.maritalStatus || ''}
                                            onChange={e => setData({ ...data, maritalStatus: e.target.value })}
                                            type="text" className="form-control"
                                            id="endDate" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label" name='endDate'>Mobile No</label>
                                    <div className="col-sm-10">
                                        <input value={data.mobileNo || ''}
                                            onChange={e => setData({ ...data, mobileNo: e.target.value })}
                                            type="text" className="form-control"
                                            id="endDate" />
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

    </div>
  )
}
