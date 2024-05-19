import {IBoardModel} from "../models/IBoardModel.ts";
import {urls} from "../constants/urls.ts";
import {apiService} from "./api.service.ts";
import {IRes} from "../types/response.type.ts";

const boardsService = {
    getAllBoards: async (): IRes<IBoardModel[]> => {
        return await apiService.get( urls.boards.base );
    },
    getBoardByID: async ( id: string ): IRes<IBoardModel> => {
        return await apiService.get( urls.boards.byId(id));
    },
    create: async (data: IBoardModel): IRes<IBoardModel> => {
       return await apiService.post(urls.boards.base, data)
    },
    updateById: async (id: string, data: IBoardModel): IRes<IBoardModel> => {
        return await apiService.put(urls.boards.byId(id), data)
    },
    deleteById: async (id: string): IRes<void> => apiService.delete(urls.boards.byId(id))
}

export {
    boardsService
}