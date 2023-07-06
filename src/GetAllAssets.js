import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import './Hrmscss/App.css'

const GetAllAssets = () => {
  const token = localStorage.getItem("response-token");
  const [asset, setAsset] = useState([]);
  
  useEffect(() => {
    axios
      .get(`/hrms/masterAsset/getAllMasterAsset`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setAsset(response.data);
        toast.success('Assets data found successfully!!',{position:'top-center',theme:'colored'})
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error occured try after sometime.',{position:'top-center',theme:'colored'})
      })
  }, [])
if(!asset) return null;

//   {
//     "id": 8,
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
  return ( <div className="table-responsive-sm">
 <table border='2' className="table table-striped table-bordered">
     <thead className="head">
         <tr className="table-danger table-striped">
             <th>ID</th>
             <th>ASSET USER</th>
             <th>ASEET NAME</th>
             <th>ASEET ID</th>
             <th>ASEET NUMBER</th>
             <th>ASSET TYPE</th>
             <th>PROCESSOR</th>
             <th>RAM</th>
             <th>DISK TYPE</th>
             <th>OPERATING SYSTEM</th>
             <th>PURCHASE DATE</th>
             <th>WARRANTY</th>
             <th>WARRANTY DATE</th>
             <th>STATUS</th>
         </tr>
     </thead>
     <tbody className="body">
         {/* map over the employees array */}
         {asset.map((assets) => (
             // display a <div> element with the employees.emailId and employees.designation
             // parent element needs to have a unique key
             <tr key={assets.id}>
                 <td><Link to={`/EditAssets/${assets.id}`} className="Candidate-id">{assets.id}</Link></td>
                 <td>{assets.assetUser}</td>
                 <td>{assets.assetName}</td>
                 <td>{assets.assetId}</td>
                 <td>{assets.assetNo}</td>
                 <td>{assets.assetType}</td>
                 <td>{assets.processor}</td>
                 <td>{assets.ram}</td>
                 <td>{assets.diskType}</td>
                 <td>{assets.operatingSystem}</td>
                 <td>{assets.purchesDate}</td>
                 <td>{assets.warrenty}</td>
                 <td>{assets.warrentyDate}</td>
                 <td>{assets.status}</td>
             </tr>
         ))}
     </tbody>
 </table>
</div>)
};

export default GetAllAssets;
