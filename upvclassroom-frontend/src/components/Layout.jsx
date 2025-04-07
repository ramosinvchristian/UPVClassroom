import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 px-6 pt-20 bg-white">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; // ← Debe terminar con esto