import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import CreateClass from "./pages/teacher/CreateClass";
import TeacherClasses from "./pages/teacher/TeacherClasses"; // ✅ Importamos el nuevo componente
import AddStudent from "./pages/teacher/AddStudent"; // importa el componente
import ClassDetail from "./pages/teacher/ClassDetail"; // ✅ Importado
import AddNotice from "./pages/teacher/AddNotice"; // 👈 Asegúrate de importar
import StudentHome from "./pages/student/StudentHome";
import StudentClassDetail from "./pages/student/StudentClassDetail";



import CreateClassView from "./pages/teacher/CreateClassView"; // ✅ Importación agregada
import TeacherClassView from "./pages/teacher/TeacherClassView";
import PeopleClassView from "./pages/teacher/PeopleClassView";
import ClassWorkView from "./pages/teacher/ClassworkView";
import CreateThemeView from "./pages/teacher/CreateThemeView";
import CreateHomeworkView from "./pages/teacher/CreateHomeworkView";
import CreateMaterialView from "./pages/teacher/CreateMaterialView";
import HomeView from "./pages/teacher/HomeView";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Vista Login */}
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


        {/* Rutas privadas futuras */}
        <Route path="/teacher/classes" element={<h1>Clases del Maestro</h1>} />
        <Route path="/student/classes" element={<h1>Clases del Alumno</h1>} />
    
        {/* Vistas Maestros */}
        <Route path="/teacher/home" element={<HomeView />} />
        <Route path="/teacher/create-class" element={<CreateClassView />} /> 
        <Route path="/teacher/class" element={<TeacherClassView />} />
        <Route path="/teacher/people" element={<PeopleClassView />} />
        <Route path="/teacher/create-theme" element={<CreateThemeView />} />
        <Route path="/teacher/create-homework" element={<CreateHomeworkView />} />
        <Route path="/teacher/create-material" element={<CreateMaterialView />} />
        <Route path="/teacher/classwork" element={<ClassWorkView />} />
        
        {/* <Route path="/teacher/home" element={<ClassroomHome />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;

