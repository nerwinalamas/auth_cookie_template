import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getUser,
    loginUser,
    logoutUser,
    refreshToken,
    registerUser,
} from "../api/auth";
import useAuthStore from "../store/useAuth";

export const useRegisterUserMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ firstName, lastName, email, password }) =>
            registerUser(firstName, lastName, email, password),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
    });
};

export const useLoginUserMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ email, password }) => loginUser(email, password),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
    });
};

export const useLogoutUserMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
    });
};

export const useRefreshTokenMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: refreshToken,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
    });
};
