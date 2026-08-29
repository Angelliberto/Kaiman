import { FormEvent, useEffect, useId, useState } from 'react';
import PhoneInput, { type Value } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { submitContact } from '../api/client';
import { nativePhoneLabels } from '../utils/phoneCountryLabels';

const RECIPIENT_EMAIL = 'Kaimantravel@gmail.com';

type ContactToggleProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const EMPTY_FORM: FormState = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm0 2 8 5 8-5H4zm16 10V9.2l-8 5-8-5V17h16z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.4 6.4 12 12l5.6-5.6 1.4 1.4L13.4 13.4l5.6 5.6-1.4 1.4L12 14.8l-5.6 5.6-1.4-1.4 5.6-5.6-5.6-5.6z" />
    </svg>
  );
}

export function ContactToggle({ open, onOpenChange }: ContactToggleProps) {
  const formId = useId();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onOpenChange(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) {
      setFeedback(null);
    }
  }, [open]);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (feedback) setFeedback(null);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    try {
      await submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        message: form.message.trim(),
      });

      setFeedback({
        type: 'success',
        text: '¡Mensaje enviado! Te responderemos pronto.',
      });
      setForm(EMPTY_FORM);

      window.setTimeout(() => onOpenChange(false), 1800);
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'No se pudo enviar el mensaje.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className={`contact-fab${open ? ' is-hidden' : ''}`}
        aria-label="Abrir formulario de contacto"
        aria-expanded={open}
        aria-controls={formId}
        onClick={() => onOpenChange(true)}
      >
        <MailIcon />
        <span>Contacto</span>
      </button>

      <div
        className={`contact-panel-backdrop${open ? ' is-open' : ''}`}
        aria-hidden={!open}
        onClick={() => onOpenChange(false)}
      />

      <aside
        id={formId}
        className={`contact-panel${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${formId}-title`}
        aria-hidden={!open}
      >
        <div className="contact-panel-header">
          <div>
            <p className="contact-panel-kicker">Escríbenos</p>
            <h2 id={`${formId}-title`}>¿En qué podemos ayudarte?</h2>
            <p className="contact-panel-subtitle">
              Cuéntanos tu plan de viaje y te responderemos a {RECIPIENT_EMAIL}.
            </p>
          </div>
          <button
            type="button"
            className="contact-panel-close"
            aria-label="Cerrar formulario"
            onClick={() => onOpenChange(false)}
          >
            <CloseIcon />
          </button>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label className="contact-field">
            <span>Nombre *</span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              required
              minLength={2}
              maxLength={120}
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              placeholder="Tu nombre"
            />
          </label>

          <label className="contact-field">
            <span>Email *</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
              placeholder="tu@email.com"
            />
          </label>

          <div className="contact-field">
            <span>
              Teléfono <em>(opcional)</em>
            </span>
            <PhoneInput
              international
              defaultCountry="ES"
              labels={nativePhoneLabels}
              countryCallingCodeEditable={false}
              value={(form.phone || undefined) as Value}
              onChange={(value) => updateField('phone', value ?? '')}
              className="contact-phone-input"
              numberInputProps={{
                name: 'phone',
                autoComplete: 'tel',
                placeholder: '612 345 678',
              }}
            />
          </div>

          <label className="contact-field">
            <span>Mensaje *</span>
            <textarea
              name="message"
              required
              minLength={10}
              maxLength={2000}
              rows={5}
              value={form.message}
              onChange={(event) => updateField('message', event.target.value)}
              placeholder="Cuéntanos destino, fechas, número de personas o lo que necesites..."
            />
          </label>

          {feedback ? (
            <p className={`contact-feedback is-${feedback.type}`} role="status">
              {feedback.text}
            </p>
          ) : null}

          <div className="contact-form-actions">
            <button
              type="button"
              className="btn"
              onClick={() => onOpenChange(false)}
              disabled={submitting}
            >
              Cancelar
            </button>
            <button type="submit" className="btn primary" disabled={submitting}>
              {submitting ? 'Enviando…' : 'Enviar mensaje'}
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}
