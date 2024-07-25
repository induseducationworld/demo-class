import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import BASE_URL from "../../config";
import "./admin.css";

// Utility function for fetching registrations
const fetchRegistrations = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/students/registrations`);
    return response.data;
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return [];
  }
};

// Utility function for downloading CSV
const downloadCSV = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/students/downloadExcel`, {
      responseType: "blob",
    });
    const blob = new Blob([response.data], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "students.csv";
    link.click();
  } catch (error) {
    console.error("Error downloading CSV:", error);
  }
};

const AdminWrapper = () => {
  const [registrations, setRegistrations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRegistrations, setFilteredRegistrations] = useState([]);

  useEffect(() => {
    const loadRegistrations = async () => {
      const data = await fetchRegistrations();
      setRegistrations(data);
      setFilteredRegistrations(data);
    };

    loadRegistrations();
  }, []);

  useEffect(() => {
    const filterData = () => {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filteredData = registrations.filter(
        (registration) =>
          registration.name.toLowerCase().includes(lowercasedQuery) ||
          registration.email.toLowerCase().includes(lowercasedQuery) ||
          registration.phone.includes(lowercasedQuery)
      );
      setFilteredRegistrations(filteredData);
    };

    filterData();
  }, [searchQuery, registrations]);

  return (
    <section className="about-us-section home-secound">
      <Container fluid className="mt-5">
        <Row>
          <Col md={3} className="sidebar-col">
            <Sidebar />
          </Col>
          <Col md={9} className="content-col">
            <div className="admin-content">
              <Container className="admin-wrapper mt-5">
                <Row className="mb-4">
                  <Col>
                    <h2>Registrations</h2>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      placeholder="Search by name, email, or phone"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </Col>
                  <Col md={4} className="text-right">
                    <Button onClick={downloadCSV} className="btn btn-primary">
                      Download CSV
                    </Button>
                  </Col>
                </Row>

                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Class</th>
                      <th>Stream</th>
                      <th>Batch</th>
                      <th>Confirm Droppers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRegistrations.map((registration) => (
                      <tr key={registration._id}>
                        <td>{registration.name}</td>
                        <td>{registration.email}</td>
                        <td>{registration.phone}</td>
                        <td>{registration.selectedClass}</td>
                        <td>{registration.selectedStream || "N/A"}</td>
                        <td>{registration.selectedBatch}</td>
                        <td>{registration.confirmDroppers ? "Yes" : "No"}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AdminWrapper;
