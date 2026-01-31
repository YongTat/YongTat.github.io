import React, { useRef } from 'react';
import { useProject } from '../context/ProjectContext';

const Controls = () => {
    const { resetAll, getExportData, importData } = useProject();
    const fileInputRef = useRef(null);

    const handleExport = () => {
        const data = getExportData();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'hdb-reno-plan.json';
        a.click();
    };

    const handleImportClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const success = importData(event.target.result);
                if (success) alert('Project loaded successfully!');
                else alert('Failed to load project.');
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="flex">
            <button className="secondary" onClick={handleExport}>Export JSON</button>
            <button className="secondary" onClick={handleImportClick}>Import JSON</button>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".json"
                onChange={handleFileChange}
            />
            <button className="danger" onClick={() => {
                if (confirm('Are you sure you want to clear all data?')) resetAll();
            }}>Clear All</button>
        </div>
    );
};

export default Controls;
