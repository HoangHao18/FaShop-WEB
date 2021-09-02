import apiClient from "../api/apiClient";

export const ProductService = {
    getAllProducts: () => apiClient().get("product/"),
    createProduct: (data) => apiClient().post("product/", data),
    deleteProduct: (productId) => apiClient().delete(`/product/${productId}`),
}
