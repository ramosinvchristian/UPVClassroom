import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

const PeopleClassView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isPeopleView = location.pathname.includes('people');
  
  const [students, setStudents] = useState([
    { 
      id: 1, 
      name: "Ana García",
      photo: "https://randomuser.me/api/portraits/women/44.jpg" 
    },
    { 
      id: 2, 
      name: "Carlos Martínez",
      photo: "https://randomuser.me/api/portraits/men/22.jpg" 
    },
    { 
      id: 3, 
      name: "María López",
      photo: "https://randomuser.me/api/portraits/women/33.jpg" 
    }
  ]);
  
  const [newStudent, setNewStudent] = useState("");
  const [searchMethod, setSearchMethod] = useState("matricula");
  const teacher = {
    name: "Luis Roberto Flores",
    photo: "https://randomuser.me/api/portraits/men/32.jpg"
  };

  const addStudent = () => {
    if (newStudent.trim() !== "") {
      const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
      const defaultPhoto = `https://i.pravatar.cc/150?img=${newId}`;
      
      setStudents([...students, { 
        id: newId, 
        name: newStudent,
        photo: defaultPhoto
      }]);
      setNewStudent("");
    }
  };

  return (
    <Layout>
      {/* Pestañas - VERSIÓN CORREGIDA */}
      <div className="pl-[230px]">
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto flex space-x-8">
            <Link 
              to="/teacher/class" 
              className={`py-4 px-1 border-b-2 font-medium ${
                !isPeopleView && location.pathname.includes('class')
                  ? 'border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Muro
            </Link>
            
            <button
              onClick={() => navigate("/teacher/classwork")}
              className={`py-4 px-1 border-b-2 font-medium ${
                location.pathname.includes('classwork')
                  ? 'border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Trabajo en Clase
            </button>
            
            <Link 
              to="/teacher/people" 
              className={`py-4 px-1 border-b-2 font-medium ${
                isPeopleView
                  ? 'border-blue-500 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Personas
            </Link>
          </div>
        </div>
      
        {isPeopleView && (
          <div className="min-h-screen bg-white p-6 max-w-6xl mx-auto">
            {/* Sección del Profesor */}
            <div className="mb-8 flex items-center">
              <img 
                src={teacher.photo} 
                alt={teacher.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-medium">Profesor</h2>
                <p className="text-gray-700">{teacher.name}</p>
              </div>
            </div>

            {/* Sección para registrar alumnos */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-medium mb-4">Registrar Alumnos</h2>
              
              <div className="flex items-center mb-4">
                <label className="mr-4">
                  <input
                    type="radio"
                    checked={searchMethod === "matricula"}
                    onChange={() => setSearchMethod("matricula")}
                    className="mr-2"
                  />
                  Por matrícula
                </label>
                <label>
                  <input
                    type="radio"
                    checked={searchMethod === "nombre"}
                    onChange={() => setSearchMethod("nombre")}
                    className="mr-2"
                  />
                  Por nombre
                </label>
              </div>

              <div className="flex">
                <input
                  type="text"
                  value={newStudent}
                  onChange={(e) => setNewStudent(e.target.value)}
                  placeholder={searchMethod === "matricula" ? "Ingrese matrícula" : "Buscar por nombre"}
                  className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  onClick={addStudent}
                  className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
                >
                  Agregar
                </button>
              </div>
            </div>

            {/* Lista de Alumnos */}
            <div>
              <h2 className="text-xl font-medium mb-4">Alumnos ({students.length})</h2>
              <ul className="space-y-3">
                {students.map(student => (
                  <li key={student.id} className="flex items-center py-2 border-b">
                    <img 
                      src={student.photo} 
                      alt={student.name}
                      className="w-10 h-10 rounded-full mr-4"
                    />
                    <span>{student.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PeopleClassView;