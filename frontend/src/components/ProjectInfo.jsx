import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import Input from './Input';
import Avatar from '../components/Avatar';
import { PencilSquareIcon, PlusIcon } from '@heroicons/react/24/outline';
import { updateProject } from '../services/projectService';
import EditSemesterYearModal from './modals/EditSemesterYearModal';
import EditTagsModal from './modals/EditTagsModal';
import AddMembersModal from './modals/AddMembersModal';

const ProjectInfo = ({ project, isTeacher, isMember, onAddMember, onUpdate }) => {
    const [isEditingName, setIsEditingName] = useState(false);
    const [newName, setNewName] = useState(project.name);
    const [loading, setLoading] = useState(false);

    const [description, setDescription] = useState(project.description);
    const [isSaving, setIsSaving] = useState(false);

    const [isSemesterYearModalOpen, setIsSemesterYearModalOpen] = useState(false);
    const [isTagsModalOpen, setIsTagsModalOpen] = useState(false);
    const [isAddTeacherModalOpen, setIsAddTeacherModalOpen] = useState(false);
    const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);

    const teachers = project.members?.filter(m => m.role === 'teacher') || [];
    const students = project.members?.filter(m => m.role === 'student') || [];

    const progress = project.progress ?? 0;

    const handleSaveName = async () => {
        setLoading(true);
        try {
            await updateProject(project.id, { name: newName });
            setIsEditingName(false);
            onUpdate(); // перезагрузить данные проекта
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveDesc = async () => {
        if (description === project.description) return;
        setIsSaving(true);
        try {
            await updateProject(project.id, { description });
            onUpdate();
        } catch (err) {
            console.error(err);
            setDescription(project.description);
        } finally {
            setIsSaving(false);
        }
    }

    // Заглушка для активности
    const activities = students.map(s => ({
        id: s.id,
        name: `${s.name} ${s.surname}`,
        assigned: 0,
        completed: 0,
        progress: 0,
    }));

    return (
        <div className='container max-w-3xl'>
            {/* Семестр, год + теги + прогресс */}
            <div className="mb-4">
                <div className='flex flex-wrap gap-4 mb-2'>
                    <p className="text-slate-600 text-base font-semibold uppercase">
                        {project.semester === 'autumn' ? 'Осень' : 'Весна'} {project.year}
                    </p>
                    {isTeacher && (
                        <Button
                            onClick={() => setIsSemesterYearModalOpen(true)}
                            className='text-slate-400'
                            variant='tertiary'
                            isIconOnly
                            icon={<PencilSquareIcon className="h-5 w-5 stroke-2" />}
                        />
                    )}
                </div>
                <div className='flex justify-between items-center'>
                    <div className="flex flex-wrap gap-4 text-sm">
                        {project.institute && (
                                    <span className="px-3 py-1 bg-blue-100 rounded-3xl">
                                        {project.institute.short_name}
                                    </span>
                        )}
                        {project.direction && (
                            <span className="px-3 py-1 bg-blue-100 rounded-3xl">
                                {project.direction.short_name}
                            </span>
                        )}
                        {project.course && (
                            <span className="px-3 py-1 bg-blue-100 rounded-3xl uppercase">
                                {project.course} курс
                            </span>
                        )}
                        {isTeacher && (
                            <Button
                                onClick={() => setIsTagsModalOpen(true)}
                                className='text-slate-400'
                                variant='tertiary'
                                isIconOnly
                                icon={<PencilSquareIcon className="h-5 w-5 stroke-2" />}
                            />
                        )}
                    </div>
                    <div className='justify-end'>
                        <div className="flex justify-between items-center text-sm text-blue-400 mb-2">
                            <span>Прогресс</span>
                            <span className='justify-end'>{progress}%</span>
                        </div>
                        <div className="w-80 bg-blue-100 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Название проекта (inline редактирование) */}
            <div className="flex items-center gap-2 mb-4">
                {isEditingName ? (
                    <>
                        <input
                            type='text'
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            onBlur={handleSaveName}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveName();
                                if (e.key === 'Escape') {
                                    setNewName(project.name);
                                    setIsEditingName(false);
                                }
                            }}
                            className="text-4xl font-semibold flex-1 focus:outline-none"
                            autoFocus
                        />
                    </>
                ) : (
                    <h2
                        onClick={() => setIsEditingName(true)}
                        className="text-4xl font-semibold"
                    >
                        {project.name}
                    </h2>
                )}
            </div>
            {/* Описание */}
            <div className='mb-4'>
                    <Input
                        multiline
                        rows={4}
                        value={description}
                        placeholder='Описание проекта'
                        onChange={(e) => setDescription(e.target.value)}
                        onBlur={handleSaveDesc}
                        onKeyDown={(e) => {
                            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                                e.preventDefault();
                                handleSaveDesc();
                            }
                            if (e.key === 'Escape') {
                                setDescription(project.description);
                                setIsSaving(false);
                            }
                        }}
                        disabled={isSaving}
                        className='w-full'
                    />
            </div>
            {/* Преподаватели */}
            <div className='mb-8'>
                <h3 className="text-xl font-semibold mb-4">Преподаватель(и):</h3>
                <div className="flex flex-wrap gap-2.5 mb-3 text-sm">
                    {teachers.map(teacher => (
                        <div key={teacher.id} className="flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-3xl">
                            <Avatar src={teacher.avatar_path} name={`${teacher.name} ${teacher.surname}`} size="h-6 w-6" />
                            <span className="text-sm">{teacher.name} {teacher.surname}</span>
                        </div>
                    ))}
                    {isTeacher && (
                        <button
                            onClick={() => setIsAddTeacherModalOpen(true)}
                            className="gap-2 px-3 py-1 bg-blue-100 rounded-3xl hover:bg-blue-200"
                        >
                            <PlusIcon className="h-5 w-5" />
                        </button>
                    )}
                </div>
            </div>
            {/* Студенты */}
            <div className='mb-8'>
                <h3 className="text-xl font-semibold mb-4">Студент(ы):</h3>
                <div className="flex flex-wrap gap-2.5 mb-3 text-sm">
                    {students.map(student => (
                        <div key={student.id} className="flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-3xl">
                            <Avatar src={student.avatar_path} name={`${student.name} ${student.surname}`} size="h-6 w-6" />
                            <span className="text-sm">{student.name} {student.surname}</span>
                        </div>
                    ))}
                    {isTeacher && (
                        <button
                            onClick={() => setIsAddStudentModalOpen(true)}
                            className="gap-2 px-3 py-1 bg-blue-100 rounded-3xl hover:bg-blue-200"
                        >
                            <PlusIcon className="h-5 w-5" />
                        </button>
                    )}
                </div>
            </div>
            {/* Активность команды (только для преподавателя) */}
            <div>
                <h3 className="text-xl font-semibold mb-4">Активность команды</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-slate-200 rounded-lg">
                    <thead className="bg-slate-50">
                        <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">Студент</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">Назначено</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">Выполнено</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">Прогресс</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.map(act => (
                        <tr key={act.id} className="border-t border-slate-200">
                            <td className="px-6 py-3 text-base font-semibold text-slate-900">{act.name}</td>
                            <td className="px-6 py-3 text-base">{act.assigned}</td>
                            <td className="px-6 py-3 text-base">{act.completed}</td>
                            <td className="px-6 py-3">
                            <div className="flex items-center gap-2">
                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${act.progress}%` }}></div>
                                </div>
                                <span className="text-xs text-gray-500">{act.progress}%</span>
                            </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
            <EditSemesterYearModal
                isOpen={isSemesterYearModalOpen}
                onClose={() => setIsSemesterYearModalOpen(false)}
                project={project}
                onUpdate={onUpdate}
            />
            <EditTagsModal
                isOpen={isTagsModalOpen}
                onClose={() => setIsTagsModalOpen(false)}
                project={project}
                onUpdate={onUpdate}
            />
            <AddMembersModal
                isOpen={isAddTeacherModalOpen}
                onClose={() => setIsAddTeacherModalOpen(false)}
                projectId={project.id}
                roleFilter='teacher'
                onMembersAdded={onUpdate}
            />
            <AddMembersModal
                isOpen={isAddStudentModalOpen}
                onClose={() => setIsAddStudentModalOpen(false)}
                projectId={project.id}
                roleFilter='student'
                onMembersAdded={onUpdate}
            />
        </div>
    );
};

export default ProjectInfo;