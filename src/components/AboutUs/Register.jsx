import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config";
import batchOptions from "./batches.json";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    selectedClass: "9",
    selectedStream: "",
    selectedBatch: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const streamOptions = ["Science", "Commerce", "Arts"];

  // Determine available batches based on selected class and stream
  const availableBatches =
    formData.selectedClass === "Droppers"
      ? batchOptions["Droppers"] || []
      : formData.selectedClass === "11" || formData.selectedClass === "12"
      ? batchOptions[formData.selectedClass]?.[formData.selectedStream] || []
      : batchOptions[formData.selectedClass] || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAlertMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch(`${BASE_URL}/students/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);

      navigate("/thank-you");

      setFormData({
        name: "",
        number: "",
        email: "",
        selectedClass: "9",
        selectedStream: "",
        selectedBatch: "",
      });
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message || "Failed to register. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="about-resigter-form backgroud-style relative-position">
      <div className="register-content">
        <div className="register-fomr-title text-center">
          <h3 className="bold-font">Free Demo Class.</h3>
          <p>Get yourself registered for Indus's Upcoming batches</p>
        </div>
        {alertMessage && (
          <div className="alert alert-success" role="alert">
            {alertMessage}
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        <form
          className="register-form-area contact_form"
          onSubmit={handleSubmit}
        >
          <div className="contact-info mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="contact-info mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Your Number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="contact-info mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="contact-info mb-3">
            <select
              className="form-control"
              name="selectedClass"
              value={formData.selectedClass}
              onChange={handleChange}
              required
            >
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
              <option value="Droppers">Droppers</option>
            </select>
          </div>
          {(formData.selectedClass === "11" ||
            formData.selectedClass === "12") && (
            <div className="contact-info mb-3">
              <select
                className="form-control"
                name="selectedStream"
                value={formData.selectedStream}
                onChange={handleChange}
                required
              >
                <option value="">Select Stream</option>
                {streamOptions.map((stream, index) => (
                  <option key={index} value={stream}>
                    {stream}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="contact-info mb-3">
            <select
              className="form-control"
              name="selectedBatch"
              value={formData.selectedBatch}
              onChange={handleChange}
              required
            >
              <option value="">Select Batch</option>
              {Array.isArray(availableBatches) &&
                availableBatches.map((batch, index) => (
                  <option key={index} value={batch}>
                    {batch}
                  </option>
                ))}
            </select>
          </div>
          <div className="nws-button text-uppercase text-center white text-capitalize">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "SUBMITTING..." : "SUBMIT REQUEST"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
