import axiosInstance from "../axios/axios";

export const GetAllUsers = async (page) => {
    return await axiosInstance.get(`/api/cms/users/`,).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err)
    })
}

export const GetAllProducts = async (page) => {
    return await axiosInstance.get(`/api/cms/products/`,).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err)
    })
}

export const GetProductById = async (id) => {
    return await axiosInstance.get(`/api/cms/products/${id}/`).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err)
    })
}

export const ProductCreateEdit = async (data) => {
    console.log(data)
    return await axiosInstance.patch(`/api/cms/products/${data.id}/`,data).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err)
    })
}

export const CreateMedia = async (data) => {
    let prepData = new FormData()
    prepData.append("id", data.id)
    prepData.append("image", data.image)
    prepData.append("alt_text", data.alt_text)
    prepData.append("is_feature", data.is_feature)
    prepData.append("product_inventory", data.product_inventory)
    return await axiosInstance.post(`/api/cms/media/`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    },).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err)
    })
}

export const UpdateMedia = async (data) => {
    let prepData = new FormData()
    prepData.append("id", data.id)
    prepData.append("image", data.image)
    if (prepData.get("image").type === "undefined" || prepData.get("image").type === undefined || prepData.get("image").type === null) {
        prepData.delete("image")
    }
    prepData.append("alt_text", data.alt_text)
    prepData.append("is_feature", data.is_feature)
    return await axiosInstance.patch(`/api/cms/media/${data.id}/`, prepData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err)
    })
}
export const DeleteMedia = async (id) => {
    return await axiosInstance.delete(`/api/cms/media/${id}/`).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err)
    })

}

export const GetAllCategories = async () => {
    return await axiosInstance.get(`/api/cms/categories/`).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err)
    })
}

