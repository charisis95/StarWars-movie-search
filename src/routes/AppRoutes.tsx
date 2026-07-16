import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout/MainLayout';
import { NotFoundScreen } from '../screens/NotFoundScreen/NotFoundScreen';
import { SagaScreen } from '../screens/SagaScreen/SagaScreen';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<SagaScreen />} />
        <Route path="films/:episodeId" element={<SagaScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Route>
    </Routes>
  );
}
