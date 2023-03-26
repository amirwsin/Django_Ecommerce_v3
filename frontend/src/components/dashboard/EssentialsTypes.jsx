import {
    Box,
    Button, Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, FormHelperText,
    IconButton, InputLabel, MenuItem, OutlinedInput, Select,
    TextField,
    Tooltip
} from "@mui/material";
import toast, {Toaster} from "react-hot-toast";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import React, {useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    ProductTypeDelete,
    ProductTypeCreate,
    ProductTypeEdit,
    GetAllProductTypes,
    GetAllProductAttributes
} from "../../features/api/cmsApi";
import {Delete, Edit} from "@mui/icons-material";
import {ERROR_LIST} from "../../ResponseStatus";

const mockData = [{
    id: 1,
    name: "adidas",
}]

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const EssentialsTypes = () => {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState(false)
    const [form, setForm] = useState({
        id: null,
        name: "",
        product_type_attribute: [],
    })
    const [attributeList, setAttributeList] = useState(null)

    const queryClient = useQueryClient()

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleAttributeChange = (e) => {
        const {target: {value},} = e;
        setForm({...form, product_type_attribute: typeof value === 'string' ? value.split(',') : value,});

    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const productTypesQuery = useQuery({
        queryKey: ["ProductTypes"],
        queryFn: () => GetAllProductTypes()
    })

    const productAttributes = useQuery({
        queryKey: ["ProductAttributes"],
        queryFn: () => GetAllProductAttributes(),
        onSuccess: (data) => {
            setAttributeList(data.results)
        }
    })

    const productTypesMutation = useMutation({
        mutationFn: (data) => type ? ProductTypeEdit(data) : ProductTypeCreate(data),
        onSuccess: (data) => {
            if (ERROR_LIST.includes(data?.response?.status)) {
                toast.error(`something went wrong : ${Object.values(data.response.data)}`, {duration: 10000})
            } else {
                toast.success(type ? "changes saved" : "productType created", {duration: 5000})
                queryClient.setQueryData(["ProductTypes"], (old_data) => {
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


    const productTypesDeleteMutation = useMutation({
        mutationFn: (data) => ProductTypeDelete(data),
        onSuccess: (data, id) => {
            if (ERROR_LIST.includes(data?.response?.status)) {
                toast.error(`something went wrong : ${Object.values(data.response.data)}`, {duration: 10000})
            } else {
                toast.success("productType deleted", {duration: 5000})
                queryClient.setQueryData(["ProductTypes"], (old_data) => {
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
        productTypesDeleteMutation.mutate(id)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        productTypesMutation.mutate(form)
        handleClose()
    }

    const columns = [
        {field: "id", headerName: "ID", align: "left", headerAlign: "left"},
        {field: "name", headerName: "NAME", flex: 2},
        {
            field: " ", headerName: "ACTION", flex: 2, renderCell: (param) => {
                return (<Box>
                        <Tooltip arrow title={"Edit Product Type"}>
                            <IconButton color={"info"} onClick={() => {
                                handleClickOpen()
                                setType(true)
                                setForm({
                                    id: param.row.id,
                                    name: param.row.name,
                                    product_type_attribute: param.row.product_type_attribute.map(attribute => {
                                        return attribute.id
                                    })
                                })
                            }}>
                                <Edit fontSize={"medium"}/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow title={"Delete Product Type"}>
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
                setForm({id: null, name: "", product_type_attribute: []})
            }}
                    sx={{color: "var(--background-main) !important", marginY: 2, marginX: 1}}>Add New
                Product Type</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="essentials-productType"
                aria-describedby="essentials-productType"
            >
                <DialogTitle id="essentials-productType">
                    Product Types
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField type={"text"} margin={"normal"} required variant={"outlined"} label={"Name"}
                                   inputProps={{maxLength: 255}}
                                   fullWidth={true}
                                   helperText={"format: required, unique,max-255"} name={"name"}
                                   onChange={handleChange} value={form.name}/>
                        <FormControl fullWidth={true} margin={"normal"}>
                            <InputLabel id="ProductAttributes">Product Attributes</InputLabel>
                            <Select size={"medium"}
                                    labelId="ProductAttributes"
                                    id="ProductAttributes"
                                    multiple
                                    required
                                    value={form.product_type_attribute}
                                    onChange={handleAttributeChange}
                                    input={<OutlinedInput size={"small"} id="ProductAttributes"
                                                          label="Product Attribute"/>}
                                    renderValue={(selected) => (
                                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                            {selected.map((value) => (
                                                <Chip size={"small"} key={value}
                                                      label={attributeList?.map(item => item.id === value && item.name)}/>
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                            >
                                {attributeList?.map((attr) => <MenuItem key={attr.id}
                                                                        value={attr.id}>{attr.name}</MenuItem>)}

                            </Select>
                            <FormHelperText>Example : type cloth have color attribute or size and each attribute have
                                values
                                like red or sm</FormHelperText>
                        </FormControl>
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
                rows={productTypesQuery.data ? productTypesQuery.data.results : mockData} columns={columns}
                components={{Toolbar: GridToolbar}} loading={productTypesQuery.isLoading} autoPageSize
                disableSelectionOnClick/>
        </Box>
    )
}

export default EssentialsTypes