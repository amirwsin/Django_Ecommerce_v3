import HeroSection from "../components/HeroSection";
import {Box, Container, Typography} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {BasicProductApi, ProductIsRecommendApi, ProductIsSpecialApi} from "../features/api/ProductsApi";
import SEO from "../SEO";
import {BasicCategoriesApi} from "../features/api/CategoriesApi";
import CategoryItem, {CategoryItemSkeleton} from "../components/CategoryItem";
import * as React from "react";
import {blue, grey, pink, purple, red, yellow} from "@mui/material/colors";
import ProductCard, {ProductCardSkeleton} from "../components/ProductCard";


const Home = () => {

    const productsQuery = useQuery({
        queryKey: ["products"],
        queryFn: BasicProductApi,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: true

    })
    const productsIsSpecialQuery = useQuery({
        queryKey: ["products", "special"],
        queryFn: ProductIsSpecialApi,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: true
    })
    const productsIsRecommendQuery = useQuery({
        queryKey: ["products", "recommend"],
        queryFn: ProductIsRecommendApi,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: true
    })


    const categoryQuery = useQuery({
        queryKey: ["categories"],
        queryFn: BasicCategoriesApi,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: true
    })

    return (
        <Box component={"main"}>
            <SEO type={"Landing Page"} title={"Flower Shop | Home"}
                 description={"buy the most special and extinguished flower bouquet in europe"} name={"Flower Shop"}
                 author={"flower shop"} publish={"flower shop"}/>
            <HeroSection/>
            <Container maxWidth={"xl"} sx={{paddingY: 10}}>
                <Box textAlign={"center"} component={"section"}>
                    <Typography variant={"h2"} component={"h2"} fontWeight={600}
                                fontFamily={"Caveat"}>Categories</Typography>
                    <Typography variant={"h4"} component={"p"} fontFamily={"Caveat"}>flowers</Typography>
                    <Typography variant={"h5"} component={"p"} fontFamily={"Caveat"}>ours</Typography>
                    <Box sx={BoxStyle}>
                        {!categoryQuery.isLoading ? categoryQuery.data?.results?.map(item => <CategoryItem
                                props={{style: {borderBottom: "1px solid lightgrey", padding: 3}}} key={item.id}
                                data={item}/>) :
                            <CategoryItemSkeleton/>}
                    </Box>
                </Box>
                <Box component={"section"} sx={BoxStyleP} style={{backgroundColor: "white"}}>
                    <Typography variant={"h2"} component={"h2"} textAlign={"center"} fontWeight={600}
                                fontFamily={"Caveat"}>special</Typography>
                    <hr/>
                    <Box className={"inline-slider"}>
                        {!productsIsSpecialQuery.isLoading ? productsIsSpecialQuery.data?.results?.map(item =>
                                <ProductCard
                                    key={item.id} data={item}/>) :
                            <ProductCardSkeleton/>}
                    </Box>
                </Box>
            </Container>

            <Box component={"section"} sx={BoxStyle} style={{backgroundColor: grey[800]}}>
                <SpecialSections color={pink[50]} title={"Colors"}
                                 description={"find the most unique & special colors you ever seen in your life"}/>
                <SpecialSections color={blue[50]} title={"Event"}
                                 description={"suitable for any event you need to attend, shock everyone with what you bring"}/>
                <SpecialSections color={yellow[50]} title={"Variant"}
                                 description={"dont know of what type of flower you like ? we have every variant and you can chose what you like"}/>
            </Box>
            <Container maxWidth={"xl"} sx={{paddingY: 5}}>
                <Box component={"section"} sx={BoxStyleP} style={{backgroundColor: "white"}}>
                    <Typography variant={"h2"} component={"h2"} textAlign={"center"} fontWeight={600}
                                fontFamily={"Caveat"}>recommended</Typography>
                    <hr/>
                    <Box className={"inline-slider"}>
                        {!productsIsRecommendQuery.isLoading ? productsIsRecommendQuery.data?.results?.map(item =>
                                <ProductCard key={item.id} data={item}/>) :
                            <ProductCardSkeleton/>}
                    </Box>
                </Box>
                <Box component={"section"} sx={BoxStyleP}>
                    <Typography variant={"h2"} component={"h2"} textAlign={"center"} fontWeight={600}
                                fontFamily={"Caveat"}>latest</Typography>
                    <hr/>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: 2,
                        justifyContent: "center"
                    }}>
                        {!productsQuery.isLoading ? productsQuery.data?.results?.map(item => <ProductCard key={item.id}
                                                                                                          data={item}/>) :
                            <ProductCardSkeleton/>}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}


export const SpecialSections = ({title, description, color}) => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: color,
            padding: 1,
            borderRadius: "7px",
            minWidth: "300px",
            width: "100%",
            maxWidth: "450px",
            height: "200px",
        }}>
            <Typography variant={"h4"} fontWeight={600}>{title}</Typography>
            <Typography variant={"caption"} color={"grey"} fontWeight={500}
                        sx={{minWidth: "250px", maxWidth: "400px", width: "100%", textAlign: "center"}}>
                {description}
            </Typography>
        </Box>
    )
}

const BoxStyle = {
    padding: 5,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
}
const BoxStyleP = {
    backgroundColor: "transparent",
    padding: 1,
    borderRadius: "7px",
    marginY: 5
}


export default Home