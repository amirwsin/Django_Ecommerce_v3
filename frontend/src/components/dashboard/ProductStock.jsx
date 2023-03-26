import {Button, Grid, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {StockEdit} from "../../features/api/cmsApi";
import toast from "react-hot-toast";
import {ERROR_LIST} from "../../ResponseStatus";

const ProductStock = ({data, handleNext, setFormData, formData}) => {
    const [form, setForm] = useState({
        id: data?.inventory?.stock?.id ? data?.inventory?.stock?.id : null,
        product_inventory: data?.inventory?.id ? data?.inventory?.id : null,
        units: data?.inventory?.stock?.units ? data?.inventory?.stock?.units : "",
    })

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})

    }

    const stockMutation = useMutation({
        mutationFn: (data) => StockEdit(data),
        onSuccess: (data) => {
            if (ERROR_LIST.includes(data?.response?.status)) {
                toast.error(`something went wrong : ${Object.values(data.response.data)}`, {duration: 10000})
            } else {
                toast.success("changes saved", {duration: 5000})
            }
        }
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        if (data && data.inventory?.stock?.id) {
            stockMutation.mutate(form)
        } else {
            setFormData({...formData, stock: form})
            handleNext(3)
        }
    }

    let dateChecked = new Date(data?.inventory?.stock?.last_checked)

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant={"caption"}>
                Last Time Checked
                : {`${dateChecked.toLocaleString('default', {weekday: 'long'})}, ${dateChecked.toLocaleString('default', {month: 'long'})} ${dateChecked.getDay()}, ${dateChecked.getFullYear()}`}
            </Typography>
            <Grid container spacing={2} paddingY={5}>
                <Grid item xs>
                    <TextField type={"number"} required variant={"outlined"}
                               helperText={"format : required , default-0 , WARNING(customer cant order more then stock units)"}
                               label={"Units/qty of stock"}
                               name={"units"}
                               fullWidth={true}
                               onChange={handleChange} value={form.units}/>
                </Grid>
                <Grid item xs>
                    <TextField type={"number"} disabled variant={"outlined"}
                               helperText={"format : required , default-0 "}
                               label={"Units sold to date"}
                               name={"units_sold"}
                               fullWidth={true}
                               value={data?.inventory?.stock?.units_sold ? data?.inventory?.stock?.units_sold : 0}/>
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

export default ProductStock