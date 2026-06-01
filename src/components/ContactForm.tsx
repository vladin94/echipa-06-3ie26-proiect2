import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <CheckCircle className="w-12 h-12" style={{ color: 'var(--color-primary)' }} />
        <h3 className="font-display text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Mesaj trimis</h3>
        <p className="font-body max-w-sm" style={{ color: 'var(--color-muted)' }}>
          Mulțumim că ne-ai contactat. Vom răspunde în termen de două zile lucrătoare.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
          className="btn-outline mt-2"
        >
          Trimite alt mesaj
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="label" htmlFor="name">Nume complet</label>
          <input id="name" name="name" type="text" required value={form.name} onChange={handle} className="input-field" placeholder="Numele tău" />
        </div>
        <div>
          <label className="label" htmlFor="email">Adresă de email</label>
          <input id="email" name="email" type="email" required value={form.email} onChange={handle} className="input-field" placeholder="tu@exemplu.com" />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="subject">Subiect</label>
        <select id="subject" name="subject" value={form.subject} onChange={handle} className="input-field">
          <option value="">Selectează un subiect</option>
          <option value="general">Întrebare generală</option>
          <option value="collaboration">Colaborare</option>
          <option value="editorial">Editorial</option>
          <option value="feedback">Feedback</option>
        </select>
      </div>
      <div>
        <label className="label" htmlFor="message">Mesaj</label>
        <textarea
          id="message" name="message" rows={6} required
          value={form.message} onChange={handle}
          className="input-field resize-none"
          placeholder="Spune-ne despre solicitarea ta..."
        />
      </div>
      <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed">
        {submitting ? 'Se trimite...' : <><Send size={14} /> Trimite mesajul</>}
      </button>
    </form>
  );
}
