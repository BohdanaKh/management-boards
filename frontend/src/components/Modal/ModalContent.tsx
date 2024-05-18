import {FC} from 'react';

import {BoardForm} from "../BoardForm/BoardForm.tsx";
import {CardForm} from "../CardForm/CardForm.tsx";
import {useAppSelector} from "../../hooks/redux.hooks.ts";
import css from "./Modal.module.css";

interface IProps {
onClose: () => void;
}

const ModalContent: FC<IProps> = ({ onClose }) => {
    const { formType } = useAppSelector(state => state.modalReducer);
    return (
        <div className={css.modal}>
            <div className={css.modalContent}>
            {formType === 'board' && <BoardForm />}
            {formType === 'card' && <CardForm />}
            <button type={'button'} onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export {ModalContent};
