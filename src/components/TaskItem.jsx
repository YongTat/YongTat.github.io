import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';

const TaskItem = ({ task }) => {
    const { updateTask, deleteTask } = useProject();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...task });

    const handleSave = () => {
        updateTask(task.id, {
            ...formData,
            cost: parseFloat(formData.cost)
        });
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="card" style={{ padding: '1rem', border: '1px solid var(--primary)' }}>
                <div className="grid" style={{ gap: '0.5rem' }}>
                    <input
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Task Name"
                    />
                    <div className="flex">
                        <input
                            type="number"
                            value={formData.cost}
                            onChange={e => setFormData({ ...formData, cost: e.target.value })}
                            placeholder="Cost"
                        />
                        <input
                            type="date"
                            value={formData.startDate}
                            onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                        />
                        <input
                            type="date"
                            value={formData.endDate}
                            onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                        />
                    </div>
                    <div className="flex">
                        <button onClick={handleSave}>Save</button>
                        <button className="secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            padding: '0.8rem', backgroundColor: 'rgba(0,0,0,0.2)', marginBottom: '0.5rem', borderRadius: '8px',
            opacity: task.isCompleted ? 0.6 : 1, gap: '1rem'
        }}>
            <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={e => updateTask(task.id, { isCompleted: e.target.checked })}
                style={{ width: '20px', height: '20px' }}
            />
            <div style={{ flex: 1, textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
                <div style={{ fontWeight: 'bold' }}>{task.name}</div>
                <div style={{ fontSize: '0.8em', opacity: 0.7 }}>
                    {task.startDate} - {task.endDate}
                </div>
            </div>
            <div style={{ fontWeight: 'bold', color: 'var(--warning)' }}>
                ${parseFloat(task.cost || 0).toLocaleString()}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="secondary" style={{ padding: '0.3rem 0.6rem' }} onClick={() => setIsEditing(true)}>Edit</button>
                <button className="danger" style={{ padding: '0.3rem 0.6rem' }} onClick={() => deleteTask(task.id)}>X</button>
            </div>
        </div>
    );
};

export default TaskItem;
