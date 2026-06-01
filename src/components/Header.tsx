import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, Search } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { api } from '../lib/strapi-api';
import { getCategoryName } from '../types';
import type { Article, Category } from '../types';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/categories', label: 'Categorii' },
  { to: '/about', label: 'Despre' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ articles: Article[]; categories: Category[] }>({ articles: [], categories: [] });
  const [searching, setSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const bg = theme === 'dark' ? 'rgba(26,13,17,0.97)' : 'rgba(253,248,242,0.97)';
  const border = theme === 'dark' ? '#4e2535' : '#f5d4df';
  const surface = theme === 'dark' ? '#1a0d11' : '#fdf8f2';
  const hover = theme === 'dark' ? '#4e2535' : '#fce7ef';

  useEffect(() => {
    if (!searchOpen) return;
    function onOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false); setQuery(''); setResults({ articles: [], categories: [] });
      }
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, [searchOpen]);

  useEffect(() => {
    if (!query.trim()) { setResults({ articles: [], categories: [] }); return; }
    const t = setTimeout(async () => {
      setSearching(true);
      try {
        const [a, c] = await Promise.all([api.searchArticles(query), api.searchCategories(query)]);
        setResults({ articles: a.data || [], categories: c.data || [] });
      } catch { setResults({ articles: [], categories: [] }); }
      finally { setSearching(false); }
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-body font-medium transition-colors duration-200 ${isActive ? '' : ''}`;

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-sm border-b" style={{ backgroundColor: bg, borderColor: border }}>
        <div className="container-max flex items-center h-16 gap-6">
          <Link to="/" className="flex items-center gap-2.5 mr-auto md:mr-0 shrink-0">
            <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)' }}>
              <span className="text-white font-display font-bold text-xs tracking-widest">K</span>
            </div>
            <span className="font-display text-xl font-bold tracking-wide" style={{ color: 'var(--color-text)' }}>
              KYOTO
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 mx-auto">
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.to} to={link.to} end={link.to === '/'}
                className={navClass}
                style={({ isActive }) => ({ color: isActive ? 'var(--color-primary)' : 'var(--color-muted)' })}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            {[
              { icon: <Search size={18} />, action: () => setSearchOpen(o => !o), label: 'Search' },
              { icon: theme === 'light' ? <Moon size={18} /> : <Sun size={18} />, action: toggleTheme, label: 'Toggle theme' },
            ].map(({ icon, action, label }) => (
              <button
                key={label} onClick={action}
                className="p-2 rounded-full transition-colors"
                style={{ color: 'var(--color-muted)' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = hover)}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                aria-label={label}
              >{icon}</button>
            ))}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="md:hidden p-2 rounded-full transition-colors"
              style={{ color: 'var(--color-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = hover)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              aria-label="Menu"
            ><Menu size={20} /></button>
          </div>
        </div>

        {searchOpen && (
          <div ref={searchRef} className="border-t" style={{ borderColor: border, backgroundColor: surface }}>
            <div className="container-max py-4">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-muted)' }} />
                <input
                  autoFocus type="text" value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Caută articole și categorii..."
                  className="input-field pl-9"
                />
              </div>
              {(results.articles.length > 0 || results.categories.length > 0 || searching) && (
                <div className="mt-3 border" style={{ borderColor: border, backgroundColor: theme === 'dark' ? '#2a1420' : '#fff' }}>
                  {searching && <p className="px-4 py-3 text-sm font-body italic" style={{ color: 'var(--color-muted)' }}>Se caută...</p>}
                  {results.categories.length > 0 && (
                    <div>
                      <p className="px-4 pt-3 pb-1 text-xs tracking-widest uppercase font-body font-medium" style={{ color: 'var(--color-muted)' }}>Categorii</p>
                      {results.categories.map(cat => (
                        <button key={cat.id} className="w-full text-left px-4 py-2.5 transition-colors" style={{ color: 'var(--color-text)' }}
                          onMouseEnter={e => (e.currentTarget.style.backgroundColor = hover)}
                          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                          onClick={() => { navigate(`/categories/${cat.slug}`); setSearchOpen(false); setQuery(''); }}>
                          <span className="text-sm font-body">{getCategoryName(cat)}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  {results.articles.length > 0 && (
                    <div>
                      <p className="px-4 pt-3 pb-1 text-xs tracking-widest uppercase font-body font-medium" style={{ color: 'var(--color-muted)' }}>Articole</p>
                      {results.articles.map(art => (
                        <button key={art.id} className="w-full text-left px-4 py-2.5 transition-colors" style={{ color: 'var(--color-text)' }}
                          onMouseEnter={e => (e.currentTarget.style.backgroundColor = hover)}
                          onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                          onClick={() => { navigate(`/articles/${art.slug}`); setSearchOpen(false); setQuery(''); }}>
                          <p className="text-sm font-body">{art.title}</p>
                          {art.category && <p className="text-xs font-body mt-0.5" style={{ color: 'var(--color-muted)' }}>{getCategoryName(art.category)}</p>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setMenuOpen(false)} aria-hidden="true" />
      )}

      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 shadow-2xl transform transition-transform duration-300 ease-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ backgroundColor: surface }}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b" style={{ borderColor: border }}>
          <span className="font-display text-lg font-bold" style={{ color: 'var(--color-text)' }}>Meniu</span>
          <button onClick={() => setMenuOpen(false)} className="p-2 rounded-full transition-colors" style={{ color: 'var(--color-muted)' }} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <nav className="px-6 py-8 flex flex-col gap-1">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to} to={link.to} end={link.to === '/'} onClick={() => setMenuOpen(false)}
              className="py-3 px-4 font-body font-medium text-base transition-colors rounded-none border-b"
              style={({ isActive }) => ({ borderColor: border, color: isActive ? 'var(--color-primary)' : 'var(--color-text)' })}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-6 absolute bottom-8">
          <button onClick={toggleTheme} className="flex items-center gap-3 text-sm font-body transition-colors" style={{ color: 'var(--color-muted)' }}>
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </button>
        </div>
      </div>
    </>
  );
}
