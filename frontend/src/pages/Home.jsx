import HeroSection from "../components/HeroSection";
import {Box, Container} from "@mui/material";
import ProductBox from "../components/ProductBox";
import {useQuery} from "@tanstack/react-query";
import {BasicProductApi} from "../features/api/ProductsApi";
import SEO from "../SEO";


const Home = () => {

    const productsQuery = useQuery({
        queryKey: ["products"],
        queryFn: BasicProductApi
    })

    return (
        <Box component={"main"}>
            <SEO type={"Landing Page"} title={"Flower Shop | Home"}
                 description={"buy the most special and extinguished flower bouquet in europe"} name={"Flower Shop"}
                 author={"flower shop"} publish={"flower shop"}/>
            <HeroSection/>
            <Container sx={{paddingY: 5}}>
                <ProductBox data={productsQuery.data} isLoading={productsQuery.isLoading}/>
                test
            </Container>
        </Box>
    );
}

export default Home