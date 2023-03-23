import {
    Box,
    Button,
    Chip,
    FormControl, FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField
} from "@mui/material";
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {
    GetAllBrands,
    GetAllProductTypes,
    GetProductAttributeValueById,
    ProductInventoryEdit
} from "../../features/api/cmsApi";
import toast from "react-hot-toast";

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

const ProductInventory = ({data, handleNext, setFormData, formData}) => {
    const [form, setForm] = useState({
        id: data?.inventory?.id ? data?.inventory?.id : null,
        sku: data?.inventory?.sku ? data?.inventory?.sku : "",
        upc: data?.inventory?.upc ? data?.inventory?.upc : "",
        product_type: data?.inventory?.product_type.id ? data?.inventory?.product_type.id : "",
        brand: data?.inventory?.brand.id ? data?.inventory?.brand.id : "",
        retail_price: data?.inventory?.retail_price ? data?.inventory?.retail_price : 0,
        store_price: data?.inventory?.store_price ? data?.inventory?.store_price : 0,
        sale_price: data?.inventory?.sale_price ? data?.inventory?.sale_price : 0,
        weight: data?.inventory?.weight ? data?.inventory?.weight : 0,
        attribute_values: data?.inventory?.attribute_values ? data?.inventory?.attribute_values.map(item => {
            return item.id
        }) : "",
    })
    const [attributeList, setAttributeList] = useState(data?.inventory?.attribute_values ? data?.inventory?.attribute_values.map(attr => {
        return attr
    }) : null)


    const
        productTypeQuery = useQuery({
            queryKey: ["ProductTypes"],
            queryFn: () => GetAllProductTypes()
        })

    const brandsQuery = useQuery({
        queryKey: ["brands"],
        queryFn: () => GetAllBrands()
    })

    const ProductInventoryMutation = useMutation({
        mutationFn: (data) => ProductInventoryEdit(data),
        onSuccess: (data) => {
            if (data?.response?.status === 400 || data?.response?.status === 401 || data?.response?.status === 402 || data?.response?.status === 403 || data?.response?.status === 404) {
                toast.error(`something went wrong : ${Object.values(data.response.data)}`, {duration: 10000})
            } else {
                toast.success("changes saved", {duration: 5000})
            }
        }
    })

    const handleChange = (e) => {
        if (e.target.name === "product_type") {
            let result = GetProductAttributeValueById(e.target.value)
            result.then((res) => {
                setForm({...form, attribute_values: [], [e.target.name]: e.target.value})
                setAttributeList(res.map(attr => {
                    return attr
                }))
            })

        } else {
            setForm({...form, [e.target.name]: e.target.value})
        }

    }

    const handleAttributeChange = (e) => {
        const {target: {value},} = e;
        setForm({...form, attribute_values: typeof value === 'string' ? value.split(',') : value,});

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (data && data.inventory.id) {
            ProductInventoryMutation.mutate(form)
        } else {
            setFormData({...formData, inventory: form})
            handleNext(2)
        }

    }

    useEffect(() => {
        if (data?.inventory?.product_type?.id) {
            let result = GetProductAttributeValueById(data?.inventory?.product_type.id)
            result.then((res) => {
                setAttributeList(res.map(attr => {
                    return attr
                }))
            })
        }
        return () => {
            setAttributeList(null)
        }
    }, [])

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2} paddingY={5}>
                <Grid item xs={12} md={6}>
                    <TextField type={"text"} required variant={"outlined"}
                               helperText={"format : required , unique, max-20"} inputProps={{maxLength: 20}}
                               label={"Stock keeping unit"}
                               name={"sku"}
                               fullWidth={true}
                               onChange={handleChange} value={form.sku}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField type={"text"} required variant={"outlined"}
                               helperText={"format : required , unique , max-12"} inputProps={{maxLength: 12}}
                               label={"Universal product code"}
                               name={"upc"}
                               fullWidth={true}
                               onChange={handleChange} value={form.upc}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField type={"number"} inputProps={{step: "0.01", maxLength: 5,}} required variant={"outlined"}
                               label={"Recommended retail price"}
                               helperText={"maximum price 999.99"} name={"retail_price"}
                               fullWidth={true}
                               onChange={handleChange} value={form.retail_price}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField type={"number"} inputProps={{step: "0.01", maxLength: 5,}} required variant={"outlined"}
                               label={"Regular store price"}
                               helperText={"maximum price 999.99"} name={"store_price"}
                               fullWidth={true}
                               onChange={handleChange} value={form.store_price}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField type={"number"} inputProps={{step: "0.01", maxLength: 5,}} required variant={"outlined"}
                               label={"Sale price"}
                               helperText={"maximum price 999.99"} name={"sale_price"}
                               fullWidth={true}
                               onChange={handleChange} value={form.sale_price}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField type={"number"} inputProps={{step: "1", maxLength: 6,}} required variant={"outlined"}
                               label={"Product weight"}
                               helperText={"format : KG"} name={"weight"}
                               fullWidth={true}
                               onChange={handleChange} value={form.weight}/>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <FormControl fullWidth>
                        <InputLabel id="brand">Brand</InputLabel>
                        <Select
                            labelId="brand"
                            id="brand"
                            name={"brand"}
                            value={form.brand}
                            label="Brand"
                            required
                            onChange={handleChange}
                        >
                            <MenuItem value>------------</MenuItem>
                            {!brandsQuery.isLoading && brandsQuery.data.results.map(item =>
                                <MenuItem key={item.id} value={item.id}
                                          aria-selected={item.id === form.brand}
                                          selected={item.id === form.brand}>{item.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <FormControl fullWidth>
                        <InputLabel id="product_type">Product Type</InputLabel>
                        <Select
                            labelId="product_type"
                            id="product_type"
                            name={"product_type"}
                            value={form.product_type}
                            label="Product Type"
                            required
                            onChange={handleChange}
                        >
                            <MenuItem value>------------</MenuItem>
                            {!productTypeQuery.isLoading && productTypeQuery.data.results.map(item =>
                                <MenuItem key={item.id} value={item.id} aria-selected={item.id === form.product_type}
                                          selected={item.id === form.product_type}>{item.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <FormControl fullWidth={true}>
                        <InputLabel id="attribute_values">Type Values</InputLabel>
                        <Select size={"medium"}
                                labelId="attribute_values"
                                id="attribute_values"
                                multiple
                                required
                                value={form.attribute_values}
                                onChange={handleAttributeChange}
                                input={<OutlinedInput size={"small"} id="attribute_values" label="Type Values"/>}
                                renderValue={(selected) => (
                                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                        {selected.map((value) => (
                                            <Chip size={"small"} key={value}
                                                  label={attributeList?.map(item => item.id === value && item.attribute_value)}/>
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                        >
                            {attributeList?.map((attr) => <MenuItem key={attr.id}
                                                                    value={attr.id}>{attr.attribute_value}</MenuItem>)}

                        </Select>
                        <FormHelperText>Example : type cloth have color attribute or size and each attribute have values
                            like red or sm</FormHelperText>
                    </FormControl>
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

export default ProductInventory