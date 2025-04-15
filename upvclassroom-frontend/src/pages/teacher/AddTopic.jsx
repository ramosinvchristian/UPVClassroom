import React, { useState } from 'react';
import axios from 'axios';

const AddTopic = ({ classroomId }) => {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/classrooms/${classroomId}/topics`, { name });
            alert('Tema agregado con éxito');
            setName('');
        } catch (error) {
            alert('Error al agregar tema');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre del Tema:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <button type="submit">Agregar Tema</button>
        </form>
    );
};

export default AddTopic;
