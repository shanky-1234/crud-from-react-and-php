import { useEffect, useState } from "react";
import axios from 'axios'
import { useParams } from "react-router-dom";


export default function EditUser(){
    const[inputs,setInputs] = useState({})
    useEffect(()=>{
        getUser();
    },[])

    const{id} =useParams();

       function getUser(){
    axios.get(`http://localhost:8080/api/user/${id}`).then(function(response){

        console.log(response.data);
        setInputs(response.data);
    })
}
    function handleSubmit(event){
        event.preventDefault();
        console.log(inputs)
        axios.put(`http://localhost:8080/api/user/${id}/edit`, inputs).then(function(response){
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
        <h1>Edit User</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input value={inputs.name} type="text" name="name" id="name" onChange={handleChange} />

            <label htmlFor="email">E-mail:</label>
            <input value={inputs.email} type="text" name="email" id="email" onChange={handleChange}/>

            <label htmlFor="mobile">Mobile:</label>
            <input value={inputs.mobile} type="number" name="mobile" id="mobile" onChange={handleChange} />
            
            <button>Save</button>
        </form>
        </div>
    )
}
