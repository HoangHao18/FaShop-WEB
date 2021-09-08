import apiClient from "../api/apiClient";

export const ProductService = {
    getAllProducts: () => apiClient().get("product/"),
    getSingleProduct: (productId) => apiClient().get(`/product/${productId}`),
    getProductByCategory: (category) => apiClient().get(`/product/filter/${category}`),
    createProduct: (data) => apiClient().post("product/", data),
    deleteProduct: (productId) => apiClient().delete(`/product/${productId}`),
    editProduct: (productId, data) => apiClient().patch(`/product/${productId}`, data),
}
