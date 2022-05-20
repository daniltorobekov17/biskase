import React, {useContext, useState} from 'react';
import Img from '../Basket/Basket Image/basket.png'
import {Context} from "../../Context/Context";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from '@mui/icons-material/Close';
import {NavLink} from "react-router-dom";

const Basket = () => {
    const {cart, deleteCart, setCart} = useContext(Context);
    const [open, setOpen] = useState(false);

    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    return (
        <div className={'container'}>
            <div style={{display: "flex", flexDirection: 'column', rowGap: 40}}>
                {cart.length === 0 ?
                    (
                        <div className={'basket-null'}>
                            <img className={'basket-png'} style={{display: 'block', margin: '0 auto'}} src={Img} alt=""/>
                            <p className={'basket-null-text'} style={{textAlign: 'center'}}>Корзина пуста</p>
                            <button style={{ margin: '0 auto'}}><NavLink className={'basket-but link'} to={'/'}>Вернуться
                                на
                                главную</NavLink></button>
                        </div>
                    )
                    : (

                        <div className={'basket-sum'}>
                            <ul style={{display: "flex", justifyContent: "space-between"}}>
                                <li className={'basket-list'}>Модель телефона</li>
                                <li className={'basket-list'}>Количество</li>
                                <li className={'basket-list'}> Цена</li>
                            </ul>
                            {cart.map((item) => (

                                <div key={item.id} style={{display: "flex", justifyContent: "space-between"}}>
                                    <div style={{width: '40%', display: "flex", justifyContent: "flex-start"}}>
                                        <p className={'basket-text'} style={{fontWeight: 400}}>{item.title}</p>
                                    </div>

                                    <div style={{width: '45%', display: "flex", justifyContent: "space-between"}}>
                                        <p className={'basket-text'} style={{fontWeight: 400, textAlign: 'center'}}>{item.count}</p>
                                        <p className={'basket-text'} style={{fontWeight: 400}}>{item.price}</p>
                                    </div>

                                </div>

                            ))}


                            <div className={'basket-btn-bottom'} style={{display:"flex",flexDirection:"column"}}>
                                <p className={'basket-text'} style={{display:'flex',justifyContent:"flex-start",alignItems:"center"}}>Итого : < span
                                    className={'basket-span'}
                                    style={{
                                        color: "darkorange",
                                        fontWeight: 500
                                    }}>{cart.reduce((acc, rec) => acc + rec.count * rec.price, 0)} сом</span>
                                </p>

                                <div style={{display: "flex", columnGap: 30}}>
                                    <button className={'button link'}>Оформить заказ</button>
                                    <button onClick={() => setCart([])} className={'button link'}>Очистить
                                        корзину
                                    </button>
                                </div>

                            </div>
                            </div>

                    )


                }


                <div className="basket-cart">
                    {
                        cart.map((item) => (
                            <div key={item.id} className={'basket'}>
                                <CloseIcon style={{cursor: "pointer"}} onClick={event => deleteCart(item.id)}/>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '50%',
                                    margin: '0 auto',
                                }}>
                                    <img className={'basket-img'} src={item.image} alt={item.title}/>
                                </div>

                                <div className={'basket-bottom'}>
                                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                        <h4 className={'title'}>{item.title}</h4>
                                        <p className={'price'}>{item.price} сом</p>
                                    </div>

                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        rowGap: 5,
                                        color: "#00000090"
                                    }}>
                                        <p className={'basket-text'}  style={{fontWeight: 500}}><span className={'basket-text'}>Модель :</span> {item.title}
                                        </p>
                                        <p className={'basket-text'} style={{fontWeight: 500}}><span className={'basket-text'}>Цена : </span>{item.price} сом
                                        </p>
                                        <p className={'basket-text'} style={{fontWeight: 500}}><span className={'basket-text'}>Цвет : </span>{item.color}</p>
                                        <p className={'basket-text'} style={{fontWeight: 500}}><span className={'basket-text'}>Состояние : </span>{item.state}
                                        </p>
                                        <p className={'basket-text'} style={{fontWeight: 500}}>
                                            <span className={'basket-text'}>Объём памяти : </span>{item.memory} GB</p>
                                        <h5 className={'basket-text'} style={{fontWeight: 500}}>
                                            <span className={'basket-text'}>Количество : </span>{item.count}</h5>
                                        <h5 className={'basket-text'} style={{fontWeight: 500}}>
                                            <span className={'basket-text'}>Сумма : </span>{item.price * item.count} сом</h5>

                                    </div>


                                </div>

                            </div>


                        ))

                    }
                    <Snackbar
                        open={open}
                        autoHideDuration={3000}
                        onClose={handleClose}
                        message="Вы успешно зарегистрировались"
                    />
                </div>

            </div>

        </div>

    );
};

export default Basket;









