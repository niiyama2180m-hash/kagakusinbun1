import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-3xl font-bold font-display mb-6">Keisuke Yoshikawa</h3>
            <p className="text-gray-400 max-w-md mb-8">
              心に残るデジタル体験を創造します。あなたのビジョンを形にするお手伝いをさせてください。
            </p>
            <div className="flex space-x-4">
                {/* Social Icons Placeholder */}
                {['Twitter', 'Instagram', 'LinkedIn'].map(social => (
                    <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                        <span className="sr-only">{social}</span>
                        <div className="w-4 h-4 bg-current rounded-sm"></div>
                    </a>
                ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">お問い合わせ</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-1 shrink-0" />
                <span>hello@example.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">リンク</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">ホーム</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">私について</a></li>
              <li><a href="#works" className="hover:text-white transition-colors">制作実績</a></li>
              <li><a href="#pick-up" className="hover:text-white transition-colors">ピックアップ</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; 2024 Keisuke Yoshikawa. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 items-center">
            <a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a>
            <a href="#" className="hover:text-white transition-colors">利用規約</a>
            <Link to="/admin" className="hover:text-white transition-colors flex items-center gap-1">
              <Lock size={14} />
              <span>管理者</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
