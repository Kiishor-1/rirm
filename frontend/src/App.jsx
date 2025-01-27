import { Routes, Route, useLocation } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
import ShowJob from "./pages/ShowJob";
import AddJob from "./pages/AddJob";
import "@fontsource/dm-sans";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/400-italic.css";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import EditJob from "./pages/EditJob";
import VerifyEmail from "./pages/VerifyEmail";
import RecruiterBoard from "./pages/RecruiterBoard";
import JobDetails from "./components/Recruiter/JobDetails";
import UserJobs from "./pages/UserJobs";
import { useSelector } from "react-redux";
import JobAlertForm from "./components/Recruiter/JobAlertForm";
import Navbar from "./components/Navbar";
import JobApplications from "./pages/JobApplications";

export default function App() {
  const { user, token, role } = useSelector((state) => state.auth);
  const location = useLocation();

  const hideNavbarPaths = ["/login", "/register"];

  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <div className="relative">
      {showNavbar && role !== "Recruiter" && (
        <div className="sticky top-0 z-[11]">
          <Navbar />
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        {role !== "Recruiter" && (
          <>
            <Route path="/jobs/:id" element={<ShowJob />} />
          </>
        )}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/dashboard" element={<RecruiterBoard />}>
          <Route index element={<UserJobs />} />
          <Route path="new" element={<AddJob />} />
          <Route path="jobs/:id/edit" element={<EditJob />} />
          <Route path="jobs/:id/view" element={<ShowJob />} />
          <Route path="send-alert" element={<JobAlertForm />} />
          <Route path="applications" element={<JobApplications />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
