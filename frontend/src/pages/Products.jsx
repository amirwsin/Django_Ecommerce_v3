import {
    Box, Breadcrumbs,
    Button, Checkbox, Collapse,
    Container, FormControl,
    FormControlLabel,
    FormGroup,
    Grid, InputLabel,
    List,
    ListItem, ListItemButton, ListItemText, MenuItem, Pagination, Select,
    Slider, Switch,
    Typography
} from "@mui/material";
import ProductBox from "../components/ProductBox";
import {useQuery} from "@tanstack/react-query";
import {ProductFilter} from "../features/api/ProductsApi";
import {Link, useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import SEO from "../SEO";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {BasicCategoriesApi} from "../features/api/CategoriesApi";
import CategoryFilter from "../components/CategoryFilter";
import {BasicBrandApi} from "../features/api/BrandsApi";
import BrandFilter from "../components/BrandFilter";
import * as React from "react";
import {parse} from "dotenv";


const Products = () => {
    const {category} = useParams()
    const [filters, setFilters] = useState({
        price: [0, 0], category: [], brand: [], is_recommend: false, is_special: false, ordering: "-create_at", page: 1
    })
    const [maxPrice, setMaxPrice] = useState(0)
    const [showBrand, setShowBrand] = useState(true)
    const [showCategory, setShowCategory] = useState(true)

    const productQuery = useQuery({
        queryKey: ["products"],
        queryFn: () => ProductFilter(filters),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: false,
    })

    const categoryQuery = useQuery({
        queryKey: ["categories"],
        queryFn: BasicCategoriesApi,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: true
    })

    const brandQuery = useQuery({
        queryKey: ["brands"],
        queryFn: BasicBrandApi,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: true
    })

    const handleMaxPrice = () => {
        let max = 0
        productQuery.data?.results?.forEach(item => {
            let current = item.inventory.sale_price
            if (Number(current) > Number(max)) {
                max = current
            }

        })
        return setMaxPrice(parseFloat(max))
    }

    const handleChange = (e, newValue, activeThumb) => {
        setFilters({...filters, price: newValue})
    }
    const handleFilter = () => {
        productQuery.refetch()
    }

    useEffect(() => {
        let newValue = filters
        if (category)
            newValue.category = [category]
        newValue.is_special = false
        newValue.is_recommend = false
        newValue.price = [0, 0]
        newValue.page = 1
        setFilters(newValue)
        productQuery.refetch()
    }, [category])

    const max = useMemo(() => handleMaxPrice(), [productQuery.data])


    return (
        <Container maxWidth={"xll"} sx={{marginY: 5, minHeight: "60vh"}} component={"main"}>
            <SEO type={"text/html"} title={`Flower Shop | Products ${filters.category ? filters.category : ""}`}
                 keywords={`flower , flower shop , buy online flower , ${category ? filters.category : ""}`}
                 description={`list of product of flower shop , ${filters.category ? filters.category + "," : ""}  ${productQuery.data?.results?.map(item => item.name)}`}
                 name={"Flower Shop"}
                 author={"flower shop"} publish={"flower shop"}/>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4} xl={2} component={"section"}>
                    <Box className={"product-filter-wrapper"}>
                        <List aria-label={"filter-list"}>
                            <ListItemButton sx={ButtonStyle} onClick={() => setShowCategory(prevState => !prevState)}>
                                <ListItemText primary="Categories"/>
                                {showCategory ? <ExpandLess/> : <ExpandMore/>}
                            </ListItemButton>
                            <Collapse in={showCategory} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {!categoryQuery.isLoading ? categoryQuery.data?.results?.map(item => <CategoryFilter
                                        key={item.id}
                                        setFilters={setFilters} filters={filters} data={item}/>) : "loading..."}

                                </List>
                            </Collapse>
                            <ListItemButton sx={ButtonStyle} onClick={() => setShowBrand(prevState => !prevState)}>
                                <ListItemText primary="Brands"/>
                                {showBrand ? <ExpandLess/> : <ExpandMore/>}
                            </ListItemButton>
                            <Collapse in={showBrand} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {!brandQuery.isLoading ? brandQuery.data?.results?.map(item => <BrandFilter
                                        key={item.id}
                                        setFilters={setFilters} filters={filters} data={item}/>) : "loading..."}
                                </List>
                            </Collapse>
                            <ListItem>
                                <Box sx={{display: "block", position: "relative", width: "100%"}}>
                                    <Typography variant={"h6"} component={"span"} fontWeight={600}>Price :</Typography>
                                    <Slider
                                        getAriaLabel={() => 'price filter'}
                                        value={filters.price}
                                        onChange={handleChange}
                                        max={maxPrice}
                                        valueLabelDisplay="auto"
                                        disableSwap
                                        step={0.01}
                                        getAriaValueText={() => `$${filters.price}`}
                                        valueLabelFormat={(value, index) => `$${filters.price[index]}`}
                                    />
                                    <small>set to 0 to ignore</small>
                                </Box>
                            </ListItem>
                            <ListItem>
                                <FormGroup sx={{"& span": {fontWeight: 600}}}>
                                    <FormControlLabel
                                        control={<Switch name={"is_recommend"} color={"secondary"}
                                                         checked={filters.is_recommend}
                                                         onChange={() => setFilters({
                                                             ...filters,
                                                             is_recommend: !filters.is_recommend
                                                         })}/>}
                                        label="RECOMMEND"/>
                                </FormGroup>
                            </ListItem>
                            <ListItem>
                                <FormGroup sx={{"& span": {fontWeight: 600}}}>
                                    <FormControlLabel
                                        control={<Switch name={"is_special"} color={"secondary"}
                                                         checked={filters.is_special}
                                                         onChange={() => setFilters({
                                                             ...filters,
                                                             is_special: !filters.is_special
                                                         })}/>}
                                        label="SPECIAL"/>
                                </FormGroup>
                            </ListItem>
                        </List>
                        <Button variant={"contained"} color={"black"} sx={{color: "background.main"}}
                                onClick={handleFilter}>Filter</Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={8} xl={10} component={"section"}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 2,
                        marginX: "1rem",
                        backgroundColor: "background.main",
                        borderRadius: "7px",
                        boxShadow: "0 0 4px var(--box-shadow-color)",
                    }}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link to={"/"} className={""}>
                                Home
                            </Link>
                            <Link to={"/products"} className={""}>
                                Products
                            </Link>
                            {category && <span>
                                {category}
                            < /span>}
                        </Breadcrumbs>
                        <FormControl sx={{minWidth: "150px"}}>
                            <InputLabel id="order-label" sx={{fontWeight: 600}}>SORT</InputLabel>
                            <Select
                                labelId="order-label"
                                id="order-select"
                                value={filters.ordering}
                                label="Order"
                                onChange={(e) => {
                                    setFilters({...filters, ordering: e.target.value})
                                }}
                            >
                                <MenuItem value={"create_at"}>ASC</MenuItem>
                                <MenuItem value={"-create_at"}>DESC</MenuItem>
                                <MenuItem value={"product__sale_price"}>LowPrice</MenuItem>
                                <MenuItem value={"-product__sale_price"}>LargestPrice</MenuItem>
                                <MenuItem value={"?"}>RANDOM</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <ProductBox isLoading={productQuery.isLoading} data={productQuery.data}/>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "end",
                        padding: 2,
                        marginX: "1rem",
                    }}>
                        <Pagination shape="rounded" color={"secondary"}
                                    count={!productQuery.isLoading ? Math.round(productQuery?.data?.count / 30) : filters.page}
                                    page={filters.page}
                                    onChange={(e, value) => {
                                        let newValue = filters
                                        newValue.page = value
                                        setFilters(newValue)
                                        productQuery.refetch()
                                    }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}


const ButtonStyle = {
    backgroundColor: "secondary.light",
    "&:hover": {
        backgroundColor: "secondary.main",
    },
    "& span": {
        fontWeight: 600,
    }
}

export default Products