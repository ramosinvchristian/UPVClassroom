import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function AddStudent() {
  const { id } = useParams(); // ID de la clase desde la URL
  const [query, setQuery] = useState("");
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:8000/api/search-students?query=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(res.data);
    } catch (err) {
      setMessage("Error al buscar estudiantes.");
      setStudents([]);
    }
  };

  const handleAddStudent = async (studentId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:8000/api/classrooms/${id}/add-student`, {
        student_id: studentId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Alumno agregado correctamente.");
    } catch (err) {
      setMessage("Error al agregar alumno.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-center">Agregar Alumno a la Clase</h2>

      <form onSubmit={handleSearch} className="flex gap-2 justify-center mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre o matrícula"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 w-1/2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Buscar
        </button>
      </form>

      {message && <p className="text-center text-sm text-blue-700 mb-4">{message}</p>}

      <ul className="space-y-4">
        {students.map((student) => (
          <li key={student.id} className="bg-white shadow p-4 rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">{student.name}</p>
              <p className="text-sm text-gray-600">{student.email}</p>
            </div>
            <button
              onClick={() => handleAddStudent(student.id)}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Agregar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddStudent;
