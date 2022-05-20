import React, {useContext, useState} from 'react';
import Logo from './Logo/Bishcase.png'
import Phone from './Logo/Vector (4).svg'
import {FormControl, Select, MenuItem, InputLabel} from "@mui/material";
import {NavLink} from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalGroceryStoreSharpIcon from '@mui/icons-material/LocalGroceryStoreSharp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import {Context} from "../../Context/Context";

const Header = () => {
    const {user, dispatch} = useContext(Context);
    const [menu,setMenu] = useState(false);




    return (
        <div className="header">
            <div className="container">
                <nav className={'header-navbar'}>
                    <div className={'header-left'}>
                        <div >
                            <NavLink style={{display: 'flex', alignItems: 'center',color:"black"}} to={'/'}>
                                <img className={'logo-header'} src={Logo} alt="Bishcase"/>
                                <h4 className={"logo"}>Bishcase</h4>
                            </NavLink>

                        </div>
                        {/*<div className={'header-right'}>*/}
                        {/*    <NavLink className={'header-right-link'} to={'/contact'}>Контакты</NavLink>*/}
                        {/*    <NavLink  className={'header-right-link'} to={'/conditions'}>Условия сервиса</NavLink>*/}
                        {/*</div>*/}
                    </div>

                    <nav className={'header-navlink'}>
                        {
                            user ?
                                <div className={'user'}>
                                    <div className="header-right-icons">
                                        <NavLink  to={'/basket'}><LocalGroceryStoreSharpIcon
                                        className={'icon'}/></NavLink>
                                    </div>

                                    {user.admin ?
                                        (
                                            <div className={'header-create'} style={{display:'flex',columnGap:20}}>

                                                <button style={{width:50}} className={'header-button link'}>
                                                    <NavLink className={'header-link'} to={'/add'}>
                                                       <AddIcon/>
                                                    </NavLink>
                                                </button>

                                                <button style={{width:'150px',fontSize:13}} className={'header-button link'}><NavLink to={'name'} className={'header-link'}>Создать категорию</NavLink></button>
                                            </div>



                                        ) : ''
                                    }



                                    <button style={{fontSize:13}} className={'profile-button link'}>
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
                        <div  className="burger">



                            <span className="burger__line"></span>
                        </div>
                    </nav>

                </nav>

            </div>

        </div>


    );
};

export default Header;