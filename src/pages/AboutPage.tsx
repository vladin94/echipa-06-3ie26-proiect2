import { useEffect, useState } from 'react';
import Layout from '../layouts/Layout';
import LoadingState from '../components/LoadingState';
import { api, getStrapiImageUrl } from '../lib/strapi-api';
import { FALLBACK_ABOUT } from '../lib/fallback';
import { About, TeamMember } from '../types';

function TeamMemberCard({ member, index }: { member: TeamMember; index: number }) {
  const imgUrl = getStrapiImageUrl(member.image);
  const colors = ['bg-amber-700', 'bg-stone-700', 'bg-stone-600', 'bg-amber-800'];
  const initials = member.name.split(' ').map(n => n[0]).join('').slice(0, 2);

  return (
    <div className={`flex flex-col gap-5 p-8 border border-stone-200 dark:border-stone-800 ${index % 2 === 0 ? 'bg-white dark:bg-stone-950' : 'bg-stone-50 dark:bg-stone-900'}`}>
      <div className="flex items-center gap-5">
        {imgUrl ? (
          <img src={imgUrl} alt={member.name} className="w-16 h-16 rounded-full object-cover" />
        ) : (
          <div className={`w-16 h-16 rounded-full ${colors[index % colors.length]} flex items-center justify-center shrink-0`}>
            <span className="font-display text-white text-xl font-bold">{initials}</span>
          </div>
        )}
        <div>
          <h3 className="font-display text-xl font-bold text-stone-900 dark:text-stone-50">{member.name}</h3>
          <p className="font-accent italic text-amber-700 dark:text-amber-500 text-sm mt-0.5">{member.role}</p>
        </div>
      </div>
      <p className="font-body text-stone-600 dark:text-stone-400 text-sm leading-relaxed">{member.bio}</p>
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
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
          <div className="bg-stone-900 flex flex-col justify-center px-8 py-20 md:px-16 md:py-24">
            <p className="font-accent italic text-amber-400 text-xl mb-4">Our Story</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              About <br />
              <em className="italic">This Project</em>
            </h1>
            <p className="font-body text-white/70 text-lg leading-relaxed max-w-lg">
              {loading ? 'Loading...' : (data.intro || '').split('\n')[0]}
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
          <section className="py-20 bg-white dark:bg-stone-950">
            <div className="container-max max-w-4xl">
              <p className="font-accent italic text-amber-700 dark:text-amber-500 text-xl mb-3">Our Mission</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-50 mb-8">
                {data.title}
              </h2>
              {data.intro.split('\n\n').map((para, i) => (
                <p key={i} className="font-body text-stone-600 dark:text-stone-400 text-lg leading-relaxed mb-5">
                  {para}
                </p>
              ))}
            </div>
          </section>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-amber-700 to-transparent" />

          {/* Tech stack badges */}
          <section className="py-14 bg-stone-50 dark:bg-stone-900">
            <div className="container-max">
              <p className="font-accent italic text-center text-amber-700 dark:text-amber-500 text-lg mb-8">Built With</p>
              <div className="flex flex-wrap justify-center gap-4">
                {['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router', 'Strapi CMS', 'Netlify'].map(tech => (
                  <span key={tech} className="px-5 py-2.5 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-body text-sm tracking-wide">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Team */}
          {data.teamMembers && data.teamMembers.length > 0 && (
            <section className="py-20 bg-white dark:bg-stone-950">
              <div className="container-max">
                <div className="mb-12">
                  <p className="font-accent italic text-amber-700 dark:text-amber-500 text-xl mb-3">The Creators</p>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-50">
                    Meet Our Team
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.teamMembers.map((member, i) => (
                    <TeamMemberCard key={member.id || i} member={member} index={i} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Bottom CTA */}
      <section className="bg-amber-700 dark:bg-amber-800 py-16">
        <div className="container-max text-center">
          <p className="font-accent italic text-amber-200 text-xl mb-2">Connect with us</p>
          <h2 className="font-display text-3xl font-bold text-white mb-4">Have a question?</h2>
          <p className="font-body text-amber-100/80 mb-8">We'd love to hear from you.</p>
          <a href="/contact" className="btn-ghost">Get in touch</a>
        </div>
      </section>
    </Layout>
  );
}
