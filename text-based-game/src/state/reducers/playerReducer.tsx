import { createSlice } from '@reduxjs/toolkit';
import { Player } from '../../types';

export const player: Player = {
    name: "Doom",
    health: 100,
    stamina: 100,
    strength: 10,
    dexterity: 10,
    constitution: 10,
    charisma: 10,
    perception: 10,
    inventory: [],
    gold: 10,
    location: 1001,
    isTierd: false,
    isDrunk: false,
    events: []
}

export const playerSlice = createSlice({
    name: "player",
    initialState: player,
    reducers: {
        setLocation: (state, action) => {
            const newLocation = action.payload;

            return {
                ...state,
                location: newLocation
            }
        },

        playerPickItem: (state, action) => {
            console.log(action.payload.newItem);
            const newItem = action.payload.newItem;
            console.log(newItem);
            const inventoryCopy = state.inventory;

            if (action.payload.event) {
                const event = action.payload.event;

                return {
                    ...state,
                    inventory: [
                        ...inventoryCopy,
                        newItem
                    ],
                    events: [
                        ...state.events,
                        event
                    ]
                }
            }

            return {
                ...state,
                inventory: [
                    ...inventoryCopy,
                    newItem
                ]
            }
        },

        playerDropItem: (state, action) => {
            const itemKey = action.payload.itemKey;
            const inventoryCopy = state.inventory;
            const eventsCopy = state.events;

            const newInventory = inventoryCopy.filter((item: any) => item.key !== itemKey);

            console.log(action.payload.eventCode);

            if (action.payload.event) {
                if (action.payload.event === "remove") {
                    const newEvents = eventsCopy.filter((event: any) => event === !action.payload.eventCode);
                    console.log(newEvents);

                    return {
                        ...state,
                        inventory: newInventory,
                        events: newEvents
                    }
                }
            }

            return {
                ...state,
                inventory: newInventory,
            }
        }
    }
})

export default playerSlice.reducer;
export const { setLocation, playerPickItem, playerDropItem } = playerSlice.actions;