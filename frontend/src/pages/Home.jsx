import HeroSection from "../components/HeroSection";
import {Box, Container, Grid, Typography} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {BasicProductApi, ProductIsRecommendApi, ProductIsSpecialApi} from "../features/api/ProductsApi";
import SEO from "../SEO";
import {BasicCategoriesApi} from "../features/api/CategoriesApi";
import CategoryItem, {CategoryItemSkeleton} from "../components/CategoryItem";
import * as React from "react";
import ProductCard, {ProductCardSkeleton} from "../components/ProductCard";
import LandingImage from "../assets/landing-image.jpg"


const Home = () => {

    const productsQuery = useQuery({
        queryKey: ["products", "latest"],
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
        <Box component={"main"} overflow={"hidden"}>
            <SEO type={"Landing Page"} title={"Flower Shop | Home"}
                 description={"buy the most special and extinguished flower bouquet in europe"} name={"Flower Shop"}
                 author={"flower shop"} publish={"flower shop"}/>
            <HeroSection/>
            <Box sx={{display: "block", position: "relative", backgroundColor: "none", padding: 3, top: {xs:0,md:"-5rem"}}}>
                <ul className={"special-list"}>
                    <li>
                        <Typography variant={"h4"} component={"h4"} fontWeight={500}>
                            Payment
                        </Typography>
                        <Typography variant={"subtitle1"} component={"p"}>
                            you can pay online by paypal or credit cards
                        </Typography>
                    </li>
                    <li>
                        <Typography variant={"h4"} component={"h4"} fontWeight={500}>
                            Delivery
                        </Typography>
                        <Typography variant={"subtitle1"} component={"p"}>
                            we delivery on address you select on order and unfortunately cause of type of our product
                            its very sensitive of delivery spot and time,
                        </Typography>
                    </li>
                    <li>
                        <Typography variant={"h4"} component={"h4"} fontWeight={500}>
                            Support
                        </Typography>
                        <Typography variant={"subtitle1"} component={"p"}>
                            our expert 24/7 are ready to help you, and give you advises relative of your question
                        </Typography>
                    </li>
                    <li>
                        <Typography variant={"h4"} component={"h4"} fontWeight={500}>
                            Refund
                        </Typography>
                        <Typography variant={"subtitle1"} component={"p"}>
                            we sell flowers related products and cause of the type of business there is no refund,
                            except if you cancel your order immediately and before your product is ready
                        </Typography>
                    </li>
                </ul>
            </Box>
            <Container maxWidth={"lg"} sx={{marginY: 10}}>
                <Grid container spacing={0} sx={{
                    backgroundImage: "linear-gradient(-45deg,var(--secondary),var(--secondary-light))",
                    boxShadow: "2px 2px 6px grey , -50px -50px 0 lightgrey ",
                    borderRadius: "2rem"
                }}>
                    <Grid item xs={12} md margin={0} padding={0}>
                        <img src={LandingImage} alt={"image"} className={"landing-image"}/>
                    </Grid>
                    <Grid item xs={12} md>
                        <Box sx={{
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            width: "100%",
                            padding: 6,
                            gap: 2,
                        }}>
                            <Typography variant={"h2"} component={"p"} fontWeight={700} fontFamily={"Caveat"}>Who We are
                                ?</Typography>
                            <Typography variant={"body1"} fontWeight={500} component={"p"}>we are a family company in
                                east london and
                                have a history of 123 year old were our ancestor place our root here and opened a tiny
                                flower shop, and after so many generation we are now a big cross country company in
                                flower industry.
                                <br/><br/>
                                now in 2023 we are ONLINE and our dear customer can use our services everywhere they
                                are, our customer now can ORDER our product from any country in europe and we deliver on
                                spot.
                                <br/><br/>
                                we insist on FRESH and HEALTHY flowers cause when you see something LIVE it will make
                                you happy and give you life, and of course flowers are full of life
                                <br/><br/>
                                our flowers grow in our farms and organic and every day our spot shops receive fresh
                                flowers on so many variant & colors, you can chose you want your order be WRAPPED or its
                                for EVENT, special like weddings.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Container maxWidth={"xl"} sx={{paddingY: 10, marginBottom: {xs: 5, md: 5}, marginTop: 10}}>
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
                <Box component={"section"} sx={BoxStyleP}>
                    <Typography variant={"h2"} component={"h4"} sx={headerTextStyle}>SPECIAL</Typography>
                    <hr/>
                    <Box className={"inline-slider"}>
                        {!productsIsSpecialQuery.isLoading ? productsIsSpecialQuery.data?.results?.map(item =>
                                <ProductCard
                                    key={item.id} data={item}/>) :
                            <ProductCardSkeleton/>}
                    </Box>
                </Box>
            </Container>
            <Box component={"section"} sx={BoxStyleSpecial}>
                <SpecialSections title={"COLOR"}
                                 description={"find the most unique & special colors you ever seen in your life"}/>
                <SpecialSections title={"EVENT"}
                                 description={"suitable for any event you need to attend, shock everyone with what you bring"}/>
                <SpecialSections title={"VARIANT"}
                                 description={"dont know of what type of flower you like ? we have every variant and you can chose what you like"}/>
                <SpecialSections title={"COLOR"}
                                 description={"find the most unique & special colors you ever seen in your life"}/>
            </Box>
            <Container maxWidth={"xl"} sx={{paddingY: 5}}>
                <Box component={"section"} sx={BoxStyleP}>
                    <Typography variant={"h2"} component={"h4"} sx={headerTextStyle}>RECOMMEND</Typography>
                    <hr/>
                    <Box className={"inline-slider"}>
                        {!productsIsRecommendQuery.isLoading ? productsIsRecommendQuery.data?.results?.map(item =>
                                <ProductCard key={item.id} data={item}/>) :
                            <ProductCardSkeleton/>}
                    </Box>
                </Box>
                <Box component={"section"} sx={BoxStyleP}>
                    <Typography variant={"h2"} component={"h4"} sx={headerTextStyle}>LATEST PRODUCT</Typography>
                    <hr/>
                    <Box className={"inline-slider"}>
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
            backgroundColor: "secondary.contrast",
            padding: 1,
            borderRadius: "7px",
            minWidth: "350px",
            width: "100%",
            maxWidth: "450px",
            height: "200px",
        }}>
            <Typography variant={"h4"} fontWeight={600} sx={{color: "background.main"}}
                        letterSpacing={5}>{title}</Typography>
            <Typography variant={"caption"} fontWeight={500}
                        sx={{
                            minWidth: "250px",
                            maxWidth: "400px",
                            width: "100%",
                            textAlign: "center",
                            color: "background.main"
                        }}>
                {description}
            </Typography>
        </Box>
    )
}

const BoxStyle = {
    position: "relative",
    padding: 5,
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
}
const BoxStyleSpecial = {
    ...BoxStyle,
    background: 'linear-gradient(rgba(206, 147, 216, 0.2),rgba(186, 104, 200, 0.4)) ,url(/src/assets/banner.jpeg)',
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",

}
const BoxStyleP = {
    padding: 1,
    marginY: 5,

}
const headerTextStyle = {
    textAlign: "center",
    fontWeight: 200,
    fontFamily: "robot",
    letterSpacing: 4

}


export default Home