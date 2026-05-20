import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import Button from './Button';

const Navbar = ({user, onLogout}) => {
    const navigate = useNavigate();
    return (
        <nav className="bg-white p-4 text-blue-500">
            <div className="max-w-7xl mx-auto p-1 flex justify-between items-center">
                <Link to="/" className="flex items-center">
                    <img src={logo} alt="Проектная" className="h-7 w-auto" />
                </Link>
                <div>
                    {user ? (
                        <button onClick={onLogout}>Logout</button>
                     ) : (
                        <div className="flex gap-4">
                            <Button variant="secondary" onClick={() => navigate('/login')}>Вход</Button>
                            <Button onClick={() => navigate('/register')}>Регистрация</Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;