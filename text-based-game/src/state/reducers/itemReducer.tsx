import { createSlice } from '@reduxjs/toolkit';
import { Items } from '../../types';

const ItemsState: Items = {
    1001: {
        id: 1001,
        name: "Letter",
        key: "letter",
        description: "A simple letter.",
        locationDescription: "You see a letter.",
        value: 0,
        weight: 0,
        event: 1001,
        removeEventOnDrop: true,
    },
    1002: {
        id: 1002,
        name: "Table",
        key: "table",
        description: "A simple wooden table.",
        locationDescription: "There is a simple wooden table inside.",
        contains: {
            "letter": 1001
        },
        value: 0,
        weight: 0
    }
}

export const itemSlice = createSlice({
    name: 'items',
    initialState: ItemsState,
    reducers: {
        itemRemoveItem: (state, action) => {
            const itemKey = action.payload.itemKey;
            const containerID = action.payload.containerID;

            delete state[containerID].contains[itemKey];

            state[containerID].contains = {
                ...state[containerID].contains
            };
        },

        itemAddItem: (state, action) => {
            const { itemKey, itemID, containerID } = action.payload;

            state[containerID].contains = {
                ...state[containerID].contains,
                [itemKey]: itemID
            };
        },
    }
})

export default itemSlice.reducer;
export const { itemRemoveItem, itemAddItem } = itemSlice.actions;
