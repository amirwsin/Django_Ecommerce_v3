import axiosInstance from "../axios/axios";


export const getDeliveryList = () => {
    return axiosInstance.get(`/api/checkout/delivery/`).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err)
        return err
    })
}