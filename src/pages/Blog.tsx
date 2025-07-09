import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, Download, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { useBlogData } from "@/hooks/useBlogData";

const Blog = () => {
  const { categories, getFeaturedPost, getPublishedPosts, loading } = useBlogData();
  
  const featuredPost = getFeaturedPost();
  const recentPosts = getPublishedPosts().filter(post => !post.featured);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg animate-pulse mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            📚 Novo: Conteúdo semanal
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Conteúdo feito para quem{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              vive do audiovisual
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Aprenda técnicas, estratégias e dicas práticas para fazer seu negócio audiovisual crescer de forma sustentável e lucrativa.
          </p>
          
          {/* CTA Fixo */}
          <Card className="max-w-md mx-auto bg-gradient-card shadow-card border-primary/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Download className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">Material Gratuito</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Planilha de Precificação</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Calcule o valor justo dos seus serviços audiovisuais
              </p>
              <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                Baixar Grátis
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <Star className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Artigo em Destaque</h2>
            </div>
            
            <Card className="overflow-hidden bg-gradient-card shadow-elegant border-primary/10 hover:shadow-glow transition-all duration-300">
              <div className="lg:flex">
                <div className="lg:w-1/2">
                  <img
                    src={featuredPost.featured_image}
                    alt={featuredPost.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                </div>
                <div className="lg:w-1/2 p-8">
                  <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                    {featuredPost.category.name}
                  </Badge>
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 text-lg">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                    <span>{featuredPost.author.name}</span>
                    <span>•</span>
                    <span>{new Date(featuredPost.published_at || featuredPost.created_at).toLocaleDateString('pt-BR')}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredPost.read_time} min</span>
                    </div>
                  </div>
                  <Link to={`/blog/${featuredPost.slug}`}>
                    <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                      Ler Artigo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8">Categorias em Destaque</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link key={category.id} to={`/blog/categoria/${category.slug}`}>
                <Card className="cursor-pointer hover:shadow-card transition-all duration-300 bg-gradient-card border-primary/10">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 ${category.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                      <span className="text-white font-bold text-lg">
                        {category.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.post_count} artigos</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8">Artigos Recentes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden bg-gradient-card shadow-card border-primary/10 hover:shadow-elegant transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-background/90 text-foreground border-0">
                    {post.category.name}
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
                    <span>{post.author.name}</span>
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
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-primary p-8 border-0 shadow-glow">
            <h2 className="text-3xl font-bold text-white mb-4">
              Receba conteúdo exclusivo
            </h2>
            <p className="text-white/90 mb-6 text-lg">
              Cadastre-se e receba semanalmente dicas, estratégias e materiais gratuitos para fazer seu negócio audiovisual crescer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="flex-1 px-4 py-3 rounded-lg border-0 bg-white/90 placeholder:text-muted-foreground"
              />
              <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Quero Receber
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Blog;