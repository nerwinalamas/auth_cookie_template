export const API_URL = import.meta.env.VITE_API_URL;

export const API = {
    // AUTH
    REGISTER: `${API_URL}/register`,
    LOGIN: `${API_URL}/login`,
    LOGOUT: `${API_URL}/logout`,
    REFRESH_TOKEN: `${API_URL}/refresh-token`,
    CURRENT_USER: `${API_URL}/user`,
}