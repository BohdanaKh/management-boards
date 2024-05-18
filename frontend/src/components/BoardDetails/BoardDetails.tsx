import {FC} from 'react';
import { RiAddLargeFill } from "react-icons/ri";

import css from "./BoardSections.module.css";
import {ECardStatus} from "../../enums/CardStatus.enum.ts";
import {ICardModel} from "../../models/ICardModel.ts";
import {Card} from "../Card/Card.tsx";
import {useAppDispatch} from "../../hooks/redux.hooks.ts";
import {boardActions} from "../../redux/slices/board.slice.ts";
import {modalActions} from "../../redux/slices/modal.slice.ts";

interface IProps {
    _id: string;
 title: string;
 todos: ICardModel[];
 tasksInProgress: ICardModel[];
 doneTasks: ICardModel[];

}
const BoardDetails: FC<IProps> = ({ _id, title, todos, tasksInProgress, doneTasks }) => {
 const dispatch = useAppDispatch();

   const editBoard = () => {
       dispatch(boardActions.setBoardForUpdate({_id, title}));
       dispatch(modalActions.setShowModal('board'))
   }

 const remove = async (id: string) => {
     await dispatch(boardActions.deleteById({id}));
 }
    return (
        <div className={css.BoardInfo}>
            <div className={css.boardTitle}>
                <div className={css.title}>
            { title && <h2>{title}</h2>}
            { _id && <h3>{`ID: ${_id}`}</h3>}
                </div>
                <div className={css.boardActions}>
                    <button type={'button'} onClick={editBoard}>EDIT</button>
                    <button type={'button'} onClick={() => remove(_id)}>DELETE</button>
                </div>
            </div>
            <div className={css.cardsWrapper}>
                <div className={css.section}>
                    <h1>{ECardStatus.ToDo}</h1>
                    <div className={css.cards}>
                        {
                            todos && todos.map( todo => <Card key={todo._id} task={todo}/> )
                        }
                        <div className={css.addAction} onClick={() => dispatch(modalActions.setShowModal('card'))}><RiAddLargeFill /></div>
                    </div>
                </div>
                <div className={css.section}>
                    <h1>{ECardStatus.InProgress}</h1>
                    <div className={css.cards}>
                        {
                            tasksInProgress && tasksInProgress.map( taskInProgress => <Card key={taskInProgress._id} task={taskInProgress}/> )
                        }
                    </div>
                </div>
                <div className={css.section}>
                    <h1>{ECardStatus.Done}</h1>
                    <div className={css.cards}>
                        {
                            doneTasks && doneTasks.map(doneTask => <Card key={doneTask._id} task={doneTask} /> )
                        }
                    </div>
                </div>

            </div>

        </div>
    );
};

export {BoardDetails};
