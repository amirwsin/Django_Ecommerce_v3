import {
    Box,
    Container,
    Grid,
    List,
    ListItemButton, ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AccountBox, Dashboard, Logout, ShoppingBasket, Signpost} from "@mui/icons-material";
import {logout} from "../features/actions/authActions";
import {Link} from "react-router-dom";

const PanelLayout = ({children}) => {
    const {user} = useSelector(state => state.authReducer)
    const readyData = JSON.parse(user)
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <Container maxWidth={"xl"} sx={{marginY: 5,minHeight:"60vh"}}>
            <Grid container spacing={5}>
                <Grid item xs={12} sm={12} md={4} lg={3} display={"flex"} flexDirection={"column"} gap={2}>
                    <Box sx={Style} padding={3}>
                        <Typography variant={"h5"} component={"p"} align={"center"} fontWeight={600}>
                            {readyData.username}
                        </Typography>
                        <Typography variant={"h5"} component={"p"} align={"center"} fontWeight={400}>
                            {readyData.email}
                        </Typography>
                    </Box>
                    <Box sx={Style}>
                        <List>
                            <ListItemButton component={Link} to={"/user/dashboard"}>
                                <ListItemIcon>
                                    <Dashboard/>
                                </ListItemIcon>
                                <ListItemText primary={"Dashboard"}/>
                            </ListItemButton>
                            <ListItemButton component={Link} to={"/user/dashboard/account/"}>
                                <ListItemIcon>
                                    <AccountBox/>
                                </ListItemIcon>
                                <ListItemText primary={"Account"}/>
                            </ListItemButton>
                            <ListItemButton component={Link} to={"/user/dashboard/orders/"}>
                                <ListItemIcon>
                                    <ShoppingBasket/>
                                </ListItemIcon>
                                <ListItemText primary={"Orders"}/>
                            </ListItemButton>
                            <ListItemButton component={Link} to={"/user/dashboard/address/"}>
                                <ListItemIcon>
                                    <Signpost/>
                                </ListItemIcon>
                                <ListItemText primary={"Address"}/>
                            </ListItemButton>
                            <ListItemButton onClick={handleLogout}>
                                <ListItemIcon>
                                    <Logout/>
                                </ListItemIcon>
                                <ListItemText primary={"Logout"}/>
                            </ListItemButton>
                        </List>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={9}>
                    {children}
                </Grid>
            </Grid>
        </Container>
    )
}

export const Style = {
    position: "relative",
    display: "grid",
    boxShadow: "0 2px 4px grey",
    borderRadius: "7px",
    gap: 2,
    backgroundColor: "background.main",
}

export default PanelLayout