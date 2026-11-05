import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";

function Guard({ children, guest }) {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div className="grid h-screen place-items-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-fuchsia-500 border-t-transparent" />
      </div>
    );
  if (guest) return user ? <Navigate to="/" replace /> : children;
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Guard guest><Login /></Guard>} />
          <Route path="/register" element={<Guard guest><Register /></Guard>} />
          <Route path="/" element={<Guard><Feed /></Guard>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}