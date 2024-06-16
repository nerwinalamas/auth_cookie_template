import { create } from "zustand";
// import { useCookies } from "react-cookie";

const useAuthStore = create((set) => {
    // const [cookies, setCookie, removeCookie] = useCookies(["token", "refreshToken"]);

    return {
        user: null,
        isAuthenticated: false,

        setUser: (user) => set((state) => ({ ...state, user })),
        setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

        // getAccessToken: () => cookies.token,
        // getRefreshToken: () => cookies.refreshToken,

        resetAuth: () => {
            // removeCookie("token");
            // removeCookie("refreshToken");
            set({ user: null, isAuthenticated: false });
        },
    };
});

export default useAuthStore;
