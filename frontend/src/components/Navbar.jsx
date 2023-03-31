import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
import {AdminPanelSettings, Dashboard, MoreVert, ShoppingCartOutlined} from "@mui/icons-material";
import {
    Avatar, Badge,
    Collapse,
    Container,
    Drawer,
    IconButton,
    Tooltip
} from "@mui/material";
import {useRef, useState} from "react";
import CategoryMenuList from "./CategoryMenuList";
import SideBarMenu from "./SideBarMenu";
import {useSelector} from "react-redux";
import {useQuery} from "@tanstack/react-query";
import {BasicCategoriesApi} from "../features/api/CategoriesApi";


const Navbar = () => {

    const [categoryMenuList, setCategoryMenuList] = useState(false)
    const [sideBar, setSideBar] = useState(false)
    const {user, isAuthenticated} = useSelector(state => state.authReducer)
    const {qty} = useSelector(state => state.cartReducer)

    const handleSideBar = () => {
        setSideBar(prevState => !prevState)
    }

    const handleCategoryTriggerClick = () => {
        setCategoryMenuList(prevState => !prevState)
    }

    const categoryQuery = useQuery({
        queryKey: ["categories"],
        queryFn: BasicCategoriesApi,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled: true
    })


    return (
        <Box sx={{flexGrow: 1, zIndex: 2, height: "60px", position: "sticky", top: 0}} component={"div"}>
            <AppBar sx={{backgroundColor: "background.main"}} >
                <Toolbar sx={{paddingX: {xs: 2, sm: 5, md: 10, lg: 5}, gap: 10, justifyContent: "space-between"}}>
                    <Box sx={{flexGrow: {xs: 0, md: 1}, display: "flex", gap: 2, alignItems: "center"}}>
                        <IconButton onClick={handleSideBar} size={"large"} sx={{display: {xs: "block", md: "none"}}}>
                            <MoreVert/>
                        </IconButton>
                        <Typography className={"logo-text"} sx={{display: {xs: "none", sm: "block"}}} component={Link}
                                    to={"/"}>
                            Flower Shop
                        </Typography>
                        <small className={"logo-mini-text"}>
                            special
                        </small>
                        <small className={"logo-mini-text"}>
                            Wrapped
                        </small>
                        <small className={"logo-mini-text"}>
                            online
                        </small>
                    </Box>
                    <Box sx={{display: {xs: "none", sm: "none", md: "flex"}, gap: 3, flexGrow: 2}} component={"nav"}>
                        <Link to={"/"} className={"navbar-link"}>
                            HOME
                        </Link>
                        <Link to={"/products"} className={"navbar-link"}>
                            DISCOVER
                        </Link>
                        <span className={"navbar-link category-trigger"} onClick={handleCategoryTriggerClick}>
                            CATEGORIES
                        </span>
                        <span className={"navbar-link"}>
                            ABOUT US
                        </span>
                    </Box>
                    <Box sx={{display: "flex", flexGrow: 0, gap: 2}}>
                        <Tooltip arrow title="Shopping Cart">
                            <IconButton component={Link} to={"/cart"} color={"background.main"}
                                        aria-label={"shopping cart"}>
                                <Badge badgeContent={qty} color="primary">
                                    <ShoppingCartOutlined/>
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        {isAuthenticated && user ?
                            <>
                                <Tooltip arrow title="Dashboard">
                                    <IconButton component={Link} to={"/user/dashboard"} sx={{p: 0}}>
                                        <Avatar/>
                                    </IconButton>
                                </Tooltip>
                                {JSON.parse(user).is_staff | JSON.parse(user).is_superuser &&
                                <Tooltip arrow title="AdminDashboard">
                                    <IconButton component={Link} to={"/admin/dashboard"} sx={{p: 0}}>
                                        <AdminPanelSettings fontSize={"large"}/>
                                    </IconButton>
                                </Tooltip>
                                }
                            </> :
                            <Button component={Link} to={"/login"} color="primary"
                                    variant={"outlined"}>Sign In</Button>}

                    </Box>
                </Toolbar>
            </AppBar>
            <Collapse in={categoryMenuList} className={"category-menu"} timeout="auto" unmountOnExit>
                <Container maxWidth={"xl"}>
                    <CategoryMenuList data={categoryQuery.data} isLoading={categoryQuery.isLoading}/>
                </Container>
            </Collapse>
            <Drawer
                anchor={"left"}
                open={sideBar}
                onClose={handleSideBar}
            >
                <SideBarMenu data={categoryQuery.data} isLoading={categoryQuery.isLoading}/>
            </Drawer>
        </Box>
    )
}

export default Navbar