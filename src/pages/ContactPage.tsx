import { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Layout from '../layouts/Layout';
import ContactForm from '../components/ContactForm';

const CONTACT = {
  email: 'hello@kyoto-editorial.com',
  phone: '+81 75 123 4567',
  address: 'Gion District, Higashiyama Ward, Kyoto, Japan 605-0073',
};

const FAQ = [
  {
    q: 'Acceptați contribuții editoriale?',
    a: 'Da — acceptăm propuneri de la scriitori cu o legătură profundă cu cultura, istoria sau bucătăria Kyoto-ului. Includeți o scurtă biografie și două mostre de scriere.',
  },
  {
    q: 'Pot folosi conținutul vostru în scop educațional?',
    a: 'Conținutul nostru editorial este disponibil gratuit pentru uz educațional necomercial, cu atribuire. Contactați-ne pentru alte solicitări de licențiere.',
  },
  {
    q: 'Cum raportez o eroare într-un articol?',
    a: 'Folosiți formularul de contact cu subiectul "Feedback editorial" și includeți titlul articolului și corecția necesară.',
  },
];

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

function ContactItem({ icon, label, value }: ContactItemProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ backgroundColor: '#fff0f5' }}>
        <span style={{ color: 'var(--color-primary)' }}>{icon}</span>
      </div>
      <div>
        <p className="text-xs font-body font-medium tracking-widest uppercase mb-1" style={{ color: 'var(--color-muted)' }}>{label}</p>
        <div className="font-body text-sm" style={{ color: 'var(--color-text)' }}>{value}</div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [_sent] = useState(false);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-28 md:py-40 overflow-hidden" style={{ backgroundColor: '#1a0d11' }}>
        <img
          src="https://images.pexels.com/photos/5060281/pexels-photo-5060281.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Kyoto"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 container-max text-center">
          <p className="font-accent italic text-xl mb-3" style={{ color: '#fdacc4' }}>Contactează-ne</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">Ia Legătura cu Noi</h1>
          <p className="font-body text-white/60 text-lg max-w-xl mx-auto">
            Bun venit oricăror întrebări din partea călătorilor, cercetătorilor și pasionaților de cultură japoneză.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Contact info */}
            <div>
              <p className="font-accent italic text-xl mb-3" style={{ color: 'var(--color-primary)' }}>Informații de contact</p>
              <h2 className="font-display text-3xl font-bold mb-8" style={{ color: 'var(--color-text)' }}>
                Hai să începem o conversație
              </h2>
              <div className="space-y-6 mb-12">
                <ContactItem
                  icon={<Mail size={16} />}
                  label="Email"
                  value={
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="transition-colors"
                      style={{ color: 'var(--color-text)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text)')}
                    >
                      {CONTACT.email}
                    </a>
                  }
                />
                <ContactItem icon={<Phone size={16} />} label="Telefon" value={CONTACT.phone} />
                <ContactItem icon={<MapPin size={16} />} label="Adresă" value={CONTACT.address} />
                <ContactItem icon={<Clock size={16} />} label="Timp de răspuns" value="În 2 zile lucrătoare" />
              </div>

              {/* Map */}
              <div className="relative overflow-hidden aspect-video border" style={{ borderColor: 'var(--color-border)' }}>
                <iframe
                  title="Harta Kyoto"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=135.7,34.98,135.8,35.05&layer=mapnik"
                  className="w-full h-full"
                  loading="lazy"
                />
                <div className="absolute inset-0 pointer-events-none border" style={{ borderColor: 'rgba(222,31,86,0.2)' }} />
              </div>
              <p className="text-xs mt-2 font-body" style={{ color: 'var(--color-muted)' }}>
                Date hartă ©{' '}
                <a
                  href="https://www.openstreetmap.org/copyright"
                  className="underline"
                  style={{ color: 'var(--color-primary)' }}
                >
                  OpenStreetMap
                </a>{' '}
                contributors
              </p>
            </div>

            {/* Form */}
            <div>
              <p className="font-accent italic text-xl mb-3" style={{ color: 'var(--color-primary)' }}>Trimite un mesaj</p>
              <h2 className="font-display text-3xl font-bold mb-8" style={{ color: 'var(--color-text)' }}>
                Scrie-ne
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 border-t" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <div className="container-max max-w-3xl">
          <p className="font-accent italic text-lg mb-6" style={{ color: 'var(--color-primary)' }}>Întrebări frecvente</p>
          <div className="space-y-6">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="border-b pb-6" style={{ borderColor: 'var(--color-border)' }}>
                <h4 className="font-display text-lg font-bold mb-2" style={{ color: 'var(--color-text)' }}>{q}</h4>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
