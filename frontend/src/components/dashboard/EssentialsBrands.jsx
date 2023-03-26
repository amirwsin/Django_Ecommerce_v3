import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Tooltip
} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {BrandCreate, BrandDelete, BrandEdit, GetAllBrands} from "../../features/api/cmsApi";
import {Delete, Edit} from "@mui/icons-material";
import React, {useState} from "react";
import toast, {Toaster} from "react-hot-toast";
import {ERROR_LIST} from "../../ResponseStatus";


const mockData = [{
    id: 1,
    name: "adidas",
}]

const EssentialsBrands = () => {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState(false)
    const [form, setForm] = useState({
        id: null,
        name: "",
    })
    const queryClient = useQueryClient()

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const brandQuery = useQuery({
        queryKey: ["brands"],
        queryFn: () => GetAllBrands()
    })

    const brandMutation = useMutation({
        mutationFn: (data) => type ? BrandEdit(data) : BrandCreate(data),
        onSuccess: (data) => {
            if (ERROR_LIST.includes(data?.response?.status)) {
                toast.error(`something went wrong : ${Object.values(data.response.data)}`, {duration: 10000})
            } else {
                toast.success(type ? "changes saved" : "brand created", {duration: 5000})
                queryClient.setQueryData(["brands"], (old_data) => {
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


    const brandDeleteMutation = useMutation({
        mutationFn: (data) => BrandDelete(data),
        onSuccess: (data, id) => {
            if (ERROR_LIST.includes(data?.response?.status)) {
                toast.error(`something went wrong : ${Object.values(data.response.data)}`, {duration: 10000})
            } else {
                toast.success("brand deleted", {duration: 5000})
                queryClient.setQueryData(["brands"], (old_data) => {
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
        brandDeleteMutation.mutate(id)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        brandMutation.mutate(form)
        handleClose()
    }

    const columns = [
        {field: "id", headerName: "ID", align: "left", headerAlign: "left"},
        {field: "name", headerName: "NAME", flex: 2},
        {
            field: " ", headerName: "ACTION", flex: 2, renderCell: (param) => {
                return (<Box>
                        <Tooltip arrow title={"Edit Brand"}>
                            <IconButton color={"info"} onClick={() => {
                                handleClickOpen()
                                setType(true)
                                setForm({id: param.row.id, name: param.row.name})
                            }}>
                                <Edit fontSize={"medium"}/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow title={"Delete Brand"}>
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
                setForm({id: null, name: "",})
            }}
                    sx={{color: "var(--background-main) !important", marginY: 2, marginX: 1}}>Add New
                Brand</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="essentials-brand"
                aria-describedby="essentials-brand"
            >
                <DialogTitle id="essentials-brand">
                    Brand
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField type={"text"} required variant={"outlined"} label={"Name"}
                                   inputProps={{maxLength: 255}}
                                   fullWidth={true}
                                   helperText={"format: required, unique,max-255"} name={"name"}
                                   onChange={handleChange} value={form.name}/>
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
                rows={brandQuery.data ? brandQuery.data.results : mockData} columns={columns}
                components={{Toolbar: GridToolbar}} loading={brandQuery.isLoading} autoPageSize
                disableSelectionOnClick/>
        </Box>
    )
}
export default EssentialsBrands