import { FC } from 'react';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { RiAddLargeFill } from 'react-icons/ri';
import { useDroppable } from '@dnd-kit/core';

import css from './BoardColumn.module.css';
import { ECardStatus } from '../../enums/CardStatus.enum.ts';
import { Card } from '../Card/Card.tsx';
import { modalActions } from '../../redux/slices/modal.slice.ts';
import { ICardModel } from '../../models/ICardModel.ts';
import { useAppDispatch } from '../../hooks/redux.hooks.ts';

interface IProps {
  title: string;
  items: ICardModel[];
}

const BoardDetailsColumn: FC<IProps> = ({ title, items }) => {
  const dispatch = useAppDispatch();
  const { setNodeRef } = useDroppable({ id: title });
  const itemIds = items?.map((item) => item?._id);

  return (
    <div className={css.section}>
      <h1>{title}</h1>
      <SortableContext
        id={title}
        items={itemIds}
        strategy={verticalListSortingStrategy}
      >
        <div className={css.cards} ref={setNodeRef}>
          {items &&
            items.map((item) => (
              <Card key={item?._id} id={item?._id} task={item} />
            ))}

          {title === ECardStatus.ToDo && (
            <div
              className={css.addAction}
              onClick={() => dispatch(modalActions.setShowModal('card'))}
            >
              <RiAddLargeFill />
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
};

export { BoardDetailsColumn };
