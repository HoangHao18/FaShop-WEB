import apiClient from "../api/apiClient";

export const ManufactureService = {
    getAllManufactures: () => apiClient().get("manufacture/"),
    getAllManufacturesName: () => apiClient().get("manufacture//all-name"),
    createManufacture: ({ name, phone, email, address }) => apiClient().post("manufacture/", { name, phone, email, address }),
    deleteManufacture: (manufactureId) => apiClient().delete(`/manufacture/${manufactureId}`),
    getSingleManufacture: (manufactureId) => apiClient().get(`/manufacture/${manufactureId}`),
    editManufacture: (manufactureId,{ name, phone, email, address }) => apiClient().patch(`/manufacture/${manufactureId}`, { name, phone, email, address }),
}

