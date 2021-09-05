import apiClient from "../api/apiClient";

export const ProductService = {
    getAllProducts: () => apiClient().get("product/"),
    getSingleProduct: (productId) => apiClient().get(`/product/${productId}`),
    createProduct: (data) => apiClient().post("product/", data),
    deleteProduct: (productId) => apiClient().delete(`/product/${productId}`),
}
