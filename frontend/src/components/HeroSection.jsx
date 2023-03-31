import {Box, Button, Chip, Typography,} from "@mui/material";
import {Facebook, Instagram, Telegram, Twitter} from "@mui/icons-material";
import {Link} from "react-router-dom";

const HeroSection = () => {
    return (
        <Box component={"div"} className={"hero-section"}>
            <Box sx={{
                display: "flex",
                flexDirection: {xs: "row", md: "column"},
                justifyContent: "center",
                gap: 2,
                height: "fit-content",
                marginLeft: {xs: 0, sm: 2, md: 5, lg: 2},
                marginY: {xs: 0, md: 20},
                borderRadius: "7px",
                padding: 1,
                backgroundColor: "rgba(0,0,0,0.1)",
            }}>
                <Telegram fontSize={"large"} color={"background"} className={"hero-section-icon"}/>
                <Instagram fontSize={"large"} color={"background"} className={"hero-section-icon"}/>
                <Facebook fontSize={"large"} color={"background"} className={"hero-section-icon"}/>
                <Twitter fontSize={"large"} color={"background"} className={"hero-section-icon"}/>
            </Box>
            <Box component={"section"} sx={{
                marginLeft: {xs: 0, sm: 2, md: 5, lg: 2},
                marginY: {xs: 30, md: 10},
                borderRadius: "7px",
                padding: 5,
                width: "100%",
                maxWidth: {xs:"100%",md:"25rem"},
                height: {xs:"100%",md:"75%"},
                display: "flex",
                flexDirection: "column",
                backgroundColor: "rgba(0,0,0,0.1)",
            }}>
                <Typography variant={"h3"} component={"h1"} color={"background.dark"} className={"hero-section-title"}>
                    the most extinguish flower bouquet in europe
                </Typography>
                <Box sx={{flexGrow: 3, display: "flex", flexDirection: "column", gap: 5}}>
                    <Typography variant={"body1"} component={"p"} color={"background.dark"}
                                className={"hero-section-p"}>
                        buy the most special bouquet for special occasion or person of your life , the most extinguished
                        flowers you have ever seen in entire Europe and beyond that . go explore and find what you like
                        the most
                    </Typography>
                    <Box display={"inline-block"}>
                        <Chip label={"Fresh"} variant={"filled"}
                              sx={chipStyle}/>
                        <Chip label={"Healthy"}  color={"secondary"} variant={"filled"}
                              sx={chipStyle}/>
                        <Chip label={"Wrapped"}  color={"secondary"} variant={"filled"}
                              sx={chipStyle}/>
                        <Chip label={"Special"}  color={"secondary"} variant={"filled"}
                              sx={chipStyle}/>

                    </Box>
                </Box>
                <Button variant={"contained"} component={Link} to={"/products"} color={"secondary"} sx={{color: "text.main"}}>
                    Explore
                </Button>
            </Box>
        </Box>
    )
}

export const chipStyle = {
    borderRadius: "7px",
    backgroundColor:"background.main",
    width: "45%",
    marginY: 1,
    marginX: 1,
}

export default HeroSection