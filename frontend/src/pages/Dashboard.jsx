import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import CreateProjectModal from '../components/CreateProjectModal';
import { getUserProjects } from '../services/projectService';
import ProjectCard from '../components/ProjectCard';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            const res = await getUserProjects();
            setProjects(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    if (loading) return <div className="text-center p-8">Загрузка...</div>;

    return (
        <div className="container max-w-7xl mx-auto pt-12">
            <h1 className="text-4xl font-semibold mb-6">Мои проекты</h1>
            {projects.length === 0 ? (
                <p className="text-gray-500">У вас пока нет проектов.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {projects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;