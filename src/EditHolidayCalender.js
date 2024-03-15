import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Form,
  Button,
  Modal,
  FormControl,
} from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


function HolidayCalender() {
  const token = localStorage.getItem("response-token");
  const [holiday, setHoliday] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchedHoliday, setSearchedHoliday] = useState(null);
  const [newHolidayName, setNewHolidayName] = useState("");
  const [newHolidayDate, setNewHolidayDate] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [id, setEditHolidayId] = useState("");
  const [editHolidayName, setEditHolidayName] = useState("");
  const [editHolidayDate, setEditHolidayDate] = useState("");

  useEffect(() => {
    fetchHolidayData();
  }, []);

  const fetchHolidayData = () => {
    axios
      .get(`/apigateway/hrms/holiday/getHolidayCalendar`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        console.log(token);
        setHoliday(response.data);
        toast.success("Data found successfully!", {
          position: "top-center",
          theme: "colored",
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error occurred, please try again later.", {
          position: "top-center",
          theme: "colored",
        });
      });
  };

  const handleSearch = () => {
    const searchedHoliday = holiday.find((h) => h.hid === parseInt(searchId));
    setSearchedHoliday(searchedHoliday);
  };

  const handleSaveHoliday = () => {
    const newHoliday = {
      holidayName: newHolidayName,
      date: newHolidayDate,
    };

    axios
      .post(
        `/apigateway/hrms/holiday/saveHolidayDate?holidayName=${newHolidayName}&date=${newHolidayDate}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        toast.success("Holiday saved successfully!", {
          position: "top-center",
          theme: "colored",
        });
        fetchHolidayData(); // Refresh the holiday data after saving
        setNewHolidayName("");
        setNewHolidayDate("");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error occurred while saving the holiday.", {
          position: "top-center",
          theme: "colored",
        });
      });
  };

  const handleEdit = (holidayId, holidayName, holidayDate) => {
    setEditHolidayId(holidayId);
    setEditHolidayName(holidayName);
    setEditHolidayDate(holidayDate);
    setEditModalOpen(true);
  };

  const handleUpdate = () => {
    const updatedHoliday = {
      holidayName: editHolidayName,
      date: editHolidayDate,
    };

    axios
      .put(
        `/apigateway/hrms/holiday/updateHolidayCalendar/${id}?holidayName=${editHolidayName}&date=${editHolidayDate}
        `,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        toast.success("Holiday updated successfully!", {
          position: "top-center",
          theme: "colored",
        });
        fetchHolidayData(); // Refresh the holiday data after updating
        setEditModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error occurred while updating the holiday.", {
          position: "top-center",
          theme: "colored",
        });
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`/apigateway/hrms/holiday/deleteHolidayById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Holiday deleted successfully!", {
          position: "top-center",
          theme: "colored",
        });
        fetchHolidayData(); // Refresh the holiday data after deleting
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error occurred while deleting the holiday.", {
          position: "top-center",
          theme: "colored",
        });
      });
  };

  return (
    <div><nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>>'" }}>
    <ol className="breadcrumb" style={{  color: "white" }}>
    
        <li className="breadcrumb-item"><Link to="/">Home</Link> </li>
        <li className="breadcrumb-item"><a href="">Employee Services</a></li>
        <li className="breadcrumb-item active" aria-current="page">Edit Holiday Calender</li>
    </ol>
</nav>
    <div style={{ margin: "100px 100px", height: "562px" }}>
      <h1 className="Heading1">Holiday Calendar</h1>
      <Container>
        <Form>
          <Form.Group controlId="newHolidayName">
            <Form.Label>New Holiday Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter holiday name"
              value={newHolidayName}
              onChange={(e) => setNewHolidayName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="newHolidayDate">
            <Form.Label>New Holiday Date:</Form.Label>
            <Form.Control
              type="date"
              placeholder="Select holiday date"
              value={newHolidayDate}
              onChange={(e) => setNewHolidayDate(e.target.value)}
            />
          </Form.Group>
          <Button variant="outline-primary" onClick={handleSaveHoliday}>
            Save Holiday
          </Button>
          <br />
          <br />
        </Form>

        <Form>
          <Form.Group controlId="searchId">
            <Form.Label>Search by Holiday ID:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Holiday ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </Form.Group>
          <Button variant="outline-primary" onClick={handleSearch}>
            Search
          </Button>
          <br />
          <br />
        </Form>
        <Table striped bordered hover className="custom-table">
          <thead>
            <tr>
              <th>Holiday_ID</th>
              <th>Holiday_Name</th>
              <th>Date</th>
              <th>Month</th>
              <th>Day</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {searchedHoliday ? (
              <tr>
                <td>{searchedHoliday.hid}</td>
                <td>{searchedHoliday.holidayName}</td>
                <td>{searchedHoliday.date}</td>
                <td>{searchedHoliday.month}</td>
                <td>{searchedHoliday.day}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    onClick={() =>
                      handleEdit(
                        searchedHoliday.hid,
                        searchedHoliday.holidayName,
                        searchedHoliday.date
                      )
                    }
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(searchedHoliday.hid)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ) : (
              holiday.map((holiday, index) => (
                <tr key={index}>
                  <td>{holiday.hid}</td>
                  <td>{holiday.holidayName}</td>
                  <td>{holiday.date}</td>
                  <td>{holiday.month}</td>
                  <td>{holiday.day}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      onClick={() =>
                        handleEdit(
                          holiday.hid,
                          holiday.holidayName,
                          holiday.date
                        )
                      }
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDelete(holiday.hid)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>

      <Modal show={editModalOpen} onHide={() => setEditModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Holiday</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="editHolidayName">
            <Form.Label>Holiday Name</Form.Label>
            <FormControl
              type="text"
              value={editHolidayName}
              onChange={(e) => setEditHolidayName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="editHolidayDate">
            <Form.Label>Date</Form.Label>
            <FormControl
              type="date"
              value={editHolidayDate}
              onChange={(e) => setEditHolidayDate(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setEditModalOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="outline-primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
   </div>
  );
}

export default HolidayCalender;
