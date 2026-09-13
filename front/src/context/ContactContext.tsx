import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type ContactPrefill = {
  message?: string;
};

type ContactContextValue = {
  open: boolean;
  prefill: ContactPrefill | null;
  openContact: (prefill?: ContactPrefill) => void;
  closeContact: () => void;
  setOpen: (open: boolean) => void;
};

const ContactContext = createContext<ContactContextValue | null>(null);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpenState] = useState(false);
  const [prefill, setPrefill] = useState<ContactPrefill | null>(null);

  const openContact = useCallback((next?: ContactPrefill) => {
    setPrefill(next ?? null);
    setOpenState(true);
  }, []);

  const closeContact = useCallback(() => {
    setOpenState(false);
  }, []);

  const setOpen = useCallback((next: boolean) => {
    setOpenState(next);
    if (!next) {
      /* keep prefill until closed so form can still show it while animating out */
    }
  }, []);

  const value = useMemo(
    () => ({ open, prefill, openContact, closeContact, setOpen }),
    [open, prefill, openContact, closeContact, setOpen]
  );

  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>;
}

export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) {
    throw new Error('useContact debe usarse dentro de ContactProvider');
  }
  return ctx;
}
