import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useI18n } from '../i18n/LanguageContext';

function CheckIcon() {
  return (
    <svg className="lang-switcher-check" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M3.2 8.4 6.3 11.5 12.8 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type MenuPos = { top: number; left: number; minWidth: number };

export function LanguageSwitcher() {
  const { lang, setLang, languages, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<MenuPos | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const listId = useId();
  const current = languages.find((item) => item.code === lang) ?? languages[0];

  const updatePosition = () => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const menuWidth = Math.max(rect.width, 216);
    const left = Math.min(
      Math.max(8, rect.right - menuWidth),
      window.innerWidth - menuWidth - 8
    );
    setPos({
      top: rect.bottom + 8,
      left,
      minWidth: menuWidth,
    });
  };

  useLayoutEffect(() => {
    if (!open) {
      setPos(null);
      return;
    }
    updatePosition();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    const onReposition = () => updatePosition();

    window.addEventListener('mousedown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onReposition);
    window.addEventListener('scroll', onReposition, true);
    return () => {
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onReposition);
      window.removeEventListener('scroll', onReposition, true);
    };
  }, [open]);

  const menu =
    open && pos
      ? createPortal(
          <ul
            id={listId}
            ref={menuRef}
            className="lang-switcher-menu is-portal"
            role="listbox"
            aria-label={t('language')}
            style={{ top: pos.top, left: pos.left, minWidth: pos.minWidth }}
          >
            {languages.map((item) => {
              const active = item.code === lang;
              return (
                <li key={item.code} role="option" aria-selected={active}>
                  <button
                    type="button"
                    className={`lang-switcher-option${active ? ' is-active' : ''}`}
                    onClick={() => {
                      setLang(item.code);
                      setOpen(false);
                    }}
                  >
                    <span className="lang-switcher-badge" aria-hidden="true">
                      {item.short}
                    </span>
                    <span className="lang-switcher-option-label">{item.label}</span>
                    {active ? <CheckIcon /> : null}
                  </button>
                </li>
              );
            })}
          </ul>,
          document.body
        )
      : null;

  return (
    <div className={`lang-switcher${open ? ' is-open' : ''}`}>
      <button
        ref={triggerRef}
        type="button"
        className="lang-switcher-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={t('chooseLanguage')}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="lang-switcher-badge" aria-hidden="true">
          {current.short}
        </span>
        <span className="lang-switcher-label">{current.label}</span>
        <span className="lang-switcher-caret" aria-hidden="true">
          ▾
        </span>
      </button>
      {menu}
    </div>
  );
}
