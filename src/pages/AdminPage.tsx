import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Post } from '../types';
import PostEditor from '../components/Admin/PostEditor';
import { Plus, LayoutDashboard, FileText, Settings, LogOut, Trash2, Home, AlertCircle } from 'lucide-react';
import { isConfigured } from '../services/githubService';

interface AdminPageProps {
  posts: Post[];
  onAddPost: (post: Post) => void;
  onUpdatePost: (post: Post) => void;
  onDeletePost: (id: string) => void;
}

export default function AdminPage({ posts, onAddPost, onUpdatePost, onDeletePost }: AdminPageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | undefined>(undefined);

  const [activeTab, setActiveTab] = useState<'posts' | 'settings'>('posts');

  const handleSave = (post: Post) => {
    if (editingPost) {
      onUpdatePost(post);
    } else {
      onAddPost(post);
    }
    setIsEditing(false);
    setEditingPost(undefined);
    setActiveTab('posts');
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setIsEditing(true);
    setActiveTab('posts');
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
          <button 
            onClick={() => setActiveTab('posts')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'posts' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FileText size={18} />
            記事一覧
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'settings' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Settings size={18} />
            設定
          </button>
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut size={18} />
            サイトに戻る
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        {/* Mobile Header Link */}
        <div className="md:hidden mb-6 flex justify-end">
          <Link to="/" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            <Home size={16} />
            ホームに戻る
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          {!isConfigured() && (
            <div className="mb-8 bg-amber-50 border border-amber-200 rounded-xl p-6 flex items-start gap-4">
              <AlertCircle className="text-amber-600 shrink-0 mt-1" />
              <div>
                <h3 className="text-amber-900 font-bold mb-1">GitHub連携が未設定です</h3>
                <p className="text-amber-800 text-sm leading-relaxed">
                  記事を保存するには、AI Studioの環境変数に GitHub の設定を追加する必要があります。
                  設定が完了するまで、記事の投稿や編集はできません。
                </p>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className="mt-3 text-amber-900 font-bold text-sm underline hover:text-amber-700"
                >
                  設定方法を確認する
                </button>
              </div>
            </div>
          )}

          {activeTab === 'posts' ? (
            <>
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
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold mb-6">設定</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <AlertCircle size={20} className={isConfigured() ? 'text-green-500' : 'text-amber-500'} />
                    GitHub連携ステータス
                  </h3>
                  
                  {isConfigured() ? (
                    <div className="bg-green-50 border border-green-100 p-4 rounded-lg text-green-800 text-sm mb-4">
                      連携済みです。記事データは以下のリポジトリに保存されます。
                    </div>
                  ) : (
                    <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg text-amber-800 text-sm mb-4">
                      未設定です。環境変数を設定してください。
                    </div>
                  )}

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm font-mono text-gray-600 space-y-1">
                    <p><strong>VITE_GITHUB_OWNER:</strong> {import.meta.env.VITE_GITHUB_OWNER || '(未設定)'}</p>
                    <p><strong>VITE_GITHUB_REPO:</strong> {import.meta.env.VITE_GITHUB_REPO || '(未設定)'}</p>
                    <p><strong>VITE_GITHUB_TOKEN:</strong> {import.meta.env.VITE_GITHUB_TOKEN ? '******** (設定済み)' : '(未設定)'}</p>
                  </div>
                </div>

                {!isConfigured() && (
                  <div className="border-t border-gray-100 pt-8">
                    <h3 className="text-lg font-medium mb-4">設定手順</h3>
                    <ol className="list-decimal list-inside space-y-3 text-gray-600 text-sm leading-relaxed">
                      <li>GitHubで新しいリポジトリを作成します。</li>
                      <li>GitHubの Settings &gt; Developer settings &gt; Personal access tokens からトークンを発行します（repo権限が必要）。</li>
                      <li>AI Studioの環境変数設定画面を開きます。</li>
                      <li>上記の3つの値を正確に入力して保存します。</li>
                      <li>プレビュー画面をリロードしてください。</li>
                    </ol>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
