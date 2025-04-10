import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AddMaterial = () => {
  const { id } = useParams(); // id = id de la clase
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    topic_id: "",
    file: null,
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
      console.error("Error al obtener temas", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setForm({ ...form, file: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.topic_id) return alert("Selecciona un tema.");

    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    if (form.file) data.append("file", form.file);

    try {
      await axios.post(
        `http://localhost:8000/api/topics/${form.topic_id}/materials`,
        data,
        {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Material registrado correctamente");
      navigate(`/teacher/classes/${id}`);
    } catch (err) {
      console.error("Error al registrar material", err);
      alert("No se pudo registrar el material");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-xl font-semibold mb-4">Registrar nuevo material</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Tema</label>
          <select name="topic_id" value={form.topic_id} onChange={handleChange} className="w-full border p-2 rounded" required>
            <option value="">Selecciona un tema</option>
            <option value="Abc">Ponis</option>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>{topic.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Título</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label>Descripción (opcional)</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label>Archivo (opcional)</label>
          <input type="file" name="file" onChange={handleChange} className="w-full" />
        </div>
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Registrar</button>
      </form>
    </div>
  );
};

export default AddMaterial;
