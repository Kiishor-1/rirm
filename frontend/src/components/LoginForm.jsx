import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom"
import { login } from "../slices/authSlice";
import { useEffect } from "react";

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const {token, user} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(user && token){
            navigate("/");
        }
    },[user,token,navigate]);

    const initialFields = {
        email: "",
        passoword: "",
    };

    const onSubmit = async (data) => {
        console.log(data);
        reset(initialFields);
        await dispatch(login(data));
        navigate("/");
    };
    return (
        <div className="flex-1 flex flex-col items-cente justify-center py-10 h-full lg:w-[fit-content] w-full">
            <div className="flex flex-col items max-w-[500px] mx-auto">
                <h3 className={`md:text-4xl text-2xl font-semibold my-2`}>Already have an account</h3>
                <p className='mb-2 text-[#525252]'>Your personal job finder is here</p>
                <form onSubmit={handleSubmit(onSubmit)} className='py-4 mx-auto flex flex-col gap-5 w-full'>
                    <input
                        placeholder='Email'
                        className='w-full border border-2 border-gray-300 rounded-md py-2 px-2 text-gray-600'
                        name='email'
                        type="email"
                        {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && <p className="text-red-500 text-sm h-1">{errors.email.message}</p>}

                    <input
                        placeholder='Password'
                        className='w-full border border-2 border-gray-300 rounded-md py-2 px-2 text-gray-600'
                        name='password'
                        {...register("password", { required: "Password is required" })}
                    />
                    {errors.username && <p className="text-red-500 text-sm h-1">{errors.username.message}</p>}

                    <button className='font-semibold bg-red-400 text-white w-[fit-content] rounded-md py-2 px-4'>Sign in</button>
                    <span className='text-sm text-[#525252]'>{`Don't have an account`} <Link to="/register" className='font-bold cursor-pointer'>Signup</Link></span>
                </form>
            </div>
        </div>
    )
}
