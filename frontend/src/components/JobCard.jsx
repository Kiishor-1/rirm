import { Link } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";

export default function JobCard({ job }) {
  const [imageSrc, setImageSrc] = useState(job?.logoUrl || `https://ui-avatars.com/api/?name=${job?.company}`);

  const handleImageError = () => {
    setImageSrc(`https://ui-avatars.com/api/?name=${job?.company}`);
  };

  return (
    <div className="bg-white rounded-md  p-4 shadow-[1px_1px_15px_pink] flex lg:flex-ro flex-col lg:items-cente items-baseline space-x-4 mb-4">
      {/* Company Logo */}
      <div className="flex items-center gap-2">
        <img
          src={imageSrc}
          alt={job.title}
          className="w-12 h-12 rounded-full"
          onError={handleImageError} 
          title={`${job?.company}`}
        />
        <h3 className="text-xl font-bold">{job.title}</h3>
      </div>

      <div className="flex-1 p-2 flex lg:flex-row flex-col lg:items-center lg:justify-between gap-6 pr-3" style={{ margin: "0" }}>
        <div className="flex-grow">
          <div className="text-gray-500 flex items-center flex-wrap space-x-2 text-sm">
            <span>{job.vacancies} employees</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span>₹{job?.salary?.from}</span>
              <span>-</span>
              <span>₹{job?.salary?.to}</span>
            </span>
            <span>•</span>
            <span>{job.location}</span>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            {Array.isArray(job?.skills) && job?.skills.length > 0 ? (
              job?.skills.map((skill, index) => (
                <span key={index} className="bg-red-100 text-red-600 px-2 py-1 rounded-lg text-xs">{skill}</span>
              ))
            ) : (
              <span className="text-gray-500 text-xs">No skills listed</span>
            )}
          </div>
        </div>

        <div>
          <Link to={`/jobs/${job._id}`} className="bg-red-500 text-white px-4 py-2 rounded-lg">View</Link>
        </div>
      </div>
    </div>
  );
}

JobCard.propTypes = {
  job: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    logoUrl: PropTypes.string,
    salary: PropTypes.shape({
      from: PropTypes.number.isRequired,
      to: PropTypes.number.isRequired
    }).isRequired,
    location: PropTypes.string.isRequired,
    vacancies: PropTypes.number.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};
