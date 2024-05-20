import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { SearchBar } from '../SearchBar/SearchBar.tsx';
import { ROUTER_KEYS } from '../../constants/app-keys.const.ts';
import { useAppDispatch } from '../../hooks/redux.hooks.ts';
import { modalActions } from '../../redux/slices/modal.slice.ts';
import css from './Header.module.css';
import { boardActions } from '../../redux/slices/board.slice.ts';

interface IProps {}

const Header: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const getMain = (): void => {
    navigate(`${ROUTER_KEYS.HOME}`);
    dispatch(boardActions.delCurrentBoard());
  };
  return (
    <div className={css.Header}>
      {/*<Link to={ROUTER_KEYS.HOME}>O, BOARDs</Link>*/}
      <div className={css.logo} onClick={getMain}>
        <span>O, BOARDs</span>
      </div>
      <SearchBar />
      <button
        type={'button'}
        onClick={() => dispatch(modalActions.setShowModal('board'))}
      >
        Add board
      </button>
    </div>
  );
};

export { Header };
