
import { useState, useEffect } from 'react';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  icon?: string;
  post_count: number;
}

export interface Author {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  bio?: string;
  role: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  author: Author;
  category: Category;
  status: 'published' | 'draft' | 'archived';
  featured: boolean;
  read_time: number;
  views: number;
  likes: number;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export const useBlogData = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with Supabase queries when backend is integrated
    const loadData = async () => {
      setLoading(true);
      
      // For now, initialize with empty arrays
      // This will be replaced with actual Supabase calls
      setPosts([]);
      setCategories([]);
      setLoading(false);
    };

    loadData();
  }, []);

  const getPostBySlug = (slug: string) => {
    return posts.find(post => post.slug === slug && post.status === 'published');
  };

  const getPostsByCategory = (categorySlug: string) => {
    return posts.filter(post => 
      post.category.slug === categorySlug && 
      post.status === 'published'
    );
  };

  const getFeaturedPost = () => {
    return posts.find(post => post.featured && post.status === 'published');
  };

  const getPublishedPosts = () => {
    return posts.filter(post => post.status === 'published');
  };

  return {
    posts,
    categories,
    loading,
    getPostBySlug,
    getPostsByCategory,
    getFeaturedPost,
    getPublishedPosts
  };
};
