import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-stone-900 dark:bg-stone-950 text-stone-300">
      <div className="container-max py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-amber-700 flex items-center justify-center">
                <span className="text-white font-display font-bold text-xs tracking-widest">K</span>
              </div>
              <span className="font-display text-2xl font-bold text-white">KYOTO</span>
            </Link>
            <p className="text-stone-400 font-body text-sm leading-relaxed max-w-xs">
              An editorial journey through Japan's ancient capital — its temples, gardens, cuisine, crafts, and living traditions.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" aria-label="Instagram" className="text-stone-500 hover:text-amber-500 transition-colors"><Instagram size={18} /></a>
              <a href="#" aria-label="Twitter" className="text-stone-500 hover:text-amber-500 transition-colors"><Twitter size={18} /></a>
              <a href="#" aria-label="YouTube" className="text-stone-500 hover:text-amber-500 transition-colors"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-body font-medium tracking-widest uppercase text-stone-500 mb-5">Navigate</h4>
            <ul className="space-y-3">
              {[['/', 'Home'], ['/categories', 'Categories'], ['/about', 'About'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-sm font-body text-stone-400 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-body font-medium tracking-widest uppercase text-stone-500 mb-5">Information</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm font-body text-stone-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm font-body text-stone-400 hover:text-white transition-colors">Terms of Use</a></li>
              <li><a href="#" className="text-sm font-body text-stone-400 hover:text-white transition-colors">Editorial Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600 font-body">
          <p>© {year} KYOTO Editorial. All rights reserved.</p>
          <p className="font-accent italic text-stone-500">A university final project</p>
        </div>
      </div>
    </footer>
  );
}
