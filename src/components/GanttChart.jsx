import React from 'react';
import { Gantt, ViewMode } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import { useProject } from '../context/ProjectContext';

const GanttChart = () => {
    const { tasks, areas } = useProject();

    if (tasks.length === 0) {
        return (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                <p>No tasks added yet. Add tasks to see the Gantt Chart.</p>
            </div>
        );
    }

    // Transform Tasks for Gantt
    const ganttTasks = tasks.map(t => ({
        start: new Date(t.startDate || new Date()),
        end: new Date(t.endDate || new Date()),
        name: t.name,
        id: t.id,
        type: 'task',
        progress: t.isCompleted ? 100 : 0,
        isDisabled: true,
        styles: { progressColor: '#10b981', progressSelectedColor: '#059669' },
        project: t.areaId // Grouping by Area implicitly visually? or just use Area name in label?
    }));

    // Sort by start date
    ganttTasks.sort((a, b) => a.start - b.start);

    return (
        <div className="card" style={{ overflowX: 'auto', backgroundColor: 'var(--card-bg)', borderRadius: '8px', width: '100%', border: 'var(--glass-border)' }}>
            <Gantt
                tasks={ganttTasks}
                viewMode={ViewMode.Week}
                listCellWidth="155px"
                columnWidth={65}
                barBackgroundColor="rgba(255, 255, 255, 0.05)"
                barBackgroundSelectedColor="rgba(255, 255, 255, 0.1)"
                arrowColor="rgba(255, 255, 255, 0.5)"
                fontFamily="Inter, sans-serif"
                fontSize="12px"
                rowHeight={45}
                headerHeight={55}
                colors={{
                    barProgressColor: '#10b981',
                    barProgressSelectedColor: '#059669',
                    barBackgroundColor: 'rgba(255, 255, 255, 0.05)',
                    barBackgroundSelectedColor: 'rgba(255, 255, 255, 0.1)',
                    textPrimary: '#f8fafc',
                    textSecondary: '#94a3b8',
                }}
                todayColor="rgba(99, 102, 241, 0.15)"
            />
            <style>{`
                .gantt-container { border: none !important; }
                .main-header-container { background: rgba(0,0,0,0.2) !important; border-bottom: 1px solid rgba(255,255,255,0.1) !important; }
                .grid-header { fill: transparent !important; stroke: none !important; }
                
                /* Text Coloring */
                .bar-label, .gantt-text { fill: #f8fafc !important; font-weight: 500; }
                .calendar-header text { fill: #cbd5e1 !important; }
                
                /* Grid Lines */
                .grid-row, .grid-row-line { fill: transparent !important; stroke: rgba(255,255,255,0.05) !important; }
                .grid-tick { stroke: rgba(255,255,255,0.05) !important; }
                
                /* Selection/Hover Overrides */
                .gantt-container .bar-wrapper.selected .bar-background { opacity: 0.5; }
            `}</style>
        </div>
    );
};

export default GanttChart;
