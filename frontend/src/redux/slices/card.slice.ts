import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue} from "@reduxjs/toolkit";

import {cardsService} from "../../services/card.service.ts";
import {ICardModel} from "../../models/ICardModel.ts";
import {IError} from "../../models/IErrorModel.ts";
import {boardActions} from "./board.slice.ts";


interface IState {
    card: ICardModel,
    cardForUpdate: ICardModel,
    loading: boolean,
    errors: IError,
}

const initialState: IState = {
    card: null,
    cardForUpdate: null,
    loading: false,
    errors: null
};

const getById = createAsyncThunk<ICardModel, { boardId: string, id: string}>(
    'cardSlice/getById',
    async ({ boardId, id}, {rejectWithValue}) => {
        try {
            const {data} = await cardsService.getCardByID(boardId, id);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err?.response?.data)
        }
    }
)

const create = createAsyncThunk<void, {boardId: string, card: ICardModel }>(
    'cardSlice/create',
    async ({boardId, card}, {rejectWithValue, dispatch}) => {
        try {
            await cardsService.create(boardId, card);
            await dispatch(boardActions.getById(boardId));
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err?.response?.data)
        }
    }
)

const update = createAsyncThunk<void, { boardId: string, id: string, card: ICardModel }>(
    'cardSlice/update',
    async ({boardId, id, card}, {rejectWithValue, dispatch}) => {
        try {
            await cardsService.updateById(boardId, id, card);
            await dispatch(boardActions.getById(boardId));
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err?.response?.data)
        }
    }
)

const deleteCardById  = createAsyncThunk<void, { boardId: string, id: string}>(
    'cardSlice/deleteCardById',
    async ({ boardId, id}, {rejectWithValue, dispatch}) => {
        try {
            await cardsService.deleteById(boardId, id);
            await dispatch(boardActions.getById(boardId));
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err?.response?.data)
        }
    }
)

const cardSlice = createSlice({
    name: 'cardSlice',
    initialState,
    reducers: {
        setCardForUpdate: (state, action) => {
            state.cardForUpdate = action.payload
        },
        cancelCardForUpdate: (state) => {
            state.cardForUpdate = null
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getById.fulfilled, (state, action) => {
                state.card = action.payload;
            })
            .addCase(update.fulfilled, state => {
                state.cardForUpdate = null
            })

            .addMatcher(isFulfilled( getById), state => {
                state.loading = false
                state.errors = null
            })
            .addMatcher(isPending(getById), state => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue( getById), (state, action) => {
                state.errors = action.payload
                state.loading = false
            })
})


const {reducer: cardReducer, actions} = cardSlice;

const cardActions = {
    ...actions,
    getById,
    create,
    update,
    deleteCardById
}

export {
    cardReducer,
    cardActions
}