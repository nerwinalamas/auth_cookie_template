import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateLoginForm } from "../helpers/formValidation";
import { useLoginUserMutation } from "../mutation/auth";
import toast from "react-hot-toast";
import useAuthStore from "../store/useAuth";

const Login = () => {
    const { setIsAuthenticated } = useAuthStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const loginUserMutation = useLoginUserMutation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !validateLoginForm(email, setEmailError, password, setPasswordError)
        )
            return;

        const toastId = toast.loading("Loading");

        loginUserMutation.mutate(
            { email, password },
            {
                onSuccess: (data) => {
                    setIsAuthenticated(data.data.success);
                    toast.success(data.data.message, { id: toastId });
                    navigate("/");
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
                <h2 className="text-center text-2xl font-semibold">Login</h2>
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
                        loginUserMutation.isPending ? "Loading ..." : "Submit"
                    }
                    className={`p-2 border my-2 rounded-sm ${loginUserMutation.isPending ? "bg-black/50 text-white cursor-not-allowed" : "bg-black text-white cursor-pointer"}`}
                    disabled={loginUserMutation.isPending}
                />
                <div className="w-full flex justify-center gap-2">
                    <p>Don't have an account?</p>
                    <Link
                        to="/register"
                        className="hover:underline text-blue-500"
                    >
                        <p>Register</p>
                    </Link>
                </div>
            </form>
        </main>
    );
};

export default Login;
