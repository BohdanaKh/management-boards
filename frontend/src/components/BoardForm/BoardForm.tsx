import { FC, useEffect } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { SubmitHandler, useForm } from 'react-hook-form';

import { IBoardModel } from '../../models/IBoardModel.ts';
import { boardValidator } from '../../validators/board.validator.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks.ts';
import { boardActions } from '../../redux/slices/board.slice.ts';
import { modalActions } from '../../redux/slices/modal.slice.ts';

interface IProps {}

const BoardForm: FC<IProps> = () => {
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
  const { boardForUpdate } = useAppSelector((state) => state.boardReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (boardForUpdate) {
      setValue('title', boardForUpdate.title, { shouldValidate: true });
    }
  }, [boardForUpdate, setValue]);
  const update: SubmitHandler<IBoardModel> = async (board) => {
    await dispatch(boardActions.update({ id: boardForUpdate._id, board }));
    reset();
    dispatch(modalActions.closeModal());
  };
  const save: SubmitHandler<IBoardModel> = async (board) => {
    await dispatch(boardActions.create({ board }));
    reset();
    dispatch(modalActions.closeModal());
  };

  return (
    <div>
      <form onSubmit={handleSubmit(boardForUpdate ? update : save)}>
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
          {boardForUpdate ? 'Update' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export { BoardForm };
