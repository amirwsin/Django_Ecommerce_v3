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
import {useEffect, useState} from "react";
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useMutation, useQuery} from "@tanstack/react-query";
import {GetAllCategories, ProductCreateEdit} from "../../features/api/cmsApi";


const ProductMain = ({data}) => {
    const [form, setForm] = useState({
        id: data?.id,
        web_id: data?.web_id,
        slug: data?.slug,
        name: data?.name,
        description: data?.description,
        category: data?.category.name,
        is_active: data?.is_active,
    })

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const categoryQuery = useQuery({
        queryKey: ["categories"],
        queryFn: () => GetAllCategories(),
    })

    const productMutation = useMutation({
        mutationFn: () => ProductCreateEdit(form)
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        productMutation.mutate()
        console.log(form)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                    <TextField type={"text"} required variant={"outlined"} label={"WEB ID"} name={"web_id"}
                               fullWidth={true}
                               onChange={handleChange} value={form.web_id}/>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TextField type={"text"} required variant={"outlined"} label={"Product Name"} name={"name"}
                               fullWidth={true}
                               onChange={handleChange} value={form.name}/>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TextField type={"text"} required variant={"outlined"} label={"safe url"} name={"slug"}
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
                            label="Active"/>
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