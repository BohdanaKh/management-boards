import { FC } from 'react';

import css from './Boards.module.css';
import { BoardsList } from '../components/BoardsList/Boards/BoardsList.tsx';

const BoardsPage: FC = () => {
  return (
    <div className={css.BoardsContainer}>
      <BoardsList />
    </div>
  );
};

export { BoardsPage };
