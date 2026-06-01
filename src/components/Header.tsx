import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, Search } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { api } from '../lib/strapi-api';
import { Article, Category } from '../types';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/categories', label: 'Categories' },
  { to: '/about', label: 'About' },
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

  useEffect(() => {
    if (!searchOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setQuery('');
        setResults({ articles: [], categories: [] });
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchOpen]);

  useEffect(() => {
    if (!query.trim()) { setResults({ articles: [], categories: [] }); return; }
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const [artRes, catRes] = await Promise.all([
          api.searchArticles(query),
          api.searchCategories(query),
        ]);
        setResults({
          articles: artRes.data || [],
          categories: catRes.data || [],
        });
      } catch {
        setResults({ articles: [], categories: [] });
      } finally {
        setSearching(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-body font-medium transition-colors duration-200 ${
      isActive
        ? 'text-amber-700 dark:text-amber-500'
        : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
    }`;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-stone-950/95 backdrop-blur-sm border-b border-stone-200 dark:border-stone-800">
        <div className="container-max flex items-center h-16 gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 mr-auto md:mr-0 shrink-0">
            <div className="w-8 h-8 bg-amber-700 dark:bg-amber-600 flex items-center justify-center">
              <span className="text-white font-display font-bold text-xs tracking-widest">K</span>
            </div>
            <span className="font-display text-xl font-bold tracking-wide text-stone-900 dark:text-stone-50">
              KYOTO
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 mx-auto">
            {NAV_LINKS.map(link => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => { setSearchOpen(o => !o); }}
              className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Search"
            >
              <Search size={18} className="text-stone-600 dark:text-stone-400" />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light'
                ? <Moon size={18} className="text-stone-600" />
                : <Sun size={18} className="text-amber-400" />
              }
            </button>

            <button
              onClick={() => setMenuOpen(o => !o)}
              className="md:hidden p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={20} className="text-stone-700 dark:text-stone-300" />
            </button>
          </div>
        </div>

        {/* Search Dropdown */}
        {searchOpen && (
          <div ref={searchRef} className="border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <div className="container-max py-4">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search articles and categories..."
                  className="input-field pl-9"
                />
              </div>
              {(results.articles.length > 0 || results.categories.length > 0 || searching) && (
                <div className="mt-3 border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
                  {searching && <p className="px-4 py-3 text-sm text-stone-400 font-body italic">Searching...</p>}
                  {results.categories.length > 0 && (
                    <div>
                      <p className="px-4 pt-3 pb-1 text-xs tracking-widest uppercase font-body font-medium text-stone-400">Categories</p>
                      {results.categories.map(cat => (
                        <button
                          key={cat.id}
                          className="w-full text-left px-4 py-2.5 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                          onClick={() => { navigate(`/categories/${cat.slug}`); setSearchOpen(false); setQuery(''); }}
                        >
                          <span className="text-sm font-body text-stone-800 dark:text-stone-200">{cat.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  {results.articles.length > 0 && (
                    <div>
                      <p className="px-4 pt-3 pb-1 text-xs tracking-widest uppercase font-body font-medium text-stone-400">Articles</p>
                      {results.articles.map(art => (
                        <button
                          key={art.id}
                          className="w-full text-left px-4 py-2.5 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                          onClick={() => { navigate(`/articles/${art.slug}`); setSearchOpen(false); setQuery(''); }}
                        >
                          <p className="text-sm font-body text-stone-800 dark:text-stone-200">{art.title}</p>
                          {art.category && <p className="text-xs text-stone-400 font-body mt-0.5">{art.category.title}</p>}
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

      {/* Mobile Offcanvas Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Offcanvas Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white dark:bg-stone-950 shadow-2xl transform transition-transform duration-300 ease-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-stone-200 dark:border-stone-800">
          <span className="font-display text-lg font-bold text-stone-900 dark:text-stone-50">Menu</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="px-6 py-8 flex flex-col gap-1">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `py-3 px-4 font-body font-medium text-base transition-colors rounded-none border-b border-stone-100 dark:border-stone-800 ${
                  isActive
                    ? 'text-amber-700 dark:text-amber-500'
                    : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-6 absolute bottom-8">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 text-sm font-body text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </button>
        </div>
      </div>
    </>
  );
}
