import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const token = localStorage.getItem("response-token");
  const [file, setFile] = useState(null);

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    console.log(file)
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    axios.post(`/payroll/generatePaySlipForAll`, {
      headers: {
        'Authorization':  `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log(response.data);
      alert(response.data)
      // Handle response data
    })
    .catch(error => {
      console.error(error);
      // Handle error
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <br />
        <br />
        <button type="submit">generate Pay_Slip For all the Employee </button>
      </form>
    </div>
  );
}

export default FileUpload;