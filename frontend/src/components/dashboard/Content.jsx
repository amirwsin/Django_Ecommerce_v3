import {AppBar, Avatar, Badge, Box, Divider, IconButton, Menu, MenuItem, Toolbar} from "@mui/material";
import {AdminPanelSettings, DarkMode, LightMode, MoreVert, Notifications, Search, Settings} from "@mui/icons-material";
import {ColorModeContext} from "../../theme";
import {useContext, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../features/actions/authActions";
import {Link} from "react-router-dom";

const Content = ({children}) => {
    const [themeColor, setThemeColor] = useState(true)
    const colorMode = useContext(ColorModeContext)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const {user} = useSelector(state => state.authReducer)
    const readyData = JSON.parse(user)
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSideBar = () => {
        const sidebar = document.getElementById("sidebar")
        const lists = document.getElementsByClassName("sidebar-wrapper-inner-list-item")
        sidebar.classList.toggle("active")
        for (let i = 0; i < lists.length; i++) {
            lists[i].classList.toggle("open")
        }
    }
    const handleThemeColor = () => {
        colorMode.toggleColorMode()
        setThemeColor(prevState => !prevState)
        document.documentElement.setAttribute('data-theme', themeColor ? 'dark' : 'light');
    }


    return (
        <Box className={"content"}>
            <AppBar position={"static"} color={"background"}
                    sx={{boxShadow: "4px 2px 4px grey", borderBottom: "1px solid lightgrey"}}>
                <Toolbar sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    paddingY: 1,
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <IconButton onClick={handleSideBar}>
                        <MoreVert sx={{fontSize: "1.85rem"}}/>
                    </IconButton>
                    <Box className={"search-box"}>
                        <Search/>
                        <input type={"search"} name={"search"} id={"search"}/>
                    </Box>
                    <Box sx={{display: {xs: "none", sm: "block"}}}>
                        <IconButton onClick={handleThemeColor}>
                            {!themeColor ? <LightMode sx={{fontSize: "1.85rem"}}/> :
                                <DarkMode sx={{fontSize: "1.85rem"}}/>}
                        </IconButton>
                        <IconButton
                            onClick={handleClick}
                            sx={{ml: 2}}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{height: "32px", width: "32px"}}/>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root,.MuiSvgIcon-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                        >
                            <MenuItem>
                                <Avatar>{readyData?.username?.substring(0, 1).toUpperCase()}</Avatar>
                                {readyData?.username}
                            </MenuItem>
                            <MenuItem>
                                <AdminPanelSettings fontSize={"large"} color={"warning"}/>
                                {readyData?.is_superuser ? "SUPERUSER" : readyData?.is_staff ? "ADMIN" : "customer"}
                            </MenuItem>
                            <Divider/>
                            <MenuItem component={Link} to={"/"}>Home Page</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                        <IconButton>
                            <Badge color={"error"} badgeContent={2}>
                                <Notifications sx={{fontSize: "1.85rem"}}/>
                            </Badge>
                        </IconButton>
                        <IconButton>
                            <Settings sx={{fontSize: "1.85rem"}}/>
                        </IconButton>

                    </Box>
                </Toolbar>
            </AppBar>
            <Box className={"content-children"}>
                {children}
            </Box>
        </Box>
    )
}
export default Content