import {FC, useEffect } from 'react';
import {useParams} from "react-router-dom";

import css from "./BoardDetails.module.css";
import {BoardDetails} from "../components/BoardDetails/BoardDetails.tsx";
import {ICardModel} from "../models/ICardModel.ts";
import {ECardStatus} from "../enums/CardStatus.enum.ts";
import {useAppDispatch, useAppSelector} from "../hooks/redux.hooks.ts";
import {boardActions} from "../redux/slices/board.slice.ts";

export interface ITaskList {
    [key: string]: ICardModel[];
}

const BoardDetailsPage: FC = () => {
    const { boardId } = useParams();
    const { board } = useAppSelector(state => state.boardReducer);
   // const board = {
   //      "_id": "66472e03e0b01a4093bd2e39",
   //      "title": "Board1",
   //      "cards": [
   //      {
   //          "_id": "66472e9dfcbc303093bbea1d",
   //          "name": "Task1",
   //          "description": "123 456 789 cvdghddbddj bdfhdh djd jdchbjdcj jdcc",
   //          "status": "Done",
   //          "board": "66472e03e0b01a4093bd2e39",
   //          "createdAt": "2024-05-17T10:17:01.066Z",
   //          "updatedAt": "2024-05-17T12:15:02.475Z",
   //          "__v": 0
   //      },
   //      {
   //          "_id": "66472eb1fcbc303093bbea20",
   //          "name": "Task2",
   //          "description": "123 456 789 cvdghddbddj bdfhdh djd jdchbjdcj jdcc cghdbfdb bhjdfbfdhdd hjdhjdshfdhdhjdbn",
   //          "status": "In Progress",
   //          "board": "66472e03e0b01a4093bd2e39",
   //          "createdAt": "2024-05-17T10:17:21.333Z",
   //          "updatedAt": "2024-05-17T12:16:10.316Z",
   //          "__v": 0
   //      },
   //      {
   //          "_id": "66472ebffcbc303093bbea23",
   //          "name": "Task3",
   //          "description": "145155 njj",
   //          "status": "To Do",
   //          "board": "66472e03e0b01a4093bd2e39",
   //          "createdAt": "2024-05-17T10:17:35.279Z",
   //          "updatedAt": "2024-05-18T13:06:13.495Z",
   //          "__v": 0
   //      },
   //      {
   //          "_id": "66472ecffcbc303093bbea26",
   //          "name": "Task4",
   //          "description": "121225 dhbdhsd hjdhehjd hdhdbdhd bshudbuyc  bhbchdbchdb bbbcbcgc bsh hdhbd hdh",
   //          "status": "To Do",
   //          "board": "66472e03e0b01a4093bd2e39",
   //          "createdAt": "2024-05-17T10:17:51.393Z",
   //          "updatedAt": "2024-05-17T10:17:51.393Z",
   //          "__v": 0
   //      },
   //      {
   //          "_id": "66472edcfcbc303093bbea29",
   //          "name": "Task5",
   //          "description": "121225 ",
   //          "status": "To Do",
   //          "board": "66472e03e0b01a4093bd2e39",
   //          "createdAt": "2024-05-17T10:18:04.742Z",
   //          "updatedAt": "2024-05-17T10:18:04.742Z",
   //          "__v": 0
   //      },
   //      {
   //          "_id": "66490198b6fa19eaddf8066a",
   //          "name": "Jhor",
   //          "description": "Lorem ipsum dolor sit amet",
   //          "status": "To Do",
   //          "board": "66472e03e0b01a4093bd2e39",
   //          "createdAt": "2024-05-18T19:29:28.622Z",
   //          "updatedAt": "2024-05-18T19:29:28.622Z",
   //          "__v": 0
   //      },
   //      {
   //          "_id": "664901b0b6fa19eaddf8066f",
   //          "name": "uk",
   //          "description": "Create design",
   //          "status": "To Do",
   //          "board": "66472e03e0b01a4093bd2e39",
   //          "createdAt": "2024-05-18T19:29:52.222Z",
   //          "updatedAt": "2024-05-18T19:29:52.222Z",
   //          "__v": 0
   //      }
   //  ],
   //      "createdAt": "2024-05-17T10:14:27.736Z",
   //      "updatedAt": "2024-05-18T19:29:52.229Z",
   //      "__v": 0
   //  }
    const dispatch = useAppDispatch();
    console.log(boardId);

    useEffect( () => {
        if (boardId) {
            dispatch(boardActions.getById(boardId));
        }
    }, [dispatch, boardId]);

    console.log(board);

       const cardsSections: ITaskList = board?.cards?.reduce((acc, current: ICardModel) => {
            switch (current.status) {
                case ECardStatus.ToDo:
                    acc['To Do'].push(current);
                    break;
                case ECardStatus.InProgress:
                    acc['In Progress'].push(current);
                    break;
                case ECardStatus.Done:
                    acc['Done'].push(current);
                    break;
            }
            return acc;
        }, {[ECardStatus.ToDo]: [], [ECardStatus.InProgress]: [], [ECardStatus.Done]: []});
    console.log(cardsSections);


    // const [ todos, setTodos ] = useState<ICardModel[]>(cardsSections?.todos);
    // const [ tasksInProgress, setTasksInProgress ] = useState<ICardModel[]>(cardsSections?.tasksInProgress);
    // const [ doneTasks, setDoneTasks ] = useState<ICardModel[]>(cardsSections?.doneTasks);

    return (
        <div className={css.BoardDetailsContainer}>
            <BoardDetails _id={board?._id} title={board?.title} cardsSections={cardsSections}/>
        </div>
    );
};

export {BoardDetailsPage};
