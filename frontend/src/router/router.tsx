import { createBrowserRouter, Navigate } from 'react-router-dom';

import { MainLayout } from '../layout/MainLayout.tsx';
import { NotFoundPage } from '../pages/NotFoundPage.tsx';
import { ROUTER_KEYS } from '../constants/app-keys.const.ts';
import { BoardsPage } from '../pages/BoardsPage.tsx';
import { BoardDetailsPage } from '../pages/BoardDetailsPage.tsx';

export const routerConfig = createBrowserRouter([
  {
    path: ROUTER_KEYS.HOME,
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTER_KEYS.BOARDS} />,
      },
      {
        path: ROUTER_KEYS.BOARDS,
        element: <BoardsPage />,
        children: [],
      },
      {
        path: ROUTER_KEYS.BOARD_ID,
        element: <BoardDetailsPage />,
      },
    ],
  },
]);
