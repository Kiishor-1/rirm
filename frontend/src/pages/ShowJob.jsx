import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { getJobById } from "../slices/jobSlice";
import { PiMoneyFill } from "react-icons/pi";
import { IoCalendarClear } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { formatDate } from "../utils/dateUtils";
import JobAlertForm from "../components/Recruiter/JobAlertForm";
import { applyForJob, cancelApplication } from "../services/operations/userAPI";
import { FaBars } from "react-icons/fa";

export default function ShowJob() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentJob, isLoading, error } = useSelector((state) => state.jobs);
  const { user, token } = useSelector((state) => state.auth);
  const [isApplied, setIsApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  // Use `useOutletContext` only if the user's role is "Recruiter"
  const toggleSidebar = user?.role === "Recruiter" ? useOutletContext()?.toggleSidebar : null;

  useEffect(() => {
    dispatch(getJobById(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (user && currentJob) {
      setIsApplied(currentJob.applicants?.includes(user?._id));
    }
  }, [user, currentJob]);

  const handleApply = async () => {
    if (!user) {
      toast.error("You need to be logged in to apply for a job.");
      return;
    }

    if (!token) {
      toast.error("Authentication token is missing.");
      return;
    }

    setIsApplying(true);

    try {
      await applyForJob(id, token);
      setIsApplied(true);
      toast.success("Successfully applied for the job!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsApplying(false);
    }
  };

  const handleCancelApplication = async () => {
    if (!user) {
      toast.error("You need to be logged in to cancel your application.");
      return;
    }

    if (!token) {
      toast.error("Authentication token is missing.");
      return;
    }

    try {
      await cancelApplication(id, token);
      setIsApplied(false);
      toast.success("Application canceled successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!currentJob) return null;

  return (
    <div className="relative bg-gray-100 min-h-screen">
      <p className="container sticky top-0 py-8 px-2 md:text-4xl text-2xl bg-gray-100 z-[10] flex items-center gap-4">
        {user?.role === "Recruiter" && toggleSidebar && (
          <FaBars className="md:hidden block" onClick={toggleSidebar} />
        )}
        Job Descriptions
      </p>
      <div className="relative container w-full mx-auto flex md:flex-row flex-col gap-6 px-4 py-6">
        <div className="flex-1 bg-white text-gray-600 p-8 shadow-lg">
          <h2 className="font-bold text-xl mb-4 flex gap-2 items-baseline">
            {currentJob.title}
            <span className="text-xs bg-red-100 rounded-lg px-2 py-1">{currentJob?.experience}</span>
          </h2>
          <p className="text-[0.8rem] flex items-center gap-1 my-3">
            <span>{formatDate(currentJob.postedDate)}</span>
            <span className="text-gray-300">
              <GoDotFill />
            </span>
            <span>{currentJob.jobType}</span>
          </p>
          <span className="text-red-500 text-sm">{currentJob.location}</span>
          <div className="my-6 flex items-center max-w-[300px] gap-4">
            <div className="flex flex-col">
              <PiMoneyFill className="text-gray-600" />
              <span className="text-sm text-gray-600 flex items-center gap-2">
                <span>₹{currentJob?.salary?.from}</span>
                <span>-</span>
                <span>₹{currentJob?.salary?.to}</span>
              </span>
            </div>
            <div className="flex flex-col">
              <IoCalendarClear className="text-gray-600" />
              <span className="text-sm text-gray-600">{currentJob.duration} Months</span>
            </div>
          </div>
          <div className="my-3">
            <h5 className="mb-2 font-semibold">About Company</h5>
            <p className="py-2">{currentJob.about}</p>
          </div>
          <div className="my-3">
            <h5 className="mb-2 font-semibold">About the Job/Internship</h5>
            <p className="my-2 py-2">{currentJob?.aboutJob?.description}</p>
            <div>
              <p>{`Selected candidate's day-to-day responsibilities include:`}</p>
              <ol style={{ listStyleType: "decimal", paddingLeft: "20px" }}>
                {currentJob?.aboutJob?.responsibility.map((item, id) => (
                  <li key={id} className="leading-[1.4]">
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="my-3">
            <p className="font-semibold">Skill(s) required</p>
            <div className="flex items-center gap-2 flex-wrap py-2">
              {currentJob?.skills?.length ? (
                currentJob.skills.map((skill, id) => (
                  <span key={id} className="px-2 py-1 bg-red-100 rounded-full">
                    {skill}
                  </span>
                ))
              ) : (
                <p>No skills required for this job.</p>
              )}
            </div>
          </div>
          <div className="my-3">
            <p className="font-semibold mb-2">Additional Information</p>
            <p>{currentJob.additionalInformation}</p>
          </div>

          {user && user?.role === "User" && (
            <div className="my-6">
              {!isApplied ? (
                <button
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg"
                  onClick={handleApply}
                  disabled={isApplying}
                >
                  {isApplying ? "Applying..." : "Apply for Job"}
                </button>
              ) : (
                <button
                  className="px-6 py-2 bg-red-500 text-white rounded-lg"
                  onClick={handleCancelApplication}
                >
                  Cancel Application
                </button>
              )}
            </div>
          )}
        </div>
        {user?.role === "Recruiter" && (
          <div className="col-span-1 sticky top-0">
            <JobAlertForm jobDetails={currentJob} />
          </div>
        )}
      </div>
    </div>
  );
}
