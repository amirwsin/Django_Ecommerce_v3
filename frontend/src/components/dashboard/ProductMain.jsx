import {
    Button,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField
} from "@mui/material";
import {useState} from "react";
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useMutation, useQuery} from "@tanstack/react-query";
import {GetAllCategories, ProductCreate, ProductEditById} from "../../features/api/cmsApi";
import toast from "react-hot-toast";


const ProductMain = ({data, setFormData, handleNext}) => {
    const [form, setForm] = useState({
        id: data?.id ? data?.id : null,
        web_id: data?.web_id ? data?.web_id : "",
        slug: data?.slug ? data?.slug : "",
        name: data?.name ? data?.name : "",
        description: data?.description ? data?.description : "",
        category: data?.category ? data?.category?.name : "",
        is_active: data?.is_active ? data?.is_active : true,
    })

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const categoryQuery = useQuery({
        queryKey: ["categories"],
        queryFn: () => GetAllCategories(),
    })

    const productEditMutation = useMutation({
        mutationFn: (data) => ProductEditById(data),
        onSuccess: (data) => {
            if (data?.response?.status === 400 || data?.response?.status === 404) {
                toast.error(`something went wrong : ${Object.values(data.response.data)}`, {duration: 10000})
            } else {
                toast.success("changes saved", {duration: 5000})
            }
        },
        onError: error => {
            toast.error(`something went wrong : ${Object.values(error.response.data)}`, {duration: 10000})
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (data && data.id) {
            productEditMutation.mutate(form)
        } else {
            setFormData(form)
            handleNext(1)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2} paddingY={5}>
                <Grid item xs={12} lg={6}>
                    <TextField type={"text"} required variant={"outlined"} label={"WEB ID"} inputProps={{maxLength: 50}}
                               helperText={"format : required , unique , max-50"} name={"web_id"}
                               fullWidth={true}
                               onChange={handleChange} value={form.web_id}/>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TextField type={"text"} required variant={"outlined"} inputProps={{maxLength: 255}}
                               label={"Product Name"} helperText={"format : required , max-255"} name={"name"}
                               fullWidth={true}
                               onChange={handleChange} value={form.name}/>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TextField type={"text"} required variant={"outlined"}
                               helperText={"format : required , letters, numbers , underscore or hyphens"}
                               label={"safe url"} name={"slug"}
                               fullWidth={true}
                               onChange={handleChange} value={form.slug}/>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <FormControl fullWidth>
                        <InputLabel id="category">Category</InputLabel>
                        <Select
                            labelId="category"
                            id="category"
                            name={"category"}
                            value={form.category}
                            label="category"
                            required
                            onChange={handleChange}
                        >
                            <MenuItem value>------------</MenuItem>
                            {!categoryQuery.isLoading && categoryQuery.data.results.map(item =>
                                <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} marginY={2}>
                    <CKEditor
                        editor={ClassicEditor}
                        data={form.description ? form.description : "Write Your Product Description"}
                        name={"description"}
                        onReady={editor => {
                            // You can store the "editor" and use when it is needed.
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setForm({...form, description: data})
                        }}
                        onBlur={(event, editor) => {
                        }}
                        onFocus={(event, editor) => {
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch name={"is_active"} color={"secondary"} checked={form.is_active}
                                             onChange={() => setForm({
                                                 ...form,
                                                 is_active: !form.is_active
                                             })}/>}
                            label="Product Visibility"/>
                    </FormGroup>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Button variant={"contained"} type={"submit"} fullWidth={true}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default ProductMain