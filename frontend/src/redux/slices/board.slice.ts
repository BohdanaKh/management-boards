import {IBoardModel} from "../../models/IBoardModel.ts";
import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue} from "@reduxjs/toolkit";
import {boardsService} from "../../services/board.service.ts";
import {AxiosError} from "axios";
import {IError} from "../../models/IErrorModel.ts";

interface IState {
   boards: IBoardModel[];
   board: IBoardModel;
    boardForUpdate: IBoardModel;
    loading: boolean;
    errors: IError;
}

const initialState: IState = {
    boards: [],
    board: null,
    boardForUpdate: null,
    loading: false,
    errors: null
};

const getAll = createAsyncThunk<IBoardModel[], void>(
    'boardSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await boardsService.getAllBoards();
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err?.response?.data)
        }
    }
)

const getById = createAsyncThunk<IBoardModel, string>(
    'boardSlice/getById',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await boardsService.getBoardByID(id);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err?.response?.data)
        }
    }
)

const create = createAsyncThunk<void, { board: IBoardModel }>(
    'boardSlice/create',
    async ({board}, {rejectWithValue, dispatch}) => {
        try {
            await boardsService.create(board);
            await dispatch(getAll());
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err?.response?.data)
        }
    }
)

const update = createAsyncThunk<void, { board: IBoardModel, id: string }>(
    'boardSlice/update',
    async ({id, board}, {rejectWithValue, dispatch}) => {
        try {
            await boardsService.updateById(id, board);
            await dispatch(getById(id));
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err?.response?.data)
        }
    }
)

const deleteById  = createAsyncThunk<void, { id: string }>(
    'boardSlice/deleteById',
    async ({id}, {rejectWithValue, dispatch}) => {
        try {
            await boardsService.deleteById(id);
            await dispatch(getAll());
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err?.response?.data)
        }
    }
)

const boardSlice = createSlice({
    name: 'boardSlice',
    initialState,
    reducers: {
        setBoardForUpdate: (state, action) => {
            state.boardForUpdate = action.payload
        },
        cancelBoardForUpdate: (state) => {
            state.boardForUpdate = null
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.boards = action.payload;
            })
            .addCase(getById.fulfilled, (state, action) => {
                state.board = action.payload;
            })
            .addCase(update.fulfilled, state => {
                state.boardForUpdate = null
            })

            .addMatcher(isFulfilled(getAll, getById), state => {
                state.loading = false
                state.errors = null
            })
            .addMatcher(isPending(getAll, getById), state => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(getAll, getById), (state, action) => {
                state.errors = action.payload
                state.loading = false
            })
})


const {reducer: boardReducer, actions} = boardSlice;

const boardActions = {
    ...actions,
    getAll,
    getById,
    create,
    update,
    deleteById
}

export {
    boardReducer,
    boardActions
}