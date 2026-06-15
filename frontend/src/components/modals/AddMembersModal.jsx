import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Button from '../Button';
import Input from '../Input';
import Avatar from '../Avatar';
import { searchUsers } from '../../services/userService';
import { addProjectMembers } from '../../services/projectService';

const AddMembersModal = ({ isOpen, onClose, projectId, roleFilter, onMembersAdded }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    // Сброс при открытии
    useEffect(() => {
        if (isOpen) {
            setSearchTerm('');
            setUsers([]);
            setSelectedUsers([]);
            setError('');
        }
    }, [isOpen]);

    // Debounced поиск
    useEffect(() => {
        if (!isOpen) return;
        if (searchTerm.trim().length < 2) {
            setUsers([]);
            return;
        }
        const timer = setTimeout(async () => {
        setLoading(true);
        try {
            const res = await searchUsers(searchTerm, roleFilter);
            // Исключаем уже выбранных из результатов поиска
            const filtered = res.data.filter(
                (user) => !selectedUsers.some((selected) => selected.id === user.id)
            );
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm, isOpen, roleFilter, selectedUsers]);

    const handleSelectUser = (user) => {
        if (selectedUsers.some((u) => u.id === user.id)) return;
        setSelectedUsers([...selectedUsers, user]);
        // Очистить поиск
        setSearchTerm('');
    };

    const handleRemoveUser = (userId) => {
        setSelectedUsers(selectedUsers.filter((u) => u.id !== userId));
    };

    const handleSave = async () => {
        if (selectedUsers.length === 0) return;
        setSaving(true);
        setError('');
        try {
            const userIds = selectedUsers.map((u) => u.id);
            console.log('AddMembersModal.handleSave userIds: ', userIds);
            await addProjectMembers(projectId, userIds);
            onMembersAdded(); // обновить проект
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка добавления');
        } finally {
            setSaving(false);
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 shadow-xl transition-all">
                                <div className="flex justify-between items-center mb-4">
                                    <Dialog.Title as="h3" className="text-lg font-semibold">
                                        {roleFilter === 'teacher' ? 'Преподаватели' : 'Студенты'}
                                    </Dialog.Title>
                                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                                        <XMarkIcon className="h-5 w-5" />
                                    </button>
                                </div>
                                <Input
                                    placeholder="Поиск по имени, фамилии или email"
                                    iconLeft={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                {/* Блок выбранных участников (теги) */}
                                {selectedUsers.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {selectedUsers.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                                    >
                                        <span>{user.name} {user.surname}</span>
                                        <button
                                            onClick={() => handleRemoveUser(user.id)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <XMarkIcon className="h-3 w-3" />
                                        </button>
                                    </div>
                                    ))}
                                </div>
                                )}
                                <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
                                    {loading && <p className="text-center text-gray-500 py-4">Поиск...</p>}
                                    {!loading &&
                                        users.map((user) => (
                                            <div key={user.id}
                                                className="flex items-center justify-between p-2 border-b"
                                                onClick={() => handleSelectUser(user)}
                                            >
                                                <div>
                                                    <p className="font-medium">{user.name} {user.surname}</p>
                                                    <p className="text-sm text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                        ))}
                                    {!loading && searchTerm.trim().length >= 2 && users.length === 0 && (
                                        <p className="text-center text-gray-500 py-4">Не найдено</p>
                                    )}
                                </div>
                                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                                <div className="flex gap-3 mt-6">
                                    <Button variant="secondary" onClick={onClose} className="flex-1">
                                        Отмена
                                    </Button>
                                    <Button onClick={handleSave} disabled={selectedUsers.length === 0 || saving} className="flex-1">
                                        {saving ? 'Сохранение...' : `Добавить (${selectedUsers.length})`}
                                    </Button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default AddMembersModal;