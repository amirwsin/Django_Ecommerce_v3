import axiosInstance from "../axios/axios";

export const DeleteUserAddressApi = async (id) => {
    return await axiosInstance.delete(`/api/user/address/${id}/`,).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err)
    })
}

export const ChangeUserAddressDefaultApi = async (id) => {
    return await axiosInstance.patch(`/api/user/address/${id}/`,).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err)
    })
}

export const UpdateUserAddressApi = async (id, data) => {
    return await axiosInstance.put(`/api/user/address/${id}/`, {data}).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err)
    })
}

export const CreateUserAddressApi = async (id, data) => {
    return await axiosInstance.post(`/api/user/address/${id}/`, {data}).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err)
    })
}

export const GetUserAddressApi = async (id) => {
    return await axiosInstance.get(`/api/user/address/${id}/`,).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err)
    })
}

export const UpdateUserApi = async (data) => {
    return await axiosInstance.patch(`/api/user/update/${data.id}/`, {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name
    }).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err)
    })
}