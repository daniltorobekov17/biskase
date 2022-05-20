import React, {useContext, useState} from 'react';
import {Context} from "../../Context/Context";
import {NavLink} from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import {InputAdornment, TextField} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import axios from "axios";

const Profile = () => {
    const [change, setChange] = useState(false);
    const {user, dispatch} = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [open, setOpen] = useState(false);
const [admin,setAdmin]=useState(0);

    const handleChangeProfile = () => {
        setAdmin(user.admin);
        setChange(true);
        setPassword(user.password);
        setEmail(user.email);
        setName(user.name);
        setNumber(user.number);
    };

    const handleChangeUser = async () => {
        const res = await axios.put(`http://localhost:8080/users/${user.id}`, {
            email,
            admin,
            name,
            number,
            password
        });
        setChange(false);
        dispatch({type: "CHANGE_USER", payload: res.data})

    };

    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div className={'container'}>
            <div>
                {change ? (
                        <div className={'change-profile'}>
                            <TextField
                                value={name}
                                onChange={e => setName(e.target.value)}
                                label="Ваше имя"
                                autoComplete={'off'}
                                variant="outlined"/>

                            <TextField
                                value={number}
                                onChange={e => setNumber(e.target.value)}
                                type={'tel'}
                                label="Номер телефона"
                                autoComplete={'off'}
                                variant="outlined"/>
                            <TextField
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                autoComplete={'off'}
                                label="Email"
                                type={'email'}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle/>
                                        </InputAdornment>
                                    ),
                                }}/>

                            <TextField
                                onChange={e => setPassword(e.target.value)}
                                label="Пароль"
                                type="password"
                                value={password}
                            />

                            <div style={{display: 'flex', columnGap: '20px'}}>
                                <button className={'link'} onClick={handleChangeUser}>Сохранить изменения</button>
                                <button><NavLink className={'link'} to={'/'}>Вернуться на главную</NavLink></button>

                            </div>
                        </div>
                    )
                    :
                    (
                        <div>
                            {user ?
                                (
                                    <div className={'profile'}>
                                        <h4 className={'userName'}>Имя : {user?.name}</h4>
                                        <h4 className={'userName'}>Номер телефона : {user?.number}</h4>
                                        <h4 className={'userName'}>Почта : {user?.email}</h4>
                                        <br/>
                                        <div className={'profile-buttons'} style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}>
                                            <button className={'button link'}
                                                    onClick={e => handleChangeProfile(e)}>Редактировать
                                            </button>
                                            <button className={'button link'}><NavLink className={'link'}  to={'/'}>Вернуться на главную</NavLink>
                                            </button>


                                            <button className={'button link'}
                                                    onClick={() => dispatch({type: 'LOGIN_OUT'}, setOpen(true))}>Выйти
                                            </button>
                                        </div>

                                    </div>
                                )
                                :
                                <div style={{
                                    display: 'flex',
                                    rowGap: '30px',
                                    flexDirection: 'column',
                                }} className={'profile'}>
                                    <button style={{ margin: '0 auto'}}><NavLink className={'link'} to={'/'}>Вернуться на главную</NavLink></button>
                                    <NavLink to={'/login'}>
                                        <button style={{margin: '0 auto'}} className={'link'}>Войти
                                        </button>
                                    </NavLink>
                                </div>


                            }


                        </div>

                    )
                }


            </div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Вы вышли из аккаунта"
            />

        </div>
    );
};

export default Profile;