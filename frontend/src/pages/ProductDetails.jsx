import {Container, Grid} from "@mui/material";
import ProductDetail from "../components/ProductDetail";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {ProductBySlug} from "../features/api/ProductsApi";
import {useState} from "react";
import ProductDetailGallery from "../components/ProductDetailGallery";

const ProductDetails = () => {

    const [selection,setSelection] = useState()

    let {slug} = useParams()

    const ProductQuery = useQuery({
        queryKey: ["product", "slug"],
        queryFn: () => ProductBySlug(slug),
    })


    return (
        <Container sx={{marginY: 5,minHeight:"60vh"}} maxWidth={"xl"}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4} lg={5}>
                    <ProductDetailGallery data={ProductQuery.data}/>
                </Grid>
                <Grid item xs={12} md={8} lg={7}>
                    <ProductDetail setSelection={setSelection} data={ProductQuery.data} isLoading={ProductQuery.isLoading}/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ProductDetails