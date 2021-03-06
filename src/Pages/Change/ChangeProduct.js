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
    const [amount,setAmount] = useState(null);
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
            amount,
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
        setAuthor(author.name)
        setTitle(product.title);
        setPrice(product.price);
        setAmount(product.amount);
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
                                           label="???????????? ????????????????"
                                           variant="outlined"
                                />

                                <Input
                                    style={{width: '200px'}}
                                    value={price}
                                    type={'number'}
                                    pattern="[1-9]{10}"
                                    onChange={e => setPrice(e.target.value)}
                                    startAdornment={<InputAdornment position="start">KGS</InputAdornment>}
                                > <InputLabel htmlFor="standard-adornment-amount">????????</InputLabel>
                                </Input>
                            </div>


                            <TextField
                                type={'search'}
                                value={memory}
                                onChange={e => setMemory(e.target.value)}
                                autoComplete={'off'}
                                label="?????????? ????????????"/>

                            <TextField
                                value={color}
                                onChange={e => setColor(e.target.value)}
                                label="????????" autoComplete={'off'}
                                variant="outlined"/>
                            <TextField
                                value={state}
                                onChange={e => setState(e.target.value)}
                                label="??????????????????"
                                autoComplete={'off'}
                                variant="outlined"/>

                            <TextField
                                value={descr}
                                onChange={e => setDescr(e.target.value)}
                                label="??????????????????????????" autoComplete={'off'}
                                variant="outlined"/>

                                <TextField
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                label="????????????????????" autoComplete={'off'}
                                variant="outlined"/>

                            <TextField
                                value={image}
                                onChange={e => setImage(e.target.value)}
                                type={'url'}
                                label="????????????" autoComplete={'off'}
                                variant="outlined"
                                required/>
                            <div style={{display: 'flex', columnGap: '30px'}}>
                                <button onClick={() => handleChange(product.id)}>?????????????????? ??????????????????</button>
                                <button onClick={() => setChange(false)}>??????????</button>
                            </div>

                        </form>

                    </div>
                )
                :
                (
                    <div className={'characteristic'}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h5>@{author.name}</h5>
                        </div>

                        <div style={{marginBottom: 40}} className={'change-img'}>
                            <img className={'img'} src={product.image} alt={product.title}/>
                        </div>

                        <div className="phone">
                            <h2 className={'phones-name'}>{product.title}</h2>
                            <p className={'phones-price price'}>{product.price} ??????</p>
                        </div>
                        <br/>
                        <h3 className={'character'} style={{textAlign: 'center', color: 'gray', fontWeight: '400'}}>????????????????????????????:</h3>
                        <br/>
                        <div className={'characteristic-phone'}>
                            <h5 className={'characteristic-text'}>????????????: {product.title} </h5>
                            <h5 className={'characteristic-text'}>????????: <span className={'characteristic-text'} style={{fontWeight: '400'}}> {product.color}</span></h5>
                            <h5 className={'characteristic-text'}>??????????????????: <span className={'characteristic-text'} style={{fontWeight: '400'}}>{product.state}</span></h5>
                            <h5 className={'characteristic-text'}>?????????? ????????????: <span className={'characteristic-text'} style={{fontWeight: '400'}}>{product.memory} GB</span></h5>
                            <h5 className={'characteristic-text'}>??????????????????????????: <span className={'characteristic-text'} style={{fontWeight: '400'}}>{product.descr}</span></h5>
                            {
                                product.amount >=1 ?
                                    <h5 className={'characteristic-text'} >  ?? ??????????????: <span style={{fontWeight: '400'}}>{product.amount}</span></h5>
                                    :
                                    <h5 className={'characteristic-text'}  style={{color: "red"}}>?????? ?? ??????????????</h5>
                            }


                        </div>

                        {user.admin ?
                            (<div style={{
                                    marginTop: "50px",
                                    display: 'flex',
                                    columnGap: '20px',
                                    justifyContent: 'center'
                                }}>
                                    <button className={'button link'} onClick={e => handleChangeMode(e)}><EditIcon/>??????????????????????????
                                    </button>
                                    <button className={'button link'} onClick={() => handleDelete(product.id)}><DeleteIcon/>??????????????
                                    </button>
                                    <button className={'button'}><NavLink className={' link'} to={'/'}>?????????????????? ???? ??????????????</NavLink></button>
                                </div>
                            )
                            :
                            (
                                <div className={'changeButton'} style={{
                                    display: 'flex',
                                    columnGap: '20px',
                                    justifyContent: 'center'
                                }}>

                                    {
                                        product.amount>=1?
                                            (
                                                <div className={'addCart'} >
                                                    <input className={'amount'} min={'1'} max={product.amount} value={count} onChange={(e) => setCount(e.target.value)} title={'?????????????? ???????????????????? ??????????????'} style={{width:'40px',paddingLeft:5,border:"2px solid black"}} type="number"/>

                                                    <button type={"button"} className={'button link'}
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
                                                        ???????????????? ?? ??????????????
                                                    </button>
                                                    <button className={'button'}><NavLink className={'link'} to={'/'}>?????????????????? ???? ??????????????</NavLink></button>
                                                </div>
                                            ):

                                            <button  className={'button'}><NavLink className={'link'} to={'/'}>?????????????????? ???? ??????????????</NavLink></button>


                                    }



                                </div>
                            )

                        }


                        <Snackbar
                            open={open}
                            autoHideDuration={3000}
                            onClose={handleClose}
                            message='??????????????????'
                        />
                    </div>
                )

            }

        </div>
    );
};

export default ChangeProduct;