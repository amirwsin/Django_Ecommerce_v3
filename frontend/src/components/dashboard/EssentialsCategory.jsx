import {
    Box,
    Button, CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControlLabel, FormGroup,
    IconButton, Switch,
    TextField,
    Tooltip, Typography
} from "@mui/material";
import {AddPhotoAlternate, Delete, Edit} from "@mui/icons-material";
import React, {useRef, useState} from "react";
import toast, {Toaster} from "react-hot-toast";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    CategoryCreate, CategoryDelete,
    CategoryEdit,
    GetAllCategories
} from "../../features/api/cmsApi";

const mockData = [{
    id: 1,
    name: "cream",
    slug: "cream",
    is_active: true,
}]
const EssentialsCategory = () => {
    const [open, setOpen] = useState(false)
    const [type, setType] = useState(false)
    const [previewImage, setPreviewImage] = useState("")
    const [form, setForm] = useState({
        id: null,
        name: "",
        slug: "",
        image: "",
        is_active: true,
    })
    const inputImage = useRef()

    const queryClient = useQueryClient()

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

    const categoriesQuery = useQuery({
        queryKey: ["categories"],
        queryFn: () => GetAllCategories()
    })

    const categoryMutation = useMutation({
        mutationFn: (data) => type ? CategoryEdit(data) : CategoryCreate(data),
        onSuccess: (data) => {
            if (data?.response?.status === 400 || data?.response?.status === 404) {
                toast.error(`something went wrong : ${Object.values(data.response.data)}`, {duration: 10000})
            } else {
                toast.success(type ? "changes saved" : "category created", {duration: 5000})
                queryClient.setQueryData(["categories"], (old_data) => {
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


    const categoryDeleteMutation = useMutation({
        mutationFn: (data) => CategoryDelete(data),
        onSuccess: (data, id) => {
            if (data?.response?.status === 400 || data?.response?.status === 404) {
                toast.error(`something went wrong : ${Object.values(data.response.data)}`, {duration: 10000})
            } else {
                toast.success("category deleted", {duration: 5000})
                queryClient.setQueryData(["categories"], (old_data) => {
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
        categoryDeleteMutation.mutate(id)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(form)
        categoryMutation.mutate(form)
        handleClose()
    }
    const columns = [
        {field: "id", headerName: "ID", align: "left", headerAlign: "left"},
        {
            field: "name", headerName: "NAME", flex: 2, renderCell: (param) => {
                let text = ""
                for (let i = 0; i <= param.row.level; i++) {
                    text += "-"
                }
                return text + param.row.name
            }
        },
        {
            field: " ", headerName: "ACTION", flex: 2, renderCell: (param) => {
                return (<Box>
                        <Tooltip arrow title={"Edit Category"}>
                            <IconButton color={"info"} onClick={() => {
                                handleClickOpen()
                                setType(true)
                                setForm({
                                    id: param.row.id,
                                    name: param.row.name,
                                    slug: param.row.slug,
                                    is_active: param.row.is_active,
                                    image: param.row.image,
                                })
                                setPreviewImage("")
                            }}>
                                <Edit fontSize={"medium"}/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip arrow title={"Delete Category"}>
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
            <Toaster position="top-right" reverseOrder={false}/>
            <Button variant={"contained"} color={"black"} onClick={() => {
                handleClickOpen()
                setType(false)
                setForm({
                    id: null,
                    name: "",
                    slug: "",
                    image: null,
                    is_active: true
                })
                setPreviewImage("")
            }}
                    sx={{color: "var(--background-main) !important", marginY: 2, marginX: 1}}>Add New
                Category</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="essentials-category"
                aria-describedby="essentials-category"
            >
                <DialogTitle id="essentials-category">
                    Category
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField type={"text"} required variant={"outlined"} label={"Name"}
                                   inputProps={{maxLength: 255}}
                                   fullWidth={true}
                                   helperText={"format : required , max-255"} name={"name"}
                                   onChange={handleChange} value={form.name} margin={"normal"}/>
                        <TextField type={"text"} required variant={"outlined"} label={"safe url"}
                                   inputProps={{maxLength: 255}}
                                   fullWidth={true}
                                   helperText={"format : required , letters, numbers , underscore or hyphens"}
                                   name={"slug"}
                                   onChange={handleChange} value={form.slug} margin={"normal"}/>
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
                            {/*<AddPhotoAlternate fontSize={"large"} color={"action"}/>*/}
                            <CardMedia component={"img"} image={previewImage ? previewImage : form.image}
                                       alt={form.name}
                                       sx={{position: "relative", height: "100%", width: "100%", border: "none"}}/>
                        </Box>
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch name={"is_active"} color={"secondary"} checked={form.is_active}
                                                 onChange={() => setForm({
                                                     ...form,
                                                     is_active: !form.is_active
                                                 })}/>}
                                label="Category Visibility"/>
                        </FormGroup>
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
                rows={categoriesQuery.data ? categoriesQuery.data.results : mockData} columns={columns}
                components={{Toolbar: GridToolbar}} loading={categoriesQuery.isLoading} disableSelectionOnClick autoPageSize
            />
        </Box>
    )

}
export default EssentialsCategory