import React, {useContext, useState, useEffect} from 'react';
import TextField from "@mui/material/TextField";
import axios from "axios";
import {InputLabel, Input, InputAdornment, FormControl, Select, MenuItem} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import {NavLink} from "react-router-dom";
import {Context} from "../../Context/Context";

const fetchCategory = () => {
    return axios.get("http://localhost:8080/category")
};
const AddProducts = () => {
    const [title, setTitle] = useState('');
    const [descr, setDescr] = useState('');
    const [price, setPrice] = useState('');
    const [memory, setMemory] = useState('');
    const [color, setColor] = useState('');
    const [state, setState] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState(null);
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState(1);
    const {user} = useContext(Context);

    useEffect(() => {
        fetchCategory().then(res => setCategories(res.data))
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/products', {
            title,
            price,
            descr,
            memory,
            image,
            color,
            amount,
            state,
            category,
            author: user.id,
            createData: new Date().toLocaleString()
        });
        setAmount(undefined);
        setImage('');
        setOpen(true);
        setTitle('');
        setPrice('');
        setDescr('');
        setColor('');
        setState('');
        setMemory('');
    };
    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };


    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    return (
        <div className={'container'}>
            <div className="addProducts">
                <form style={{display: 'flex', flexDirection: 'column', rowGap: '30px'}} onSubmit={handleSubmit}>
                    <div style={{display: 'flex', columnGap: '50px'}}>
                        <FormControl variant="standard" sx={{m: 1, width: '50%'}}>
                            <InputLabel id="category">Выберите категорию</InputLabel>
                            <Select
                                labelId="category"
                                id="category"
                                value={category}
                                onChange={handleChangeCategory}
                            >
                                {categories.map(category => {
                                    return (
                                        <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </div>
                    <TextField name={'title'}
                               type={'search'}
                               value={title}
                               onChange={e => setTitle(e.target.value)}
                               required
                               label="Модель телефона"
                               variant="outlined"
                    />
                    <Input
                        required
                        style={{width: '50%'}}
                        value={price}
                        type={'number'}
                        placeholder={'Цена'}
                        onChange={e => setPrice(e.target.value)}
                        startAdornment={<InputAdornment position="start">KGS</InputAdornment>}
                    >
                    </Input>

                    <TextField
                        required
                        type={'search'}
                        value={memory}
                        onChange={e => setMemory(e.target.value)}
                        autoComplete={'off'}
                        label="Объём памяти"/>

                    <TextField
                        required
                        value={color}
                        onChange={e => setColor(e.target.value)}
                        label="Цвет" autoComplete={'off'}
                        variant="outlined"/>
                    <TextField
                        required
                        value={state}
                        onChange={e => setState(e.target.value)}
                        label="Состояние"
                        autoComplete={'off'}
                        variant="outlined"/>
                        <TextField
                        required
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        label="Количество"
                        type={"number"}
                        autoComplete={'off'}
                        variant="outlined"/>

                    <TextField
                        value={descr}
                        onChange={e => setDescr(e.target.value)}
                        label="Дополнительно" autoComplete={'off'}
                        variant="outlined"/>

                    <TextField
                        value={image}
                        onChange={e => setImage(e.target.value)}
                        type={'url'}
                        label="Ссылка" autoComplete={'off'}
                        variant="outlined"
                        required/>

                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <input style={{maxWidth: '400px'}} value={'Отправить'} className={"input"} type="submit"/>
                        <button><NavLink className={'link'} to={'/'}>Вернуться на главную</NavLink></button>
                    </div>

                </form>


            </div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Ваш пост опубликован"
            />
        </div>
    );
};

export default AddProducts;