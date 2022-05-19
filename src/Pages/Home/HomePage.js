import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom'
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {Context} from "../../Context/Context";

const fetchProducts = () => {
    return axios.get('http://localhost:8080/products')
        .then(res => res.data)
};
const fetchCategory = () => {
    return axios.get('http://localhost:8080/category')
};


const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(0);
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const {user}= useContext(Context);
    useEffect(() => {
        fetchProducts().then(data => setProducts(data));
        fetchCategory().then(res => setCategories(res.data))
    }, []);




    const handleChangeCategory = (e, category, name) => {
        e.preventDefault();
        setCategory(category);
        setName(name);
    };




    return (
        <div className={'container'}>
            <div style={{marginBottom: 40}}>
                <FormControl variant="standard" sx={{m: 1, width: 300}}>
                    <InputLabel id="category">Выберите модель телефона</InputLabel>
                    <Select
                        labelId="category"
                        id="category"
                        value={category}
                        onChange={handleChangeCategory}
                    >
                        <MenuItem onClick={e => handleChangeCategory(e, 0)}>Все</MenuItem>
                        {categories.map(category => <MenuItem key={category.id}
                            onClick={(e) => handleChangeCategory(e, category.id)}>{category.name}</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </div>

            {category === 0 ?
                <h4 style={{textAlign: 'center', fontSize: 30, marginBottom: 40}}>Все бренды телефонов</h4> : ''}

            <div className="homepage">
                {category === 0 ?
                    (products.map(product => {
                        return (
                            <div title={product.title}  className={'products'} key={product.id} style={{display:"flex", flexDirection:"column", rowGap:30,alignContent:"space-evenly"}}>
                                <p style={{color: 'grey', fontWeight: 400, fontSize: 13}}>{product.createData}</p>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '50%',
                                    margin: '0 auto'
                                }}>
                                    <img className={'image'}
                                         src={product.image}
                                         alt={product.title}/>
                                </div>

                                <br/>
                                <div style={{display:"flex",flexDirection:"column",rowGap:30}}>
                                    <div className={'phone'}>
                                        <h3 className={'products-title text'}>
                                            {product.title}
                                        </h3>
                                        <p className={'price'} style={{
                                            width: '30%',
                                            display: 'flex',
                                            justifyContent: 'end'
                                        }}>{product.price} сом</p>
                                    </div>
                                    <div style={{display:"flex",justifyContent:"center"}}>
                                        {user?
                                            <Link style={{margin: '0 auto'}} to={`/edit/${product.id}`}>
                                                <button className={'link'}>Посмотреть</button>
                                            </Link>
                                            :
                                                <p style={{fontSize:13,textAlign:"center"}}>Чтобы посмотреть товар,Вам необходимо <br/> <Link to={'login'}>ВОЙТИ</Link> в аккаунт</p>

                                        }
                                    </div>

                                </div>

                            </div>
                        )
                    })) :
                    ''}
                {
                    category === category ?
                        (
                            products.filter(product => product.category === category).map(product => {
                                return (
                                    <div  className={'products'} key={product.id}  style={{display:"flex",flexDirection:"column",rowGap:20,alignContent:"space-evenly"}} >
                                        <p style={{
                                            color: 'grey',
                                            fontWeight: 400,
                                            fontSize: 13
                                        }}>{product.createData}</p>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '50%',
                                            margin: '0 auto'
                                        }}>
                                            <img className={'image'}
                                                 src={product.image}
                                                 alt={product.title}/>
                                        </div>

                                        <br/>
                                        <div className={'phone'}>
                                            <h3 className={'products-title text'}>
                                                {product.title}
                                            </h3>
                                            <p className={'price'}>{product.price} сом</p>
                                        </div>
                                        <br/>
                                        {user?
                                            <Link style={{margin: '0 auto'}} to={`/edit/${product.id}`}>
                                                <button className={'link'}>Посмотреть</button>
                                            </Link>
                                            :
                                            <p style={{fontSize:13,textAlign:"center"}}>Чтобы посмотреть товар,Вам необходимо <br/> <Link to={'login'}>ВОЙТИ</Link> в аккаунт</p>

                                        }

                                    </div>
                                )
                            })
                        ) :
                        ''
                }

            </div>
        </div>

    );
};

export default HomePage;