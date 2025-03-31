import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function AddNotice() {
  const { id } = useParams(); // ID de la clase
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setMessage("⚠️ El título y el contenido son obligatorios.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);         // ✅ SE AGREGA EL TÍTULO
    formData.append("content", content);
    if (file) {
      formData.append("attachment", file);
    }

    try {
      await axios.post(`http://localhost:8000/api/classrooms/${id}/notices`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate(`/teacher/classes/${id}`);
    } catch (error) {
      console.error("Error al agregar el aviso", error.response?.data || error);
      const msg = error.response?.data?.message || "❌ No se pudo agregar el aviso.";
      setMessage(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
        encType="multipart/form-data"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Agregar Aviso</h2>

        {message && <p className="text-center mb-4 text-red-600">{message}</p>}

        <input
          type="text"
          placeholder="Título del aviso"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 mb-4"
          required
        />

        <textarea
          name="content"
          placeholder="Escribe el contenido del aviso..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 mb-4"
          rows={4}
          required
        />

        <input
          type="file"
          accept=".pdf,image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border p-2 mb-4"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Publicar Aviso
        </button>
      </form>
    </div>
  );
}

export default AddNotice;
