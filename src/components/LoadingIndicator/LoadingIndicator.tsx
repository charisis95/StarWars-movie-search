import type { LoadingIndicatorProps } from './LoadingIndicator.types';
import './LoadingIndicator.css';

export function LoadingIndicator({ label, compact = false }: LoadingIndicatorProps) {
  return (
    <div className={`loading-indicator${compact ? ' loading-indicator-compact' : ''}`} role="status">
      <span className="loading-indicator-dot" />
      <span className="loading-indicator-dot" />
      <span className="loading-indicator-dot" />
      <span className="visually-hidden">{label}</span>
    </div>
  );
}
