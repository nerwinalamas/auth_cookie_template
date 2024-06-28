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
import { Toaster } from "react-hot-toast";
import useAuthStore from "./store/useAuth";

const ProtectedRoute = () => {
    const user = useAuthStore((state) => state.user);

    return user ? <Outlet /> : <Navigate to="/login" />;
};

const PublicRoute = () => {
    const user = useAuthStore((state) => state.user);

    return user ? <Navigate to="/" /> : <Outlet />;
};

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route element={<PublicRoute />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>

                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<Home />} />
                    </Route>
                </Routes>
                <Toaster />
            </Router>
        </div>
    );
};

export default App;
