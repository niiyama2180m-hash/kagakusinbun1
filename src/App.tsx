/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import PickUpSection from './components/PickUpSection';
import AboutSection from './components/AboutSection';
import WorksSection from './components/WorksSection';
import Footer from './components/Footer';
import AdminPage from './pages/AdminPage';
import { Post } from './types';
import { fetchPosts, savePost, deletePost } from './services/githubService';

// 初期データ
const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    image: 'https://picsum.photos/seed/science1/800/1000',
    title: '科学新聞 Vol.6',
    category: '科学',
    date: '2023.11.15',
    content: '',
    outline: ''
  },
  {
    id: '2',
    image: 'https://picsum.photos/seed/science2/800/1000',
    title: '科学新聞 Vol.5',
    category: '科学',
    date: '2023.11.08',
    content: '',
    outline: ''
  },
  {
    id: '3',
    image: 'https://picsum.photos/seed/science3/800/1000',
    title: '科学新聞 Vol.4',
    category: '科学',
    date: '2023.11.01',
    content: '',
    outline: ''
  },
  {
    id: '4',
    image: 'https://picsum.photos/seed/science4/800/1000',
    title: '科学新聞 Vol.3',
    category: '科学',
    date: '2023.10.25',
    content: '',
    outline: ''
  },
  {
    id: '5',
    image: 'https://picsum.photos/seed/science5/800/1000',
    title: '科学新聞 Vol.2',
    category: '科学',
    date: '2023.10.18',
    content: '',
    outline: ''
  },
  {
    id: '6',
    image: 'https://picsum.photos/seed/science6/800/1000',
    title: '科学新聞 Vol.1',
    category: '科学',
    date: '2023.10.11',
    content: '',
    outline: ''
  }
];

export default function App() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [isLoading, setIsLoading] = useState(true);

  // GitHubからデータを読み込む
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        if (data && data.length > 0) {
          setPosts(data);
        }
      } catch (error: any) {
        console.error('Failed to load posts:', error);
        // 設定不足のエラーなどの場合はアラートを表示
        if (error.message && error.message.includes('GitHubの設定')) {
          alert(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadPosts();
  }, []);

  const handleAddPost = async (newPost: Post) => {
    // 楽観的UI更新
    setPosts([newPost, ...posts]);
    try {
      await savePost(newPost, false);
    } catch (error) {
      alert('GitHubへの保存に失敗しました。設定を確認してください。');
      console.error(error);
    }
  };

  const handleUpdatePost = async (updatedPost: Post) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
    try {
      await savePost(updatedPost, true);
    } catch (error) {
      alert('GitHubへの保存に失敗しました。');
      console.error(error);
    }
  };

  const handleDeletePost = async (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
    try {
      await deletePost(id);
    } catch (error) {
      alert('GitHubからの削除に失敗しました。');
      console.error(error);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const pickUpPosts = posts.slice(0, 6);
  const worksPosts = posts.slice(6);

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={
          <AdminPage 
            posts={posts} 
            onAddPost={handleAddPost} 
            onUpdatePost={handleUpdatePost}
            onDeletePost={handleDeletePost}
          />
        } />
        <Route path="/" element={
          <div className="min-h-screen bg-white">
            <Navigation />
            <Hero />
            <main>
              <AboutSection />
              <WorksSection posts={worksPosts} />
              <PickUpSection posts={pickUpPosts} />
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

