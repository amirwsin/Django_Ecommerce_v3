import {Container, Grid} from "@mui/material";
import ProductsFilterBox from "../components/ProductsFilterBox";
import ProductBox from "../components/ProductBox";
import {useQuery} from "@tanstack/react-query";
import {BasicProductApi, ProductByCategoryApi} from "../features/api/ProductsApi";
import {useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import SEO from "../SEO";


const Products = () => {
    let {category} = useParams()
    let [searchParams, setSearchParams] = useSearchParams();
    let [categoryField, setCategoryField] = useState(category)

    const ProductQuery = useQuery({
        queryKey: ["products", "category"],
        queryFn: category ? () => ProductByCategoryApi(category) : BasicProductApi
    })

    useEffect(() => {
        ProductQuery.refetch()
        setCategoryField(category)
    }, [category])


    return (
        <Container maxWidth={false} sx={{marginY: 5, minHeight: "60vh"}}>
            <SEO type={"text/html"} title={`Flower Shop | Products ${category}`}
                 keywords={`flower , flower shop , buy online flower , ${category}`}
                 description={`list of product of flower shop , ${category}`} name={"Flower Shop"}
                 author={"flower shop"} publish={"flower shop"}/>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4} xl={2}>
                    <ProductsFilterBox params={categoryField} setParam={setCategoryField}/>
                </Grid>
                <Grid item xs={12} md={8} xl={10}>
                    <ProductBox isLoading={ProductQuery.isLoading} data={ProductQuery.data}/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Products