import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ClassDetail() {
  const { id } = useParams();
  const [classroom, setClassroom] = useState(null);
  const [students, setStudents] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState("");
  const [topics, setTopics] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [materials, setMaterials] = useState([]);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchClass();
    fetchTopics();
    fetchTasks();
    fetchMaterials();

  }, [id]);

  const fetchMaterials = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/classrooms/${id}/materials`, { headers });
      setMaterials(res.data);
    } catch (err) {
      console.error("Error al obtener materiales", err);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/classrooms/${id}/tasks`, { headers });
      setTasks(res.data);
    } catch (err) {
      console.error("Error al obtener tareas", err);
    }
  };

  const fetchTopics = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/classrooms/${id}/topics`, { headers });
      setTopics(res.data);
    } catch (err) {
      console.error("Error al obtener los temas", err);
    }
  };

  const fetchClass = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/classrooms/${id}`, { headers });
      setClassroom(res.data.classroom);
      setStudents(res.data.students);
      setNotices(res.data.notices || []);
    } catch (err) {
      console.error("Error al obtener los datos de la clase", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;

    try {
      const res = await axios.get(`http://localhost:8000/api/search-students?query=${searchQuery}`, { headers });
      setSearchResults(res.data);
    } catch (err) {
      console.error("Error al buscar alumnos", err);
    }
  };

  const handleAddStudent = async (studentId) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/classrooms/${id}/add-student`,
        { student_id: studentId },
        { headers }
      );
      setMessage(res.data.message);
      fetchClass(); // Recargar
      setSearchResults([]);
    } catch (err) {
      console.error("Error al agregar alumno", err);
      setMessage("No se pudo agregar el alumno.");
    }
  };

  const handleRemoveStudent = async (studentId) => {
    try {
      await axios.delete(`http://localhost:8000/api/classrooms/${id}/remove-student/${studentId}`, { headers });
      setMessage("Alumno eliminado correctamente.");
      setStudents(students.filter((s) => s.id !== studentId));
    } catch (err) {
      console.error("Error al eliminar alumno", err);
      setMessage("No se pudo eliminar el alumno.");
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando clase...</p>;
  if (!classroom) return <p className="text-center mt-10">Clase no encontrada.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-2">{classroom.name}</h2>
      <p className="text-center text-gray-600 mb-4">{classroom.description}</p>

      {/* Botones de maestro */}
      {user?.role === "teacher" && (
        <div className="text-center mb-6 space-y-4">
          {/* ➕ Agregar aviso */}
          <Link
            to={`/teacher/classes/${id}/add-notice`}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            ➕ Agregar Aviso
          </Link>

          {/* 📘 Nuevos botones para registrar contenido */}
          <div className="flex flex-col gap-2 mt-4 items-center">
            <Link
              to={`/teacher/classes/${id}/add-topic`}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              📘 Registrar un nuevo tema
            </Link>
            <Link
              to={`/teacher/classes/${id}/create-task`}
              className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition"
            >
              📝 Registrar una nueva tarea
            </Link>
            <Link
              to={`/teacher/classes/${id}/create-material`}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              📎 Registrar nuevo material de clase
            </Link>
          </div>
        </div>
      )}

      {/* Información de clase */}
      <div className="max-w-xl mx-auto bg-white rounded p-4 shadow mb-6">
        <p><strong>Código:</strong> {classroom.group_code}</p>
        <p><strong>Carrera:</strong> {classroom.career}</p>
        <p><strong>Cuatrimestre:</strong> {classroom.cuatrimestre}</p>
      </div>

      {/* 🔍 Buscar alumnos */}
      {user?.role === "teacher" && (
        <div className="max-w-xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Buscar alumno por nombre o correo"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border p-2 rounded"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 rounded">Buscar</button>
          </form>

          {searchResults.length > 0 && (
            <div className="bg-white p-4 rounded shadow">
              <h4 className="font-semibold mb-2">Resultados:</h4>
              {searchResults.map((student) => (
                <div key={student.id} className="flex justify-between items-center border-b py-2">
                  <span>{student.name} ({student.email})</span>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => handleAddStudent(student.id)}
                  >Agregar</button>
                </div>
              ))}
            </div>
          )}

          {message && <p className="text-center mt-4 text-blue-600">{message}</p>}
        </div>
      )}

      {/* 👨‍🎓 Lista de alumnos */}
      <div className="max-w-xl mx-auto bg-white p-4 rounded shadow mb-6">
        <h4 className="font-semibold mb-2">Alumnos registrados:</h4>
        {students.length === 0 ? (
          <p>No hay alumnos aún.</p>
        ) : (
          <ul className="space-y-2">
            {students.map((student) => (
              <li key={student.id} className="flex justify-between items-center">
                <span>{student.name} ({student.email})</span>
                {user?.role === "teacher" && (
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleRemoveStudent(student.id)}
                  >Eliminar</button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ✅ Tareas de la clase */}
<div className="max-w-xl mx-auto bg-white p-4 rounded shadow mb-6">
  <h4 className="font-semibold mb-2">Tareas asignadas:</h4>
  {tasks.length === 0 ? (
    <p>No hay tareas registradas aún.</p>
  ) : (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li key={task.id} className="border-b pb-2">
          <p><strong>{task.name}</strong></p>
          <p className="text-gray-600 text-sm">{task.description}</p>
          <p className="text-sm">📘 Tema: {task.topic?.name || 'Sin tema'}</p>
          <p className="text-xs text-gray-500">
            Fecha de entrega: {new Date(task.due_date).toLocaleDateString()}
          </p>
        </li>
      ))}
    </ul>
  )}
</div>

      {/* ✅ Tareas de la clase */}
      <div className="max-w-xl mx-auto bg-white p-4 rounded shadow mb-6">
        <h4 className="font-semibold mb-2">Tareas asignadas:</h4>
        {tasks.length === 0 ? (
          <p>No hay tareas registradas aún.</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li key={task.id} className="border-b pb-2">
                <p><strong>{task.title}</strong></p>
                <p className="text-gray-600 text-sm">{task.instructions}</p>
                <p className="text-sm">📘 Tema: {task.topic?.name || 'Sin tema'}</p>
                <p className="text-xs text-gray-500">
                  Fecha de entrega: {new Date(task.due_date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 📚 Materiales de clase */}
      <div className="max-w-xl mx-auto bg-white p-4 rounded shadow mb-6">
        <h4 className="font-semibold mb-2">Materiales compartidos:</h4>
        {materials.length === 0 ? (
          <p>No hay materiales registrados aún.</p>
        ) : (
          <ul className="space-y-4">
            {materials.map((material) => (
              <li key={material.id} className="border-b pb-2">
                <p><strong>{material.title}</strong></p>
                {material.description && <p className="text-gray-600 text-sm">{material.description}</p>}
                <p className="text-sm text-gray-500">📘 Tema: {material.topic?.title}</p>
                {material.file_path && (
                  <a
                    href={`http://localhost:8000/storage/${material.file_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm"
                  >
                    📎 Ver archivo adjunto
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>


      {/* 📢 Avisos */}
      <div className="max-w-xl mx-auto bg-white p-4 rounded shadow">
        <h4 className="font-semibold mb-2">Avisos:</h4>
        {notices.length === 0 ? (
          <p>No hay avisos publicados aún.</p>
        ) : (
          <ul className="space-y-4">
            {notices.map((notice) => (
              <li key={notice.id} className="border-b pb-2">
                <p className="text-gray-800">{notice.content}</p>
                {notice.attachment && (
                  <a
                    href={`http://localhost:8000/storage/${notice.attachment}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm"
                  >
                    Ver archivo adjunto
                  </a>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Publicado el {new Date(notice.created_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ClassDetail;
