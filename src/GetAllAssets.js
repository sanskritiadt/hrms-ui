import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Hrmscss/App.css";
import { Button } from "react-bootstrap";
import LoadingPage from "./LoadingPage";

const GetAllAssets = () => {
  const token = localStorage.getItem("response-token");
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get(
          `/apigateway/hrms/masterAsset/getAllMasterAsset`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAssets(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message || "Error fetching assets.");
        setLoading(false);
      }
    };
    fetchAssets();

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
   
  }, [token]);

  return (
    <div className="table-responsive-sm">
      {loading ? <LoadingPage /> : ""}
      <div className=" mt-3">
        <nav
          aria-label="breadcrumb"
          style={{ "--bs-breadcrumb-divider": "'>>'" }}
        >
          <ol className="breadcrumb" style={{ color: "white" }}>
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>{" "}
            </li>
            <li className="breadcrumb-item">
              <a href="">Employee Management</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Employee Assets
            </li>
          </ol>
        </nav>
      </div>
      <div
        className="d-flex justify-content-center  "
        style={{ width: screenWidth - 70 }}
      >
      <div className="table-responsive-sm"style={{ width: "180vh", overflowX: "auto" }}>
          <div className="my-4">
            <h1 className="Heading1">Employee Assets</h1>
          </div>
      <table className="table table-striped table-bordered" >
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
            <th>Update</th>
          </tr>
        </thead>
        <tbody className="body">
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td>{asset.id}</td>
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
              <td>
                <Link Link to={`/EditAssets/${asset.id}`}>
                  <Button variant="outline-primary" type="button">
                    Edit
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    </div>
  );
};

export default GetAllAssets;
