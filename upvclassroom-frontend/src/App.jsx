import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import CreateClass from "./pages/teacher/CreateClass";
import TeacherClasses from "./pages/teacher/TeacherClasses"; // ✅ Importamos el nuevo componente
import AddStudent from "./pages/teacher/AddStudent"; // importa el componente
import ClassDetail from "./pages/teacher/ClassDetail"; // ✅ Importado
import AddNotice from "./pages/teacher/AddNotice"; // 👈 Asegúrate de importar
import AddTopic from "./pages/teacher/AddTopic";
import StudentHome from "./pages/student/StudentHome";
import StudentClassDetail from "./pages/student/StudentClassDetail";
import AddTask from "./pages/teacher/AddTask";
import AddMaterial from "./pages/teacher/AddMaterial";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/teacher/classes" element={<TeacherClasses />} />
        <Route path="/teacher/create-class" element={<CreateClass />} />
        <Route path="/teacher/class/:id/add-student" element={<AddStudent />} />
        <Route path="/teacher/class/:id" element={<ClassDetail />} />
        <Route path="/teacher/classes/:id" element={<ClassDetail />} />
        <Route path="/teacher/classes/:id/add-notice" element={<AddNotice />} />
        <Route path="/teacher/classes/:id/add-topic" element={<AddTopic />} />
        <Route path="/student/home" element={<StudentHome />} />
        <Route path="/student/classes" element={<StudentHome />} />
        <Route path="/student/classes/:id" element={<StudentClassDetail />} />
        <Route path="/teacher/classes/:id/create-task" element={<AddTask />} />
        <Route path="/teacher/classes/:id/create-material" element={<AddMaterial />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
