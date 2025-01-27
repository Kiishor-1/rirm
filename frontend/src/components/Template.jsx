import { useSelector } from "react-redux"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"


export default function Template() {
    const {signupData} = useSelector((state)=>state.auth)
    console.log(signupData)
    return (
        signupData ? <LoginForm /> : <SignupForm />
    )
}
