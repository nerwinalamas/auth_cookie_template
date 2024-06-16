import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateRegistrationForm } from "../helpers/formValidation";
import toast from "react-hot-toast";
import { useRegisterUserMutation } from "../mutation/auth";

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const registerUserMutation = useRegisterUserMutation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !validateRegistrationForm(
                firstName,
                setFirstNameError,
                lastName,
                setLastNameError,
                email,
                setEmailError,
                password,
                setPasswordError
            )
        )
            return;

        const toastId = toast.loading("Loading");

        registerUserMutation.mutate(
            {
                firstName,
                lastName,
                email,
                password,
            },
            {
                onSuccess: (data) => {
                    toast.success(data.data.message, { id: toastId });
                    navigate("/login");
                },
                onError: (error) => {
                    toast.error(error.response.data.message, { id: toastId });
                },
            }
        );
    };

    return (
        <main className="h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-80 flex flex-col gap-1 p-5 rounded-sm bg-slate-200 xl:w-96"
            >
                <h2 className="text-center text-2xl font-semibold">Register</h2>
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => {
                        setFirstName(e.target.value);
                        setFirstNameError("");
                    }}
                    className="p-2 border-2"
                />
                {firstNameError && (
                    <p className="text-red-500 text-xs font-medium">
                        {firstNameError}
                    </p>
                )}
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => {
                        setLastName(e.target.value);
                        setLastNameError("");
                    }}
                    className="p-2 border-2"
                />
                {lastNameError && (
                    <p className="text-red-500 text-xs font-medium">
                        {lastNameError}
                    </p>
                )}
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError("");
                    }}
                    className="p-2 border-2"
                />
                {emailError && (
                    <p className="text-red-500 text-xs font-medium">
                        {emailError}
                    </p>
                )}
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError("");
                    }}
                    className="p-2 border-2"
                />
                {passwordError && (
                    <p className="text-red-500 text-xs font-medium">
                        {passwordError}
                    </p>
                )}
                <input
                    type="submit"
                    value={
                        registerUserMutation.isPending ? "Loading ..." : "Submit"
                    }
                    disabled={registerUserMutation.isPending}
                    className={`p-2 border my-2 rounded-sm ${registerUserMutation.isPending ? "bg-black/50 text-white cursor-not-allowed" : "bg-black text-white cursor-pointer"}`}
                />
                <div className="w-full flex justify-center gap-2">
                    <p>Already have an account?</p>
                    <Link to="/login" className="hover:underline text-blue-500">
                        <p>Login</p>
                    </Link>
                </div>
            </form>
        </main>
    );
};

export default Register;
