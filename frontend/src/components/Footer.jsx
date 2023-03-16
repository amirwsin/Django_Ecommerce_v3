import {Box, Container, Divider, Grid, Typography} from "@mui/material";
import {Facebook, Instagram, LinkedIn, Pinterest, Twitter} from "@mui/icons-material";

let date = new Date().getFullYear()

const Footer = () => {
    return (
        <Box component={"footer"} className={"footer"}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <ul className={"footer-list"}>
                            <Typography className={"footer-list-header"} component={"li"}>
                                About us
                            </Typography>
                            <hr/>
                            <Typography className={"footer-list-item"} component={"li"}>
                                terms
                            </Typography>
                            <Typography className={"footer-list-item"} component={"li"}>
                                delivery
                            </Typography>
                            <Typography className={"footer-list-item"} component={"li"}>
                                contact us
                            </Typography>
                        </ul>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <ul className={"footer-list"}>
                            <Typography className={"footer-list-header"} component={"li"}>
                                About us
                            </Typography>
                            <hr/>
                            <Typography className={"footer-list-item"} component={"li"}>
                                terms
                            </Typography>
                            <Typography className={"footer-list-item"} component={"li"}>
                                delivery
                            </Typography>
                            <Typography className={"footer-list-item"} component={"li"}>
                                contact us
                            </Typography>
                        </ul>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <ul className={"footer-list"}>
                            <Typography className={"footer-list-header"} component={"li"}>
                                Social Media
                            </Typography>
                            <hr/>
                            <Box sx={{
                                position: "relative",
                                display: "flex",
                                gap: 3,
                                justifyContent: "center",
                                alignItems: "center",
                                marginY: "10%"
                            }}>
                                <Twitter fontSize={"large"} className={"footer-list-social-icon"}/>
                                <Instagram fontSize={"large"} className={"footer-list-social-icon"}/>
                                <Facebook fontSize={"large"} className={"footer-list-social-icon"}/>
                                <Pinterest fontSize={"large"} className={"footer-list-social-icon"}/>
                                <LinkedIn fontSize={"large"} className={"footer-list-social-icon"}/>
                            </Box>
                        </ul>
                    </Grid>
                </Grid>
            </Container>
            <Divider variant={"middle"}/>
            <Typography component={"p"} variant={"subtitle2"} textAlign={"center"} marginY={2}>
                ©{date} this template created by Varlam Zhordania All Rights Reserved.
            </Typography>
        </Box>
    )
}
export default Footer