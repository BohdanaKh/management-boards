import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useParams } from 'react-router-dom';

import css from './CardForm.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks.ts';
import { ICardModel } from '../../models/ICardModel.ts';
import { cardValidator } from '../../validators/card.validator.ts';
import { cardActions } from '../../redux/slices/card.slice.ts';
import { modalActions } from '../../redux/slices/modal.slice.ts';
import { BUTTON_KEYS } from '../../constants/app-keys.const.ts';

const CardForm: FC = () => {
  const { boardId } = useParams();
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<ICardModel>({
    mode: 'all',
    resolver: joiResolver(cardValidator),
  });
  const { cardForUpdate } = useAppSelector((state) => state.cardReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cardForUpdate) {
      setValue('name', cardForUpdate.name, { shouldValidate: true });
      setValue('description', cardForUpdate.description, {
        shouldValidate: true,
      });
    }
  }, [cardForUpdate, setValue]);
  const update: SubmitHandler<ICardModel> = async (card) => {
    await dispatch(
      cardActions.update({
        boardId,
        id: cardForUpdate._id,
        card: { ...card, status: cardForUpdate.status },
      })
    );
    reset();
    dispatch(modalActions.closeModal());
  };
  const save: SubmitHandler<ICardModel> = async (card) => {
    await dispatch(cardActions.create({ boardId, card }));
    reset();
    dispatch(modalActions.closeModal());
  };

  return (
    <div>
      <form
        className={css.cardForm}
        onSubmit={handleSubmit(cardForUpdate ? update : save)}
      >
        {cardForUpdate ? (
          <>
            <h3>Update card</h3>
            <input type="text" {...register('name')} />
            <input type="text" {...register('description')} />
          </>
        ) : (
          <>
            <h3>Create new card</h3>
            <input
              type="text"
              placeholder={`Enter new card's name`}
              {...register('name')}
            />
            <input
              type="text"
              placeholder={'Description'}
              {...register('description')}
            />
          </>
        )}
        {errors.name && <span>{errors.name.message}</span>}
        {errors.description && <span>{errors.description.message}</span>}
        <button type={'submit'} disabled={!isValid}>
          {cardForUpdate ? BUTTON_KEYS.UPDATE : BUTTON_KEYS.SAVE}
        </button>
      </form>
    </div>
  );
};

export { CardForm };
