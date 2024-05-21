import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../components/Header/Header.tsx';
import { Footer } from '../components/Footer/Footer.tsx';
import Portal from '../components/Portal/Portal.tsx';
import css from './MainLayout.module.css';

const MainLayout: FC = () => {
  return (
    <div className={css.main}>
      <Header />
      <Outlet />
      <Portal />
      <Footer />
    </div>
  );
};

export { MainLayout };
