
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  author_id: string;
  category_id: string;
  status: string;
  featured: boolean;
  read_time: number;
  views: number;
  likes: number;
  published_at: string;
  created_at: string;
  updated_at: string;
  author?: any;
  category?: any;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  post_count?: number;
}

export const useBlogData = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      // Buscar categorias
      const { data: catData, error: catError } = await supabase.from('categories').select('*');
      if (catError) {
        console.error('Erro ao buscar categorias:', catError);
      }
      setCategories(catData || []);
      
      // Buscar autores (se necessário)
      try {
        const { data: authData, error: authError } = await supabase.from('authors').select('id, name, email');
        if (authError) {
          console.error('Erro ao buscar autores:', authError);
        } else {
          setAuthors(authData || []);
        }
      } catch (error) {
        console.error('Erro ao buscar autores:', error);
        setAuthors([]);
      }
      
      // Buscar posts (consulta simplificada sem join inicial)
      try {
        // Primeiro, buscar posts sem join para evitar recursão
        const { data: postData, error: postError } = await supabase
          .from('posts')
          .select('id, title, slug, excerpt, content, featured_image, author_id, category_id, status, featured, read_time, views, likes, published_at, created_at, updated_at')
          .eq('status', 'published')
          .order('published_at', { ascending: false });
        
        if (postError) {
          console.error('Erro ao buscar posts publicados:', postError);
          // Fallback: buscar todos os posts
          const { data: allPosts, error: allPostsError } = await supabase
            .from('posts')
            .select('id, title, slug, excerpt, content, featured_image, author_id, category_id, status, featured, read_time, views, likes, published_at, created_at, updated_at')
            .order('created_at', { ascending: false });
          
          if (allPostsError) {
            console.error('Erro ao buscar todos os posts:', allPostsError);
            setPosts([]);
          } else {
            setPosts(allPosts || []);
          }
        } else {
          setPosts(postData || []);
        }
      } catch (error) {
        console.error('Erro inesperado ao buscar posts:', error);
        setPosts([]);
      }
    } catch (error) {
      console.error('Erro geral ao carregar dados:', error);
      setCategories([]);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  // Função para enriquecer posts com dados de autor e categoria
  const enrichPosts = (postsData: BlogPost[]) => {
    return postsData.map(post => ({
      ...post,
      author: authors.find(auth => auth.id === post.author_id),
      category: categories.find(cat => cat.id === post.category_id)
    }));
  };

  const getPostBySlug = (slug: string) => {
    const post = posts.find(post => post.slug === slug && post.status === 'published');
    if (post) {
      return enrichPosts([post])[0];
    }
    return undefined;
  };

  const getPostsByCategory = (categorySlug: string) => {
    const filteredPosts = posts.filter(post => {
      const category = categories.find(cat => cat.id === post.category_id);
      return category?.slug === categorySlug && post.status === 'published';
    });
    return enrichPosts(filteredPosts);
  };

  const getFeaturedCategories = () => {
    // Exemplo: categorias com mais posts ou cor especial
    return categories
      .filter(cat => cat.color === 'bg-primary' || (cat.post_count && cat.post_count > 0))
      .slice(0, 5);
  };

  const getFeaturedPost = () => {
    const post = posts.find(post => post.featured && post.status === 'published');
    if (post) {
      return enrichPosts([post])[0];
    }
    return undefined;
  };

  const getPublishedPosts = () => {
    return enrichPosts(posts.filter(post => post.status === 'published'));
  };

  const getRecentPosts = (limit = 5) => {
    const filteredPosts = posts
      .filter(post => post.status === 'published')
      .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
      .slice(0, limit);
    return enrichPosts(filteredPosts);
  };

  return {
    posts,
    categories,
    loading,
    getPostBySlug,
    getPostsByCategory,
    getFeaturedCategories,
    getFeaturedPost,
    getPublishedPosts,
    getRecentPosts
  };
};
