import { createPortal } from 'react-dom';

import {ModalContent} from "../Modal/ModalContent.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.hooks.ts";
import {modalActions} from "../../redux/slices/modal.slice.ts";
import {boardActions} from "../../redux/slices/board.slice.ts";
import {cardActions} from "../../redux/slices/card.slice.ts";

export default function Portal() {
    const {showModal} = useAppSelector(state => state.modalReducer);
    const { formType } = useAppSelector(state => state.modalReducer);
    const dispatch = useAppDispatch();
    const closeModal = () => {
        dispatch(modalActions.closeModal());
       if ( formType === 'board' ) { dispatch(boardActions.cancelBoardForUpdate()) }
        if ( formType === 'card' ) { dispatch(cardActions.cancelCardForUpdate()) }
    }
    return (
        <>
            {showModal && createPortal(
                <ModalContent onClose={closeModal} />,
                document.body
            )}
        </>
    );
}
