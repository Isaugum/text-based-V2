import { createSlice } from '@reduxjs/toolkit';
import { Locations } from '../../types';

const LocationsState: Locations = {
    1001: {
        id: 1001,
        name: "Room",
        area: "Wooden Moon Inn",
        description: "A room inside an inn.",
        connects: {
            "leave": 1002,
            "exit": 1002
        },
        contains: {
            "table": 1002
        },
        presentNPCS: {

        },
        locked: {
            isLocked: false
        }
    },
    1002: {
        id: 1002,
        name: "Hallway",
        area: "Wooden Moon Inn",
        description: "Wooden Moon Inn's hallway.",
        connects: {
            "room": 1001,
            "enter": 1001
        },
        contains: {

        },
        presentNPCS: {
            "soldier": 1001
        },
        locked: {
            isLocked: false
        }
    }
}

export const locationSlice = createSlice({
    name: 'locations',
    initialState: LocationsState,
    reducers: {
        changeLocation: (state, action) => {
            const id = action.payload.location;
            const target = action.payload.target;

            state[id] = {
                ...state[id],
                description: target
            }
        },

        locationRemoveItem: (state, action) => {
            const { itemKey, locationID } = action.payload;

            delete state[locationID].contains[itemKey];

            state[locationID].contains = {
                ...state[locationID].contains
            };
        },

        locationAddItem: (state, action) => {
            const { itemKey, itemID, locationID } = action.payload;

            state[locationID].contains = {
                ...state[locationID].contains,
                [itemKey]: itemID
            };
        },
    }
})

export default locationSlice.reducer;
export const { changeLocation, locationRemoveItem, locationAddItem } = locationSlice.actions;