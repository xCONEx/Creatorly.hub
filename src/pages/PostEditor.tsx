import { useState, useEffect, useRef, useCallback } from 'react';
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
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabaseClient';
import RichTextEditor from '@/components/RichTextEditor';
import ChatGPTImporter from '@/components/ChatGPTImporter';

interface PostData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category_id: string;
  status: 'published' | 'draft';
  featured: boolean;
  featured_image: string;
  read_time: number;
}

interface Category {
  id: string;
  name: string;
}

const PostEditor = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id && id !== 'new';

  const [postData, setPostData] = useState<PostData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category_id: '',
    status: 'draft',
    featured: false,
    featured_image: '',
    read_time: 5
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEditing);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [oldImageUrl, setOldImageUrl] = useState<string | null>(null);
  const [showChatGPTImporter, setShowChatGPTImporter] = useState(false);

  useEffect(() => {
    fetchCategories();
    if (isEditing) {
      fetchPost();
    }
    // eslint-disable-next-line
  }, [id]);

  async function fetchCategories() {
    const { data, error } = await supabase.from('categories').select('id, name').order('name');
    if (!error) setCategories(data || []);
  }

  async function fetchPost() {
    setLoading(true);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();
    if (error || !data) {
      toast({ title: 'Erro ao carregar post', description: error?.message, variant: 'destructive' });
      navigate('/admin/posts');
      return;
    }
    setPostData({
      title: data.title || '',
      slug: data.slug || '',
      excerpt: data.excerpt || '',
      content: data.content || '',
      category_id: data.category_id || '',
      status: data.status || 'draft',
      featured: !!data.featured,
      featured_image: data.featured_image || '',
      read_time: data.read_time || 5
    });
    setOldImageUrl(data.featured_image || null);
    setLoading(false);
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[0-\u036f]/g, '')
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
      read_time: estimateReadTime(content)
    }));
  };

  const removeImageFromStorage = useCallback(async (url: string | null) => {
    if (!url) return;
    // Extrair o caminho do arquivo da URL
    const match = url.match(/posts\/([^?]+)/);
    if (!match) return;
    const path = match[1];
    try {
      await supabase.storage.from('posts').remove([path]);
    } catch (error) {
      console.error('Erro ao remover imagem:', error);
    }
  }, []);

  const handleSave = async (status: 'draft' | 'published') => {
    setSaving(true);
    
    // Validar campos obrigatórios
    if (!postData.title || !postData.slug || !postData.category_id) {
      toast({ 
        title: 'Preencha todos os campos obrigatórios', 
        description: 'Título, URL e categoria são obrigatórios',
        variant: 'destructive' 
      });
      setSaving(false);
      return;
    }
    
    const payload = {
      ...postData,
      status,
      author_id: user?.id,
      updated_at: new Date().toISOString(),
    };
    
    try {
      if (isEditing) {
        // Se imagem mudou, remove a antiga
        if (oldImageUrl && oldImageUrl !== postData.featured_image) {
          await removeImageFromStorage(oldImageUrl);
        }
        
        const { error } = await supabase
          .from('posts')
          .update(payload)
          .eq('id', id);
          
        if (error) {
          console.error('Erro ao atualizar post:', error);
          if (error.code === '42501') {
            throw new Error('Você não tem permissão para editar posts');
          }
          throw error;
        }
        
        toast({ 
          title: 'Post atualizado!', 
          description: `O post foi ${status === 'published' ? 'publicado' : 'salvo como rascunho'} com sucesso.` 
        });
      } else {
        const { error } = await supabase
          .from('posts')
          .insert({
            ...payload,
            created_at: new Date().toISOString(),
            published_at: status === 'published' ? new Date().toISOString() : null
          });
          
        if (error) {
          console.error('Erro ao criar post:', error);
          if (error.code === '42501') {
            throw new Error('Você não tem permissão para criar posts');
          }
          throw error;
        }
        
        toast({ 
          title: 'Post criado!', 
          description: `O post foi ${status === 'published' ? 'publicado' : 'salvo como rascunho'} com sucesso.` 
        });
      }
      
      navigate('/admin/posts');
    } catch (error: any) {
      console.error('Erro completo:', error);
      toast({ 
        title: 'Erro ao salvar', 
        description: error.message || 'Ocorreu um erro inesperado', 
        variant: 'destructive' 
      });
    } finally {
      setSaving(false);
    }
  };

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validar tipo e tamanho do arquivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast({ 
        title: 'Tipo de arquivo não suportado', 
        description: 'Use apenas imagens JPEG, PNG ou WebP', 
        variant: 'destructive' 
      });
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB
      toast({ 
        title: 'Arquivo muito grande', 
        description: 'A imagem deve ter menos de 5MB', 
        variant: 'destructive' 
      });
      return;
    }
    
    setUploading(true);
    setUploadProgress(0);
    
    try {
      // Remove imagem anterior se houver
      if (postData.featured_image) {
        await removeImageFromStorage(postData.featured_image);
      }
      
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `posts/${fileName}`;
      
      // Upload para o bucket 'posts' em vez de 'public'
      const { data, error } = await supabase.storage
        .from('posts')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
        
      if (error) {
        console.error('Erro no upload:', error);
        toast({ 
          title: 'Erro ao fazer upload', 
          description: error.message, 
          variant: 'destructive' 
        });
        return;
      }
      
      // Obter URL pública da imagem
      const { data: urlData } = supabase.storage
        .from('posts')
        .getPublicUrl(filePath);
        
      setPostData(prev => ({ ...prev, featured_image: urlData.publicUrl }));
      toast({ 
        title: 'Imagem enviada!', 
        description: 'A imagem foi enviada com sucesso.' 
      });
      
    } catch (error: any) {
      console.error('Erro inesperado:', error);
      toast({ 
        title: 'Erro inesperado', 
        description: 'Ocorreu um erro durante o upload', 
        variant: 'destructive' 
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }

  const handleCancel = async () => {
    if (!isEditing && postData.featured_image) {
      await removeImageFromStorage(postData.featured_image);
    }
    navigate('/admin/posts');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  return (
    <RequireAdmin allowedRoles={['admin','moderator','editor']}>
      <div className="min-h-screen bg-gradient-hero">
        <header className="border-b border-border bg-background/95 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={handleCancel}>
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
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">URL (Slug) *</Label>
                    <Input
                      id="slug"
                      value={postData.slug}
                      onChange={(e) => setPostData(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="url-do-post"
                      required
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
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="content">Conteúdo *</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowChatGPTImporter(true)}
                        className="text-xs"
                      >
                        Importar do ChatGPT
                      </Button>
                    </div>
                    <RichTextEditor
                      value={postData.content}
                      onChange={(content) => handleContentChange(content)}
                      placeholder="Escreva o conteúdo do post aqui..."
                      className="min-h-[400px]"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Use a barra de ferramentas para formatar o texto. Suporte a HTML. Tempo de leitura estimado: {postData.read_time} min
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
                    <Label htmlFor="category">Categoria *</Label>
                    <Select value={postData.category_id} onValueChange={(value) => setPostData(prev => ({ ...prev, category_id: value }))}>
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
                      value={postData.read_time}
                      onChange={(e) => setPostData(prev => ({ ...prev, read_time: parseInt(e.target.value) || 0 }))}
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
                    <Label htmlFor="featuredImage">Upload de Imagem</Label>
                    <input
                      id="featuredImage"
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      className="block w-full border rounded p-2 bg-background"
                      disabled={uploading}
                    />
                    {uploading && (
                      <div className="mt-2 text-xs text-muted-foreground">Enviando imagem... {uploadProgress}%</div>
                    )}
                  </div>
                  {postData.featured_image && (
                    <div className="relative">
                      <img
                        src={postData.featured_image}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
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
        
        {/* ChatGPT Importer */}
        <ChatGPTImporter
          isOpen={showChatGPTImporter}
          onClose={() => setShowChatGPTImporter(false)}
          onImport={(content) => {
            setPostData(prev => ({ ...prev, content }));
            setShowChatGPTImporter(false);
          }}
        />
      </div>
    </RequireAdmin>
  );
};

export default PostEditor;
