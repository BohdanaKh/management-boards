import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import css from './Card.module.css';
import { ICardModel } from '../../models/ICardModel.ts';
import { useAppDispatch } from '../../hooks/redux.hooks.ts';
import { cardActions } from '../../redux/slices/card.slice.ts';
import { modalActions } from '../../redux/slices/modal.slice.ts';

interface IProps {
  id: string;
  task: ICardModel;
}

const Card: FC<IProps> = ({ task, id }) => {
  const { boardId } = useParams();
  const { _id, name, description } = task;
  const dispatch = useAppDispatch();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const editCard = (task: ICardModel): void => {
    dispatch(cardActions.setCardForUpdate(task));
    dispatch(modalActions.setShowModal('card'));
  };

  const deleteCard = async (id: string): Promise<void> => {
    await dispatch(cardActions.deleteCardById({ boardId, id }));
  };

  return (
    <div
      className={css.Card}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      <div className={css.cardContent}>
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
      <div className={css.cardActions}>
        <button type={'button'} onMouseDown={() => editCard(task)}>
          <FaRegEdit className={css.cardActionsIcons} />
        </button>
        <button type={'button'} onMouseDown={() => deleteCard(_id)}>
          <RiDeleteBin6Line className={css.cardActionsIcons} />
        </button>
      </div>
    </div>
  );
};

export { Card };
