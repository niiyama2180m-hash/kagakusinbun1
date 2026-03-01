import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { Post } from '../../types';
import { Loader2, Image as ImageIcon, Wand2, Upload } from 'lucide-react';

interface PostEditorProps {
  post?: Post;
  onSave: (post: Post) => void;
  onCancel: () => void;
}

export default function PostEditor({ post, onSave, onCancel }: PostEditorProps) {
  const [title, setTitle] = useState(post?.title || '');
  const [outline, setOutline] = useState(post?.outline || '');
  const [content, setContent] = useState(post?.content || '');
  const [category, setCategory] = useState(post?.category || '科学');
  const [image, setImage] = useState<string | null>(post?.image || null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 画像圧縮・変換ロジック (簡易版: Canvasを使用)
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // 最大幅を1200pxに制限
        const maxWidth = 1200;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // JPEG形式で圧縮 (品質0.8)
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setImage(dataUrl);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const generateContent = async () => {
    if (!title || !outline) {
      alert('タイトルとアウトラインを入力してください');
      return;
    }

    setIsGenerating(true);
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Gemini API Key is missing');
      }
      
      const ai = new GoogleGenAI({ apiKey });
      // Correct usage for @google/genai
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `
          あなたは科学新聞の編集者です。以下のタイトルとアウトラインに基づいて、
          読者の興味を惹くような記事の本文を作成してください。
          
          タイトル: ${title}
          アウトライン:
          ${outline}
          
          条件:
          - 小学生から大人まで楽しめるような、わかりやすく、かつ知的好奇心を刺激する文体で。
          - 400文字〜600文字程度。
          - 構成は論理的に。
        `
      });
      
      const text = response.text;
      if (text) {
        setContent(text);
      }
    } catch (error) {
      console.error('AI Generation Error:', error);
      alert('AI生成に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !image) {
      alert('必須項目（タイトル、本文、画像）を入力してください');
      return;
    }

    const newPost: Post = {
      id: post?.id || Date.now().toString(),
      title,
      category,
      date: post?.date || new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.'),
      image,
      content,
      outline,
    };

    onSave(newPost);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
      <h2 className="text-2xl font-bold mb-6">{post ? '記事を編集' : '新規記事作成'}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 画像アップロード */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">メイン画像 (JPEG変換・圧縮されます)</label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            {image ? (
              <div className="relative aspect-video max-h-64 mx-auto">
                <img src={image} alt="Preview" className="w-full h-full object-contain rounded-md" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-md">
                  <p className="text-white font-medium">画像を変更する</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <Upload className="w-10 h-10 mb-2" />
                <p>クリックして画像をアップロード</p>
                <p className="text-xs mt-1">対応形式: JPG, PNG, HEICなど</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageUpload}
            />
          </div>
        </div>

        {/* タイトル */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">タイトル</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="記事のタイトルを入力"
            required
          />
        </div>

        {/* カテゴリ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">カテゴリ</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          >
            <option value="科学">科学</option>
            <option value="実験">実験</option>
            <option value="考察">考察</option>
            <option value="ニュース">ニュース</option>
          </select>
        </div>

        {/* アウトライン (AI用) */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-bold text-blue-800">AIアシスタント用アウトライン</label>
            <button
              type="button"
              onClick={generateContent}
              disabled={isGenerating || !title || !outline}
              className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
              AIで本文を生成
            </button>
          </div>
          <textarea
            value={outline}
            onChange={(e) => setOutline(e.target.value)}
            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all h-32 text-sm"
            placeholder="箇条書きで記事の構成や要点を入力してください..."
          />
          <p className="text-xs text-blue-600 mt-2">※タイトルとアウトラインを入力して「AIで本文を生成」を押すと、下に本文が自動生成されます。</p>
        </div>

        {/* 本文 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">本文</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all h-64"
            placeholder="ここに記事の本文が入ります"
            required
          />
        </div>

        {/* アクションボタン */}
        <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="px-8 py-2 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            投稿する
          </button>
        </div>
      </form>
    </div>
  );
}
