import React from 'react';
import { Link } from 'react-router-dom';
import { useBlogData } from '@/hooks/useBlogData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Eye, Heart, DollarSign, PiggyBank, TrendingUp, FileText } from 'lucide-react';

const iconMap: Record<string, any> = {
  DollarSign,
  PiggyBank,
  TrendingUp,
  FileText,
};

const Blog: React.FC = () => {
  const { 
    posts, 
    categories, 
    loading, 
    getFeaturedPost, 
    getFeaturedCategories, 
    getRecentPosts 
  } = useBlogData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Carregando blog...</p>
          </div>
        </div>
      </div>
    );
  }

  const featuredPost = getFeaturedPost();
  const featuredCategories = getFeaturedCategories();
  const recentPosts = getRecentPosts(6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Blog Creatorly Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Descubra insights valiosos sobre tecnologia, inovação e desenvolvimento
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Post em Destaque
            </h2>
            <Card className="overflow-hidden">
              <div className="md:flex">
                {featuredPost.featured_image && (
                  <div className="md:w-1/2">
                    <img
                      src={featuredPost.featured_image}
                      alt={featuredPost.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                )}
                <div className="md:w-1/2 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">
                      {featuredPost.category?.name}
                    </Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(featuredPost.published_at).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <CardTitle className="text-2xl mb-4">
                    {featuredPost.title}
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      {featuredPost.read_time} min
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <Eye className="w-4 h-4" />
                      {featuredPost.views}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <Heart className="w-4 h-4" />
                      {featuredPost.likes}
                    </div>
                  </div>
                  <Button asChild>
                    <Link to={`/blog/${featuredPost.slug}`}>
                      Ler mais
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Featured Categories */}
        {featuredCategories.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Categorias em Destaque
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {featuredCategories.map((category) => {
                const LucideIcon = iconMap[category.icon] || FileText;
                return (
                  <Card key={category.id} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <LucideIcon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {category.name}
                      </h3>
                      {category.post_count && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {category.post_count} posts
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Recent Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Artigos Recentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {post.featured_image && (
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline">
                      {post.category?.name}
                    </Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(post.published_at).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <CardTitle className="text-xl mb-3 line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.read_time} min
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.views}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/blog/${post.slug}`}>
                        Ler mais
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Posts Link */}
        {posts.length > 6 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/blog/all">
                Ver todos os posts
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
