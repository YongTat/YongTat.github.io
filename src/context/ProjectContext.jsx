import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ProjectContext = createContext();

export const useProject = () => useContext(ProjectContext);

const DEFAULT_AREAS = [
    { id: '1', name: 'Master Bedroom', allocatedBudget: 10000 },
    { id: '2', name: 'Kitchen', allocatedBudget: 10000 },
    { id: '3', name: 'Living Room', allocatedBudget: 10000 },
    { id: '4', name: 'Bathroom', allocatedBudget: 10000 },
];

export const ProjectProvider = ({ children }) => {
    const [project, setProject] = useState(() => {
        const saved = localStorage.getItem('hdb_reno_project');
        return saved ? JSON.parse(saved) : {
            name: 'My Dream Home',
            totalBudget: 50000,
            startDate: new Date().toISOString().split('T')[0],
            lengthWeeks: 12
        };
    });

    const [areas, setAreas] = useState(() => {
        const saved = localStorage.getItem('hdb_reno_areas');
        return saved ? JSON.parse(saved) : DEFAULT_AREAS;
    });

    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('hdb_reno_tasks');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('hdb_reno_project', JSON.stringify(project));
    }, [project]);

    useEffect(() => {
        localStorage.setItem('hdb_reno_areas', JSON.stringify(areas));
    }, [areas]);

    useEffect(() => {
        localStorage.setItem('hdb_reno_tasks', JSON.stringify(tasks));
    }, [tasks]);

    const updateProject = (data) => {
        setProject(prev => ({ ...prev, ...data }));
    };

    const addArea = (name, budget) => {
        setAreas(prev => [...prev, { id: uuidv4(), name, allocatedBudget: parseFloat(budget) }]);
    };

    const updateArea = (id, data) => {
        setAreas(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
    };

    const deleteArea = (id) => {
        setAreas(prev => prev.filter(a => a.id !== id));
        setTasks(prev => prev.filter(t => t.areaId !== id));
    };

    const addTask = (areaId, task) => {
        setTasks(prev => [...prev, { id: uuidv4(), areaId, isCompleted: false, ...task }]);
    };

    const updateTask = (id, data) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, ...data } : t));
    };

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    const resetAll = () => {
        setProject({
            name: 'My Dream Home',
            totalBudget: 50000,
            startDate: new Date().toISOString().split('T')[0],
            lengthWeeks: 12
        });
        setAreas(DEFAULT_AREAS);
        setTasks([]);
    };

    const importData = (jsonData) => {
        try {
            const { project: p, areas: a, tasks: t } = JSON.parse(jsonData);
            if (p && a && t) {
                setProject(p);
                setAreas(a);
                setTasks(t);
                return true;
            }
        } catch (e) {
            console.error(e);
            return false;
        }
    };

    const getExportData = () => JSON.stringify({ project, areas, tasks }, null, 2);

    return (
        <ProjectContext.Provider value={{
            project, updateProject,
            areas, addArea, updateArea, deleteArea,
            tasks, addTask, updateTask, deleteTask,
            resetAll, importData, getExportData
        }}>
            {children}
        </ProjectContext.Provider>
    );
};
