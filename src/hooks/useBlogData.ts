
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    // Buscar categorias
    const { data: catData } = await supabase.from('categories').select('*');
    setCategories(catData || []);
    // Buscar posts (com join de autor e categoria)
    const { data: postData } = await supabase
      .from('posts')
      .select('*, author:authors(*), category:categories(*)')
      .eq('status', 'published')
      .order('published_at', { ascending: false });
    setPosts(postData || []);
    setLoading(false);
  }

  const getPostBySlug = (slug: string) => {
    return posts.find(post => post.slug === slug && post.status === 'published');
  };

  const getPostsByCategory = (categorySlug: string) => {
    return posts.filter(post => post.category?.slug === categorySlug && post.status === 'published');
  };

  const getFeaturedCategories = () => {
    // Exemplo: categorias com mais posts ou cor especial
    return categories
      .filter(cat => cat.color === 'bg-primary' || (cat.post_count && cat.post_count > 0))
      .slice(0, 5);
  };

  const getFeaturedPost = () => {
    return posts.find(post => post.featured && post.status === 'published');
  };

  const getPublishedPosts = () => {
    return posts.filter(post => post.status === 'published');
  };

  const getRecentPosts = (limit = 5) => {
    return posts
      .filter(post => post.status === 'published')
      .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
      .slice(0, limit);
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
