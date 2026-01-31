import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';

const EditProjectModal = ({ onClose }) => {
    const { project, updateProject } = useProject();
    const [formData, setFormData] = useState({ ...project });

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProject({
            ...formData,
            totalBudget: parseFloat(formData.totalBudget),
            lengthWeeks: parseInt(formData.lengthWeeks)
        });
        onClose();
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 1000, backdropFilter: 'blur(5px)'
        }}>
            <div className="card" style={{ width: '400px' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Edit Project</h2>
                <form onSubmit={handleSubmit} className="grid">
                    <div>
                        <label>Project Name</label>
                        <input
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Total Budget ($)</label>
                        <input
                            type="number"
                            value={formData.totalBudget}
                            onChange={e => setFormData({ ...formData, totalBudget: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Target Length (Weeks)</label>
                        <input
                            type="number"
                            value={formData.lengthWeeks}
                            onChange={e => setFormData({ ...formData, lengthWeeks: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Start Date</label>
                        <input
                            type="date"
                            value={formData.startDate}
                            onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                        />
                    </div>
                    <div className="flex justify-between" style={{ marginTop: '1rem' }}>
                        <button type="button" className="secondary" onClick={onClose}>Cancel</button>
                        <button type="submit">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProjectModal;
