import type { FeedbackMessageProps } from './FeedbackMessage.types';
import './FeedbackMessage.css';

export function FeedbackMessage({
  title,
  message,
  tone = 'neutral',
}: FeedbackMessageProps) {
  return (
    <div className={`feedback-message feedback-message-${tone}`} role={tone === 'error' ? 'alert' : 'status'}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
