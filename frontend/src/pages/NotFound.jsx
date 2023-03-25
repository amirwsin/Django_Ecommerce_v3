import notFound from "../assets/404.svg"
import {Box, Container, Typography} from "@mui/material";

const NotFound = () => {
    return (
        <Container sx={{marginY: 5, minHeight: "60vh"}} maxWidth={"xl"}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height:"100%"
            }}>
                <img src={notFound} alt={"404 error"} style={{position:"relative",display:"block",height:"100%",minWidth:"260px",maxWidth:"400px"}} loading={"lazy"}/>
                <Typography variant={"h2"} fontWeight={600} component={"span"}>
                    Page Not Found ! 404
                </Typography>
            </Box>
        </Container>

    )
}

export default NotFound