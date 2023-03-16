import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
import {DarkMode, LightMode, MoreVert, ShoppingCartOutlined} from "@mui/icons-material";
import {
    Avatar, Badge,
    Collapse,
    Container,
    Drawer,
    IconButton,
    Tooltip
} from "@mui/material";
import {useContext, useState} from "react";
import CategoryMenuList from "./CategoryMenuList";
import SideBarMenu from "./SideBarMenu";
import {useSelector} from "react-redux";
import {useQuery} from "@tanstack/react-query";
import {BasicCategoriesApi} from "../features/api/CategoriesApi";
import {ColorModeContext} from "../theme";


const Navbar = () => {

    const [categoryMenuList, setCategoryMenuList] = useState(false)
    const [sideBar, setSideBar] = useState(false)
    const {user, isAuthenticated} = useSelector(state => state.authReducer)
    const {qty} = useSelector(state => state.cartReducer)
    const [themeColor, setThemeColor] = useState(true)
    const colorMode = useContext(ColorModeContext)

    const handleSideBar = () => {
        setSideBar(prevState => !prevState)
    }

    const handleCategoryTriggerClick = () => {
        setCategoryMenuList(prevState => !prevState)
    }

    const categoryQuery = useQuery({
        queryKey: ["categories"],
        queryFn: BasicCategoriesApi
    })

    const handleThemeColor = () => {
        colorMode.toggleColorMode()
        setThemeColor(prevState => !prevState)
        document.documentElement.setAttribute('data-theme', themeColor ? 'dark' : 'light');
    }


    return (
        <Box sx={{flexGrow: 1, zIndex: 2, height: "60px"}} component={"header"}>
            <AppBar position="sticky" sx={{backgroundColor: "background.main"}}>
                <Toolbar sx={{paddingX: {xs: 2, sm: 5, md: 10, lg: 30}, justifyContent: "space-between"}}>
                    <IconButton onClick={handleSideBar} size={"large"} sx={{display: {xs: "block", md: "none"}}}>
                        <MoreVert/>
                    </IconButton>
                    <Typography className={"logo-text"} component={Link} to={"/"} sx={{flexGrow: {xs: 0, md: 1}}}>
                        Logo
                    </Typography>
                    <Box sx={{display: {xs: "none", sm: "none", md: "flex"}, flexGrow: 1, gap: 3}} component={"nav"}>
                        <Link to={"/"} className={"navbar-link"}>
                            Home
                        </Link>
                        <Link to={"/products"} className={"navbar-link"}>
                            Products
                        </Link>
                        <span className={"navbar-link category-trigger"} onClick={handleCategoryTriggerClick}>
                            Categories
                        </span>
                        <Link to={"/"} className={"navbar-link"}>
                            Term
                        </Link>
                    </Box>
                    <Box sx={{display: "flex", flexGrow: 0, gap: 2}}>
                        <IconButton onClick={handleThemeColor}>
                            {themeColor ? <LightMode sx={{fontSize: "1.85rem"}}/> :
                                <DarkMode sx={{fontSize: "1.85rem"}}/>}
                        </IconButton>
                        <Tooltip arrow title="Shopping Cart">
                            <IconButton component={Link} to={"/cart"} color={"background.main"}
                                        aria-label={"shopping cart"}>
                                <Badge badgeContent={qty} color="secondary">
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
                            </> :
                            <Button component={Link} to={"/login"} color="black" sx={{color: "white"}}
                                    variant={"contained"}>Login</Button>}

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
                <SideBarMenu/>
            </Drawer>
        </Box>
    )
}

export default Navbar