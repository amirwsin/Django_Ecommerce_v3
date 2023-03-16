import {Box, Checkbox, Collapse, List, ListItemButton, ListItemText} from "@mui/material";
import {useState} from "react";
import * as React from "react";
import {useQuery} from "@tanstack/react-query";
import {BasicCategoriesApi} from "../features/api/CategoriesApi";
import {BasicBrandApi} from "../features/api/BrandsApi";

const ProductsFilterBox = ({params, setParam}) => {
    const [showCategories, setShowCategories] = useState(true)
    const [showBrands, setShowBrands] = useState(true)


    const categoryQuery = useQuery({
        queryKey: ["categories"],
        queryFn: BasicCategoriesApi
    })

    const brandQuery = useQuery({
        queryKey: ["brands"],
        queryFn: BasicBrandApi
    })

    const handleShow = (type) => {
        if (type === "category") {
            setShowCategories(prevState => !prevState)
        }
        if (type === "brand") {
            setShowBrands(prevState => !prevState)
        }

    }

    return (
        <Box className={"product-filter-wrapper"}>
            <List aria-label={"filter-list"}>
                <ListItemButton onClick={() => handleShow("category")}>
                    <ListItemText primary={"Categories"}/>
                </ListItemButton>
                <Collapse in={showCategories} timeout="auto" unmountOnExit>
                    <ProductFilterList params={params} setParams={setParam} data={categoryQuery.data}
                                       isLoading={categoryQuery.isLoading}/>
                </Collapse>
                <ListItemButton onClick={() => handleShow("brand")}>
                    <ListItemText primary={"Brands"}/>
                </ListItemButton>
                <Collapse in={showBrands} timeout="auto" unmountOnExit>
                    <ProductFilterList params={params} setParams={setParam} data={brandQuery.data}
                                       isLoading={brandQuery.isLoading}/>
                </Collapse>
            </List>
        </Box>
    )
}

export const ProductFilterList = ({data, isLoading, params, setParams}) => {
    return (
        <List component="div" disablePadding>
            {!isLoading ?
                data?.results.map((item) => <ProductFilterItem category={params} setCategory={setParams} key={item.id}
                                                               data={item}/>)
                :
                <>loading</>}
        </List>
    )
}
export const ProductFilterItem = ({data, category, setCategory}) => {

    const [check, setCheck] = useState(category && category === data.slug ? true : false)

    const handleCheck = () => {
        setCheck(prevState => !prevState)
        setCategory(data.slug)
    }

    return (
        <ListItemButton sx={{pl: 4}} onClick={handleCheck}>
            <ListItemText primary={data.name}/>
            <Checkbox checked={check}/>
        </ListItemButton>
    )
}

export default ProductsFilterBox