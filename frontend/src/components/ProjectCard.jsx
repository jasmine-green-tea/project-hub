import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
    const progress = project.progress ?? 0;

    return (
        <Link to={`/projects/${project.id}`} className="block ">
            <div className="bg-white rounded-lg ring-1 ring-blue-200 shadow-sm hover:ring-blue-400 hover:ring-1 text-slate-900 p-4 h-91 flex flex-col">
                <div className="grow">
                    <p className='uppercase text-sm text-blue-400 mb-6'>{project.semester === 'autumn' ? 'Осень' : 'Весна'} {project.year}</p>
                    <h3 className="text-2xl  font-semibold mb-6 line-clamp-1">{project.name}</h3>
                    <p className=" text-sm mb-4 line-clamp-3">{project.description || 'Нет описания'}</p>
                    <div className="flex flex-wrap gap-2.5 mb-3 text-sm">
                        {project.institute && (
                            <span className="px-3 py-1 bg-blue-100 rounded-3xl">{project.institute.short_name}</span>
                        )}
                        {project.direction && (
                            <span className="px-3 py-1 bg-blue-100 rounded-3xl">{project.direction.short_name}</span>
                        )}
                        {project.course && (
                            <span className="px-3 py-1 uppercase bg-blue-100 rounded-3xl">{project.course} курс</span>
                        )}
                    </div>
                </div>
                <div className="flex justify-between items-center text-sm text-blue-400 mb-2">
                    <span>Прогресс</span>
                    <span className='justify-end'>{progress}%</span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
        </Link>
    );
};

export default ProjectCard;