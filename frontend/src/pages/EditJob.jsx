import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import EditJobImage from '../assets/images/AddJobImage.png';
import { getJobById, updateJob } from "../slices/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";

export default function EditJob() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams(); // Get job ID from URL params
    const [skills, setSkills] = useState([]);
    const {toggleSidebar} = useOutletContext();

    const { currentJob, isLoading, error } = useSelector((state) => state.jobs); 
    const { user, token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (id) {
            dispatch(getJobById(id)); 
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (!user || !token) {
            navigate("/");
        }
        if (user && currentJob) {
            const isAuthor = currentJob.author === user._id;
            if (!isAuthor) {
                navigate('/');
            }
        }
    }, [user, currentJob, navigate, token]);


    useEffect(() => {
        if (currentJob) {
            setValue("title", currentJob.title);
            setValue("company", currentJob.company);
            setValue("logoUrl", currentJob.logoUrl);
            setValue("salary.from", currentJob.salary?.from);
            setValue("salary.to", currentJob.salary?.to);
            setValue("jobType", currentJob.jobType);
            setValue("experience", currentJob?.experience);
            setValue("site", currentJob.site);
            setValue("location", currentJob.location);
            setValue("vacancies", currentJob.vacancies);
            setValue("description", currentJob.description);
            setValue("about", currentJob.about);
            setValue("additionalInformation", currentJob.additionalInformation);
            setSkills(currentJob.skills || []);
        }
    }, [currentJob, setValue]);
    const onSubmit = async (data) => {
        const updatedData = {
            ...data,
            salary: {
                from: Number(data.salary.from),
                to: Number(data.salary.to),
            },
            vacancies: Number(data.vacancies),
            skills: skills,
        };

        dispatch(updateJob({ id, jobData: updatedData }))
            .unwrap()
            .then(() => {
                toast.success('Job updated successfully');
                navigate(`/dashboard/jobs/${id}/view`);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleAddSkill = (skill) => {
        if (skill && !skills.includes(skill)) {
            setSkills([...skills, skill]);
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const goBack = ()=>{
        navigate(-1);
    }

    if (isLoading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error}</p>;

    return (
        <div className="h-screen flex lg:flex-row flex-col">
            <div className="h-full w-full overflow-y-auto" id='edit_job_form'>
                <div className="container px-4 mx-auto relative">
                    <button type="button" onClick={goBack} className='flex items-center gap-4 w-full md:text-4xl text-2xl text-start py-3 my-3 sticky top-0 bg-white'>
                        <FaBars className="block md:hidden" onClick={toggleSidebar}/>
                        Edit Job Description
                    </button>
                    <form onSubmit={handleSubmit(onSubmit)} className='mx-auto gap-3 w-full py-3'>
                        <div className="flex gap-3 my-2">
                            <label className="w-1/2 font-semibold" htmlFor="company">Company Name</label>
                            <div className="w-full">
                                <input
                                    id='company'
                                    placeholder='Enter your company name here'
                                    className='w-full border border-2 border-gray-300 rounded-md py-1 px-2 text-gray-600'
                                    name='company'
                                    type="text"
                                    {...register("company", { required: "required" })}
                                />
                                {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
                            </div>
                        </div>
                        <div className="flex gap-3 my-2">
                            <label className="w-1/2 font-semibold" htmlFor="logoUrl">Add logo URL</label>
                            <div className="w-full">
                                <input
                                    id='logoUrl'
                                    placeholder='Enter the link'
                                    className='w-full border border-2 border-gray-300 rounded-md py-1 px-2 text-gray-600'
                                    name='logoUrl'
                                    type="text"
                                    {...register("logoUrl", { required: "required" })}
                                />
                                {errors.logoUrl && <p className="text-red-500 text-sm">{errors.logoUrl.message}</p>}
                            </div>
                        </div>
                        <div className="flex gap-3 my-2">
                            <label className="w-1/2 font-semibold" htmlFor="title">Job Title</label>
                            <div className="w-full">
                                <input
                                    id='title'
                                    placeholder='Enter Job title'
                                    className='w-full border border-2 border-gray-300 rounded-md py-1 px-2 text-gray-600'
                                    name='title'
                                    type="text"
                                    {...register("title", { required: "required" })}
                                />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                            </div>
                        </div>
                        <div className="flex gap-3 my-2">
                            <label className="w-1/2 font-semibold" htmlFor="vacancies">Openings</label>
                            <div className="w-full">
                                <input
                                    id='vacancies'
                                    placeholder='Enter number of openings'
                                    className='w-full border border-2 border-gray-300 rounded-md py-1 px-2 text-gray-600'
                                    name='vacancies'
                                    type="number"
                                    {...register("vacancies", { required: "required" })}
                                />
                                {errors.vacancies && <p className="text-red-500 text-sm">{errors.vacancies.message}</p>}
                            </div>
                        </div>
                        <div className="flex gap-3 my-2">
                            <label className="w-1/2 font-semibold" htmlFor="salary">Monthly Salary</label>
                            <div className="w-full">
                                <div className="flex items-center gap-3">
                                    <input
                                        id='salary-from'
                                        placeholder='From'
                                        className='w-full border border-2 border-gray-300 rounded-md py-1 px-2 text-gray-600'
                                        name='salary.from'
                                        type="number"
                                        {...register("salary.from", { required: "required" })}
                                    />
                                    <input
                                        id='salary-to'
                                        placeholder='To'
                                        className='w-full border border-2 border-gray-300 rounded-md py-1 px-2 text-gray-600'
                                        name='salary.to'
                                        type="number"
                                        {...register("salary.to", { required: "required" })}
                                    />
                                </div>
                                {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
                            </div>
                        </div>
                        <div className="flex gap-3 my-2">
                            <label className="w-1/2 font-semibold" htmlFor="experience">Experience Level</label>
                            <div className="w-full">
                                <select
                                    id='experience'
                                    className='w-[6rem] border border-2 border-gray-300 rounded-md py-1 px-2 text-gray-600'
                                    name='experience'
                                    {...register("experience", { required: "required" })}
                                >
                                    <option value="">Select</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermidiate">Intermidiate</option>
                                    <option value="Expert">Expert</option>
                                </select>
                                {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
                            </div>
                        </div>
                        <div className="flex gap-3 my-2">
                            <label className="w-1/2 font-semibold" htmlFor="jobType">Job Type</label>
                            <div className="w-full">
                                <select
                                    id='jobType'
                                    className='w-[6rem] border border-2 border-gray-300 rounded-md py-1 px-2 text-gray-600'
                                    name='jobType'
                                    {...register("jobType", { required: "required" })}
                                >
                                    <option value="">Select</option>
                                    <option value="Full-Time">Full Time</option>
                                    <option value="Part-Time">Part Time</option>
                                    <option value="Freelance">Freelance</option>
                                </select>
                                {errors.jobType && <p className="text-red-500 text-sm">{errors.jobType.message}</p>}
                            </div>
                        </div>
                        <div className="flex justify-start gap-3 my-2">
                            <label className="w-1/2 font-semibold" htmlFor="site">Remote/Office</label>
                            <div className="w-full">
                                <select
                                    id='site'
                                    className='w-[6rem] border border-2 border-gray-300 rounded-md py-1 px-2 text-gray-600'
                                    name='site'
                                    {...register("site", { required: "required" })}
                                >
                                    <option value={""}>Select</option>
                                    <option value={"Onsite"}>Onsite</option>
                                    <option value={"Remote"}>Remote</option>
                                </select>
                                {errors.site && <p className="text-red-500 text-sm">{errors.site.message}</p>}
                            </div>
                        </div>
                        <div className="flex gap-3 my-2">
                            <label className="w-1/2 font-semibold" htmlFor="location">Location</label>
                            <div className="w-full">
                                <input
                                    id='location'
                                    placeholder='Enter location'
                                    className='w-full border border-2 border-gray-300 rounded-md py-1 px-2 text-gray-600'
                                    name='location'
                                    type="text"
                                    {...register("location", { required: "required" })}
                                />
                                {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                            </div>
                        </div>
                        <div className="flex gap-3 my-2">
                            <label className="w-1/2 font-semibold" htmlFor="description">Job Description</label>
                            <div className="w-full">
                                <textarea
                                    id='description'
                                    placeholder='Type the job description'
                                    className='w-full border border-2 border-gray-300 rounded-md py-1 px-2 text-gray-600'
                                    name='description'
                                    {...register("description", { required: "required" })}
                                ></textarea>
                                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                            </div>
                        </div>
                        <div className="flex gap-3 my-2">
                            <label className="w-1/2 font-semibold" htmlFor="about">About Company</label>
                            <div className="w-full">
                                <textarea
                                    id='about'
                                    placeholder='Type about your company'
                                    className='w-full border border-2 border-gray-300 rounded-md py-1 px-2 text-gray-600'
                                    name='about'
                                    {...register("about", { required: "required" })}
                                ></textarea>
                                {errors.about && <p className="text-red-500 text-sm">{errors.about.message}</p>}
                            </div>
                        </div>
                        <div className="flex gap-3 my-2">
                            <label className="w-1/2 font-semibold" htmlFor="skills">Skills</label>
                            <div className="w-full">
                                <input
                                    id='skills'
                                    placeholder='Add a skill'
                                    className='w-full border border-2 border-gray-300 rounded-md py-1 px-2 text-gray-600'
                                    type="text"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault(); // Prevent form submission
                                            handleAddSkill(e.target.value); // Add skill on Enter key
                                            e.target.value = ''; // Clear input field
                                        }
                                    }}
                                />
                                {errors.skills && <p className="text-red-500 text-sm">{errors.skills.message}</p>}
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {skills.map((skill) => (
                                        <div key={skill} className="flex items-center bg-gray-200 rounded-md px-2 py-1">
                                            <span>{skill}</span>
                                            <button
                                                type="button"
                                                className="ml-2 text-red-500"
                                                onClick={() => handleRemoveSkill(skill)}
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 my-2">
                            <label className="w-1/2 font-semibold" htmlFor="additionalInformation">Additional Information</label>
                            <div className="w-full">
                                <textarea
                                    id='additionalInformation'
                                    placeholder='Any additional information about the job'
                                    className='w-full border border-2 border-gray-300 rounded-md py-1 px-2 text-gray-600'
                                    name='additionalInformation'
                                    {...register("additionalInformation", { required: "required" })}
                                ></textarea>
                                {errors.additionalInformation && <p className="text-red-500 text-sm">{errors.additionalInformation.message}</p>}
                            </div>
                        </div>
                        <div className="flex justify-center float-right pb-4">
                            <button type="submit" className="bg-blue-600 text-white rounded-md py-2 px-4">
                                Update Job
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {/* <div className="relative h-screen lg:w-[fit-content] w-full lg:block hidden" >
                <img
                    className='h-full object-cover object-center '
                    src={EditJobImage}
                    alt="Edit page image"
                />
                <p className='absolute top-[4rem] left-[2.2rem] text-4xl font-bold text-white'>Recruiter add job details here</p>
            </div> */}
        </div>
    );
}
