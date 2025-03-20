import axios from 'axios'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ListUser(){
    const [user, setUser] = useState([]);
    useEffect(()=>{
        getUser();
    },[])
    function getUser(){
    axios.get('http://localhost:8080/api/user/save').then(function(response){
        console.log(response.data);
        setUser(response.data);
    })

}

function deleteUser(id){
    axios.delete(`http://localhost:8080/api/user/${id}/delete`).then(function(response){
        console.log(response);
        getUser();
    })
}
   console.log(user)
    return(
        <>
        <h1>List User</h1>
        {
            user.map((user)=>{
                return(
                    <>
                    <h3>Name: {user.name}</h3>
                    <h4>Email: {user.email}</h4>
                    <Link to={`/user/${user.id}/edit`} > Edit</Link>
                    <button onClick={()=>deleteUser(user.id)}>Delete</button>
                    </>
                )
            })
        }
      </>
    )
   
}