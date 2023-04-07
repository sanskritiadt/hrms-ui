import axios from "axios";
import { useState } from "react";
import {useNavigate } from 'react-router-dom';
function RegisterUser() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.warn(email,password,username )
        axios.post(`api/auth/register`, {
            password: password,
            email: email,
            username:username,
            "registerAsAdmin":false
        }).then(response => {
            console.log(response.data);
            alert("register successful please verify your email");
            navigate('/Login');
        }).catch(error => {
            console.log(error)
            alert("error occured try after sometime.")
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            alert(error.response.data.error.message);
        })
    }
return (
    <>
        <div className='container mt-5 pt-5'>
            <div className='row'>
                <div className="col-12 col-sm-8 col-md-6 m-auto">
                    <div className='card border-0 shadow'>
                        <div className='card-body'>
                            <svg className='bi bi-align-center' id='svgimg' xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg>
                            <form>
                                <input type="text" name="text" onChange={handleEmail} required value={email} className='form-control my-4 py-2 border border-light' placeholder='Enter your  email' />
                                <input type="text" name="text" onChange={handleUsername} required value={username} className='form-control my-4 py-2 border border-light' placeholder='Enter your  username' />
                                <input type="password" name="password" onChange={handlePassword} required value={password} autoComplete="on" className='form-control my-4 py-2 border border-light' placeholder='Enter your password' />
                                <div className="text-center mt-3">
                                    <button type='button' className=" btn btn-outline-danger" onClick={handleSubmit} >Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
)
}
export default RegisterUser;