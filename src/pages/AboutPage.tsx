import { useEffect, useState } from 'react';
import Layout from '../layouts/Layout';
import LoadingState from '../components/LoadingState';
import { api, getStrapiImageUrl } from '../lib/strapi-api';
import { FALLBACK_ABOUT } from '../lib/fallback';
import type { About, TeamMember } from '../types';

const TECH_STACK = ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router', 'Strapi CMS', 'Netlify'];

function TeamMemberCard({ member, index }: { member: TeamMember; index: number }) {
  const imgUrl = getStrapiImageUrl(member.image);
  const avatarColors = ['var(--color-primary)', '#6b4c5e', '#8b3a5e', '#c41f46'];
  const initials = member.name.split(' ').map(n => n[0]).join('').slice(0, 2);
  const isEven = index % 2 === 0;

  return (
    <div
      className="flex flex-col gap-5 p-8 border"
      style={{
        backgroundColor: isEven ? 'var(--color-bg)' : 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="flex items-center gap-5">
        {imgUrl ? (
          <img src={imgUrl} alt={member.name} className="w-16 h-16 rounded-full object-cover" />
        ) : (
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: avatarColors[index % avatarColors.length] }}
          >
            <span className="font-display text-white text-xl font-bold">{initials}</span>
          </div>
        )}
        <div>
          <h3 className="font-display text-xl font-bold" style={{ color: 'var(--color-text)' }}>{member.name}</h3>
          <p className="font-accent italic text-sm mt-0.5" style={{ color: 'var(--color-primary)' }}>{member.role}</p>
        </div>
      </div>
      <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{member.bio}</p>
    </div>
  );
}

export default function AboutPage() {
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAbout()
      .then(r => setAbout(r.data || FALLBACK_ABOUT))
      .catch(() => setAbout(FALLBACK_ABOUT))
      .finally(() => setLoading(false));
  }, []);

  const data = about || FALLBACK_ABOUT;

  return (
    <Layout>
      {/* Hero split */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
          <div className="flex flex-col justify-center px-8 py-20 md:px-16 md:py-24" style={{ backgroundColor: '#1a0d11' }}>
            <p className="font-accent italic text-xl mb-4" style={{ color: '#fdacc4' }}>Povestea Noastră</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Cine<br /><em>Suntem Noi</em>
            </h1>
            <p className="font-body text-white/70 text-lg leading-relaxed max-w-lg">
              {loading ? 'Se încarcă...' : (data.intro || '').split('\n')[0]}
            </p>
          </div>
          <div className="relative min-h-[40vh] lg:min-h-0">
            <img
              src="https://images.pexels.com/photos/1829980/pexels-photo-1829980.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Kyoto"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {loading ? <LoadingState /> : (
        <>
          {/* Mission */}
          <section className="py-20" style={{ backgroundColor: 'var(--color-bg)' }}>
            <div className="container-max max-w-4xl">
              <p className="font-accent italic text-xl mb-3" style={{ color: 'var(--color-primary)' }}>Misiunea Noastră</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-8" style={{ color: 'var(--color-text)' }}>
                {data.title}
              </h2>
              {data.intro.split('\n\n').map((para, i) => (
                <p key={i} className="font-body text-lg leading-relaxed mb-5" style={{ color: 'var(--color-muted)' }}>
                  {para}
                </p>
              ))}
            </div>
          </section>

          {/* Divider */}
          <div className="h-px" style={{ backgroundImage: 'linear-gradient(to right, transparent, var(--color-primary), transparent)' }} />

          {/* Tech stack */}
          <section className="py-14" style={{ backgroundColor: 'var(--color-surface)' }}>
            <div className="container-max">
          <p className="font-accent italic text-center text-lg mb-8" style={{ color: 'var(--color-primary)' }}>Construit cu</p>
              <div className="flex flex-wrap justify-center gap-4">
                {TECH_STACK.map(tech => (
                  <span
                    key={tech}
                    className="px-5 py-2.5 border font-body text-sm tracking-wide"
                    style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Team */}
          {data.teamMembers && data.teamMembers.length > 0 && (
            <section className="py-20" style={{ backgroundColor: 'var(--color-bg)' }}>
              <div className="container-max">
                <div className="mb-12">
              <p className="font-accent italic text-xl mb-3" style={{ color: 'var(--color-primary)' }}>Creatorii</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold" style={{ color: 'var(--color-text)' }}>
                Echipa Noastră
              </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.teamMembers.map((member, i) => (
                    <TeamMemberCard key={member.id ?? i} member={member} index={i} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="container-max text-center">
          <p className="font-accent italic text-xl mb-2" style={{ color: 'rgba(253,172,196,0.9)' }}>Contactează-ne</p>
          <h2 className="font-display text-3xl font-bold text-white mb-4">Ai o întrebare?</h2>
          <p className="font-body mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>Ne-ar face plăcere să te auzim.</p>
          <a href="/contact" className="btn-ghost">Ia legătura cu noi</a>
        </div>
      </section>
    </Layout>
  );
}
