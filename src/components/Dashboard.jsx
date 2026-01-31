import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useProject } from '../context/ProjectContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const { project, areas, tasks } = useProject();

    // Calculate Budget Stats
    const totalAllocated = areas.reduce((sum, area) => sum + area.allocatedBudget, 0);
    const totalUsed = tasks.reduce((sum, task) => sum + parseFloat(task.cost || 0), 0);
    const remainingProjectBudget = project.totalBudget - totalAllocated;

    // Calculate Completion Stats
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.isCompleted).length;
    const completionPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    const budgetData = {
        labels: ['Used', 'Allocated (Free)', 'Unallocated Project Budget'],
        datasets: [
            {
                data: [totalUsed, Math.max(0, totalAllocated - totalUsed), Math.max(0, remainingProjectBudget)],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.8)', // Used (Red)
                    'rgba(99, 102, 241, 0.8)', // Allocated (Indigo)
                    'rgba(16, 185, 129, 0.5)', // Unallocated (Green)
                ],
                borderColor: [
                    'rgba(239, 68, 68, 1)',
                    'rgba(99, 102, 241, 1)',
                    'rgba(16, 185, 129, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'bottom',
                labels: { color: 'white' }
            }
        },
        cutout: '70%',
        responsive: true,
        maintainAspectRatio: false
    };

    return (
        <div className="grid grid-2">
            <div className="card">
                <h3>Budget Overview</h3>
                <div style={{ height: '250px', position: 'relative' }}>
                    <Doughnut data={budgetData} options={options} />
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '0.9em', opacity: 0.8 }}>Total Budget</div>
                        <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>${project.totalBudget.toLocaleString()}</div>
                    </div>
                </div>
                <div className="flex justify-between" style={{ marginTop: '1rem', fontSize: '0.9em' }}>
                    <span>Allocated: ${totalAllocated.toLocaleString()}</span>
                    <span>Used: ${totalUsed.toLocaleString()}</span>
                </div>
            </div>

            <div className="card flex items-center justify-between">
                <div style={{ paddingRight: '20px' }}>
                    <h3>Project Status</h3>
                    <p style={{ marginBottom: '1rem', opacity: 0.8 }}>Completion based on tasks</p>
                    <div style={{ fontSize: '3em', fontWeight: 'bold', color: 'var(--success)' }}>
                        {completionPercentage}%
                    </div>
                    <p>{completedTasks} of {totalTasks} tasks done</p>
                </div>
                <div>
                    {/* Simple Visual for Completion */}
                    <div style={{
                        width: '120px', height: '120px', borderRadius: '50%',
                        background: `conic-gradient(var(--success) ${completionPercentage}%, rgba(255,255,255,0.1) 0)`
                    }} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
