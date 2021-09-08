import apiClient from "../api/apiClient";

export const OrderService = {
    getAllOrders: () => apiClient().get("order/"),
    //createOrder: ({ iduseroder, name, phone, address, note, price_total, ship, colors,  productlist } ) => apiClient().post("order/", { iduseroder, name, phone, address, note, price_total, ship, colors,  productlist } ),
    createOrder: (data ) => apiClient().post("order/",data ),
    getSignOrder: (orderId) => apiClient().get(`/order/${orderId}`),
    getOrdersByUserId: (userId) => apiClient().get(`/order/user/${userId}`),
}

