import {Box, Typography} from "@mui/material";

const StatusCard = ({bgColor, color, title, text, icon}) => {
    return (
        <Box sx={{
            position: "relative",
            display: "grid",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            padding: 3,
            borderRadius: "7px",
            color: color ? color : "black",
            textAlign: "center",
            backgroundColor: bgColor ? bgColor : "primary.main",
            transition: "all 0.3s linear",
            "&:hover": {
                boxShadow: "0 2px 4px grey",
            }
        }}>
            {icon}
            <Typography variant={"h5"} component={"p"}>
                {title}
            </Typography>
            <Typography variant={"body1"} component={"p"}>
                {text}
            </Typography>
        </Box>
    )
}
export default StatusCard