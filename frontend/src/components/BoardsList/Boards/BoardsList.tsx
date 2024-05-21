import { FC, useEffect } from 'react';

import css from './BoardsList.module.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks.ts';
import { boardActions } from '../../../redux/slices/board.slice.ts';
import { Board } from '../Board/Board.tsx';

const BoardsList: FC = () => {
  const { boards } = useAppSelector((state) => state.boardReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(boardActions.getAll());
  }, [dispatch]);
  return (
    <div className={css.boardsList}>
      {boards && boards.map((board) => <Board key={board._id} board={board} />)}
    </div>
  );
};

export { BoardsList };
