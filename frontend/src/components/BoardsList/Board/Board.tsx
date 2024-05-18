import {FC} from 'react';
import {Link} from "react-router-dom";

import css from "./Board.module.css";
import {IBoardModel} from "../../../models/IBoardModel.ts";
import {ROUTER_KEYS} from "../../../constants/app-keys.const.ts";


interface IProps {
board: IBoardModel;
}



const Board: FC<IProps> = ({board}) => {
const { _id, title } = board;
    return (
        <div className={css.Board}>
           <Link to={`${ROUTER_KEYS.BOARDS}/${_id}/${ROUTER_KEYS.CARDS}`}>
               <h3>{title}</h3>
           </Link>
        </div>
    );
};

export {Board};
