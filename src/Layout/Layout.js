import React from 'react';
import {Route, Routes, useLocation, useMatch} from "react-router-dom";
import HomePage from "../Pages/Home/HomePage";
import Contact from "../Pages/Contact/Contact";
import Basket from "../Pages/Basket/Basket";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Conditions from "../Pages/Conditions/Conditions";
import NotFound from "../Pages/NotFound/NotFound";
import AddProducts from "../Pages/AddProducts/AddProducts";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import ChangeProduct from "../Pages/Change/ChangeProduct";
import Profile from "../Pages/Profile/Profile";
import Name from "../Pages/CreateCategoryName/Name";


const Layout = () => {
    // const location = useLocation;
    // const match = useMatch("/edit/:id");


    return (
        <div>
            <Header/>

            <Routes>
                <Route path={'/'} exact element={<HomePage/>}/>
                <Route path={'/contact'} element={<Contact/>}/>
                <Route path={'/basket'} element={<Basket/>}/>
                <Route path={'/conditions'} element={<Conditions/>}/>
                <Route path={'/add'} element={<AddProducts/>}/>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/edit/:id'} element={<ChangeProduct/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/name'} element={<Name/>}/>
                <Route path={'*'} element={<NotFound/>}/>


            </Routes>
            <Footer/>
            {/*{*/}
            {/*    location().pathname==='/'*/}
            {/*    ||location().pathname === '/contact'*/}
            {/*        ||location().pathname === '/basket'*/}
            {/*        ||location().pathname === '/conditions'*/}
            {/*        ||location().pathname === '/add'*/}
            {/*        ||location().pathname === '/register'*/}
            {/*        ||location().pathname === '/login'*/}
            {/*        ||location().pathname === '/profile'*/}
            {/*        ||location().pathname === '/name'*/}
            {/*        ||match?.params?.id*/}
            {/*    ? <Footer/>*/}
            {/*    :*/}
            {/*        ''*/}
            {/*}*/}

        </div>
    );
};

export default Layout;