import axios from "axios";
import { API } from "../constants";

export const registerUser = async (firstName, lastName, email, password) => {
    return await axios.post(API.REGISTER, {
        firstName,
        lastName,
        email,
        password,
    });
};

export const loginUser = async (email, password) => {
    return await axios.post(
        API.LOGIN,
        {
            email,
            password,
        },
        {
            withCredentials: true,
        }
    );
};

export const logoutUser = async () => {
    return await axios.post(
        API.LOGOUT,
        {},
        {
            withCredentials: true,
        }
    );
};

export const refreshToken = async () => {
    return await axios.post(
        API.REFRESH_TOKEN,
        {},
        {
            withCredentials: true,
        }
    );
};

export const getUser = async () => {
    return await axios.get(API.CURRENT_USER, {
        withCredentials: true,
    });
};
