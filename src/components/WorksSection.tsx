import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

// 制作実績のデータ
const PAPERS: Paper[] = [
  {
    id: 1,
    vol: 'Vol.6',
    title: '光の屈折とレンズの秘密',
    topic: '身近なルーペやメガネに使われているレンズの仕組みを、レーザー光線を使って視覚的に検証しました。',
    date: '2023.11.15',
    content: 'ここに新聞の詳細な内容が入ります。実験の手順、結果、考察など...',
    // 【画像変更の手順】
    // 1. 左側のファイルツリーの `public/images` フォルダに、使用したい画像ファイル（例: paper6.jpg）をアップロードしてください。
    // 2. 以下の `imageUrl` の部分を、アップロードしたファイルのパス（例: '/images/paper6.jpg'）に書き換えてください。
    imageUrl: '' // 例: '/images/paper6.jpg'
  },
  {
    id: 2,
    vol: 'Vol.5',
    title: '水の表面張力を操る',
    topic: '洗剤や塩を使って、水の表面張力がどのように変化するかを実験。アメンボが浮く理由を解明しました。',
    date: '2023.11.08',
    content: 'ここに新聞の詳細な内容が入ります。実験の手順、結果、考察など...',
    imageUrl: ''
  },
  {
    id: 3,
    vol: 'Vol.4',
    title: '静電気の不思議な力',
    topic: '冬に起こるパチパチの正体は？ライデン瓶を自作して、電気を貯める実験に挑戦しました。',
    date: '2023.11.01',
    content: 'ここに新聞の詳細な内容が入ります。実験の手順、結果、考察など...',
    imageUrl: ''
  },
  {
    id: 4,
    vol: 'Vol.3',
    title: '結晶の成長を観察する',
    topic: 'ミョウバンを使って、一週間かけて大きな結晶を作るプロジェクト。温度管理の重要性を学びました。',
    date: '2023.10.25',
    content: 'ここに新聞の詳細な内容が入ります。実験の手順、結果、考察など...',
    imageUrl: ''
  },
  {
    id: 5,
    vol: 'Vol.2',
    title: '酸性とアルカリ性の世界',
    topic: '紫キャベツの液を使って、家の中にある様々な液体の性質を調査。色の変化に驚きの連続でした。',
    date: '2023.10.18',
    content: 'ここに新聞の詳細な内容が入ります。実験の手順、結果、考察など...',
    imageUrl: ''
  },
  {
    id: 6,
    vol: 'Vol.1',
    title: '科学新聞、創刊！',
    topic: 'なぜ科学に興味を持ったのか？これからどんな実験をしていくのか、決意を込めた創刊号です。',
    date: '2023.10.11',
    content: 'ここに新聞の詳細な内容が入ります。実験の手順、結果、考察など...',
    imageUrl: ''
  }
];

interface Paper {
  id: number | string;
  vol: string;
  title: string;
  topic: string;
  date: string;
  content: string;
  imageUrl?: string;
}

export default function WorksSection() {
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);

  return (
    <section id="works" className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-display tracking-tight mb-2"
          >
            制作実績
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 tracking-wide"
          >
            過去に発行した科学新聞のアーカイブ
          </motion.p>
        </div>

        <div className="space-y-4">
          {PAPERS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedPaper(item)}
              className={`group border-b border-gray-100 py-8 flex flex-col md:flex-row md:items-center justify-between cursor-pointer transition-colors px-4 rounded-lg ${
                index === 0 ? 'bg-blue-50/50 border-blue-100' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-6 mb-4 md:mb-0">
                <div className="flex flex-col items-center">
                  <span className="text-sm font-mono text-blue-600 font-bold">{item.vol}</span>
                  {index === 0 && (
                    <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded mt-1 font-bold animate-pulse">NEW</span>
                  )}
                </div>
                <div>
                  <h3 className={`font-bold group-hover:text-blue-600 transition-colors ${
                    index === 0 ? 'text-2xl' : 'text-xl'
                  }`}>{item.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{item.topic}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-400 group-hover:text-blue-600 transition-colors">
                <span className="text-sm font-medium">{item.date}</span>
                <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Newspaper Detail Modal */}
      {selectedPaper && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <BookOpen className="text-blue-600" />
                <span className="font-bold text-lg">{selectedPaper.vol} - {selectedPaper.title}</span>
              </div>
              <button 
                onClick={() => setSelectedPaper(null)}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-8 md:p-12">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                  <span className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-4 block">科学新聞 アーカイブ</span>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">{selectedPaper.title}</h1>
                  <p className="text-gray-500">{selectedPaper.date} 発行</p>
                </div>

                <div className="aspect-video bg-gray-100 rounded-xl mb-12 overflow-hidden flex items-center justify-center text-gray-400 italic">
                  {selectedPaper.imageUrl ? (
                    <img src={selectedPaper.imageUrl} alt={selectedPaper.title} className="w-full h-full object-contain" />
                  ) : (
                    <span>[ ここに新聞の紙面画像が表示されます ]</span>
                  )}
                </div>

                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <h2 className="text-2xl font-bold text-black mb-4">今号のトピック</h2>
                  <p className="mb-8">{selectedPaper.topic}</p>
                  
                  <h2 className="text-2xl font-bold text-black mb-4">実験の記録と考察</h2>
                  <p>{selectedPaper.content}</p>
                  <p className="mt-4">
                    今回の実験を通して、私たちは目に見えない力の存在を改めて実感しました。
                    特に驚いたのは、条件を少し変えるだけで結果が劇的に変わることです。
                    科学の面白さは、こうした「予想外」の発見にあるのだと感じました。
                  </p>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-100 flex justify-center">
                  <button 
                    onClick={() => setSelectedPaper(null)}
                    className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
                  >
                    アーカイブ一覧に戻る
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
