import { FormEvent, useEffect, useState } from 'react';
import {
  adminLogin,
  createAdminDeparture,
  deleteAdminDeparture,
  fetchAdminDepartures,
  getAdminToken,
  setAdminToken,
} from '../api/client';
import { TourDeparturesCalendar } from '../components/TourDeparturesCalendar';
import type { TourDeparture } from '../types';

const DESTINATION_ID = 'salto-angel';

export function AdminPage() {
  const [token, setToken] = useState<string | null>(() => getAdminToken());
  const [password, setPassword] = useState('');
  const [departures, setDepartures] = useState<TourDeparture[]>([]);
  const [leadDays, setLeadDays] = useState(7);
  const [selectedStart, setSelectedStart] = useState<string | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const loadDepartures = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdminDepartures(DESTINATION_ID);
      setDepartures(data.departures);
      setLeadDays(data.leadDays);
    } catch (err) {
      setError((err as Error).message);
      if ((err as Error).message.toLowerCase().includes('no autorizado')) {
        setAdminToken(null);
        setToken(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;
    void loadDepartures();
  }, [token]);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await adminLogin(password);
      setAdminToken(result.token);
      setToken(result.token);
      setPassword('');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setAdminToken(null);
    setToken(null);
    setDepartures([]);
    setSelectedStart(null);
    setSelectedEnd(null);
  };

  const handleDayClick = async (dateKey: string) => {
    setNotice(null);
    setError(null);

    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(dateKey);
      setSelectedEnd(null);
      return;
    }

    const startDate = selectedStart <= dateKey ? selectedStart : dateKey;
    const endDate = selectedStart <= dateKey ? dateKey : selectedStart;
    setSelectedEnd(endDate);

    setLoading(true);
    try {
      await createAdminDeparture({
        destinationId: DESTINATION_ID,
        startDate,
        endDate,
      });
      setNotice(`Salida creada: ${startDate} → ${endDate}`);
      setSelectedStart(null);
      setSelectedEnd(null);
      await loadDepartures();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDepartureClick = async (departure: TourDeparture) => {
    const ok = window.confirm(
      `¿Eliminar la salida ${departure.startDate} → ${departure.endDate}?`
    );
    if (!ok) return;

    setLoading(true);
    setError(null);
    try {
      await deleteAdminDeparture(departure.id);
      setNotice('Salida eliminada');
      await loadDepartures();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="page-stack admin-page">
        <section className="panel admin-login-panel">
          <div className="panel-header">
            <p className="section-kicker">Administración</p>
            <h1>Salidas Salto Ángel</h1>
          </div>
          <form className="panel-body admin-login-form" onSubmit={handleLogin}>
            <label>
              Contraseña
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
              />
            </label>
            {error && <div className="error-box">{error}</div>}
            <button type="submit" className="btn primary" disabled={loading}>
              {loading ? 'Entrando…' : 'Entrar'}
            </button>
          </form>
        </section>
      </div>
    );
  }

  return (
    <div className="page-stack admin-page">
      <section className="panel">
        <div className="panel-header section-panel-header admin-header">
          <div>
            <p className="section-kicker">Administración</p>
            <h1>Calendario de salidas · Salto Ángel</h1>
          </div>
          <button type="button" className="btn" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>

        <div className="panel-body">
          {error && <div className="error-box">{error}</div>}
          {notice && <div className="state-box">{notice}</div>}
          {loading && <p className="muted">Actualizando…</p>}

          <TourDeparturesCalendar
            departures={departures}
            leadDays={leadDays}
            interactive
            selectedStart={selectedStart}
            selectedEnd={selectedEnd}
            onDayClick={handleDayClick}
            onDepartureClick={handleDepartureClick}
          />
        </div>
      </section>
    </div>
  );
}
