import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, Eye, Calendar, Filter } from 'lucide-react';
import RequireAdmin from '@/components/RequireAdmin';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabaseClient';
import { toast } from '@/hooks/use-toast';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  status: 'published' | 'draft' | 'archived';
  category: { id: string; name: string };
  author: { id: string; name: string };
  views: number;
  created_at: string;
  published_at?: string;
}

const AdminPosts = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*, author:authors(id, name), category:categories(id, name)')
      .order('created_at', { ascending: false });
    if (error) {
      toast({ title: 'Erro ao carregar posts', description: error.message, variant: 'destructive' });
      setPosts([]);
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  }

  async function handleDelete(id: string, title: string) {
    const confirm = window.prompt(`Para remover o post "${title}", digite REMOVER e confirme:`);
    if (confirm !== 'REMOVER') {
      toast({ title: 'Remoção cancelada', description: 'Ação não confirmada.', variant: 'default' });
      return;
    }
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) {
      toast({ title: 'Erro ao remover', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Post removido!' });
      fetchPosts();
    }
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'draft': return 'bg-yellow-500';
      case 'archived': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <RequireAdmin allowedRoles={['admin','moderator','editor']}>
      <div className="min-h-screen bg-gradient-hero">
        <header className="border-b border-border bg-background/95 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Link to="/admin" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">C</span>
                  </div>
                  <span className="text-xl font-bold text-foreground">Gerenciar Posts</span>
                </Link>
              </div>
              <Link to="/admin/posts/new">
                <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Post
                </Button>
              </Link>
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="mb-6 bg-gradient-card shadow-card border-primary/10">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={statusFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter('all')}
                  >
                    Todos
                  </Button>
                  <Button
                    variant={statusFilter === 'published' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter('published')}
                  >
                    Publicados
                  </Button>
                  <Button
                    variant={statusFilter === 'draft' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter('draft')}
                  >
                    Rascunhos
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Carregando posts...</div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="bg-gradient-card shadow-card border-primary/10 hover:shadow-elegant transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">
                            {post.title}
                          </h3>
                          <Badge className={`${getStatusColor(post.status)} text-white`}>
                            {post.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Categoria: {post.category?.name}</span>
                          <span>•</span>
                          <span>Autor: {post.author?.name}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {post.views} visualizações
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.created_at).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link to={`/blog/${post.slug}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link to={`/admin/posts/edit/${post.id}`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        {(user?.role === 'admin' || user?.role === 'moderator') && (
                          <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleDelete(post.id, post.title)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {filteredPosts.length === 0 && !loading && (
            <Card className="bg-gradient-card shadow-card border-primary/10">
              <CardContent className="p-12 text-center">
                <div className="text-muted-foreground">
                  <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum post encontrado com os filtros aplicados.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </RequireAdmin>
  );
};

export default AdminPosts;
