import {FC, useState} from 'react';
import { DndContext, DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {useNavigate, useParams} from "react-router-dom";

import css from "./BoardSections.module.css";
import {useAppDispatch} from "../../hooks/redux.hooks.ts";
import {boardActions} from "../../redux/slices/board.slice.ts";
import {modalActions} from "../../redux/slices/modal.slice.ts";
import {ITaskList} from "../../pages/BoardDetailsPage.tsx";
import {BoardDetailsColumn} from "../BoardDetailsColumn/BoardDetailsColumn.tsx";
import {cardActions} from "../../redux/slices/card.slice.ts";
import {ROUTER_KEYS} from "../../constants/app-keys.const.ts";

interface IProps {
_id: string;
title: string;
cardsSections: ITaskList;

}
const BoardDetails: FC<IProps> = ({ _id, title, cardsSections }) => {
    const { boardId } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [taskList, setTaskList] = useState<ITaskList>(cardsSections);
    const dragEndHandler = (event: DragEndEvent) =>  {
        const { active, over } = event;
        const containerName = active.data.current?.sortable.containerId;
        const targetContainer = over.data.current?.sortable?.containerId;
        console.log(targetContainer);
        const currentActiveItem = taskList[containerName]?.find((item) => item._id === active.id.toString());
        if (active?.id !== over?.id) {
            setTaskList((prev) => {
                const temp = {...taskList};
                const activeIndex = temp[containerName]?.findIndex((item) => item._id === active?.id);
                const overIndex = temp[containerName]?.findIndex((item) => item._id === over?.id);
                temp[containerName] = arrayMove(prev[containerName], activeIndex, overIndex);
                return temp;
            });
        }
        if (targetContainer !== containerName) {
            dispatch(cardActions.update({
                boardId,
                id: active.id.toString(),
                card: {...currentActiveItem, status: targetContainer}
            }))
        }
    }


    const dragOverHandler = ( event: DragOverEvent ) => {
        const { active, over } = event;
        if (!over) return;
        const initialContainer = active.data.current?.sortable?.containerId;
        const targetContainer = over.data.current?.sortable?.containerId;
        if (!initialContainer) return;
        const currentActiveItem = taskList[initialContainer].find((item) => item._id === active.id.toString());

        setTaskList((taskList) => {
            const temp = {...taskList};
            if (!targetContainer) {

        const existingItem = taskList[over!.id]?.find((item) => item._id === active.id);
                if (existingItem) return temp;

                temp[initialContainer] = temp[initialContainer].filter((task) => task._id !== active.id.toString());
                temp[over!.id].push(currentActiveItem);
                return temp;
            }

            if (initialContainer === targetContainer) {
                const oldIdx = temp[initialContainer].findIndex((item) => item._id === active?.id);
                const newIdx = temp[initialContainer].findIndex((item) => item._id === over?.id);
                temp[initialContainer] = arrayMove(temp[initialContainer], oldIdx, newIdx);
            } else {
                temp[initialContainer] = temp[initialContainer].filter((task) => task._id !== active.id.toString());
            const newIdx = temp[targetContainer].findIndex((item) => item._id === over?.id);
            temp[targetContainer].splice(newIdx, 0, currentActiveItem);
        }
        return temp;
        });
    }

    const editBoard = () => {
       dispatch(boardActions.setBoardForUpdate({_id, title}));
       dispatch(modalActions.setShowModal('board'))
   }

    const remove = async (id: string): Promise<void> => {
     await dispatch(boardActions.deleteById({id}));
     navigate(`${ROUTER_KEYS.BOARDS}`);

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
                <DndContext
                            onDragEnd={dragEndHandler}
                onDragOver={dragOverHandler}
                >
                        { taskList && Object.keys(taskList).map((key) => (
                            <BoardDetailsColumn key={key} title={key} items={taskList[key]} />
                        ))}
                </DndContext>
            </div>

        </div>
    );
};

export {BoardDetails};
