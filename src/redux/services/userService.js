import apiClient from "../api/apiClient";

// class UserService {
//     getAllUsers = () => apiClient().get("user/all")
// }

// export default new UserService();

export const UserService = {
    getAllUsers: () => apiClient().get("user/all"),
    getSingleUser: (userId) =>apiClient().get(`/user/${userId}`),
    createUser: (data) => apiClient().post("user/", data),
    deleteUser: (userId) => apiClient().delete(`/user/${userId}`),
    saveCart: (data)=> apiClient().patch("user/savecart",data)
}

// login: ({
//     PhoneNumber,
//     Password
// }) => axios.post('http://207.148.69.136/v1/users/login',{
//     PhoneNumber,
//     Password
// })