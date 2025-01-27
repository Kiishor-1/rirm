import AuthImage from '../assets/images/authImage.png';
import SignupForm from '../components/SignupForm';

export default function RegisterPage() {
    return (
        <div className="relative h-screen w-screen flex items-center lg:flex-row flex-col p-2">
            <div className="absolute top-4 left-4 md:text-5xl text-4xl font-semibold">Rirm</div>
            <SignupForm/>
            <div className="relative h-screen lg:w-[fit-content] w-full lg:block hidden" >
                <img
                    className='h-full object-cover object-center '
                    src={AuthImage}
                    alt="Register page image"
                />
                <p className='absolute top-[4rem] left-[4.2rem] text-4xl font-bold text-white'>Your Personal Job Finder</p>
            </div>
        </div>
    );
}
