import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Link} from 'react-router-dom'
import TextField from "@mui/material/TextField";
import {Input, InputAdornment, InputLabel} from "@mui/material";
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import {NavLink} from "react-router-dom";
import {Context} from "../../Context/Context";
import Snackbar from "@mui/material/Snackbar";

const fetchProduct = (id) => {
    return axios.get(`http://localhost:8080/products/${id}`)
};

const fetchUser = (id) => {
    return axios.get(`http://localhost:8080/users/${id}`)
};
const ChangeProduct = () => {
    const [product, setProduct] = useState({});
    const [change, setChange] = useState(false);
    const [title, setTitle] = useState('');
    const [descr, setDescr] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [memory, setMemory] = useState('');
    const [color, setColor] = useState('');
    const [state, setState] = useState('');
    const navigeteDelete = useNavigate();
    const {user, addCart} = useContext(Context);
    const {id} = useParams();
    const [open, setOpen] = useState(false);
    const [author, setAuthor] = useState({});
const [count,setCount] = useState(1);

    useEffect(() => {
        fetchProduct(id).then((res) => {
            setProduct(res.data);
            fetchUser(res.data.author).then(res => setAuthor(res.data))
        })
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/products/${id}`).then(res => {
            navigeteDelete('/')
        });
    };

    const handleChange = (id) => {
        axios.put(`http://localhost:8080/products/${id}`, {
            title,
            descr,
            price,
            state,
            image,
            color,
            memory
        });

    };
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const handleChangeMode = () => {
        setChange(true);
        setTitle(product.title);
        setPrice(product.price);
        setImage(product.image);
        setDescr(product.descr);
        setMemory(product.memory);
        setState(product.state);
        setColor(product.color)

    };

    return (
        <div className={'container'}>
            {change ?
                (
                    <div className={'changeProduct'}>

                        <form style={{display: 'flex', flexDirection: 'column', rowGap: '30px'}}>
                            <div style={{display: 'flex', columnGap: '50px'}}>
                                <TextField name={'title'}
                                           type={'search'}
                                           value={title}
                                           onChange={e => setTitle(e.target.value)}
                                           label="Модель телефона"
                                           variant="outlined"
                                />

                                <Input
                                    style={{width: '200px'}}
                                    value={price}
                                    type={'number'}
                                    pattern="[1-9]{10}"
                                    onChange={e => setPrice(e.target.value)}
                                    startAdornment={<InputAdornment position="start">KGS</InputAdornment>}
                                > <InputLabel htmlFor="standard-adornment-amount">Цена</InputLabel>
                                </Input>
                            </div>


                            <TextField
                                type={'search'}
                                value={memory}
                                onChange={e => setMemory(e.target.value)}
                                autoComplete={'off'}
                                label="Объём памяти"/>

                            <TextField
                                value={color}
                                onChange={e => setColor(e.target.value)}
                                label="Цвет" autoComplete={'off'}
                                variant="outlined"/>
                            <TextField
                                value={state}
                                onChange={e => setState(e.target.value)}
                                label="Состояние"
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
                            <div style={{display: 'flex', columnGap: '30px'}}>
                                <button onClick={() => handleChange(product.id)}>Сохранить изменения</button>
                                <button onClick={() => setChange(false)}>Назад</button>
                            </div>

                        </form>

                    </div>
                )
                :
                (
                    <div className={'characteristic'}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h5>@{author.name}</h5>
                            <p style={{color: 'grey', fontWeight: 400, fontSize: 13}}>{product.createData}</p>
                        </div>

                        <div style={{marginBottom: 40}} className={'change-img'}>
                            <img className={'img'} src={product.image} alt={product.title}/>
                        </div>

                        <div className="phone">
                            <h2>{product.title}</h2>
                            <p className={'price'} style={{fontSize: 16}}>{product.price} сом</p>
                        </div>
                        <br/>
                        <h3 style={{textAlign: 'center', color: 'gray', fontWeight: '400'}}>Характеристика:</h3>
                        <br/>
                        <div className={'characteristic-phone'}>
                            <h5>Модель: {product.title} </h5>
                            <h5>Цвет: <span style={{fontWeight: '400'}}> {product.color}</span></h5>
                            <h5>Состояние: <span style={{fontWeight: '400'}}>{product.state}</span></h5>
                            <h5>Объём памяти: <span style={{fontWeight: '400'}}>{product.memory} GB</span></h5>
                            <h5>Дополнительно: <span style={{fontWeight: '400'}}>{product.descr}</span></h5>
                            {
                                product.amount >=1 ?
                                    <h5>В наличии: <span style={{fontWeight: '400'}}>{product.amount}</span></h5>
                                    :
                                    <h5 style={{color: "red"}}>Нет в наличии</h5>
                            }


                        </div>

                        {user.admin ?
                            (<div style={{
                                    marginTop: "50px",
                                    display: 'flex',
                                    columnGap: '20px',
                                    justifyContent: 'center'
                                }}>
                                    <button className={'link'} onClick={e => handleChangeMode(e)}><EditIcon/>Редактировать
                                    </button>
                                    <button className={'link'} onClick={() => handleDelete(product.id)}><DeleteIcon/>Удалить
                                    </button>
                                    <button><NavLink className={'link'} to={'/'}>Вернуться на главную</NavLink></button>
                                </div>
                            )
                            :
                            (
                                <div style={{
                                    marginTop: "50px",
                                    display: 'flex',
                                    columnGap: '20px',
                                    justifyContent: 'center'
                                }}>

                                    {
                                        product.amount>=1?
                                            (
                                                <div style={{
                                                    marginTop: "50px",
                                                    display: 'flex',
                                                    columnGap: '20px',
                                                    justifyContent: 'center'
                                                }}>
                                                    <input min={'1'} max={product.amount} value={count} onChange={(e) => setCount(e.target.value)} title={'Введите количество товаров'} style={{width:'40px',paddingLeft:5,border:"2px solid black"}} type="number"/>

                                                    <button type={"button"} className={'link'}
                                                            onClick={() => addCart({
                                                                id:product.id,
                                                               title: product.title,
                                                               image: product.image,
                                                               color:product.color,
                                                               memory:product.memory,
                                                                state:product.state,
                                                                count:count,
                                                                price:product.price,
                                                                category:product.category
                                                            }, setOpen(true))}>
                                                        Добавить в корзину
                                                    </button>
                                                    <button><NavLink className={'link'} to={'/'}>Вернуться на главную</NavLink></button>
                                                </div>
                                            ):
                                            <button><NavLink className={'link'} to={'/'}>Вернуться на главную</NavLink></button>


                                    }



                                </div>
                            )

                        }


                        <Snackbar
                            open={open}
                            autoHideDuration={3000}
                            onClose={handleClose}
                            message='Добавлено'
                        />
                    </div>
                )

            }

        </div>
    );
};

export default ChangeProduct;