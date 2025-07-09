import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { Save, Eye, ArrowLeft, Upload } from 'lucide-react';
import RequireAdmin from '@/components/RequireAdmin';

interface PostData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  status: 'published' | 'draft';
  featured: boolean;
  featuredImage: string;
  readTime: number;
}

const categories = [
  { id: 'precificacao', name: 'Precificação' },
  { id: 'financas', name: 'Finanças' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'contratos', name: 'Contratos' }
];

const PostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id && id !== 'new';
  
  const [postData, setPostData] = useState<PostData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    status: 'draft',
    featured: false,
    featuredImage: '',
    readTime: 5
  });

  const [saving, setSaving] = useState(false);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/[\s-]+/g, '-');
  };

  const handleTitleChange = (title: string) => {
    setPostData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute) || 1;
  };

  const handleContentChange = (content: string) => {
    setPostData(prev => ({
      ...prev,
      content,
      readTime: estimateReadTime(content)
    }));
  };

  const handleSave = async (status: 'draft' | 'published') => {
    setSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const action = isEditing ? 'atualizado' : 'criado';
      const statusText = status === 'published' ? 'publicado' : 'salvo como rascunho';
      
      toast({
        title: `Post ${action}!`,
        description: `O post foi ${statusText} com sucesso.`,
      });
      
      navigate('/admin/posts');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar o post.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <RequireAdmin>
      {/* Conteúdo original do PostEditor */}
      <div className="min-h-screen bg-gradient-hero">
        {/* Header */}
        <header className="border-b border-border bg-background/95 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={() => navigate('/admin/posts')}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
                <h1 className="text-xl font-bold text-foreground">
                  {isEditing ? 'Editar Post' : 'Novo Post'}
                </h1>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => handleSave('draft')}
                  disabled={saving}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Rascunho
                </Button>
                <Button 
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  onClick={() => handleSave('published')}
                  disabled={saving}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {saving ? 'Salvando...' : 'Publicar'}
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-gradient-card shadow-card border-primary/10">
                <CardHeader>
                  <CardTitle>Conteúdo do Post</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Título *</Label>
                    <Input
                      id="title"
                      value={postData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Digite o título do post..."
                      className="text-lg font-semibold"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="slug">URL (Slug)</Label>
                    <Input
                      id="slug"
                      value={postData.slug}
                      onChange={(e) => setPostData(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="url-do-post"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="excerpt">Resumo</Label>
                    <Textarea
                      id="excerpt"
                      value={postData.excerpt}
                      onChange={(e) => setPostData(prev => ({ ...prev, excerpt: e.target.value }))}
                      placeholder="Breve descrição do post..."
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="content">Conteúdo *</Label>
                    <Textarea
                      id="content"
                      value={postData.content}
                      onChange={(e) => handleContentChange(e.target.value)}
                      placeholder="Escreva o conteúdo do post aqui..."
                      rows={20}
                      className="font-mono"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Suporte a Markdown. Tempo de leitura estimado: {postData.readTime} min
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Post Settings */}
              <Card className="bg-gradient-card shadow-card border-primary/10">
                <CardHeader>
                  <CardTitle>Configurações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <Select value={postData.category} onValueChange={(value) => setPostData(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Post em Destaque</Label>
                      <p className="text-xs text-muted-foreground">
                        Aparecerá na seção destacada
                      </p>
                    </div>
                    <Switch
                      checked={postData.featured}
                      onCheckedChange={(checked) => setPostData(prev => ({ ...prev, featured: checked }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="readTime">Tempo de Leitura (min)</Label>
                    <Input
                      id="readTime"
                      type="number"
                      value={postData.readTime}
                      onChange={(e) => setPostData(prev => ({ ...prev, readTime: parseInt(e.target.value) || 0 }))}
                      min="1"
                      max="60"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Featured Image */}
              <Card className="bg-gradient-card shadow-card border-primary/10">
                <CardHeader>
                  <CardTitle>Imagem de Capa</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="featuredImage">URL da Imagem</Label>
                    <Input
                      id="featuredImage"
                      value={postData.featuredImage}
                      onChange={(e) => setPostData(prev => ({ ...prev, featuredImage: e.target.value }))}
                      placeholder="https://exemplo.com/imagem.jpg"
                    />
                  </div>
                  
                  {postData.featuredImage && (
                    <div className="relative">
                      <img
                        src={postData.featuredImage}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload de Imagem
                  </Button>
                </CardContent>
              </Card>

              {/* Status */}
              <Card className="bg-gradient-card shadow-card border-primary/10">
                <CardHeader>
                  <CardTitle>Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status atual:</span>
                    <Badge variant={postData.status === 'published' ? 'default' : 'secondary'}>
                      {postData.status === 'published' ? 'Publicado' : 'Rascunho'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </RequireAdmin>
  );
};

export default PostEditor;