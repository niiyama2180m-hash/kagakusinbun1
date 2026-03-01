import { useState } from 'react';
import { motion } from 'motion/react';
import { Post } from '../types';
import PostEditor from '../components/Admin/PostEditor';
import { Plus, LayoutDashboard, FileText, Settings, LogOut, Trash2 } from 'lucide-react';

interface AdminPageProps {
  posts: Post[];
  onAddPost: (post: Post) => void;
  onUpdatePost: (post: Post) => void;
  onDeletePost: (id: string) => void;
}

export default function AdminPage({ posts, onAddPost, onUpdatePost, onDeletePost }: AdminPageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | undefined>(undefined);

  const handleSave = (post: Post) => {
    if (editingPost) {
      onUpdatePost(post);
    } else {
      onAddPost(post);
    }
    setIsEditing(false);
    setEditingPost(undefined);
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('本当にこの記事を削除しますか？')) {
      onDeletePost(id);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingPost(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block fixed h-full">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">管理画面</h1>
          <p className="text-xs text-gray-500 mt-1">科学新聞 CMS</p>
        </div>
        <nav className="p-4 space-y-1">
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">
            <LayoutDashboard size={18} />
            ダッシュボード
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <FileText size={18} />
            記事一覧
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <Settings size={18} />
            設定
          </a>
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
          <a href="/" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut size={18} />
            サイトに戻る
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        <div className="max-w-5xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">記事管理</h2>
              <p className="text-gray-500 text-sm mt-1">新しいトピックの作成や編集を行います</p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus size={18} />
                新規作成
              </button>
            )}
          </header>

          {isEditing ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <PostEditor 
                post={editingPost}
                onSave={handleSave} 
                onCancel={handleCancel} 
              />
            </motion.div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-medium">
                    <th className="px-6 py-4">画像</th>
                    <th className="px-6 py-4">タイトル</th>
                    <th className="px-6 py-4">カテゴリ</th>
                    <th className="px-6 py-4">日付</th>
                    <th className="px-6 py-4 text-right">アクション</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {posts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                        記事がありません。「新規作成」から記事を追加してください。
                      </td>
                    </tr>
                  ) : (
                    posts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                            <img src={post.image} alt="" className="w-full h-full object-cover" />
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">{post.title}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {post.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500 text-sm">{post.date}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-3">
                            <button 
                              onClick={() => handleEdit(post)}
                              className="text-gray-400 hover:text-blue-600 font-medium text-sm transition-colors"
                            >
                              編集
                            </button>
                            <button 
                              onClick={() => handleDelete(post.id)}
                              className="text-gray-400 hover:text-red-600 font-medium text-sm transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
