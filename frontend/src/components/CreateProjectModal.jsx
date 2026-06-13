import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import { createProject } from '../services/projectService';
import { getInstitutes, getDirections } from '../services/referenceService';

const createProjectModal = ({ isOpen, onClose, onProjectCreated }) => {
    const [formData, setFormData] = useState({
        name: '',
        semester: '',
        year: '',
        course: '',
        institute_id: '',
        direction_id: '',
        description: '',
    });
    const [institutes, setInstitutes] = useState([]);
    const [directions, setDirections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Загрузка институтов при открытии
    useEffect(() => {
        if (isOpen) {
            getInstitutes().then(res => setInstitutes(res.data));
        }
    }, [isOpen]);

    // Загрузка направлений при изменении института
    const handleInstituteChange = async (instituteId) => {
        setFormData(prev => ({ ...prev, institute_id: instituteId, direction_id: '' }));
        if (instituteId) {
            const res = await getDirections(instituteId);
            setDirections(res.data);
        } else {
            setDirections([]);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await createProject(formData);
            const projectId = res.data.id;
            onProjectCreated(projectId); // передаем ID в родительский компонент
            onClose();
            setFormData({
                name: '',
                semester: '',
                year: '',
                course: '',
                institute_id: '',
                direction_id: '',
                description: '',
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка создания проекта');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-50' onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black/25'/>
                </Transition.Child>
                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all'>
                                <Dialog.Title as='h3' className='text-lg font-semibold mb-4'>
                                    Новый проект
                                </Dialog.Title>
                                <form onSubmit={handleSubmit} className='space-y-4'>
                                    <Input
                                        label='Название проекта'
                                        name='name'
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder='Как называется ваш проект?'
                                        required
                                    />
                                    <div className='grid grid-cols-3 gap-3'>
                                        <Select
                                            label='Семестр'
                                            name='semester'
                                            options={[
                                                { value: 'autumn', label: 'Осень' },
                                                { value: 'spring', label: 'Весна' },
                                            ]}
                                            value={formData.semester}
                                            onChange={handleChange}
                                            placeholder='Выберите семестр'
                                            required
                                        />
                                        <Input
                                            label='Год'
                                            name='year'
                                            type='number'
                                            value={formData.year}
                                            onChange={handleChange}
                                            placeholder='Например, 2026'
                                            required
                                        />
                                        <Input
                                            label='Курс'
                                            name='course'
                                            type='number'
                                            value={formData.course}
                                            onChange={handleChange}
                                            placeholder='Например, 3'
                                            required
                                        />
                                    </div>
                                    <div className='grid grid-cols-2 gap-3'>
                                        <Select
                                            label='Институт'
                                            name='institute_id'
                                            options={institutes.map(i => ({ value: i.id, label: i.full_name }))}
                                            value={formData.institute_id}
                                            onChange={(e) => handleInstituteChange(e.target.value)}
                                            placeholder='Выберите институт'
                                            required
                                        />
                                        <Select
                                            label='Направление'
                                            name='direction_id'
                                            options={directions.map(d => ({ value: d.id, label: d.full_name }))}
                                            value={formData.direction_id}
                                            onChange={handleChange}
                                            placeholder='Выберите направление'
                                            disabled={!formData.institute_id}
                                            required
                                        />
                                    </div>
                                    <Input
                                        label='Описание'
                                        name='description'
                                        value={formData.description}
                                        onChange={handleChange}
                                        multiline
                                        rows={3}
                                        placeholder='Опишите будущий проект'
                                    />
                                    {error && <p className="text-red-500 text-sm">{error}</p>}
                                    <div className="flex justify-end gap-3 mt-4">
                                        <Button variant="secondary" onClick={onClose} type="button">
                                            Отмена
                                        </Button>
                                        <Button type="submit" disabled={loading}>
                                            {loading ? 'Создание...' : 'Создать'}
                                        </Button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default createProjectModal;