import React, { useState, useEffect } from 'react';
import { getProjectSprints, createSprint, startSprint, completeSprint } from '../services/sprintService';
import Button from './Button';
import { format } from 'date-fns';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

const ProjectSprints = ({ projectId, isTeacher }) => {
    const [sprints, setSprints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchSprints = async () => {
        try {
            const res = await getProjectSprints(projectId);
            setSprints(res.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка загрузки спринтов');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSprints();
    }, [projectId]);

    const handleStartSprint = async (sprintId) => {
        try {
            await startSprint(sprintId);
            await fetchSprints();
        } catch (err) {
            alert(err.response?.data?.message || 'Не удалось начать спринт');
        }
    };

    const handleCompleteSprint = async (sprintId) => {
        if (!window.confirm('Завершить текущий спринт?')) return;
        try {
            await completeSprint(sprintId);
            await fetchSprints();
        } catch (err) {
            alert(err.response?.data?.message || 'Не удалось завершить спринт');
        }
    };

    const activeSprint = sprints.find(s => s.status === 'active');
    const upcomingSprints = sprints.filter(s => s.status === 'upcoming');
    const pastSprints = sprints.filter(s => s.status === 'completed');

    if (loading) return <div>Загрузка спринтов...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Спринты</h2>
                {!isTeacher && (
                    <Button
                        onClick={() => alert('Модалка создания спринта (позже)')}
                        iconLeft={<PlusCircleIcon className="h-5 w-5 stroke-2"/>}
                    >
                        Создать спринт
                    </Button>
                )}
            </div>
            {/* Активный спринт */}
            {activeSprint && (
                <div className="border rounded-lg p-4 bg-blue-50">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-blue-600 font-semibold">Текущий спринт</p>
                            <h3 className="text-xl font-bold">
                                Спринт {activeSprint.sprint_number} ({format(new Date(activeSprint.start_date), 'dd.MM')} - {format(new Date(activeSprint.end_date), 'dd.MM')})
                            </h3>
                            {activeSprint.goal && <p className="text-gray-700 mt-2">{activeSprint.goal}</p>}
                        </div>
                        {!isTeacher && (
                            <Button variant="secondary" onClick={() => handleCompleteSprint(activeSprint.id)}>
                                Завершить спринт
                            </Button>
                        )}
                    </div>
                    {/* Здесь будет канбан-доска */}
                    <div className="mt-4 text-gray-500">Канбан-доска (будет реализована позже)</div>
                </div>
            )}
            {/* Будущие спринты */}
            {upcomingSprints.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold mb-2">Будущие спринты</h3>
                    <div className="space-y-2">
                        {upcomingSprints.map(sprint => (
                            <div key={sprint.id} className="border rounded p-3 flex justify-between items-center">
                                <div>
                                    <span className="font-medium">Спринт {sprint.sprint_number}</span>
                                    <span className="text-gray-500 ml-2">
                                        {format(new Date(sprint.start_date), 'dd.MM')} – {format(new Date(sprint.end_date), 'dd.MM')}
                                    </span>
                                    {sprint.goal && <p className="text-sm text-gray-600 mt-1">{sprint.goal}</p>}
                                </div>
                                {!isTeacher && (
                                    <Button variant='secondary' onClick={() => handleStartSprint(sprint.id)}>
                                        Начать спринт
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* Прошедшие спринты */}
            {pastSprints.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold mb-2">Прошедшие спринты</h3>
                    <div className="space-y-2">
                        {pastSprints.map(sprint => (
                            <div key={sprint.id} className="border rounded p-3">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="font-medium">Спринт {sprint.sprint_number}</span>
                                        <span className="text-gray-500 ml-2">
                                            {format(new Date(sprint.start_date), 'dd.MM')} – {format(new Date(sprint.end_date), 'dd.MM')}
                                        </span>
                                        {sprint.goal && <p className="text-sm text-gray-600 mt-1">{sprint.goal}</p>}
                                    </div>
                                    {/* Кнопка-стрелка для аккордеона */}
                                    <Button
                                        onClick={() => alert('Показать задачи спринта (аккордеон)')}
                                        variant='secondary'
                                        isIconOnly
                                        icon={<ChevronDownIcon className="h-5 w-5 text-slate-400" />}
                                    />
                                </div>
                                {/* Здесь будет скрываемый блок с задачами */}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectSprints;