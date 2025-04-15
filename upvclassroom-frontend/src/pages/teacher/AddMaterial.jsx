import React, { useState } from 'react';
import axios from 'axios';

const AddMaterial = ({ topicId }) => {
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('file', file);

        try {
            await axios.post(`/api/topics/${topicId}/materials`, formData);
            alert('Material agregado con éxito');
            setName('');
            setFile(null);
        } catch (error) {
            alert('Error al agregar material');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre del Material:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
                Archivo:
                <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
            </label>
            <button type="submit">Agregar Material</button>
        </form>
    );
};

export default AddMaterial;
