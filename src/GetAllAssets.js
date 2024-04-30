// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import './Hrmscss/App.css'
// import LoadingPage from "./LoadingPage";

// const GetAllAssets = () => {
//   const token = localStorage.getItem("response-token");
//   const [asset, setAsset] = useState([]);
//   const [loading, setLoading] = useState(true); 

//   useEffect(() => {
//     axios
//       .get(`/apigateway/hrms/masterAsset/getAllMasterAsset`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         console.log(response.data);
//         setAsset(response.data);
//         setLoading(false);
//         //toast.success('Assets data found successfully!!',{position:'top-center',theme:'colored'})
//       })
//       .catch((error) => {
//         console.log(error);
//         toast.error('Error occured try after sometime.', { position: 'top-center', theme: 'colored' });
//         setLoading(false);
//       })
//   }, [])
//   if (loading) {
//     return <LoadingPage/>; 
//   }
//   if (!asset) return null;

//   const [screenWidth, setScreenWidth] = useState(window.innerWidth);

//   useEffect(() => {
//       const handleResize = () => {
//           setScreenWidth(window.innerWidth);
//       };

//       window.addEventListener('resize', handleResize);


//       return () => {
//           window.removeEventListener('resize', handleResize);
//       };
//   }, []);

//   return (
//     <div className="table-responsive-sm">
//       <div className=" mt-3">
//         <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
//           <ol className="breadcrumb" style={{ color: "white" ,marginLeft:'20px'}}>
//             <li className="breadcrumb-item"><Link to="/">Home</Link> </li>
//             <li className="breadcrumb-item"><a href="">Employee Management</a></li>
//             <li className="breadcrumb-item active" aria-current="page">Employee Assets</li>
//           </ol>
//         </nav>
//       </div>
//       <div style={{width:screenWidth-50, display:'flex', justifyContent:'center'}}>
//         <div>
//         <h1 className='Heading1 my-4' >Employee Assets</h1>
//         <div style={{width:"160vh", overflowX:'auto'}}>
//           <table border='2' className="table table-striped table-bordered">
//             <thead className="head">
//               <tr className="table-danger table-striped">
//                 <th>ID</th>
//                 <th>ASSET USER</th>
//                 <th>ASSET NAME</th>
//                 <th>ASSET ID</th>
//                 <th>ASSET NUMBER</th>
//                 <th>ASSET TYPE</th>
//                 <th>PROCESSOR</th>
//                 <th>RAM</th>
//                 <th>DISK TYPE</th>
//                 <th>OPERATING SYSTEM</th>
//                 <th>PURCHASE DATE</th>
//                 <th>WARRANTY</th>
//                 <th>WARRANTY DATE</th>
//                 <th>STATUS</th>
//               </tr>
//             </thead>
//             <tbody className="body">
             
//               {asset.map((assets) => (
//                 // display a <div> element with the employees.emailId and employees.designation
//                 // parent element needs to have a unique key
//                 <tr key={assets.id}>
//                   <td><Link to={`/EditAssets/${assets.id}`} className="Candidate-id">{assets.id}</Link></td>
//                   <td>{assets.assetUser}</td>
//                   <td>{assets.assetName}</td>
//                   <td>{assets.assetId}</td>
//                   <td>{assets.assetNo}</td>
//                   <td>{assets.assetType}</td>
//                   <td>{assets.processor}</td>
//                   <td>{assets.ram}</td>
//                   <td>{assets.diskType}</td>
//                   <td>{assets.operatingSystem}</td>
//                   <td>{assets.purchesDate}</td>
//                   <td>{assets.warrenty}</td>
//                   <td>{assets.warrentyDate}</td>
//                   <td>{assets.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//       </div>
//     </div>
//   )
// };

// export default GetAllAssets;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import './Hrmscss/App.css';
import LoadingPage from "./LoadingPage"; 

const GetAllAssets = () => {
  const token = localStorage.getItem("response-token");
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get(`/apigateway/hrms/masterAsset/getAllMasterAsset`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAssets(response.data);
        setLoading(false); 
      } catch (error) {
        console.error(error);
        toast.error('Error occurred, try after sometime.', { position: 'top-center', theme: 'colored' });
        setLoading(false); 
      }
    };

    fetchAssets(); 
  }, [token]); 



  return (
    <div className="table-responsive-sm">
      {loading ? <LoadingPage/> : ''}
      <div className=" mt-3">
        <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
          <ol className="breadcrumb" style={{ color: "white" }}>
            <li className="breadcrumb-item"><Link to="/">Home</Link> </li>
            <li className="breadcrumb-item"><a href="">Employee Management</a></li>
            <li className="breadcrumb-item active" aria-current="page">Employee Assets</li>
          </ol>
        </nav>
      </div>
      <h1 className='Heading1' >Employee Assets</h1>
      <table className="table table-striped table-bordered">
        <thead className="head">
          <tr className="table-danger table-striped">
            <th>ID</th>
            <th>ASSET USER</th>
            <th>ASSET NAME</th>
            <th>ASSET ID</th>
            <th>ASSET NUMBER</th>
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
          {assets.map(asset => (
            <tr key={asset.id}>
              <td><Link to={`/EditAssets/${asset.id}`} className="Candidate-id">{asset.id}</Link></td>
              <td>{asset.assetUser}</td>
              <td>{asset.assetName}</td>
              <td>{asset.assetId}</td>
              <td>{asset.assetNo}</td>
              <td>{asset.assetType}</td>
              <td>{asset.processor}</td>
              <td>{asset.ram}</td>
              <td>{asset.diskType}</td>
              <td>{asset.operatingSystem}</td>
              <td>{asset.purchesDate}</td>
              <td>{asset.warrenty}</td>
              <td>{asset.warrentyDate}</td>
              <td>{asset.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllAssets;


