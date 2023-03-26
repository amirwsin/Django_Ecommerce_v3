import {
    Box,
    Button, CardMedia,
    Container,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Tooltip, Typography
} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import React, {useRef, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
 DeliveryCreate,
    DeliveryDelete, DeliveryEdit,
    GetAllDelivery,

} from "../../features/api/cmsApi";
import toast from "react-hot-toast";
import {Delete, Edit} from "@mui/icons-material";
import {ERROR_LIST} from "../../ResponseStatus";


const mockData = [{
    id: 1,
    name: "cream_124",
    category: "cream",
    is_active: true,
    create_at: Date.now(),
    update_at: Date.now(),
}]


const AdminDelivery = () => {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState(false)
    const [previewImage, setPreviewImage] = useState("")
    const [form, setForm] = useState({
        id: null,
        name: "",
        image: "",
        price: 0,
        max_weight: 0,
    })
    const queryClient = useQueryClient()
    const inputImage = useRef()

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setForm({...form, image: e.target.files[0]})
            setPreviewImage(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const deliveryQuery = useQuery({
        queryKey: ["delivery"],
        queryFn: () => GetAllDelivery()
    })


    const deliveryMutation = useMutation({
        mutationFn: (data) => type ? DeliveryEdit(data) : DeliveryCreate(data),
        onSuccess: (data) => {
            if (ERROR_LIST.includes(data?.response?.status)) {
                toast.error(`something went wrong : ${Object.values(data.response.data)}`, {duration: 10000})
            } else {
                toast.success(type ? "changes saved" : "delivery created", {duration: 5000})
                queryClient.setQueryData(["delivery"], (old_data) => {
                    if (type) {
                        old_data.results.map(item => {
                            if (item.id === form.id) {
                                item.name = form.name
                                item.price = form.price
                                item.max_weight = form.max_weight
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


    const deliveryDeleteMutation = useMutation({
        mutationFn: (data) => DeliveryDelete(data),
        onSuccess: (data) => {
            if (ERROR_LIST.includes(data?.response?.status)) {
                toast.error(`something went wrong : ${Object.values(data.response.data)}`, {duration: 10000})
            } else {
                toast.success("delivery deleted", {duration: 5000})
                queryClient.setQueryData(["delivery"], (old_data) => {
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
        deliveryDeleteMutation.mutate(id)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        deliveryMutation.mutate(form)
        handleClose()
    }


    const columns = [
        {field: "id", headerName: "ID", align: "left", headerAlign: "left"},
        {field: "name", headerName: "NAME", flex: 2},
        {field: "price", headerName: "Price", headerAlign: "left"},
        {field: "max_weight", headerName: "WEIGHT", headerAlign: "left"},
        {
            field: "create_at", headerName: "DATE CREATE", flex: 2, renderCell: ({row: {create_at}}) => {
                let date = new Date(create_at)
                return `${date.toLocaleString('default', {weekday: "long"})}, ${date.toLocaleString('default', {
                    month: "long",
                })} ${date.getDay()}, ${date.getFullYear()}`
            }
        },
        {
            field: "update_at", headerName: "DATE UPDATE", flex: 2, renderCell: ({row: {update_at}}) => {
                let date = new Date(update_at)
                return `${date.toLocaleString('default', {weekday: "long"})}, ${date.toLocaleString('default', {
                    month: "long",
                })} ${date.getDay()}, ${date.getFullYear()}`
            }
        },
        {
            field: " ", headerName: "ACTION", flex: 2, renderCell: (param) => {
                return (<Box>
                        <Tooltip arrow title={"Edit Delivery"}>
                            <IconButton color={"info"} onClick={() => {
                                handleClickOpen()
                                setType(true)
                                setForm({
                                    id: param.row.id,
                                    name: param.row.name,
                                    price: param.row.price,
                                    max_weight: param.row.max_weight,
                                    image: param.row.image
                                })
                                setPreviewImage("")
                            }}>
                                <Edit fontSize={"medium"}/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow title={"Delete Delivery"}>
                            <IconButton color={"error"} onClick={() => handleDelete(param.row.id)}>
                                <Delete fontSize={"medium"}/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                )
            }
        }
    ]


    return (
        <Container maxWidth={"xll"} sx={{
            paddingY: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflow: "scroll"
        }}>
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
                    setForm({id: null, name: "", price: 0, max_weight: 0, image: null})
                    setPreviewImage("")
                }}
                        sx={{color: "var(--background-main) !important", marginY: 2, marginX: 1}}>Add New
                    Delivery</Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="delivery"
                    aria-describedby="delivery"
                >
                    <DialogTitle id="delivery">
                        Delivery
                    </DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField type={"text"} margin={"normal"} required variant={"outlined"} label={"Name"}
                                       inputProps={{maxLength: 255}}
                                       fullWidth={true}
                                       helperText={"format : max-255"} name={"name"}
                                       onChange={handleChange} value={form.name}/>
                            <TextField type={"number"} margin={"normal"} inputProps={{step: "0.01", maxLength: 7,}} required
                                       variant={"outlined"}
                                       label={"price"}
                                       helperText={"format : maximum amount 99999.99"} name={"price"}
                                       fullWidth={true}
                                       onChange={handleChange} value={form.price}/>
                            <TextField type={"number"} margin={"normal"} inputProps={{step: "1", maxLength: 6,}} required
                                       variant={"outlined"}
                                       label={"maximum weight"}
                                       helperText={"format : KG"} name={"max_weight"}
                                       fullWidth={true}
                                       onChange={handleChange} value={form.max_weight}/>
                            <Box className={"upload-area"} sx={{
                                "& .MuiSvgIcon-root": {
                                    position: "absolute",
                                    justifySelf: "center",
                                    alignSelf: "center",
                                    zIndex: 1
                                }
                            }} onClick={() => inputImage.current.click()}>
                                <Typography component={"span"} variant={"h5"} color={"grey"}>Click To Upload
                                    Image</Typography>
                                <input ref={inputImage} onChange={handleImageChange} hidden
                                       type={"file"}
                                       accept={"image/*"}
                                       id={"image-file"}
                                       name={"image-file"}/>
                                <CardMedia component={"img"} image={previewImage ? previewImage : form.image}
                                           alt={form.name}
                                           sx={{position: "relative", height: "100%", width: "100%", border: "none",objectFit:"fill"}}/>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button type={"submit"}>
                                submit
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
                <DataGrid paginationMode="server" checkboxSelection
                          rows={deliveryQuery.data ? deliveryQuery.data.results : mockData} columns={columns}
                          components={{Toolbar: GridToolbar}} loading={deliveryQuery.isLoading} disableSelectionOnClick
                          autoPageSize/>
            </Box>
        </Container>
    )
}

export default AdminDelivery