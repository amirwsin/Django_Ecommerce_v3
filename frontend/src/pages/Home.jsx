import HeroSection from "../components/HeroSection";
import {Box, Container} from "@mui/material";
import ProductBox from "../components/ProductBox";
import {useQuery} from "@tanstack/react-query";
import {BasicProductApi} from "../features/api/ProductsApi";


const Home = () => {

    const productsQuery = useQuery({
        queryKey: ["products"],
        queryFn: BasicProductApi
    })

    return (
        <Box component={"main"} sx={{marginY: 2.4, zIndex: 1}}>
            <HeroSection/>
            <Container sx={{paddingY: 5}}>
                <ProductBox data={productsQuery.data} isLoading={productsQuery.isLoading}/>
                test
            </Container>
        </Box>
    );
}

export default Home