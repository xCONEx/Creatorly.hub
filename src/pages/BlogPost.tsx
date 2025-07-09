import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBlogData } from '@/hooks/useBlogData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Eye, Heart, Calendar, User, ArrowLeft } from 'lucide-react';
import Footer from '@/components/Footer';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getPostBySlug, getRecentPosts, loading } = useBlogData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Carregando post...</p>
          </div>
        </div>
      </div>
    );
  }

  const post = getPostBySlug(slug || '');
  const recentPosts = getRecentPosts(3).filter(p => p.slug !== slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Post não encontrado
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              O post que você está procurando não existe ou foi removido.
            </p>
            <Button asChild>
              <Link to="/blog">
                Voltar ao blog
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/blog" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Voltar ao blog
            </Link>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">
                {post.category?.name}
              </Badge>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(post.published_at).toLocaleDateString('pt-BR')}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {post.author?.name || 'Autor'}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.read_time} min de leitura
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {post.views} visualizações
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {post.likes} curtidas
              </div>
            </div>
          </div>

          {/* Featured Image */}
          {post.featured_image && (
            <div className="mb-8">
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12 prose-headings:font-bold prose-headings:text-black prose-p:text-black prose-li:text-black prose-strong:text-black prose-ul:pl-6 prose-ol:pl-6 prose-h1:mb-4 prose-h2:mb-3 prose-h3:mb-2 prose-p:mb-4 prose-ul:mb-4 prose-ol:mb-4 prose-li:mb-1">
            <div 
              style={{ color: '#111' }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Author Info */}
          {post.author && (
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  {post.author.avatar_url && (
                    <img
                      src={post.author.avatar_url}
                      alt={post.author.name}
                      className="w-16 h-16 rounded-full"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {post.author.name}
                    </h3>
                    {post.author.bio && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {post.author.bio}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Related Posts */}
          {recentPosts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Posts Relacionados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    {relatedPost.featured_image && (
                      <img
                        src={relatedPost.featured_image}
                        alt={relatedPost.title}
                        className="w-full h-32 object-cover"
                      />
                    )}
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {relatedPost.category?.name}
                        </Badge>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(relatedPost.published_at).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/blog/${relatedPost.slug}`}>
                          Ler mais
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPost;
