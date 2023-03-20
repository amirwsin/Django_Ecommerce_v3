import {Button, Grid, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {StockEdit} from "../../features/api/cmsApi";

const ProductStock = ({data}) => {
    const [form, setForm] = useState({
        id: data?.inventory?.stock?.id,
        product_inventory: data?.inventory?.id,
        units: data?.inventory?.stock?.units,
    })

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})

    }

    const stockMutation = useMutation({
        mutationFn: (data) => StockEdit(data)
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        stockMutation.mutate(form)
    }

    let dateChecked = new Date(data.inventory.stock.last_checked)

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
                               value={data.inventory.stock.units_sold}/>
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