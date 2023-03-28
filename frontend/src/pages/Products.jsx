import {
    Box,
    Button, Checkbox, Collapse,
    Container,
    FormControlLabel,
    FormGroup,
    Grid,
    List,
    ListItem, ListItemButton, ListItemText,
    Slider, Switch,
    Typography
} from "@mui/material";
import ProductBox from "../components/ProductBox";
import {useQuery} from "@tanstack/react-query";
import {ProductFilter} from "../features/api/ProductsApi";
import {useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import SEO from "../SEO";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {BasicCategoriesApi} from "../features/api/CategoriesApi";
import CategoryFilter from "../components/CategoryFilter";
import {BasicBrandApi} from "../features/api/BrandsApi";
import BrandFilter from "../components/BrandFilter";


const Products = () => {
    const {category} = useParams()
    const [filters, setFilters] = useState({
        price: [0, 0], category: [], brand: [], is_recommend: false, is_special: false,
    })
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
        setFilters(newValue)
        productQuery.refetch()
    }, [category])

    return (
        <Container maxWidth={false} sx={{marginY: 5, minHeight: "60vh"}}>
            <SEO type={"text/html"} title={`Flower Shop | Products ${category ? category : ""}`}
                 keywords={`flower , flower shop , buy online flower , ${category ? category : ""}`}
                 description={`list of product of flower shop , ${category ? category : ""}`} name={"Flower Shop"}
                 author={"flower shop"} publish={"flower shop"}/>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4} xl={2}>
                    <Box className={"product-filter-wrapper"}>
                        <List aria-label={"filter-list"}>
                            <ListItemButton onClick={() => setShowCategory(prevState => !prevState)}>
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
                            <ListItemButton onClick={() => setShowBrand(prevState => !prevState)}>
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
                                    <Typography variant={"h6"} component={"span"}>Price :</Typography>
                                    <Slider
                                        getAriaLabel={() => 'price filter'}
                                        value={filters.price}
                                        onChange={handleChange}
                                        valueLabelDisplay="auto"
                                        disableSwap
                                        step={0.01}
                                        getAriaValueText={() => `$${filters.price}`}
                                        valueLabelFormat={(value, index) => `$${filters.price[index]}`}
                                    />
                                </Box>
                            </ListItem>
                            <ListItem>
                                <FormGroup>
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
                                <FormGroup>
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
                <Grid item xs={12} md={8} xl={10}>
                    <ProductBox isLoading={productQuery.isLoading} data={productQuery.data}/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Products