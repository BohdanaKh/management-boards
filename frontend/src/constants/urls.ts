import {BACKEND_KEYS, BASE_URL} from "./app-keys.const.ts";

const baseURL = BASE_URL;

const urls = {
    boards: {
        base: BACKEND_KEYS.BOARDS,
        byId: (id: string): string => `${BACKEND_KEYS.BOARDS}/${id}`,
    },
    cards: {
        base: (boardId: string): string =>  `${BACKEND_KEYS.BOARDS}/${boardId}/${BACKEND_KEYS.CARDS}`,
        byId: (boardId: string, id: string): string => `${BACKEND_KEYS.BOARDS}/${boardId}/${BACKEND_KEYS.CARDS}/${id}`
    }
}

export {
    baseURL,
    urls
}