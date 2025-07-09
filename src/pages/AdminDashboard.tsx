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
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 12,
    totalViews: 15420,
    totalLikes: 892,
    subscribers: 1247,
    recentPosts: [
      {
        id: '1',
        title: 'Como precificar seus serviços audiovisuais em 2024',
        views: 2451,
        status: 'published',
        created_at: '2024-01-15'
      },
      {
        id: '2',
        title: 'Organizando as finanças como produtor audiovisual',
        views: 1876,
        status: 'published',
        created_at: '2024-01-10'
      },
      {
        id: '3',
        title: 'Principais trends de vídeo marketing para 2024',
        views: 3104,
        status: 'published',
        created_at: '2024-01-05'
      }
    ],
    weeklyViews: [
      { date: '2024-01-15', views: 420 },
      { date: '2024-01-14', views: 350 },
      { date: '2024-01-13', views: 280 },
      { date: '2024-01-12', views: 390 },
      { date: '2024-01-11', views: 460 },
      { date: '2024-01-10', views: 520 },
      { date: '2024-01-09', views: 380 }
    ]
  });

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
    }
  }, [user, navigate]);

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

  const handleGenerateCode = async () => {
    setGenerating(true);
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    const { error } = await supabase.from('invitation_codes').insert({
      code,
      role: inviteRole,
      created_by: user?.id
    });
    if (error) {
      toast({ title: 'Erro', description: 'Erro ao gerar código', variant: 'destructive' });
    } else {
      toast({ title: 'Código gerado', description: `Código: ${code}` });
      // Atualizar lista
      const { data } = await supabase
        .from('invitation_codes')
        .select('*')
        .order('created_at', { ascending: false });
      setInviteCodes(data || []);
    }
    setGenerating(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <RequireAdmin>
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
                <div className="text-2xl font-bold text-foreground">{stats.totalPosts}</div>
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
                <div className="text-2xl font-bold text-foreground">{stats.totalViews.toLocaleString()}</div>
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
                <div className="text-2xl font-bold text-foreground">{stats.totalLikes}</div>
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
                <div className="text-2xl font-bold text-foreground">{stats.subscribers}</div>
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
                  {stats.recentPosts.map((post) => (
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
                  {stats.weeklyViews.map((day) => (
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
    </RequireAdmin>
  );
};

export default AdminDashboard;
