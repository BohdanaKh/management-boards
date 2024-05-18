import {FC, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import css from "./BoardDetails.module.css";
import {BoardDetails} from "../components/BoardDetails/BoardDetails.tsx";
import {IBoardModel} from "../models/IBoardModel.ts";
import {boardsService} from "../services/board.service.ts";
import {ICardModel} from "../models/ICardModel.ts";
import {ECardStatus} from "../enums/CardStatus.enum.ts";

interface IProps {

}

const BoardDetailsPage: FC<IProps> = () => {
    const { boardId } = useParams();
    const [board, setBoard] = useState<IBoardModel>(null);

    useEffect( () => {
        if (boardId) {
            boardsService.getBoardByID(boardId.toString()).then(value => setBoard(value.data));
        }
    }, [boardId]);

    const cardsSections = board?.cards?.reduce((acc, current: ICardModel) => {
        switch (current.status) {
            case ECardStatus.ToDo:
                acc['todos'].push(current);
                break;
            case ECardStatus.InProgress:
                acc['tasksInProgress'].push(current);
                break;
            case ECardStatus.Done:
                acc['doneTasks'].push(current);
                break;
        }
        return acc;
    }, { todos:[], tasksInProgress:[], doneTasks:[] });
    console.log('CardSections:', cardsSections);

    return (
        <div className={css.BoardDetailsContainer}>
            <BoardDetails _id={board?._id} title={board?.title} todos={cardsSections?.todos} tasksInProgress={cardsSections?.tasksInProgress} doneTasks={cardsSections?.doneTasks}/>
        </div>
    );
};

export {BoardDetailsPage};
