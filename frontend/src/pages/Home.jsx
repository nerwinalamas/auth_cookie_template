import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../mutation/auth";
import useAuthStore from "../store/useAuth";

const Home = () => {
    const { user, logout } = useAuthStore((state) => ({
        user: state.user,
        logout: state.logout,
    }));

    const logoutUserMutation = useLogoutUserMutation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUserMutation.mutateAsync();
            logout();
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error.message);
        }
    };

    return (
        <div>
            <h2>User Profile</h2>
            <p>
                Name: {user && user.firstName} {user && user.lastName}
            </p>
            <p>Email: {user && user.email}</p>
            <button
                onClick={handleLogout}
                className="p-2 rounded-sm text-white bg-red-600"
            >
                Logout
            </button>
        </div>
    );
};

export default Home;
