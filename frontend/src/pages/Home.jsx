import useAuthStore from "../store/useAuth";

const Home = () => {
    const { user, isAuthenticated } = useAuthStore();

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <h2>User Profile</h2>
                    <p>
                        Name: {user && user.firstName} {user && user.lastName}
                    </p>
                    <p>Email: {user && user.email}</p>
                </div>
            ) : (
                <div>
                    <p>User is not authenticated.</p>
                </div>
            )}
        </div>
    );
};

export default Home;
