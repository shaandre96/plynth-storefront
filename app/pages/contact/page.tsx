'use client';

import { useState, type FormEvent } from 'react';
import { ArrowIcon, CheckIcon } from '@/components/icons';

type Topic = 'general' | 'order' | 'press' | 'wholesale';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: 'general' as Topic,
    message: '',
  });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    // eslint-disable-next-line no-console
    console.log('Plynth — contact form (simulated):', form);
    setSent(true);
    setSubmitting(false);
  };

  return (
    <main className="relative">
      <div className="mx-auto max-w-page px-6 py-14 md:px-10 md:py-20 lg:px-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="mb-5 flex items-center gap-3">
              <span className="block h-px w-8 bg-accent" />
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
                Get in touch
              </span>
            </div>
            <h1 className="font-serif text-[44px] leading-[1.04] tracking-[-0.01em] text-ink md:text-[52px]">
              Say hello.{' '}
              <em className="italic text-accent">We&rsquo;ll write back.</em>
            </h1>
            <p className="mt-6 text-[16.5px] leading-[1.7] text-muted">
              For order help, partnerships, or just a kind note — drop us a line. Every email
              lands in our shared inbox; you&rsquo;ll usually hear back within two business days.
            </p>

            <div className="prose-plynth mt-8 space-y-2 text-[15px]">
              <p>
                <strong>Studio.</strong> 14 Sydney Road, Brunswick VIC 3056.
              </p>
              <p>
                <strong>Email.</strong>{' '}
                <a href="mailto:hello@plynth.studio">hello@plynth.studio</a>
              </p>
              <p>
                <strong>Press.</strong>{' '}
                <a href="mailto:press@plynth.studio">press@plynth.studio</a>
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            {sent ? (
              <div className="card-paper rounded-[14px] p-8 md:p-10">
                <div className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white">
                  <CheckIcon width={20} height={20} />
                </div>
                <div className="relative z-10 mt-6 font-serif text-[28px] text-ink">
                  Got it. We&rsquo;ll be in touch.
                </div>
                <p className="relative z-10 mt-3 text-[14.5px] leading-[1.7] text-muted">
                  Your message is queued in our shared inbox. We reply within two business days —
                  usually faster.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="card-paper rounded-[14px] p-7 md:p-9">
                <div className="relative z-10 space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="search-input w-full rounded-[10px] px-4 py-3 text-[14.5px] outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="search-input w-full rounded-[10px] px-4 py-3 text-[14.5px] outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="topic"
                      className="mb-2 block font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted"
                    >
                      Topic
                    </label>
                    <select
                      id="topic"
                      value={form.topic}
                      onChange={(e) => setForm({ ...form, topic: e.target.value as Topic })}
                      className="search-input w-full rounded-[10px] px-4 py-3 text-[14.5px] outline-none"
                    >
                      <option value="general">General question</option>
                      <option value="order">Help with an order</option>
                      <option value="press">Press enquiry</option>
                      <option value="wholesale">Wholesale</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted"
                    >
                      Your message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="search-input w-full resize-none rounded-[10px] px-4 py-3 text-[14.5px] outline-none"
                      placeholder="What can we help with?"
                    />
                  </div>

                  <div className="flex items-center gap-5 pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="cta-amber inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-[14px] font-medium"
                    >
                      {submitting ? 'Sending…' : 'Send message'}
                      <ArrowIcon style={{ width: 13, height: 13 }} />
                    </button>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
                      Simulated — no email is sent
                    </span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
