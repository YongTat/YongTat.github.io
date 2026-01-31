import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import TaskItem from './TaskItem';

const AreaCard = ({ area }) => {
    const { deleteArea, tasks, addTask, updateArea } = useProject();
    const areaTasks = tasks.filter(t => t.areaId === area.id);
    const areaUsed = areaTasks.reduce((sum, t) => sum + parseFloat(t.cost || 0), 0);
    const percentage = Math.min(100, (areaUsed / area.allocatedBudget) * 100);
    const isOverBudget = areaUsed > area.allocatedBudget;

    const [isAddingTask, setIsAddingTask] = useState(false);
    const [newTask, setNewTask] = useState({ name: '', cost: '', startDate: '', endDate: '' });

    // Budget Editing State
    const [isEditingBudget, setIsEditingBudget] = useState(false);
    const [tempBudget, setTempBudget] = useState(area.allocatedBudget);

    const handleAddTask = (e) => {
        e.preventDefault();
        if (newTask.name && newTask.cost) {
            addTask(area.id, newTask);
            setNewTask({ name: '', cost: '', startDate: '', endDate: '' });
            setIsAddingTask(false);
        }
    };

    const handleSaveBudget = () => {
        updateArea(area.id, { allocatedBudget: parseFloat(tempBudget) });
        setIsEditingBudget(false);
    };

    return (
        <div className="card">
            <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
                <h3>{area.name}</h3>
                <button className="danger" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8em' }} onClick={() => deleteArea(area.id)}>Delete Area</button>
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <div className="flex justify-between items-center" style={{ fontSize: '0.9em', marginBottom: '0.3rem' }}>
                    <span>Budget Usage</span>
                    {isEditingBudget ? (
                        <div className="flex items-center" style={{ gap: '5px' }}>
                            <span style={{ color: isOverBudget ? 'var(--danger)' : 'white' }}>${areaUsed.toLocaleString()} / </span>
                            <input
                                type="number"
                                value={tempBudget}
                                onChange={e => setTempBudget(e.target.value)}
                                style={{ width: '80px', padding: '0.2rem' }}
                                autoFocus
                            />
                            <button style={{ padding: '0.2rem 0.5rem', fontSize: '0.8em' }} onClick={handleSaveBudget}>✓</button>
                            <button className="secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8em' }} onClick={() => setIsEditingBudget(false)}>✕</button>
                        </div>
                    ) : (
                        <div onClick={() => { setTempBudget(area.allocatedBudget); setIsEditingBudget(true); }} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <span style={{ color: isOverBudget ? 'var(--danger)' : 'white' }}>
                                ${areaUsed.toLocaleString()} / ${area.allocatedBudget.toLocaleString()}
                            </span>
                            <span style={{ fontSize: '0.8em', opacity: 0.5 }}>✎</span>
                        </div>
                    )}
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                        width: `${percentage}%`, height: '100%',
                        background: isOverBudget ? 'var(--danger)' : 'var(--primary)',
                        transition: 'width 0.5s ease'
                    }} />
                </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
                {areaTasks.map(task => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </div>

            {isAddingTask ? (
                <form onSubmit={handleAddTask} className="grid" style={{ gap: '0.5rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
                    <input
                        placeholder="Task Name"
                        value={newTask.name}
                        onChange={e => setNewTask({ ...newTask, name: e.target.value })}
                        required
                    />
                    <input
                        type="number" placeholder="Cost ($)"
                        value={newTask.cost}
                        onChange={e => setNewTask({ ...newTask, cost: e.target.value })}
                        required
                    />
                    <div className="flex">
                        <input
                            type="date"
                            value={newTask.startDate}
                            onChange={e => setNewTask({ ...newTask, startDate: e.target.value })}
                        />
                        <input
                            type="date"
                            value={newTask.endDate}
                            onChange={e => setNewTask({ ...newTask, endDate: e.target.value })}
                        />
                    </div>
                    <div className="flex">
                        <button type="submit">Add</button>
                        <button type="button" className="secondary" onClick={() => setIsAddingTask(false)}>Cancel</button>
                    </div>
                </form>
            ) : (
                <button className="secondary" style={{ width: '100%' }} onClick={() => setIsAddingTask(true)}>+ Add Task</button>
            )}
        </div>
    );
};

export default AreaCard;
