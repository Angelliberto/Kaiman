import { NavLink, Outlet, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchSiteInfo } from '../api/client';
import type { SiteInfo } from '../types';

const LOGO_SRC = '/images/logo/kaiman logo_logo.png';

const CONTACT = {
  phone: '+584249055466',
  phoneHref: 'tel:+584249055466',
  email: 'Kaimantravel@gmail.com',
  social: {
    instagram: 'https://instagram.com/kaimantravel',
    facebook: 'https://facebook.com/kaimantravel',
    whatsapp: 'https://wa.me/584249055466',
  },
};

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM18 6.8a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13.5 22v-8.3H16l.4-3.7h-2.9V8.1c0-1 .3-1.7 1.9-1.7H16.5V3.1A23 23 0 0 0 14.8 3c-2.7 0-4.6 1.6-4.6 4.6V10H8v3.7h2.2V22h3.3z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.7 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 0 1 6.4 12.8l.2.3-.3 1.1-1.1.3-.3-.2A8 8 0 1 1 12 4zm-1.1 3.5c.2 0 .5.1.7.3.3.4.8 1.1.9 1.8 0 .4-.1.9-.5 1.3l-.4.4c-.1.1-.1.2 0 .4.3.7.9 1.4 1.6 1.8.2.1.3.1.4 0l.5-.5c.4-.4.9-.5 1.3-.3.7.3 1.4.8 1.8.9.4.1.9 0 1.3-.5.2-.3.3-.6.3-.9 0-.1-.1-.2-.2-.3-1.1-.9-2.4-1.5-3.8-1.7-.2 0-.3 0-.4.1l-.2.2c-.5.5-1.3.4-1.7-.1-.4-.5-.3-1.3.2-1.7l.2-.2c.1-.1.1-.2.1-.3-.2-1.4-.8-2.7-1.7-3.8-.1-.1-.2-.2-.3-.2z" />
    </svg>
  );
}

export function Layout() {
  const [site, setSite] = useState<SiteInfo | null>(null);

  useEffect(() => {
    fetchSiteInfo().then(setSite).catch(() => null);
  }, []);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <NavLink to="/" className="brand">
            <img src={LOGO_SRC} alt="Kaiman Travel" className="brand-logo" />
          </NavLink>

          <div className="topbar-nav-wrap">
            <nav className="nav" aria-label="Principal">
            <Link to="/destino/roraima">
              Explorar destinos
            </Link>
              <a href="/#contacto">Contacto</a>
              <NavLink to="/destino/isla-de-margarita">Hospedajes</NavLink>
            </nav>
          </div>
        </div>
      </header>

      <main className="page">
        <Outlet />
      </main>

      <footer className="site-footer" id="contacto">
        <div className="site-footer-inner">
          <div className="footer-brand">
            <strong>{site?.hostName ?? 'KAIMAN'}</strong>
            <p>Descubre Venezuela: tepuyes, cascadas, selva y Caribe.</p>
          </div>

          <div className="footer-contact-block">
            <h3>Contacto</h3>
            <a href={CONTACT.phoneHref} className="footer-contact-item">
              {CONTACT.phone}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="footer-contact-item">
              {CONTACT.email}
            </a>
          </div>

          <div className="footer-social">
            <h3>Síguenos</h3>
            <div className="social-icons">
              <a
                href={CONTACT.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href={CONTACT.social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href={CONTACT.social.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} KAIMAN · Turismo en Venezuela</p>
      </footer>
    </div>
  );
}
