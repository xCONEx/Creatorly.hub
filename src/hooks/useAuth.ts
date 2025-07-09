import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/lib/supabaseClient';

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
    const getSession = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || '',
          name: data.user.user_metadata?.name || '',
          avatar_url: data.user.user_metadata?.avatar_url,
          bio: data.user.user_metadata?.bio,
          role: data.user.user_metadata?.role || 'admin',
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    };
    getSession();
    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      getSession();
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) {
      setLoading(false);
      return false;
    }
    setUser({
      id: data.user.id,
      email: data.user.email || '',
      name: data.user.user_metadata?.name || '',
      avatar_url: data.user.user_metadata?.avatar_url,
      bio: data.user.user_metadata?.bio,
      role: data.user.user_metadata?.role || 'admin',
    });
    setLoading(false);
    return true;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
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
