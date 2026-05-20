import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from '../components/Input';
import Button from "../components/Button";
import logo from "../assets/logo.svg";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [localError, setLocalError] = useState("");
    const navigate = useNavigate();
    const { loginUser } = useAuth();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await loginUser(form.email, form.password);
        if (result.success) {
            navigate("/");
        } else {
            setLocalError(result.error);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <form className="w-full max-w-md" onSubmit={handleSubmit}>
                <Link to="/" className="flex justify-center mb-2">
                    <img src={logo} alt="Проектная" className="h-7 w-auto" />
                </Link>
                <h2 className="text-base mb-12 flex justify-center">Вход в учетную запись</h2>
                {localError && <p className="text-red-500 mb-4">{localError}</p>}
                <Input
                    type="email"
                    name="email"
                    value={form.email}
                    placeholder="Email"
                    className="mb-4"
                    onChange={handleChange}
                />
                <Input
                    type="password"
                    name="password"
                    value={form.password}
                    placeholder="Пароль"
                    className="mb-4"
                    onChange={handleChange}
                />
                <Button type="submit" className="w-full mb-4">Войти</Button>
                <div className="flex items-center justify-center">
                    <p>Новый пользователь?</p>
                    <Button variant="tertiary" onClick={() => navigate('/register')}>Регистрация</Button>
                </div>
            </form>
        </div>
    )
}

export default Login;