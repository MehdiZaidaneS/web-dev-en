import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditJobPage = () => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // Environment-aware backend URL
  const API_BASE_URL = "http://localhost:4000/api/jobs";

  // Job form fields
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
 
  // Company fields
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  

  // Fetch job data
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/${id}`);
        if (!res.ok) throw new Error("Failed to fetch job");
        const data = await res.json();

        setJob(data);

        // Populate form fields
        setTitle(data.title);
        setType(data.type);
        setDescription(data.description);

        setCompanyName(data.company.name);
        setContactEmail(data.company.contactEmail);
        setContactPhone(data.company.contactPhone);
      } catch (err) {
        console.error("Failed to fetch job:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, API_BASE_URL]);

  const updateJob = async (updatedJob) => {
   const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedJob),
      });
      if (!res.ok) {
        const message = await res.text();
        throw new Error(message || "Failed to update job");
      }
      return true;
    } catch (err) {
      console.error("Error updating job:", err);
      return false;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const updatedJob = {
      title,
      type,
      description,
      company: {
        name: companyName,
        contactEmail,
        contactPhone,
      },
    };

    const success = await updateJob(updatedJob);
    if (success) {
      navigate(`/jobs/${id}`);
    }
  };

  return (
    <div className="create">
      <h2>Update Job</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <form onSubmit={submitForm}>
          <label>Job Title:</label>
          <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />

          <label>Job Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="">-- Select type --</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>

          <label>Description:</label>
          <textarea required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

          <h3>Company Info</h3>
          <label>Company Name:</label>
          <input type="text" required value={companyName} onChange={(e) => setCompanyName(e.target.value)} />

          <label>Company Email:</label>
          <input type="email" required value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />

          <label>Company Phone:</label>
          <input type="text" required value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />

          <button>Update Job</button>
        </form>
      )}
    </div>
  );
};

export default EditJobPage;