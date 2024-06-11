import React, { useState } from 'react';
import axios from 'axios';
import LoadingPage from './LoadingPage'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
function FileUpload() {
  // const token = localStorage.getItem("response-token");
  const  token = useSelector((state) => state.auth.token);

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    console.log(file)
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    setLoading(true); 
    axios.post(`apigateway/payroll/generatePaySlipForAll`,{},{
      headers: {
        'Authorization':  `Bearer ${token}`,
      }
    })
    .then(response => {
      console.log(response.data);
      alert(response.data)
      setLoading(false); 
    })
    .catch(error => {
      console.error(error);
      toast.error( error.response.data.message || "Error creating details" );
      setLoading(false); 
    });
  }

  return (
    <div>  {loading ? <LoadingPage/> : ''}
      <form onSubmit={handleSubmit}>
        {/* <input type="file" onChange={handleFileChange} /> */}
        <br />
        <button type="submit">generate Pay_Slip For all the Employee </button>
      </form>
    </div>
  );
}

export default FileUpload;