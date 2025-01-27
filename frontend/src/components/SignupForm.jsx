import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, sendOtp, setSignupData } from "../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SignupForm() {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const { user, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (user && token) {
            navigate("/");
        }
    }, [user, token, navigate]);

    const initialFields = {
        name: "",
        password: "",
        confirmPassword: "",
        email: "",
        contactNumber: "",
        role: "", 
    };

    const onSubmit = async (data) => {
        try {
            dispatch(setSignupData(data));
            const action = await dispatch(sendOtp({ email: data.email }));
            if (action.type === "auth/sendOtp/fulfilled") {
                navigate("/verify-email");
            }
        } catch (error) {
            console.error("Error during submission:", error);
        }
    };

    return (
        <div className="flex-1 mt:mt-0 mt-8 flex flex-col items-center justify-center py-10 h-full lg:w-[fit-content] w-full">
            <div className="flex flex-col items md:w-[50%] w-full">
                <h3 className="md:text-4xl text-2xl font-semibold my-2">Create an account</h3>
                <p className="mb-2 text-whit">Your personal job finder is here</p>
                <form onSubmit={handleSubmit(onSubmit)} className="py-4 w-full mx-auto flex flex-col gap-5">
                    <input
                        placeholder="Name"
                        className="w-full border border-2 border-gray-300 rounded-md py-2 px-2 text-gray-600"
                        {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                    <input
                        placeholder="Email"
                        type="email"
                        className="w-full border border-2 border-gray-300 rounded-md py-2 px-2 text-gray-600"
                        {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                    <input
                        placeholder="Mobile"
                        className="w-full border border-2 border-gray-300 rounded-md py-2 px-2 text-gray-600"
                        {...register("contactNumber", {
                            required: "Mobile number is required",
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Invalid mobile number",
                            },
                        })}
                    />
                    {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber.message}</p>}

                    <div>
                        <input
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            className="w-full border border-2 border-gray-300 rounded-md py-2 px-2 text-gray-600"
                            {...register("password", { required: "Password is required" })}
                        />
                    </div>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                    <input
                        placeholder="Confirm Password"
                        type="password"
                        className="w-full border border-2 border-gray-300 rounded-md py-2 px-2 text-gray-600"
                        {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: (value) =>
                                value === watch("password") || "Passwords do not match",
                        })}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

                    {/* Role Selection - Visual UI */}
                    <div className="flex gap-5 mt-4">
                        <div
                            onClick={() => reset({ ...watch(), role: 'Recruiter' })}
                            className={`flex justify-center items-center w-full py-3 px-5 rounded-md cursor-pointer transition-colors duration-300 ease-in-out
                            ${watch("role") === "Recruiter" ? "bg-black text-white" : "bg-gray-200 text-gray-700 hover:bg-blue-100"}`}
                        >
                            Recruiter
                        </div>
                        <div
                            onClick={() => reset({ ...watch(), role: 'User' })}
                            className={`flex justify-center items-center w-full py-3 px-5 rounded-md cursor-pointer transition-colors duration-300 ease-in-out
                            ${watch("role") === "User" ? "bg-black text-white" : "bg-gray-200 text-gray-700 hover:bg-blue-100"}`}
                        >
                            User
                        </div>
                    </div>
                    {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}

                    <button className="font-semibold bg-red-400 text-white w-[fit-content] rounded-md py-2 px-4 mt-5">
                        Create Account
                    </button>
                    <span className="text-sm text-[#525252]">
                        Already have an account? <Link to="/login" className="font-bold cursor-pointer">Sign in</Link>
                    </span>
                </form>
            </div>
        </div>
    );
}
