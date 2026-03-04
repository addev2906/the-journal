import React, { useRef, useState } from 'react'
import './UploadArea.css'

function UploadArea({ onFileImport }) {
    const inputRef = useRef(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFileSelect = (file) => {
        if (file && file.name.endsWith('.sav')) {
            onFileImport(file);
        } else {
            alert('Please upload a .sav file');
        }
    };

    const handleChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    return (
        <div
            className={`upload-area ${dragActive ? 'drag-active' : ''}`}
            onClick={() => inputRef.current?.click()}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            style={{ marginBottom: "29px" }}
        >
            <div className="upload-content">
                <h2>Upload Your Save File</h2>
                <p>Drag and drop your .sav file here or click to browse</p>
                <p className="file-hint">Supported format: .sav</p>
            </div>
            <input
                ref={inputRef}
                type="file"
                accept=".sav"
                onChange={handleChange}
                style={{ display: 'none' }}
            />
        </div>
    );
}

export default UploadArea