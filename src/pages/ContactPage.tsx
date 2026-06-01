import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Layout from '../layouts/Layout';
import ContactForm from '../components/ContactForm';
import LoadingState from '../components/LoadingState';
import { api, getStrapiImageUrl } from '../lib/strapi-api';
import { Page } from '../types';

const STATIC_CONTACT = {
  title: 'Get in Touch',
  heroText: 'We welcome inquiries from travelers, researchers, and fellow enthusiasts of Japanese culture.',
  cover: null,
  contactDetails: {
    email: 'hello@kyoto-editorial.com',
    phone: '+81 75 123 4567',
    address: 'Gion District, Higashiyama Ward, Kyoto, Japan 605-0073',
  },
};

export default function ContactPage() {
  const [pageData, setPageData] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getContactPage()
      .then(r => {
        const p = Array.isArray(r.data) ? r.data[0] : r.data;
        setPageData(p || null);
      })
      .catch(() => setPageData(null))
      .finally(() => setLoading(false));
  }, []);

  const heroImg = pageData ? getStrapiImageUrl(pageData.cover) : null;
  const title = pageData?.title || STATIC_CONTACT.title;
  const heroText = pageData?.heroText || STATIC_CONTACT.heroText;
  const contact = (pageData?.contactDetails) || STATIC_CONTACT.contactDetails;

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-28 md:py-40 bg-stone-900 overflow-hidden">
        {heroImg ? (
          <img src={heroImg} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-40" />
        ) : (
          <img
            src="https://images.pexels.com/photos/5060281/pexels-photo-5060281.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Kyoto"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
        )}
        <div className="relative z-10 container-max text-center">
          <p className="font-accent italic text-amber-400 text-xl mb-3">Reach Out</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">{title}</h1>
          <p className="font-body text-white/60 text-lg max-w-xl mx-auto">{heroText}</p>
        </div>
      </section>

      {loading ? <LoadingState /> : (
        <section className="py-20 bg-white dark:bg-stone-950">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Contact Info */}
              <div>
                <p className="font-accent italic text-amber-700 dark:text-amber-500 text-xl mb-3">Contact Information</p>
                <h2 className="font-display text-3xl font-bold text-stone-900 dark:text-stone-50 mb-8">
                  Let's start a conversation
                </h2>
                <div className="space-y-6 mb-12">
                  {contact?.email && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                        <Mail size={16} className="text-amber-700 dark:text-amber-500" />
                      </div>
                      <div>
                        <p className="text-xs font-body font-medium tracking-widest uppercase text-stone-400 mb-1">Email</p>
                        <a href={`mailto:${contact.email}`} className="font-body text-stone-800 dark:text-stone-200 hover:text-amber-700 dark:hover:text-amber-500 transition-colors">
                          {contact.email}
                        </a>
                      </div>
                    </div>
                  )}
                  {contact?.phone && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                        <Phone size={16} className="text-amber-700 dark:text-amber-500" />
                      </div>
                      <div>
                        <p className="text-xs font-body font-medium tracking-widest uppercase text-stone-400 mb-1">Phone</p>
                        <p className="font-body text-stone-800 dark:text-stone-200">{contact.phone}</p>
                      </div>
                    </div>
                  )}
                  {contact?.address && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                        <MapPin size={16} className="text-amber-700 dark:text-amber-500" />
                      </div>
                      <div>
                        <p className="text-xs font-body font-medium tracking-widest uppercase text-stone-400 mb-1">Address</p>
                        <p className="font-body text-stone-800 dark:text-stone-200">{contact.address}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                      <Clock size={16} className="text-amber-700 dark:text-amber-500" />
                    </div>
                    <div>
                      <p className="text-xs font-body font-medium tracking-widest uppercase text-stone-400 mb-1">Response Time</p>
                      <p className="font-body text-stone-800 dark:text-stone-200">Within 2 business days</p>
                    </div>
                  </div>
                </div>

                {/* Map embed placeholder */}
                <div className="relative overflow-hidden aspect-video bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                  <iframe
                    title="Kyoto map"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=135.7,34.98,135.8,35.05&layer=mapnik"
                    className="w-full h-full"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 pointer-events-none border border-amber-700/20" />
                </div>
                <p className="text-xs text-stone-400 mt-2 font-body">
                  Map data © <a href="https://www.openstreetmap.org/copyright" className="underline hover:text-amber-700">OpenStreetMap</a> contributors
                </p>
              </div>

              {/* Contact Form */}
              <div>
                <p className="font-accent italic text-amber-700 dark:text-amber-500 text-xl mb-3">Send a Message</p>
                <h2 className="font-display text-3xl font-bold text-stone-900 dark:text-stone-50 mb-8">
                  Write to us
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ strip */}
      <section className="py-16 bg-stone-50 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800">
        <div className="container-max max-w-3xl">
          <p className="font-accent italic text-amber-700 dark:text-amber-500 text-lg mb-6">Common Questions</p>
          <div className="space-y-6">
            {[
              { q: 'Are you open to editorial contributions?', a: 'Yes — we welcome pitches from writers with a deep connection to Kyoto\'s culture, history, or cuisine. Please include a brief bio and two writing samples.' },
              { q: 'Can I use your content for educational purposes?', a: 'Our editorial content is freely available for non-commercial, educational use with attribution. Please contact us for other licensing inquiries.' },
              { q: 'How do I report an error in an article?', a: 'We value accuracy. Use the contact form above with the subject "Editorial feedback" and include the article title and the correction needed.' },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-stone-200 dark:border-stone-700 pb-6">
                <h4 className="font-display text-lg font-bold text-stone-900 dark:text-stone-100 mb-2">{q}</h4>
                <p className="font-body text-stone-600 dark:text-stone-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
