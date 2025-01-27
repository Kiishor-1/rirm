import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../slices/authSlice";
import { useEffect, useState } from "react";
import { isValidCredentials } from "../utils/isValidCredentials";
import toast from "react-hot-toast";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { token, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

    useEffect(() => {
        if (user && token) {
            navigate("/");
        }
    }, [user, token, navigate]);

    const initialFields = {
        email: "",
        password: "",
    };

    const onSubmit = async (data) => {
        console.log(data);
        reset(initialFields);
        const newErrors = {};
        if (!data.email) newErrors.email = "Email is required";
        if (!data.password) {
            newErrors.password = "Password is required";
        } else if (!isValidCredentials(data.password, data.email)) {
            return;
        }

        const firstError = Object.values(newErrors)[0];
        if (firstError) {
            toast.error(firstError);
        }
        await dispatch(login(data));
        navigate("/");
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center py-10 h-full lg:w-[fit-content] w-full">
            <div className="flex flex-col items max-w-[500px] mx-auto">
                <h3 className="md:text-4xl text-2xl font-semibold my-2">Already have an account</h3>
                <p className="mb-2 text-[#525252]">Your personal job finder is here</p>
                <form onSubmit={handleSubmit(onSubmit)} className="py-4 mx-auto flex flex-col gap-5 w-full">
                    <input
                        placeholder="Email"
                        className="w-full border border-2 border-gray-300 rounded-md py-2 px-2 text-gray-600"
                        name="email"
                        type="email"
                        {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && <p className="text-red-500 text-sm h-1">{errors.email.message}</p>}

                    <div className="relative w-full">
                        <input
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            className="w-full border border-2 border-gray-300 rounded-md py-2 px-2 text-gray-600"
                            name="password"
                            {...register("password", { required: "Password is required" })}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 focus:outline-none"
                        >
                            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm h-1">{errors.password.message}</p>}

                    <button className="font-semibold bg-red-400 text-white w-[fit-content] rounded-md py-2 px-4">Sign in</button>
                    <span className="text-sm text-[#525252]">
                        {`Don't have an account?`} <Link to="/register" className="font-bold cursor-pointer">Signup</Link>
                    </span>
                </form>
            </div>
        </div>
    );
}
