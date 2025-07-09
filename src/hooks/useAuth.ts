import { useState, useEffect, createContext, useContext } from 'react';

interface Author {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  bio?: string;
  role: string;
}

interface AuthContextType {
  user: Author | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthProvider = () => {
  const [user, setUser] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('creatorly_admin');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Mock login - replace with Supabase auth
    if (email === 'admin@creatorly.com.br' && password === 'creatorly2024') {
      const mockUser: Author = {
        id: '1',
        email: 'admin@creatorly.com.br',
        name: 'Creatorly Team',
        bio: 'Equipe oficial do Creatorly',
        role: 'admin'
      };
      
      setUser(mockUser);
      localStorage.setItem('creatorly_admin', JSON.stringify(mockUser));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('creatorly_admin');
  };

  const isAdmin = user?.role === 'admin';

  return {
    user,
    loading,
    login,
    logout,
    isAdmin
  };
};