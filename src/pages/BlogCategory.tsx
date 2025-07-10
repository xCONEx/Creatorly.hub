import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBlogData } from '@/hooks/useBlogData';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, ArrowLeft } from 'lucide-react';

const BlogCategory: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { categories, getPostsByCategory, loading } = useBlogData();

  const category = categories.find((cat) => cat.slug === slug);
  const posts = getPostsByCategory(slug || '');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg animate-pulse mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando categoria...</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-foreground">Categoria não encontrada</h1>
          <p className="text-muted-foreground mb-6">A categoria que você procura não existe ou foi removida.</p>
          <Button asChild>
            <Link to="/blog">
              Voltar ao blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-900 dark:to-gray-800 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner IA */}
        <div className="relative rounded-2xl overflow-hidden mb-10 shadow-lg animate-fade-in-up">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-blue-500/80 opacity-80 z-0"></div>
          <div className="relative z-10 p-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg animate-fade-in">
              {category.name}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-2 animate-fade-in delay-100">
              {category.description || 'Explore artigos sobre este tema.'}
            </p>
            <div className="mt-4 flex justify-center">
              <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium shadow animate-fade-in delay-200">
                Banner IA: Em breve, resumo inteligente sobre o assunto!
              </span>
            </div>
          </div>
        </div>

        {/* Voltar */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link to="/blog" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar ao blog
            </Link>
          </Button>
        </div>

        {/* Lista de posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
          {posts.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground text-lg py-12 animate-fade-in">
              Nenhum artigo encontrado nesta categoria.
            </div>
          )}
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden bg-gradient-card shadow-card border-primary/10 hover:shadow-elegant transition-all duration-300 group animate-fade-in-up">
              <div className="relative overflow-hidden">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-background/90 text-foreground border-0">
                  {category.name}
                </Badge>
              </div>
              <CardHeader className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span>{post.author?.name}</span>
                  <span>•</span>
                  <span>{new Date(post.published_at || post.created_at).toLocaleDateString('pt-BR')}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.read_time} min</span>
                  </div>
                </div>
                <Link to={`/blog/${post.slug}`}>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    Ler Mais
                  </Button>
                </Link>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCategory; 
