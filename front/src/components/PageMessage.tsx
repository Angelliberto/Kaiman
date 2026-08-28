import type { ReactNode } from 'react';

interface PageMessageProps {
  children: ReactNode;
  actions?: ReactNode;
}

export function PageMessage({ children, actions }: PageMessageProps) {
  return (
    <div className="page-stack">
      <div className="panel page-message">
        <div className="panel-body">
          {children}
          {actions ? <div className="page-message-actions">{actions}</div> : null}
        </div>
      </div>
    </div>
  );
}
