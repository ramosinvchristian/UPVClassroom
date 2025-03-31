import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import CreateClass from "./pages/teacher/CreateClass";
import TeacherClasses from "./pages/teacher/TeacherClasses"; // ✅ Importamos el nuevo componente
import AddStudent from "./pages/teacher/AddStudent"; // importa el componente
import ClassDetail from "./pages/teacher/ClassDetail"; // ✅ Importado
import AddNotice from "./pages/teacher/AddNotice"; // 👈 Asegúrate de importar
import StudentHome from "./pages/student/StudentHome";
import StudentClassDetail from "./pages/student/StudentClassDetail";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/teacher/classes" element={<TeacherClasses />} /> {/* ✅ Ruta real */}
        <Route path="/teacher/create-class" element={<CreateClass />} />
        <Route path="/teacher/class/:id/add-student" element={<AddStudent />} />
        <Route path="/teacher/class/:id" element={<ClassDetail />} />
        <Route path="/teacher/classes/:id" element={<ClassDetail />} /> {/* ✅ Nueva ruta */}
        <Route path="/teacher/classes/:id/add-notice" element={<AddNotice />} /> // 👈 Agrega esta ruta si aún no la tienes
        <Route path="/student/home" element={<StudentHome />} />
        <Route path="/student/classes" element={<StudentHome />} />
        <Route path="/student/classes/:id" element={<StudentClassDetail />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
