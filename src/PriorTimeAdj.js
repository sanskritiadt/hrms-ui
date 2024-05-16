import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import LoadingPage from "./LoadingPage"; 

const PriorTimeRow = ({ data, onUpdate }) => {
  const [checkIn, setCheckIn] = useState(data.checkIn);
  const [checkOut, setCheckOut] = useState(data.checkOut);
  const [workingHours, setWorkingHours] = useState(data.workingHour);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      await onUpdate(data.id, checkIn, checkOut);
      toast.success("Time updated successfully.", {
        position: "top-center",
        theme: "colored",
      });
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while updating time.", {
        position: "top-center",
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
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
      {/* <td>{data.status}</td> */}
      <td>
        <button onClick={handleUpdate} >
          Update prior time
        </button>
      </td>
    </tr>
  );
};

export default function PriorTimeAdj() {
  const [priorData, setPriorData] = useState([]);
  const token = localStorage.getItem("response-token");
  const empId = localStorage.getItem("EmpID");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position);
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
      setPriorData(response.data);
      setLoading(false); 
    } catch (error) {
      console.error(error);
      toast.error("Error occurred, try again later.", {
        position: "top-center",
        theme: "colored",
      });
      setLoading(false);
    }
  }, [token, empId]);

  useEffect(() => {
    fetchPriorData();
  }, [fetchPriorData]);

  const handleUpdateTime = async (id, updatedCheckIn, updatedCheckOut) => {
    try {
      setLoading(true); 
      const rowData = priorData.find((item) => item.id === id);
      const updatedRow = {
        employeeId: empId,
        checkIn: updatedCheckIn,
        checkOut: updatedCheckOut,
        date: rowData.date,
        email: rowData.email,
        status: rowData.status,
      };

      const response = await axios.post(
        `/apigateway/payroll/timeSheet/updatePriorTime?Latitude=${latitude}&Longitude=${longitude}`,
        updatedRow,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedData = priorData.map((row) => {
        if (row.id === id) {
          return response.data;
        } else {
          return row;
        }
      });

      setPriorData(updatedData);
      fetchPriorData();
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while updating time.", {
        position: "top-center",
        theme: "colored",
      });
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div
      className="table-responsive-sm"
      style={{ paddingLeft: "140px", paddingRight: "60px" }}
    >
      {loading ? <LoadingPage /> : ( 
        <table border="2" className="table table-striped table-bordered">
          <thead className="head">
            <tr className="table-danger table-striped">
              <th>CHECKIN</th>
              <th>CHECKOUT</th>
              <th>WORKING HOUR</th>
              <th>DATE</th>
              {/* <th>STATUS</th> */}
              <th>UPDATE</th>
            </tr>
          </thead>
          <tbody className="body">
            {priorData.map((date) => (
              <PriorTimeRow
                key={date.id}
                data={date}
                onUpdate={handleUpdateTime}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

