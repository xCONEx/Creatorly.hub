import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, ArrowLeft } from 'lucide-react';
import RequireAdmin from '@/components/RequireAdmin';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
}

const AdminCategories = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: '', slug: '', description: '', color: '', icon: '' });
  const isEditor = user?.role === 'admin' || user?.role === 'moderator';

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    const { data } = await supabase.from('categories').select('*').order('created_at', { ascending: false });
    setCategories(data || []);
    setLoading(false);
  }

  function handleInput(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave(e: any) {
    e.preventDefault();
    if (!form.name || !form.slug) return toast({ title: 'Preencha nome e slug', variant: 'destructive' });
    if (editing) {
      // Editar
      const { error } = await supabase.from('categories').update(form).eq('id', editing.id);
      if (error) return toast({ title: 'Erro ao editar', description: error.message, variant: 'destructive' });
      toast({ title: 'Categoria editada!' });
    } else {
      // Criar
      const { error } = await supabase.from('categories').insert({ ...form });
      if (error) return toast({ title: 'Erro ao criar', description: error.message, variant: 'destructive' });
      toast({ title: 'Categoria criada!' });
    }
    setForm({ name: '', slug: '', description: '', color: '', icon: '' });
    setEditing(null);
    fetchCategories();
  }

  async function handleEdit(cat: Category) {
    setEditing(cat);
    setForm({
      name: cat.name || '',
      slug: cat.slug || '',
      description: cat.description || '',
      color: cat.color || '',
      icon: cat.icon || ''
    });
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Tem certeza que deseja remover?')) return;
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) return toast({ title: 'Erro ao remover', description: error.message, variant: 'destructive' });
    toast({ title: 'Categoria removida!' });
    fetchCategories();
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <RequireAdmin>
      <div className="min-h-screen bg-gradient-hero">
        {/* Header */}
        <header className="border-b border-border bg-background/95 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Link to="/admin" className="flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="text-sm">Voltar ao Dashboard</span>
                </Link>
                <Link to="/" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">C</span>
                  </div>
                  <span className="text-xl font-bold text-foreground">Creatorly Admin</span>
                </Link>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  Olá, {user?.name}
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="bg-gradient-card shadow-elegant border-primary/10">
            <CardHeader>
              <CardTitle className="text-2xl">Gerenciar Categorias</CardTitle>
            </CardHeader>
        <CardContent>
          {isEditor && (
            <form className="mb-6 space-y-2" onSubmit={handleSave}>
              <Input name="name" placeholder="Nome" value={form.name} onChange={handleInput} required />
              <Input name="slug" placeholder="Slug" value={form.slug} onChange={handleInput} required />
              <Input name="description" placeholder="Descrição" value={form.description} onChange={handleInput} />
              <Input name="color" placeholder="Cor (ex: bg-primary)" value={form.color} onChange={handleInput} />
              <Input name="icon" placeholder="Ícone (opcional)" value={form.icon} onChange={handleInput} />
              <div className="flex gap-2">
                <Button type="submit" className="bg-gradient-primary">{editing ? 'Salvar' : 'Criar'}</Button>
                {editing && <Button type="button" variant="outline" onClick={() => { setEditing(null); setForm({ name: '', slug: '', description: '', color: '', icon: '' }); }}>Cancelar</Button>}
              </div>
            </form>
          )}
          {loading ? (
            <div>Carregando...</div>
          ) : (
            <table className="min-w-full text-sm border">
              <thead>
                <tr className="bg-muted">
                  <th className="px-2 py-1 border">Nome</th>
                  <th className="px-2 py-1 border">Slug</th>
                  <th className="px-2 py-1 border">Descrição</th>
                  <th className="px-2 py-1 border">Ações</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(cat => (
                  <tr key={cat.id}>
                    <td className="px-2 py-1 border">{cat.name}</td>
                    <td className="px-2 py-1 border">{cat.slug}</td>
                    <td className="px-2 py-1 border">{cat.description}</td>
                    <td className="px-2 py-1 border">
                      {isEditor && <Button size="sm" variant="outline" onClick={() => handleEdit(cat)}>Editar</Button>}
                      {isEditor && <Button size="sm" variant="destructive" onClick={() => handleDelete(cat.id)} className="ml-2">Remover</Button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
        </div>
      </div>
    </RequireAdmin>
  );
};

export default AdminCategories; 
