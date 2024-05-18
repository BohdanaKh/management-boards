import {FC, useEffect} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {useAppDispatch, useAppSelector} from "../../hooks/redux.hooks.ts";
import {ICardModel} from "../../models/ICardModel.ts";
import {cardValidator} from "../../validators/card.validator.ts";
import {cardActions} from "../../redux/slices/card.slice.ts";
import {modalActions} from "../../redux/slices/modal.slice.ts";
import {useParams} from "react-router-dom";

interface IProps {

}

const CardForm: FC<IProps> = () => {
    const {boardId} = useParams();
    const {
        handleSubmit,
        register,
        setValue,
        reset,
        formState: { errors, isValid },
    } = useForm<ICardModel>({
        mode: "all",
        resolver: joiResolver(cardValidator),
    });
    const { cardForUpdate } = useAppSelector(state => state.cardReducer);
    const dispatch = useAppDispatch();
    // const update: SubmitHandler<IBoardModel> = async (board) => {
    //     const {
    //         meta: { requestStatus },
    //     } = await dispatch(boardActions.update({ id: boardForUpdate.id, board }));
    //     if (requestStatus === "fulfilled") {
    //         dispatch(orderModalActions.closeOrderEditModal());
    //     }
    // };

    useEffect(() => {
        if (cardForUpdate) {
            setValue("name", cardForUpdate.name, { shouldValidate: true });
            setValue("description", cardForUpdate.description, { shouldValidate: true });
        }
    }, [cardForUpdate, setValue]);
    const update: SubmitHandler<ICardModel> = async (card) => {
        console.log(cardForUpdate);
        await dispatch(cardActions.update({ boardId, id:cardForUpdate._id, card }));
        reset();
        dispatch(modalActions.closeModal());
    };
    const save: SubmitHandler<ICardModel> = async (card) => {
        await dispatch(cardActions.create({boardId, card}));
        reset();
    };

    return (
        <div>
            <form onSubmit={handleSubmit(cardForUpdate ? update : save)}>
                { cardForUpdate ? (
                    <>
                    <input type="text" {...register("name")}/>
                    <input type="text" {...register("description")}/>
                    </>
                ) : (
                    <>
                    <input type="text" placeholder={`Enter new card's name`} {...register("name")}/>
                    <input type="text" placeholder={'Description'} {...register("description")}/>
                    </>
                )}
                {errors.name && (
                    <span>{errors.name.message}</span>
                )}
                {errors.description && (
                    <span>{errors.description.message}</span>
                )}
                <button type={'submit'} disabled={!isValid}>{cardForUpdate ? 'Update' : 'Save'}</button>
            </form>
        </div>
    );
};

export {CardForm};
