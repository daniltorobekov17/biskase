import React, {useContext, useState} from 'react';
import Logo from './Logo/Bishcase.png'
import Phone from './Logo/Vector (4).svg'
import {FormControl, Select, MenuItem, InputLabel} from "@mui/material";
import {NavLink} from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalGroceryStoreSharpIcon from '@mui/icons-material/LocalGroceryStoreSharp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import {Context} from "../../Context/Context";

const Header = () => {
    const {user, dispatch} = useContext(Context);


    return (
        <div className="header">
            <nav className={'header-navbar'}>
                <div className={'header-left'}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img className={'logo-header'} src={Logo} alt="Bishcase"/>
                        <h4 className={"logo"}>Bishcase</h4>
                    </div>
                    <div className={'header-right'}>
                        <NavLink className={'header-right-link'} to={'/'}>Главная</NavLink>
                        <NavLink className={'header-right-link'} to={'/contact'}>Контакты</NavLink>
                        <NavLink  className={'header-right-link'} to={'/conditions'}>Условия сервиса</NavLink>


                    </div>
                </div>

                <nav className={'header-navlink'}>
                    {
                        user ?
                            <div className={'user'}>
                                <div className="header-right-icons">
                                    <NavLink className={'icon'} to={'/basket'}><LocalGroceryStoreSharpIcon
                                        /></NavLink>
                                </div>

                                {user.admin ?
                                    (
                                        <div style={{display:'flex',columnGap:20}}>

                                                <button style={{width:'150px',fontSize:13}} className={'link'}>
                                                    <NavLink className={'header-link'} to={'/add'}>
                                                    Добавить товар
                                                    </NavLink>
                                                </button>
                                            <button style={{width:'150px',fontSize:13}} className={'link'}><NavLink to={'name'} className={'header-link'}>Создать категорию</NavLink></button>
                                        </div>



                                    ) : ''
                                }



                                    <button style={{fontSize:13}} className={'link'}>
                                        <NavLink style={{display:"flex",alignItems:"center"}} className={'header-link'} to={'/profile'}>
                                        <AccountCircleIcon/>
                                        Профиль
                                        </NavLink>
                                    </button>



                            </div>

                            :
                            <div style={{display: 'flex', columnGap: '20px'}}>
                                {/*<button><NavLink className={'header-link'} to={'/register'}>Регистрация</NavLink></button>*/}
                                <button><NavLink className={'header-link'} to={'/login'}>Войти</NavLink></button>
                            </div>

                    }

                </nav>

            </nav>
            <div className="burger">
                <span className="burger__line"></span>
            </div>
        </div>


    );
};

export default Header;