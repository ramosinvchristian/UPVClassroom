import React, { useState } from 'react';
import axios from 'axios';

const AddTask = ({ topicId }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/topics/${topicId}/tasks`, { name, description, due_date: dueDate });
            alert('Tarea agregada con éxito');
            setName('');
            setDescription('');
            setDueDate('');
        } catch (error) {
            alert('Error al agregar tarea');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre de la Tarea:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
                Descripción:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </label>
            <label>
                Fecha de Entrega:
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
            </label>
            <button type="submit">Agregar Tarea</button>
        </form>
    );
};

export default AddTask;
