import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api";

const Ctx = createContext();
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/auth/me")
      .then((r) => setUser(r.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async ({ username, password }) => {
    await api.post("/auth/login", { username, password });
    const r = await api.get("/auth/me");
    setUser(r.data.user);
  };

  const register = async ({ username, password }) => {
    await api.post("/auth/register", { username, password });
    await login({ username, password });
  };

  const logout = async () => {
    await api.post("/auth/logout").catch(() => {});
    setUser(null);
  };

  return (
    <Ctx.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </Ctx.Provider>
  );
}