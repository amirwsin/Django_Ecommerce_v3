import {Box, Button, Chip, Typography,} from "@mui/material";
import {Facebook, Instagram, Telegram, Twitter} from "@mui/icons-material";

const HeroSection = () => {
    return (
        <Box component={"div"} className={"hero-section"}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                height: "fit-content",
                marginLeft: {xs: 1, sm: 2, md: 5, lg: 2},
                marginY: 20,
                borderRadius: "7px",
                padding: 1,
                backgroundColor: "secondary.light",
            }}>
                <Telegram fontSize={"large"} className={"hero-section-icon"}/>
                <Instagram fontSize={"large"} className={"hero-section-icon"}/>
                <Facebook fontSize={"large"} className={"hero-section-icon"}/>
                <Twitter fontSize={"large"} className={"hero-section-icon"}/>
            </Box>
            <Box component={"section"} sx={{
                marginLeft: {xs: 1, sm: 2, md: 5, lg: 2},
                marginY: 10,
                borderRadius: "7px",
                padding: 5,
                width: "100%",
                maxWidth: "25rem",
                height: "75%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "rgba(0,0,0,0.1)",
            }}>
                <Typography variant={"h3"} component={"h1"} className={"hero-section-title"}>
                    the most extinguish flower bouquet in europe
                </Typography>
                <Box sx={{flexGrow: 3, display: "flex", flexDirection: "column", gap: 5}}>
                    <Typography variant={""} component={"p"} className={"hero-section-p"}>
                        buy the most special bouquet for special occasion or person of your life , the most extinguished
                        flowers you have ever seen in entire Europe and beyond that . go explore and find what you like
                        the most
                    </Typography>
                    <Box display={"inline-block"}>
                        <Chip label={"Fresh"} variant={"filled"}
                              sx={chipStyle}/>
                        <Chip label={"Healthy"} variant={"filled"}
                              sx={chipStyle}/>
                        <Chip label={"Wrapped"} variant={"filled"}
                              sx={chipStyle}/>
                        <Chip label={"Special"} variant={"filled"}
                              sx={chipStyle}/>

                    </Box>
                </Box>
                <Button variant={"contained"} color={"black"} sx={{color: "secondary.main"}}>
                    Explore
                </Button>
            </Box>
        </Box>
    )
}

export const chipStyle = {
    borderRadius: "7px",
    backgroundColor: "background.main",
    color: "secondary.main",
    width: "45%",
    marginY: 1,
    marginX: 1,
}

export default HeroSection