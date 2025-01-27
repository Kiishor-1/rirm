import AddJobImage from '../assets/images/AddJobImage.png';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { createJob } from '../slices/jobSlice';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';

export default function AddJob() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [skills, setSkills] = useState([]);
    const [currentSkill, setCurrentSkill] = useState(""); 
    const [responsibilities, setResponsibilities] = useState([]); 
    const [currentResponsibility, setCurrentResponsibility] = useState(""); 

    const {toggleSidebar} = useOutletContext();

    const initialFields = {
        title: "",
        company: "",
        logoUrl: "",
        salary: {
            from: "",
            to: "",
        },
        jobType: "",
        site: "",
        location: "",
        vacancies: "",
        description: "",
        about: "",
        duration: "",
        additionalInformation: "",
        aboutJob: {
            description: "", 
            responsibility: []
        }
    };

    const onSubmit = (data) => {
        const formData = {
            ...data,
            salary: {
                from: Number(data.salary.from),
                to: Number(data.salary.to),
            },
            vacancies: Number(data.vacancies),
            skills: skills, 
            duration: Number(data.duration),
            aboutJob: {
                description: data.aboutJob.description,
                responsibility: responsibilities 
            }
        };

        dispatch(createJob(formData)).then((result) => {
            if (result.type === 'jobs/createJob/fulfilled') {
                toast.success('Job added successfully');
                reset(initialFields);
                navigate("/");
            }
        });
    };

    const handleAddSkill = () => {
        if (currentSkill && !skills.includes(currentSkill)) {
            setSkills([...skills, currentSkill]);
            setCurrentSkill("");
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const handleAddResponsibility = () => {
        if (currentResponsibility && !responsibilities.includes(currentResponsibility)) {
            setResponsibilities([...responsibilities, currentResponsibility]);
            setCurrentResponsibility("");
        }
    };

    const handleRemoveResponsibility = (responsibilityToRemove) => {
        setResponsibilities(responsibilities.filter(resp => resp !== responsibilityToRemove));
    };

    const goBack = ()=>{
        navigate(-1);
    }

    return (
        <div className="h-screen flex lg:flex-row flex-col">
            <div className="h-full w-full overflow-y-auto" id='add_job_form'>
                <div className="container px-4 relative">
                    <button onClick={goBack} className='md:text-4xl text-2xl w-full text-start py-4 mb-4 font-semibold my-3 sticky top-0 bg-white flex items-center gap-4'>
                        <FaBars className="md:hidden block" onClick={toggleSidebar}/>
                        Add Job Description
                    </button>
                    <form onSubmit={handleSubmit(onSubmit)} className='mx-auto gap-3 w-full py-3'>
                        {/* Existing fields remain unchanged */}
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
                            <label className="w-1/2 font-semibold" htmlFor="duration">Duration (in months)</label>
                            <div className="w-full">
                                <input
                                    id='duration'
                                    placeholder='Enter duration in months'
                                    className='w-full border border-2 border-gray-300 rounded-md py-1 px-2 text-gray-600'
                                    name='duration'
                                    type="number"
                                    {...register("duration", { required: "required" })}
                                />
                                {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
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
                            <label className="w-1/2 font-semibold" htmlFor="aboutJob.description">About Job</label>
                            <div className="w-full">
                                <textarea
                                    id='aboutJob.description'
                                    placeholder='Type about the job'
                                    className='w-full border border-2 border-gray-300 rounded-md py-1 px-2 text-gray-600'
                                    name='aboutJob.description'
                                    {...register("aboutJob.description", { required: "required" })}
                                ></textarea>
                                {errors['aboutJob.description'] && <p className="text-red-500 text-sm">{errors['aboutJob.description'].message}</p>}
                            </div>
                        </div>
                        <div className="flex gap-3 my-2">
                            <label className="w-1/2 font-semibold" htmlFor="responsibility">Responsibilities</label>
                            <div className="w-full">
                                <input
                                    id='responsibility'
                                    placeholder='Enter a responsibility'
                                    className='w-full border border-2 border-gray-300 rounded-md py-1 px-2 text-gray-600'
                                    type="text"
                                    value={currentResponsibility}
                                    onChange={(e) => setCurrentResponsibility(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="mt-2 bg-red-500 text-white rounded px-2 py-1"
                                    onClick={handleAddResponsibility}
                                >
                                    Add Responsibility
                                </button>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {responsibilities.map((responsibility) => (
                                        <div key={responsibility} className="flex items-center bg-gray-200 rounded-md px-2 py-1">
                                            <span>{responsibility}</span>
                                            <button
                                                type="button"
                                                className="ml-2 text-red-500"
                                                onClick={() => handleRemoveResponsibility(responsibility)}
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Add Skills Section */}
                        <div className="flex gap-3 my-2">
                            <label className="w-1/2 font-semibold" htmlFor="skills">Skills</label>
                            <div className="w-full">
                                <input
                                    id='skills'
                                    placeholder='Enter a skill'
                                    className='w-full border border-2 border-gray-300 rounded-md py-1 px-2 text-gray-600'
                                    type="text"
                                    value={currentSkill}
                                    onChange={(e) => setCurrentSkill(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="mt-2 bg-red-500 text-white rounded px-2 py-1"
                                    onClick={handleAddSkill}
                                >
                                    Add Skill
                                </button>
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
                            <button type="submit" className="bg-red-600 text-white rounded-md py-2 px-4">
                                Add Job
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {/* <div className="relative h-screen lg:w-[fit-content] w-full lg:block hidden">
                <img className='h-full object-cover object-center ' src={AddJobImage} alt="Register page image" />
                <p className='absolute top-[4rem] left-[2.2rem] text-4xl font-bold text-white'>Recruiter add job details here</p>
            </div> */}
        </div>
    );
}
