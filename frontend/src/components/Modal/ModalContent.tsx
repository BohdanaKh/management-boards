import { FC } from 'react';
import { VscChromeClose } from 'react-icons/vsc';

import { BoardForm } from '../BoardForm/BoardForm.tsx';
import { CardForm } from '../CardForm/CardForm.tsx';
import { useAppSelector } from '../../hooks/redux.hooks.ts';
import css from './Modal.module.css';
import { MODAL_CONTENT } from '../../constants/app-keys.const.ts';

interface IProps {
  onClose: () => void;
}

const ModalContent: FC<IProps> = ({ onClose }) => {
  const { formType } = useAppSelector((state) => state.modalReducer);
  return (
    <div className={css.modal}>
      <div className={css.modalContent}>
        <button className={css.closeButton} type={'button'} onClick={onClose}>
          <VscChromeClose className={css.closeIcon} />
        </button>
        {formType === MODAL_CONTENT.BOARD && <BoardForm />}
        {formType === MODAL_CONTENT.CARD && <CardForm />}
      </div>
    </div>
  );
};

export { ModalContent };
