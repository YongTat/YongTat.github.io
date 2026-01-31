import React, { useState } from 'react';
import { useProject } from './context/ProjectContext';
import Dashboard from './components/Dashboard';
import GanttChart from './components/GanttChart';
// Placeholders for now, will implement next
import AreaList from './components/AreaList';
import Controls from './components/Controls';
import EditProjectModal from './components/EditProjectModal';

function App() {
    const { project } = useProject();
    const [showGantt, setShowGantt] = useState(false);
    const [isEditingProject, setIsEditingProject] = useState(false);

    return (
        <div className="app-container">
            <header className="header flex justify-between items-center">
                <div>
                    <h1 onClick={() => setIsEditingProject(true)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {project.name}
                        <span style={{ fontSize: '0.4em', opacity: 0.5 }}>✎</span>
                    </h1>
                    <p onClick={() => setIsEditingProject(true)} style={{ opacity: 0.7, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        Limit: ${project.totalBudget.toLocaleString()} • {project.lengthWeeks} Weeks
                        <span style={{ fontSize: '0.8em', opacity: 0.5 }}>✎</span>
                    </p>
                </div>
                <div className="flex">
                    <button
                        className={!showGantt ? '' : 'secondary'}
                        onClick={() => setShowGantt(false)}>
                        Dashboard
                    </button>
                    <button
                        className={showGantt ? '' : 'secondary'}
                        onClick={() => setShowGantt(true)}>
                        Timeline
                    </button>
                </div>
            </header>

            <main className="grid">
                {showGantt ? <GanttChart /> : <Dashboard />}

                <div className="flex justify-between items-center" style={{ marginTop: '1rem' }}>
                    <h2>Renovation Areas</h2>
                    <Controls />
                </div>

                <AreaList />
            </main>

            {isEditingProject && <EditProjectModal onClose={() => setIsEditingProject(false)} />}
        </div>
    );
}

export default App;
