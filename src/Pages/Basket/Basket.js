import React, {useContext, useState} from 'react';
import Img from '../Basket/Basket Image/basket.png'
import {Context} from "../../Context/Context";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from '@mui/icons-material/Close';
import {NavLink} from "react-router-dom";

const Basket = () => {
    const [basket, setBasket] = useState(true)
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
                        <div style={{padding: '50px 0', display: 'flex', flexDirection: 'column', rowGap: 30}}>
                            <img style={{display: 'block', margin: '0 auto'}} src={Img} alt=""/>
                            <p style={{textAlign: 'center', fontSize: 30}}>Корзина пуста</p>
                            <button style={{width: 400, margin: '0 auto'}}><NavLink className={'link'} to={'/'}>Вернуться на
                                главную</NavLink></button>
                        </div>
                    )
                   :(

                           <div className={'basket-sum'}>
                               <p>Общая сумма : <span
                                   style={{color: "darkorange"}}> {cart.reduce((acc, rec) => acc + rec.count * rec.price, 0)} сом</span>
                               </p>
                               <div style={{display:"flex"}}>
                                   <button>Оформить заказ</button>
                                   <button  onClick={() => setCart([])} className={'link'}>Очистить
                                       корзину
                                   </button>
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
                                        <p style={{fontWeight: 500, fontSize: 13}}><span>Модель :</span> {item.title}
                                        </p>
                                        <p style={{fontWeight: 500, fontSize: 13}}><span>Цена : </span>{item.price} сом
                                        </p>
                                        <p style={{fontWeight: 500, fontSize: 13}}><span>Цвет : </span>{item.color}</p>
                                        <p style={{fontWeight: 500, fontSize: 13}}><span>Состояние : </span>{item.state}
                                        </p>
                                        <p style={{fontWeight: 500, fontSize: 13}}>
                                            <span>Объём памяти : </span>{item.memory} GB</p>
                                        <h5 style={{fontWeight: 500, fontSize: 13}}>
                                            <span>Количество : </span>{item.count}</h5>
                                        <h5 style={{fontWeight: 500, fontSize: 13}}>
                                            <span>Сумма : </span>{item.price * item.count} сом</h5>

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









