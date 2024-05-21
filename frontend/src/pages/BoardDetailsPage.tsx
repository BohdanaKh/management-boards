import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import css from './BoardDetails.module.css';
import { BoardDetails } from '../components/BoardDetails/BoardDetails.tsx';
import { ICardModel } from '../models/ICardModel.ts';
import { ECardStatus } from '../enums/CardStatus.enum.ts';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hooks.ts';
import { boardActions } from '../redux/slices/board.slice.ts';

export interface ITaskList {
  [key: string]: ICardModel[];
}

const BoardDetailsPage: FC = () => {
  const { boardId } = useParams();

  const { board } = useAppSelector((state) => state.boardReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (boardId) {
      void dispatch(boardActions.getById(boardId));
    }
  }, [dispatch, boardId]);

  if (board) {
    const cardsSections: ITaskList = board?.cards.reduce(
      (acc, current) => {
        switch (current.status) {
          case 'To Do':
            acc['To Do'].push(current);
            break;
          case 'In Progress':
            acc['In Progress'].push(current);
            break;
          case 'Done':
            acc['Done'].push(current);
            break;
        }
        return acc;
      },
      {
        [ECardStatus.ToDo]: [],
        [ECardStatus.InProgress]: [],
        [ECardStatus.Done]: [],
      }
    );

    return (
      <div className={css.BoardDetailsContainer}>
        <BoardDetails
          _id={board?._id}
          title={board?.title}
          cardsSections={cardsSections}
        />
      </div>
    );
  }
};

export { BoardDetailsPage };
