import { FormEvent, useEffect, useId, useState } from 'react';
import PhoneInput, { type Value } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { submitContact } from '../api/client';
import { useContact } from '../context/ContactContext';
import { useI18n } from '../i18n/LanguageContext';
import { nativePhoneLabels } from '../utils/phoneCountryLabels';

const RECIPIENT_EMAIL = 'kaimantravel@gmail.com';

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
  company: string;
};

const EMPTY_FORM: FormState = {
  name: '',
  email: '',
  phone: '',
  message: '',
  company: '',
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

export function ContactToggle() {
  const formId = useId();
  const { t } = useI18n();
  const { open, prefill, openContact, setOpen } = useContact();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, setOpen]);

  useEffect(() => {
    if (!open) {
      setFeedback(null);
      return;
    }

    if (prefill?.message) {
      setForm((current) => ({
        ...current,
        message: prefill.message ?? current.message,
      }));
    }
  }, [open, prefill]);

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
        company: form.company,
      });

      setFeedback({
        type: 'success',
        text: t('contactSuccess'),
      });
      setForm(EMPTY_FORM);

      window.setTimeout(() => setOpen(false), 1800);
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : t('contactSendError'),
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
        aria-label={t('contactOpen')}
        aria-expanded={open}
        aria-controls={formId}
        onClick={() => openContact()}
      >
        <MailIcon />
        <span>{t('contact')}</span>
      </button>

      <div
        className={`contact-panel-backdrop${open ? ' is-open' : ''}`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
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
            <p className="contact-panel-kicker">{t('contactKicker')}</p>
            <h2 id={`${formId}-title`}>{t('contactTitle')}</h2>
            <p className="contact-panel-subtitle">
              {t('contactSubtitle', { email: RECIPIENT_EMAIL })}
            </p>
          </div>
          <button
            type="button"
            className="contact-panel-close"
            aria-label={t('contactClose')}
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </button>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label className="contact-honeypot" aria-hidden="true">
            <span>Empresa</span>
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={form.company}
              onChange={(event) => updateField('company', event.target.value)}
            />
          </label>

          <label className="contact-field">
            <span>{t('contactName')}</span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              required
              minLength={2}
              maxLength={120}
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              placeholder={t('contactNamePh')}
            />
          </label>

          <label className="contact-field">
            <span>{t('contactEmail')}</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
              placeholder={t('contactEmailPh')}
            />
          </label>

          <div className="contact-field">
            <span>
              {t('contactPhone')} <em>{t('contactPhoneOptional')}</em>
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
            <span>{t('contactMessage')}</span>
            <textarea
              name="message"
              required
              minLength={10}
              maxLength={2000}
              rows={5}
              value={form.message}
              onChange={(event) => updateField('message', event.target.value)}
              placeholder={prefill?.message ? prefill.message : t('contactMessagePh')}
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
              onClick={() => setOpen(false)}
              disabled={submitting}
            >
              {t('contactCancel')}
            </button>
            <button type="submit" className="btn primary" disabled={submitting}>
              {submitting ? t('contactSending') : t('contactSend')}
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}
