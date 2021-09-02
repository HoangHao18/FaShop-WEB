import apiClient from "../api/apiClient";

export const CategoryService = {
    getAllCategories: () => apiClient().get("category/"),
    createCategory: ({ name, description }) => apiClient().post("category/", { name, description }),
    deleteCategory: (categoryId) => apiClient().delete(`/category/${categoryId}`),
    getSingleCategory: (categoryId) => apiClient().get(`/category/${categoryId}`),
    editCategory: (categoryId,{ name, description }) => apiClient().patch(`/category/${categoryId}`, { name, description }),
}

