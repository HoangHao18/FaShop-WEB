import apiClient from "../api/apiClient";

export const AuthService = {
    login:  ({ email, password }) => apiClient().post("auth/login", { email, password }),
}

