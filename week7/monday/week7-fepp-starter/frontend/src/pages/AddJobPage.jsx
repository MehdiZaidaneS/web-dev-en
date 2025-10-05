import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJobPage = () => {

  const navigate = useNavigate();

  // Use environment variable for backend URL
  const API_BASE_URL = "http://localhost:4000/api/jobs"

  const [form, setForm] = useState({
    title: "",
    type: "",
    description: "",
    company: {
      name: "",
      contactEmail: "",
      contactPhone: "",
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name in form.company) {
      setForm({
        ...form,
        company: {
          ...form.company,
          [name]: value,
        },
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const addJob = async (body) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_BASE_URL}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Error adding job");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to create job:", error);
      return null;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const result = await addJob(form);
    if (result) {
      // Reset form
      setForm({
        title: "",
        type: "",
        description: "",
        company: {
          name: "",
          contactEmail: "",
          contactPhone: "",
        }
      });

      navigate("/");
    }
  };
  return (
    <div className="create">
      <h2>Add a New Job</h2>
      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input
          type="text"
          required
          name="title"
          value={form.title}
          onChange={handleInputChange}
        />
        <label>Job type:</label>
        <select name="type" value={form.type} onChange={handleInputChange} required >
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea
          name="description" required value={form.description} onChange={handleInputChange}
        ></textarea>
        <label>Company Name:</label>
        <input
           type="text" name="name" required value={form.company.name} onChange={handleInputChange}
        />
        <label>Contact Email:</label>
        <input
          type="email" name="contactEmail" required value={form.company.contactEmail} onChange={handleInputChange}
        />
        <label>Contact Phone:</label>
        <input
          type="text" name="contactPhone" required value={form.company.contactPhone} onChange={handleInputChange}
        />
        <button>Add Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;
