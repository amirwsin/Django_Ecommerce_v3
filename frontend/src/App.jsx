import './App.css'
import './Admin.css'
import {BrowserRouter, Outlet, Routes, Route} from "react-router-dom";
import {HelmetProvider} from 'react-helmet-async';
import Home from "./pages/Home"
import Navbar from "./components/Navbar";
import {ThemeProvider} from "@mui/material";
import {ColorModeContext, useMode} from "./theme";
import Footer from "./components/Footer";
import GoTopButton from "./components/GoTopButton";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {useDispatch} from "react-redux";
import {loadUser} from "./features/actions/authActions";
import React, {useEffect, useMemo, useState} from "react";
import Dashboard from "./pages/panel/Dashboard";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import {AlertContext} from "./AlertContext";
import MySnackBar from "./components/MySnackBar";
import {loadCart, loadLocal} from "./features/actions/cartActions";
import ShoppingCart from "./pages/ShoppingCart";
import RestrictPage from "./RestrictPage";
import PanelLayout from "./components/PanelLayout";
import Account from "./pages/panel/Account";
import Address from "./pages/panel/Address";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import SideBar from "./components/dashboard/SideBar";
import Content from "./components/dashboard/Content";
import AdminUsers from "./pages/dashboard/AdminUsers";
import CheckOut from "./pages/CheckOut";
import AdminProducts from "./pages/dashboard/AdminProducts";

let token, user;


function App() {
    const dispatch = useDispatch()
    const [alertState, setAlertState] = useState({"open": false, "msg": "", "color": "info"})
    const providerValue = useMemo(() => ({alertState, setAlertState}), [alertState, setAlertState])
    const [theme, colorMode] = useMode();

    useEffect(() => {
        token = localStorage.getItem("access_token")
        user = localStorage.getItem("user")
        if (token && user) {
            const readyUser = JSON.parse(user)
            dispatch(loadUser(token))
            dispatch(loadCart(readyUser.id))
        } else {
            dispatch(loadLocal())
        }
        return () => {
            token = null;
            user = null;
        }

    }, [dispatch])
    return (
        <HelmetProvider>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <AlertContext.Provider value={providerValue}>
                        <BrowserRouter>
                            <Routes>
                                <Route path={"/"} element={<MainLayout/>}>
                                    <Route index path={"/"} element={
                                        <Home/>
                                    }/>
                                    <Route path={"/login"} element={
                                        <RestrictPage path={"/"} type={"isAnonymous"}>
                                            <Login/>
                                        </RestrictPage>
                                    }/>
                                    <Route path={"/register"} element={
                                        <RestrictPage path={"/"} type={"isAnonymous"}>
                                            <Register/>
                                        </RestrictPage>
                                    }/>
                                    <Route path={"/user/dashboard"} element={
                                        <RestrictPage path={"/login"} type={"isAuthenticated"}>
                                            <PanelLayout><Dashboard/></PanelLayout>
                                        </RestrictPage>
                                    }/>
                                    <Route path={"/user/dashboard/account"} element={
                                        <RestrictPage path={"/login"} type={"isAuthenticated"}>
                                            <PanelLayout><Account/></PanelLayout>
                                        </RestrictPage>
                                    }/>
                                    <Route path={"/user/dashboard/address"} element={
                                        <RestrictPage path={"/login"} type={"isAuthenticated"}>
                                            <PanelLayout><Address/></PanelLayout>
                                        </RestrictPage>
                                    }/>
                                    <Route path={"/products/:category?/"} element={
                                        <Products/>
                                    }/>
                                    <Route path={"/product/:slug/"} element={
                                        <ProductDetails/>}/>
                                    <Route path={"/cart"} element={<ShoppingCart/>
                                    }/>
                                    <Route path={"/cart/checkout"} element={<CheckOut/>}/>
                                    <Route path={"*"} element={<h1>not found</h1>}/>
                                </Route>
                                <Route path={"/"} element={<AdminLayout/>}>
                                    <Route path={"/admin/dashboard"} element={<AdminDashboard/>}/>
                                    <Route path={"/admin/users"} element={<AdminUsers/>}/>
                                    <Route path={"/admin/products"} element={<AdminProducts/>}/>
                                </Route>
                            </Routes>
                        </BrowserRouter>
                    </AlertContext.Provider>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </HelmetProvider>
    )
}

function AdminLayout() {
    return (
        <>
            <div id={"root-admin"}>
                <Content>
                    <SideBar/>
                    <Outlet/>
                </Content>
            </div>
        </>
    );
}

function MainLayout() {
    return (
        <>
            <Navbar/>
            <Outlet/>
            <GoTopButton/>
            <MySnackBar/>
            <Footer/>
        </>
    );
}


export default App
