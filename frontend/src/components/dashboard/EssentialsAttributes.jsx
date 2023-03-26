import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Divider,
    IconButton,
    TextField,
    Tooltip
} from "@mui/material";
import toast, {Toaster} from "react-hot-toast";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import React, {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    GetAllProductAttributes, ProductAttributesCreate, ProductAttributesDelete,
    ProductAttributesEdit
} from "../../features/api/cmsApi";
import {Delete, Edit} from "@mui/icons-material";
import {ERROR_LIST} from "../../ResponseStatus";

const mockData = [{
    id: 1,
    name: "adidas",
}]


const EssentialsAttributes = () => {

    const [open, setOpen] = useState(false);
    const [type, setType] = useState(false)
    const [form, setForm] = useState({
        id: null,
        name: "",
        description: "",
        values: [{id: null, attribute_value: ""}, {id: null, attribute_value: ""}, {id: null, attribute_value: ""}],
        del: []
    })
    const queryClient = useQueryClient()

    const handleChange = (e, i) => {
        setForm({...form, [e.target.name]: e.target.value})
        const clonedData = {...form};

        if (i !== undefined) {
            clonedData.values[i][e.target.name] = e.target.value;
        } else {
            clonedData[e.target.name] = e.target.value;
        }

        setForm(clonedData);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const productAttributesQuery = useQuery({
        queryKey: ["ProductAttributes"],
        queryFn: () => GetAllProductAttributes()
    })

    const productAttributesMutation = useMutation({
        mutationFn: (data) => type ? ProductAttributesEdit(data) : ProductAttributesCreate(data),
        onSuccess: (data) => {
            if (ERROR_LIST.includes(data?.response?.status)) {
                toast.error(`something went wrong : ${Object.values(data.response.data)}`, {duration: 10000})
            } else {
                toast.success(type ? "changes saved" : "productAttribute created", {duration: 5000})
                queryClient.setQueryData(["ProductAttributes"], (old_data) => {
                    if (type) {
                        old_data.results.map(item => {
                            if (item.id === form.id) {
                                item.name = form.name
                            }
                            return item
                        })
                    } else {
                        old_data.results = [...old_data.results, data]
                    }
                    return old_data
                })
            }
        },
        onError: error => {
            toast.error(`something went wrong : ${Object.values(error.response.data)}`, {duration: 10000})
        }
    })


    const productAttributeDeleteMutation = useMutation({
        mutationFn: (data) => ProductAttributesDelete(data),
        onSuccess: (data, id) => {
            if (ERROR_LIST.includes(data?.response?.status)) {
                toast.error(`something went wrong : ${Object.values(data.response.data)}`, {duration: 10000})
            } else {
                toast.success("productAttribute deleted", {duration: 5000})
                queryClient.setQueryData(["ProductAttributes"], (old_data) => {
                    let data = old_data.results.filter(item => item.id !== id)
                    old_data.results = data
                    return old_data
                })
            }
        },
        onError: error => {
            toast.error(`something went wrong : ${Object.values(error.response.data)}`, {duration: 10000})
        }
    })

    const handleDelete = (id) => {
        productAttributeDeleteMutation.mutate(id)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        productAttributesMutation.mutate(form)
        handleClose()
    }

    const columns = [
        {field: "id", headerName: "ID", align: "left", headerAlign: "left"},
        {field: "name", headerName: "NAME", flex: 2},
        {
            field: " ", headerName: "ACTION", flex: 2, renderCell: (param) => {
                return (<Box>
                        <Tooltip arrow title={"Edit Product Attribute"}>
                            <IconButton color={"info"} onClick={() => {
                                handleClickOpen()
                                setType(true)
                                setForm({
                                    id: param.row.id,
                                    name: param.row.name,
                                    description: param.row.description,
                                    values: [...param.row.values,
                                        {id: null, attribute_value: ""},
                                        {id: null, attribute_value: ""},
                                        {id: null, attribute_value: ""},],
                                    del: []
                                })
                            }}>
                                <Edit fontSize={"medium"}/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow title={"Delete Product Attribute"}>
                            <IconButton color={"error"} onClick={() => handleDelete(param.row.id)}>
                                <Delete fontSize={"medium"}/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                )
            }
        },
    ]

    return (
        <Box className={"card"} sx={{
            padding: 0,
            margin: 0,
            height: "400px",
            "& .MuiDataGrid-root": {
                border: "none"
            },
            "& .MuiDataGrid-columnHeader": {
                backgroundColor: "action.main",
            },
            "& .MuiDataGrid-footerContainer": {
                backgroundColor: "action.main"
            },
            "& .MuiButtonBase-root": {
                color: "text.main"
            },
        }}>
            <Button variant={"contained"} color={"black"} onClick={() => {
                handleClickOpen()
                setType(false)
                setForm({
                    id: null,
                    name: "",
                    description: "",
                    values: [{id: null, attribute_value: ""}, {id: null, attribute_value: ""}, {
                        id: null,
                        attribute_value: ""
                    }],
                    del: []
                })
            }}
                    sx={{color: "var(--background-main) !important", marginY: 2, marginX: 1}}>Add New
                Product Attribute</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="essentials-product-attribute"
                aria-describedby="essentials-product-attribute"
            >
                <DialogTitle id="essentials-product-attribute">
                    Product Attribute
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField type={"text"} margin={"normal"} required variant={"outlined"} label={"Name"}
                                   inputProps={{maxLength: 255}}
                                   fullWidth={true}
                                   helperText={"format : required , unique , max-255, example : color , size...etc"} name={"name"}
                                   onChange={(e) => handleChange(e)} value={form.name}/>
                        <TextField type={"text"} margin={"normal"} multiline minRows={3} required variant={"outlined"}
                                   label={"Description"}
                                   inputProps={{maxLength: 2000}}
                                   fullWidth={true}
                                   helperText={"format : required , unique , max-255"} name={"description"}
                                   onChange={(e) => handleChange(e)} value={form.description}/>
                        <Divider variant={"fullWidth"}/>
                        {form.values.map((item, i) => <TextField type={"text"} margin={"normal"}
                                                                 variant={"outlined"} label={"value"}
                                                                 inputProps={{maxLength: 255}}
                                                                 fullWidth={true}
                                                                 helperText={"format : text or numbers , max-255, leave empty for delete , example : red , lg...etc "}
                                                                 name={"attribute_value"}
                                                                 id={`value-${item.id}`}
                                                                 onChange={(e) => handleChange(e, i)}
                                                                 value={item.attribute_value}/>)}
                    </DialogContent>
                    <DialogActions>
                        <Button type={"submit"}>
                            submit
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <DataGrid
                checkboxSelection
                rows={productAttributesQuery.data ? productAttributesQuery.data.results : mockData} columns={columns}
                components={{Toolbar: GridToolbar}} loading={productAttributesQuery.isLoading} autoPageSize
                disableSelectionOnClick/>
        </Box>
    )
}

export default EssentialsAttributes