import React, {useState} from 'react';
import {InputAdornment, TextField,IconButton} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {Link} from "react-router-dom";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from '@mui/icons-material/Close'

const Register = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [name, setName] = useState('');
        const [number, setNumber] = useState('');
        const [admin,setAdmin] = useState(0);
        const [open,setOpen] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        try {
            axios.post('http://localhost:8080/users', {
                email,
                password,
                name,
                number,
                admin
            })
        } catch(err) {
            alert(err)
        }
        setNumber('');
        setName('');
        setEmail('');
        setPassword('');
        setOpen(true)
    };
const handleClose = (e,reason) =>{
    if (reason === 'clickaway') {
        return;
    }

    setOpen(false);
};


    return (
        <div  className={'container'}>
            <div  className="register">
                <form onSubmit={e=>handleRegister(e)} className={'register-form'}>
                    <h2 style={{margin: '0 auto'}}>Регистрация </h2>
                    <hr/>
                    <br/>
                    <TextField
                        required
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
                        required
                        onChange={e => setPassword(e.target.value)}
                        label="Пароль"
                        type="password"
                        value={password}
                        autoComplete="off"
                    />
                    <TextField
                        value={name}
                        onChange={e => setName(e.target.value)}
                        label="Ваше имя"
                        autoComplete={'off'}
                        variant="outlined"
                    required/>

                    <TextField
                        required
                        value={number}
                        onChange={e => setNumber(e.target.value)}
                        type={'number'}
                        label="Номер телефона"
                        autoComplete={'off'}
                        variant="outlined"/>
                    <button className={'input'} type="submit">Зарегистрироваться</button>
                    <p>Уже есть аккаунт?<Link to={'/login'}>Войти</Link></p>
                </form>

                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message="Вы успешно зарегистрировались"
                />

            </div>

        </div>
    );
};

export default Register;