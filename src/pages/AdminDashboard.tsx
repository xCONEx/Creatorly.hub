import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { 
  BarChart3, 
  FileText, 
  Users, 
  Eye, 
  ThumbsUp, 
  TrendingUp,
  Plus,
  Settings,
  LogOut,
  Calendar,
  Target
} from 'lucide-react';
import RequireAdmin from '@/components/RequireAdmin';
import { supabase } from '@/lib/supabaseClient';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

interface DashboardStats {
  totalPosts: number;
  totalViews: number;
  totalLikes: number;
  subscribers: number;
  recentPosts: Array<{
    id: string;
    title: string;
    views: number;
    status: string;
    created_at: string;
  }>;
  weeklyViews: Array<{
    date: string;
    views: number;
  }>;
}

const AdminDashboard = () => {
  const [inviteCodes, setInviteCodes] = useState<any[]>([]);
  const [inviteRole, setInviteRole] = useState<'admin'|'editor'|'moderator'>('admin');
  const [generating, setGenerating] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Removido verificação de usuário - RequireAdmin já faz isso

  // Carregar códigos de convite se for admin master
  useEffect(() => {
    if (user?.email === 'creatorlyhub@gmail.com') {
      supabase
        .from('invitation_codes')
        .select('*')
        .order('created_at', { ascending: false })
        .then(({ data }) => setInviteCodes(data || []));
    }
  }, [user]);

  // Buscar dados reais do dashboard
  useEffect(() => {
    if (!user) return; // Só busca se o usuário estiver carregado
    async function fetchStats() {
      setLoading(true);
      setStats(null);
      let errorMsg = '';
      try {
        // Buscar posts publicados
        let posts: any[] = [];
        try {
          const { data: publishedPosts, error: postsError } = await supabase
            .from('posts')
            .select('id, title, views, likes, status, created_at, published_at')
            .eq('status', 'published')
            .order('published_at', { ascending: false });
          
          if (postsError) {
            console.error('Erro ao buscar posts publicados:', postsError);
            // Se não conseguir buscar posts publicados, tenta buscar todos os posts
            const { data: allPosts, error: allPostsError } = await supabase
              .from('posts')
              .select('id, title, views, likes, status, created_at, published_at')
              .order('created_at', { ascending: false });
            
            if (allPostsError) {
              errorMsg = 'Erro ao buscar posts: ' + allPostsError.message;
              throw allPostsError;
            }
            posts = allPosts || [];
          } else {
            posts = publishedPosts || [];
          }
        } catch (error) {
          console.error('Erro na consulta de posts:', error);
          posts = []; // Fallback para array vazio
        }
        // Total de posts publicados
        const totalPosts = posts.length;
        // Total de visualizações
        const totalViews = posts.reduce((acc, p) => acc + (p.views || 0), 0);
        // Total de curtidas
        const totalLikes = posts.reduce((acc, p) => acc + (p.likes || 0), 0);
        // Posts recentes (3 mais recentes)
        const recentPosts = posts.slice(0, 3).map((p: any) => ({
          id: p.id,
          title: p.title,
          views: p.views,
          status: p.status,
          created_at: p.published_at || p.created_at
        }));
        // Visualizações da semana: últimos 7 posts publicados
        const weeklyViews = posts.slice(0, 7).map((p: any) => ({
          date: p.published_at || p.created_at,
          views: p.views
        }));
        // Buscar inscritos
        const { count: subscribers, error: subError } = await supabase
          .from('newsletter_subscribers')
          .select('id', { count: 'exact', head: true });
        if (subError) {
          errorMsg = 'Erro ao buscar inscritos: ' + subError.message;
          throw subError;
        }
        setStats({
          totalPosts,
          totalViews,
          totalLikes,
          subscribers: subscribers || 0,
          recentPosts,
          weeklyViews
        });
      } catch (err) {
        setStats(null);
        toast({ title: 'Erro', description: errorMsg || 'Erro ao carregar dashboard', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [user]);

  const handleGenerateCode = async () => {
    setGenerating(true);
    try {
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();
      const { error } = await supabase.from('invitation_codes').insert({
        code,
        role: inviteRole,
        created_by: null // Removendo a referência ao user.id por enquanto
      });
      
      if (error) {
        console.error('Erro ao gerar código:', error);
        if (error.code === '23505') { // Unique constraint violation
          toast({ 
            title: 'Erro', 
            description: 'Código já existe. Tente novamente.', 
            variant: 'destructive' 
          });
        } else if (error.code === '23503') { // Foreign key constraint violation
          toast({ 
            title: 'Erro', 
            description: 'Usuário não encontrado na tabela de autores. Entre em contato com o administrador.', 
            variant: 'destructive' 
          });
        } else {
          toast({ 
            title: 'Erro', 
            description: `Erro ao gerar código: ${error.message}`, 
            variant: 'destructive' 
          });
        }
      } else {
        toast({ 
          title: 'Código gerado com sucesso!', 
          description: `Código: ${code}` 
        });
        
        // Atualizar lista
        const { data } = await supabase
          .from('invitation_codes')
          .select('*')
          .order('created_at', { ascending: false });
        setInviteCodes(data || []);
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast({ 
        title: 'Erro inesperado', 
        description: 'Tente novamente mais tarde.', 
        variant: 'destructive' 
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Removido verificação de usuário - RequireAdmin já faz isso

  return (
    <div className="min-h-screen bg-gradient-hero">
        {/* Header */}
        <header className="border-b border-border bg-background/95 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Link to="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">C</span>
                  </div>
                  <span className="text-xl font-bold text-foreground">Creatorly Admin</span>
                </Link>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  Olá, {user.name}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="hover:bg-destructive hover:text-destructive-foreground"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link to="/admin/posts/new">
              <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                <Plus className="h-4 w-4 mr-2" />
                Novo Post
              </Button>
            </Link>
            <Link to="/admin/posts">
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Gerenciar Posts
              </Button>
            </Link>
            <Link to="/admin/categories">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Categorias
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-card shadow-card border-primary/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Posts</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stats?.totalPosts || 'Carregando...'}</div>
                <p className="text-xs text-muted-foreground">
                  +2 desde o mês passado
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card border-primary/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stats?.totalViews.toLocaleString() || 'Carregando...'}</div>
                <p className="text-xs text-muted-foreground">
                  +12% desde a semana passada
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card border-primary/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Curtidas</CardTitle>
                <ThumbsUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stats?.totalLikes || 'Carregando...'}</div>
                <p className="text-xs text-muted-foreground">
                  +8% desde a semana passada
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card shadow-card border-primary/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Inscritos</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stats?.subscribers || 'Carregando...'}</div>
                <p className="text-xs text-muted-foreground">
                  +5% desde a semana passada
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Interface de geração de códigos de convite para admin master */}
          {user?.email === 'creatorlyhub@gmail.com' && (
            <div className="mb-8 p-4 border rounded-lg bg-background/80">
              <h2 className="font-bold mb-2">Gerar Código de Convite</h2>
              <div className="flex items-center gap-2 mb-2">
                <label className="text-sm">Tipo:</label>
                <select value={inviteRole} onChange={e => setInviteRole(e.target.value as any)} className="border rounded px-2 py-1">
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="moderator">Moderador</option>
                </select>
                <Button onClick={handleGenerateCode} disabled={generating} className="bg-gradient-primary">
                  {generating ? 'Gerando...' : 'Gerar Código'}
                </Button>
              </div>
              <div className="text-xs text-muted-foreground mb-2">Compartilhe o código apenas com pessoas autorizadas.</div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs border">
                  <thead>
                    <tr className="bg-muted">
                      <th className="px-2 py-1 border">Código</th>
                      <th className="px-2 py-1 border">Tipo</th>
                      <th className="px-2 py-1 border">Usado?</th>
                      <th className="px-2 py-1 border">Criado em</th>
                      <th className="px-2 py-1 border">Usado por</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inviteCodes.map(code => (
                      <tr key={code.code}>
                        <td className="px-2 py-1 border font-mono">{code.code}</td>
                        <td className="px-2 py-1 border">{code.role}</td>
                        <td className="px-2 py-1 border">{code.used ? 'Sim' : 'Não'}</td>
                        <td className="px-2 py-1 border">{new Date(code.created_at).toLocaleString('pt-BR')}</td>
                        <td className="px-2 py-1 border">{code.used_by || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Exibir erro na tela se stats for null e não estiver carregando */}
          {!loading && !stats && (
            <div className="text-destructive text-center my-8">
              Erro ao carregar dados do dashboard. Verifique sua conexão ou permissões.
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Posts */}
            <Card className="bg-gradient-card shadow-elegant border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Posts Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats?.recentPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground line-clamp-1">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {post.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(post.created_at).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Eye className="h-3 w-3" />
                          {post.views}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Views Chart */}
            <Card className="bg-gradient-card shadow-elegant border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Visualizações da Semana
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats?.weeklyViews.map((day) => (
                    <div key={day.date} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {new Date(day.date).toLocaleDateString('pt-BR', { 
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short'
                        })}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-background/50 rounded-full h-2">
                          <div 
                            className="bg-gradient-primary h-2 rounded-full"
                            style={{ width: `${(day.views / 600) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-foreground w-12 text-right">
                          {day.views}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  );
};

export default AdminDashboard;
