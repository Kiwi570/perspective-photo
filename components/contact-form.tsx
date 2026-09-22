'use client';

import { Mail } from 'lucide-react';
import { type FormEvent, useState } from 'react';

import { contact } from '@/lib/site';

const subjects = ['Une œuvre ou une sélection', 'Une carte cadeau', 'Un projet, une exposition', 'Autre demande'];

/** Prépare un e-mail dans la messagerie du visiteur : aucune donnée n'est stockée ni transmise avant l'envoi. */
export function ContactForm() {
  const [subject, setSubject] = useState(subjects[0]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '');
    const message = String(data.get('message') || '');
    const body = encodeURIComponent(`Bonjour ${contact.firstName},\n\n${message}\n\nCordialement,\n${name}`);
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
  }

  return (
    <form onSubmit={submit} className="grid gap-5 rounded-[1.5rem] border border-white/10 bg-carbon p-6 sm:p-8">
      <fieldset>
        <legend className="control-label">Votre demande</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {subjects.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSubject(item)}
              aria-pressed={subject === item}
              className={`chip ${subject === item ? 'is-on' : ''}`}
            >
              {item}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="grid gap-2 text-sm font-bold">
        Votre nom
        <input name="name" required autoComplete="name" className="field" />
      </label>
      <label className="grid gap-2 text-sm font-bold">
        Votre message
        <textarea name="message" required rows={5} className="field" placeholder="Une œuvre, un format, une question…" />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="button-acid">
          <Mail className="size-4" /> Préparer mon e-mail
        </button>
        <p className="text-xs leading-6 text-white/60">
          Le bouton ouvre votre messagerie avec le message prêt. Rien n’est envoyé sans votre accord.
        </p>
      </div>
    </form>
  );
}
