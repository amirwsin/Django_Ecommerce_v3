import axiosInstance from "../axios/axios";


export const getDeliveryList = async () => {
    return axiosInstance.get(`/api/checkout/delivery/`).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err)
        return err
    })
}

export const GetUserOrderDetail = async (id) => {
    return await axiosInstance.get(`/api/checkout/orders/${id}/`,).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })
}

export const GetUserOrders = async (id, page) => {
    return await axiosInstance.get(`/api/checkout/orders/?user=${id}&page=${page}`,).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })
}