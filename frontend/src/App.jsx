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
import React, {useEffect} from "react";
import Dashboard from "./pages/panel/Dashboard";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
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
import AdminProductDetail from "./pages/dashboard/AdminProductDetail";
import AdminProductCreate from "./pages/dashboard/AdminProductCreate";
import AdminEssentials from "./pages/dashboard/AdminEssentials"
import NotFound from "./pages/NotFound";
import AdminDelivery from "./pages/dashboard/AdminDelivery";
import Payment from "./pages/Payment";
import ConfirmPayment from "./pages/ConfirmPayment";
import Orders from "./pages/panel/Orders";
import OrdersDetail from "./pages/panel/OrdersDetail";

let token, user;


function App() {
    const dispatch = useDispatch()
    const [theme, colorMode] = useMode();

    useEffect(() => {
        token = localStorage.getItem("access_token")
        user = localStorage.getItem("user")
        if (token && user && user !== "undefined") {
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
                                <Route path={"/user/dashboard/"} element={
                                    <RestrictPage path={"/login"} type={"isAuthenticated"}>
                                        <PanelLayout><Dashboard/></PanelLayout>
                                    </RestrictPage>
                                }/>
                                <Route path={"/user/dashboard/account/"} element={
                                    <RestrictPage path={"/login"} type={"isAuthenticated"}>
                                        <PanelLayout><Account/></PanelLayout>
                                    </RestrictPage>
                                }/>
                                <Route path={"/user/dashboard/orders/"} element={
                                    <RestrictPage path={"/login"} type={"isAuthenticated"}>
                                        <PanelLayout><Orders/></PanelLayout>
                                    </RestrictPage>
                                }/>
                                <Route path={"/user/dashboard/orders/:id/"} element={
                                    <RestrictPage path={"/login"} type={"isAuthenticated"}>
                                        <PanelLayout><OrdersDetail/></PanelLayout>
                                    </RestrictPage>
                                }/>
                                <Route path={"/user/dashboard/address/"} element={
                                    <RestrictPage path={"/login"} type={"isAuthenticated"}>
                                        <PanelLayout><Address/></PanelLayout>
                                    </RestrictPage>
                                }/>
                                <Route path={"/products/:category?/"} element={
                                    <Products/>
                                }/>
                                <Route path={"/products/:web_id/:slug/"} element={
                                    <ProductDetails/>}/>
                                <Route path={"/cart"} element={<ShoppingCart/>
                                }/>
                                <Route path={"/cart/checkout"} element={<RestrictPage path={"/login"}
                                                                                      type={"isAuthenticated"}><CheckOut/></RestrictPage>}/>
                                <Route path={"/cart/checkout/payment/"} element={<RestrictPage path={"/login"}
                                                                                               type={"isAuthenticated"}><Payment/></RestrictPage>}/>
                                <Route path={"/cart/checkout/payment/confirm/"} element={<ConfirmPayment/>}/>
                                <Route path={"*"} element={<NotFound/>}/>
                            </Route>
                            <Route path={"/"} element={<AdminLayout/>}>
                                <Route path={"/admin/dashboard"} element={<RestrictPage path={"/login"}
                                                                                        type={"isAdmin"}><AdminDashboard/></RestrictPage>}/>
                                <Route path={"/admin/users"} element={<RestrictPage path={"/login"}
                                                                                    type={"isAdmin"}><AdminUsers/></RestrictPage>}/>
                                <Route path={"/admin/products"} element={<RestrictPage path={"/login"} type={"isAdmin"}><AdminProducts/></RestrictPage>}/>
                                <Route path={"/admin/products/:id/"} element={<RestrictPage path={"/login"}
                                                                                            type={"isAdmin"}><AdminProductDetail/></RestrictPage>}/>
                                <Route path={"/admin/products/create/"} element={<RestrictPage path={"/login"}
                                                                                               type={"isAdmin"}><AdminProductCreate/></RestrictPage>}/>
                                <Route path={"/admin/essentials/"} element={<RestrictPage path={"/login"}
                                                                                          type={"isAdmin"}><AdminEssentials/></RestrictPage>}/>
                                <Route path={"/admin/delivery/"} element={<RestrictPage path={"/login"}
                                                                                        type={"isAdmin"}><AdminDelivery/></RestrictPage>}/>
                            </Route>
                        </Routes>
                    </BrowserRouter>
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
            <Footer/>
        </>
    );
}


export default App
