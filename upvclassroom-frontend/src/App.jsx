import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import CreateClass from "./pages/teacher/CreateClass";
import TeacherClasses from "./pages/teacher/TeacherClasses"; // ✅ Importamos el nuevo componente

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/teacher/classes" element={<TeacherClasses />} /> {/* ✅ Ruta real */}
        <Route path="/student/classes" element={<h1>Clases del Alumno</h1>} />
        <Route path="/teacher/create-class" element={<CreateClass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
