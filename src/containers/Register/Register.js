import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { registerUser } from '../../store/actions/usersActions';
import './Register.css';

const Register = () => {

    const dispatch = useDispatch();
    const error = useSelector(state => state.users.registerError);
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

    const register = event => {
        event.preventDefault();
        dispatch(registerUser(data));
    };
    return (
        <div className='form-box'>
            <h3 className='form-title'>Register</h3>
            <form onSubmit={register}>
                {error && <h4>{error}</h4>}
                <input placeholder='Name' name='username' required onChange={changeData} />
                <input placeholder='Password' type='password' name='password' required onChange={changeData} />
                <button type='submit'>Register</button>
            </form>
            <NavLink to='/login'>Already have an account?</NavLink>
        </div>
    );
};

export default Register;