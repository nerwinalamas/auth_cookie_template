import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
    Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import useAuthStore from "./store/useAuth";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { getUser } from "./api/auth";

const ProtectedOutlet = () => {
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

const AppLayout = () => {
    return (
        <div>
            {/* <Navbar /> */}
            <ProtectedOutlet />
        </div>
    );
};

const App = () => {
    const { setUser, isAuthenticated } = useAuthStore();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (isAuthenticated) {
                    const data = await getUser();
                    setUser(data.data.data)
                    console.log("data app: ", data.data.data)
                }
            } catch (error) {
                console.error('Error fetching user:', error.message);
            }
        };

        fetchUser();
    }, [isAuthenticated, setUser]);

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<AppLayout />}>
                        <Route index element={<Home />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
                <Toaster />
            </Router>
        </div>
    );
};

export default App;
