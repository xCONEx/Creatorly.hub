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
  isModerator: boolean;
  isEditor: boolean;
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

  // Função para mapear dados do usuário
  const mapUserData = (supabaseUser: any): Author => ({
    id: supabaseUser.id,
    email: supabaseUser.email || '',
    name: supabaseUser.user_metadata?.name || '',
    avatar_url: supabaseUser.user_metadata?.avatar_url,
    bio: supabaseUser.user_metadata?.bio,
    role: supabaseUser.user_metadata?.role || 'admin',
  });

  // Função para verificar e carregar sessão existente
  const getSession = async () => {
    try {
      setLoading(true);
      
      // Primeiro, tentar obter a sessão atual
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        // Só logar erro se não for ausência de sessão
        if (sessionError.name !== 'AuthSessionMissingError') {
          console.error('Erro ao obter sessão:', sessionError);
        }
        setUser(null);
        setLoading(false);
        return;
      }

      if (session?.user) {
        const userData = mapUserData(session.user);
        setUser(userData);
        console.log('Sessão restaurada para:', userData.email);
      } else {
        // Não tentar buscar usuário se não há sessão
        setUser(null);
      }
    } catch (error) {
      // Só logar erro se não for ausência de sessão
      if (!(error && error.name === 'AuthSessionMissingError')) {
        console.error('Erro ao verificar sessão:', error);
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Verificar sessão ao montar o componente
    getSession();

    // Configurar listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Mudança de estado de auth:', event, session?.user?.email);
        
        if (event === 'SIGNED_IN' && session?.user) {
          const userData = mapUserData(session.user);
          setUser(userData);
          console.log('Usuário logado:', userData.email);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          console.log('Usuário deslogado');
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
          const userData = mapUserData(session.user);
          setUser(userData);
          console.log('Token renovado para:', userData.email);
        } else if (event === 'USER_UPDATED' && session?.user) {
          const userData = mapUserData(session.user);
          setUser(userData);
          console.log('Usuário atualizado:', userData.email);
        }
      }
    );

    // Cleanup do listener
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) {
        console.error('Erro no login:', error);
        setLoading(false);
        return false;
      }
      
      if (!data.user) {
        setLoading(false);
        return false;
      }

      const userData = mapUserData(data.user);
      setUser(userData);
      console.log('Login bem-sucedido para:', userData.email);
      
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Erro inesperado no login:', error);
      setLoading(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      console.log('Logout realizado com sucesso');
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  const isAdmin = user?.role === 'admin';
  const isModerator = user?.role === 'moderator';
  const isEditor = user?.role === 'editor';

  return {
    user,
    loading,
    login,
    logout,
    isAdmin,
    isModerator,
    isEditor
  };
};
