import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./Hrmscss/App.css";
import LoadingPage from "./LoadingPage";

function EditClient() {
  const token = localStorage.getItem("response-token");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    id: "",
    address: "",
    companyName: "",
    contactPerson: "",
    email: "",
    gstin: "",
    phone: "",
  });
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/apigateway/expensemanagement/clientInfo/getClientInfoById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error(error.response.data.message || "Error fetching details");
      });
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    axios
      .put(
        `/apigateway/expensemanagement/clientInfo/updateClientInfo/${id}`,
        {
          id: data.id,
          address: data.address,
          companyName: data.companyName,
          contactPerson: data.contactPerson,
          email: data.email,
          gstin: data.gstin,
          phone: data.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        toast.success("data has been updated successfully!!", {
          position: "top-center",
          theme: "colored",
        });
        console.log(response.data);
        navigate("/Getclientinfo");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message || "Error updating details");
        setLoading(false);
      });
  }
  return (
    <div className="container pt-3">
      {loading ? <LoadingPage /> : ""}
      <div className="row">
        <div className=" col-md-8 mx-auto">
          <div
            className="card border-0 shadow"
            style={{ width: "600px", height: "650px" }}
          >
            <div className="card-body">
              <form className="container py-3  mb-3" onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-2 col-form-label"
                    name="id"
                  >
                    ID:
                  </label>
                  <div className="col-sm-10">
                    <input
                      disabled
                      value={data.id || ""}
                      type="text"
                      className="form-control"
                      id="id"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputEmail3"
                    className="col-sm-2 col-form-label"
                    name="amount"
                  >
                    Address
                  </label>
                  <div className="col-sm-10">
                    <input
                      value={data.address || ""}
                      onChange={(e) =>
                        setData({ ...data, address: e.target.value })
                      }
                      type="text"
                      id="address"
                      placeholder="enter address"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-2 col-form-label"
                    name="description"
                  >
                    Company Name
                  </label>
                  <div className="col-sm-10">
                    <input
                      value={data.companyName || ""}
                      onChange={(e) =>
                        setData({ ...data, companyName: e.target.value })
                      }
                      type="text"
                      className="form-control"
                      id="companyName"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-2 col-form-label"
                    name="paymentDate"
                  >
                    Contact Person
                  </label>
                  <div className="col-sm-10">
                    <input
                      value={data.contactPerson || ""}
                      onChange={(e) =>
                        setData({ ...data, contactPerson: e.target.value })
                      }
                      type="text"
                      className="form-control"
                      id="contactPerson"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-2 col-form-label"
                    name="paymentMode"
                  >
                    Email
                  </label>
                  <div className="col-sm-10">
                    <input
                      value={data.email || ""}
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                      type="email"
                      className="form-control"
                      placeholder="enter your email."
                      id="email"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-2 col-form-label"
                    name="createdBy"
                  >
                    GSTIN
                  </label>
                  <div className="col-sm-10">
                    <input
                      value={data.gstin || ""}
                      onChange={(e) =>
                        setData({ ...data, gstin: e.target.value })
                      }
                      type="text"
                      className="form-control"
                      id="gstin"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    htmlFor="inputPassword3"
                    className="col-sm-2 col-form-label"
                    name="category"
                  >
                    Phone
                  </label>
                  <div className="col-sm-10">
                    <input
                      value={data.phone || ""}
                      onChange={(e) =>
                        setData({ ...data, phone: e.target.value })
                      }
                      type="number"
                      className="form-control"
                      placeholder="enter the expense type."
                      id="phone"
                    />
                  </div>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto">
                  <button className="btn btn-outline-success" type="submit">
                    Update Client
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditClient;
