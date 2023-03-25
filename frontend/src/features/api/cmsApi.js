import axiosInstance from "../axios/axios";

export const GetAllUsers = async (page) => {
    return await axiosInstance.get(`/api/cms/users/`,).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })
}

export const GetAllProducts = async (page) => {
    return await axiosInstance.get(`/api/cms/products/`,).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })
}

export const GetProductById = async (id) => {
    return await axiosInstance.get(`/api/cms/products/${id}/`).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })
}


export const ProductCreate = async (data) => {
    return await axiosInstance.post(`/api/cms/products/`, data).then((res) => {
        return res
    }).catch((err) => {
        return err
    })
}


export const ProductEditById = async (data) => {
    return await axiosInstance.patch(`/api/cms/products/${data.id}/`, data).then((res) => {
        return res
    }).catch((err) => {
        return err
    })
}

export const ProductDelete = async (id) => {
    return await axiosInstance.delete(`/api/cms/products/${id}/`).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })

}

export const ProductInventoryEdit = async (data) => {
    return await axiosInstance.put(`/api/cms/product_inventory/${data.id}/`, data).then((res) => {
        return res
    }).catch((err) => {
        return err
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
        return err
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
        return err
    })
}
export const DeleteMedia = async (id) => {
    return await axiosInstance.delete(`/api/cms/media/${id}/`).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })

}

export const GetAllCategories = async () => {
    return await axiosInstance.get(`/api/cms/categories/`).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })
}
export const CategoryCreate = async (data) => {
    return await axiosInstance.post(`/api/cms/categories/`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })
}
export const CategoryEdit = async (data) => {
    return await axiosInstance.patch(`/api/cms/categories/${data.id}/`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    },).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })
}
export const CategoryDelete = async (id) => {
    return await axiosInstance.delete(`/api/cms/categories/${id}/`,).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })
}


export const GetAllProductTypes = async () => {
    return await axiosInstance.get(`/api/cms/product_types/`).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })
}

export const ProductTypeCreate = async (data) => {
    return await axiosInstance.post(`/api/cms/product_types/`, data).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })
}
export const ProductTypeEdit = async (data) => {
    return await axiosInstance.patch(`/api/cms/product_types/${data.id}/`, data).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })
}
export const ProductTypeDelete = async (id) => {
    return await axiosInstance.delete(`/api/cms/product_types/${id}/`).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })
}


export const GetAllBrands = async () => {
    return await axiosInstance.get(`/api/cms/brands/`).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })
}
export const BrandCreate = async (data) => {
    return await axiosInstance.post(`/api/cms/brands/`, data).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })
}

export const BrandEdit = async (data) => {
    return await axiosInstance.patch(`/api/cms/brands/${data.id}/`, data).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })
}

export const BrandDelete = async (id) => {
    return await axiosInstance.delete(`/api/cms/brands/${id}/`,).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })
}

export const GetAllProductAttributes = async () => {
    return await axiosInstance.get(`/api/cms/product_attribute/`).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })
}
export const ProductAttributesCreate = async (data) => {
    return await axiosInstance.post(`/api/cms/product_attribute/`, data).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })
}

export const ProductAttributesEdit = async (data) => {
    return await axiosInstance.patch(`/api/cms/product_attribute/${data.id}/`, data).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })
}
export const ProductAttributesDelete = async (id) => {
    return await axiosInstance.delete(`/api/cms/product_attribute/${id}/`).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })
}


export const GetAllProductAttributeValue = async () => {
    return await axiosInstance.get(`/api/cms/product_attribute_value/`).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })
}

export const GetProductAttributeValueById = async (id) => {
    return await axiosInstance.get(`/api/cms/product_attribute_value/${id}/`).then((res) => {
        return res.data
    }).catch((err) => {
        return err
    })
}

export const StockEdit = async (data) => {
    return await axiosInstance.patch(`/api/cms/stock/${data.id}/`, data).then((res) => {
        return res
    }).catch((err) => {
        return err
    })
}


