import { Link } from 'react-router-dom';
import type { NotFoundScreenProps } from './NotFoundScreen.types';
import './NotFoundScreen.css';

export function NotFoundScreen({ homePath = '/' }: NotFoundScreenProps) {
  return (
    <main className="not-found-screen">
      <p className="not-found-screen-code">404</p>
      <h1>This is not the page you are looking for.</h1>
      <p>The requested route has drifted into a galaxy far, far away.</p>
      <Link to={homePath}>Return to the saga</Link>
    </main>
  );
}
