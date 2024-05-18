import {FC} from 'react';
import {useParams} from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

import css from "./Card.module.css";
import {ICardModel} from "../../models/ICardModel.ts";
import {useAppDispatch} from "../../hooks/redux.hooks.ts";
import {cardActions} from "../../redux/slices/card.slice.ts";
import {modalActions} from "../../redux/slices/modal.slice.ts";

interface IProps {
task: ICardModel;
}

const Card: FC<IProps> = ({ task}) => {
    const { boardId } = useParams();
    const { _id, name, description } = task;
const dispatch = useAppDispatch();

    const editCard = (task: ICardModel) => {
        dispatch(cardActions.setCardForUpdate(task));
        dispatch(modalActions.setShowModal('card'))
    }

const deleteCard = async (id: string) => {
  await dispatch(cardActions.deleteCardById({boardId, id}))
}
    return (
        <div className={css.Card}>
            <div className={css.cardContent}>
            <h2>{name}</h2>
            <p>{description}</p>
            </div>
            <div className={css.cardActions}>
            <button onClick={() => editCard(task)}><FaRegEdit /></button>
            <button onClick={() => deleteCard(_id)}><RiDeleteBin6Line /></button>
            </div>
        </div>
    );
};

export {Card};
