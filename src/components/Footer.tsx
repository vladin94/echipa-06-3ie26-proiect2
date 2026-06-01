import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#1a0d11', color: '#c49aab' }}>
      <div className="container-max py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b" style={{ borderColor: '#4e2535' }}>

          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)' }}>
                <span className="text-white font-display font-bold text-xs tracking-widest">K</span>
              </div>
              <span className="font-display text-2xl font-bold text-white">KYOTO</span>
            </Link>
            <p className="font-body text-sm leading-relaxed max-w-xs" style={{ color: '#c49aab' }}>
              O călătorie editorială prin capitala antică a Japoniei — templele, grădinile, bucătăria, meșteșugurile și tradițiile sale vii.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i} href="#"
                  className="transition-colors"
                  style={{ color: '#7d4456' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fdacc4')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#7d4456')}
                  aria-label="Social"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-body font-medium tracking-widest uppercase mb-5" style={{ color: '#7d4456' }}>Navigare</h4>
            <ul className="space-y-3">
              {[['/', 'Acasă'], ['/categories', 'Categorii'], ['/about', 'Despre'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm font-body transition-colors hover:text-white"
                    style={{ color: '#c49aab' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-body font-medium tracking-widest uppercase mb-5" style={{ color: '#7d4456' }}>Informații</h4>
            <ul className="space-y-3">
              {['Politica de confidențialitate', 'Termeni de utilizare', 'Politica editorială'].map(item => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm font-body transition-colors hover:text-white"
                    style={{ color: '#c49aab' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-body" style={{ color: '#7d4456' }}>
          <p>© {year} KYOTO Editorial. Toate drepturile rezervate.</p>
          <p className="font-accent italic">Un proiect universitar final</p>
        </div>
      </div>
    </footer>
  );
}
