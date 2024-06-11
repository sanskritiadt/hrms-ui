import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingPage from './LoadingPage';
import Select from 'react-select';
import './Hrmscss/App.css';
import { useSelector } from 'react-redux';

const EditPosition = () => {
  // const token = localStorage.getItem('response-token');
  const  token = useSelector((state) => state.auth.token);
  const [selectedValue, setSelectedValue] = useState([]);
  const [techOptions, setTechOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    positionName: '',
    techStack: '',
    vacancy: '',
    positionOpenDate: '',
    positionCloseDate: '',
    status: '',
    experienceInYear: '',
    positionType: '',
    remote: ''
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/apigateway/hrms/interview/alltech`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        const options = response.data.map((tech) => ({
          label: tech.description,
          value: tech.description
        }));
        setTechOptions(options);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message);
      });

    axios
      .get(`/apigateway/hrms/interview/getByPositionId/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        const positionData = response.data;
        setData({
          ...positionData,
          positionOpenDate: positionData.positionOpenDate ? new Date(positionData.positionOpenDate).toISOString().split('T')[0] : '',
          positionCloseDate: positionData.positionCloseDate ? new Date(positionData.positionCloseDate).toISOString().split('T')[0] : ''
        });
        setSelectedValue(positionData.techStack.map(tech => ({ label: tech, value: tech })));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error(error.response.data.message || 'Error fetching details');
      });
  }, [id, token]);

  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x) : []);
  };

  function radiobut(e) {
    setData({ ...data, remote: e.target.value === 'true' });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(
        `/apigateway/hrms/interview/updatePositionNew/${id}`,
        {
          ...data,
          techStack: selectedValue.map(option => option.value)  
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((response) => {
        toast.success('Data has been updated successfully!!', {
          position: 'top-center',
          theme: 'colored'
        });
        console.log(response.data);
        navigate('/Getclientinfo');
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message || 'Error updating details');
        setLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className='container pt-3'>
      {loading ? <LoadingPage /> : ''}
      <div className='row'>
        <div className='col-md-8 mx-auto'>
          <div className='card border-0 shadow' style={{ marginLeft: '100px', width: '700px', height: '900PX' }}>
            <div className='card-body'>
              <form className='container py-3 mb-3' onSubmit={handleSubmit}>
                <div className='row mb-3'>
                  <label htmlFor='positionName' className='col-sm-2 col-form-label'>Position Name</label>
                  <div className='col-sm-10'>
                    <input
                      onChange={handleInputChange}
                      value={data.positionName}
                      type='text'
                      id='positionName'
                      name='positionName'
                      placeholder='Enter your position name'
                      className='form-control'
                    />
                  </div>
                </div>
                <div className='row mb-3'>
                  <label htmlFor='techStack' className='col-sm-2 col-form-label'>Tech Stack</label>
                  <div className='col-sm-10'>
                    <Select
                      isMulti
                      name='techStack'
                      options={techOptions}
                      id='techStack'
                      className='basic-multi-select'
                      classNamePrefix='select'
                      onChange={handleChange}
                      value={selectedValue}
                    />
                  </div>
                </div>
                <div className='row mb-3'>
                  <label htmlFor='vacancy' className='col-sm-2 col-form-label'>Vacancy</label>
                  <div className='col-sm-10'>
                    <input
                      onChange={handleInputChange}
                      value={data.vacancy}
                      type='text'
                      id='vacancy'
                      name='vacancy'
                      placeholder='Enter your vacancy'
                      className='form-control'
                    />
                  </div>
                </div>
                <div className='row mb-3'>
                  <label htmlFor='experienceInYear' className='col-sm-2 col-form-label'>Experience in Years</label>
                  <div className='col-sm-10'>
                    <input
                      onChange={handleInputChange}
                      value={data.experienceInYear}
                      type='text'
                      id='experienceInYear'
                      name='experienceInYear'
                      placeholder='Enter your experience in years'
                      className='form-control'
                    />
                  </div>
                </div>
                <div className='row mb-3'>
                  <label htmlFor='positionOpenDate' className='col-sm-2 col-form-label'>Position Open Date</label>
                  <div className='col-sm-10'>
                    <input
                      onChange={handleInputChange}
                      value={data.positionOpenDate}
                      type='date'
                      id='positionOpenDate'
                      name='positionOpenDate'
                      className='form-control'
                    />
                  </div>
                </div>
                <div className='row mb-3'>
                  <label htmlFor='positionCloseDate' className='col-sm-2 col-form-label'>Position Close Date</label>
                  <div className='col-sm-10'>
                    <input
                      onChange={handleInputChange}
                      value={data.positionCloseDate}
                      type='date'
                      id='positionCloseDate'
                      name='positionCloseDate'
                      className='form-control'
                    />
                  </div>
                </div>
                <div className='row mb-3'>
                  <label htmlFor='positionType' className='col-sm-2 col-form-label'>Position Type</label>
                  <div className='col-sm-10'>
                    <select id='positionType' name='positionType' value={data.positionType} onChange={handleInputChange} className='form-select'>
                      <option defaultValue>Select your position type</option>
                      <option value='Permanent'>Permanent</option>
                      <option value='Contractual'>Contractual</option>
                      <option value='Traineeship'>Traineeship</option>
                    </select>
                  </div>
                </div>
                <div className='row mb-3'>
                  <label htmlFor='status' className='col-sm-2 col-form-label'>Status</label>
                  <div className='col-sm-10'>
                    <select id='status' name='status' value={data.status} onChange={handleInputChange} className='form-select'>
                      <option defaultValue>Select your status type</option>
                      <option value='Available'>Available</option>
                      <option value='Not Available'>Not Available</option>
                    </select>
                  </div>
                </div>
                <fieldset className='row mb-3'>
                  <legend className='col-form-label col-sm-2 pt-0'>Remote</legend>
                  <div className='col-sm-10'>
                    <div className='form-check form-check-inline'>
                      <input
                        onChange={radiobut}
                        value='true'
                        className='form-check-input'
                        type='radio'
                        name='inlineRadioOptions'
                        id='remote'
                        checked={data.remote === true}
                      />
                      <label className='form-check-label' htmlFor='inlineRadio1'>Yes</label>
                    </div>
                    <div className='form-check form-check-inline'>
                      <input
                        onChange={radiobut}
                        value='false'
                        className='form-check-input'
                        type='radio'
                        name='inlineRadioOptions'
                        id='remote'
                        checked={data.remote === false}
                      />
                      <label className='form-check-label' htmlFor='inlineRadio2'>No</label>
                    </div>
                  </div>
                </fieldset>
                <div className='d-grid gap-2 col-6 mx-auto'>
                  <button className='btn btn-outline-danger' type='submit'>Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPosition;
