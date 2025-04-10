import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const AddTopic = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/classrooms/${id}/topics`, {
        title,
        description,
      });
      alert("Tema registrado correctamente");
      navigate(`/teacher/classes/${id}`);
    } catch (error) {
      alert("Error al registrar tema");
    }
  };

  return (
    <div className="container p-4">
      <h2>Registrar Nuevo Tema</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Título</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Descripción (opcional)</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default AddTopic;
