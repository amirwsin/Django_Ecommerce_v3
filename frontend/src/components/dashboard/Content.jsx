import {AppBar, Badge, Box, IconButton, Switch, TextField, Toolbar} from "@mui/material";
import {AccountCircle, DarkMode, LightMode, MoreVert, Notifications, Search, Settings} from "@mui/icons-material";
import {ColorModeContext} from "../../theme";
import {useContext, useState} from "react";

const Content = ({children}) => {
    const [themeColor, setThemeColor] = useState(true)
    const colorMode = useContext(ColorModeContext)

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
                            {themeColor ? <LightMode sx={{fontSize: "1.85rem"}}/> :
                                <DarkMode sx={{fontSize: "1.85rem"}}/>}
                        </IconButton>
                        <IconButton>
                            <AccountCircle sx={{fontSize: "1.85rem"}}/>

                        </IconButton>
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