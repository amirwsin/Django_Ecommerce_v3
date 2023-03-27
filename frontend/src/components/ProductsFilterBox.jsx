import {
    Box,
    Button,
    List,
    ListItem,
    Slider,
    Typography
} from "@mui/material";

const ProductsFilterBox = ({filters, setFilters, data, query}) => {
    const handleChange = (e, newValue, activeThumb) => {
        setFilters({...filters, price: newValue})
    }

    const getRangePrice = () => {
        const products = data
        let maxPrice = 0
        products?.map(item => {
            let current = item.inventory.sale_price
            if (current > maxPrice) {
                return maxPrice = current
            }
        })
        return parseFloat(maxPrice)
    }

    const handleFilter = () => {
        query.refetch()
    }

    return (
        <Box className={"product-filter-wrapper"}>
            <List aria-label={"filter-list"}>
                <ListItem>
                    <Box sx={{display: "block", position: "relative", width: "100%"}}>
                        <Typography variant={"h6"} component={"span"}>Price :</Typography>
                        <Slider
                            getAriaLabel={() => 'price filter'}
                            value={filters.price}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            max={getRangePrice()}
                            disableSwap
                            step={0.01}
                            getAriaValueText={() => `$${filters.price}`}
                            valueLabelFormat={(value, index) => `$${filters.price[index]}`}
                        />
                    </Box>
                </ListItem>
            </List>
            <Button variant={"contained"} color={"black"} sx={{color: "background.main"}}
                    onClick={handleFilter}>Filter</Button>
        </Box>
    )
}

export default ProductsFilterBox