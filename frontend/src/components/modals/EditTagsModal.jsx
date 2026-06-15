import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Select from '../Select';
import Input from '../Input';
import Button from '../Button';
import { updateProject } from '../../services/projectService';
import { getInstitutes, getDirections } from '../../services/referenceService';

const EditTagsModal = ({ isOpen, onClose, project, onUpdate }) => {
    const [instituteId, setInstituteId] = useState(project.institute?.id || '');
    const [directionId, setDirectionId] = useState(project.direction?.id || '');
    const [course, setCourse] = useState(project.course);
    const [institutes, setInstitutes] = useState([]);
    const [directions, setDirections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
        setInstituteId(project.institute?.id || '');
        setDirectionId(project.direction?.id || '');
        setCourse(project.course);
        }
    }, [isOpen, project]);

    useEffect(() => {
        if (isOpen) {
        getInstitutes().then(res => setInstitutes(res.data));
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && instituteId) {
            const fetchDirections = async () => {
                const res = await getDirections(instituteId);
                setDirections(res.data);
            };
            fetchDirections();
        } else {
            setDirections([]);
        }
    }, [isOpen, instituteId]);

    const handleInstituteChange = async (instId) => {
        setInstituteId(instId);
        setDirectionId('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await updateProject(project.id, {
                institute_id: instituteId || null,
                direction_id: directionId || null,
                course: course ? parseInt(course) : null,
             });
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
                                    Выберите теги
                                </p>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <Select
                                        label='Институт*'
                                        options={institutes.map((i) => ({ value: i.id, label: i.full_name }))}
                                        value={instituteId || ''}
                                        onChange={(e) => handleInstituteChange(e.target.value)}
                                        placeholder="Выберите институт"
                                        required
                                    />
                                    <Select
                                        label="Направление"
                                        options={directions.map((d) => ({ value: d.id, label: d.full_name }))}
                                        value={directionId || ''}
                                        onChange={(e) => setDirectionId(e.target.value)}
                                        placeholder="Выберите направление"
                                        disabled={!instituteId}
                                    />
                                    <Input
                                        label="Курс"
                                        type="number"
                                        min="1"
                                        max="6"
                                        value={course}
                                        onChange={(e) => setCourse(e.target.value)}
                                        placeholder="Например, 3"
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

export default EditTagsModal;