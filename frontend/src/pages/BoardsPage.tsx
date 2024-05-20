import { FC } from 'react';

import css from './Boards.module.css';
import { BoardsList } from '../components/BoardsList/Boards/BoardsList.tsx';

interface IProps {}

const BoardsPage: FC<IProps> = () => {
  return (
    <div className={css.BoardsContainer}>
      <BoardsList />
    </div>
  );
};

export { BoardsPage };
