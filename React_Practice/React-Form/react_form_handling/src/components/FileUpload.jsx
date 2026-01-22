import React, { useState } from "react";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile)); // 🔥 Create preview URL
    };

    return (
        <div className="container mt-4 p-4 border rounded shadow">
            <h3>File Upload Example</h3>

            <input
                type="file"
                className="form-control mt-2"
                onChange={handleFileChange}
                accept="image/*"  // optional: restrict to images
            />

            {/* Image Preview */}
            {preview && (
                <img
                    src={preview}
                    alt="Preview"
                    className="img-fluid mt-3 rounded border"
                    width="200"
                />
            )}

            {/* File Name */}
            {file && (
                <p className="mt-3">
                    Selected File: <strong>{file.name}</strong>
                </p>
            )}
        </div>
    );
};

export default FileUpload;
