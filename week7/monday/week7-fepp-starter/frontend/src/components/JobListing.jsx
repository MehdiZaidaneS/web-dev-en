import { Link } from "react-router-dom";

const JobListing = ({ job }) => {
  return (
    <div className="job-preview">
      <Link to={`/jobs/${job.id}`}>
        <h2>{job.title}</h2>
      </Link>
      <p><strong>Type:</strong> {job.type}</p>
      <p><strong>Description:</strong> {job.description}</p>

      <p><strong>Name:</strong> {job.company?.name}</p>
         <p><strong>Email:</strong> {job.company?.contactEmail}</p>
        <p><strong>Phone:</strong> {job.company?.contactPhone}</p>
      
    </div>
  );
};

export default JobListing;