import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectById } from '../services/projectService';
import ProjectInfo from '../components/ProjectInfo';
import ProjectSprints from '../components/ProjectSprints';
import { useAuth } from '../context/AuthContext';

const ProjectPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('info');

    // useEffect(() => {
    //     const fetchProject = async () => {
    //         try {
    //             const res = await getProjectById(id);
    //             setProject(res.data);
    //         } catch (err) {
    //             console.error(err);
    //             navigate('/dashboard');
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchProject();
    // }, [id, navigate]);

    const fetchProject = async () => {
            try {
                const res = await getProjectById(id);
                setProject(res.data);
            } catch (err) {
                console.error(err);
                navigate('/dashboard');
            } finally {
                setLoading(false);
            }
    };

    useEffect(() => {
        fetchProject();
    }, [id, navigate]);

    if (loading) return <div className="text-center p-8">Загрузка...</div>;
    if (!project) return null;

    const isTeacher = user?.role === 'teacher';
    const isMember = project.members?.some(m => m.id === user.id) || user?.role === 'teacher';

    const handleEdit = (field) => {
        // открыть модальное окно редактирования
        console.log('Edit', field);
    };

    const handleAddMember = () => {
        // открыть модальное окно добавления участников
        console.log('Add member');
    };

    return (
        <div className="container max-w-7xl mx-auto flex flex-row gap-36 mt-14">
            <div className="w-48 h-screen bg-white flex flex-col">
                <nav className="flex flex-col gap-2">
                    {['info', 'sprints', 'documents'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                                        relative flex items-center px-4 py-2 text-left text-base font-semibold rounded-md
                                        transition-colors duration-200
                                        hover:bg-blue-50
                                        ${activeTab === tab
                                            ? 'bg-blue-50 text-slate-900'
                                            : 'text-slate-600'
                                        }
                                    `}
                        >
                            {tab === 'info' && 'Информация'}
                            {tab === 'sprints' && 'Спринты'}
                            {tab === 'documents' && 'Документы'}
                            {activeTab === tab && (
                                <span className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-10 bg-blue-600 rounded-full" />
                            )}
                        </button>
                    ))}
                </nav>
            </div>
            {activeTab === 'info' && (
                <ProjectInfo
                project={project}
                isTeacher={isTeacher}
                isMember={isMember}
                onUpdate={fetchProject}
                onAddMember={handleAddMember}
                />
            )}
            {activeTab === 'sprints' && (
                <ProjectSprints
                    projectId={project.id}
                    isTeacher={isTeacher}
                />
            )}
            {activeTab === 'documents' && <div>Документы (в разработке)</div>}
        </div>
    );
};

export default ProjectPage;