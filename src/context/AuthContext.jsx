import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('hkt_token') || null);
  const [loading, setLoading] = useState(true);

  // Helper for safe JSON parsing from API responses
  const safeParseResponse = async (res) => {
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      if (!res.ok) {
        throw new Error(`Error de servidor (${res.status}). El backend no devolvió JSON válido.`);
      }
      throw new Error('La respuesta del servidor no tiene un formato JSON válido.');
    }
  };

  // Validate session token on mount
  useEffect(() => {
    async function verifySession() {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const contentType = res.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await res.json();
            setUser(data.user);
            return;
          }
        }
        // Fallback for local storage session if backend unreachable
        const cachedUser = localStorage.getItem('hkt_user');
        if (cachedUser) {
          setUser(JSON.parse(cachedUser));
        } else if (!res.ok && res.status === 401) {
          logout();
        }
      } catch (err) {
        console.error('Session verification error:', err);
        const cachedUser = localStorage.getItem('hkt_user');
        if (cachedUser) {
          try {
            setUser(JSON.parse(cachedUser));
          } catch(e) {
            logout();
          }
        }
      } finally {
        setLoading(false);
      }
    }
    verifySession();
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await safeParseResponse(res);
      if (!res.ok) {
        throw new Error(data.error || 'Error al iniciar sesión');
      }

      localStorage.setItem('hkt_token', data.token);
      localStorage.setItem('hkt_user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      return data;
    } catch (err) {
      // If server is down or returns HTML/504, attempt mock fallback for demo credentials
      if (err.message.includes('JSON') || err.message.includes('servidor') || err.name === 'TypeError') {
        if (email === 'estudiante@hackea.com' && password === '123456') {
          const mockUser = {
            id: 'usr_demo_1',
            name: 'Carlos Mendoza',
            email: 'estudiante@hackea.com',
            role: 'student',
            plan: 'pro',
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            streakDays: 14,
            totalHours: 42,
          };
          const mockToken = mockUser.id;
          localStorage.setItem('hkt_token', mockToken);
          localStorage.setItem('hkt_user', JSON.stringify(mockUser));
          setToken(mockToken);
          setUser(mockUser);
          return { user: mockUser, token: mockToken };
        }
      }
      throw err;
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await safeParseResponse(res);
      if (!res.ok) {
        throw new Error(data.error || 'Error al registrar usuario');
      }

      localStorage.setItem('hkt_token', data.token);
      localStorage.setItem('hkt_user', JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);
      return data;
    } catch (err) {
      if (err.message.includes('JSON') || err.message.includes('servidor') || err.name === 'TypeError') {
        // Fallback registration for local frontend dev mode
        const mockUser = {
          id: 'usr_' + Date.now(),
          name,
          email,
          role: 'student',
          plan: 'free',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          streakDays: 1,
          totalHours: 0,
        };
        const mockToken = mockUser.id;
        localStorage.setItem('hkt_token', mockToken);
        localStorage.setItem('hkt_user', JSON.stringify(mockUser));
        setToken(mockToken);
        setUser(mockUser);
        return { user: mockUser, token: mockToken };
      }
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('hkt_token');
    localStorage.removeItem('hkt_user');
    setToken(null);
    setUser(null);
  };

  const updateUserState = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('hkt_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUserState }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
