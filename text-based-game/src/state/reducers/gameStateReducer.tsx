import { createSlice } from '@reduxjs/toolkit';
import { GameState } from '../../types/gameState';

const initialState: GameState = {
    screen: "game-state",
    state: "game-state",
    previousScreen: "game-state",
    previousState: "game-state",
    stateFocus: 0,
}

export const GameStateSlice = createSlice({
    name: 'gameState',
    initialState: initialState,
    reducers: {
        updateState: (state, action) => {
            const { focus, newState } = action.payload;
            const currentState = state.state;

            return state = {
                ...state,
                state: newState,
                previousState: currentState,
                stateFocus: focus,
            }
        },

        updateScreen: (state, action) => {
            const { focus, newScreen } = action.payload;
            const currentScreen = state.state;

            return state = {
                ...state,
                screen: newScreen,
                previousState: currentScreen,
                stateFocus: focus,
            }
        }
    }
})

export default GameStateSlice.reducer;
export const { updateState } = GameStateSlice.actions;