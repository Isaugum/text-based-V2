import { configureStore } from "@reduxjs/toolkit";
import playerReducer from './reducers/playerReducer';
import locationReducer from './reducers/locationReducer';
import itemReducer from './reducers/itemReducer';
import gameStateReducer from "./reducers/gameStateReducer";
import npcReducer from "./reducers/npcReducer";


export const store = configureStore({
    reducer: {
        gameState: gameStateReducer,
        player: playerReducer,
        locations: locationReducer,
        items: itemReducer,
        npcs: npcReducer,
    }
})
