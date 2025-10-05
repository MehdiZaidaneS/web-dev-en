import { useEffect, useState } from "react";
import JobListing from "./JobListing";
import { Link } from "react-router-dom";

const JobListings = () => {
  const [jobs, setJobs] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);


   const API_BASE_URL = "http://localhost:4000/api/jobs"

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}`);
        if (!res.ok) {
          throw new Error("Could not fetch jobs");
        }
        const data = await res.json();
        setIsPending(false);
        setJobs(data);
        setError(null);
      } catch (err) {
        setIsPending(false);
        setError(err.message);
      }
    };

    fetchJobs();
  }, [API_BASE_URL]);

  return (
    <div className="job-list">
      {error && <div style={{ color: "red" }}>{error}</div>}
      {isPending && <div>Loading...</div>}
      {jobs && jobs.map((job) => (
        <>
        <JobListing key={job._id} job={job} />
        <Link to={`/jobs/${job.id}`}>View Job</Link>
        </>
      ))}
    </div>
  );
};

export default JobListings;