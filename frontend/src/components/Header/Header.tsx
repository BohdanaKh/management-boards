import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { SearchBar } from '../SearchBar/SearchBar.tsx';
import {
  BUTTON_KEYS,
  MODAL_CONTENT,
  ROUTER_KEYS,
} from '../../constants/app-keys.const.ts';
import { useAppDispatch } from '../../hooks/redux.hooks.ts';
import { modalActions } from '../../redux/slices/modal.slice.ts';
import css from './Header.module.css';
import { boardActions } from '../../redux/slices/board.slice.ts';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const getMain = (): void => {
    navigate(`${ROUTER_KEYS.HOME}`);
    dispatch(boardActions.delCurrentBoard());
  };
  return (
    <div className={css.Header}>
      <div className={css.logo} onClick={getMain}>
        <span>O, BOARDs</span>
      </div>
      <SearchBar />
      <button
        type={'button'}
        onClick={() => dispatch(modalActions.setShowModal(MODAL_CONTENT.BOARD))}
      >
        {BUTTON_KEYS.ADD_BOARD}
      </button>
    </div>
  );
};

export { Header };
