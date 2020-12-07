import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { loginUser } from '../../store/actions/usersActions';
import './Login.css';

const Login = () => {

    const dispatch = useDispatch();
    const error = useSelector(state => state.users.loginError);
    const [data, setData] = useState({
        username: '',
        password: '',
    });

    const changeData = event => {
        const name = event.target.name;
        const value = event.target.value;

        const dataCopy = {
            ...data,
            [name]: value,
        };

        setData(dataCopy);
    };

    const login = event => {
        event.preventDefault();
        dispatch(loginUser(data));
    };
    return (
        <div className='form-box'>
            <h3 className='form-title'>Login</h3>
            <form onSubmit={login}>
                {error && <p>{error.error}</p>}
                <input placeholder='Name' name='username' required onChange={changeData} />
                <input placeholder='Password' type='password' name='password' required onChange={changeData} />
                <button type='submit'>Login</button>
            </form>
            <NavLink to='/register'>Don't have an account?</NavLink>
        </div>
    );
};

export default Login;