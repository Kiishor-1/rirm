import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "../slices/jobSlice";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const dispatch = useDispatch();
    const { allJobs, isLoading, error } = useSelector((state) => state.jobs);
    const navigate = useNavigate();
    const { user, token, role } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user && token) {
            if (role === 'Recruiter') navigate('/dashboard');
        }
    }, [user, token, role, navigate]);

    console.log(role);

    const [filteredJobs, setFilteredJobs] = useState([]);
    const [filters, setFilters] = useState(() => {
        const savedFilters = localStorage.getItem("filters");
        return savedFilters ? JSON.parse(savedFilters) : {
            salary: 500000,
            type: "",
            experience: "",
            search: "",
        };
    });

    useEffect(() => {
        dispatch(getAllJobs());
    }, [dispatch]);
    useEffect(() => {
        const applyFilters = () => {
            const { salary, type, experience, search } = filters;

            const filtered = allJobs.filter((job) => {
                const matchesSalary =
                    salary === "" || (job.salary?.to && job.salary.to <= parseInt(salary, 10));
                const matchesType =
                    type === "" || job.jobType.toLowerCase() === type.toLowerCase();
                const matchesExperience =
                    experience === "" ||
                    job?.experience.toLowerCase() === experience.toLowerCase();
                const matchesSearch =
                    search === "" ||
                    job.title.toLowerCase().includes(search.toLowerCase()) ||
                    job.location.toLowerCase().includes(search.toLowerCase());

                return (
                    matchesSalary && matchesType && matchesExperience && matchesSearch
                );
            });

            setFilteredJobs(filtered);
        };

        applyFilters();
    }, [allJobs, filters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        localStorage.setItem("filters", JSON.stringify(newFilters));
    };

    const clearFilters = () => {
        const defaultFilters = {
            salary: 500000,
            type: "",
            experience: "",
            search: "",
        };
        setFilters(defaultFilters);
        localStorage.setItem("filters", JSON.stringify(defaultFilters));
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="relative">
            <div className="relative flex md:flex-row flex-col gap-4 max-w-[1200px mx-auto px-4 py-8">
                {/* Sidebar for Filters */}
                <aside className="sticky md:top-[6rem] h-[fit-content] md:w-1/4 w-full p-4 bg-gray-100 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Filters</h2>
                    {/* Salary Filter */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Max Salary: ₹{filters.salary}</label>
                        <input
                            type="range"
                            name="salary"
                            value={filters.salary}
                            onChange={handleFilterChange}
                            className="w-full"
                            min="0"
                            max="10000000" // Set max value for salary
                            step="5000" // Step increment for slider
                        />
                    </div>
                    {/* Job Type Filter */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Job Type</label>
                        <select
                            name="type"
                            value={filters.type}
                            onChange={handleFilterChange}
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value="">Select Type</option>
                            <option value="Full-Time">Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Freelance">Freelance</option>
                        </select>
                    </div>
                    {/* Experience Filter */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Experience Level</label>
                        <select
                            name="experience"
                            value={filters.experience}
                            onChange={handleFilterChange}
                            className="w-full border rounded-lg px-3 py-2"
                        >
                            <option value="">Select Experience</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Expert">Expert</option>
                        </select>
                    </div>
                    {/* Clear Filters Button */}
                    <button
                        className="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </button>
                </aside>

                {/* Main Section */}
                <main className="md:w-3/4 w-full">
                    {/* Search Bar */}
                    <div className="mb-6">
                        <input
                            type="text"
                            name="search"
                            value={filters.search}
                            onChange={handleFilterChange}
                            placeholder="Search by title or location..."
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                    {/* Job Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job, id) => <JobCard key={id} job={job} />)
                        ) : (
                            <p className="col-span-full text-center">No jobs found.</p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
