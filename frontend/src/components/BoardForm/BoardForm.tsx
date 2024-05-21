import { FC, useEffect } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import css from './BoardForm.module.css';
import { IBoardModel } from '../../models/IBoardModel.ts';
import { boardValidator } from '../../validators/board.validator.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks.ts';
import { boardActions } from '../../redux/slices/board.slice.ts';
import { modalActions } from '../../redux/slices/modal.slice.ts';
import { BUTTON_KEYS, ROUTER_KEYS } from '../../constants/app-keys.const.ts';

const BoardForm: FC = () => {
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<IBoardModel>({
    mode: 'all',
    resolver: joiResolver(boardValidator),
  });
  const { boardForUpdate, board: currentBoard } = useAppSelector(
    (state) => state.boardReducer
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (boardForUpdate) {
      setValue('title', boardForUpdate.title, { shouldValidate: true });
    }
  }, [boardForUpdate, setValue]);

  useEffect(() => {
    if (currentBoard) {
      navigate(
        `${ROUTER_KEYS.BOARDS}/${currentBoard?._id}/${ROUTER_KEYS.CARDS}`
      );
    }
  }, [dispatch, currentBoard, navigate]);
  const update: SubmitHandler<IBoardModel> = async (board) => {
    await dispatch(boardActions.update({ id: boardForUpdate._id, board }));
    reset();
    dispatch(modalActions.closeModal());
  };
  const save: SubmitHandler<IBoardModel> = async (board) => {
    const {
      meta: { requestStatus },
    } = await dispatch(boardActions.create({ board }));
    if (requestStatus === 'fulfilled') {
      reset();
      dispatch(modalActions.closeModal());
      dispatch(boardActions.delCurrentBoard());
    }
  };

  return (
    <div>
      <form
        className={css.boardForm}
        onSubmit={handleSubmit(boardForUpdate ? update : save)}
      >
        <h3>{boardForUpdate ? 'Update board' : 'Create new board'}</h3>
        {boardForUpdate ? (
          <input type="text" {...register('title')} />
        ) : (
          <input
            type="text"
            placeholder={`Enter new board's title`}
            {...register('title')}
          />
        )}
        {errors.title && <span>{errors.title.message}</span>}
        <button type={'submit'} disabled={!isValid}>
          {boardForUpdate ? BUTTON_KEYS.UPDATE : BUTTON_KEYS.SAVE}
        </button>
      </form>
    </div>
  );
};

export { BoardForm };
