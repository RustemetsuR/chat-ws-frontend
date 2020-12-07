import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Layout.css';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../../store/actions/usersActions';

const Layout = props => {

    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();

    const logout = () =>{
        dispatch(logoutUser());
    };

    return (
        <div>
            <header className='page-header'>
                <div className='page-header-inner'>
                    <h2>Chat</h2>
                    {user && <NavLink to='/login' onClick={logout}>Log out</NavLink>}
                </div>
            </header>
            <div>
                {props.children}
            </div>
        </div>
    );
};

export default Layout;