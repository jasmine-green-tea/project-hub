import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import logo from "../assets/logo.svg";
import Button from './Button';
import Avatar from './Avatar';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

const Navbar = ({ user, onLogout, onCreateProject }) => {
    const navigate = useNavigate();
    const isTeacher = user?.role === 'teacher';

    return (
        <nav className="bg-white p-4 text-blue-500">
            <div className="max-w-7xl mx-auto p-1 flex justify-between items-center">
                <Link to="/dashboard" className="flex items-center">
                    <img src={logo} alt="Проектная" className="h-7 w-auto" />
                </Link>
                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            {isTeacher && (
                                <Button onClick={onCreateProject} iconLeft={<PlusCircleIcon className="h-5 w-5 stroke-2" />}>
                                    Создать проект
                                </Button>
                            )}
                            <Menu as='div' className='relative'>
                                <Menu.Button className='focus:outline-none'>
                                    <Avatar
                                        src={user.avatar_path}
                                        name={`${user.name} ${user.surname}`}
                                        size="h-10 w-10"
                                    />
                                </Menu.Button>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute left-0 mt-2 bg-white rounded-md shadow-lg focus:outline-none z-10">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => navigate('/profile')}
                                                    className={`${active ? 'bg-slate-100' : ''} block w-full rounded-md text-left px-4 py-2 text-sm text-slate-600`}
                                                >
                                                    Профиль
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                onClick={onLogout}
                                                className={`${active ? 'bg-gray-100' : ''} block w-full rounded-md text-left px-4 py-2 text-sm text-slate-600`}
                                                >
                                                Выйти
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </>
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