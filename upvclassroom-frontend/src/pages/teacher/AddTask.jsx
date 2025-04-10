import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AddTask = () => {
  const { id } = useParams(); // id de la clase
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    due_date: "",
    topic_id: "",
  });

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/classrooms/${id}/topics`, { headers });
      setTopics(res.data);
    } catch (err) {
      console.error("Error al obtener los temas", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8000/api/classrooms/${id}/tasks`, form, { headers });
      alert("Tarea registrada correctamente");
      navigate(`/teacher/classes/${id}`);
    } catch (err) {
      console.error("Error al registrar tarea", err);
      alert("No se pudo registrar la tarea");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">Registrar nueva tarea</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Tema</label>
          <select
            name="topic_id"
            value={form.topic_id}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Selecciona un tema</option>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Título</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label>Instrucciones</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label>Fecha de entrega</label>
          <input
            type="date"
            name="due_date"
            value={form.due_date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default AddTask;
