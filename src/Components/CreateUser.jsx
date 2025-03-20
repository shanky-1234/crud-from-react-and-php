import { useState } from "react";
import axios from 'axios'

export default function CreateUser(){
    const[inputs,setInputs] = useState({})
    function handleSubmit(event){
        event.preventDefault();
        console.log(inputs)
        axios.post('http://localhost:8080/api/user/save', inputs).then(function(response){
            console.log(response.data);
        });
    }

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setInputs((prevValue)=>{
            return(
                {
                    ...prevValue,
                    [name]:value
                }
            )
        })
    }
    return(
        <div>
        <h1>Create User</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" onChange={handleChange} />

            <label htmlFor="email">E-mail:</label>
            <input type="text" name="email" id="email" onChange={handleChange}/>

            <label htmlFor="mobile">Mobile:</label>
            <input type="number" name="mobile" id="mobile" onChange={handleChange} />
            
            <button>Save</button>
        </form>
        </div>
    )
}