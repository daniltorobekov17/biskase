import {createContext, useReducer, useEffect, useState} from 'react'
import Reducer from "./Reducer";
const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null
};


export const Context = createContext(INITIAL_STATE);
export const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
    const [cart , setCart]=useState([]);


    const addCart = (product) =>{
        let idx =cart.findIndex((item)=>item.id ===product.id );
        if (idx >= 0){
            setCart(cart.map((item)=>{
                if (item.id ===product.id){
                    return {...item, amount: +item.amount + +product.amount}
                }else {
                    return item
                }
            }))
        }else {
             setCart([...cart,product])
        }

    };
const deleteCart = (id) =>{
   setCart(cart.filter((item)=>{
       return item.id !== id
   }))
};

    useEffect(() =>{
        localStorage.setItem("user",JSON.stringify(state.user))
    },[state.user]);

    useEffect(()=>{
        localStorage.setItem("cart",JSON.stringify(cart))
    },[cart]);

    return <Context.Provider value={{
        user:state.user,
        dispatch,
        cart,
        setCart,
        addCart,
        deleteCart
    }}>
        {children}
    </Context.Provider>
};







