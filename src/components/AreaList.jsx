import React from 'react';
import { useProject } from '../context/ProjectContext';
import AreaCard from './AreaCard';

const AreaList = () => {
    const { areas, addArea } = useProject();
    const [newAreaName, setNewAreaName] = React.useState('');
    const [newAreaBudget, setNewAreaBudget] = React.useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        if (newAreaName && newAreaBudget) {
            addArea(newAreaName, newAreaBudget);
            setNewAreaName('');
            setNewAreaBudget('');
        }
    }

    return (
        <div>
            <div className="grid grid-2">
                {areas.map(area => (
                    <AreaCard key={area.id} area={area} />
                ))}

                {/* Add New Area Card */}
                <div className="card" style={{ borderStyle: 'dashed', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <form onSubmit={handleAdd} className="grid" style={{ gap: '0.5rem' }}>
                        <h3>Add New Area</h3>
                        <input
                            placeholder="Area Name (e.g. Toilet)"
                            value={newAreaName}
                            onChange={e => setNewAreaName(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Budget ($)"
                            value={newAreaBudget}
                            onChange={e => setNewAreaBudget(e.target.value)}
                        />
                        <button type="submit">Create Area</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AreaList;
