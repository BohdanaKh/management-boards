import {FC} from 'react';
import {Link} from "react-router-dom";

import {SearchBar} from "../SearchBar/SearchBar.tsx";
import {ROUTER_KEYS} from "../../constants/app-keys.const.ts";
import {useAppDispatch} from "../../hooks/redux.hooks.ts";
import {modalActions} from "../../redux/slices/modal.slice.ts";
import css from "./Header.module.css";

interface IProps {

}

const Header: FC<IProps> = () => {
const dispatch = useAppDispatch();
    return (
        <div className={css.Header}>
            <Link to={ROUTER_KEYS.HOME}>O, BOARDs</Link>
            <SearchBar/>
            <button type={'button'} onClick={() => dispatch(modalActions.setShowModal('board'))}>Add board</button>
        </div>
    );
};

export {Header};
