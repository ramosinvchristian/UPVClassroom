import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import CreateClass from "./pages/teacher/CreateClass"; // ✅ Importación agregada

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Rutas privadas futuras */}
        <Route path="/teacher/classes" element={<h1>Clases del Maestro</h1>} />
        <Route path="/student/classes" element={<h1>Clases del Alumno</h1>} />
        <Route path="/teacher/create-class" element={<CreateClass />} /> {/* ✅ Nueva ruta */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
