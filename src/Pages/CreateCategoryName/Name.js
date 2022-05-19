import React, {useEffect, useState} from 'react';
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
const fetchCategory = () =>{
    return axios.get("http://localhost:8080/category")
};

const Name = () => {
    const [name,setName] = useState('');
const [categories,setCategories] = useState([]);


    useEffect(() =>{
        fetchCategory().then(res => setCategories(res.data))
    },[]);

    const handleName = (e) =>{
        e.preventDefault();
        axios.post(`http://localhost:8080/category`,{
            name
        });
        setName('');
    };


    return (
        <div className={'container'}>
            <form
                style={{
                    padding:100,
                    backgroundColor:'#00000030',
                    borderRadius:20,
                    display:'flex',
                    flexDirection:'column',
                    rowGap:30
                }
                } className={'category-name'} onSubmit={handleName}>
                <TextField
                    type={'search'}
                    value={name}
                    onChange={e =>setName(e.target.value)}
                    label="Создать категорию"
                    variant="outlined"
                    autoComplete={'off'}
                />
                <button style={{margin:'0 auto',width:'50%'}} className={'link'} type={'submit'}>Отправить</button>
            </form>

        </div>
    );
};

export default Name;