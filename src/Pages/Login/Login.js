import React, {useContext, useState} from 'react';
import {TextField, InputAdornment, Snackbar} from "@mui/material";
import {Link, useNavigate} from 'react-router-dom'
import AccountCircle from '@mui/icons-material/AccountCircle'
import axios from "axios";
import {Context} from "../../Context/Context";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {user, dispatch} = useContext(Context);
    const [open,setOpen]=useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch({type:'LOGIN_START'});
        try {
            const res = await axios.post('http://localhost:8080/login', {
                email,
                password
            });
            dispatch({type: 'LOGIN_SUCCES', payload: res.data.user})
        } catch (err) {
            dispatch({type: 'LOGIN_FAILURE'})
        }

        setEmail('');
        setPassword('');
    };
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div className={"container"}>
            <div className={'login'}>
                <form className={'login-form'} onSubmit={handleLogin}>
                    <h2 style={{margin: '0 auto'}}>Вход </h2>
                    <hr/>
                    <TextField className={'textfield'}
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

                    <TextField className={'textfield'}
                        onChange={e => setPassword(e.target.value)}
                        label="Пароль"
                        type="password"
                        value={password}
                        autoComplete="current-password"
                    />
<button onClick={()=>setOpen(true)} className={'input'} type="submit">Войти</button>

                    <p className={'login-text'}>Нет аккаунта?<Link className={'login-text'} to={'/register'}>Зарегистрироваться</Link></p>
                </form>
            </div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Вы вошли в аккаунт"
            />
        </div>

    );
};

export default Login;