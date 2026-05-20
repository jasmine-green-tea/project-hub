import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Select from "../components/Select";
import Input from '../components/Input';
import Button from "../components/Button";
import logo from "../assets/logo.svg";

const Register = ({ setUser }) => {
    const [form, setForm] = useState({
        role: "",
        name: "",
        surname: "",
        email: "",
        password: "",
    });
    const [localError, setLocalError] = useState("");
    const navigate = useNavigate();
    const { registerUser } = useAuth();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await registerUser(form);
        if (result.success) {
            navigate('/');
        } else {
            setLocalError(result.error);
        }
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center">
            <form className="w-full max-w-md" onSubmit={handleSubmit}>
                <Link to="/" className="flex justify-center mb-2">
                    <img src={logo} alt="Проектная" className="h-7 w-auto" />
                </Link>
                <h2 className="text-base mb-12 flex justify-center">Регистрация</h2>
                {localError && <p className="text-red-500 mb-4">{localError}</p>}
                <Select
                    name="role"
                    value={form.role}
                    options={[
                        { value: 'student', label: 'Студент'},
                        { value: 'teacher', label: 'Преподаватель'},
                    ]}
                    placeholder="Роль"
                    className="mb-4"
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    name="name"
                    value={form.name}
                    placeholder="Имя"
                    className="mb-4"
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    name="surname"
                    value={form.surname}
                    placeholder="Фамилия"
                    className="mb-4"
                    onChange={handleChange}
                />
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
                <Button type="submit" className="w-full mb-4">Зарегистрироваться</Button>
                <div className="flex items-center justify-center">
                    <p>Уже есть аккаунт?</p>
                    <Button variant="tertiary" onClick={() => navigate('/login')}>Войти</Button>
                </div>
            </form>
        </div>
    );
};

export default Register;