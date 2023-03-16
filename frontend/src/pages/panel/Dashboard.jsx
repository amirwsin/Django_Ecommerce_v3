import {useSelector} from "react-redux";
import {Box, Grid} from "@mui/material";
import StatusCard from "../../components/StatusCard";
import {AssignmentLateOutlined, AssignmentTurnedInOutlined, PendingActionsOutlined} from "@mui/icons-material";

const Dashboard = () => {
    const {user} = useSelector(state => state.authReducer)
    const readyData = JSON.parse(user)
    return (
        <Box className={"panel-box"}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <StatusCard text={"You Have 13 Completed Order"} bgColor={"primary.light"} color={"primary.dark"}
                                title={"Completed Orders"}
                                icon={<AssignmentTurnedInOutlined sx={{justifySelf: "center", fontSize: "4rem"}}/>}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StatusCard text={"You Have 1 Pending Order"} bgColor={"secondary.light"} color={"secondary.dark"}
                                title={"Pending Orders"}
                                icon={<PendingActionsOutlined sx={{justifySelf: "center", fontSize: "4rem"}}/>}/>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StatusCard text={"You Have 2 Completed Order"} bgColor={"lightgrey"} color={"grey"}
                                title={"Canceled Orders"}
                                icon={<AssignmentLateOutlined sx={{justifySelf: "center", fontSize: "4rem"}}/>}/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Dashboard