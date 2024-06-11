import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingPage from "./LoadingPage";
import { useSelector } from 'react-redux';
const PriorTimeRow = ({ data, onUpdate }) => {
  const [checkIn, setCheckIn] = useState(data.checkIn);
  const [checkOut, setCheckOut] = useState(data.checkOut);
  const [workingHours, setWorkingHours] = useState(data.workingHour);

  useEffect(() => {
    calculateWorkingHours();
  }, [checkIn, checkOut]);

  const calculateWorkingHours = () => {
    if (checkIn && checkOut) {
      const startTime = new Date(`01/01/2020 ${checkIn}`);
      const endTime = new Date(`01/01/2020 ${checkOut}`);

      const diff = endTime - startTime;
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.round((diff % 3600000) / 60000);
      let hoursFormatted = `${hours}h ${minutes}m`;
      if (hours < 0 || minutes < 0) {
        hoursFormatted = "Invalid Time Range";
      }
      setWorkingHours(hoursFormatted);
    }
  };

  const handleUpdate = async () => {
    await onUpdate(data.date, checkIn, checkOut);
  };

  return (
    <tr>
      <td>
        <input
          type="time"
          step="1"
          value={checkIn || ""}
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </td>
      <td>
        <input
          type="time"
          step="1"
          value={checkOut || ""}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </td>
      <td>{workingHours}</td>
      <td>{data.date}</td>
      <td>
        <button onClick={handleUpdate}>Update prior time</button>
      </td>
    </tr>
  );
};

export default function PriorTimeAdj() {
  const  token = useSelector((state) => state.auth.token);
  const  empId = useSelector((state) => state.auth.empId);
  // const token = localStorage.getItem("response-token");
  // const empId = localStorage.getItem("EmpID");
  const [priorData, setPriorData] = useState([]);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  const fetchPriorData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `/apigateway/payroll/timeSheet/priorTimeAdjustment/${empId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    //  console.log("Fetched data:", response.data); // Debugging log
      setPriorData(response.data);
    //  toast.success(response.data.data, { position: "top-center", theme: "colored" })
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error( error.response.data.message || "Error fetching details" );
      setLoading(false);
    }
  }, [token, empId]);

  useEffect(() => {
    fetchPriorData();
  }, [fetchPriorData]);

  const handleUpdateTime = async (date, updatedCheckIn, updatedCheckOut) => {
    try {
      setLoading(true);
      const rowData = priorData.find((item) => item.date === date);
      if (!rowData) {
        throw new Error("Row data not found");
      }
    //  console.log("Updating rowData:", rowData); // Debugging log

      const updatedRow = {
        employeeId: empId,
        checkIn: updatedCheckIn,
        checkOut: updatedCheckOut,
        date: rowData.date,
        email: rowData.email,
        status: rowData.status,
      };

      //console.log("Updated row payload:", updatedRow); // Debugging log

      const response = await axios.post(
        `/apigateway/payroll/timeSheet/updatePriorTime?Latitude=${latitude}&Longitude=${longitude}`,
        updatedRow,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response data:", response.data);
      toast.success(response.data.data, { position: "top-center", theme: "colored" })
      setLoading(false);
      const updatedData = priorData.map((row) => {
        if (row.date === date) {
          return { ...row, ...response.data };
        } else {
          return row;
        }
      });
     // console.log("Updated data:", updatedData); // Debugging log
      setPriorData(updatedData);
      fetchPriorData();
    } catch (error) {
      console.error(error);
      toast.error( error.response.data.message || "Error updating details" );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="table-responsive-sm"
      style={{ paddingLeft: "140px", paddingRight: "60px" }}
    >
      {loading ? (
        <LoadingPage />
      ) : (
        <table border="2" className="table table-striped table-bordered">
          <thead className="head">
            <tr className="table-danger table-striped">
              <th>CHECKIN</th>
              <th>CHECKOUT</th>
              <th>WORKING HOUR</th>
              <th>DATE</th>
              <th>UPDATE</th>
            </tr>
          </thead>
          <tbody className="body">
            {priorData.map((data) => (
              <PriorTimeRow
                key={data.date}
                data={data}
                onUpdate={handleUpdateTime}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}



