import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Select from '../Select';
import Input from '../Input';
import Button from '../Button';
import { updateProject } from '../../services/projectService';

const EditSemesterYearModal = ({ isOpen, onClose, project, onUpdate }) => {
    const [semester, setSemester] = useState(project.semester);
    const [year, setYear] = useState(project.year);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await updateProject(project.id, { semester, year });
            onUpdate(); // обновить данные проекта
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка обновления');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
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
                            <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
                                <div className='flex justify-between items-center'>
                                    <Dialog.Title as='h3' className='text-2xl font-semibold text-slate-900'>
                                        Редактирование
                                    </Dialog.Title>
                                    <Button
                                        onClick={onClose}
                                        isIconOnly
                                        variant='tertiary'
                                        icon={<XMarkIcon className='h-6 w-6'/>}
                                    />
                                </div>
                                <p className='text-base text-gray-600 mb-4'>
                                    Выберите семестр и год
                                </p>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <Select
                                        label='Семестр*'
                                        options={[
                                            { value: 'autumn', label: 'Осень' },
                                            { value: 'spring', label: 'Весна' },
                                        ]}
                                        value={semester}
                                        onChange={(e) => setSemester(e.target.value)}
                                        required
                                    />
                                    <Input
                                        label="Год*"
                                        type="number"
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                        required
                                    />
                                    {error && <p className="text-red-500 text-sm">{error}</p>}
                                    <div className="flex gap-4 mt-6">
                                        <Button variant="secondary" onClick={onClose} type="button" className="flex-1">
                                            Отмена
                                        </Button>
                                        <Button type="submit" disabled={loading} className="flex-1">
                                            {loading ? 'Сохранение...' : 'Сохранить'}
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

export default EditSemesterYearModal;