import {Box, Container, Typography} from "@mui/material";
import {CheckCircleOutline} from "@mui/icons-material";

const ConfirmPayment = () => {
    return (
        <Container maxWidth={"md"} sx={{minHeight: "70vh",display:"grid",alignItems:"center"}}>
            <Box sx={{
                position: "relative",
                display: "block",
                backgroundColor: "background.main",
                padding: 3,
                width: "100%",
                borderRadius: "7px",
                boxShadow: "0px 2px 6px var(--box-shadow-color)",
                textAlign: "center",
            }}>
                <CheckCircleOutline sx={{fontSize: 128, color: "success.light"}}/>
                <Typography variant={"h2"} textAlign={"center"} fontWeight={600} component={"p"}>Payment
                    Completed</Typography>
                <Typography variant={"body1"} component={"p"}>
                    thank you for selecting our shop, Your order has been registered and is under review and you can
                    check the status of it in your panel in orders section,pleas be patient and if you have any
                    question please contact our support team and they will help you
                </Typography>
            </Box>
        </Container>
    )
}

export default ConfirmPayment