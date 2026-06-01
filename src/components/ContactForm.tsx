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
    // Frontend-only — simulate submission
    await new Promise(r => setTimeout(r, 800));
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <CheckCircle className="w-12 h-12 text-amber-700 dark:text-amber-500" />
        <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100">Message sent</h3>
        <p className="text-stone-500 dark:text-stone-400 font-body max-w-sm">
          Thank you for reaching out. We will respond within two business days.
        </p>
        <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }} className="btn-outline mt-2">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="label" htmlFor="name">Full Name</label>
          <input id="name" name="name" type="text" required value={form.name} onChange={handle} className="input-field" placeholder="Your name" />
        </div>
        <div>
          <label className="label" htmlFor="email">Email Address</label>
          <input id="email" name="email" type="email" required value={form.email} onChange={handle} className="input-field" placeholder="you@example.com" />
        </div>
      </div>
      <div>
        <label className="label" htmlFor="subject">Subject</label>
        <select id="subject" name="subject" value={form.subject} onChange={handle} className="input-field">
          <option value="">Select a subject</option>
          <option value="general">General Inquiry</option>
          <option value="collaboration">Collaboration</option>
          <option value="editorial">Editorial</option>
          <option value="feedback">Feedback</option>
        </select>
      </div>
      <div>
        <label className="label" htmlFor="message">Message</label>
        <textarea
          id="message" name="message" rows={6} required
          value={form.message} onChange={handle}
          className="input-field resize-none"
          placeholder="Tell us about your inquiry..."
        />
      </div>
      <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed">
        {submitting ? 'Sending...' : <><Send size={14} /> Send Message</>}
      </button>
    </form>
  );
}
