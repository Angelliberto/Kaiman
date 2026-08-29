import { NavLink, Outlet, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import { FiMail, FiPhone } from 'react-icons/fi';
import { fetchSiteInfo } from '../api/client';
import { ContactToggle } from './ContactToggle';
import { ScrollToTop } from './ScrollToTop';
import type { SiteInfo } from '../types';

const LOGO_SRC = '/images/logo/kaiman logo_logo.png';
const FOOTER_LOGO_SRC = '/images/logo/kaiman-logo-white.svg';

const CONTACT = {
  phone: '+584249055466',
  phoneHref: 'tel:+584249055466',
  email: 'Kaimantravel@gmail.com',
  social: {
    instagram: 'https://instagram.com/kaimantravel',
    facebook: 'https://www.facebook.com/coorporacionKaiman',
    whatsapp: 'https://wa.me/584249055466',
  },
};

export function Layout() {
  const [site, setSite] = useState<SiteInfo | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    fetchSiteInfo().then(setSite).catch(() => null);
  }, []);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash !== '#contacto') return;
      setContactOpen(true);
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    };

    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  return (
    <div className="app-shell">
      <ScrollToTop />
      <header className="topbar">
        <div className="topbar-inner">
          <NavLink to="/" className="brand">
            <img src={LOGO_SRC} alt="Kaiman Travel" className="brand-logo" />
          </NavLink>

          <div className="topbar-nav-wrap">
            <nav className="nav" aria-label="Principal">
            <Link to="/destino/roraima">
              <span className="nav-label nav-label-full">Explorar destinos</span>
              <span className="nav-label nav-label-short">Destinos</span>
            </Link>
              <button
                type="button"
                className="nav-contact-trigger"
                onClick={() => setContactOpen(true)}
              >
                Contacto
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="page">
        <Outlet />
      </main>

      <footer className="site-footer" id="contacto">
        <div className="site-footer-inner">
          <div className="site-footer-columns">
            <div className="footer-col footer-col-brand">
              <Link to="/" className="footer-logo-link">
                <img
                  src={FOOTER_LOGO_SRC}
                  alt={site?.hostName ?? 'Kaiman Travel'}
                  className="footer-logo"
                />
              </Link>
              <p className="footer-tagline">Tus sueños, nuestros destinos</p>
            </div>

            <div className="footer-col footer-col-contact">
              <h3 className="footer-heading">Contacto</h3>
              <div className="footer-contact-list">
                <a href={CONTACT.phoneHref} className="footer-contact-item">
                  <span className="footer-contact-icon" aria-hidden="true">
                    <FiPhone />
                  </span>
                  <span>+58 424 9055466</span>
                </a>
                <a href={`mailto:${CONTACT.email}`} className="footer-contact-item">
                  <span className="footer-contact-icon" aria-hidden="true">
                    <FiMail />
                  </span>
                  <span>{CONTACT.email}</span>
                </a>
              </div>
            </div>

            <div className="footer-col footer-col-social">
              <h3 className="footer-heading">Síguenos</h3>
              <div className="footer-social-icons social-icons">
                <a
                  href={CONTACT.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href={CONTACT.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
                <a
                  href={CONTACT.social.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>

          <p className="footer-copy">
            © {new Date().getFullYear()} KAIMAN · Turismo en Venezuela
          </p>
        </div>
      </footer>

      <ContactToggle open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
}
